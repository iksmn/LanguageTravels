/**
 * Espanhol · ~230 verbos essenciais (presente do indicativo).
 * Grupos: 1 = -ar · 2 = -er · 3 = -ir.
 * Inclui mudanças vocálicas (e→ie, o→ue, e→i, u→ue), irregulares de "yo"
 * e verbos reflexivos.
 */

export interface VerbEs {
  inf: string;
  g: 1 | 2 | 3;
  pt: string;
}

export const ES_PRONOUNS = ["yo", "tú", "él/ella", "nosotros", "vosotros", "ellos/ellas"];
export const ES_GROUP_LABEL: Record<1 | 2 | 3, string> = {
  1: "1ª conjug. · -ar",
  2: "2ª conjug. · -er",
  3: "3ª conjug. · -ir",
};
export const ES_GROUP_COLOR: Record<1 | 2 | 3, string> = { 1: "#0e8f8b", 2: "#e8930c", 3: "#d7263d" };

const V = (inf: string, g: 1 | 2 | 3, pt: string): VerbEs => ({ inf, g, pt });

const RAW_ES: VerbEs[] = [
  // ── irregulares totais ─────────────────────────────
  V("ser", 2, "ser"), V("estar", 1, "estar"), V("ir", 3, "ir"), V("haber", 2, "haver"),
  V("dar", 1, "dar"), V("saber", 2, "saber"), V("caber", 2, "caber"), V("ver", 2, "ver"), V("oír", 3, "ouvir"),
  // ── -ar (grupo 1) ──────────────────────────────────
  V("hablar", 1, "falar"), V("trabajar", 1, "trabalhar"), V("estudiar", 1, "estudar"),
  V("viajar", 1, "viajar"), V("visitar", 1, "visitar"), V("caminar", 1, "caminhar"),
  V("bailar", 1, "dançar"), V("cantar", 1, "cantar"), V("amar", 1, "amar"),
  V("gustar", 1, "gostar"), V("llevar", 1, "levar, vestir"), V("comprar", 1, "comprar"),
  V("pagar", 1, "pagar"), V("ganar", 1, "ganhar, vencer"), V("enseñar", 1, "ensinar, mostrar"),
  V("usar", 1, "usar"), V("llamar", 1, "chamar"), V("tomar", 1, "tomar, pegar"),
  V("entrar", 1, "entrar"), V("pasar", 1, "passar"), V("quedar", 1, "ficar, combinar"),
  V("llegar", 1, "chegar"), V("buscar", 1, "procurar"), V("ayudar", 1, "ajudar"),
  V("esperar", 1, "esperar"), V("necesitar", 1, "precisar"), V("cenar", 1, "jantar"),
  V("desayunar", 1, "tomar café da manhã"), V("nadar", 1, "nadar"), V("esquiar", 1, "esquiar"),
  V("mirar", 1, "olhar"), V("observar", 1, "observar"), V("brillar", 1, "brilhar"),
  V("descubrir", 3, "descobrir"), V("explorar", 1, "explorar"), V("orbitar", 1, "orbitar"),
  V("girar", 1, "girar"), V("aterrizar", 1, "aterrissar"), V("despegar", 1, "decolar"),
  V("contemplar", 1, "contemplar"), V("soñar", 1, "sonhar"), V("desear", 1, "desejar"),
  V("olvidar", 1, "esquecer"), V("recordar", 1, "lembrar"), V("olvidarse", 1, "esquecer-se"),
  V("preguntar", 1, "perguntar"), V("contestar", 1, "responder"), V("escuchar", 1, "escutar"),
  V("tocar", 1, "tocar"), V("jugar", 1, "jogar, brincar"), V("entrenar", 1, "treinar"),
  V("animar", 1, "torcer, animar"), V("atacar", 1, "atacar"), V("celebrar", 1, "celebrar"),
  V("empatar", 1, "empatar"), V("pitar", 1, "apitar"), V("lanzar", 1, "lançar"),
  V("saltar", 1, "saltar"), V("correr", 2, "correr"), V("montar", 1, "montar"),
  V("bajar", 1, "descer"), V("subir", 3, "subir"), V("cruzar", 1, "cruzar"),
  V("pasear", 1, "passear"), V("disfrutar", 1, "aproveitar, desfrutar"), V("probar", 1, "provar, experimentar"),
  V("cocinar", 1, "cozinhar"), V("preparar", 1, "preparar"), V("compartir", 3, "compartilhar"),
  V("invitar", 1, "convidar"), V("felicitar", 1, "parabenizar"), V("regalar", 1, "presentear"),
  V("abrazar", 1, "abraçar"), V("besar", 1, "beijar"), V("sonreír", 3, "sorrir"),
  V("llorar", 1, "chorar"), V("reír", 3, "rir"), V("cantar", 1, "cantar"),
  // ── -er (grupo 2) ──────────────────────────────────
  V("comer", 2, "comer"), V("beber", 2, "beber"), V("aprender", 2, "aprender"),
  V("entender", 2, "entender"), V("querer", 2, "querer, amar"), V("poder", 2, "poder"),
  V("tener", 2, "ter"), V("hacer", 2, "fazer"), V("poner", 2, "pôr"),
  V("salir", 3, "sair"), V("traer", 2, "trazer"), V("caer", 2, "cair"),
  V("conocer", 2, "conhecer"), V("parecer", 2, "parecer"), V("ofrecer", 2, "oferecer"),
  V("vender", 2, "vender"), V("leer", 2, "ler"), V("creer", 2, "crer, acreditar"),
  V("volver", 2, "voltar"), V("mover", 2, "mover"), V("perder", 2, "perder"),
  V("defender", 2, "defender"), V("encender", 2, "acender"), V("responder", 2, "responder"),
  V("correr", 2, "correr"), V("romper", 2, "quebrar"), V("temer", 2, "temer"),
  V("deber", 2, "dever"), V("meter", 2, "meter, colocar"), V("prometer", 2, "prometer"),
  V("sorprender", 2, "surpreender"), V("esconder", 2, "esconder"), V("barrer", 2, "varrer"),
  V("crecer", 2, "crescer"), V("agradecer", 2, "agradecer"), V("merecer", 2, "merecer"),
  V("establecer", 2, "estabelecer"), V("reconocer", 2, "reconhecer"), V("nacer", 2, "nascer"),
  V("conducir", 3, "dirigir"), V("traducir", 3, "traduzir"), V("producir", 3, "produzir"),
  // ── -ir (grupo 3) ──────────────────────────────────
  V("vivir", 3, "viver"), V("escribir", 3, "escrever"), V("abrir", 3, "abrir"),
  V("recibir", 3, "receber"), V("dormir", 3, "dormir"), V("morir", 3, "morrer"),
  V("pedir", 3, "pedir"), V("servir", 3, "servir"), V("repetir", 3, "repetir"),
  V("seguir", 3, "seguir"), V("conseguir", 3, "conseguir"), V("elegir", 3, "escolher, eleger"),
  V("venir", 3, "vir"), V("decir", 3, "dizer"), V("sentir", 3, "sentir"),
  V("preferir", 3, "preferir"), V("mentir", 3, "mentir"), V("herir", 3, "ferir"),
  V("vestir", 3, "vestir"), V("despedir", 3, "despedir"), V("medir", 3, "medir"),
  V("freír", 3, "fritar"), V("reír", 3, "rir"), V("sonreír", 3, "sorrir"),
  V("construir", 3, "construir"), V("destruir", 3, "destruir"), V("incluir", 3, "incluir"),
  V("concluir", 3, "concluir"), V("oír", 3, "ouvir"), V("huir", 3, "fugir"),
  // ── reflexivos ─────────────────────────────────────
  V("llamarse", 1, "chamar-se"), V("levantarse", 1, "levantar-se"), V("sentarse", 1, "sentar-se"),
  V("ducharse", 1, "tomar banho"), V("acostarse", 1, "deitar-se"), V("despertarse", 1, "acordar"),
  V("quedarse", 1, "ficar"), V("divertirse", 3, "divertir-se"), V("enamorarse", 1, "apaixonar-se"),
  V("irse", 3, "ir embora"), V("ponerse", 2, "vestir, ficar"), V("dormirse", 3, "adormecer"),
  // ── mais regulares úteis ───────────────────────────
  V("entender", 2, "entender"), V("aprender", 2, "aprender"), V("comprender", 2, "compreender"),
  V("practicar", 1, "praticar"), V("repasar", 1, "revisar"), V("mejorar", 1, "melhorar"),
  V("cambiar", 1, "mudar"), V("empezar", 1, "começar"), V("comenzar", 1, "começar"),
  V("terminar", 1, "terminar"), V("acabar", 1, "acabar"), V("intentar", 1, "tentar"),
  V("lograr", 1, "conseguir"), V("alcanzar", 1, "alcançar"), V("decidir", 3, "decidir"),
  V("elegir", 3, "escolher"), V("organizar", 1, "organizar"), V("planear", 1, "planejar"),
  V("reservar", 1, "reservar"), V("alquilar", 1, "alugar"), V("costar", 1, "custar"),
  V("valer", 2, "valer"), V("servir", 3, "servir"), V("importar", 1, "importar"),
  V("significar", 1, "significar"), V("parecer", 2, "parecer"), V("depender", 2, "depender"),
];

/* dedupe (mantém a primeira ocorrência) */
const seen = new Set<string>();
export const VERB_LIST_ES: VerbEs[] = RAW_ES.filter((v) => (seen.has(v.inf) ? false : (seen.add(v.inf), true)));
export const VERBS_ES = VERB_LIST_ES;
export const VERB_MAP_ES: Record<string, VerbEs> = Object.fromEntries(VERBS_ES.map((v) => [v.inf, v]));

/* ------------------------------------------------------------------ */
/*  Tabelas e regras                                                   */
/* ------------------------------------------------------------------ */

const IRREG_ES: Record<string, string> = {
  ser: "soy,eres,es,somos,sois,son",
  estar: "estoy,estás,está,estamos,estáis,están",
  ir: "voy,vas,va,vamos,vais,van",
  haber: "he,has,ha,hemos,habéis,han",
  dar: "doy,das,da,damos,dais,dan",
  saber: "sé,sabes,sabe,sabemos,sabéis,saben",
  caber: "quepo,cabes,cabe,cabemos,cabéis,caben",
  ver: "veo,ves,ve,vemos,veis,ven",
  oír: "oigo,oyes,oye,oímos,oís,oyen",
};

/* irregular apenas na 1ª pessoa (yo) */
const YO_OVERRIDE: Record<string, string> = {
  tener: "tengo", venir: "vengo", salir: "salgo", poner: "pongo", hacer: "hago",
  decir: "digo", traer: "traigo", caer: "caigo", valer: "valgo",
  seguir: "sigo", conseguir: "consigo", elegir: "elijo", dirigir: "dirijo",
  conducir: "conduzco", traducir: "traduzco", producir: "produzco",
};

/* mudanças vocálicas (não se aplicam a nosotros/vosotros) */
const E_IE = new Set([
  "pensar", "querer", "entender", "empezar", "perder", "cerrar", "comenzar",
  "sentar", "despertar", "calentar", "defender", "encender", "recomendar",
  "preferir", "sentir", "mentir", "herir", "negar", "regar", "temblar",
  "atravesar", "acertar", "apretar", "gobernar", "confesar", "manifestar",
  "tener", "venir", "despertarse", "sentarse", "acostarse", "divertirse",
]);
const O_UE = new Set([
  "poder", "dormir", "morir", "encontrar", "volver", "contar", "costar",
  "mover", "recordar", "soler", "volar", "demostrar", "probar", "acordar",
  "almorzar", "colgar", "resolver", "tronar", "sonar", "soñar", "tostar",
  "acostarse", "dormirse", "devolver",
]);
const E_I = new Set([
  "pedir", "servir", "repetir", "seguir", "conseguir", "elegir", "vestir",
  "despedir", "medir", "freír", "reír", "sonreír", "corregir", "competir",
  "decir", "gemir", "impedir",
]);
const U_UE = new Set(["jugar"]);

const ENDINGS: Record<1 | 2 | 3, string[]> = {
  1: ["o", "as", "a", "amos", "áis", "an"],
  2: ["o", "es", "e", "emos", "éis", "en"],
  3: ["o", "es", "e", "imos", "ís", "en"],
};

const REFL = ["me", "te", "se", "nos", "os", "se"];

function stemOf(inf: string): string {
  return inf.slice(0, -2);
}

function changeStem(stem: string, type: "e-ie" | "o-ue" | "e-i" | "u-ue"): string {
  switch (type) {
    case "e-ie": return stem.replace(/e(?=[^e]*$)/, "ie");
    case "o-ue": return stem.replace(/o(?=[^o]*$)/, "ue");
    case "e-i": return stem.replace(/e(?=[^e]*$)/, "i");
    case "u-ue": return stem.replace(/u(?=[^u]*$)/, "ue");
  }
}

function changeTypeFor(base: string): "e-ie" | "o-ue" | "e-i" | "u-ue" | null {
  if (E_IE.has(base)) return "e-ie";
  if (O_UE.has(base)) return "o-ue";
  if (E_I.has(base)) return "e-i";
  if (U_UE.has(base)) return "u-ue";
  return null;
}

function conjugateBase(base: string): string[] {
  if (IRREG_ES[base]) return IRREG_ES[base].split(",");

  const verb = VERB_MAP_ES[base];
  if (!verb) return [];
  const g = verb.g;
  const stem = stemOf(base);
  const ct = changeTypeFor(base);
  const changed = ct ? changeStem(stem, ct) : stem;

  // yo: override > -cer/-cir (zco) > regular
  let yo: string;
  if (YO_OVERRIDE[base]) yo = YO_OVERRIDE[base];
  else if (/cer$|cir$/.test(base)) yo = changed.slice(0, -1) + "zco";
  else yo = changed + ENDINGS[g][0];

  const forms = [
    yo,
    changed + ENDINGS[g][1],
    changed + ENDINGS[g][2],
    stem + ENDINGS[g][3],
    stem + ENDINGS[g][4],
    changed + ENDINGS[g][5],
  ];
  return forms;
}

/** Conjugação no presente. Reflexivos: «me llamo», «te vas»… */
export function conjugateES(inf: string): string[] | null {
  if (IRREG_ES[inf]) return IRREG_ES[inf].split(",");

  // reflexivo (termina em "-se")
  if (inf.endsWith("se") && !inf.endsWith("ose")) {
    const base = inf.slice(0, -2);
    if (VERB_MAP_ES[base] || IRREG_ES[base]) {
      const forms = conjugateBase(base);
      return forms.map((f, i) => `${REFL[i]} ${f}`);
    }
  }

  const verb = VERB_MAP_ES[inf];
  if (!verb) return null;
  return conjugateBase(inf);
}

export function withPronounES(person: number, form: string): string {
  return `${ES_PRONOUNS[person].split("/")[0]} ${form}`;
}
