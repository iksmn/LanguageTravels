import type { Character } from "./cast";

/**
 * Compañeros de viaje — ESPANHOL.
 * Personagens próprios de Espanha e Portugal, nos mesmos ids canônicos da rota.
 */

export const GROUP_QUOTE_ES = {
  fr: "Sin celos, solo la libertad de estar juntos.",
  pt: "Sem ciúmes — só a liberdade de estar junto.",
};

export const CAST_ES: Character[] = [
  {
    id: "thomas",
    name: "Diego Fernández",
    age: 29,
    profFr: "Doctorando en astronomía",
    profPt: "Doutorando em Astronomia",
    city: "Granada",
    traits: [
      { fr: "Curioso", pt: "Curioso" },
      { fr: "Metódico", pt: "Metódico" },
      { fr: "Soñador", pt: "Sonhador" },
    ],
    interests: [
      { fr: "Exoplanetas", pt: "Exoplanetas" },
      { fr: "Telescopios", pt: "Telescópios" },
      { fr: "Ciencia ficción", pt: "Ficção científica" },
    ],
    complices: ["Carmen", "Javier"],
    weeks: [],
    color: "#2b6cb0",
    quote: {
      fr: "Mira las estrellas: cada una es una historia.",
      pt: "Olhe as estrelas: cada uma é uma história.",
    },
    avatar: { skin: "#e0ac7e", hair: "#2e2117", hairStyle: "short", shirt: "#2b6cb0", accessory: "glasses" },
  },
  {
    id: "julien",
    name: "Javier Morales",
    age: 31,
    profFr: "Ingeniero de software (IA)",
    profPt: "Engenheiro de software (IA)",
    city: "Barcelona",
    traits: [
      { fr: "Pragmático", pt: "Pragmático" },
      { fr: "Creativo", pt: "Criativo" },
      { fr: "Sociable", pt: "Sociável" },
    ],
    interests: [
      { fr: "Machine learning", pt: "Aprendizado de máquina" },
      { fr: "Escalada", pt: "Escalada" },
      { fr: "Los clásicos (Cervantes)", pt: "Os clássicos (Cervantes)" },
    ],
    complices: ["Lucía", "Diego"],
    weeks: [],
    color: "#e4572e",
    quote: {
      fr: "Un buen algoritmo es como una buena paella: equilibrio.",
      pt: "Um bom algoritmo é como uma boa paella: equilíbrio.",
    },
    avatar: { skin: "#d9a06b", hair: "#1f1a17", hairStyle: "short", shirt: "#e4572e", accessory: "beanie" },
  },
  {
    id: "marc",
    name: "Alejandro Ruiz",
    age: 33,
    profFr: "Chef, taberna en Sevilla",
    profPt: "Chef, taberna em Sevilha",
    city: "Sevilla",
    traits: [
      { fr: "Apasionado", pt: "Apaixonado" },
      { fr: "Generoso", pt: "Generoso" },
      { fr: "Cuentacuentos", pt: "Contador de histórias" },
    ],
    interests: [
      { fr: "Cocina andaluza", pt: "Cozinha andaluza" },
      { fr: "Vinos de Jerez", pt: "Vinhos de Jerez" },
      { fr: "Fútbol (Sevilla FC)", pt: "Futebol (Sevilla FC)" },
    ],
    complices: ["Sofía", "Lucía"],
    weeks: [],
    color: "#e8930c",
    quote: {
      fr: "Las tapas son poesía pequeña.",
      pt: "As tapas são poesia em miniatura.",
    },
    avatar: { skin: "#c98d5c", hair: "#3d2e23", hairStyle: "short", shirt: "#e8930c", accessory: "mustache" },
  },
  {
    id: "lea",
    name: "Carmen Ortega",
    age: 28,
    profFr: "Astrónoma",
    profPt: "Astrônoma",
    city: "Granada",
    traits: [
      { fr: "Brillante", pt: "Brilhante" },
      { fr: "Decidida", pt: "Determinada" },
      { fr: "Competitiva", pt: "Competitiva" },
    ],
    interests: [
      { fr: "Astrofísica", pt: "Astrofísica" },
      { fr: "Fotografía nocturna", pt: "Fotografia noturna" },
      { fr: "Julio Verne", pt: "Júlio Verne" },
    ],
    complices: ["Diego", "Lucía"],
    weeks: [],
    color: "#8d4fa0",
    quote: {
      fr: "El cielo no es el límite: es el comienzo.",
      pt: "O céu não é o limite: é o começo.",
    },
    avatar: { skin: "#e8b48a", hair: "#241a12", hairStyle: "bun", shirt: "#8d4fa0" },
  },
  {
    id: "camille",
    name: "Lucía Navarro",
    age: 30,
    profFr: "Historiadora del arte",
    profPt: "Historiadora da arte",
    city: "Madrid",
    traits: [
      { fr: "Artística", pt: "Artística" },
      { fr: "Observadora", pt: "Observadora" },
      { fr: "Independiente", pt: "Independente" },
    ],
    interests: [
      { fr: "Arte moderno (Picasso)", pt: "Arte moderna (Picasso)" },
      { fr: "Arquitectura", pt: "Arquitetura" },
      { fr: "Cine clásico", pt: "Cinema clássico" },
    ],
    complices: ["Javier", "Sofía"],
    weeks: [],
    color: "#0e8f8b",
    quote: {
      fr: "Cada cuadro esconde un secreto.",
      pt: "Cada quadro esconde um segredo.",
    },
    avatar: { skin: "#f0c8a0", hair: "#5a3a1e", hairStyle: "bob", shirt: "#0e8f8b", accessory: "beret" },
  },
  {
    id: "sophie",
    name: "Sofía Delgado",
    age: 32,
    profFr: "Periodista (cultura y gastronomía)",
    profPt: "Jornalista (cultura e gastronomia)",
    city: "Lisboa",
    traits: [
      { fr: "Extrovertida", pt: "Extrovertida" },
      { fr: "Curiosa", pt: "Curiosa" },
      { fr: "Aventurera", pt: "Aventureira" },
    ],
    interests: [
      { fr: "Gastronomía", pt: "Gastronomia" },
      { fr: "Política cultural", pt: "Política cultural" },
      { fr: "Fútbol y fado", pt: "Futebol e fado" },
    ],
    complices: ["Alejandro", "Carmen"],
    weeks: [],
    color: "#d7263d",
    quote: {
      fr: "Una buena historia está en todas partes, también en el mercado.",
      pt: "Uma boa história está em toda parte, até no mercado.",
    },
    avatar: { skin: "#e0ac7e", hair: "#4a2c17", hairStyle: "long", shirt: "#d7263d" },
  },
];
