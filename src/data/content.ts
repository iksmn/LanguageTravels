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
import { WEEKS_ZH, WEEK_VERBS_ZH } from "./curriculum-zh";
import { VERBS_ZH } from "./verbs-zh";
import { CAST_ZH, GROUP_QUOTE_ZH } from "./cast-zh";
import { WEEKS_JA, WEEK_VERBS_JA } from "./curriculum-ja";
import { VERBS_JA, conjugateJA, withPronounJA, JA_FORMS, JA_GROUP_LABEL, JA_GROUP_COLOR } from "./verbs-ja";
import { CAST_JA, GROUP_QUOTE_JA } from "./cast-ja";
import { DICTEES_FR, type DicteeLine } from "./dictees-fr";

export interface VerbShape {
  inf: string;
  g: 1 | 2 | 3;
  pt: string;
  py?: string; // pinyin (mandarim)
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
    case "zh": return WEEKS_ZH;
    case "ja": return WEEKS_JA;
    default: return WEEKS;
  }
}
export function weekVerbs(): Record<string, string[]> {
  switch (_lang) {
    case "it": return WEEK_VERBS_IT;
    case "de": return WEEK_VERBS_DE;
    case "es": return WEEK_VERBS_ES;
    case "en": return WEEK_VERBS_EN;
    case "zh": return WEEK_VERBS_ZH;
    case "ja": return WEEK_VERBS_JA;
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
    case "zh": return VERBS_ZH as VerbShape[];
    case "ja": return VERBS_JA as VerbShape[];
    default: return VERB_LIST as VerbShape[];
  }
}
export function conjugateLang(inf: string): string[] | null {
  switch (_lang) {
    case "it": return conjugateIT(inf);
    case "de": return conjugateDE(inf);
    case "es": return conjugateES(inf);
    case "en": return conjugateEN(inf);
    case "zh": return null; // mandarim não conjuga
    case "ja": return conjugateJA(inf);
    default: return conjugateFR(inf);
  }
}
export function withPronounLang(person: number, form: string): string {
  switch (_lang) {
    case "it": return withPronounIT(person, form);
    case "de": return withPronounDE(person, form);
    case "es": return withPronounES(person, form);
    case "en": return withPronounEN(person, form);
    case "zh": return form;
    case "ja": return withPronounJA(person, form);
    default: return withPronounFR(person, form);
  }
}
export function pronouns(): string[] {
  switch (_lang) {
    case "it": return IT_PRONOUNS;
    case "de": return DE_PRONOUNS;
    case "es": return ES_PRONOUNS;
    case "en": return EN_PRONOUNS;
    case "zh": return ["我 wǒ", "你 nǐ", "他/她 tā", "我们", "你们", "他们"];
    case "ja": return JA_FORMS;
    default: return PRONOUNS;
  }
}
export function groupLabel(g: 1 | 2 | 3): string {
  switch (_lang) {
    case "it": return GROUP_LABEL_IT[g];
    case "de": return DE_GROUP_LABEL[g];
    case "es": return ES_GROUP_LABEL[g];
    case "en": return EN_GROUP_LABEL[g];
    case "zh": return g === 1 ? "Ação 动作" : g === 2 ? "Estado 状态" : "Modal 能愿";
    case "ja": return JA_GROUP_LABEL[g];
    default: return GROUP_LABEL[g];
  }
}
export function groupColor(g: 1 | 2 | 3): string {
  switch (_lang) {
    case "it": return GROUP_COLOR_IT[g];
    case "de": return DE_GROUP_COLOR[g];
    case "es": return ES_GROUP_COLOR[g];
    case "en": return EN_GROUP_COLOR[g];
    case "zh": return g === 1 ? "#0e8f8b" : g === 2 ? "#e8930c" : "#d7263d";
    case "ja": return JA_GROUP_COLOR[g];
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
    case "zh": {
      const v = VERBS_ZH.find((x) => x.inf === inf);
      return `https://www.mdbg.net/chinese/dictionary?page=worddict&wdrst=0&wdqb=${encodeURIComponent(v?.py ?? inf)}`;
    }
    case "ja": {
      const v = VERBS_JA.find((x) => x.inf === inf);
      return `https://conjugator.reverso.net/conjugation-japanese-verb-${encodeURIComponent(v?.py ?? inf).replace(/\s+/g, "-")}.html`;
    }
    default: return reversoUrlFR(inf);
  }
}
export function conjugatorSourceUrl(): string {
  switch (_lang) {
    case "it": return "https://conjugator.reverso.net/index-italian-1-250.html";
    case "de": return "https://conjugator.reverso.net/index-german-1-250.html";
    case "es": return "https://conjugator.reverso.net/index-spanish-1-250.html";
    case "en": return "https://conjugator.reverso.net/index-english-1-250.html";
    case "zh": return "https://www.mdbg.net/chinese/dictionary";
    case "ja": return "https://conjugator.reverso.net/index-japanese-1-250.html";
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
    case "zh": return "zh-CN";
    case "ja": return "ja-JP";
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
    zh: { name: "Mandarim", native: "中文", flag: "cn", greeting: "你好！" },
    ja: { name: "Japonês", native: "日本語", flag: "jp", greeting: "こんにちは！" },
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
    case "zh": return CAST_ZH;
    case "ja": return CAST_JA;
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
    case "zh": return GROUP_QUOTE_ZH;
    case "ja": return GROUP_QUOTE_JA;
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

/**
 * Linhas de ditado do dia (Cahier de copie).
 * A quantidade cresce ao longo da semana: 1 frase nos dias 1–2,
 * 2 nos dias 3–4 e todas (3) do dia 5 em diante.
 * Por enquanto só o francês tem corpus próprio; os demais retornam [].
 */
export function dicteeLines(weekId: string, dayInWeek: number): DicteeLine[] {
  const all = _lang === "fr" ? DICTEES_FR[weekId] ?? [] : [];
  if (!all.length) return [];
  const count = dayInWeek <= 2 ? 1 : dayInWeek <= 4 ? 2 : all.length;
  return all.slice(0, count);
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
