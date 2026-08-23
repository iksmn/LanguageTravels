/**
 * Farsi (persa) · ~130 verbos essenciais no presente.
 * Formas: می‌ + radical do presente (st) + terminações [م، ی، د، یم، ید، ند].
 * Verbos estar/ter (بودن/داشتن) não levam می‌.
 * Grupos: 1 = باقاعده (regulares) · 3 = بی‌قاعده (irregulares).
 */

export interface VerbFa {
  inf: string;
  g: 1 | 2 | 3;
  pt: string;
  py: string; // transliteração do infinitivo
  st: string; // radical do presente (escrita persa)
}

const V = (inf: string, g: 1 | 2 | 3, pt: string, py: string, st: string): VerbFa => ({ inf, g, pt, py, st });

export const VERBS_FA: VerbFa[] = [
  // ── irregulares ──
  V("بودن", 3, "ser, estar", "budan", "باش"),
  V("داشتن", 3, "ter", "dāshtan", "دار"),
  V("رفتن", 3, "ir", "raftan", "رو"),
  V("آمدن", 3, "vir", "āmadan", "آ"),
  V("گفتن", 3, "dizer", "goftan", "گو"),
  V("دیدن", 3, "ver", "didan", "بین"),
  V("خوردن", 3, "comer", "khordan", "خور"),
  V("نوشیدن", 3, "beber", "nushidan", "نوش"),
  V("نوشتن", 3, "escrever", "neveshtan", "نویس"),
  V("خواندن", 3, "ler, cantar", "khāndan", "خوان"),
  V("دادن", 3, "dar", "dādan", "ده"),
  V("گرفتن", 3, "pegar", "gereftan", "گیر"),
  V("نشستن", 3, "sentar-se", "neshastan", "نشین"),
  V("ایستادن", 3, "estar em pé", "istādan", "ایست"),
  V("خواستن", 3, "querer", "khāstan", "خواه"),
  V("توانستن", 3, "poder", "tavānestan", "توان"),
  V("دانستن", 3, "saber", "dānestan", "دان"),
  V("شناختن", 3, "conhecer", "shenākhtan", "شناس"),
  V("فهمیدن", 3, "entender", "fahmidan", "فهم"),
  V("شنیدن", 3, "ouvir", "shenidan", "شنو"),
  V("پوشیدن", 3, "vestir", "pushidan", "پوش"),
  V("دویدن", 3, "correr", "davidan", "دو"),
  V("شکستن", 3, "quebrar", "shekastan", "شکن"),
  V("فروختن", 3, "vender", "forukhtan", "فروش"),
  V("آموختن", 3, "aprender", "āmukhtan", "آموز"),
  V("باختن", 3, "perder (jogo)", "bākhtan", "باز"),
  V("بردن", 3, "vencer, levar", "bordan", "بر"),
  V("ساختن", 3, "construir, fazer", "sākhtan", "ساز"),
  V("آوردن", 3, "trazer", "āvordan", "آور"),
  V("انداختن", 3, "jogar", "andākhtan", "انداز"),
  V("گزاردن", 3, "pagar, render", "gozārdan", "گزار"),
  // ── regulares (mi- + st) ──
  V("کردن", 1, "fazer", "kardan", "کن"),
  V("شستن", 1, "lavar", "shostan", "شوی"),
  V("خوابیدن", 1, "dormir", "khābidan", "خواب"),
  V("بیدار شدن", 1, "acordar", "bidār shodan", "بیدار شو"),
  V("کار کردن", 1, "trabalhar", "kār kardan", "کار کن"),
  V("بازی کردن", 1, "jogar, brincar", "bāzi kardan", "بازی کن"),
  V("رقصیدن", 1, "dançar", "raqsidan", "رقص"),
  V("آواز خواندن", 1, "cantar", "āvāz khāndan", "آواز خوان"),
  V("نقاشی کردن", 1, "desenhar, pintar", "naqqāshi kardan", "نقاشی کن"),
  V("عکس گرفتن", 1, "fotografar", "aks gereftan", "عکس گیر"),
  V("سفر کردن", 1, "viajar", "safar kardan", "سفر کن"),
  V("پیاده‌روی کردن", 1, "caminhar", "piyāde-ravi kardan", "پیاده‌روی کن"),
  V("کوهنوردی کردن", 1, "escalar, fazer trilha", "kuh-navardi kardan", "کوهنوردی کن"),
  V("شنا کردن", 1, "nadar", "shenā kardan", "شنا کن"),
  V("پرواز کردن", 1, "voar", "parvāz kardan", "پرواز کن"),
  V("رانندگی کردن", 1, "dirigir", "rānandegi kardan", "رانندگی کن"),
  V("خریدن", 1, "comprar", "kharidan", "خر"),
  V("پختن", 1, "cozinhar, assar", "pokhtan", "پز"),
  V("تمیز کردن", 1, "limpar", "tamiz kardan", "تمیز کن"),
  V("تعمیر کردن", 1, "consertar", "ta'mir kardan", "تعمیر کن"),
  V("کاشتن", 1, "plantar", "kāshtan", "کار"),
  V("آب دادن", 1, "regar", "āb dādan", "آب ده"),
  V("انتخاب کردن", 1, "escolher", "entekhāb kardan", "انتخاب کن"),
  V("هدیه دادن", 1, "presentear", "hediye dādan", "هدیه ده"),
  V("جشن گرفتن", 1, "celebrar", "jashn gereftan", "جشن گیر"),
  V("استراحت کردن", 1, "descansar", "esterāhat kardan", "استراحت کن"),
  V("رویا دیدن", 1, "sonhar", "ruyā didan", "رویا بین"),
  V("امید داشتن", 1, "ter esperança", "omid dāshtan", "امید دار"),
  V("ترسیدن", 1, "ter medo", "tarsidan", "ترس"),
  V("خوشحال شدن", 1, "alegrar-se", "khosh-hāl shodan", "خوشحال شو"),
  V("تعجب کردن", 1, "surpreender-se", "ta'ajjob kardan", "تعجب کن"),
  // ── astronomia ──
  V("تماشا کردن", 1, "observar, assistir", "tamāshā kardan", "تماشا کن"),
  V("ستاره دیدن", 1, "ver estrelas", "setāre didan", "ستاره بین"),
  V("اندازه گرفتن", 1, "medir", "andāze gereftan", "اندازه گیر"),
  V("کشف کردن", 1, "descobrir", "kashf kardan", "کشف کن"),
  V("پژوهش کردن", 1, "pesquisar", "pazhuhesh kardan", "پژوهش کن"),
  V("کاوش کردن", 1, "explorar", "kāvosh kardan", "کاوش کن"),
  V("چرخیدن", 1, "girar, orbitar", "charkhidan", "چرخ"),
  V("درخشیدن", 1, "brilhar", "derakhshidan", "درخش"),
  V("نور افشاندن", 1, "irradiar luz", "nur afshāndan", "نور افشان"),
  V("پدیدار شدن", 1, "aparecer", "peydā shodan", "پدیدار شو"),
  V("ناپدید شدن", 1, "desaparecer", "nāpeydā shodan", "ناپدید شو"),
  V("شمارش کردن", 1, "contar, calcular", "shomāresh kardan", "شمارش کن"),
  V("محاسبه کردن", 1, "calcular", "mohāsebe kardan", "محاسبه کن"),
  V("اثبات کردن", 1, "provar, demonstrar", "esbāt kardan", "اثبات کن"),
  V("پرتاب کردن", 1, "lançar (foguete)", "partāb kardan", "پرتاب کن"),
  // ── futebol ──
  V("فوتبال بازی کردن", 1, "jogar futebol", "futbāl bāzi kardan", "فوتبال بازی کن"),
  V("گل زدن", 1, "marcar um gol", "gol zadan", "گل زن"),
  V("بردن بازی", 3, "vencer o jogo", "bordan", "بر"),
  V("باختن بازی", 3, "perder o jogo", "bākhtan", "باز"),
  V("تشویق کردن", 1, "torcer, aplaudir", "tashviq kardan", "تشویق کن"),
  V("تمرین کردن", 1, "treinar", "tamrin kardan", "تمرین کن"),
  V("مسابقه دادن", 1, "competir", "mosābeqe dādan", "مسابقه ده"),
  V("حمایت کردن", 1, "apoiar, torcer", "hemāyat kardan", "حمایت کن"),
  V("اسکی کردن", 1, "esquiar", "eski kardan", "اسکی کن"),
  V("کشتی گرفتن", 1, "lutar (koshi)", "koshti gereftan", "کشتی گیر"),
  // ── comunicação e vida social ──
  V("زنگ زدن", 1, "ligar, telefonar", "zang zadan", "زنگ زن"),
  V("نامه نوشتن", 1, "escrever uma carta", "nāme neveshtan", "نامه نویس"),
  V("دریافت کردن", 1, "receber", "daryāft kardan", "دریافت کن"),
  V("فرستادن", 1, "enviar", "ferestādan", "فرست"),
  V("دعوت کردن", 1, "convidar", "da'vat kardan", "دعوت کن"),
  V("قول دادن", 1, "prometer", "qol dādan", "قول ده"),
  V("مشورت کردن", 1, "aconselhar, consultar", "mashverat kardan", "مشورت کن"),
  V("تشکر کردن", 1, "agradecer", "tashakkor kardan", "تشکر کن"),
  V("عذرخواهی کردن", 1, "desculpar-se", "ozr-khāhi kardan", "عذرخواهی کن"),
  V("سلام کردن", 1, "cumprimentar", "salām kardan", "سلام کن"),
  V("خداحافظی کردن", 1, "despedir-se", "khodā-hāfezi kardan", "خداحافظی کن"),
  V("دوست داشتن", 1, "amar, gostar", "dust dāshtan", "دوست دار"),
  V("عشق ورزیدن", 1, "amar (poético)", "eshq varzidan", "عشق ورز"),
  V("بوسیدن", 1, "beijar", "busidan", "بوس"),
  V("بغل کردن", 1, "abraçar", "baghal kardan", "بغل کن"),
  V("دلتنگ شدن", 1, "sentir saudade", "deltang shodan", "دلتنگ شو"),
  V("دوستی کردن", 1, "fazer amizade", "dusti kardan", "دوستی کن"),
  V("گفتگو کردن", 1, "conversar", "goftogu kardan", "گفتگو کن"),
  V("آشنا شدن", 1, "conhecer (pessoas)", "āshnā shodan", "آشنا شو"),
  V("بخشیدن", 1, "perdoar", "bakhshidan", "بخش"),
  // ── cotidiano ──
  V("یاد گرفتن", 1, "aprender", "yād gereftan", "یاد گیر"),
  V("درس خواندن", 1, "estudar", "dars khāndan", "درس خوان"),
  V("حل کردن", 1, "resolver", "hal kardan", "حل کن"),
  V("سعی کردن", 1, "tentar", "sa'y kardan", "سعی کن"),
  V("تلاش کردن", 1, "esforçar-se", "talāsh kardan", "تلاش کن"),
  V("به موقع رسیدن", 1, "chegar a tempo", "be-mowqe residan", "به موقع رس"),
  V("دیر کردن", 1, "atrasar-se", "dir kardan", "دیر کن"),
  V("تمام شدن", 1, "terminar", "tamām shodan", "تمام شو"),
  V("ادامه دادن", 1, "continuar", "edāme dādan", "ادامه ده"),
  V("تکرار کردن", 1, "repetir", "tekrār kardan", "تکرار کن"),
  V("بررسی کردن", 1, "verificar", "bar-rasi kardan", "بررسی کن"),
  V("مقایسه کردن", 1, "comparar", "moqāyese kardan", "مقایسه کن"),
  V("ترجمه کردن", 1, "traduzir", "tarjome kardan", "ترجمه کن"),
  V("به یاد سپردن", 1, "memorizar", "be-yād sepordan", "به یاد سپار"),
  V("فراموش کردن", 1, "esquecer", "farā mush kardan", "فراموش کن"),
  V("به یاد آوردن", 1, "lembrar", "be-yād āvordan", "به یاد آور"),
  V("احساس کردن", 1, "sentir", "ehsās kardan", "احساس کن"),
  V("نفس کشیدن", 1, "respirar", "nafas keshidan", "نفس کش"),
  V("لبخند زدن", 1, "sorrir", "labkhand zadan", "لبخند زن"),
  V("خندیدن", 1, "rir", "khandidan", "خند"),
  V("گریه کردن", 1, "chorar", "gerye kardan", "گریه کن"),
  V("باریدن", 1, "chover", "bāridan", "بار"),
  V("برف باریدن", 1, "nevar", "barf bāridan", "برف بار"),
  V("وزیدن", 1, "soprar (vento)", "vazidan", "وز"),
  V("شکوفه دادن", 1, "florescer", "shokufe dādan", "شکوفه ده"),
  V("رشد کردن", 1, "crescer", "roshd kardan", "رشد کن"),
];

export const FA_PRONOUNS = ["من", "تو", "او", "ما", "شما", "آنها"];
export const FA_GROUP_LABEL: Record<1 | 2 | 3, string> = {
  1: "باقاعده",
  2: "مختلط",
  3: "بی‌قاعده",
};
export const FA_GROUP_COLOR: Record<1 | 2 | 3, string> = { 1: "#0e8f8b", 2: "#e8930c", 3: "#d7263d" };

const ENDINGS = ["م", "ی", "د", "یم", "ید", "ند"];
const NO_MI = new Set(["بودن", "داشتن"]);

export function conjugateFA(inf: string): string[] | null {
  const v = VERBS_FA.find((x) => x.inf === inf);
  if (!v) return null;
  if (NO_MI.has(v.inf)) return ENDINGS.map((e) => v.st + e);
  return ENDINGS.map((e) => "می‌" + v.st + e);
}

export function withPronounFA(person: number, form: string): string {
  return `${FA_PRONOUNS[person]} ${form}`;
}
