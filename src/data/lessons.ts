import type { IconName } from "../components/Icons";

export type Vocab = { en: string; pt: string; ipa: string };
export type DialogueLine = { who: "local" | "you"; en: string; pt: string };
export type QuizQ = { q: string; options: string[]; a: number; why: string };

export type Location = {
  id: string;
  num: number;
  namePt: string;
  nameEn: string;
  theme: string;
  desc: string;
  tip: string;
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

export const XP_PER_QUESTION = 25;
export const PERFECT_BONUS = 50;
export const XP_PER_LEVEL = 200;

export const levelFromXp = (xp: number) => Math.floor(xp / XP_PER_LEVEL) + 1;
export const xpIntoLevel = (xp: number) => xp % XP_PER_LEVEL;

export const LOCATIONS: Location[] = [
  {
    id: "heathrow",
    num: 1,
    namePt: "Aeroporto de Heathrow",
    nameEn: "Heathrow",
    theme: "Cumprimentos e chegada",
    desc: "O avião pousou. Suas primeiras palavras em inglês são com a oficial de imigração.",
    tip: "Um sorriso e um 'Good morning' abrem qualquer porta — até a da imigração.",
    x: 85,
    y: 470,
    color: "#d7263d",
    icon: "plane",
    localName: "Oficial Pearce",
    localRole: "Imigração",
    vocab: [
      { en: "Hello", pt: "Olá", ipa: "/həˈləʊ/" },
      { en: "Welcome", pt: "Bem-vindo(a)", ipa: "/ˈwelkəm/" },
      { en: "Passport", pt: "Passaporte", ipa: "/ˈpɑːspɔːt/" },
      { en: "Luggage", pt: "Bagagem", ipa: "/ˈlʌɡɪdʒ/" },
      { en: "Purpose", pt: "Motivo, propósito", ipa: "/ˈpɜːpəs/" },
    ],
    dialogue: [
      { who: "local", en: "Good morning! Passport, please.", pt: "Bom dia! Passaporte, por favor." },
      { who: "you", en: "Good morning! Here you go.", pt: "Bom dia! Aqui está." },
      { who: "local", en: "What is the purpose of your visit?", pt: "Qual é o motivo da sua visita?" },
      { who: "you", en: "I'm here to study English.", pt: "Estou aqui para estudar inglês." },
      { who: "local", en: "Welcome to London. Enjoy your stay!", pt: "Bem-vindo a Londres. Aproveite a estadia!" },
      { who: "you", en: "Thank you very much!", pt: "Muito obrigado!" },
    ],
    quiz: [
      {
        q: "Como você diz “Bom dia” em inglês?",
        options: ["Good night", "Good morning", "Goodbye", "Good luck"],
        a: 1,
        why: "'Good morning' é a saudação da manhã. 'Good night' só é usado para se despedir à noite.",
      },
      {
        q: "O que a oficial pediu: “Passport, please”?",
        options: ["A passagem aérea", "O passaporte", "A mala", "O visto"],
        a: 1,
        why: "'Passport' é o documento que você entrega na imigração.",
      },
      {
        q: "Complete: “Nice ___ meet you.”",
        options: ["for", "to", "at", "in"],
        a: 1,
        why: "A expressão fixa é 'Nice to meet you' — prazer em conhecer você.",
      },
    ],
  },
  {
    id: "kingscross",
    num: 2,
    namePt: "Estação King's Cross",
    nameEn: "King's Cross",
    theme: "Pedindo direções",
    desc: "Plataforma 9¾? Quase. Aprenda a se orientar na estação mais movimentada da cidade.",
    tip: "'Excuse me' antes de qualquer pergunta é a chave da educação britânica.",
    x: 585,
    y: 120,
    color: "#2b6cb0",
    icon: "train",
    localName: "Sr. Barnes",
    localRole: "Funcionário da estação",
    vocab: [
      { en: "Directions", pt: "Direções, indicações", ipa: "/dɪˈrekʃənz/" },
      { en: "Platform", pt: "Plataforma", ipa: "/ˈplɔːtfɔːm/" },
      { en: "Ticket", pt: "Bilhete, passagem", ipa: "/ˈtɪkɪt/" },
      { en: "Straight ahead", pt: "Em frente", ipa: "/streɪt əˈhed/" },
      { en: "Around the corner", pt: "Logo ali, na esquina", ipa: "/əˈraʊnd ðə ˈkɔːnə/" },
    ],
    dialogue: [
      { who: "you", en: "Excuse me, where is platform nine?", pt: "Com licença, onde fica a plataforma nove?" },
      { who: "local", en: "Go straight ahead and turn left.", pt: "Siga em frente e vire à esquerda." },
      { who: "you", en: "Is it far from here?", pt: "Fica longe daqui?" },
      { who: "local", en: "No, it's just around the corner.", pt: "Não, é logo ali na esquina." },
      { who: "you", en: "Thank you very much!", pt: "Muito obrigado!" },
      { who: "local", en: "You're welcome. Mind the gap!", pt: "De nada. Cuidado com o vão!" },
    ],
    quiz: [
      {
        q: "O que significa “turn left”?",
        options: ["Vire à direita", "Siga em frente", "Vire à esquerda", "Volte"],
        a: 2,
        why: "'Left' = esquerda. 'Right' seria direita.",
      },
      {
        q: "“Just around the corner” quer dizer que o lugar está…",
        options: ["muito longe", "logo na esquina", "fechado", "no subsolo"],
        a: 1,
        why: "É uma forma comum de dizer que algo está pertinho, virando a esquina.",
      },
      {
        q: "Complete: “Excuse ___, where is the station?”",
        options: ["me", "I", "my", "mine"],
        a: 0,
        why: "A expressão fixa é 'Excuse me' — com licença.",
      },
    ],
  },
  {
    id: "soho",
    num: 3,
    namePt: "Café em Soho",
    nameEn: "Soho",
    theme: "Pedindo um café",
    desc: "Cheiro de grãos torrados no ar. Hora de fazer seu primeiro pedido como um local.",
    tip: "'Can I have…?' + 'please' + sorriso: a fórmula mágica de qualquer café.",
    x: 455,
    y: 300,
    color: "#e4572e",
    icon: "coffee",
    localName: "Mia",
    localRole: "Barista",
    vocab: [
      { en: "Order", pt: "Pedido", ipa: "/ˈɔːdə/" },
      { en: "Flat white", pt: "Café com leite cremoso", ipa: "/flæt waɪt/" },
      { en: "Sugar", pt: "Açúcar", ipa: "/ˈʃʊɡə/" },
      { en: "Bill", pt: "Conta", ipa: "/bɪl/" },
      { en: "Takeaway", pt: "Para viagem", ipa: "/ˈteɪkəweɪ/" },
    ],
    dialogue: [
      { who: "local", en: "Hi there! What can I get you?", pt: "Oi! O que vai querer?" },
      { who: "you", en: "Can I have a flat white, please?", pt: "Pode me ver um flat white, por favor?" },
      { who: "local", en: "Sure! Anything to eat with that?", pt: "Claro! Algo para comer?" },
      { who: "you", en: "Yes, a croissant, please. How much is it?", pt: "Sim, um croissant, por favor. Quanto é?" },
      { who: "local", en: "That's six pounds fifty.", pt: "São seis libras e cinquenta." },
      { who: "you", en: "Here you are. Keep the change!", pt: "Aqui está. Fique com o troco!" },
    ],
    quiz: [
      {
        q: "Qual é o jeito educado de pedir? “___ I have a coffee, please?”",
        options: ["Do", "Can", "Am", "Have"],
        a: 1,
        why: "'Can I have…?' (ou 'Could I have…?') é o padrão para pedir qualquer coisa.",
      },
      {
        q: "Quando você pergunta “How much is it?”, quer saber…",
        options: ["o tamanho", "o preço", "o sabor", "a fila"],
        a: 1,
        why: "'How much' pergunta quantidade — e, em compras, sempre significa o preço.",
      },
      {
        q: "O que significa “Keep the change”?",
        options: ["Guarde a nota", "Fique com o troco", "Troque o pedido", "Volte sempre"],
        a: 1,
        why: "Você diz isso ao dar uma gorjeta: a pessoa fica com o troco.",
      },
    ],
  },
  {
    id: "museum",
    num: 4,
    namePt: "Museu Britânico",
    nameEn: "British Museum",
    theme: "Histórias no passado",
    desc: "Entre múmias e mármores milenares, o passado simples entra em cena.",
    tip: "was/were = era/estava. Pergunte 'Where was it found?' e ouça histórias.",
    x: 540,
    y: 230,
    color: "#0e8f8b",
    icon: "museum",
    localName: "Dra. Adeyemi",
    localRole: "Guia do museu",
    vocab: [
      { en: "Ancient", pt: "Antigo, milenar", ipa: "/ˈeɪnʃənt/" },
      { en: "Exhibit", pt: "Peça em exposição", ipa: "/ɪɡˈzɪbɪt/" },
      { en: "Discovered", pt: "Descoberto", ipa: "/dɪˈskʌvəd/" },
      { en: "Ago", pt: "Atrás (no tempo)", ipa: "/əˈɡəʊ/" },
      { en: "Flash", pt: "Flash da câmera", ipa: "/flæʃ/" },
    ],
    dialogue: [
      { who: "local", en: "This statue is over two thousand years old.", pt: "Esta estátua tem mais de dois mil anos." },
      { who: "you", en: "Wow! Where was it found?", pt: "Uau! Onde ela foi encontrada?" },
      { who: "local", en: "It was discovered in Egypt, many years ago.", pt: "Foi descoberta no Egito, muitos anos atrás." },
      { who: "you", en: "That's amazing. Can I take photos?", pt: "Incrível. Posso tirar fotos?" },
      { who: "local", en: "Yes, but please don't use the flash.", pt: "Sim, mas por favor não use o flash." },
      { who: "you", en: "Of course. Thank you!", pt: "Claro. Obrigado!" },
    ],
    quiz: [
      {
        q: "Qual é o passado do verbo “is”?",
        options: ["were", "was", "been", "being"],
        a: 1,
        why: "'Is' vira 'was' no passado (para he/she/it). 'Were' vale para you/we/they.",
      },
      {
        q: "Complete: “It ___ discovered in Egypt.”",
        options: ["is", "were", "was", "are"],
        a: 2,
        why: "'It was discovered' — voz passiva no passado: foi descoberta.",
      },
      {
        q: "O que a guia pediu no final?",
        options: ["Não tirar fotos", "Não usar o flash", "Sair da sala", "Comprar um bilhete"],
        a: 1,
        why: "'Don't use the flash' — fotos podem, mas sem flash para proteger as peças.",
      },
    ],
  },
  {
    id: "hydepark",
    num: 5,
    namePt: "Hyde Park",
    nameEn: "Hyde Park",
    theme: "Clima e conversa fiada",
    desc: "Um banco ao sol, um senhor simpático — e o clássico papo britânico sobre o tempo.",
    tip: "Falar do clima não é clichê: é o esporte nacional britânico. Entre no jogo!",
    x: 300,
    y: 340,
    color: "#4a9c2f",
    icon: "tree",
    localName: "Sr. Whitfield",
    localRole: "Morador local",
    vocab: [
      { en: "Weather", pt: "Clima, tempo", ipa: "/ˈweðə/" },
      { en: "Sunny", pt: "Ensolarado", ipa: "/ˈsʌni/" },
      { en: "Forecast", pt: "Previsão do tempo", ipa: "/ˈfɔːkɑːst/" },
      { en: "Umbrella", pt: "Guarda-chuva", ipa: "/ʌmˈbrelə/" },
      { en: "Lovely", pt: "Adorável", ipa: "/ˈlʌvli/" },
    ],
    dialogue: [
      { who: "local", en: "Lovely day, isn't it?", pt: "Dia lindo, não é?" },
      { who: "you", en: "Yes! The sun is shining and it's warm.", pt: "Sim! O sol está brilhando e está quentinho." },
      { who: "local", en: "But the forecast says rain for tomorrow.", pt: "Mas a previsão diz chuva para amanhã." },
      { who: "you", en: "Really? I should buy an umbrella then.", pt: "Sério? Então eu deveria comprar um guarda-chuva." },
      { who: "local", en: "Good idea. British weather is unpredictable!", pt: "Boa ideia. O clima britânico é imprevisível!" },
      { who: "you", en: "Ha! I'm already learning that.", pt: "Ha! Isso eu já estou aprendendo." },
    ],
    quiz: [
      {
        q: "“Lovely day, isn't it?” é uma frase típica para…",
        options: [
          "reclamar do trabalho",
          "puxar conversa sobre o clima",
          "pedir informação",
          "fazer uma compra",
        ],
        a: 1,
        why: "É o clássico 'small talk' britânico: comentar o tempo para começar uma conversa.",
      },
      {
        q: "O que é o “forecast”?",
        options: ["A floresta", "A previsão do tempo", "O castelo", "O feriado"],
        a: 1,
        why: "'Weather forecast' = previsão do tempo. Não confunda com 'forest' (floresta)!",
      },
      {
        q: "Complete: “What's the weather ___ today?”",
        options: ["like", "likes", "alike", "likely"],
        a: 0,
        why: "'What's the weather like?' pergunta como está o tempo. O 'like' aqui não é 'gostar'.",
      },
    ],
  },
  {
    id: "borough",
    num: 6,
    namePt: "Borough Market",
    nameEn: "Borough Market",
    theme: "Comidas e preços",
    desc: "Queijos, pães e frutas frescas. Entenda os números e negocie como um londrino.",
    tip: "Números são música: 'two for fifteen' soa melhor quando você treina em voz alta.",
    x: 600,
    y: 430,
    color: "#e8930c",
    icon: "market",
    localName: "Jack",
    localRole: "Feirante",
    vocab: [
      { en: "Fresh", pt: "Fresco", ipa: "/freʃ/" },
      { en: "Cheese", pt: "Queijo", ipa: "/tʃiːz/" },
      { en: "Bread", pt: "Pão", ipa: "/bred/" },
      { en: "Pound", pt: "Libra (moeda)", ipa: "/paʊnd/" },
      { en: "Delicious", pt: "Delicioso", ipa: "/dɪˈlɪʃəs/" },
    ],
    dialogue: [
      { who: "local", en: "Morning! Would you like to try some cheese?", pt: "Bom dia! Quer provar um queijo?" },
      { who: "you", en: "Yes, please. How much is a pound of it?", pt: "Sim, por favor. Quanto custa meio quilo?" },
      { who: "local", en: "It's eight pounds, or two for fifteen.", pt: "São oito libras, ou dois por quinze." },
      { who: "you", en: "Great! I'll take two. It smells delicious.", pt: "Ótimo! Vou levar dois. Está com um cheiro delicioso." },
      { who: "local", en: "There you go. Anything else today?", pt: "Aqui está. Mais alguma coisa?" },
      { who: "you", en: "That's all, thanks. Have a good one!", pt: "É só, obrigado. Tenha um bom dia!" },
    ],
    quiz: [
      {
        q: "“Two for fifteen” significa…",
        options: [
          "dois por quinze libras (promoção)",
          "quinze para as duas",
          "duas libras e quinze",
          "fila dos quinze",
        ],
        a: 0,
        why: "Oferta clássica de feira: leve duas unidades por quinze libras.",
      },
      {
        q: "Quando você diz “I'll take two”, está…",
        options: ["devolvendo o produto", "levando dois", "pedindo desconto", "indo embora"],
        a: 1,
        why: "'I'll take…' é a forma natural de fechar uma compra: 'vou levar'.",
      },
      {
        q: "Complete: “Would you like ___ try some bread?”",
        options: ["to", "for", "at", "of"],
        a: 0,
        why: "'Would you like to…?' — sempre com 'to' antes do verbo.",
      },
    ],
  },
  {
    id: "westend",
    num: 7,
    namePt: "Teatro no West End",
    nameEn: "West End",
    theme: "Expressões e reações",
    desc: "Luzes, palco e uma expressão que confunde qualquer um: 'break a leg'!",
    tip: "Idioms não se traduzem ao pé da letra — 'break a leg' significa 'boa sorte'!",
    x: 420,
    y: 355,
    color: "#8d4fa0",
    icon: "theater",
    localName: "Bea",
    localRole: "Amiga londrina",
    vocab: [
      { en: "Show", pt: "Espetáculo", ipa: "/ʃəʊ/" },
      { en: "Stage", pt: "Palco", ipa: "/steɪdʒ/" },
      { en: "Audience", pt: "Plateia, público", ipa: "/ˈɔːdiəns/" },
      { en: "Break a leg", pt: "Boa sorte! (idiom)", ipa: "/breɪk ə leɡ/" },
      { en: "Idiom", pt: "Expressão idiomática", ipa: "/ˈɪdiəm/" },
    ],
    dialogue: [
      { who: "local", en: "The show is about to start. Break a leg!", pt: "O espetáculo vai começar. Boa sorte!" },
      { who: "you", en: "Wait… you're wishing me bad luck?", pt: "Espera… você está me desejando azar?" },
      { who: "local", en: "No! 'Break a leg' means 'good luck'!", pt: "Não! 'Break a leg' significa 'boa sorte'!" },
      { who: "you", en: "Ha! English idioms are crazy. The stage looks incredible.", pt: "Ha! Idioms de inglês são loucos. O palco parece incrível." },
      { who: "local", en: "I know — the audience loved it last night.", pt: "Eu sei — a plateia amou ontem à noite." },
      { who: "you", en: "I can't wait!", pt: "Mal posso esperar!" },
    ],
    quiz: [
      {
        q: "Alguém te diz “break a leg!”. Essa pessoa está desejando…",
        options: ["azar", "boa sorte", "uma perna nova", "boa viagem"],
        a: 1,
        why: "É o idiom mais famoso do teatro: 'break a leg' = boa sorte!",
      },
      {
        q: "O que é a “audience”?",
        options: ["O palco", "A plateia", "O diretor", "A cortina"],
        a: 1,
        why: "'Audience' é o público que assiste ao espetáculo.",
      },
      {
        q: "Complete: “The show is about ___ start.”",
        options: ["to", "for", "at", "in"],
        a: 0,
        why: "'About to' + verbo = prestes a: 'o show está prestes a começar'.",
      },
    ],
  },
  {
    id: "towerbridge",
    num: 8,
    namePt: "Tower Bridge",
    nameEn: "Tower Bridge",
    theme: "Despedida e revisão",
    desc: "Fim da rota, vista inesquecível. Revise tudo o que aprendeu e diga 'até logo'.",
    tip: "'See you around' é um adeus leve e natural — use sem medo.",
    x: 740,
    y: 385,
    color: "#24457c",
    icon: "bridge",
    localName: "Tom",
    localRole: "Amigo de viagem",
    vocab: [
      { en: "Bridge", pt: "Ponte", ipa: "/brɪdʒ/" },
      { en: "View", pt: "Vista, paisagem", ipa: "/vjuː/" },
      { en: "Souvenir", pt: "Lembrança de viagem", ipa: "/ˌsuːvəˈnɪə/" },
      { en: "Safe travels", pt: "Boa viagem", ipa: "/seɪf ˈtrævəlz/" },
      { en: "See you around", pt: "Até mais", ipa: "/siː juː əˈraʊnd/" },
    ],
    dialogue: [
      { who: "local", en: "I can't believe your trip is over!", pt: "Não acredito que sua viagem acabou!" },
      { who: "you", en: "Time flew by. This view is unforgettable.", pt: "O tempo passou voando. Esta vista é inesquecível." },
      { who: "local", en: "You have to come back someday.", pt: "Você precisa voltar um dia." },
      { who: "you", en: "I will. Thanks for showing me around!", pt: "Vou voltar. Obrigado por me mostrar a cidade!" },
      { who: "local", en: "Anytime! See you around, and safe travels!", pt: "Quando quiser! Até mais, e boa viagem!" },
      { who: "you", en: "See you! London, I'll be back.", pt: "Até! Londres, eu volto." },
    ],
    quiz: [
      {
        q: "“Time flew by” significa que…",
        options: [
          "o voo atrasou",
          "o tempo passou voando",
          "passou um avião",
          "o relógio quebrou",
        ],
        a: 1,
        why: "Idiom clássico: o tempo 'voou' de tão rápido que passou.",
      },
      {
        q: "Qual é uma despedida informal e natural?",
        options: ["See you around!", "Good evening!", "You're welcome!", "Good morning!"],
        a: 0,
        why: "'See you around' = até mais. As outras são saudações ou agradecimentos.",
      },
      {
        q: "Complete: “Thanks for showing me ___!”",
        options: ["around", "about", "above", "across"],
        a: 0,
        why: "'To show someone around' = mostrar a cidade/o lugar para alguém.",
      },
    ],
  },
];
