/**
 * Japonês · ~190 verbos essenciais (formas polidas ます / て形 / 辞書形).
 * Grupos: 1 = 一段動詞 (ichidan) · 2 = 五段動詞 (godan) · 3 = 不規則 (する・来る)
 */

export interface VerbJa {
  inf: string; // kanji/kana
  g: 1 | 2 | 3;
  pt: string;
  py: string; // romaji
}

export const JA_FORMS = ["ます形", "ません形", "ました形", "ませんでした形", "て形", "辞書形"];
export const JA_GROUP_LABEL: Record<1 | 2 | 3, string> = {
  1: "一段動詞 (ichidan)",
  2: "五段動詞 (godan)",
  3: "不規則 (irregulares)",
};
export const JA_GROUP_COLOR: Record<1 | 2 | 3, string> = { 1: "#0e8f8b", 2: "#e8930c", 3: "#d7263d" };

const V = (inf: string, g: 1 | 2 | 3, pt: string, py: string): VerbJa => ({ inf, g, pt, py });

const RAW: VerbJa[] = [
  // ── irregulares (する / 来る) ────────────────────────
  V("する", 3, "fazer", "suru"), V("来る", 3, "vir", "kuru"),
  V("勉強する", 3, "estudar", "benkyō suru"), V("散歩する", 3, "passear", "sanpo suru"),
  V("旅行する", 3, "viajar", "ryokō suru"), V("買い物する", 3, "fazer compras", "kaimono suru"),
  V("料理する", 3, "cozinhar", "ryōri suru"), V("掃除する", 3, "limpar", "sōji suru"),
  V("洗濯する", 3, "lavar roupa", "sentaku suru"), V("電話する", 3, "telefonar", "denwa suru"),
  V("応援する", 3, "torcer, apoiar", "ōen suru"), V("観察する", 3, "observar", "kansatsu suru"),
  V("準備する", 3, "preparar", "junbi suru"), V("計画する", 3, "planejar", "keikaku suru"),
  V("出発する", 3, "partir", "shuppatsu suru"), V("到着する", 3, "chegar", "tōchaku suru"),
  V("予約する", 3, "reservar", "yoyaku suru"), V("注意する", 3, "prestar atenção", "chūi suru"),
  V("心配する", 3, "preocupar-se", "shinpai suru"), V("結婚する", 3, "casar-se", "kekkon suru"),
  V("招待する", 3, "convidar", "shōtai suru"), V("説明する", 3, "explicar", "setsumei suru"),
  V("運転する", 3, "dirigir", "unten suru"), V("運動する", 3, "exercitar-se", "undō suru"),
  V("紹介する", 3, "apresentar", "shōkai suru"), V("案内する", 3, "guiar", "annai suru"),
  V("歓迎する", 3, "dar boas-vindas", "kangei suru"), V("感謝する", 3, "agradecer", "kansha suru"),
  V("練習する", 3, "praticar, treinar", "renshū suru"), V("選択する", 3, "escolher", "sentaku suru"),
  V("参加する", 3, "participar", "sanka suru"), V("見学する", 3, "visitar, excursionar", "kengaku suru"),
  V("体験する", 3, "experimentar", "taiken suru"), V("撮影する", 3, "fotografar, filmar", "satsuei suru"),
  V("研究する", 3, "pesquisar", "kenkyū suru"), V("発見する", 3, "descobrir", "hakken suru"),
  V("発明する", 3, "inventar", "hatsumei suru"), V("計算する", 3, "calcular", "keisan suru"),
  // ── ichidan (一段) ──────────────────────────────────
  V("食べる", 1, "comer", "taberu"), V("見る", 1, "ver", "miru"),
  V("起きる", 1, "levantar-se", "okiru"), V("寝る", 1, "dormir", "neru"),
  V("開ける", 1, "abrir", "akeru"), V("閉める", 1, "fechar", "shimeru"),
  V("教える", 1, "ensinar", "oshieru"), V("覚える", 1, "memorizar", "oboeru"),
  V("忘れる", 1, "esquecer", "wasureru"), V("考える", 1, "pensar", "kangaeru"),
  V("見つける", 1, "encontrar", "mitsukeru"), V("始める", 1, "começar", "hajimeru"),
  V("降りる", 1, "descer, desembarcar", "oriru"), V("借りる", 1, "emprestar (para si)", "kariru"),
  V("着る", 1, "vestir", "kiru"), V("見える", 1, "ser visível", "mieru"),
  V("聞こえる", 1, "ser audível", "kikoeru"), V("疲れる", 1, "cansar-se", "tsukareru"),
  V("信じる", 1, "acreditar", "shinjiru"), V("起こる", 1, "acontecer", "okoru"),
  V("出る", 1, "sair", "deru"), V("入れる", 1, "colocar dentro", "ireru"),
  V("見せる", 1, "mostrar", "miseru"), V("浴びる", 1, "tomar (banho/sol)", "abiru"),
  V("答える", 1, "responder", "kotaeru"), V("伝える", 1, "transmitir", "tsutaeru"),
  V("決める", 1, "decidir", "kimeru"), V("比べる", 1, "comparar", "kuraberu"),
  V("負ける", 1, "perder", "makeru"), V("蹴る", 1, "chutar", "keru"),
  V("調べる", 1, "investigar", "shiraberu"), V("集める", 1, "colecionar", "atsumeru"),
  V("変える", 1, "mudar, trocar", "kaeru"), V("消える", 1, "apagar-se", "kieru"),
  V("落ちる", 1, "cair", "ochiru"), V("遅れる", 1, "atrasar-se", "okureru"),
  V("捨てる", 1, "jogar fora", "suteru"), V("助ける", 1, "ajudar, salvar", "tasukeru"),
  V("育てる", 1, "criar, cultivar", "sodateru"), V("並べる", 1, "alinhar", "naraberu"),
  V("混ぜる", 1, "misturar", "mazeru"), V("楽しむ", 2, "divertir-se", "tanoshimu"),
  // ── godan (五段) ────────────────────────────────────
  V("行く", 2, "ir", "iku"), V("飲む", 2, "beber", "nomu"),
  V("買う", 2, "comprar", "kau"), V("書く", 2, "escrever", "kaku"),
  V("読む", 2, "ler", "yomu"), V("話す", 2, "falar", "hanasu"),
  V("聞く", 2, "ouvir, perguntar", "kiku"), V("遊ぶ", 2, "brincar, divertir-se", "asobu"),
  V("泳ぐ", 2, "nadar", "oyogu"), V("歌う", 2, "cantar", "utau"),
  V("踊る", 2, "dançar", "odoru"), V("走る", 2, "correr", "hashiru"),
  V("歩く", 2, "andar", "aruku"), V("待つ", 2, "esperar", "matsu"),
  V("住む", 2, "morar", "sumu"), V("作る", 2, "fazer, criar", "tsukuru"),
  V("働く", 2, "trabalhar", "hataraku"), V("会う", 2, "encontrar-se", "au"),
  V("分かる", 2, "entender", "wakaru"), V("ある", 2, "existir, haver", "aru"),
  V("言う", 2, "dizer", "iu"), V("帰る", 2, "voltar para casa", "kaeru"),
  V("入る", 2, "entrar", "hairu"), V("知る", 2, "saber, conhecer", "shiru"),
  V("切る", 2, "cortar", "kiru"), V("撮る", 2, "tirar (foto)", "toru"),
  V("乗る", 2, "pegar, montar", "noru"), V("立つ", 2, "ficar em pé", "tatsu"),
  V("座る", 2, "sentar-se", "suwaru"), V("死ぬ", 2, "morrer", "shinu"),
  V("飛ぶ", 2, "voar", "tobu"), V("呼ぶ", 2, "chamar", "yobu"),
  V("学ぶ", 2, "aprender", "manabu"), V("祈る", 2, "rezar", "inoru"),
  V("思う", 2, "pensar, achar", "omou"), V("探す", 2, "procurar", "sagasu"),
  V("輝く", 2, "brilhar", "kagayaku"), V("降る", 2, "cair (chuva/neve)", "furu"),
  V("滑る", 2, "escorregar, esquiar", "suberu"), V("登る", 2, "subir, escalar", "noboru"),
  V("脱ぐ", 2, "tirar (roupa)", "nugu"), V("洗う", 2, "lavar", "arau"),
  V("払う", 2, "pagar", "harau"), V("売る", 2, "vender", "uru"),
  V("貸す", 2, "emprestar", "kasu"), V("送る", 2, "enviar, acompanhar", "okuru"),
  V("直す", 2, "consertar", "naosu"), V("壊す", 2, "quebrar", "kowasu"),
  V("結ぶ", 2, "amarrar, unir", "musubu"), V("決まる", 2, "ser decidido", "kimaru"),
  V("曲がる", 2, "virar, dobrar", "magaru"), V("始まる", 2, "começar (intr.)", "hajimaru"),
  V("終わる", 2, "terminar", "owaru"), V("笑う", 2, "rir", "warau"),
  V("泣く", 2, "chorar", "naku"), V("怒る", 2, "irritar-se", "okoru"),
  V("勝つ", 2, "vencer", "katsu"), V("守る", 2, "proteger", "mamoru"),
  V("触る", 2, "tocar", "sawaru"), V("渡る", 2, "atravessar", "wataru"),
  V("潜る", 2, "mergulhar", "moguru"), V("休む", 2, "descansar", "yasumu"),
  V("着く", 2, "chegar", "tsuku"), V("出す", 2, "colocar para fora", "dasu"),
  V("返す", 2, "devolver", "kaesu"), V("動く", 2, "mover-se", "ugoku"),
  V("止まる", 2, "parar", "tomaru"), V("使う", 2, "usar", "tsukau"),
  V("引く", 2, "puxar", "hiku"), V("置く", 2, "colocar", "oku"),
  V("持つ", 2, "segurar, ter", "motsu"), V("頼む", 2, "pedir", "tanomu"),
  V("急ぐ", 2, "apressar-se", "isogu"), V("間に合う", 2, "estar a tempo", "maniau"),
  V("合う", 2, "combinar, encontrar", "au"), V("通る", 2, "passar por", "tōru"),
  V("回る", 2, "girar, circular", "mawaru"), V("変わる", 2, "mudar (intr.)", "kawaru"),
  V("集まる", 2, "reunir-se", "atsumaru"), V("並ぶ", 2, "fazer fila", "narabu"),
  V("光る", 2, "brilhar, luzir", "hikaru"), V("焼く", 2, "assar, grelhar", "yaku"),
  V("注ぐ", 2, "despejar, servir", "sosogu"), V("計る", 2, "medir", "hakaru"),
  V("数える", 1, "contar", "kazoeru"), V("愛する", 3, "amar", "aisuru"),
  V("遊ぶ", 2, "jogar, brincar", "asobu"), V("磨く", 2, "polir, escovar", "migaku"),
  V("沸かす", 2, "ferver", "wakasu"), V("冷える", 1, "esfriar", "hieru"),
  V("温める", 1, "aquecer", "atatameru"), V("冷やす", 2, "resfriar", "hiyasu"),
  V("願う", 2, "desejar, pedir", "negau"), V("祝う", 2, "celebrar", "iwau"),
  V("続ける", 1, "continuar", "tsuzukeru"), V("続く", 2, "continuar (intr.)", "tsuzuku"),
  V("頑張る", 2, "esforçar-se", "ganbaru"), V("諦める", 1, "desistir", "akirameru"),
  V("試す", 2, "testar", "tamesu"), V("比べる", 1, "comparar", "kuraberu"),
];

const seen = new Set<string>();
export const VERBS_JA: VerbJa[] = RAW.filter((v) => (seen.has(v.inf) ? false : (seen.add(v.inf), true)));
export const VERB_MAP_JA: Record<string, VerbJa> = Object.fromEntries(VERBS_JA.map((v) => [v.inf, v]));

/* ------------------------------------------------------------------ */
/*  Conjugador — formas polidas (ます) + て形 + 辞書形                 */
/* ------------------------------------------------------------------ */

const GODAN_I: Record<string, string> = {
  う: "い", く: "き", ぐ: "ぎ", す: "し", つ: "ち", ぬ: "に", ぶ: "び", む: "み", る: "り",
};

function godanStem(inf: string): string {
  const last = inf[inf.length - 1];
  return inf.slice(0, -1) + (GODAN_I[last] ?? last);
}

function teForm(inf: string, g: 1 | 2 | 3): string {
  if (g === 3) return inf === "来る" ? "来て" : inf.replace(/する$/, "して");
  if (g === 1) return inf.slice(0, -1) + "て";
  if (inf === "行く") return "行って";
  const last = inf[inf.length - 1];
  if (["う", "つ", "る"].includes(last)) return inf.slice(0, -1) + "って";
  if (last === "く") return inf.slice(0, -1) + "いて";
  if (last === "ぐ") return inf.slice(0, -1) + "いで";
  if (last === "す") return inf.slice(0, -1) + "して";
  if (["ぬ", "ぶ", "む"].includes(last)) return inf.slice(0, -1) + "んで";
  return inf + "て";
}

/** [ます形, ません, ました, ませんでした, て形, 辞書形] */
export function conjugateJA(inf: string): string[] | null {
  const v = VERB_MAP_JA[inf];
  if (!v) return null;
  let masu: string;
  if (v.g === 3) masu = inf === "来る" ? "来ます" : inf.replace(/する$/, "します");
  else if (v.g === 1) masu = inf.slice(0, -1) + "ます";
  else masu = godanStem(inf) + "ます";
  const base = masu.slice(0, -2); // remove ます
  return [masu, base + "ません", base + "ました", base + "ませんでした", teForm(inf, v.g), inf];
}

/** No japonês não há pronome — retorna o nome da forma (usado nos prompts). */
export function withPronounJA(person: number, _form: string): string {
  return JA_FORMS[person] ?? _form;
}
