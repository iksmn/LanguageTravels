import type { Character } from "./cast";

/**
 * Reisegefährten — ALEMÃO.
 * Personagens próprios da Alemanha/Áustria/Suíça, nos mesmos ids canônicos da rota.
 */

export const GROUP_QUOTE_DE = {
  fr: "Keine Eifersucht — nur die Freiheit, zusammen zu sein.",
  pt: "Sem ciúmes — só a liberdade de estar junto.",
};

export const CAST_DE: Character[] = [
  {
    id: "thomas",
    name: "Jonas Weber",
    age: 28,
    profFr: "Doktorand der Astronomie",
    profPt: "Doutorando em Astronomia",
    city: "Heidelberg",
    traits: [
      { fr: "Neugierig", pt: "Curioso" },
      { fr: "Gründlich", pt: "Minucioso" },
      { fr: "Träumerisch", pt: "Sonhador" },
    ],
    interests: [
      { fr: "Exoplaneten", pt: "Exoplanetas" },
      { fr: "Teleskope", pt: "Telescópios" },
      { fr: "Science-Fiction", pt: "Ficção científica" },
    ],
    complices: ["Lena", "Felix"],
    weeks: [],
    color: "#2b6cb0",
    quote: {
      fr: "Schau die Sterne an: jeder ist eine Geschichte.",
      pt: "Olhe as estrelas: cada uma é uma história.",
    },
    avatar: { skin: "#f0c8a0", hair: "#c9a227", hairStyle: "short", shirt: "#2b6cb0", accessory: "glasses" },
  },
  {
    id: "julien",
    name: "Felix Krüger",
    age: 30,
    profFr: "Software-Ingenieur (KI)",
    profPt: "Engenheiro de software (IA)",
    city: "München",
    traits: [
      { fr: "Pragmatisch", pt: "Pragmático" },
      { fr: "Kreativ", pt: "Criativo" },
      { fr: "Gesellig", pt: "Sociável" },
    ],
    interests: [
      { fr: "Machine Learning", pt: "Aprendizado de máquina" },
      { fr: "Klettern", pt: "Escalada" },
      { fr: "Goethe & Hugo", pt: "Goethe e Hugo" },
    ],
    complices: ["Anna", "Jonas"],
    weeks: [],
    color: "#e4572e",
    quote: {
      fr: "Guter Code ist wie gutes Bier: klar und ehrlich.",
      pt: "Bom código é como boa cerveja: claro e honesto.",
    },
    avatar: { skin: "#e8b48a", hair: "#6b4a2f", hairStyle: "short", shirt: "#e4572e", accessory: "beanie" },
  },
  {
    id: "marc",
    name: "Henrik Baumann",
    age: 33,
    profFr: "Koch, Bistro am Hafen",
    profPt: "Chef, bistrô no porto",
    city: "Hamburg",
    traits: [
      { fr: "Leidenschaftlich", pt: "Apaixonado" },
      { fr: "Großzügig", pt: "Generoso" },
      { fr: "Geschichtenerzähler", pt: "Contador de histórias" },
    ],
    interests: [
      { fr: "Regionale Küche", pt: "Cozinha regional" },
      { fr: "Weine & Biere", pt: "Vinhos e cervejas" },
      { fr: "Fußball (St. Pauli)", pt: "Futebol (St. Pauli)" },
    ],
    complices: ["Marie", "Anna"],
    weeks: [],
    color: "#e8930c",
    quote: {
      fr: "Kochen ist Liebe, die man essen kann.",
      pt: "Cozinhar é amor que se pode comer.",
    },
    avatar: { skin: "#d9a06b", hair: "#3d2e23", hairStyle: "short", shirt: "#e8930c", accessory: "mustache" },
  },
  {
    id: "lea",
    name: "Lena Hoffmann",
    age: 28,
    profFr: "Astronomin",
    profPt: "Astrônoma",
    city: "Heidelberg",
    traits: [
      { fr: "Klug", pt: "Brilhante" },
      { fr: "Entschlossen", pt: "Determinada" },
      { fr: "Wettbewerbslustig", pt: "Competitiva" },
    ],
    interests: [
      { fr: "Astrophysik", pt: "Astrofísica" },
      { fr: "Nachtfotografie", pt: "Fotografia noturna" },
      { fr: "Jules Verne", pt: "Júlio Verne" },
    ],
    complices: ["Jonas", "Anna"],
    weeks: [],
    color: "#8d4fa0",
    quote: {
      fr: "Der Himmel ist nicht die Grenze — er ist der Anfang.",
      pt: "O céu não é o limite — é o começo.",
    },
    avatar: { skin: "#f5d3b3", hair: "#e0b64f", hairStyle: "bun", shirt: "#8d4fa0" },
  },
  {
    id: "camille",
    name: "Anna Schuster",
    age: 30,
    profFr: "Kunsthistorikerin",
    profPt: "Historiadora da arte",
    city: "Berlin",
    traits: [
      { fr: "Künstlerisch", pt: "Artística" },
      { fr: "Beobachtend", pt: "Observadora" },
      { fr: "Unabhängig", pt: "Independente" },
    ],
    interests: [
      { fr: "Moderne Kunst", pt: "Arte moderna" },
      { fr: "Architektur", pt: "Arquitetura" },
      { fr: "Klassisches Kino", pt: "Cinema clássico" },
    ],
    complices: ["Felix", "Marie"],
    weeks: [],
    color: "#0e8f8b",
    quote: {
      fr: "Jedes Kunstwerk erzählt eine geheime Geschichte.",
      pt: "Cada obra de arte conta uma história secreta.",
    },
    avatar: { skin: "#f0c8a0", hair: "#8a5a2b", hairStyle: "bob", shirt: "#0e8f8b", accessory: "beret" },
  },
  {
    id: "sophie",
    name: "Marie Vogel",
    age: 32,
    profFr: "Journalistin (Kultur & Essen)",
    profPt: "Jornalista (cultura e comida)",
    city: "Leipzig",
    traits: [
      { fr: "Offen", pt: "Extrovertida" },
      { fr: "Neugierig", pt: "Curiosa" },
      { fr: "Abenteuerlustig", pt: "Aventureira" },
    ],
    interests: [
      { fr: "Esskultur", pt: "Cultura gastronômica" },
      { fr: "Kulturpolitik", pt: "Política cultural" },
      { fr: "Fußball & Wintersport", pt: "Futebol e esportes de inverno" },
    ],
    complices: ["Henrik", "Lena"],
    weeks: [],
    color: "#d7263d",
    quote: {
      fr: "Eine gute Geschichte findet man überall — auch auf dem Markt.",
      pt: "Uma boa história se encontra em qualquer lugar — até na feira.",
    },
    avatar: { skin: "#e8b48a", hair: "#a3341f", hairStyle: "long", shirt: "#d7263d" },
  },
];
