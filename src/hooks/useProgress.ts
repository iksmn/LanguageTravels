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
}

export interface Store {
  active: string | null;
  langs: Record<string, LangProgress>;
}

const STORE_KEY = "rumo:store:v2";

function freshLang(): LangProgress {
  return { xp: 0, streak: 0, lastActive: null, days: {} };
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
  level: number;
}

export function useProgress(): UseProgressReturn {
  const [store, setStore] = useState<Store>(load);

  useEffect(() => {
    save(store);
  }, [store]);

  const lang = (store.active as LangCode | null) ?? null;
  const progress: LangProgress = lang ? store.langs[lang] ?? freshLang() : freshLang();

  const currentDay = (() => {
    for (let d = 1; d <= TOTAL_DAYS; d++) if (!progress.days[d]) return d;
    return TOTAL_DAYS + 1;
  })();

  const isDayDone = useCallback((d: number) => Boolean(progress.days[d]), [progress]);
  const unlockedDay = useCallback((d: number) => d <= currentDay, [currentDay]);

  const weekStamps: number[] = [];
  for (let w = 1; w <= 12; w++) {
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

  const resetActive = useCallback(() => {
    setStore((prev) => {
      if (!prev.active) return prev;
      return { ...prev, langs: { ...prev.langs, [prev.active]: freshLang() } };
    });
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
    level: levelFromXp(progress.xp),
  };
}
