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
  return _lang === "it" ? WEEKS_IT : _lang === "de" ? WEEKS_DE : WEEKS;
}
export function weekVerbs(): Record<string, string[]> {
  return _lang === "it" ? WEEK_VERBS_IT : _lang === "de" ? WEEK_VERBS_DE : WEEK_VERBS;
}

/* -------------------------- verbos --------------------------- */

export function verbList(): VerbShape[] {
  return (_lang === "it" ? VERB_LIST_IT : _lang === "de" ? VERBS_DE : VERB_LIST) as VerbShape[];
}
export function conjugateLang(inf: string): string[] | null {
  return _lang === "it" ? conjugateIT(inf) : _lang === "de" ? conjugateDE(inf) : conjugateFR(inf);
}
export function withPronounLang(person: number, form: string): string {
  return _lang === "it" ? withPronounIT(person, form) : _lang === "de" ? withPronounDE(person, form) : withPronounFR(person, form);
}
export function pronouns(): string[] {
  return _lang === "it" ? IT_PRONOUNS : _lang === "de" ? DE_PRONOUNS : PRONOUNS;
}
export function groupLabel(g: 1 | 2 | 3): string {
  return _lang === "it" ? GROUP_LABEL_IT[g] : _lang === "de" ? DE_GROUP_LABEL[g] : GROUP_LABEL[g];
}
export function groupColor(g: 1 | 2 | 3): string {
  return _lang === "it" ? GROUP_COLOR_IT[g] : _lang === "de" ? DE_GROUP_COLOR[g] : GROUP_COLOR[g];
}
export function conjugatorUrl(inf: string): string {
  const base = inf.replace(/^s'|^se |^sich /, "").replace(/'/g, "-");
  if (_lang === "it") return `https://conjugator.reverso.net/conjugation-italian-verb-${base}.html`;
  if (_lang === "de") return `https://conjugator.reverso.net/conjugation-german-verb-${base}.html`;
  return reversoUrlFR(inf);
}
export function conjugatorSourceUrl(): string {
  if (_lang === "it") return "https://conjugator.reverso.net/index-italian-1-250.html";
  if (_lang === "de") return "https://conjugator.reverso.net/index-german-1-250.html";
  return VERB_SOURCE_URL;
}

/* --------------------------- áudio --------------------------- */

export function speechLang(): string {
  return _lang === "it" ? "it-IT" : _lang === "de" ? "de-DE" : "fr-FR";
}

/* --------------------- metadados do idioma ------------------- */

export function langMeta(): { name: string; native: string; flag: string; greeting: string } {
  const map = {
    fr: { name: "Francês", native: "Français", flag: "fr", greeting: "Bonjour !" },
    it: { name: "Italiano", native: "Italiano", flag: "it", greeting: "Ciao!" },
    de: { name: "Alemão", native: "Deutsch", flag: "de", greeting: "Hallo!" },
  } as const;
  return _lang === "it" ? map.it : _lang === "de" ? map.de : map.fr;
}
