import type { Character } from "./cast";

/**
 * Travel companions — INGLÊS.
 * Personagens próprios das Ilhas Britânicas, nos mesmos ids canônicos da rota.
 */

export const GROUP_QUOTE_EN = {
  fr: "No jealousy — just the freedom of being together.",
  pt: "Sem ciúmes — só a liberdade de estar junto.",
};

export const CAST_EN: Character[] = [
  {
    id: "thomas",
    name: "Oliver Hayes",
    age: 29,
    profFr: "Astronomy PhD student",
    profPt: "Doutorando em Astronomia",
    city: "Edinburgh",
    traits: [
      { fr: "Curious", pt: "Curioso" },
      { fr: "Methodical", pt: "Metódico" },
      { fr: "Dreamy", pt: "Sonhador" },
    ],
    interests: [
      { fr: "Exoplanets", pt: "Exoplanetas" },
      { fr: "Telescopes", pt: "Telescópios" },
      { fr: "Science fiction", pt: "Ficção científica" },
    ],
    complices: ["Amelia", "Ethan"],
    weeks: [],
    color: "#2b6cb0",
    quote: {
      fr: "Look at the stars: each one is a story.",
      pt: "Olhe as estrelas: cada uma é uma história.",
    },
    avatar: { skin: "#f5d3b3", hair: "#8a5a2b", hairStyle: "short", shirt: "#2b6cb0", accessory: "glasses" },
  },
  {
    id: "julien",
    name: "Ethan Walker",
    age: 31,
    profFr: "Software engineer (AI)",
    profPt: "Engenheiro de software (IA)",
    city: "Manchester",
    traits: [
      { fr: "Pragmatic", pt: "Pragmático" },
      { fr: "Creative", pt: "Criativo" },
      { fr: "Sociable", pt: "Sociável" },
    ],
    interests: [
      { fr: "Machine learning", pt: "Aprendizado de máquina" },
      { fr: "Climbing", pt: "Escalada" },
      { fr: "The classics (Shakespeare)", pt: "Os clássicos (Shakespeare)" },
    ],
    complices: ["Charlotte", "Oliver"],
    weeks: [],
    color: "#e4572e",
    quote: {
      fr: "Good code is like good tea: simple and strong.",
      pt: "Bom código é como um bom chá: simples e forte.",
    },
    avatar: { skin: "#e8b48a", hair: "#3d2e23", hairStyle: "short", shirt: "#e4572e", accessory: "beanie" },
  },
  {
    id: "marc",
    name: "Harry Bennett",
    age: 33,
    profFr: "Chef, bistro in London",
    profPt: "Chef, bistrô em Londres",
    city: "London",
    traits: [
      { fr: "Passionate", pt: "Apaixonado" },
      { fr: "Generous", pt: "Generoso" },
      { fr: "Storyteller", pt: "Contador de histórias" },
    ],
    interests: [
      { fr: "Regional cooking", pt: "Cozinha regional" },
      { fr: "Ales & wines", pt: "Ales e vinhos" },
      { fr: "Football (Arsenal)", pt: "Futebol (Arsenal)" },
    ],
    complices: ["Grace", "Charlotte"],
    weeks: [],
    color: "#e8930c",
    quote: {
      fr: "Cooking is love you can eat.",
      pt: "Cozinhar é amor que se pode comer.",
    },
    avatar: { skin: "#d9a06b", hair: "#c9a227", hairStyle: "short", shirt: "#e8930c", accessory: "mustache" },
  },
  {
    id: "lea",
    name: "Amelia Clarke",
    age: 28,
    profFr: "Astronomer",
    profPt: "Astrônoma",
    city: "Edinburgh",
    traits: [
      { fr: "Brilliant", pt: "Brilhante" },
      { fr: "Determined", pt: "Determinada" },
      { fr: "Competitive", pt: "Competitiva" },
    ],
    interests: [
      { fr: "Astrophysics", pt: "Astrofísica" },
      { fr: "Night photography", pt: "Fotografia noturna" },
      { fr: "Jules Verne", pt: "Júlio Verne" },
    ],
    complices: ["Oliver", "Charlotte"],
    weeks: [],
    color: "#8d4fa0",
    quote: {
      fr: "The sky is not the limit — it is the beginning.",
      pt: "O céu não é o limite — é o começo.",
    },
    avatar: { skin: "#f0c8a0", hair: "#a3341f", hairStyle: "bun", shirt: "#8d4fa0" },
  },
  {
    id: "camille",
    name: "Charlotte Reed",
    age: 30,
    profFr: "Art historian",
    profPt: "Historiadora da arte",
    city: "Oxford",
    traits: [
      { fr: "Artistic", pt: "Artística" },
      { fr: "Observant", pt: "Observadora" },
      { fr: "Independent", pt: "Independente" },
    ],
    interests: [
      { fr: "Modern art", pt: "Arte moderna" },
      { fr: "Architecture", pt: "Arquitetura" },
      { fr: "Classic cinema", pt: "Cinema clássico" },
    ],
    complices: ["Ethan", "Grace"],
    weeks: [],
    color: "#0e8f8b",
    quote: {
      fr: "Every painting hides a secret.",
      pt: "Cada quadro esconde um segredo.",
    },
    avatar: { skin: "#f5d3b3", hair: "#5a3a1e", hairStyle: "bob", shirt: "#0e8f8b", accessory: "beret" },
  },
  {
    id: "sophie",
    name: "Grace Murphy",
    age: 32,
    profFr: "Journalist (culture & food)",
    profPt: "Jornalista (cultura e comida)",
    city: "Dublin",
    traits: [
      { fr: "Outgoing", pt: "Extrovertida" },
      { fr: "Curious", pt: "Curiosa" },
      { fr: "Adventurous", pt: "Aventureira" },
    ],
    interests: [
      { fr: "Food culture", pt: "Cultura gastronômica" },
      { fr: "Cultural politics", pt: "Política cultural" },
      { fr: "Football & trad music", pt: "Futebol e música tradicional" },
    ],
    complices: ["Harry", "Amelia"],
    weeks: [],
    color: "#d7263d",
    quote: {
      fr: "A good story is everywhere — even at the market.",
      pt: "Uma boa história está em toda parte — até na feira.",
    },
    avatar: { skin: "#e8b48a", hair: "#241a12", hairStyle: "long", shirt: "#d7263d" },
  },
];
