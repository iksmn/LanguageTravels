/**
 * Cahier de copie — corpus of English dictations.
 *
 * Each week offers 3 sentences ordered from simple to complex, reusing the
 * week's vocabulary and weaving in time markers (weekdays, months, seasons)
 * plus astronomy, football and local history to anchor the A1 lexicon.
 */

export const DICTEES_EN: Record<string, { fr: string; pt: string }[]> = {
  london: [
    { fr: "On Monday, we arrive in London by train.", pt: "Na segunda-feira, chegamos a Londres de trem." },
    { fr: "The city is very big and the buses are red.", pt: "A cidade é muito grande e os ônibus são vermelhos." },
    { fr: "In winter, the sky is grey, but the museums are warm and full of history.", pt: "No inverno, o céu é cinzento, mas os museus são quentes e cheios de história." },
  ],
  oxford: [
    { fr: "On Tuesday, we read old books in the library.", pt: "Na terça-feira, lemos livros antigos na biblioteca." },
    { fr: "The university is one of the oldest in the world.", pt: "A universidade é uma das mais antigas do mundo." },
    { fr: "In spring, the students walk by the river and talk about the stars.", pt: "Na primavera, os estudantes passeiam à beira do rio e falam sobre as estrelas." },
  ],
  manchester: [
    { fr: "On Wednesday, we visit the Jodrell Bank telescope.", pt: "Na quarta-feira, visitamos o telescópio de Jodrell Bank." },
    { fr: "The telescope is very large and listens to the stars.", pt: "O telescópio é muito grande e escuta as estrelas." },
    { fr: "On Saturday, Old Trafford is full of people: the match starts at three o'clock.", pt: "No sábado, Old Trafford está cheio: a partida começa às três horas." },
  ],
  york: [
    { fr: "On Thursday, we walk on the old city walls.", pt: "Na quinta-feira, caminhamos pelas muralhas antigas da cidade." },
    { fr: "The streets are narrow and the cathedral is tall.", pt: "As ruas são estreitas e a catedral é alta." },
    { fr: "In autumn, the nights are dark and the stars shine over the Minster.", pt: "No outono, as noites são escuras e as estrelas brilham sobre a catedral." },
  ],
  edinburgh: [
    { fr: "On Friday, we climb the castle hill in Edinburgh.", pt: "Na sexta-feira, subimos a colina do castelo em Edimburgo." },
    { fr: "The Royal Observatory watches the sky every night.", pt: "O Observatório Real vigia o céu todas as noites." },
    { fr: "In August, the Festival fills the city with music, theatre and fireworks.", pt: "Em agosto, o Festival enche a cidade de música, teatro e fogos." },
  ],
  glasgow: [
    { fr: "On Saturday, we listen to music in Glasgow.", pt: "No sábado, ouvimos música em Glasgow." },
    { fr: "The people are friendly and the songs are old and beautiful.", pt: "As pessoas são amigáveis e as canções são antigas e bonitas." },
    { fr: "In winter, the stadium is loud: the Old Firm match is a big event.", pt: "No inverno, o estádio barulha: o clássico Old Firm é um grande evento." },
  ],
  lochness: [
    { fr: "On Sunday, we take a boat on Loch Ness.", pt: "No domingo, pegamos um barco no lago Ness." },
    { fr: "The water is dark and the mountains are high.", pt: "A água é escura e as montanhas são altas." },
    { fr: "At night, the sky is clear and we look for the monster and the Milky Way.", pt: "À noite, o céu está limpo e procuramos o monstro e a Via Láctea." },
  ],
  cardiff: [
    { fr: "On Monday, we cross the bridge into Wales.", pt: "Na segunda-feira, cruzamos a ponte para o País de Gales." },
    { fr: "The red dragon flies over the old castle.", pt: "O dragão vermelho voa sobre o castelo antigo." },
    { fr: "In spring, the rugby stadium is full and the fans sing in Welsh.", pt: "Na primavera, o estádio de rúgbi está cheio e os torcedores cantam em galês." },
  ],
  belfast: [
    { fr: "On Tuesday, we visit the Titanic museum in Belfast.", pt: "Na terça-feira, visitamos o museu do Titanic em Belfast." },
    { fr: "The ship was the biggest in the world in 1912.", pt: "O navio era o maior do mundo em 1912." },
    { fr: "On the north coast, the Giant's Causeway has forty thousand old stones.", pt: "Na costa norte, a Calçada dos Gigantes tem quarenta mil pedras antigas." },
  ],
  dublin: [
    { fr: "On Wednesday, we walk by the river Liffey in Dublin.", pt: "Na quarta-feira, passeamos à beira do rio Liffey em Dublin." },
    { fr: "The pubs are full of music and old stories.", pt: "Os pubs estão cheios de música e histórias antigas." },
    { fr: "In summer, the writers of Ireland live in every street of the city.", pt: "No verão, os escritores da Irlanda vivem em cada rua da cidade." },
  ],
  galway: [
    { fr: "On Thursday, we see the Cliffs of Moher.", pt: "Na quinta-feira, vemos os Penhascos de Moher." },
    { fr: "The cliffs are high and the sea is wild and blue.", pt: "Os penhascos são altos e o mar é selvagem e azul." },
    { fr: "At night, far from the city lights, the stars are bright over the Atlantic.", pt: "À noite, longe das luzes da cidade, as estrelas brilham sobre o Atlântico." },
  ],
  cork: [
    { fr: "On Friday, we eat fresh fish at the market in Cork.", pt: "Na sexta-feira, comemos peixe fresco no mercado de Cork." },
    { fr: "The food is good and the people say «Sláinte!»", pt: "A comida é boa e as pessoas dizem «Sláinte!»" },
    { fr: "In autumn, the harbour is busy and the pubs are warm and full of friends.", pt: "No outono, o porto está movimentado e os pubs são quentes e cheios de amigos." },
  ],
  greenwich: [
    { fr: "On Saturday, we stand on the Prime Meridian in Greenwich.", pt: "No sábado, ficamos sobre o Meridiano de Greenwich." },
    { fr: "The Observatory measures the time of the whole world.", pt: "O Observatório mede o tempo do mundo inteiro." },
    { fr: "On Sunday, we write the final exam and celebrate with all our friends.", pt: "No domingo, escrevemos o exame final e celebramos com todos os nossos amigos." },
  ],
};
