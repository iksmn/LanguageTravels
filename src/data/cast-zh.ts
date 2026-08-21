import type { Character } from "./cast";

/** Elenco da rota de mandarim — China · Coreia do Norte · Vietnã. */

export const GROUP_QUOTE_ZH = {
  fr: "没有嫉妒，只有在一起的自由。",
  pt: "Sem ciúmes — só a liberdade de estar junto.",
};

export const CAST_ZH: Character[] = [
  {
    id: "thomas",
    name: "Wang Wei 王伟",
    age: 28,
    profFr: "天文学家（FAST）",
    profPt: "Astrônomo (telescópio FAST)",
    city: "Pingtang · Guizhou",
    traits: [
      { fr: "好奇", pt: "Curioso" },
      { fr: "安静", pt: "Tranquilo" },
      { fr: "专注", pt: "Concentrado" },
    ],
    interests: [
      { fr: "中国天眼 FAST", pt: "Radiotelescópio FAST" },
      { fr: "脉冲星", pt: "Pulsares" },
      { fr: "围棋", pt: "Go (weiqi)" },
    ],
    complices: ["Zhang Yue", "Li Ming"],
    weeks: [],
    color: "#2b6cb0",
    quote: {
      fr: "望远镜是地球的眼睛。",
      pt: "O telescópio é o olho da Terra.",
    },
    avatar: { skin: "#f2cfa4", hair: "#1f2937", hairStyle: "short", shirt: "#2b6cb0", accessory: "glasses" },
  },
  {
    id: "julien",
    name: "Li Ming 李明",
    age: 30,
    profFr: "AI 工程师",
    profPt: "Engenheiro de IA",
    city: "上海 · Xangai",
    traits: [
      { fr: "实际", pt: "Pragmático" },
      { fr: "快", pt: "Rápido" },
      { fr: "幽默", pt: "Bem-humorado" },
    ],
    interests: [
      { fr: "人工智能", pt: "Inteligência artificial" },
      { fr: "算法", pt: "Algoritmos" },
      { fr: "乒乓球", pt: "Tênis de mesa" },
    ],
    complices: ["Wang Wei", "Chen Jie"],
    weeks: [],
    color: "#e8930c",
    quote: {
      fr: "代码和星星一样，都讲究秩序。",
      pt: "Código e estrelas têm algo em comum: os dois exigem ordem.",
    },
    avatar: { skin: "#f0c8a0", hair: "#111827", hairStyle: "short", shirt: "#e8930c", accessory: "beanie" },
  },
  {
    id: "marc",
    name: "Chen Jie 陈杰",
    age: 32,
    profFr: "川菜厨师",
    profPt: "Chef de cozinha de Sichuan",
    city: "成都 · Chengdu",
    traits: [
      { fr: "热情", pt: "Caloroso" },
      { fr: "大方", pt: "Generoso" },
      { fr: "传统", pt: "Tradicionalista" },
    ],
    interests: [
      { fr: "川菜", pt: "Cozinha de Sichuan" },
      { fr: "火锅", pt: "Hotpot" },
      { fr: "足球", pt: "Futebol" },
    ],
    complices: ["Nguyen Thi Mai", "Zhang Min"],
    weeks: [],
    color: "#d7263d",
    quote: {
      fr: "火锅里什么都可以煮，包括烦恼。",
      pt: "No hotpot cabe tudo para cozinhar — inclusive as preocupações.",
    },
    avatar: { skin: "#eeb98a", hair: "#2b2b2b", hairStyle: "short", shirt: "#d7263d", accessory: "mustache" },
  },
  {
    id: "lea",
    name: "Zhang Yue 张悦",
    age: 27,
    profFr: "艺术史学家",
    profPt: "Historiadora da arte",
    city: "北京 · Pequim",
    traits: [
      { fr: "细心", pt: "Atenta" },
      { fr: "耐心", pt: "Paciente" },
      { fr: "浪漫", pt: "Romântica" },
    ],
    interests: [
      { fr: "古观象台", pt: "Observatório Antigo" },
      { fr: "青铜器", pt: "Bronzes antigos" },
      { fr: "书法", pt: "Caligrafia" },
    ],
    complices: ["Wang Wei", "Park Son-hui"],
    weeks: [],
    color: "#0e8f8b",
    quote: {
      fr: "每一颗星星都有名字，就像每个朋友。",
      pt: "Cada estrela tem um nome — como cada amigo.",
    },
    avatar: { skin: "#f5d3ac", hair: "#1f2937", hairStyle: "bun", shirt: "#0e8f8b" },
  },
  {
    id: "camille",
    name: "Park Son-hui 朴善姬",
    age: 29,
    profFr: "体育记者",
    profPt: "Jornalista esportiva",
    city: "平壤 · Pyongyang",
    traits: [
      { fr: "直率", pt: "Direta" },
      { fr: "勇敢", pt: "Corajosa" },
      { fr: "忠诚", pt: "Leal" },
    ],
    interests: [
      { fr: "足球", pt: "Futebol" },
      { fr: "体育新闻", pt: "Jornalismo esportivo" },
      { fr: "平壤地铁", pt: "Metrô de Pyongyang" },
    ],
    complices: ["Zhang Yue", "Nguyen Thi Mai"],
    weeks: [],
    color: "#8d4fa0",
    quote: {
      fr: "球场是最大的舞台。",
      pt: "O campo de jogo é o maior palco que existe.",
    },
    avatar: { skin: "#f3d1ae", hair: "#17202a", hairStyle: "bob", shirt: "#8d4fa0" },
  },
  {
    id: "sophie",
    name: "Nguyen Thi Mai 阮氏梅",
    age: 31,
    profFr: "美食记者",
    profPt: "Jornalista gastronômica",
    city: "河内 · Hanói",
    traits: [
      { fr: "开朗", pt: "Extrovertida" },
      { fr: "好奇", pt: "Curiosa" },
      { fr: "自由", pt: "Livre" },
    ],
    interests: [
      { fr: "美食", pt: "Gastronomia" },
      { fr: "旅行", pt: "Viagens" },
      { fr: "文学", pt: "Literatura" },
    ],
    complices: ["Chen Jie", "Zhang Yue"],
    weeks: [],
    color: "#4a9c2f",
    quote: {
      fr: "一碗粉，一个故事。",
      pt: "Uma tigela de phở, uma história.",
    },
    avatar: { skin: "#edb687", hair: "#241a12", hairStyle: "long", shirt: "#4a9c2f" },
  },
];
