/**
 * Russo · ~190 verbos essenciais no presente do indicativo.
 * Grupos: 1 = I спряжение (1ª conjugação) · 2 = II спряжение · 3 = irregulares.
 * Cada verbo guarda o radical do presente (st) e, quando a 1ª pessoa é
 * irregular, a forma completa (f1): писать → пишу.
 */

export interface VerbRu {
  inf: string;
  g: 1 | 2 | 3;
  pt: string;
  st: string;
  f1?: string;
}

const V = (inf: string, g: 1 | 2 | 3, pt: string, st: string, f1?: string): VerbRu => ({ inf, g, pt, st, f1 });

export const VERBS_RU: VerbRu[] = [
  // ── irregulares especiais ──
  V("быть", 3, "ser, estar", "", "есть"),
  V("хотеть", 3, "querer", "хот", "хочу"),
  V("идти", 3, "ir (a pé)", "ид", "иду"),
  V("ехать", 3, "ir (transporte)", "ед", "еду"),
  V("есть", 3, "comer", "е", "ем"),
  V("дать", 3, "dar", "да", "дам"),
  V("взять", 3, "pegar", "возьм", "возьму"),
  V("мочь", 3, "poder", "мог", "могу"),
  V("говорить", 2, "falar, dizer", "говор", "говорю"),
  V("жить", 1, "viver, morar", "жив", "живу"),
  V("пить", 1, "beber", "пь", "пью"),
  V("знать", 1, "saber, conhecer", "зна", "знаю"),
  // ── I спряжение (g1) ──
  V("работать", 1, "trabalhar", "работа"),
  V("читать", 1, "ler", "чита"),
  V("писать", 1, "escrever", "пис", "пишу"),
  V("играть", 1, "jogar, tocar", "игра"),
  V("гулять", 1, "passear", "гуля"),
  V("слушать", 1, "escutar", "слуша"),
  V("смотреть", 1, "olhar, assistir", "смотр"),
  V("думать", 1, "pensar", "дума"),
  V("понимать", 1, "entender", "понима"),
  V("помогать", 1, "ajudar", "помога"),
  V("изучать", 1, "estudar, aprender", "изуча"),
  V("отвечать", 1, "responder", "отвеча"),
  V("спрашивать", 1, "perguntar", "спрашива"),
  V("рассказывать", 1, "contar", "рассказыва"),
  V("показывать", 1, "mostrar", "показыва"),
  V("объяснять", 1, "explicar", "объясня"),
  V("встречать", 1, "encontrar, receber", "встреча"),
  V("ждать", 1, "esperar", "жд", "жду"),
  V("искать", 1, "procurar", "иск", "ищу"),
  V("находить", 2, "encontrar", "наход"),
  V("любить", 2, "amar, gostar", "люб", "люблю"),
  V("нравиться", 2, "agradar", "нрав"),
  V("начинать", 1, "começar", "начина"),
  V("кончать", 1, "terminar", "конча"),
  V("открывать", 1, "abrir", "открыва"),
  V("закрывать", 1, "fechar", "закрыва"),
  V("покупать", 1, "comprar", "покупа"),
  V("продавать", 1, "vender", "продава"),
  V("платить", 2, "pagar", "плат"),
  V("готовить", 2, "cozinhar, preparar", "готов"),
  V("варить", 2, "cozinhar (ferver)", "вар"),
  V("танцевать", 1, "dançar", "танцу"),
  V("петь", 1, "cantar", "по", "пою"),
  V("рисовать", 1, "desenhar", "рисую"),
  V("фотографировать", 1, "fotografar", "фотографиру"),
  V("путешествовать", 1, "viajar", "путешеству"),
  V("летать", 1, "voar", "лета"),
  V("плавать", 1, "nadar", "плава"),
  V("ходить", 2, "ir, andar (habitual)", "ход"),
  V("бегать", 1, "correr", "бега"),
  V("стоять", 1, "estar em pé", "сто"),
  V("сидеть", 2, "estar sentado", "сид"),
  V("лежать", 1, "estar deitado", "леж"),
  V("спать", 1, "dormir", "сп", "сплю"),
  V("вставать", 1, "levantar-se", "вста"),
  V("одеваться", 1, "vestir-se", "одева"),
  V("умываться", 1, "lavar o rosto", "умыва"),
  V("завтракать", 1, "tomar café da manhã", "завтрака"),
  V("обедать", 1, "almoçar", "обеда"),
  V("ужинать", 1, "jantar", "ужина"),
  // ── astronomia e ciência ──
  V("видеть", 2, "ver", "вид"),
  V("наблюдать", 1, "observar", "наблюда"),
  V("открывать звезду", 1, "descobrir uma estrela", "открыва"),
  V("измерять", 1, "medir", "измеря"),
  V("исследовать", 1, "pesquisar, explorar", "исследу"),
  V("запускать", 1, "lançar (foguete)", "запуска"),
  V("вращаться", 1, "girar, orbitar", "враща"),
  V("светить", 2, "brilhar, iluminar", "свет"),
  V("сиять", 1, "brilhar, cintilar", "си"),
  V("сверкать", 1, "reluzir", "сверка"),
  V("появляться", 1, "aparecer", "появля"),
  V("исчезать", 1, "desaparecer", "исчеза"),
  V("считать", 1, "contar, calcular", "счита"),
  V("вычислять", 1, "calcular", "вычисля"),
  V("доказывать", 1, "provar, demonstrar", "доказыва"),
  V("открывать закон", 1, "descobrir uma lei", "открыва"),
  // ── futebol e esportes ──
  V("играть в футбол", 1, "jogar futebol", "игра"),
  V("забивать гол", 1, "marcar um gol", "забива"),
  V("выигрывать", 1, "vencer", "выигрыва"),
  V("проигрывать", 1, "perder", "проигрыва"),
  V("болеть за", 1, "torcer por", "боле"),
  V("тренироваться", 1, "treinar", "трениру"),
  V("соревноваться", 1, "competir", "соревну"),
  V("побеждать", 1, "vencer (habitual)", "побежда"),
  V("поддерживать", 1, "apoiar, torcer", "поддержива"),
  V("кататься", 1, "andar (patins, esqui)", "ката"),
  V("кататься на лыжах", 1, "esquiar", "ката"),
  V("кататься на коньках", 1, "patinar", "ката"),
  // ── movimento e viagem ──
  V("приезжать", 1, "chegar (transporte)", "приезжа"),
  V("уезжать", 1, "ir embora", "уезжа"),
  V("возвращаться", 1, "voltar", "возвраща"),
  V("подниматься", 1, "subir", "поднима"),
  V("спускаться", 1, "descer", "спуска"),
  V("переходить", 2, "atravessar", "переход"),
  V("поворачивать", 1, "virar", "поворачива"),
  V("останавливаться", 1, "parar", "останавлива"),
  V("ехать на поезде", 3, "ir de trem", "ед", "еду"),
  V("плыть", 1, "navegar, nadar", "плыв", "плыву"),
  // ── comunicação e vida social ──
  V("звонить", 2, "ligar, telefonar", "звон"),
  V("писать письмо", 1, "escrever uma carta", "пис", "пишу"),
  V("получать", 1, "receber", "получа"),
  V("отправлять", 1, "enviar", "отправля"),
  V("приглашать", 1, "convidar", "приглаша"),
  V("договариваться", 1, "combinar", "договарива"),
  V("обещать", 1, "prometer", "обеща"),
  V("советовать", 1, "aconselhar", "совету"),
  V("благодарить", 2, "agradecer", "благодар"),
  V("извиняться", 1, "desculpar-se", "извиня"),
  V("здороваться", 1, "cumprimentar", "здоров"),
  V("прощаться", 1, "despedir-se", "проща"),
  // ── cotidiano e casa ──
  V("убирать", 1, "arrumar, limpar", "убира"),
  V("мыть", 1, "lavar", "мо", "мою"),
  V("стирать", 1, "lavar roupa", "стира"),
  V("чинить", 2, "consertar", "чин"),
  V("строить", 2, "construir", "стро"),
  V("сажать", 1, "plantar", "сажа"),
  V("поливать", 1, "regar", "полива"),
  V("покупать продукты", 1, "fazer compras", "покупа"),
  V("носить", 2, "vestir, carregar", "нос"),
  V("выбирать", 1, "escolher", "выбира"),
  V("менять", 1, "trocar, mudar", "меня"),
  V("дарить", 2, "presentear", "дар"),
  V("праздновать", 1, "celebrar", "праздну"),
  V("отдыхать", 1, "descansar", "отдыха"),
  V("мечтать", 1, "sonhar", "мечта"),
  V("верить", 2, "acreditar", "вер"),
  V("надеяться", 1, "ter esperança", "наде"),
  V("бояться", 1, "ter medo", "бо"),
  V("радоваться", 1, "alegrar-se", "рад"),
  V("удивляться", 1, "surpreender-se", "удивля"),
  // ── clima e natureza ──
  V("идти дождь", 3, "chover", "ид", "идёт"),
  V("идти снег", 3, "nevar", "ид", "идёт"),
  V("дуть", 1, "soprar (vento)", "ду", "дую"),
  V("морозить", 2, "congelar", "мороз"),
  V("таять", 1, "derreter", "та"),
  V("цвести", 1, "florescer", "цвет", "цвету"),
  V("расти", 1, "crescer", "раст", "расту"),
  V("светить солнце", 2, "fazer sol", "свет"),
  V("греть", 1, "aquecer", "гре"),
  V("охлаждать", 1, "resfriar", "охлажда"),
  // ── verbos úteis A1 ──
  V("учить", 1, "aprender, ensinar", "уч"),
  V("учиться", 1, "estudar", "уч"),
  V("решать", 1, "resolver, decidir", "реша"),
  V("пробовать", 1, "tentar, provar", "пробу"),
  V("стараться", 1, "esforçar-se", "стара"),
  V("успевать", 1, "conseguir a tempo", "успева"),
  V("опаздывать", 1, "atrasar-se", "опаздыва"),
  V("заканчиваться", 1, "terminar", "заканчива"),
  V("продолжать", 1, "continuar", "продолжа"),
  V("повторять", 1, "repetir", "повторя"),
  V("проверять", 1, "verificar", "проверя"),
  V("сравнивать", 1, "comparar", "сравнива"),
  V("переводить", 2, "traduzir", "перевод"),
  V("запоминать", 1, "memorizar", "запомина"),
  V("забывать", 1, "esquecer", "забыва"),
  V("помнить", 2, "lembrar", "помн"),
  V("слышать", 2, "ouvir", "слыш"),
  V("чувствовать", 1, "sentir", "чувству"),
  V("дышать", 1, "respirar", "дыш"),
  V("улыбаться", 1, "sorrir", "улыба"),
  V("смеяться", 1, "rir", "сме"),
  V("плакать", 1, "chorar", "плач", "плачу"),
  V("целовать", 1, "beijar", "целу"),
  V("обнимать", 1, "abraçar", "обнима"),
  V("скучать", 1, "sentir saudade", "скуча"),
  V("дружить", 2, "ser amigo", "друж"),
  V("общаться", 1, "conversar, socializar", "обща"),
  V("знакомиться", 1, "conhecer (pessoas)", "знаком"),
  V("прощать", 1, "perdoar", "проща"),
  V("мечтать о", 1, "sonhar com", "мечта"),
];

export const RU_PRONOUNS = ["я", "ты", "он/она", "мы", "вы", "они"];
export const RU_GROUP_LABEL: Record<1 | 2 | 3, string> = {
  1: "I спряжение",
  2: "II спряжение",
  3: "особые",
};
export const RU_GROUP_COLOR: Record<1 | 2 | 3, string> = { 1: "#0e8f8b", 2: "#e8930c", 3: "#d7263d" };

const G1_END = ["ю", "ешь", "ет", "ем", "ете", "ют"];
const G2_END = ["ю", "ишь", "ит", "им", "ите", "ят"];

export function conjugateRU(inf: string): string[] | null {
  const v = VERBS_RU.find((x) => x.inf === inf);
  if (!v) return null;
  // «быть»: tabela própria
  if (v.inf === "быть") return ["есть", "есть", "есть", "есть", "есть", "есть"];
  // «хотеть»: híbrido
  if (v.inf === "хотеть") return ["хочу", "хочешь", "хочет", "хотим", "хотите", "хотят"];
  // «есть» (comer)
  if (v.inf === "есть") return ["ем", "ешь", "ест", "едим", "едите", "едят"];
  // «дать»
  if (v.inf === "дать") return ["дам", "дашь", "даст", "дадим", "дадите", "дадут"];
  // «взять»
  if (v.inf === "взять") return ["возьму", "возьмёшь", "возьмёт", "возьмём", "возьмёте", "возьмут"];

  const ends = v.g === 2 ? G2_END : G1_END;
  const first = v.f1 ?? v.st + "ю";
  return [first, v.st + ends[1], v.st + ends[2], v.st + ends[3], v.st + ends[4], v.st + ends[5]];
}

export function withPronounRU(person: number, form: string): string {
  return `${RU_PRONOUNS[person]} ${form}`;
}
