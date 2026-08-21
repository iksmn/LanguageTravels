import type { Character } from "./cast";

/** Elenco da rota de japonês — Japão · Estados Unidos. */

export const GROUP_QUOTE_JA = {
  fr: "嫉妬はない、一緒にいる自由だけ。",
  pt: "Sem ciúmes — só a liberdade de estar junto.",
};

export const CAST_JA: Character[] = [
  {
    id: "thomas",
    name: "Kenji Sato 佐藤健二",
    age: 28,
    profFr: "天文学者（すばる望遠鏡）",
    profPt: "Astrônomo (Telescópio Subaru)",
    city: "東京 · Tóquio",
    traits: [
      { fr: "静か", pt: "Sereno" },
      { fr: "粘り強い", pt: "Persistente" },
      { fr: "詩的", pt: "Poético" },
    ],
    interests: [
      { fr: "すばる望遠鏡", pt: "Telescópio Subaru" },
      { fr: "外惑星", pt: "Exoplanetas" },
      { fr: "囲碁", pt: "Go (igo)" },
    ],
    complices: ["Yuki", "Takeshi"],
    weeks: [],
    color: "#24457c",
    quote: {
      fr: "星は待ってくれない。だから僕が行く。",
      pt: "As estrelas não esperam. Então eu vou até elas.",
    },
    avatar: { skin: "#f2cfa4", hair: "#17202a", hairStyle: "short", shirt: "#24457c", accessory: "glasses" },
  },
  {
    id: "julien",
    name: "Takeshi Yamamoto 山本武",
    age: 30,
    profFr: "AI エンジニア",
    profPt: "Engenheiro de IA",
    city: "Seattle · シアトル",
    traits: [
      { fr: "実用的", pt: "Pragmático" },
      { fr: "速い", pt: "Ágil" },
      { fr: "冒険好き", pt: "Aventureiro" },
    ],
    interests: [
      { fr: "人工知能", pt: "Inteligência artificial" },
      { fr: "ロボット", pt: "Robótica" },
      { fr: "クライミング", pt: "Escalada" },
    ],
    complices: ["Kenji", "Yuki"],
    weeks: [],
    color: "#0e8f8b",
    quote: {
      fr: "コードも星も、パターンでできている。",
      pt: "Código e estrelas são feitos de padrões.",
    },
    avatar: { skin: "#f0c8a0", hair: "#111827", hairStyle: "short", shirt: "#0e8f8b", accessory: "beanie" },
  },
  {
    id: "marc",
    name: "Haruto Tanaka 田中陽斗",
    age: 32,
    profFr: "ラーメン職人",
    profPt: "Chef de ramen e takoyaki",
    city: "大阪 · Osaka",
    traits: [
      { fr: "明るい", pt: "Radiante" },
      { fr: "伝統的", pt: "Tradicionalista" },
      { fr: "気前がいい", pt: "Generoso" },
    ],
    interests: [
      { fr: "たこ焼き", pt: "Takoyaki" },
      { fr: "阪神タイガース", pt: "Hanshin Tigers (beisebol)" },
      { fr: "相撲", pt: "Sumô" },
    ],
    complices: ["Emi", "Aoi"],
    weeks: [],
    color: "#e4572e",
    quote: {
      fr: "一杯のラーメンに心を込める。",
      pt: "Coloco o coração em cada tigela de ramen.",
    },
    avatar: { skin: "#eeb98a", hair: "#2b2b2b", hairStyle: "short", shirt: "#e4572e", accessory: "mustache" },
  },
  {
    id: "lea",
    name: "Yuki Kobayashi 小林雪",
    age: 27,
    profFr: "天体物理学者",
    profPt: "Astrofísica das auroras",
    city: "札幌 · Sapporo",
    traits: [
      { fr: "真剣", pt: "Determinada" },
      { fr: "夢見がち", pt: "Sonhadora" },
      { fr: "競争好き", pt: "Competitiva" },
    ],
    interests: [
      { fr: "オーロラ", pt: "Auroras" },
      { fr: "夜の写真", pt: "Fotografia noturna" },
      { fr: "スキージャンプ", pt: "Salto de esqui" },
    ],
    complices: ["Kenji", "Takeshi"],
    weeks: [],
    color: "#5d5ea6",
    quote: {
      fr: "雪の夜、星がいちばん近い。",
      pt: "Na noite de neve, as estrelas ficam mais perto.",
    },
    avatar: { skin: "#f5d3ac", hair: "#1f2937", hairStyle: "bun", shirt: "#5d5ea6" },
  },
  {
    id: "camille",
    name: "Aoi Nakamura 中村葵",
    age: 29,
    profFr: "美術キュレーター",
    profPt: "Curadora de arte",
    city: "京都 · Quioto",
    traits: [
      { fr: "観察者", pt: "Observadora" },
      { fr: "静けさ", pt: "Serena" },
      { fr: "独立", pt: "Independente" },
    ],
    interests: [
      { fr: "浮世絵", pt: "Ukiyo-e (gravuras)" },
      { fr: "庭園", pt: "Jardins zen" },
      { fr: "茶道", pt: "Cerimônia do chá" },
    ],
    complices: ["Haruto", "Emi"],
    weeks: [],
    color: "#946b2d",
    quote: {
      fr: "美は細部に宿る。",
      pt: "A beleza mora nos detalhes.",
    },
    avatar: { skin: "#f3d1ae", hair: "#17202a", hairStyle: "long", shirt: "#946b2d" },
  },
  {
    id: "sophie",
    name: "Emi Watanabe 渡辺恵美",
    age: 31,
    profFr: "ジャーナリスト",
    profPt: "Jornalista",
    city: "広島 · Hiroshima",
    traits: [
      { fr: "率直", pt: "Sincera" },
      { fr: "勇敢", pt: "Corajosa" },
      { fr: "自由", pt: "Livre" },
    ],
    interests: [
      { fr: "平和の記事", pt: "Jornalismo de paz" },
      { fr: "沖縄の海", pt: "Mar de Okinawa" },
      { fr: "村上春樹", pt: "Haruki Murakami" },
    ],
    complices: ["Aoi", "Haruto"],
    weeks: [],
    color: "#4a9c2f",
    quote: {
      fr: "物語は橋を架ける。",
      pt: "As histórias constroem pontes.",
    },
    avatar: { skin: "#edb687", hair: "#241a12", hairStyle: "bob", shirt: "#4a9c2f" },
  },
];
