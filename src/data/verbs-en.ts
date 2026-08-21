/**
 * Inglês · ~200 verbos essenciais (presente simples).
 * Grupos: 1 = regulares (-s) · 2 = ortografia -es/-ies · 3 = irregulares (be/have/do).
 */

export interface VerbEn {
  inf: string;
  g: 1 | 2 | 3;
  pt: string;
}

export const EN_PRONOUNS = ["I", "you", "he/she/it", "we", "you", "they"];
export const EN_GROUP_LABEL: Record<1 | 2 | 3, string> = {
  1: "regulares · -s",
  2: "ortografia · -es/-ies",
  3: "irregulares",
};
export const EN_GROUP_COLOR: Record<1 | 2 | 3, string> = { 1: "#0e8f8b", 2: "#e8930c", 3: "#d7263d" };

const V = (inf: string, g: 1 | 2 | 3, pt: string): VerbEn => ({ inf, g, pt });

export const VERB_LIST_EN: VerbEn[] = [
  // ── irregulares (grupo 3) ──────────────────────────
  V("be", 3, "ser, estar"), V("have", 3, "ter"), V("do", 3, "fazer"),
  // ── ortografia -es / -ies (grupo 2) ────────────────
  V("go", 2, "ir"), V("watch", 2, "assistir, observar"), V("catch", 2, "pegar, capturar"),
  V("teach", 2, "ensinar"), V("reach", 2, "alcançar"), V("wash", 2, "lavar"),
  V("finish", 2, "terminar"), V("wish", 2, "desejar"), V("push", 2, "empurrar"),
  V("pass", 2, "passar"), V("kiss", 2, "beijar"), V("miss", 2, "sentir falta, errar"),
  V("fix", 2, "consertar"), V("mix", 2, "misturar"), V("study", 2, "estudar"),
  V("try", 2, "tentar"), V("carry", 2, "carregar"), V("worry", 2, "preocupar-se"),
  V("fly", 2, "voar"), V("dry", 2, "secar"),
  // ── regulares (grupo 1) ────────────────────────────
  V("come", 1, "vir"), V("get", 1, "obter, conseguir"), V("make", 1, "fazer, criar"),
  V("know", 1, "saber, conhecer"), V("think", 1, "pensar"), V("take", 1, "pegar, levar"),
  V("see", 1, "ver"), V("want", 1, "querer"), V("look", 1, "olhar"), V("use", 1, "usar"),
  V("find", 1, "encontrar"), V("give", 1, "dar"), V("tell", 1, "contar, dizer"),
  V("work", 1, "trabalhar"), V("call", 1, "chamar, ligar"), V("feel", 1, "sentir"),
  V("become", 1, "tornar-se"), V("leave", 1, "sair, deixar"), V("put", 1, "colocar"),
  V("mean", 1, "significar"), V("keep", 1, "manter, guardar"), V("let", 1, "deixar"),
  V("begin", 1, "começar"), V("seem", 1, "parecer"), V("help", 1, "ajudar"),
  V("show", 1, "mostrar"), V("hear", 1, "ouvir"), V("play", 1, "jogar, tocar"),
  V("run", 1, "correr"), V("move", 1, "mover, mudar"), V("like", 1, "gostar"),
  V("live", 1, "viver, morar"), V("believe", 1, "acreditar"), V("hold", 1, "segurar"),
  V("bring", 1, "trazer"), V("happen", 1, "acontecer"), V("write", 1, "escrever"),
  V("sit", 1, "sentar"), V("stand", 1, "ficar em pé"), V("lose", 1, "perder"),
  V("pay", 1, "pagar"), V("meet", 1, "encontrar, conhecer"), V("include", 1, "incluir"),
  V("continue", 1, "continuar"), V("set", 1, "configurar, pôr"), V("learn", 1, "aprender"),
  V("lead", 1, "liderar"), V("understand", 1, "entender"), V("watch", 2, "assistir"),
  V("follow", 1, "seguir"), V("stop", 1, "parar"), V("create", 1, "criar"),
  V("speak", 1, "falar"), V("read", 1, "ler"), V("allow", 1, "permitir"),
  V("add", 1, "adicionar"), V("spend", 1, "gastar, passar tempo"), V("grow", 1, "crescer"),
  V("open", 1, "abrir"), V("walk", 1, "caminhar"), V("win", 1, "vencer, ganhar"),
  V("offer", 1, "oferecer"), V("remember", 1, "lembrar"), V("love", 1, "amar"),
  V("consider", 1, "considerar"), V("appear", 1, "aparecer"), V("buy", 1, "comprar"),
  V("wait", 1, "esperar"), V("serve", 1, "servir"), V("die", 1, "morrer"),
  V("send", 1, "enviar"), V("expect", 1, "esperar, esperar que"), V("build", 1, "construir"),
  V("stay", 1, "ficar, permanecer"), V("fall", 1, "cair"), V("cut", 1, "cortar"),
  V("kill", 1, "matar"), V("remain", 1, "permanecer"), V("suggest", 1, "sugerir"),
  V("raise", 1, "levantar, criar"), V("sell", 1, "vender"), V("require", 1, "exigir"),
  V("report", 1, "relatar"), V("decide", 1, "decidir"), V("pull", 1, "puxar"),
  // ── astronomia ─────────────────────────────────────
  V("orbit", 1, "orbitar"), V("shine", 1, "brilhar"), V("glow", 1, "brilhar, incandescer"),
  V("sparkle", 1, "cintilar"), V("twinkle", 1, "cintilar, piscar"), V("rotate", 1, "girar, rotacionar"),
  V("revolve", 1, "revolver, orbitar"), V("eclipse", 1, "eclipsar"), V("observe", 1, "observar"),
  V("discover", 1, "descobrir"), V("explore", 1, "explorar"), V("launch", 1, "lançar"),
  V("land", 1, "pousar, aterrissar"), V("measure", 1, "medir"), V("predict", 1, "prever"),
  V("rise", 1, "nascer, subir"), V("set", 1, "pôr-se (sol)"),
  // ── futebol ────────────────────────────────────────
  V("score", 1, "marcar (gol)"), V("kick", 1, "chutar"), V("shoot", 1, "finalizar, chutar"),
  V("defend", 1, "defender"), V("attack", 1, "atacar"), V("train", 1, "treinar"),
  V("cheer", 1, "torcer, animar"), V("support", 1, "apoiar, torcer por"),
  V("referee", 1, "apitar, arbitrar"), V("tackle", 1, "desarmar"), V("dribble", 1, "driblar"),
  V("celebrate", 1, "celebrar"),
];

/* dedupe (mantém a primeira ocorrência) */
const seen = new Set<string>();
export const VERBS_EN: VerbEn[] = VERB_LIST_EN.filter((v) => (seen.has(v.inf) ? false : (seen.add(v.inf), true)));
export const VERB_MAP_EN: Record<string, VerbEn> = Object.fromEntries(VERBS_EN.map((v) => [v.inf, v]));

/* ------------------------------------------------------------------ */
/*  Conjugador — presente simples (3ª pessoa: -s/-es/-ies)            */
/* ------------------------------------------------------------------ */

const IRREG_EN: Record<string, string> = {
  be: "am,are,is,are,are,are",
  have: "have,have,has,have,have,have",
  do: "do,do,does,do,do,do",
};

function thirdPerson(inf: string): string {
  if (IRREG_EN[inf]) return IRREG_EN[inf].split(",")[2];
  // consoante + y → -ies
  if (/[^aeiou]y$/.test(inf)) return inf.slice(0, -1) + "ies";
  // termina em s, ss, sh, ch, x, o → -es
  if (/(s|ss|sh|ch|x|o)$/.test(inf)) return inf + "es";
  return inf + "s";
}

export function conjugateEN(inf: string): string[] | null {
  if (IRREG_EN[inf]) return IRREG_EN[inf].split(",");
  const verb = VERB_MAP_EN[inf];
  if (!verb) return null;
  const third = thirdPerson(inf);
  return [inf, inf, third, inf, inf, inf];
}

export function withPronounEN(person: number, form: string): string {
  return `${EN_PRONOUNS[person].split("/")[0]} ${form}`;
}
