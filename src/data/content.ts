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
import { WEEKS_RU, WEEK_VERBS_RU } from "./curriculum-ru";
import { VERBS_RU, conjugateRU, withPronounRU, RU_PRONOUNS, RU_GROUP_LABEL, RU_GROUP_COLOR } from "./verbs-ru";
import { CAST_RU, GROUP_QUOTE_RU } from "./cast-ru";
import { WEEKS_FA, WEEK_VERBS_FA } from "./curriculum-fa";
import { VERBS_FA, conjugateFA, withPronounFA, FA_PRONOUNS, FA_GROUP_LABEL, FA_GROUP_COLOR } from "./verbs-fa";
import { CAST_FA, GROUP_QUOTE_FA } from "./cast-fa";
import { WEEKS_AR, WEEK_VERBS_AR } from "./curriculum-ar";
import { VERBS_AR, conjugateAR, withPronounAR, AR_PRONOUNS, AR_GROUP_LABEL, AR_GROUP_COLOR } from "./verbs-ar";
import { CAST_AR, GROUP_QUOTE_AR } from "./cast-ar";
import { DICTEES_FR, type DicteeLine } from "./dictees-fr";
import { DICTEES_IT } from "./dictees-it";
import { DICTEES_DE } from "./dictees-de";
import { DICTEES_ES } from "./dictees-es";
import { DICTEES_EN } from "./dictees-en";
import { DICTEES_RU } from "./dictees-ru";
import { DICTEES_ZH } from "./dictees-zh";
import { DICTEES_JA } from "./dictees-ja";
import { DICTEES_FA } from "./dictees-fa";
import { DICTEES_AR } from "./dictees-ar";

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
    case "ru": return WEEKS_RU;
    case "fa": return WEEKS_FA;
    case "ar": return WEEKS_AR;
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
    case "ru": return WEEK_VERBS_RU;
    case "fa": return WEEK_VERBS_FA;
    case "ar": return WEEK_VERBS_AR;
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
    case "ru": return VERBS_RU as VerbShape[];
    case "fa": return VERBS_FA as VerbShape[];
    case "ar": return VERBS_AR as VerbShape[];
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
    case "ru": return conjugateRU(inf);
    case "fa": return conjugateFA(inf);
    case "ar": return conjugateAR(inf);
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
    case "ru": return withPronounRU(person, form);
    case "fa": return withPronounFA(person, form);
    case "ar": return withPronounAR(person, form);
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
    case "ru": return RU_PRONOUNS;
    case "fa": return FA_PRONOUNS;
    case "ar": return AR_PRONOUNS;
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
    case "ru": return RU_GROUP_LABEL[g];
    case "fa": return FA_GROUP_LABEL[g];
    case "ar": return AR_GROUP_LABEL[g];
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
    case "ru": return RU_GROUP_COLOR[g];
    case "fa": return FA_GROUP_COLOR[g];
    case "ar": return AR_GROUP_COLOR[g];
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
    case "ru": return `https://conjugator.reverso.net/conjugation-russian-verb-${encodeURIComponent(inf)}.html`;
    case "ar": {
      const v = VERBS_AR.find((x) => x.inf === inf);
      return `https://conjugator.reverso.net/conjugation-arabic-verb-${encodeURIComponent(v?.py ?? inf)}.html`;
    }
    case "fa": {
      const v = VERBS_FA.find((x) => x.inf === inf);
      return `https://en.wiktionary.org/wiki/${encodeURIComponent(v?.py ?? inf)}`;
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
    case "ru": return "https://conjugator.reverso.net/index-russian-1-250.html";
    case "ar": return "https://conjugator.reverso.net/index-arabic-1-250.html";
    case "fa": return "https://en.wiktionary.org/wiki/Category:Persian_verbs";
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
    case "ru": return "ru-RU";
    case "fa": return "fa-IR";
    case "ar": return "ar-SA";
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
    ru: { name: "Russo", native: "Русский", flag: "ru", greeting: "Привет!" },
    fa: { name: "Farsi", native: "فارسی", flag: "ir", greeting: "سلام!" },
    ar: { name: "Árabe", native: "العربية", flag: "sa", greeting: "مرحبًا!" },
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
    case "ru": return CAST_RU;
    case "fa": return CAST_FA;
    case "ar": return CAST_AR;
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
    case "ru": return GROUP_QUOTE_RU;
    case "fa": return GROUP_QUOTE_FA;
    case "ar": return GROUP_QUOTE_AR;
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
 * Todos os idiomas têm corpus próprio no seu idioma.
 */
const DICTEES_BY_LANG: Record<string, Record<string, DicteeLine[]>> = {
  fr: DICTEES_FR,
  it: DICTEES_IT,
  de: DICTEES_DE,
  es: DICTEES_ES,
  en: DICTEES_EN,
  ru: DICTEES_RU,
  zh: DICTEES_ZH,
  ja: DICTEES_JA,
  fa: DICTEES_FA,
  ar: DICTEES_AR,
};

export function dicteeLines(weekId: string, dayInWeek: number): DicteeLine[] {
  const source = DICTEES_BY_LANG[_lang] ?? null;
  const all = source ? source[weekId] ?? [] : [];
  if (!all.length) return [];
  const count = dayInWeek <= 2 ? 1 : dayInWeek <= 4 ? 2 : all.length;
  return all.slice(0, count);
}

/** Escrita da direita para a esquerda? (árabe e farsi) */
export function isRtl(): boolean {
  return _lang === "ar" || _lang === "fa";
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

/* ----------------- rótulos de interface por idioma ----------------- */

export interface UiStrings {
  /** "Semaine 01" / "第01周" — prefixo + número + sufixo */
  weekPrefix: string;
  weekSuffix: string;
  grandeRevision: string;
  grandeRevisionShort: string;
  companions: string;
  companionsTitle: string;
  recit: string;
  didYouKnow: string;
  dayLabel: string; // "Jour" / "Tag" / "第"
  daySuffix: string; // "" ou "天" / "日"
  /* Cahier de copie */
  cahierTitle: string;
  cahierHint: string;
  linesWord: string;
  accuracy: string;
  validate: string;
  copied: string;
  placeholder: string;
  donePlaceholder: string;
  translation: string;
  hideTranslation: string;
  difficulty: string;
  toastPerfect: string;
}

const UI: Record<string, UiStrings> = {
  fr: { weekPrefix: "Semaine ", weekSuffix: "", grandeRevision: "La Grande Révision", grandeRevisionShort: "Grande révision", companions: "Compagnons", companionsTitle: "Les compagnons de voyage", recit: "Le récit", didYouKnow: "Le saviez-vous ?", dayLabel: "Jour", daySuffix: "", cahierTitle: "Cahier de copie", cahierHint: "Recopie chaque phrase à la main", linesWord: "ligne(s)", accuracy: "précision", validate: "Valider la copie", copied: "Copiée", placeholder: "Écris ici…", donePlaceholder: "Copie terminée ✓", translation: "Traduction", hideTranslation: "Cacher la traduction", difficulty: "Difficulté", toastPerfect: "Copie parfaite !" },
  it: { weekPrefix: "Settimana ", weekSuffix: "", grandeRevision: "La Grande Revisione", grandeRevisionShort: "Grande revisione", companions: "Compagni", companionsTitle: "I compagni di viaggio", recit: "Il racconto", didYouKnow: "Lo sapevi?", dayLabel: "Giorno", daySuffix: "", cahierTitle: "Quaderno di copiatura", cahierHint: "Riscrivi ogni frase a mano", linesWord: "riga(e)", accuracy: "precisione", validate: "Convalida la copia", copied: "Copiata", placeholder: "Scrivi qui…", donePlaceholder: "Copia completata ✓", translation: "Traduzione", hideTranslation: "Nascondi traduzione", difficulty: "Difficoltà", toastPerfect: "Copia perfetta !" },
  de: { weekPrefix: "Woche ", weekSuffix: "", grandeRevision: "Die Große Wiederholung", grandeRevisionShort: "Große Wiederholung", companions: "Gefährten", companionsTitle: "Die Reisegefährten", recit: "Die Geschichte", didYouKnow: "Wusstest du das?", dayLabel: "Tag", daySuffix: "", cahierTitle: "Schreibheft", cahierHint: "Schreibe jeden Satz von Hand ab", linesWord: "Zeile(n)", accuracy: "Genauigkeit", validate: "Kopie prüfen", copied: "Kopiert", placeholder: "Hier schreiben…", donePlaceholder: "Kopie fertig ✓", translation: "Übersetzung", hideTranslation: "Übersetzung ausblenden", difficulty: "Schwierigkeit", toastPerfect: "Perfekte Kopie !" },
  es: { weekPrefix: "Semana ", weekSuffix: "", grandeRevision: "La Gran Revisión", grandeRevisionShort: "Gran revisión", companions: "Compañeros", companionsTitle: "Los compañeros de viaje", recit: "El relato", didYouKnow: "¿Sabías que…?", dayLabel: "Día", daySuffix: "", cahierTitle: "Cuaderno de copia", cahierHint: "Copia cada frase a mano", linesWord: "línea(s)", accuracy: "precisión", validate: "Validar la copia", copied: "Copiada", placeholder: "Escribe aquí…", donePlaceholder: "Copia terminada ✓", translation: "Traducción", hideTranslation: "Ocultar traducción", difficulty: "Dificultad", toastPerfect: "¡Copia perfecta !" },
  en: { weekPrefix: "Week ", weekSuffix: "", grandeRevision: "The Grand Review", grandeRevisionShort: "Grand review", companions: "Companions", companionsTitle: "The travel companions", recit: "The tale", didYouKnow: "Did you know?", dayLabel: "Day", daySuffix: "", cahierTitle: "Copybook", cahierHint: "Copy each sentence by hand", linesWord: "line(s)", accuracy: "accuracy", validate: "Validate copy", copied: "Copied", placeholder: "Write here…", donePlaceholder: "Copy done ✓", translation: "Translation", hideTranslation: "Hide translation", difficulty: "Difficulty", toastPerfect: "Perfect copy !" },
  zh: { weekPrefix: "第", weekSuffix: "周", grandeRevision: "大复习", grandeRevisionShort: "大复习", companions: "伙伴们", companionsTitle: "旅途伙伴", recit: "旅途故事", didYouKnow: "你知道吗？", dayLabel: "第", daySuffix: "天", cahierTitle: "抄写本", cahierHint: "请逐字抄写每个句子", linesWord: "行", accuracy: "准确率", validate: "验证抄写", copied: "已完成", placeholder: "在这里写…", donePlaceholder: "抄写完成 ✓", translation: "翻译", hideTranslation: "隐藏翻译", difficulty: "难度", toastPerfect: "抄写完美！" },
  ja: { weekPrefix: "第", weekSuffix: "週", grandeRevision: "大復習", grandeRevisionShort: "大復習", companions: "仲間たち", companionsTitle: "旅の仲間", recit: "旅の物語", didYouKnow: "知ってた？", dayLabel: "第", daySuffix: "日", cahierTitle: "書き取り帳", cahierHint: "各文を手で書き写しましょう", linesWord: "行", accuracy: "正解率", validate: "書き取りを確認", copied: "完了", placeholder: "ここに書いて…", donePlaceholder: "書き取り完了 ✓", translation: "翻訳", hideTranslation: "翻訳を隠す", difficulty: "難易度", toastPerfect: "完璧な書き取り！" },
  ru: { weekPrefix: "Неделя ", weekSuffix: "", grandeRevision: "Большое повторение", grandeRevisionShort: "Повторение", companions: "Попутчики", companionsTitle: "Попутчики", recit: "История", didYouKnow: "Знаете ли вы?", dayLabel: "День", daySuffix: "", cahierTitle: "Тетрадь для письма", cahierHint: "Перепишите каждое предложение от руки", linesWord: "строк(и)", accuracy: "точность", validate: "Проверить", copied: "Готово", placeholder: "Пишите здесь…", donePlaceholder: "Готово ✓", translation: "Перевод", hideTranslation: "Скрыть перевод", difficulty: "Сложность", toastPerfect: "Отличное письмо !" },
  fa: { weekPrefix: "هفته ", weekSuffix: "", grandeRevision: "مرور بزرگ", grandeRevisionShort: "مرور", companions: "همسفران", companionsTitle: "همسفران", recit: "روایت", didYouKnow: "آیا می‌دانستید؟", dayLabel: "روز", daySuffix: "", cahierTitle: "دفتر رونویسی", cahierHint: "هر جمله را با دست رونویسی کنید", linesWord: "خط", accuracy: "دقت", validate: "بررسی رونویسی", copied: "انجام شد", placeholder: "اینجا بنویسید…", donePlaceholder: "رونویسی تمام شد ✓", translation: "ترجمه", hideTranslation: "پنهان کردن ترجمه", difficulty: "سختی", toastPerfect: "رونویسی عالی !" },
  ar: { weekPrefix: "الأسبوع ", weekSuffix: "", grandeRevision: "المراجعة الكبرى", grandeRevisionShort: "المراجعة", companions: "الرفاق", companionsTitle: "رفاق الرحلة", recit: "الحكاية", didYouKnow: "هل تعلم؟", dayLabel: "اليوم", daySuffix: "", cahierTitle: "كراسة النسخ", cahierHint: "انسخ كل جملة بخط اليد", linesWord: "أسطر", accuracy: "الدقة", validate: "تحقق من النسخ", copied: "تم", placeholder: "اكتب هنا…", donePlaceholder: "اكتمل النسخ ✓", translation: "الترجمة", hideTranslation: "إخفاء الترجمة", difficulty: "الصعوبة", toastPerfect: "نسخ مثالي !" },
};

export function uiStrings(): UiStrings {
  return UI[_lang] ?? UI.fr;
}

/** Etiqueta da semana: "Semaine 01", "第01周", "Woche 01"… */
export function weekTag(n: number): string {
  const ui = uiStrings();
  return `${ui.weekPrefix}${String(n).padStart(2, "0")}${ui.weekSuffix}`;
}
