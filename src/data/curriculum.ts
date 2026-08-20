import type { IconName } from "../components/Icons";

export type Vocab = { fr: string; pt: string; ipa: string };
export type DialogueLine = { who: "local" | "you"; fr: string; pt: string; speaker?: string };
export type QuizQ = { q: string; options: string[]; a: number; why: string };

export type Week = {
  id: string;
  num: number;
  title: string;
  place: string;
  city: string;
  region: string;
  theme: string;
  desc: string;
  tip: string;
  culture: string;
  /** Narrativa da semana com os companheiros de viagem (PT, com falas em FR). */
  story: string;
  /** Ids dos personagens do grupo Francophonia que aparecem na semana. */
  cast: string[];
  /** Temas centrais integrados (FR/PT). */
  themes: { fr: string; pt: string }[];
  x: number;
  y: number;
  color: string;
  icon: IconName;
  localName: string;
  localRole: string;
  vocab: Vocab[];
  dialogue: DialogueLine[];
  quiz: QuizQ[];
};

/** Idiomas do programa 90 dias · A1. Apenas "fr" está ativo por enquanto. */
export const LANGUAGES = [
  { code: "fr", name: "Francês", native: "Français", greeting: "Bonjour !", flag: "fr", available: true },
  { code: "de", name: "Alemão", native: "Deutsch", greeting: "Hallo!", flag: "de", available: false },
  { code: "es", name: "Espanhol", native: "Español", greeting: "¡Hola!", flag: "es", available: false },
  { code: "en", name: "Inglês", native: "English", greeting: "Hello!", flag: "gb", available: false },
  { code: "it", name: "Italiano", native: "Italiano", greeting: "Ciao!", flag: "it", available: false },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

export const WEEKS: Week[] = [
  {
    id: "cdg",
    num: 1,
    title: "Premier contact",
    place: "Aeroporto Charles de Gaulle",
    city: "Paris",
    region: "Île-de-France",
    theme: "Cumprimentos",
    desc: "O avião pousou em Paris — e Julien, um engenheiro de IA, está na fila do café para te dar as boas-vindas.",
    tip: "Na França, dizer «bonjour» ao entrar em qualquer loja não é opcional — é a regra de ouro.",
    culture: "A Torre Eiffel cresce até 15 cm no verão: o calor dilata o ferro da estrutura.",
    story:
      "O avião pousa em Paris e, na fila do café, você conhece Julien, um engenheiro que trabalha com IA. «Bienvenue !» — a viagem de 90 dias começa com um aperto de mão e uma promessa: «On explore la France ensemble, sans limites.»",
    cast: ["julien"],
    themes: [
      { fr: "Le voyage", pt: "A viagem" },
      { fr: "Jules Verne", pt: "Jules Verne" },
    ],
    x: 314,
    y: 152,
    color: "#d7263d",
    icon: "plane",
    localName: "Julien Dubois",
    localRole: "Engenheiro de software · Paris",
    vocab: [
      { fr: "Bonjour", pt: "Olá / Bom dia", ipa: "/bɔ̃ʒuʁ/" },
      { fr: "Merci", pt: "Obrigado(a)", ipa: "/mɛʁsi/" },
      { fr: "S'il vous plaît", pt: "Por favor", ipa: "/sil vu plɛ/" },
      { fr: "Oui", pt: "Sim", ipa: "/wi/" },
      { fr: "Au revoir", pt: "Até logo", ipa: "/o ʁəvwaʁ/" },
    ],
    dialogue: [
      { who: "local", speaker: "Julien", fr: "Bonjour ! Bienvenue à Paris. Je m'appelle Julien.", pt: "Olá! Bem-vindo(a) a Paris. Meu nome é Julien." },
      { who: "you", fr: "Bonjour Julien ! Merci beaucoup. Enchanté !", pt: "Olá, Julien! Muito obrigado(a). Prazer!" },
      { who: "local", speaker: "Julien", fr: "Je suis ingénieur, je travaille avec l'intelligence artificielle. Et vous ?", pt: "Sou engenheiro, trabalho com inteligência artificial. E você?" },
      { who: "you", fr: "Moi, j'apprends le français ! Au revoir… à bientôt !", pt: "Eu estou aprendendo francês! Tchau… até logo!" },
    ],
    quiz: [
      {
        q: "Como se diz “obrigado” em francês?",
        options: ["Merci", "Bonjour", "Oui", "Pardon"],
        a: 0,
        why: "«Merci» é a palavra mágica — com «beaucoup» vira “muito obrigado”.",
      },
      {
        q: "«S'il vous plaît» significa…",
        options: ["por favor", "bom dia", "até logo", "com licença"],
        a: 0,
        why: "É a forma educada de pedir — literalmente, “se lhe agrada”.",
      },
      {
        q: "Para se despedir, você diz:",
        options: ["Au revoir", "Bonjour", "Oui", "Merci"],
        a: 0,
        why: "«Au revoir» significa “até nos vermos de novo”.",
      },
    ],
  },
  {
    id: "saintgermain",
    num: 2,
    title: "Un café, s'il vous plaît",
    place: "Café de Saint-Germain",
    city: "Paris",
    region: "Île-de-France",
    theme: "No café",
    desc: "Mesas na calçada, um croissant e Camille, historiadora da arte, lendo Proust na mesa ao lado.",
    tip: "Peça «un café» e receberá um espresso. Para café com leite, diga «un café crème».",
    culture: "O croissant não nasceu na França, mas em Viena — vem do «kipferl» austríaco.",
    story:
      "No Café de Saint-Germain, Camille desenha num caderno enquanto espera você. Historiadora da arte, ela pede um croissant e sorri: «Proust avait sa madeleine, moi j'ai mon croissant.» A lição do dia chega junto com a conta.",
    cast: ["camille"],
    themes: [
      { fr: "Gastronomie", pt: "Gastronomia" },
      { fr: "Proust", pt: "Marcel Proust" },
    ],
    x: 282,
    y: 180,
    color: "#e4572e",
    icon: "coffee",
    localName: "Camille Rousseau",
    localRole: "Historiadora da arte · Le Marais",
    vocab: [
      { fr: "Un café", pt: "Um café", ipa: "/œ̃ kafe/" },
      { fr: "Un croissant", pt: "Um croissant", ipa: "/œ̃ kʁwasɑ̃/" },
      { fr: "L'addition", pt: "A conta", ipa: "/ladisjɔ̃/" },
      { fr: "Combien ?", pt: "Quanto?", ipa: "/kɔ̃bjɛ̃/" },
      { fr: "Délicieux", pt: "Delicioso", ipa: "/delisjø/" },
    ],
    dialogue: [
      { who: "local", speaker: "Camille", fr: "Salut ! Pour commander, on dit : « Un café et un croissant, s'il vous plaît. »", pt: "Oi! Para pedir, dizemos: «Um café e um croissant, por favor.»" },
      { who: "you", fr: "Un café et un croissant, s'il vous plaît !", pt: "Um café e um croissant, por favor!" },
      { who: "local", speaker: "Camille", fr: "Très bien ! Ça fait six euros. Le croissant est délicieux ici.", pt: "Muito bem! São seis euros. O croissant daqui é delicioso." },
      { who: "you", fr: "Merci ! L'addition, s'il vous plaît.", pt: "Obrigado(a)! A conta, por favor." },
    ],
    quiz: [
      {
        q: "«L'addition» é…",
        options: ["a conta", "o cardápio", "a gorjeta", "o café"],
        a: 0,
        why: "Quando terminar, peça «l'addition, s'il vous plaît».",
      },
      {
        q: "Para perguntar o preço, diga:",
        options: ["Combien ?", "Bonjour", "Merci", "Voilà"],
        a: 0,
        why: "«Combien ?» serve para qualquer quantidade — inclusive o preço.",
      },
      {
        q: "«Un croissant» é…",
        options: ["um croissant", "um pão", "um queijo", "um suco"],
        a: 0,
        why: "Algumas palavras o francês emprestou ao mundo inteiro — esta é uma delas.",
      },
    ],
  },
  {
    id: "louvre",
    num: 3,
    title: "Le grand musée",
    place: "Museu do Louvre",
    city: "Paris",
    region: "Île-de-France",
    theme: "Cultura e museu",
    desc: "A pirâmide de vidro guarda séculos de arte — e Thomas, de Strasbourg, enxerga constelações nos tetos pintados.",
    tip: "Dica de local: às quartas e sextas, o Louvre fica aberto até mais tarde, com filas menores.",
    culture: "O Louvre é o museu mais visitado do mundo — ver tudo levaria uns 200 dias!",
    story:
      "Thomas chegou de Strasbourg só para ver o Louvre. Doutorando em astronomia, ele aponta para um teto pintado: «Regarde — on dirait une constellation !» Entre arte e estrelas, a bilheteria vira sala de aula.",
    cast: ["thomas"],
    themes: [
      { fr: "Art", pt: "Arte" },
      { fr: "Histoire", pt: "História" },
    ],
    x: 306,
    y: 190,
    color: "#0e8f8b",
    icon: "museum",
    localName: "Thomas Moreau",
    localRole: "Doutorando em Astronomia · Strasbourg",
    vocab: [
      { fr: "Le musée", pt: "O museu", ipa: "/lə myze/" },
      { fr: "L'art", pt: "A arte", ipa: "/laʁ/" },
      { fr: "Le billet", pt: "O bilhete", ipa: "/lə bijɛ/" },
      { fr: "Magnifique", pt: "Magnífico", ipa: "/maɲifik/" },
      { fr: "L'histoire", pt: "A história", ipa: "/listwaʁ/" },
    ],
    dialogue: [
      { who: "local", speaker: "Thomas", fr: "Bonjour ! Un billet pour le musée ? Bonne idée. J'adore l'art… et les étoiles !", pt: "Olá! Um bilhete para o museu? Boa ideia. Eu adoro arte… e as estrelas!" },
      { who: "you", fr: "Un billet, s'il vous plaît. Magnifique, ce musée !", pt: "Um bilhete, por favor. Magnífico, este museu!" },
      { who: "local", speaker: "Thomas", fr: "Oui ! Regarde ce plafond : on dirait une constellation.", pt: "Sim! Olhe este teto: parece uma constelação." },
      { who: "you", fr: "C'est vrai ! L'art et l'histoire, c'est magnifique.", pt: "É verdade! A arte e a história são magníficas." },
    ],
    quiz: [
      {
        q: "«Le billet» significa…",
        options: ["o bilhete", "o livro", "a caneta", "o museu"],
        a: 0,
        why: "«Billet» serve para museu, metrô, trem e show.",
      },
      {
        q: "Para elogiar algo, diga «C'est…»",
        options: ["magnifique", "addition", "histoire", "café"],
        a: 0,
        why: "«C'est magnifique!» funciona para quase tudo na França — e os franceses adoram.",
      },
      {
        q: "Onde você pede «un billet»?",
        options: ["na bilheteria", "no café", "na praia", "no táxi"],
        a: 0,
        why: "Bilheteria = «la billetterie», a casa do «billet».",
      },
    ],
  },
  {
    id: "montsaintmichel",
    num: 4,
    title: "Où est l'abbaye ?",
    place: "Mont-Saint-Michel",
    city: "Mont-Saint-Michel",
    region: "Normandie",
    theme: "Direções",
    desc: "Uma abadia sobre a maré — e Sophie, jornalista em reportagem, perdida com o mapa na mão. Vocês se ajudam.",
    tip: "«Excusez-moi» antes de qualquer pergunta abre portas — e sorrisos — na França inteira.",
    culture: "A maré ao redor do Mont-Saint-Michel sobe “na velocidade de um cavalo a galope”.",
    story:
      "Sophie, jornalista em reportagem sobre o Mont-Saint-Michel, está perdida com o mapa na mão. Vocês decifram o caminho juntos — «tout droit, puis à gauche» — e ela anota tudo: «Quelle belle histoire pour mon article !»",
    cast: ["sophie"],
    themes: [
      { fr: "Histoire", pt: "História" },
      { fr: "Architecture", pt: "Arquitetura" },
    ],
    x: 162,
    y: 196,
    color: "#2b6cb0",
    icon: "compass",
    localName: "Sophie Garnier",
    localRole: "Jornalista cultural · Lyon",
    vocab: [
      { fr: "Où est… ?", pt: "Onde fica…?", ipa: "/u ɛ/" },
      { fr: "À gauche", pt: "À esquerda", ipa: "/a ɡoʃ/" },
      { fr: "À droite", pt: "À direita", ipa: "/a dʁwat/" },
      { fr: "Tout droit", pt: "Em frente", ipa: "/tu dʁwa/" },
      { fr: "La rue", pt: "A rua", ipa: "/la ʁy/" },
    ],
    dialogue: [
      { who: "local", speaker: "Sophie", fr: "Salut ! Je suis journaliste. Je cherche l'abbaye… et je suis perdue !", pt: "Oi! Sou jornalista. Estou procurando a abadia… e estou perdida!" },
      { who: "you", fr: "Attends… le plan dit : tout droit, puis à gauche.", pt: "Espera… o mapa diz: em frente, depois à esquerda." },
      { who: "local", speaker: "Sophie", fr: "C'est loin ? La première rue à droite ?", pt: "É longe? A primeira rua à direita?" },
      { who: "you", fr: "Non, c'est là ! Allons-y, Sophie !", pt: "Não, é ali! Vamos, Sophie!" },
    ],
    quiz: [
      {
        q: "«À gauche» é…",
        options: ["à esquerda", "à direita", "em frente", "atrás"],
        a: 0,
        why: "Gauche = esquerda, droite = direita. Uma letra muda tudo!",
      },
      {
        q: "«Tout droit» significa…",
        options: ["em frente", "vire", "pare", "suba"],
        a: 0,
        why: "Literalmente “todo reto” — siga em frente.",
      },
      {
        q: "Para perguntar onde algo fica:",
        options: ["Où est… ?", "Ça fait…", "Vous désirez…", "C'est combien"],
        a: 0,
        why: "«Où est la gare ?» — onde fica a estação? A fórmula vale para qualquer lugar.",
      },
    ],
  },
  {
    id: "avignon",
    num: 5,
    title: "Au marché provençal",
    place: "Mercado de Avignon",
    city: "Avignon",
    region: "Provence",
    theme: "Comida e feira",
    desc: "Barracas de queijo, pão quente e frutas do sul. Marc, chef de Marseille, escolhe cada palavra como um ingrediente.",
    tip: "Na feira, cumprimente o feirante antes de pedir: «Bonjour, je voudrais…» (eu gostaria…).",
    culture: "Existem mais de 1.200 tipos de queijo francês — um por dia durante três anos!",
    story:
      "Marc, chef de um bistrô no Vieux-Port de Marseille, escolhe queijos como quem escolhe palavras: com calma e paixão. «La table est le meilleur endroit pour se rencontrer», diz ele — e a feira vira a mesa mais comprida da Provence.",
    cast: ["marc"],
    themes: [
      { fr: "Gastronomie", pt: "Gastronomia" },
      { fr: "Terroir", pt: "Terra e tradição" },
    ],
    x: 398,
    y: 436,
    color: "#e8930c",
    icon: "market",
    localName: "Marc Lefèvre",
    localRole: "Chef de cuisine · Marseille",
    vocab: [
      { fr: "Le pain", pt: "O pão", ipa: "/lə pɛ̃/" },
      { fr: "Le fromage", pt: "O queijo", ipa: "/lə fʁɔmaʒ/" },
      { fr: "Les fruits", pt: "As frutas", ipa: "/le fʁɥi/" },
      { fr: "Le vin", pt: "O vinho", ipa: "/lə vɛ̃/" },
      { fr: "Frais", pt: "Fresco", ipa: "/fʁɛ/" },
    ],
    dialogue: [
      { who: "local", speaker: "Marc", fr: "Bonjour ! Goûtez ce fromage de Provence. Il est très frais !", pt: "Olá! Prove este queijo da Provence. É muito fresco!" },
      { who: "you", fr: "Mmm, délicieux ! Combien pour le pain, s'il vous plaît ?", pt: "Mmm, delicioso! Quanto pelo pão, por favor?" },
      { who: "local", speaker: "Marc", fr: "Deux euros. Et les fruits ? Une belle histoire, ces fruits du sud !", pt: "Dois euros. E as frutas? Uma bela história, essas frutas do sul!" },
      { who: "you", fr: "Du pain, des fruits… et un peu de vin aussi !", pt: "Pão, frutas… e um pouco de vinho também!" },
    ],
    quiz: [
      {
        q: "«Le fromage» é…",
        options: ["o queijo", "o pão", "o vinho", "o peixe"],
        a: 0,
        why: "Queijo é assunto sério na França — e «fromage» aparece em toda refeição.",
      },
      {
        q: "«Les fruits» significa…",
        options: ["as frutas", "as flores", "os legumes", "os doces"],
        a: 0,
        why: "«Les» é o plural — les fruits, les légumes, les gens.",
      },
      {
        q: "«Frais» descreve algo…",
        options: ["fresco", "quente", "caro", "doce"],
        a: 0,
        why: "«C'est frais !» — elogio máximo numa feira francesa.",
      },
    ],
  },
  {
    id: "nice",
    num: 6,
    title: "Il fait beau !",
    place: "Promenade des Anglais",
    city: "Nice",
    region: "Côte d'Azur",
    theme: "Clima e tempo",
    desc: "Sol, mar azul e Léa montando o telescópio na orla: «Ce soir, on regarde les étoiles.»",
    tip: "O clima se diz com «il fait»: il fait beau, il fait chaud, il fait froid. Simples assim.",
    culture: "A Promenade des Anglais tem 7 km à beira-mar e existe desde 1822.",
    story:
      "Léa montou o telescópio na Promenade des Anglais. Pesquisadora de astronomia em Strasbourg, ela confere o céu duas vezes por dia: uma pelo clima, outra pelas estrelas. «Le ciel n'a pas de limites, nous non plus.»",
    cast: ["lea"],
    themes: [
      { fr: "Astronomie", pt: "Astronomia" },
      { fr: "Le voyage", pt: "A viagem" },
    ],
    x: 498,
    y: 424,
    color: "#3a7ca5",
    icon: "sun",
    localName: "Léa Martin",
    localRole: "Pesquisadora em Astronomia · Strasbourg",
    vocab: [
      { fr: "Il fait beau", pt: "Está um tempo bonito", ipa: "/il fɛ bo/" },
      { fr: "Le soleil", pt: "O sol", ipa: "/lə sɔlɛj/" },
      { fr: "La mer", pt: "O mar", ipa: "/la mɛʁ/" },
      { fr: "Il pleut", pt: "Está chovendo", ipa: "/il plø/" },
      { fr: "Chaud", pt: "Quente", ipa: "/ʃo/" },
    ],
    dialogue: [
      { who: "local", speaker: "Léa", fr: "Il fait beau aujourd'hui ! Parfait pour les étoiles ce soir.", pt: "Está um dia lindo hoje! Perfeito para as estrelas hoje à noite." },
      { who: "you", fr: "Oui ! Le soleil, la mer… c'est parfait !", pt: "Sim! O sol, o mar… é perfeito!" },
      { who: "local", speaker: "Léa", fr: "Mais demain, il pleut peut-être. Le ciel change vite !", pt: "Mas amanhã talvez chova. O céu muda rápido!" },
      { who: "you", fr: "Oh non ! Il fait trop chaud pour rester à l'intérieur.", pt: "Ah não! Está quente demais para ficar dentro de casa." },
    ],
    quiz: [
      {
        q: "«Il pleut» significa…",
        options: ["está chovendo", "está nevando", "faz sol", "venta muito"],
        a: 0,
        why: "Vem do verbo «pleuvoir» — chover. Só existe na 3ª pessoa.",
      },
      {
        q: "«Le soleil» é…",
        options: ["o sol", "a lua", "a estrela", "o céu"],
        a: 0,
        why: "«Soleil» — a Côte d'Azur tem fama de vê-lo 300 dias por ano.",
      },
      {
        q: "Quando está calor, dizemos «il fait…»",
        options: ["chaud", "beau", "pleut", "mer"],
        a: 0,
        why: "«Il fait chaud» = está quente. «La mer» é o mar, não um clima!",
      },
    ],
  },
  {
    id: "lyon",
    num: 7,
    title: "Compter au bouchon",
    place: "Bouchon Lyonnais",
    city: "Lyon",
    region: "Auvergne-Rhône-Alpes",
    theme: "Números 1–20",
    desc: "Marc reaparece em Lyon — a capital da gastronomia — e apresenta você à mesa, ao menu e ao time do coração.",
    tip: "Números de 1 a 20 são a base de tudo: preços, idades, horas. Conte escadas para treinar!",
    culture: "Lyon é considerada a capital mundial da gastronomia — berço do «bouchon», restaurante típico.",
    story:
      "No bouchon de Lyon, Marc apresenta você ao garçom como «un ami». Entre uma mesa para três e um menu a vinte euros, ele confessa a outra paixão: «Et vive l'OM !» — o Olympique de Marseille, claro.",
    cast: ["marc"],
    themes: [
      { fr: "Gastronomie", pt: "Gastronomia" },
      { fr: "Football", pt: "Futebol" },
    ],
    x: 412,
    y: 330,
    color: "#9e2b25",
    icon: "utensils",
    localName: "Marc Lefèvre",
    localRole: "Chef de cuisine · Marseille",
    vocab: [
      { fr: "Un", pt: "Um", ipa: "/œ̃/" },
      { fr: "Deux", pt: "Dois", ipa: "/dø/" },
      { fr: "Trois", pt: "Três", ipa: "/tʁwa/" },
      { fr: "Dix", pt: "Dez", ipa: "/dis/" },
      { fr: "Vingt", pt: "Vinte", ipa: "/vɛ̃/" },
    ],
    dialogue: [
      { who: "local", speaker: "Marc", fr: "Bienvenue à Lyon ! Une table pour deux ? Ah, et vive l'OM !", pt: "Bem-vindo a Lyon! Mesa para dois? Ah, e viva o OM!" },
      { who: "you", fr: "Non, une table pour trois personnes, s'il vous plaît.", pt: "Não, uma mesa para três pessoas, por favor." },
      { who: "local", speaker: "Marc", fr: "Le menu est à vingt euros. Un, deux, trois… parfait !", pt: "O menu custa vinte euros. Um, dois, três… perfeito!" },
      { who: "you", fr: "Dix sur dix pour la cuisine lyonnaise !", pt: "Nota dez para a cozinha lionesa!" },
    ],
    quiz: [
      {
        q: "«Trois» é o número…",
        options: ["3", "2", "10", "20"],
        a: 0,
        why: "Un, deux, trois — o pódio de qualquer contagem.",
      },
      {
        q: "«Vingt» vale…",
        options: ["20", "12", "10", "2"],
        a: 0,
        why: "Vinte! E o «t» final costuma ser silencioso.",
      },
      {
        q: "«Une table pour deux» — mesa para quantas pessoas?",
        options: ["duas", "três", "dez", "vinte"],
        a: 0,
        why: "«Pour deux» = para dois. O três da conversa era outra mesa!",
      },
    ],
  },
  {
    id: "bordeaux",
    num: 8,
    title: "Ma famille, mes racines",
    place: "Vinícola de família",
    city: "Bordeaux",
    region: "Nouvelle-Aquitaine",
    theme: "Família",
    desc: "Sophie escreve uma matéria sobre os vinhos de Bordeaux e leva você para conhecer a família do vinhedo.",
    tip: "«Mon/ma» = meu/minha: mon père, ma mère. O possessivo concorda com a palavra, não com você.",
    culture: "Bordeaux tem mais de 120 mil hectares de vinhedos — a maior região de vinhos finos do mundo.",
    story:
      "Sophie escreve uma matéria sobre os vinhos de Bordeaux e leva você à vinícola da família que virou sua «famille d'adoption». Entre uvas e histórias, o vocabulário de família se mistura ao futuro que se conjuga em francês.",
    cast: ["sophie"],
    themes: [
      { fr: "Culture", pt: "Cultura" },
      { fr: "Gastronomie", pt: "Gastronomia" },
    ],
    x: 228,
    y: 428,
    color: "#7b2d43",
    icon: "tree",
    localName: "Sophie Garnier",
    localRole: "Jornalista cultural · Lyon",
    vocab: [
      { fr: "La mère", pt: "A mãe", ipa: "/la mɛʁ/" },
      { fr: "Le père", pt: "O pai", ipa: "/lə pɛʁ/" },
      { fr: "Le frère", pt: "O irmão", ipa: "/lə fʁɛʁ/" },
      { fr: "La sœur", pt: "A irmã", ipa: "/la sœʁ/" },
      { fr: "Les grands-parents", pt: "Os avós", ipa: "/le ɡʁɑ̃paʁɑ̃/" },
    ],
    dialogue: [
      { who: "local", speaker: "Sophie", fr: "Voici ma famille d'adoption : le père, la mère et la sœur du vigneron.", pt: "Esta é minha família do coração: o pai, a mãe e a irmã do vinicultor." },
      { who: "you", fr: "Enchanté ! Et le frère, il est où ?", pt: "Prazer! E o irmão, onde está?" },
      { who: "local", speaker: "Sophie", fr: "Il est avec les grands-parents, dans les vignes. Magnifique pour mon article !", pt: "Está com os avós, nas vinhas. Magnífico para a minha matéria!" },
      { who: "you", fr: "Quelle belle famille !", pt: "Que família linda!" },
    ],
    quiz: [
      {
        q: "«La sœur» é…",
        options: ["a irmã", "a mãe", "a tia", "a avó"],
        a: 0,
        why: "«Sœur» — o «œ» é um som arredondado, típico do francês.",
      },
      {
        q: "«Les grands-parents» são…",
        options: ["os avós", "os pais", "os tios", "os primos"],
        a: 0,
        why: "Literalmente, os “grandes pais” — os avós.",
      },
      {
        q: "«Mon frère» significa…",
        options: ["meu irmão", "meu pai", "meu filho", "meu amigo"],
        a: 0,
        why: "«Mon» acompanha palavras masculinas: mon frère, mon père.",
      },
    ],
  },
  {
    id: "chamonix",
    num: 9,
    title: "Une journée à la montagne",
    place: "Chamonix-Mont-Blanc",
    city: "Chamonix",
    region: "Alpes",
    theme: "Rotina e tempo",
    desc: "Julien trocou o código pela rocha: escalada de manhã, trilha à tarde — e a rotina alpina vira vocabulário.",
    tip: "«Toujours» (sempre) e «jamais» (nunca) moram no meio da frase: «je dis jamais non».",
    culture: "O Mont Blanc, vizinho de Chamonix, tem 4.808 m — o teto da Europa Ocidental.",
    story:
      "Julien trocou o código pela rocha: fim de semana de escalada em Chamonix. «Le matin, je grimpe ; le soir, je code.» Entre uma trilha e outra, ele mostra o app que treinou com machine learning para prever o tempo na montanha.",
    cast: ["julien"],
    themes: [
      { fr: "Sport", pt: "Esporte" },
      { fr: "Technologie", pt: "Tecnologia" },
    ],
    x: 500,
    y: 312,
    color: "#3f6f5f",
    icon: "mountain",
    localName: "Julien Dubois",
    localRole: "Engenheiro de software · Paris",
    vocab: [
      { fr: "Le matin", pt: "De manhã", ipa: "/lə matɛ̃/" },
      { fr: "Le soir", pt: "À noite / de tarde", ipa: "/lə swaʁ/" },
      { fr: "Aujourd'hui", pt: "Hoje", ipa: "/oʒuʁdɥi/" },
      { fr: "Toujours", pt: "Sempre", ipa: "/tuʒuʁ/" },
      { fr: "Jamais", pt: "Nunca", ipa: "/ʒamɛ/" },
    ],
    dialogue: [
      { who: "local", speaker: "Julien", fr: "Le matin, je fais de l'escalade. Le soir, je code. Et aujourd'hui ? La montagne !", pt: "De manhã eu escalo. À noite, programo. E hoje? A montanha!" },
      { who: "you", fr: "Et demain, que faites-vous ?", pt: "E amanhã, o que você faz?" },
      { who: "local", speaker: "Julien", fr: "Toujours la même chose : la montagne ! Jamais de repos.", pt: "Sempre a mesma coisa: a montanha! Nunca descanso." },
      { who: "you", fr: "Moi, je ne dis jamais non à une randonnée !", pt: "Eu nunca digo não a uma trilha!" },
    ],
    quiz: [
      {
        q: "«Aujourd'hui» significa…",
        options: ["hoje", "ontem", "amanhã", "sempre"],
        a: 0,
        why: "Hoje! Vem de «au jour d'hui» — “no dia de hoje”.",
      },
      {
        q: "«Jamais» é…",
        options: ["nunca", "sempre", "hoje", "talvez"],
        a: 0,
        why: "«Je ne sais jamais» — eu nunca sei. Cuidado para não trocar com «toujours».",
      },
      {
        q: "«Le soir» indica…",
        options: ["a parte da noite", "a manhã", "o meio-dia", "a madrugada"],
        a: 0,
        why: "«Le soir» cobre o fim de tarde e a noite — «bonsoir!»",
      },
    ],
  },
  {
    id: "strasbourg",
    num: 10,
    title: "Hier, c'était…",
    place: "Catedral de Strasbourg",
    city: "Strasbourg",
    region: "Grand Est",
    theme: "Passado (passé composé)",
    desc: "Thomas e Léa se revezam entre o observatório e a catedral — e o passado se conjuga entre amigos.",
    tip: "Passé composé: «avoir» + particípio. J'ai mangé, j'ai visité… e voilà, o passado!",
    culture: "O relógio astronômico de Strasbourg, de 1842, ainda funciona — e tem um galo que canta ao meio-dia.",
    story:
      "Em Strasbourg, Thomas e Léa trabalham no observatório e se revezam para te mostrar a catedral. Ontem, hoje, amanhã — o tempo se conjuga entre amigos. «Nous rêvons d'un futur sans limites», diz Léa, apontando o telescópio para o alto.",
    cast: ["thomas", "lea"],
    themes: [
      { fr: "Astronomie", pt: "Astronomia" },
      { fr: "Histoire", pt: "História" },
    ],
    x: 482,
    y: 100,
    color: "#5d5ea6",
    icon: "globe",
    localName: "Thomas & Léa",
    localRole: "Pesquisadores · Strasbourg",
    vocab: [
      { fr: "Hier", pt: "Ontem", ipa: "/jɛʁ/" },
      { fr: "J'ai mangé", pt: "Eu comi", ipa: "/ʒe mɑ̃ʒe/" },
      { fr: "J'ai visité", pt: "Eu visitei", ipa: "/ʒe vizite/" },
      { fr: "C'était", pt: "Era / foi", ipa: "/setɛ/" },
      { fr: "La semaine dernière", pt: "A semana passada", ipa: "/la səmɛn dɛʁnjɛʁ/" },
    ],
    dialogue: [
      { who: "local", speaker: "Thomas", fr: "Hier, j'ai visité la cathédrale avec Léa. C'était magnifique !", pt: "Ontem visitei a catedral com a Léa. Foi magnífico!" },
      { who: "local", speaker: "Léa", fr: "Et moi, j'ai observé une supernova. Quelle semaine !", pt: "E eu observei uma supernova. Que semana!" },
      { who: "you", fr: "La semaine dernière, j'ai mangé une choucroute délicieuse.", pt: "Semana passada, comi um chucrute delicioso." },
      { who: "local", speaker: "Thomas", fr: "Ah, c'était le meilleur choix ! Strasbourg, c'est l'histoire et les étoiles.", pt: "Ah, foi a melhor escolha! Strasbourg é história e estrelas." },
    ],
    quiz: [
      {
        q: "«Hier» significa…",
        options: ["ontem", "hoje", "amanhã", "agora"],
        a: 0,
        why: "Ontem! Não confunda com o inglês «here» — é só coincidência de letras.",
      },
      {
        q: "«J'ai mangé» é…",
        options: ["eu comi", "eu visitei", "eu fui", "eu vi"],
        a: 0,
        why: "«J'ai» + «mangé» (particípio de manger, comer).",
      },
      {
        q: "«C'était» indica algo…",
        options: ["que era / que foi", "que será", "que é agora", "que seria"],
        a: 0,
        why: "Imperfeito de «être»: descreve como as coisas eram no passado.",
      },
    ],
  },
  {
    id: "versailles",
    num: 11,
    title: "Demain, je vais…",
    place: "Palácio de Versalhes",
    city: "Versailles",
    region: "Île-de-France",
    theme: "Futuro e planos",
    desc: "Camille pinta nos jardins do Rei Sol e te ensina a conjugar o futuro — «demain, je vais…»",
    tip: "Futuro próximo: verbo «aller» + infinitivo. Je vais manger, tu vas dormir — simples assim.",
    culture: "Versalhes tem 2.300 salas e serviu de modelo para palácios em toda a Europa.",
    story:
      "Camille finalmente tira você de Paris: Versalhes. Ela monta o cavalete nos jardins e fala de arte como quem fala do futuro — com leveza. «La semaine prochaine, je pars à Rome.» O adeus já está conjugado, mas ninguém pressiona ninguém.",
    cast: ["camille"],
    themes: [
      { fr: "Art", pt: "Arte" },
      { fr: "Histoire", pt: "História" },
    ],
    x: 268,
    y: 210,
    color: "#946b2d",
    icon: "star",
    localName: "Camille Rousseau",
    localRole: "Historiadora da arte · Le Marais",
    vocab: [
      { fr: "Demain", pt: "Amanhã", ipa: "/dəmɛ̃/" },
      { fr: "Je vais", pt: "Eu vou", ipa: "/ʒə vɛ/" },
      { fr: "Bientôt", pt: "Em breve", ipa: "/bjɛ̃to/" },
      { fr: "La semaine prochaine", pt: "A próxima semana", ipa: "/la səmɛn pʁɔʃɛn/" },
      { fr: "Peut-être", pt: "Talvez", ipa: "/pøtɛtʁ/" },
    ],
    dialogue: [
      { who: "local", speaker: "Camille", fr: "Demain, je vais peindre dans les jardins de Versailles. Tu viens ?", pt: "Amanhã vou pintar nos jardins de Versalhes. Você vem?" },
      { who: "you", fr: "Oui ! Demain, je vais visiter le château. Peut-être les jardins aussi.", pt: "Sim! Amanhã vou visitar o palácio. Talvez os jardins também." },
      { who: "local", speaker: "Camille", fr: "La semaine prochaine, je pars à Rome. Mais l'art, bientôt !", pt: "Semana que vem parto para Roma. Mas a arte, em breve!" },
      { who: "you", fr: "Alors, à bientôt ! Revenez vite !", pt: "Então, até breve! Volte logo!" },
    ],
    quiz: [
      {
        q: "«Demain» é…",
        options: ["amanhã", "ontem", "hoje", "depois"],
        a: 0,
        why: "«À demain!» — até amanhã! A despedida mais esperançosa do idioma.",
      },
      {
        q: "«Peut-être» expressa…",
        options: ["talvez", "certeza", "nunca", "sempre"],
        a: 0,
        why: "Literalmente “pode ser” — o jeitinho francês de não prometer nada.",
      },
      {
        q: "«Je vais visiter» indica…",
        options: ["um plano futuro", "uma lembrança", "uma ordem", "um desejo impossível"],
        a: 0,
        why: "«Aller» + verbo no infinitivo = futuro próximo. Eu vou visitar.",
      },
    ],
  },
  {
    id: "ajaccio",
    num: 12,
    title: "Au revoir, la France !",
    place: "Porto de Ajaccio",
    city: "Ajaccio",
    region: "Corse",
    theme: "Despedida",
    desc: "No porto de Ajaccio, os seis esperam você para o último café. «Pas de jalousie, juste la liberté d'être ensemble.»",
    tip: "«Bonne journée» se diz na despedida; «bonjour», na chegada. Papéis trocados, mesmo «jour».",
    culture: "Napoleão Bonaparte nasceu em Ajaccio em 1769 — a casa dele hoje é museu.",
    story:
      "No porto de Ajaccio, os seis esperam você para o último café: Julien, Camille, Thomas, Léa, Marc e Sophie. Ninguém dramatiza a despedida — «pas de jalousie, juste la liberté d'être ensemble». Até a próxima rota.",
    cast: ["julien", "camille", "thomas", "lea", "marc", "sophie"],
    themes: [
      { fr: "Amitié", pt: "Amizade" },
      { fr: "Le voyage", pt: "A viagem" },
    ],
    x: 556,
    y: 552,
    color: "#2f8f6b",
    icon: "wave",
    localName: "Les six amis",
    localRole: "Seus companheiros de viagem",
    vocab: [
      { fr: "À bientôt", pt: "Até breve", ipa: "/a bjɛ̃to/" },
      { fr: "Bonne journée", pt: "Tenha um bom dia", ipa: "/bɔn ʒuʁne/" },
      { fr: "Merci pour tout", pt: "Obrigado por tudo", ipa: "/mɛʁsi puʁ tu/" },
      { fr: "La France", pt: "A França", ipa: "/la fʁɑ̃s/" },
      { fr: "À la prochaine", pt: "Até a próxima", ipa: "/a la pʁɔʃɛn/" },
    ],
    dialogue: [
      { who: "local", speaker: "Julien", fr: "Déjà ? Tu pars demain ?", pt: "Já? Você parte amanhã?" },
      { who: "local", speaker: "Léa", fr: "Merci pour tout ! Regarde les étoiles, pense à nous.", pt: "Obrigada por tudo! Olhe as estrelas, pense na gente." },
      { who: "you", fr: "Merci pour tout, mes amis. La France me manquera !", pt: "Obrigado(a) por tudo, meus amigos. Vou sentir falta da França!" },
      { who: "local", speaker: "Tous", fr: "Bonne journée, et à la prochaine ! Pas de jalousie, juste la liberté d'être ensemble !", pt: "Tenha um bom dia, e até a próxima! Sem ciúmes, só a liberdade de estar junto!" },
    ],
    quiz: [
      {
        q: "«À bientôt» é…",
        options: ["até breve", "bom dia", "por favor", "obrigado"],
        a: 0,
        why: "A despedida que deixa a porta aberta para o próximo «bonjour».",
      },
      {
        q: "Para desejar um bom dia ao se despedir:",
        options: ["Bonne journée", "Bonsoir", "Bon appétit", "Bonne nuit"],
        a: 0,
        why: "«Bonne journée» foca no dia que a pessoa ainda vai viver.",
      },
      {
        q: "«Merci pour tout» significa…",
        options: ["obrigado por tudo", "até a próxima", "boa viagem", "com prazer"],
        a: 0,
        why: "O agradecimento que resume 90 dias de jornada.",
      },
    ],
  },
];
