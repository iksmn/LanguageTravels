export interface Character {
  id: string;
  name: string;
  age: number;
  profFr: string;
  profPt: string;
  city: string;
  traits: { fr: string; pt: string }[];
  interests: { fr: string; pt: string }[];
  complices: string[]; // primeiros nomes
  weeks: number[];
  color: string;
  quote: { fr: string; pt: string };
  avatar: {
    skin: string;
    hair: string;
    hairStyle: "short" | "long" | "bun" | "bob";
    shirt: string;
    accessory?: "glasses" | "beret" | "mustache" | "beanie";
  };
}

export const GROUP_QUOTE = {
  fr: "Pas de jalousie, juste la liberté d'être ensemble.",
  pt: "Sem ciúmes — só a liberdade de estar junto.",
};

export const GROUP_PRINCIPLES = [
  { fr: "Liberté", pt: "Cada um é livre para amar e aprender como quiser." },
  { fr: "Amitié", pt: "A base de tudo é uma amizade profunda e honesta." },
  { fr: "Soutien", pt: "Todos celebram as conexões dos outros — ninguém compete." },
];

export const CHARACTERS: Character[] = [
  {
    id: "thomas",
    name: "Thomas Moreau",
    age: 28,
    profFr: "Doctorant en astronomie",
    profPt: "Doutorando em Astronomia",
    city: "Strasbourg",
    traits: [
      { fr: "Curieux", pt: "Curioso" },
      { fr: "Méthodique", pt: "Metódico" },
      { fr: "Rêveur", pt: "Sonhador" },
    ],
    interests: [
      { fr: "Exoplanètes", pt: "Exoplanetas" },
      { fr: "Télescopes", pt: "Telescópios" },
      { fr: "Science-fiction", pt: "Ficção científica" },
    ],
    complices: ["Léa", "Julien"],
    weeks: [3, 10],
    color: "#2b6cb0",
    quote: {
      fr: "Regarde les étoiles : chacune est une histoire.",
      pt: "Olhe as estrelas: cada uma é uma história.",
    },
    avatar: { skin: "#f0c8a0", hair: "#6b4a2f", hairStyle: "short", shirt: "#2b6cb0", accessory: "glasses" },
  },
  {
    id: "julien",
    name: "Julien Dubois",
    age: 30,
    profFr: "Ingénieur logiciel (IA)",
    profPt: "Engenheiro de software (IA)",
    city: "Paris",
    traits: [
      { fr: "Pragmatique", pt: "Pragmático" },
      { fr: "Créatif", pt: "Criativo" },
      { fr: "Sociable", pt: "Sociável" },
    ],
    interests: [
      { fr: "Machine learning", pt: "Aprendizado de máquina" },
      { fr: "Escalade", pt: "Escalada" },
      { fr: "Victor Hugo", pt: "Victor Hugo" },
    ],
    complices: ["Camille", "Thomas"],
    weeks: [1, 9],
    color: "#e4572e",
    quote: {
      fr: "Chaque problème est une aventure à résoudre.",
      pt: "Cada problema é uma aventura a resolver.",
    },
    avatar: { skin: "#e8b48a", hair: "#2f2a26", hairStyle: "short", shirt: "#e4572e", accessory: "beanie" },
  },
  {
    id: "marc",
    name: "Marc Lefèvre",
    age: 32,
    profFr: "Chef de cuisine",
    profPt: "Chef de cozinha",
    city: "Marseille",
    traits: [
      { fr: "Passionné", pt: "Apaixonado" },
      { fr: "Généreux", pt: "Generoso" },
      { fr: "Conteur", pt: "Contador de histórias" },
    ],
    interests: [
      { fr: "Gastronomie régionale", pt: "Gastronomia regional" },
      { fr: "Vins", pt: "Vinhos" },
      { fr: "Football (OM)", pt: "Futebol (OM)" },
    ],
    complices: ["Sophie", "Camille"],
    weeks: [5, 7],
    color: "#e8930c",
    quote: {
      fr: "La table est le meilleur endroit pour se rencontrer.",
      pt: "A mesa é o melhor lugar para se conhecer.",
    },
    avatar: { skin: "#d9a06b", hair: "#3d2e23", hairStyle: "short", shirt: "#e8930c", accessory: "mustache" },
  },
  {
    id: "lea",
    name: "Léa Martin",
    age: 27,
    profFr: "Chercheuse en astronomie",
    profPt: "Pesquisadora em Astronomia",
    city: "Strasbourg",
    traits: [
      { fr: "Brillante", pt: "Brilhante" },
      { fr: "Déterminée", pt: "Determinada" },
      { fr: "Rêveuse", pt: "Sonhadora" },
    ],
    interests: [
      { fr: "Astrophysique", pt: "Astrofísica" },
      { fr: "Photo nocturne", pt: "Fotografia noturna" },
      { fr: "Jules Verne", pt: "Jules Verne" },
    ],
    complices: ["Thomas", "Sophie"],
    weeks: [6, 10],
    color: "#8d4fa0",
    quote: {
      fr: "Le ciel n'a pas de limites, nous non plus.",
      pt: "O céu não tem limites — nós também não.",
    },
    avatar: { skin: "#f5d5b8", hair: "#241f1c", hairStyle: "bun", shirt: "#8d4fa0" },
  },
  {
    id: "camille",
    name: "Camille Rousseau",
    age: 29,
    profFr: "Historienne de l'art",
    profPt: "Historiadora da arte",
    city: "Paris · Le Marais",
    traits: [
      { fr: "Artistique", pt: "Artística" },
      { fr: "Indépendante", pt: "Independente" },
      { fr: "Observatrice", pt: "Observadora" },
    ],
    interests: [
      { fr: "Art moderne", pt: "Arte moderna" },
      { fr: "Architecture", pt: "Arquitetura" },
      { fr: "Cinéma classique", pt: "Cinema clássico" },
    ],
    complices: ["Julien", "Sophie"],
    weeks: [2, 11],
    color: "#0e8f8b",
    quote: {
      fr: "L'art nous apprend à voir la beauté partout.",
      pt: "A arte nos ensina a ver beleza em tudo.",
    },
    avatar: { skin: "#eec39a", hair: "#a8502f", hairStyle: "long", shirt: "#0e8f8b", accessory: "beret" },
  },
  {
    id: "sophie",
    name: "Sophie Garnier",
    age: 31,
    profFr: "Journaliste culturelle",
    profPt: "Jornalista cultural",
    city: "Lyon",
    traits: [
      { fr: "Extravertie", pt: "Extrovertida" },
      { fr: "Aventureuse", pt: "Aventureira" },
      { fr: "Curieuse", pt: "Curiosa" },
    ],
    interests: [
      { fr: "Cuisine régionale", pt: "Culinária regional" },
      { fr: "Politique culturelle", pt: "Política cultural" },
      { fr: "Albert Camus", pt: "Albert Camus" },
    ],
    complices: ["Marc", "Léa"],
    weeks: [4, 8],
    color: "#4a9c2f",
    quote: {
      fr: "Nous sommes libres, et c'est ce qui nous unit.",
      pt: "Somos livres — e é isso que nos une.",
    },
    avatar: { skin: "#f7dcc3", hair: "#e8c86a", hairStyle: "bob", shirt: "#4a9c2f" },
  },
];

export const CAST_MAP: Record<string, Character> = Object.fromEntries(
  CHARACTERS.map((c) => [c.id, c]),
);

/** Procura um personagem pelo primeiro nome (usado nos balões de diálogo). */
export function findChar(speaker?: string): Character | null {
  if (!speaker) return null;
  return CHARACTERS.find((c) => c.name.startsWith(speaker)) ?? null;
}

export function castForWeek(week: number): Character[] {
  return CHARACTERS.filter((c) => c.weeks.includes(week));
}

export function castFirstNames(week: number): string {
  return castForWeek(week)
    .map((c) => c.name.split(" ")[0])
    .join(" & ");
}
