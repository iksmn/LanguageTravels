/**
 * Camada de conteúdo multi-idioma.
 * Guarda o idioma ativo (definido pelo App a partir do progresso) e expõe
 * getters que todos os módulos consomem — assim o app inteiro troca de
 * idioma sem reescrever cada componente.
 */
import type { LangCode, Week } from "./curriculum";
import { WEEKS, WEEK_VERBS } from "./curriculum";
import { WEEKS_IT, WEEK_VERBS_IT } from "./curriculum-it";
import { WEEKS_DE, WEEK_VERBS_DE } from "./curriculum-de";
import { WEEKS_ES, WEEK_VERBS_ES } from "./curriculum-es";
import {
  VERB_LIST,
  conjugate as conjugateFR,
  withPronoun as withPronounFR,
  PRONOUNS,
  GROUP_LABEL,
  GROUP_COLOR,
  reversoUrl as reversoUrlFR,
  VERB_SOURCE_URL,
} from "./verbs";
import {
  VERB_LIST_IT,
  conjugateIT,
  withPronounIT,
  IT_PRONOUNS,
  GROUP_LABEL_IT,
  GROUP_COLOR_IT,
} from "./verbs-it";
import {
  VERBS_DE,
  conjugateDE,
  withPronounDE,
  DE_PRONOUNS,
  DE_GROUP_LABEL,
  DE_GROUP_COLOR,
} from "./verbs-de";
import {
  VERBS_ES,
  conjugateES,
  withPronounES,
  ES_PRONOUNS,
  ES_GROUP_LABEL,
  ES_GROUP_COLOR,
} from "./verbs-es";
import {
  VERBS_EN,
  conjugateEN,
  withPronounEN,
  EN_PRONOUNS,
  EN_GROUP_LABEL,
  EN_GROUP_COLOR,
} from "./verbs-en";
import type { Character } from "./cast";
import { CHARACTERS, GROUP_QUOTE } from "./cast";
import { CAST_IT, GROUP_QUOTE_IT } from "./cast-it";
import { CAST_DE, GROUP_QUOTE_DE } from "./cast-de";
import { CAST_ES, GROUP_QUOTE_ES } from "./cast-es";
import { CAST_EN, GROUP_QUOTE_EN } from "./cast-en";
import { WEEKS_EN, WEEK_VERBS_EN } from "./curriculum-en";

export interface VerbShape {
  inf: string;
  g: 1 | 2 | 3;
  pt: string;
}

let _lang: LangCode = "fr";

export function setLang(l: LangCode) {
  _lang = l;
}
export function activeLang(): LangCode {
  return _lang;
}
export function isItalian(): boolean {
  return _lang === "it";
}

/* ------------------------- currículo ------------------------- */

export function weeks(): Week[] {
  switch (_lang) {
    case "it": return WEEKS_IT;
    case "de": return WEEKS_DE;
    case "es": return WEEKS_ES;
    case "en": return WEEKS_EN;
    default: return WEEKS;
  }
}
export function weekVerbs(): Record<string, string[]> {
  switch (_lang) {
    case "it": return WEEK_VERBS_IT;
    case "de": return WEEK_VERBS_DE;
    case "es": return WEEK_VERBS_ES;
    case "en": return WEEK_VERBS_EN;
    default: return WEEK_VERBS;
  }
}

/* -------------------------- verbos --------------------------- */

export function verbList(): VerbShape[] {
  switch (_lang) {
    case "it": return VERB_LIST_IT as VerbShape[];
    case "de": return VERBS_DE as VerbShape[];
    case "es": return VERBS_ES as VerbShape[];
    case "en": return VERBS_EN as VerbShape[];
    default: return VERB_LIST as VerbShape[];
  }
}
export function conjugateLang(inf: string): string[] | null {
  switch (_lang) {
    case "it": return conjugateIT(inf);
    case "de": return conjugateDE(inf);
    case "es": return conjugateES(inf);
    case "en": return conjugateEN(inf);
    default: return conjugateFR(inf);
  }
}
export function withPronounLang(person: number, form: string): string {
  switch (_lang) {
    case "it": return withPronounIT(person, form);
    case "de": return withPronounDE(person, form);
    case "es": return withPronounES(person, form);
    case "en": return withPronounEN(person, form);
    default: return withPronounFR(person, form);
  }
}
export function pronouns(): string[] {
  switch (_lang) {
    case "it": return IT_PRONOUNS;
    case "de": return DE_PRONOUNS;
    case "es": return ES_PRONOUNS;
    case "en": return EN_PRONOUNS;
    default: return PRONOUNS;
  }
}
export function groupLabel(g: 1 | 2 | 3): string {
  switch (_lang) {
    case "it": return GROUP_LABEL_IT[g];
    case "de": return DE_GROUP_LABEL[g];
    case "es": return ES_GROUP_LABEL[g];
    case "en": return EN_GROUP_LABEL[g];
    default: return GROUP_LABEL[g];
  }
}
export function groupColor(g: 1 | 2 | 3): string {
  switch (_lang) {
    case "it": return GROUP_COLOR_IT[g];
    case "de": return DE_GROUP_COLOR[g];
    case "es": return ES_GROUP_COLOR[g];
    case "en": return EN_GROUP_COLOR[g];
    default: return GROUP_COLOR[g];
  }
}
export function conjugatorUrl(inf: string): string {
  const base = inf.replace(/^s'|^se |^sich /, "").replace(/'/g, "-");
  switch (_lang) {
    case "it": return `https://conjugator.reverso.net/conjugation-italian-verb-${base}.html`;
    case "de": return `https://conjugator.reverso.net/conjugation-german-verb-${base}.html`;
    case "es": return `https://conjugator.reverso.net/conjugation-spanish-verb-${base}.html`;
    case "en": return `https://conjugator.reverso.net/conjugation-english-verb-${base}.html`;
    default: return reversoUrlFR(inf);
  }
}
export function conjugatorSourceUrl(): string {
  switch (_lang) {
    case "it": return "https://conjugator.reverso.net/index-italian-1-250.html";
    case "de": return "https://conjugator.reverso.net/index-german-1-250.html";
    case "es": return "https://conjugator.reverso.net/index-spanish-1-250.html";
    case "en": return "https://conjugator.reverso.net/index-english-1-250.html";
    default: return VERB_SOURCE_URL;
  }
}

/* --------------------------- áudio --------------------------- */

export function speechLang(): string {
  switch (_lang) {
    case "it": return "it-IT";
    case "de": return "de-DE";
    case "es": return "es-ES";
    case "en": return "en-GB";
    default: return "fr-FR";
  }
}

/* --------------------- metadados do idioma ------------------- */

export function langMeta(): { name: string; native: string; flag: string; greeting: string } {
  const map: Record<string, { name: string; native: string; flag: string; greeting: string }> = {
    fr: { name: "Francês", native: "Français", flag: "fr", greeting: "Bonjour !" },
    it: { name: "Italiano", native: "Italiano", flag: "it", greeting: "Ciao!" },
    de: { name: "Alemão", native: "Deutsch", flag: "de", greeting: "Hallo!" },
    es: { name: "Espanhol", native: "Español", flag: "es", greeting: "¡Hola!" },
    en: { name: "Inglês", native: "English", flag: "gb", greeting: "Hello!" },
  };
  return map[_lang] ?? map.fr;
}

/* --------------------------- elenco ---------------------------- */

/** Nome canônico (francês) de cada personagem, usado como chave nas rotas. */
const FRENCH_FIRST: Record<string, string> = {
  thomas: "Thomas",
  julien: "Julien",
  marc: "Marc",
  lea: "Léa",
  camille: "Camille",
  sophie: "Sophie",
};

export function castList(): Character[] {
  switch (_lang) {
    case "it": return CAST_IT;
    case "de": return CAST_DE;
    case "es": return CAST_ES;
    case "en": return CAST_EN;
    default: return CHARACTERS;
  }
}

export function castMap(): Record<string, Character> {
  return Object.fromEntries(castList().map((c) => [c.id, c]));
}

export function groupQuote(): { fr: string; pt: string } {
  switch (_lang) {
    case "it": return GROUP_QUOTE_IT;
    case "de": return GROUP_QUOTE_DE;
    case "es": return GROUP_QUOTE_ES;
    case "en": return GROUP_QUOTE_EN;
    default: return GROUP_QUOTE;
  }
}

const normName = (s: string) =>
  s
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

/** Resolve quem fala: aceita id canônico, nome do personagem ativo ou nome francês. */
export function resolveSpeaker(raw: string): Character | undefined {
  const list = castList();
  const r = normName(raw);
  const bySelf = list.find(
    (c) => normName(c.id) === r || normName(c.name) === r || normName(c.name.split(" ")[0]) === r,
  );
  if (bySelf) return bySelf;
  const canon = Object.keys(FRENCH_FIRST).find((k) => normName(FRENCH_FIRST[k]) === r);
  if (canon) return list.find((c) => c.id === canon);
  return undefined;
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Troca os nomes franceses de um texto pelos nomes do elenco ativo. */
export function localizeNames(text: string): string {
  const list = castList();
  let out = text;
  for (const c of list) {
    const frName = FRENCH_FIRST[c.id];
    if (!frName) continue;
    const localFirst = c.name.split(" ")[0];
    out = out.replace(new RegExp(`\\b${escapeRegExp(frName)}\\b`, "g"), localFirst);
  }
  return out;
}
