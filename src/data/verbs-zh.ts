/**
 * Mandarim · caracteres essenciais (动词为主) com pinyin.
 * O mandarim NÃO conjuga verbos — a forma é única.
 * Grupos: 1 = ação 动作 · 2 = estado 状态 · 3 = modal/direcional 能愿
 */

export interface VerbZh {
  inf: string; // hanzi
  g: 1 | 2 | 3;
  pt: string;
  py?: string; // pinyin
}

const V = (inf: string, g: 1 | 2 | 3, pt: string, py: string): VerbZh => ({ inf, g, pt, py });

export const VERBS_ZH: VerbZh[] = [
  // ── 1 · ação 动作 ───────────────────────────────────
  V("吃", 1, "comer", "chī"), V("喝", 1, "beber", "hē"), V("看", 1, "ver, olhar", "kàn"),
  V("听", 1, "ouvir, escutar", "tīng"), V("说", 1, "falar, dizer", "shuō"), V("读", 1, "ler (em voz alta)", "dú"),
  V("写", 1, "escrever", "xiě"), V("走", 1, "andar, ir a pé", "zǒu"), V("跑", 1, "correr", "pǎo"),
  V("去", 1, "ir", "qù"), V("来", 1, "vir", "lái"), V("回", 1, "voltar", "huí"),
  V("买", 1, "comprar", "mǎi"), V("卖", 1, "vender", "mài"), V("做", 1, "fazer", "zuò"),
  V("打", 1, "bater, jogar (bola)", "dǎ"), V("踢", 1, "chutar", "tī"), V("游", 1, "nadar", "yóu"),
  V("飞", 1, "voar", "fēi"), V("跳", 1, "pular", "tiào"), V("开", 1, "abrir, dirigir", "kāi"),
  V("关", 1, "fechar", "guān"), V("坐", 1, "sentar, viajar (veículo)", "zuò"), V("站", 1, "ficar em pé", "zhàn"),
  V("睡", 1, "dormir", "shuì"), V("穿", 1, "vestir", "chuān"), V("洗", 1, "lavar", "xǐ"),
  V("找", 1, "procurar", "zhǎo"), V("给", 1, "dar", "gěi"), V("拿", 1, "pegar", "ná"),
  V("放", 1, "colocar, soltar", "fàng"), V("带", 1, "levar, trazer", "dài"), V("送", 1, "enviar, acompanhar", "sòng"),
  V("教", 1, "ensinar", "jiāo"), V("学", 1, "aprender, estudar", "xué"), V("练习", 1, "praticar", "liànxí"),
  V("工作", 1, "trabalhar", "gōngzuò"), V("休息", 1, "descansar", "xiūxi"), V("玩", 1, "brincar, divertir-se", "wán"),
  V("唱", 1, "cantar", "chàng"), V("跳舞", 1, "dançar", "tiàowǔ"), V("画", 1, "desenhar, pintar", "huà"),
  V("拍照", 1, "tirar foto", "pāizhào"), V("旅游", 1, "viajar", "lǚyóu"), V("参观", 1, "visitar (lugar)", "cānguān"),
  V("等", 1, "esperar", "děng"), V("进", 1, "entrar", "jìn"), V("出", 1, "sair", "chū"),
  V("上", 1, "subir", "shàng"), V("下", 1, "descer", "xià"), V("爬", 1, "escalar, subir", "pá"),
  V("骑", 1, "pedalar, montar", "qí"), V("划", 1, "remar", "huá"), V("滑雪", 1, "esquiar", "huáxuě"),
  V("观察", 1, "observar", "guānchá"), V("发现", 1, "descobrir", "fāxiàn"), V("研究", 1, "pesquisar", "yánjiū"),
  V("计算", 1, "calcular", "jìsuàn"), V("编程", 1, "programar", "biānchéng"), V("设计", 1, "projetar, desenhar", "shèjì"),
  V("建造", 1, "construir", "jiànzào"), V("修理", 1, "consertar", "xiūlǐ"), V("帮助", 1, "ajudar", "bāngzhù"),
  V("感谢", 1, "agradecer", "gǎnxiè"), V("欢迎", 1, "dar boas-vindas", "huānyíng"), V("庆祝", 1, "celebrar", "qìngzhù"),
  V("赢", 1, "vencer, ganhar", "yíng"), V("输", 1, "perder (jogo)", "shū"), V("比赛", 1, "competir", "bǐsài"),
  V("训练", 1, "treinar", "xùnliàn"), V("进球", 1, "marcar gol", "jìnqiú"), V("传球", 1, "passar a bola", "chuánqiú"),
  V("守门", 1, "defender o gol", "shǒumén"), V("发射", 1, "lançar (foguete)", "fāshè"), V("环绕", 1, "orbitar", "huánrào"),
  V("闪烁", 1, "cintilar", "shǎnshuò"), V("照亮", 1, "iluminar", "zhàoliàng"), V("数", 1, "contar", "shǔ"),
  V("翻译", 1, "traduzir", "fānyì"), V("记", 1, "anotar, memorizar", "jì"),
  // ── 2 · estado 状态 ─────────────────────────────────
  V("是", 2, "ser, estar", "shì"), V("有", 2, "ter, haver", "yǒu"), V("在", 2, "estar em", "zài"),
  V("喜欢", 2, "gostar", "xǐhuan"), V("爱", 2, "amar", "ài"), V("想", 2, "pensar, querer", "xiǎng"),
  V("知道", 2, "saber", "zhīdào"), V("认识", 2, "conhecer (pessoa)", "rènshi"), V("觉得", 2, "achar, sentir", "juéde"),
  V("希望", 2, "ter esperança", "xīwàng"), V("相信", 2, "acreditar", "xiāngxìn"), V("需要", 2, "precisar", "xūyào"),
  V("懂", 2, "entender", "dǒng"), V("明白", 2, "compreender", "míngbai"), V("记得", 2, "lembrar", "jìde"),
  V("忘记", 2, "esquecer", "wàngjì"), V("高兴", 2, "ficar feliz", "gāoxìng"), V("难过", 2, "ficar triste", "nánguò"),
  V("累", 2, "estar cansado", "lèi"), V("饿", 2, "estar com fome", "è"), V("渴", 2, "estar com sede", "kě"),
  V("冷", 2, "estar com frio", "lěng"), V("热", 2, "estar com calor", "rè"), V("贵", 2, "ser caro", "guì"),
  V("便宜", 2, "ser barato", "piányi"), V("好", 2, "ser bom", "hǎo"), V("大", 2, "ser grande", "dà"),
  V("小", 2, "ser pequeno", "xiǎo"), V("多", 2, "muito(s)", "duō"), V("少", 2, "pouco(s)", "shǎo"),
  V("远", 2, "ser longe", "yuǎn"), V("近", 2, "ser perto", "jìn"), V("高", 2, "ser alto", "gāo"),
  V("低", 2, "ser baixo", "dī"), V("美", 2, "ser belo", "měi"), V("漂亮", 2, "ser bonito", "piàoliang"),
  V("好吃", 2, "ser gostoso", "hǎochī"), V("有意思", 2, "ser interessante", "yǒuyìsi"), V("重要", 2, "ser importante", "zhòngyào"),
  V("一样", 2, "ser igual", "yíyàng"), V("不同", 2, "ser diferente", "bùtóng"), V("像", 2, "parecer com", "xiàng"),
  V("姓", 2, "ter o sobrenome", "xìng"), V("叫", 2, "chamar-se", "jiào"), V("属于", 2, "pertencer", "shǔyú"),
  // ── 3 · modal / direcional 能愿 ─────────────────────
  V("能", 3, "poder (capacidade)", "néng"), V("会", 3, "saber fazer", "huì"), V("可以", 3, "poder (permissão)", "kěyǐ"),
  V("应该", 3, "dever", "yīnggāi"), V("必须", 3, "ter que", "bìxū"), V("愿意", 3, "estar disposto", "yuànyì"),
  V("敢", 3, "ousar, ter coragem", "gǎn"), V("开始", 3, "começar", "kāishǐ"), V("继续", 3, "continuar", "jìxù"),
  V("完成", 3, "completar", "wánchéng"), V("结束", 3, "terminar", "jiéshù"), V("准备", 3, "preparar", "zhǔnbèi"),
  V("打算", 3, "planejar", "dǎsuàn"), V("决定", 3, "decidir", "juédìng"), V("选择", 3, "escolher", "xuǎnzé"),
  V("试试", 3, "tentar, experimentar", "shìshi"), V("要", 3, "querer, precisar", "yào"),
];
