/**
 * Catálogo de flashcards de TODOS os idiomas, derivado do progresso salvo.
 *
 * Regras de desbloqueio (a palavra entra nos cartões quando é aprendida):
 *  - vocabulário de uma semana  → liberado quando o dia de vocabulário
 *    (1º dia da semana) está concluído — na semana 13 vale o dia de diálogo;
 *  - verbos de uma semana       → liberados quando o dia de quiz (3º dia)
 *    está concluído; verbos fora das listas semanais liberam no dia 87.
 *
 * Repetição espaçada (Leitner, 4 caixas):
 *  0 nova → sempre em dia · 1 → 1 dia · 2 → 3 dias · 3 → 7 dias
 */

import type { Store } from "../hooks/useProgress";
import { WEEKS, WEEK_VERBS, type Week } from "../data/curriculum";
import { WEEKS_IT, WEEK_VERBS_IT } from "../data/curriculum-it";
import { WEEKS_DE, WEEK_VERBS_DE } from "../data/curriculum-de";
import { WEEKS_ES, WEEK_VERBS_ES } from "../data/curriculum-es";
import { WEEKS_EN, WEEK_VERBS_EN } from "../data/curriculum-en";
import { WEEKS_ZH, WEEK_VERBS_ZH } from "../data/curriculum-zh";
import { WEEKS_JA, WEEK_VERBS_JA } from "../data/curriculum-ja";
import { VERB_LIST } from "../data/verbs";
import { VERB_LIST_IT } from "../data/verbs-it";
import { VERBS_DE } from "../data/verbs-de";
import { VERBS_ES } from "../data/verbs-es";
import { VERBS_EN } from "../data/verbs-en";
import { VERBS_ZH } from "../data/verbs-zh";
import { VERBS_JA } from "../data/verbs-ja";

export interface LangMeta {
  code: string;
  name: string;
  flag: string;
  speech: string;
  readingLabel: string; // IPA | pinyin | romaji
}

export const FC_LANGS: LangMeta[] = [
  { code: "fr", name: "Francês", flag: "fr", speech: "fr-FR", readingLabel: "IPA" },
  { code: "it", name: "Italiano", flag: "it", speech: "it-IT", readingLabel: "IPA" },
  { code: "de", name: "Alemão", flag: "de", speech: "de-DE", readingLabel: "IPA" },
  { code: "es", name: "Espanhol", flag: "es", speech: "es-ES", readingLabel: "IPA" },
  { code: "en", name: "Inglês", flag: "gb", speech: "en-GB", readingLabel: "IPA" },
  { code: "zh", name: "Mandarim", flag: "cn", speech: "zh-CN", readingLabel: "pinyin" },
  { code: "ja", name: "Japonês", flag: "jp", speech: "ja-JP", readingLabel: "romaji" },
];

const langMetaMap: Record<string, LangMeta> = Object.fromEntries(FC_LANGS.map((l) => [l.code, l]));

const WEEKS_MAP: Record<string, Week[]> = {
  fr: WEEKS, it: WEEKS_IT, de: WEEKS_DE, es: WEEKS_ES, en: WEEKS_EN, zh: WEEKS_ZH, ja: WEEKS_JA,
};
const WEEKVERBS_MAP: Record<string, Record<string, string[]>> = {
  fr: WEEK_VERBS, it: WEEK_VERBS_IT, de: WEEK_VERBS_DE, es: WEEK_VERBS_ES, en: WEEK_VERBS_EN, zh: WEEK_VERBS_ZH, ja: WEEK_VERBS_JA,
};
const VERBS_MAP: Record<string, { inf: string; pt: string; py?: string }[]> = {
  fr: VERB_LIST, it: VERB_LIST_IT, de: VERBS_DE, es: VERBS_ES, en: VERBS_EN, zh: VERBS_ZH, ja: VERBS_JA,
};

export interface FlashCard {
  id: string;
  lang: string;
  kind: "vocab" | "verb";
  word: string;
  reading?: string; // IPA / pinyin / romaji
  pt: string;
  week: number;
  unlocked: boolean;
}

export interface CardState {
  b: number; // caixa Leitner 0–3
  t: number; // timestamp da última avaliação
}

const DAY = 86400000;
const INTERVALS = [0, DAY, 3 * DAY, 7 * DAY];

/** Cartão está "em dia" de revisão? */
export function isDue(state: CardState | undefined): boolean {
  if (!state) return true; // nova
  return Date.now() - state.t >= INTERVALS[Math.min(state.b, 3)];
}

export const INTERVAL_LABELS = ["<10 min", "1 dia", "3 dias", "7 dias"];

export interface Catalog {
  cards: FlashCard[];
  unlockedByLang: Record<string, number>;
  totalByLang: Record<string, number>;
}

/** Constrói o catálogo completo a partir do progresso salvo. */
export function buildCatalog(store: Store): Catalog {
  const cards: FlashCard[] = [];
  const unlockedByLang: Record<string, number> = {};
  const totalByLang: Record<string, number> = {};

  for (const lang of FC_LANGS) {
    const weeks = WEEKS_MAP[lang.code];
    const verbs = VERBS_MAP[lang.code];
    const weekVerbs = WEEKVERBS_MAP[lang.code];
    const p = store.langs[lang.code];
    const days = p?.days ?? {};

    // vocabulário por semana
    const verbWeeks = new Map<string, number>();
    for (const w of weeks) {
      const vocabDay = (w.num - 1) * 7 + 1;
      const dialogueDay = (w.num - 1) * 7 + 2;
      const vocabUnlocked = Boolean(days[vocabDay] || (w.num === 13 && days[dialogueDay]));
      w.vocab.forEach((v, i) => {
        cards.push({
          id: `${lang.code}:w${w.num}:${i}`,
          lang: lang.code,
          kind: "vocab",
          word: v.fr,
          reading: v.ipa || undefined,
          pt: v.pt,
          week: w.num,
          unlocked: vocabUnlocked,
        });
      });
      const quizDay = (w.num - 1) * 7 + 3;
      const verbsUnlocked = Boolean(days[quizDay]);
      for (const inf of weekVerbs[w.id] ?? []) {
        if (verbsUnlocked) verbWeeks.set(inf, w.num);
      }
    }

    // verbos do conjugador
    const extraVerbsUnlocked = Boolean(days[87]);
    for (const v of verbs) {
      const wk = verbWeeks.get(v.inf);
      cards.push({
        id: `${lang.code}:v:${v.inf}`,
        lang: lang.code,
        kind: "verb",
        word: v.inf,
        reading: v.py || undefined,
        pt: v.pt,
        week: wk ?? 13,
        unlocked: wk !== undefined || extraVerbsUnlocked,
      });
    }

    totalByLang[lang.code] = cards.filter((c) => c.lang === lang.code).length;
    unlockedByLang[lang.code] = cards.filter((c) => c.lang === lang.code && c.unlocked).length;
  }

  return { cards, unlockedByLang, totalByLang };
}

/* ------------------------- exportações ------------------------- */

function escCsv(s: string): string {
  return `"${s.replace(/"/g, '""')}"`;
}

/**
 * Arquivo de importação do Anki (texto com tab).
 * Colunas: Frente | Verso | Leitura | Tags
 */
export function buildAnkiExport(cards: FlashCard[]): string {
  const rows = cards.map((c) => {
    const meta = langMetaMap[c.lang];
    const hasReading = Boolean(c.reading && (c.lang === "zh" || c.lang === "ja"));
    const front = hasReading
      ? `${c.word}<br><span style="font-size:14px">${c.reading}</span>`
      : c.word;
    const back = `${c.pt}<br><i>${meta.name}</i>`;
    const read = c.reading ?? "";
    return [front, back, read, `rumo::${c.lang}::${c.kind}`].join("\t");
  });
  return ["#separator:tab", "#html:true", "#tags column:4", ...rows].join("\n");
}

/** CSV genérico (Excel / Sheets / outros apps de flashcards). */
export function buildCsvExport(cards: FlashCard[]): string {
  const header = ["Idioma", "Tipo", "Frente", "Leitura", "Verso", "Semana"];
  const rows = cards.map((c) =>
    [
      langMetaMap[c.lang].name,
      c.kind === "verb" ? "verbo" : "vocabulário",
      c.word,
      c.reading ?? "",
      c.pt,
      String(c.week),
    ]
      .map(escCsv)
      .join(","),
  );
  return [header.map(escCsv).join(","), ...rows].join("\n");
}
