import { WEEKS, type Week } from "../data/curriculum";
import type { IconName } from "../components/Icons";

export const SESSION_ICONS: Record<string, IconName> = {
  vocab: "book",
  dialogue: "chat",
  quiz: "help",
  review: "repeat",
  listening: "ear",
  challenge: "trophy",
  culture: "sparkle",
  exam: "cap",
};

export type SessionType =
  | "vocab"
  | "dialogue"
  | "quiz"
  | "review"
  | "listening"
  | "challenge"
  | "culture"
  | "exam";

export interface DayInfo {
  day: number;
  week: number; // 1..13
  type: SessionType;
  weekData: Week | null; // null na semana 13
}

export const TOTAL_DAYS = 90;
export const WEEKS_TOTAL = 13;

/** Tipo de sessão por dia dentro da semana (1..7). */
const WEEK_TYPES: SessionType[] = ["vocab", "dialogue", "quiz", "review", "listening", "challenge", "culture"];

/** Dias 85–90: a Grande Revisão. */
const FINAL_TYPES: SessionType[] = ["review", "review", "review", "listening", "challenge", "exam"];

export const SESSION_META: Record<SessionType, { label: string; color: string; xpHint: string }> = {
  vocab: { label: "Vocabulário", color: "#0e8f8b", xpHint: "+20 XP" },
  dialogue: { label: "Diálogo", color: "#2b6cb0", xpHint: "+20 XP" },
  quiz: { label: "Quiz da semana", color: "#d7263d", xpHint: "até +70 XP" },
  review: { label: "Revisão ativa", color: "#e8930c", xpHint: "12 XP/questão" },
  listening: { label: "Compreensão auditiva", color: "#8d4fa0", xpHint: "12 XP/questão" },
  challenge: { label: "Desafio", color: "#e4572e", xpHint: "12 XP/questão" },
  culture: { label: "Cultura", color: "#4a9c2f", xpHint: "+10 XP" },
  exam: { label: "Exame final A1", color: "#24457c", xpHint: "20 XP/questão" },
};

export function getDayInfo(day: number): DayInfo {
  const d = Math.min(Math.max(day, 1), TOTAL_DAYS);
  if (d <= 84) {
    const week = Math.ceil(d / 7);
    const dayInWeek = ((d - 1) % 7) + 1;
    return { day: d, week, type: WEEK_TYPES[dayInWeek - 1], weekData: WEEKS[week - 1] };
  }
  const idx = d - 85; // 0..5
  return { day: d, week: 13, type: FINAL_TYPES[idx], weekData: null };
}

/* ------------------------- RNG determinístico ------------------------- */

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(arr: T[], rng: () => number): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/* ---------------------- geradores de questões ------------------------- */

export interface GenQ {
  prompt: string;
  options: string[];
  a: number; // índice da correta
  audio?: string; // texto a ser falado (compreensão auditiva)
  why?: string;
}

type Pool = { fr: string; pt: string }[];

function pickDistractors(pool: Pool, correct: { fr: string; pt: string }, field: "fr" | "pt", n: number, rng: () => number): string[] {
  const others = pool.filter((v) => v.fr !== correct.fr).map((v) => v[field]);
  return shuffle([...new Set(others)], rng).slice(0, n);
}

function translateQs(pool: Pool, n: number, seed: number): GenQ[] {
  const rng = mulberry32(seed);
  return shuffle(pool, rng)
    .slice(0, n)
    .map((v) => {
      const opts = shuffle([v.pt, ...pickDistractors(pool, v, "pt", 3, rng)], rng);
      return {
        prompt: `O que significa «${v.fr}»?`,
        options: opts,
        a: opts.indexOf(v.pt),
        why: `«${v.fr}» = ${v.pt}.`,
      };
    });
}

function reverseQs(pool: Pool, n: number, seed: number): GenQ[] {
  const rng = mulberry32(seed);
  return shuffle(pool, rng)
    .slice(0, n)
    .map((v) => {
      const opts = shuffle([v.fr, ...pickDistractors(pool, v, "fr", 3, rng)], rng);
      return {
        prompt: `Como se diz “${v.pt}” em francês?`,
        options: opts,
        a: opts.indexOf(v.fr),
      };
    });
}

function listeningQs(pool: Pool, n: number, seed: number): GenQ[] {
  const rng = mulberry32(seed);
  return shuffle(pool, rng)
    .slice(0, n)
    .map((v) => {
      const opts = shuffle([v.fr, ...pickDistractors(pool, v, "fr", 3, rng)], rng);
      return {
        prompt: "Ouça e toque no que você ouviu",
        options: opts,
        a: opts.indexOf(v.fr),
        audio: v.fr,
        why: `Você ouviu «${v.fr}» — ${v.pt}.`,
      };
    });
}

function mixedQs(pool: Pool, n: number, seed: number): GenQ[] {
  const rng = mulberry32(seed);
  const t = translateQs(pool, Math.ceil(n / 2), seed + 7);
  const r = reverseQs(pool, Math.floor(n / 2), seed + 13);
  return shuffle([...t, ...r], rng);
}

function poolForWeeks(weekNums: number[]): Pool {
  return weekNums.flatMap((w) => (WEEKS[w - 1] ? WEEKS[w - 1].vocab : []));
}

const allWeeks = () => Array.from({ length: WEEKS.length }, (_, i) => i + 1);

/** Questões de uma sessão gerada (review / listening / challenge / exam). */
export function sessionQuestions(info: DayInfo, seed: number): GenQ[] {
  const { day, week, type } = info;
  if (week <= 12 && info.weekData) {
    const wk = info.weekData;
    const upTo = poolForWeeks(allWeeks().filter((w) => w <= week));
    switch (type) {
      case "review":
        return translateQs(wk.vocab, 5, seed);
      case "listening":
        return listeningQs(wk.vocab, 5, seed);
      case "challenge":
        return mixedQs(upTo, 8, seed);
      default:
        return [];
    }
  }
  // Semana 13 — dias 85..90
  const idx = day - 85;
  const full = poolForWeeks(allWeeks());
  switch (idx) {
    case 0:
      return translateQs(poolForWeeks([1, 2, 3, 4]), 6, seed);
    case 1:
      return reverseQs(poolForWeeks([5, 6, 7, 8]), 6, seed);
    case 2:
      return translateQs(poolForWeeks([9, 10, 11, 12]), 6, seed);
    case 3:
      return listeningQs(full, 6, seed);
    case 4:
      return mixedQs(full, 8, seed);
    case 5:
      return mixedQs(full, 10, seed);
    default:
      return [];
  }
}

/* ------------------------------ XP e níveis --------------------------- */

export const XP = {
  vocab: 20,
  dialogue: 20,
  culture: 10,
  perQuestion: 12,
  perfectBonus: 18,
  quizPerQuestion: 15,
  quizPerfectBonus: 25,
  examPerQuestion: 20,
  examPerfectBonus: 100,
  examPassScore: 6,
};

export const LEVEL_STEP = 300;

export const LEVEL_TITLES = [
  "Novice",
  "Débutant",
  "Apprenti",
  "Voyageur",
  "Explorateur",
  "Connaisseur",
  "Francophile",
  "Francophone",
];

export function levelFromXp(xp: number): number {
  return Math.floor(xp / LEVEL_STEP) + 1;
}

export function levelTitle(xp: number): string {
  const lvl = levelFromXp(xp);
  const t = LEVEL_TITLES[Math.min(lvl - 1, LEVEL_TITLES.length - 1)];
  return lvl > LEVEL_TITLES.length ? `${t} · Nv. ${lvl}` : t;
}

/** XP ganho ao concluir uma sessão com determinado desempenho. */
export function xpForSession(type: SessionType, score: number, total: number): number {
  const perfect = total > 0 && score === total;
  switch (type) {
    case "vocab":
      return XP.vocab;
    case "dialogue":
      return XP.dialogue;
    case "culture":
      return XP.culture;
    case "quiz":
      return score * XP.quizPerQuestion + (perfect ? XP.quizPerfectBonus : 0);
    case "exam":
      return score * XP.examPerQuestion + (perfect ? XP.examPerfectBonus : 0);
    default:
      return score * XP.perQuestion + (perfect ? XP.perfectBonus : 0);
  }
}

/** O carimbo da semana é garantido ao concluir o quiz (dia 3 da semana). */
export function weekStampDay(week: number): number | null {
  return week <= 12 ? (week - 1) * 7 + 3 : null;
}
