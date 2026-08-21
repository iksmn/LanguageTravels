import type { Character } from "./cast";

/**
 * Compagni di viaggio — ITALIANO.
 * Cada personagem ocupa um "id canônico" (o mesmo usado nas rotas) mas tem
 * nome, cidade, personalidade e avatar próprios da Itália.
 */

export const GROUP_QUOTE_IT = {
  fr: "Niente gelosia, solo la libertà di stare insieme.",
  pt: "Sem ciúmes — só a liberdade de estar junto.",
};

export const CAST_IT: Character[] = [
  {
    id: "thomas",
    name: "Marco Ricci",
    age: 29,
    profFr: "Dottorando in astronomia",
    profPt: "Doutorando em Astronomia",
    city: "Trieste",
    traits: [
      { fr: "Curioso", pt: "Curioso" },
      { fr: "Metodico", pt: "Metódico" },
      { fr: "Sognatore", pt: "Sonhador" },
    ],
    interests: [
      { fr: "Esopianeti", pt: "Exoplanetas" },
      { fr: "Telescopi", pt: "Telescópios" },
      { fr: "Fantascienza", pt: "Ficção científica" },
    ],
    complices: ["Elena", "Luca"],
    weeks: [],
    color: "#2b6cb0",
    quote: {
      fr: "Guarda le stelle: ognuna è una storia.",
      pt: "Olhe as estrelas: cada uma é uma história.",
    },
    avatar: { skin: "#f0c8a0", hair: "#4a3320", hairStyle: "short", shirt: "#2b6cb0", accessory: "glasses" },
  },
  {
    id: "julien",
    name: "Luca Ferrari",
    age: 31,
    profFr: "Ingegnere software (IA)",
    profPt: "Engenheiro de software (IA)",
    city: "Milano",
    traits: [
      { fr: "Pragmatico", pt: "Pragmático" },
      { fr: "Creativo", pt: "Criativo" },
      { fr: "Socievole", pt: "Sociável" },
    ],
    interests: [
      { fr: "Machine learning", pt: "Aprendizado de máquina" },
      { fr: "Arrampicata", pt: "Escalada" },
      { fr: "I classici (Dante)", pt: "Os clássicos (Dante)" },
    ],
    complices: ["Giulia", "Marco"],
    weeks: [],
    color: "#e4572e",
    quote: {
      fr: "Un buon algoritmo è come una buona ricetta: semplicità.",
      pt: "Um bom algoritmo é como uma boa receita: simplicidade.",
    },
    avatar: { skin: "#e8b48a", hair: "#2e2e2e", hairStyle: "short", shirt: "#e4572e", accessory: "beanie" },
  },
  {
    id: "marc",
    name: "Alessandro Esposito",
    age: 33,
    profFr: "Chef, trattoria a Napoli",
    profPt: "Chef, trattoria em Nápoles",
    city: "Napoli",
    traits: [
      { fr: "Appassionato", pt: "Apaixonado" },
      { fr: "Generoso", pt: "Generoso" },
      { fr: "Narratore", pt: "Contador de histórias" },
    ],
    interests: [
      { fr: "Cucina regionale", pt: "Cozinha regional" },
      { fr: "Vini del Sud", pt: "Vinhos do Sul" },
      { fr: "Calcio (Napoli)", pt: "Futebol (Napoli)" },
    ],
    complices: ["Chiara", "Giulia"],
    weeks: [],
    color: "#e8930c",
    quote: {
      fr: "La pasta è poesia. Il resto è prosa.",
      pt: "Macarrão é poesia. O resto é prosa.",
    },
    avatar: { skin: "#d9a06b", hair: "#3d2e23", hairStyle: "short", shirt: "#e8930c", accessory: "mustache" },
  },
  {
    id: "lea",
    name: "Elena Greco",
    age: 28,
    profFr: "Astronoma",
    profPt: "Astrônoma",
    city: "Trieste",
    traits: [
      { fr: "Brillante", pt: "Brilhante" },
      { fr: "Determinata", pt: "Determinada" },
      { fr: "Competitiva", pt: "Competitiva" },
    ],
    interests: [
      { fr: "Astrofisica", pt: "Astrofísica" },
      { fr: "Fotografia notturna", pt: "Fotografia noturna" },
      { fr: "Jules Verne", pt: "Júlio Verne" },
    ],
    complices: ["Marco", "Giulia"],
    weeks: [],
    color: "#8d4fa0",
    quote: {
      fr: "Il cielo non è il limite: è l'inizio.",
      pt: "O céu não é o limite: é o começo.",
    },
    avatar: { skin: "#f5d3b3", hair: "#1f1a17", hairStyle: "bun", shirt: "#8d4fa0" },
  },
  {
    id: "camille",
    name: "Giulia Romano",
    age: 30,
    profFr: "Storica dell'arte",
    profPt: "Historiadora da arte",
    city: "Firenze",
    traits: [
      { fr: "Artistica", pt: "Artística" },
      { fr: "Osservatrice", pt: "Observadora" },
      { fr: "Indipendente", pt: "Independente" },
    ],
    interests: [
      { fr: "Arte rinascimentale", pt: "Arte renascentista" },
      { fr: "Architettura", pt: "Arquitetura" },
      { fr: "Cinema classico", pt: "Cinema clássico" },
    ],
    complices: ["Luca", "Sofia"],
    weeks: [],
    color: "#0e8f8b",
    quote: {
      fr: "Ogni affresco nasconde un segreto.",
      pt: "Cada afresco esconde um segredo.",
    },
    avatar: { skin: "#f0c8a0", hair: "#8a5a2b", hairStyle: "bob", shirt: "#0e8f8b", accessory: "beret" },
  },
  {
    id: "sophie",
    name: "Chiara Bianchi",
    age: 32,
    profFr: "Giornalista (cultura e cibo)",
    profPt: "Jornalista (cultura e comida)",
    city: "Roma",
    traits: [
      { fr: "Estroversa", pt: "Extrovertida" },
      { fr: "Curiosa", pt: "Curiosa" },
      { fr: "Avventurosa", pt: "Aventureira" },
    ],
    interests: [
      { fr: "Cibo di strada", pt: "Comida de rua" },
      { fr: "Politica culturale", pt: "Política cultural" },
      { fr: "Calcio (Roma)", pt: "Futebol (Roma)" },
    ],
    complices: ["Alessandro", "Elena"],
    weeks: [],
    color: "#d7263d",
    quote: {
      fr: "Una buona storia si trova ovunque, anche in un mercato.",
      pt: "Uma boa história se encontra em qualquer lugar, até num mercado.",
    },
    avatar: { skin: "#e8b48a", hair: "#5a3a1e", hairStyle: "long", shirt: "#d7263d" },
  },
];
