/**
 * Alemão · ~240 verbos essenciais (presente do indicativo).
 * Grupos: 1 = regulares · 2 = com alternância vocálica (du/er) · 3 = irregulares especiais.
 */

export interface VerbDe {
  inf: string;
  g: 1 | 2 | 3;
  pt: string;
}

export const DE_PRONOUNS = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"];
export const DE_GROUP_LABEL: Record<1 | 2 | 3, string> = {
  1: "regulares",
  2: "alternância vocálica",
  3: "irregulares",
};
export const DE_GROUP_COLOR: Record<1 | 2 | 3, string> = { 1: "#0e8f8b", 2: "#e8930c", 3: "#d7263d" };

const V = (inf: string, g: 1 | 2 | 3, pt: string): VerbDe => ({ inf, g, pt });

export const VERB_LIST_DE: VerbDe[] = [
  // ── especiais (grupo 3) ─────────────────────────────
  V("sein", 3, "ser, estar"), V("haben", 3, "ter"), V("werden", 3, "tornar-se, ficar"),
  V("können", 3, "poder, saber fazer"), V("müssen", 3, "ter que"), V("wollen", 3, "querer"),
  V("dürfen", 3, "ter permissão"), V("sollen", 3, "dever"), V("mögen", 3, "gostar"),
  V("wissen", 3, "saber"), V("tun", 3, "fazer"),
  // ── alternância vocálica (grupo 2) ──────────────────
  V("sehen", 2, "ver"), V("fahren", 2, "dirigir, ir"), V("sprechen", 2, "falar"),
  V("nehmen", 2, "pegar, levar"), V("geben", 2, "dar"), V("essen", 2, "comer"),
  V("lesen", 2, "ler"), V("helfen", 2, "ajudar"), V("treffen", 2, "encontrar"),
  V("werfen", 2, "arremessar"), V("sterben", 2, "morrer"), V("vergessen", 2, "esquecer"),
  V("empfehlen", 2, "recomendar"), V("laufen", 2, "correr, andar"), V("schlafen", 2, "dormir"),
  V("tragen", 2, "carregar, vestir"), V("waschen", 2, "lavar"), V("fallen", 2, "cair"),
  V("halten", 2, "segurar, parar"), V("lassen", 2, "deixar"), V("raten", 2, "adivinhar, aconselhar"),
  V("stoßen", 2, "empurrar, chocar"), V("fangen", 2, "pegar, capturar"), V("messen", 2, "medir"),
  V("anfangen", 2, "começar"), V("einladen", 2, "convidar"), V("unterhalten", 2, "entreter, conversar"),
  // ── regulares (grupo 1) ─────────────────────────────
  V("kommen", 1, "vir"), V("gehen", 1, "ir a pé"), V("finden", 1, "encontrar, achar"),
  V("bleiben", 1, "ficar, permanecer"), V("liegen", 1, "estar deitado"), V("stehen", 1, "estar em pé"),
  V("sitzen", 1, "sentar-se"), V("heißen", 1, "chamar-se"), V("denken", 1, "pensar"),
  V("glauben", 1, "acreditar"), V("trinken", 1, "beber"), V("singen", 1, "cantar"),
  V("schwimmen", 1, "nadar"), V("schreiben", 1, "escrever"), V("spielen", 1, "jogar, tocar"),
  V("arbeiten", 1, "trabalhar"), V("lernen", 1, "aprender"), V("wohnen", 1, "morar"),
  V("kaufen", 1, "comprar"), V("verkaufen", 1, "vender"), V("zahlen", 1, "pagar"),
  V("kosten", 1, "custar"), V("machen", 1, "fazer"), V("sagen", 1, "dizer"),
  V("fragen", 1, "perguntar"), V("antworten", 1, "responder"), V("hören", 1, "ouvir"),
  V("schauen", 1, "olhar"), V("suchen", 1, "procurar"), V("zeigen", 1, "mostrar"),
  V("brauchen", 1, "precisar"), V("verstehen", 1, "entender"), V("erklären", 1, "explicar"),
  V("erzählen", 1, "contar"), V("versuchen", 1, "tentar"), V("gewinnen", 1, "vencer, ganhar"),
  V("verlieren", 1, "perder"), V("öffnen", 1, "abrir"), V("schließen", 1, "fechar"),
  V("beginnen", 1, "começar"), V("aufhören", 1, "parar"), V("warten", 1, "esperar"),
  V("hoffen", 1, "ter esperança"), V("wünschen", 1, "desejar"), V("träumen", 1, "sonhar"),
  V("lieben", 1, "amar"), V("küssen", 1, "beijar"), V("tanzen", 1, "dançar"),
  V("feiern", 1, "celebrar, festejar"), V("gratulieren", 1, "parabenizar"), V("schenken", 1, "presentear"),
  V("bekommen", 1, "receber, ganhar"), V("schicken", 1, "enviar"), V("bringen", 1, "trazer"),
  V("holen", 1, "buscar"), V("besuchen", 1, "visitar"), V("reisen", 1, "viajar"),
  V("fliegen", 1, "voar"), V("wandern", 1, "caminhar, fazer trilha"), V("klettern", 1, "escalar"),
  V("atmen", 1, "respirar"), V("riechen", 1, "cheirar"), V("schmecken", 1, "ter gosto, provar"),
  V("kochen", 1, "cozinhar"), V("backen", 1, "assar"), V("putzen", 1, "limpar"),
  V("reparieren", 1, "consertar"), V("mieten", 1, "alugar"), V("reservieren", 1, "reservar"),
  V("bestellen", 1, "pedir, encomendar"), V("probieren", 1, "experimentar"), V("frühstücken", 1, "tomar café da manhã"),
  V("duschen", 1, "tomar banho"), V("baden", 1, "banhar-se"), V("kennen", 1, "conhecer"),
  V("nennen", 1, "chamar, nomear"), V("gelten", 1, "valer"), V("scheinen", 1, "parecer, brilhar"),
  V("bedeuten", 1, "significar"), V("passieren", 1, "acontecer"), V("fehlen", 1, "faltar"),
  V("gehören", 1, "pertencer"), V("erhalten", 1, "receber, obter"), V("erreichen", 1, "alcançar"),
  V("schaffen", 1, "conseguir, criar"), V("entwickeln", 1, "desenvolver"), V("entdecken", 1, "descobrir"),
  V("erfinden", 1, "inventar"), V("erforschen", 1, "pesquisar, explorar"), V("beobachten", 1, "observar"),
  V("untersuchen", 1, "examinar"), V("vergleichen", 1, "comparar"), V("diskutieren", 1, "discutir"),
  V("entscheiden", 1, "decidir"), V("planen", 1, "planejar"), V("organisieren", 1, "organizar"),
  V("wiederholen", 1, "repetir"), V("üben", 1, "praticar, treinar"), V("verbessern", 1, "melhorar"),
  V("ändern", 1, "mudar, alterar"), V("wechseln", 1, "trocar"), V("bewegen", 1, "mover"),
  V("drücken", 1, "apertar, pressionar"), V("ziehen", 1, "puxar, mudar-se"), V("schieben", 1, "empurrar"),
  V("steigen", 1, "subir"), V("sinken", 1, "descer, afundar"), V("wachsen", 1, "crescer"),
  V("pflanzen", 1, "plantar"), V("regnen", 1, "chover"), V("schneien", 1, "nevar"),
  V("frieren", 1, "congelar"), V("leuchten", 1, "brilhar, iluminar"), V("strahlen", 1, "irradiar, brilhar"),
  V("funkeln", 1, "cintilar"), V("blinken", 1, "piscar"), V("glänzen", 1, "brilhar, reluzir"),
  V("danken", 1, "agradecer"), V("entschuldigen", 1, "desculpar"), V("stören", 1, "incomodar"),
  V("einladen", 1, "convidar"), V("feiern", 1, "celebrar"), V("lachen", 1, "rir"),
  V("weinen", 1, "chorar"), V("lächeln", 1, "sorrir"), V("umarmen", 1, "abraçar"),
  // ── futebol ──────────────────────────────────────────
  V("schießen", 1, "chutar, marcar gol"), V("trainieren", 1, "treinar"), V("anfeuern", 1, "torcer por"),
  V("jubeln", 1, "comemorar"), V("pfeifen", 1, "apitar"), V("verteidigen", 1, "defender"),
  V("angreifen", 1, "atacar"), V("passen", 1, "passar a bola"), V("dribbeln", 1, "driblar"),
  V("anstoßen", 1, "dar a saída, brindar"), V("meistern", 1, "dominar, vencer"), V("aufsteigen", 1, "subir de divisão"),
  // ── astronomia ───────────────────────────────────────
  V("kreisen", 1, "orbitar, girar"), V("umkreisen", 1, "orbitar ao redor"), V("landen", 1, "pousar, aterrissar"),
  V("starten", 1, "decolar, iniciar"), V("glühen", 1, "incandescer"), V("blinzeln", 1, "piscar os olhos"),
  V("aufgehen", 1, "nascer (astro), abrir"), V("untergehen", 1, "pôr-se (sol)"), V("erscheinen", 1, "aparecer"),
  V("leuchten", 1, "brilhar"), V("strahlen", 1, "brilhar forte"), V("funkeln", 1, "cintilar"),
  // ── separáveis comuns ────────────────────────────────
  V("aufstehen", 1, "levantar-se"), V("ankommen", 1, "chegar"), V("abfahren", 1, "partir, sair"),
  V("abholen", 1, "buscar, pegar"), V("zurückkommen", 1, "voltar"), V("zurückgeben", 1, "devolver"),
  V("vorstellen", 1, "apresentar, imaginar"), V("anrufen", 1, "ligar, telefonar"),
  V("teilnehmen", 1, "participar"), V("stattfinden", 1, "acontecer, realizar-se"),
  V("einkaufen", 1, "fazer compras"), V("fernsehen", 1, "assistir TV"),
  V("vorbereiten", 1, "preparar"), V("abhängen", 1, "depender"), V("mitkommen", 1, "vir junto"),
  V("anstoßen", 1, "brindar"), V("ausgehen", 1, "sair (à noite)"), V("losgehen", 1, "começar, partir"),
  // ── reflexivos ───────────────────────────────────────
  V("sich freuen", 1, "alegrar-se"), V("sich erinnern", 1, "lembrar-se"),
  V("sich interessieren", 1, "interessar-se"), V("sich fühlen", 1, "sentir-se"),
  V("sich setzen", 1, "sentar-se"), V("sich treffen", 1, "encontrar-se"),
  V("sich unterhalten", 2, "conversar"), V("sich verlieben", 1, "apaixonar-se"),
];

/* dedupe (mantém a primeira ocorrência) */
const seen = new Set<string>();
export const VERBS_DE: VerbDe[] = VERB_LIST_DE.filter((v) => (seen.has(v.inf) ? false : (seen.add(v.inf), true)));
export const VERB_MAP_DE: Record<string, VerbDe> = Object.fromEntries(VERBS_DE.map((v) => [v.inf, v]));

/* ------------------------------------------------------------------ */
/*  Conjugador — presente do indicativo                               */
/* ------------------------------------------------------------------ */

const IRREG_DE: Record<string, string> = {
  sein: "bin,bist,ist,sind,seid,sind",
  haben: "habe,hast,hat,haben,habt,haben",
  werden: "werde,wirst,wird,werden,werdet,werden",
  wissen: "weiß,weißt,weiß,wissen,wisst,wissen",
  tun: "tue,tust,tut,tun,tut,tun",
  können: "kann,kannst,kann,können,könnt,können",
  müssen: "muss,musst,muss,müssen,müsst,müssen",
  wollen: "will,willst,will,wollen,wollt,wollen",
  dürfen: "darf,darfst,darf,dürfen,dürft,dürfen",
  sollen: "soll,sollst,soll,sollen,sollt,sollen",
  mögen: "mag,magst,mag,mögen,mögt,mögen",
};

/* alternância e→i / e→ie no radical du/er */
const STEM2: Record<string, string> = {
  sehen: "sieh", lesen: "lies", empfehlen: "empfiehl", sprechen: "sprich",
  essen: "iss", geben: "gib", nehmen: "nimm", helfen: "hilf", treffen: "trif",
  werfen: "wirf", sterben: "stirb", vergessen: "vergiss", messen: "miss",
  gelten: "gilt", teilnehmen: "teilnimm",
};

/* umlaut a→ä / o→ö / u→ü no radical du/er */
const UMLAUT: Record<string, string> = {
  fahren: "ä", laufen: "ä", schlafen: "ä", tragen: "ä", waschen: "ä", fallen: "ä",
  halten: "ä", lassen: "ä", raten: "ä", stoßen: "ö", fangen: "ä", unterhalten: "ä",
  anfangen: "ä", einladen: "ä",
};

const SEPARABLE = [
  "zurück", "zusammen", "weiter", "entgegen", "vorbei", "fest", "fern",
  "an", "auf", "aus", "bei", "ein", "los", "mit", "nach", "vor", "weg", "ab", "zu",
];

const REFLEXIVE = new Set([
  "freuen", "erinnern", "interessieren", "fühlen", "setzen", "treffen", "unterhalten", "verlieben",
]);
const REFL_FORMS = ["mich", "dich", "sich", "uns", "euch", "sich"];

function stemOf(inf: string): string {
  if (inf.endsWith("n") && !inf.endsWith("en")) return inf.slice(0, -1); // wandern → wander
  return inf.endsWith("en") ? inf.slice(0, -2) : inf;
}

function needsE(stem: string): boolean {
  return /(t|d|chn|ffn|gn|dm|tm|ckn)$/.test(stem);
}
function sibilant(stem: string): boolean {
  return /(s|ß|z|tz)$/.test(stem);
}

function applyUmlaut(stem: string, target: string): string {
  return stem.replace(/[aou](?!.*[aou])/, target); // última vogal a/o/u
}

function conjugateBase(base: string): string[] {
  if (IRREG_DE[base]) return IRREG_DE[base].split(",");

  const stem = stemOf(base);
  const eln = stem.endsWith("el"); // lächeln → ich lächle

  const ich = eln ? stem.slice(0, -2) + "le" : stem + "e";

  // radical du/er: explícito (e→i/ie) ou com umlaut (a/o/u)
  let sDu = stem;
  if (STEM2[base]) sDu = STEM2[base];
  else if (UMLAUT[base]) sDu = applyUmlaut(stem, UMLAUT[base]);

  const eIns = needsE(stem);
  const du = sibilant(sDu) ? sDu + (eIns ? "est" : "t") : sDu + (eIns ? "est" : "st");
  const er = sDu + "t";
  const wir = base; // wir/sie = infinitivo na quase totalidade dos verbos
  const ihr = stem + (eIns || sibilant(stem) ? "et" : "t");
  const sie = base;
  return [ich, du, er, wir, ihr, sie];
}

/** Conjugação no presente. Separáveis: «fange … an». Reflexivos: «freue mich». */
export function conjugateDE(inf: string): string[] | null {
  if (IRREG_DE[inf]) return IRREG_DE[inf].split(",");

  // reflexivo: "sich freuen"
  if (inf.startsWith("sich ")) {
    const base = inf.slice(5);
    const forms = conjugateBase(base);
    return forms.map((f, i) => `${f} ${REFL_FORMS[i]}`);
  }

  // separável
  for (const prefix of SEPARABLE) {
    if (inf.startsWith(prefix) && inf.length > prefix.length + 2) {
      const base = inf.slice(prefix.length);
      const baseVerb =
        VERB_MAP_DE[base] ?? Object.values(VERB_MAP_DE).find((v) => v.inf === base);
      if (baseVerb || IRREG_DE[base]) {
        const forms = conjugateBase(base);
        return forms.map((f) => `${f} … ${prefix}`);
      }
    }
  }

  const verb = VERB_MAP_DE[inf];
  if (!verb) return null;
  return conjugateBase(inf);
}

export function withPronounDE(person: number, form: string): string {
  return `${DE_PRONOUNS[person].split("/")[0]} ${form}`;
}
