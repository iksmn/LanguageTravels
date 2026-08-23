import { useCallback, useEffect, useState } from "react";
import { TOTAL_DAYS, levelFromXp, weekStampDay } from "../lib/engine";
import type { LangCode } from "../data/curriculum";

export interface DayRecord {
  score?: number;
  total?: number;
  xp: number;
  date: string; // yyyy-mm-dd
}

export interface LangProgress {
  xp: number;
  streak: number;
  lastActive: string | null;
  days: Record<number, DayRecord>;
  /** Melhor pontuação (0–6) em cada verbo treinado no conjugador. */
  verbs: Record<string, number>;
  /** Dias em que a cópia do "Cahier de copie" foi concluída. */
  copies: Record<number, boolean>;
}

export interface Store {
  active: string | null;
  langs: Record<string, LangProgress>;
}

const STORE_KEY = "rumo:store:v2";

function freshLang(): LangProgress {
  return { xp: 0, streak: 0, lastActive: null, days: {}, verbs: {}, copies: {} };
}

function load(): Store {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return { active: null, langs: {} };
    const parsed = JSON.parse(raw) as Partial<Store>;
    return {
      active: typeof parsed.active === "string" ? parsed.active : null,
      langs: parsed.langs && typeof parsed.langs === "object" ? (parsed.langs as Record<string, LangProgress>) : {},
    };
  } catch {
    return { active: null, langs: {} };
  }
}

function save(s: Store) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(s));
  } catch {
    /* armazenamento indisponível — segue em memória */
  }
}

const todayStr = () => new Date().toISOString().slice(0, 10);
const yesterdayStr = () => new Date(Date.now() - 86400000).toISOString().slice(0, 10);

export interface UseProgressReturn {
  store: Store;
  lang: LangCode | null;
  progress: LangProgress;
  currentDay: number; // primeiro dia não concluído (91 = programa concluído)
  isDayDone: (d: number) => boolean;
  unlockedDay: (d: number) => boolean;
  weekStamps: number[]; // semanas com carimbo conquistado
  certificateEarned: boolean;
  completeDay: (day: number, rec: DayRecord) => number; // retorna XP ganho (0 se o dia já estava feito)
  chooseLanguage: (code: string) => void;
  backToGate: () => void; // volta à escolha de idiomas (progresso preservado)
  resetActive: () => void;
  saveVerbScore: (inf: string, score: number) => void; // guarda a melhor pontuação no verbo
  exportStore: () => string; // JSON do progresso para backup
  restoreStore: (json: string) => boolean; // restaura backup; false se inválido
  isCopyDone: (day: number) => boolean; // cópia do "Cahier" já feita?
  completeCopy: (day: number, xp: number) => number; // conclui a cópia e soma XP
  clearDay: (day: number) => boolean; // reabre um dia para refazer do zero
  resetAll: () => void; // zera o progresso de todos os idiomas
  level: number;
}

export function useProgress(): UseProgressReturn {
  const [store, setStore] = useState<Store>(load);

  useEffect(() => {
    save(store);
  }, [store]);

  const lang = (store.active as LangCode | null) ?? null;
  const progress: LangProgress = lang ? { ...freshLang(), ...store.langs[lang] } : freshLang();

  const currentDay = (() => {
    for (let d = 1; d <= TOTAL_DAYS; d++) if (!progress.days[d]) return d;
    return TOTAL_DAYS + 1;
  })();

  const isDayDone = useCallback((d: number) => Boolean(progress.days[d]), [progress]);
  // Um dia está acessível se já foi concluído ou se a rota já chegou até ele
  // (assim, refazer um dia antigo não tranca os dias posteriores já feitos).
  const unlockedDay = useCallback(
    (d: number) => d <= currentDay || Boolean(progress.days[d]),
    [currentDay, progress],
  );

  const weekStamps: number[] = [];
  for (let w = 1; w <= 13; w++) {
    const sd = weekStampDay(w);
    if (sd && progress.days[sd]) weekStamps.push(w);
  }
  const certificateEarned = Boolean(progress.days[TOTAL_DAYS]);

  const completeDay = useCallback(
    (day: number, rec: DayRecord): number => {
      if (!lang) return 0;
      let gained = 0;
      setStore((prev) => {
        const p = prev.langs[lang] ?? freshLang();
        if (p.days[day]) return prev; // dia já concluído — sem XP extra
        gained = rec.xp;
        const today = todayStr();
        const streak = p.lastActive === today ? Math.max(p.streak, 1) : p.lastActive === yesterdayStr() ? p.streak + 1 : 1;
        const next: LangProgress = {
          ...p,
          xp: p.xp + rec.xp,
          streak,
          lastActive: today,
          days: { ...p.days, [day]: rec },
        };
        return { ...prev, langs: { ...prev.langs, [lang]: next } };
      });
      return gained;
    },
    [lang],
  );

  const chooseLanguage = useCallback((code: string) => {
    setStore((prev) => ({
      ...prev,
      active: code,
      langs: { ...prev.langs, [code]: prev.langs[code] ?? freshLang() },
    }));
  }, []);

  const backToGate = useCallback(() => {
    setStore((prev) => ({ ...prev, active: null }));
  }, []);

  const saveVerbScore = useCallback(
    (inf: string, score: number) => {
      if (!lang) return;
      setStore((prev) => {
        const p = { ...freshLang(), ...prev.langs[lang] };
        const best = Math.max(p.verbs[inf] ?? 0, score);
        if (best === (p.verbs[inf] ?? 0)) return prev;
        return {
          ...prev,
          langs: { ...prev.langs, [lang]: { ...p, verbs: { ...p.verbs, [inf]: best } } },
        };
      });
    },
    [lang],
  );

  const resetActive = useCallback(() => {
    setStore((prev) => {
      if (!prev.active) return prev;
      return { ...prev, langs: { ...prev.langs, [prev.active]: freshLang() } };
    });
  }, []);

  /** A cópia do dia já foi concluída? */
  const isCopyDone = useCallback(
    (day: number): boolean => Boolean((progress.copies ?? {})[day]),
    [progress],
  );

  /**
   * Reabre um dia para refazer do zero: apaga o registro da sessão e da cópia,
   * devolvendo o dia ao estado "pendente" (XP cheio ao concluir novamente).
   * Retorna true se havia algo para apagar.
   */
  const clearDay = useCallback(
    (day: number): boolean => {
      if (!lang) return false;
      let changed = false;
      setStore((prev) => {
        const p = { ...freshLang(), ...prev.langs[lang] };
        if (!p.days[day] && !(p.copies ?? {})[day]) return prev;
        changed = true;
        const days = { ...p.days };
        delete days[day];
        const copies = { ...p.copies };
        delete copies[day];
        return {
          ...prev,
          langs: { ...prev.langs, [lang]: { ...p, days, copies } },
        };
      });
      return changed;
    },
    [lang],
  );

  /** Zera o progresso de TODOS os idiomas (o idioma ativo continua selecionado). */
  const resetAll = useCallback(() => {
    setStore((prev) => {
      const langs: Record<string, LangProgress> = {};
      for (const code of Object.keys(prev.langs)) langs[code] = freshLang();
      return { ...prev, langs };
    });
  }, []);

  /** Registra a conclusão da cópia do dia e soma o XP de bônus (uma vez por dia). */
  const completeCopy = useCallback(
    (day: number, xp: number): number => {
      if (!lang) return 0;
      let gained = 0;
      setStore((prev) => {
        const p = { ...freshLang(), ...prev.langs[lang] };
        if ((p.copies ?? {})[day]) return prev; // já copiada
        gained = xp;
        const next: LangProgress = {
          ...p,
          xp: p.xp + xp,
          copies: { ...p.copies, [day]: true },
        };
        return { ...prev, langs: { ...prev.langs, [lang]: next } };
      });
      return gained;
    },
    [lang],
  );

  /** Serializa o progresso para backup em arquivo. */
  const exportStore = useCallback((): string => JSON.stringify(store, null, 2), [store]);

  /** Restaura progresso a partir de um JSON exportado. Retorna true se válido. */
  const restoreStore = useCallback((json: string): boolean => {
    try {
      const parsed = JSON.parse(json) as Partial<Store>;
      if (!parsed || typeof parsed !== "object" || !parsed.langs || typeof parsed.langs !== "object") {
        return false;
      }
      const langs: Record<string, LangProgress> = {};
      for (const [code, raw] of Object.entries(parsed.langs as Record<string, Partial<LangProgress>>)) {
        langs[code] = {
          ...freshLang(),
          ...raw,
          days: raw && typeof raw.days === "object" && raw.days ? raw.days : {},
          verbs: raw && typeof raw.verbs === "object" && raw.verbs ? raw.verbs : {},
          copies: raw && typeof raw.copies === "object" && raw.copies ? raw.copies : {},
        };
      }
      const active = typeof parsed.active === "string" && langs[parsed.active] ? parsed.active : null;
      setStore({ active, langs });
      return true;
    } catch {
      return false;
    }
  }, []);

  return {
    store,
    lang,
    progress,
    currentDay,
    isDayDone,
    unlockedDay,
    weekStamps,
    certificateEarned,
    completeDay,
    chooseLanguage,
    backToGate,
    resetActive,
    saveVerbScore,
    isCopyDone,
    completeCopy,
    clearDay,
    resetAll,
    exportStore,
    restoreStore,
    level: levelFromXp(progress.xp),
  };
}
