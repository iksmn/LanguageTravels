/**
 * Cahier de copie — corpus de dictées en français.
 *
 * Chaque semaine propose 3 phrases ordonnées de la plus simple à la plus
 * complexe. Elles réutilisent le vocabulaire de la semaine et intègrent des
 * repères temporels (jours, mois, saisons) pour ancrer ce lexique A1.
 *
 * La difficulté progresse de deux façons :
 *  - au fil de la semaine : on copie 1, puis 2, puis les 3 phrases ;
 *  - au fil de la route : les phrases des dernières semaines sont plus
 *    longues et plus riches.
 */

export interface DicteeLine {
  fr: string;
  pt: string;
}

export const DICTEES_FR: Record<string, DicteeLine[]> = {
  cdg: [
    { fr: "Nous arrivons à Paris un lundi de janvier.", pt: "Chegamos a Paris numa segunda-feira de janeiro." },
    { fr: "C'est l'hiver : il fait froid, mais la ville est belle.", pt: "É inverno: faz frio, mas a cidade é linda." },
    { fr: "L'agent regarde notre passeport, puis il dit : « Bienvenue ! »", pt: "O agente olha nosso passaporte e depois diz: «Bem-vindos!»" },
  ],
  saintgermain: [
    { fr: "Mardi matin, je commande un café au comptoir.", pt: "Terça de manhã, peço um café no balcão." },
    { fr: "Le garçon apporte un croissant chaud et l'addition.", pt: "O garçom traz um croissant quente e a conta." },
    { fr: "En février, il pleut souvent, alors nous restons au café.", pt: "Em fevereiro chove muito, então ficamos no café." },
  ],
  louvre: [
    { fr: "Mercredi, nous visitons le musée du Louvre.", pt: "Na quarta, visitamos o museu do Louvre." },
    { fr: "Au printemps, la pyramide brille sous le soleil de mars.", pt: "Na primavera, a pirâmide brilha sob o sol de março." },
    { fr: "L'histoire de l'art est magnifique : chaque salle raconte une époque.", pt: "A história da arte é magnífica: cada sala conta uma época." },
  ],
  montsaintmichel: [
    { fr: "Jeudi, nous marchons vers l'abbaye, tout droit.", pt: "Na quinta, caminhamos em direção à abadia, sempre em frente." },
    { fr: "En avril, la marée monte très vite autour du Mont.", pt: "Em abril, a maré sobe muito rápido ao redor do Mont." },
    { fr: "À gauche, à droite : les petites rues du printemps sont pleines de fleurs.", pt: "À esquerda, à direita: as ruelas da primavera estão cheias de flores." },
  ],
  avignon: [
    { fr: "Vendredi, au marché, j'achète du pain et du fromage.", pt: "Na sexta, no mercado, compro pão e queijo." },
    { fr: "En mai, les fruits de Provence sentent très bon.", pt: "Em maio, as frutas da Provença cheiram muito bem." },
    { fr: "Le vin est frais, le fromage est délicieux : quel beau vendredi !", pt: "O vinho está fresco, o queijo está delicioso: que bela sexta-feira!" },
  ],
  nice: [
    { fr: "Samedi, il fait beau sur la Promenade des Anglais.", pt: "No sábado, faz sol na Promenade des Anglais." },
    { fr: "En juin, le soleil brille et la mer est bleue.", pt: "Em junho, o sol brilha e o mar está azul." },
    { fr: "L'été commence : nous nageons, puis nous regardons les étoiles.", pt: "O verão começa: nadamos e depois olhamos as estrelas." },
  ],
  lyon: [
    { fr: "Dimanche, nous comptons jusqu'à vingt au bouchon.", pt: "No domingo, contamos até vinte no bouchon." },
    { fr: "En juillet, la cuisine lyonnaise est une vraie fête.", pt: "Em julho, a cozinha lionesa é uma verdadeira festa." },
    { fr: "Le menu coûte vingt euros, dessert compris : dix sur dix !", pt: "O menu custa vinte euros, sobremesa incluída: nota dez!" },
  ],
  bordeaux: [
    { fr: "En août, toute la famille est dans les vignes.", pt: "Em agosto, a família inteira está nos vinhedos." },
    { fr: "Ma mère, mon père et ma sœur préparent le dîner d'été.", pt: "Minha mãe, meu pai e minha irmã preparam o jantar de verão." },
    { fr: "Les grands-parents racontent des histoires, et le vin est excellent.", pt: "Os avós contam histórias, e o vinho está excelente." },
  ],
  chamonix: [
    { fr: "En septembre, la montagne change de couleur.", pt: "Em setembro, a montanha muda de cor." },
    { fr: "Le matin, je skie ; le soir, je me repose près du feu.", pt: "De manhã eu esquio; à noite descanso perto do fogo." },
    { fr: "L'automne arrive : je ne dis jamais non à une randonnée.", pt: "O outono chega: eu nunca digo não a uma trilha." },
  ],
  strasbourg: [
    { fr: "Hier, en octobre, j'ai visité la cathédrale.", pt: "Ontem, em outubro, visitei a catedral." },
    { fr: "La semaine dernière, nous avons mangé une choucroute délicieuse.", pt: "Na semana passada, comemos um chucrute delicioso." },
    { fr: "C'était magnifique : l'automne doré illuminait toute la ville.", pt: "Foi magnífico: o outono dourado iluminava a cidade inteira." },
  ],
  versailles: [
    { fr: "Demain, en novembre, je vais visiter le château.", pt: "Amanhã, em novembro, vou visitar o palácio." },
    { fr: "Peut-être que la semaine prochaine, il pleuvra sur les jardins.", pt: "Talvez na semana que vem chova sobre os jardins." },
    { fr: "À la fin de l'automne, les feuilles tombent : quelle belle saison !", pt: "No fim do outono, as folhas caem: que bela estação!" },
  ],
  ajaccio: [
    { fr: "En décembre, la Corse est douce, même en hiver.", pt: "Em dezembro, a Córsega é amena, mesmo no inverno." },
    { fr: "Mes amis disent : « Bonne journée et à la prochaine ! »", pt: "Meus amigos dizem: «Bom dia e até a próxima!»" },
    { fr: "Merci pour tout : la France me manquera cet hiver.", pt: "Obrigado por tudo: sentirei falta da França neste inverno." },
  ],
  monaco: [
    { fr: "Aujourd'hui, nous sommes à Monaco, au bord de la mer.", pt: "Hoje estamos em Mônaco, à beira-mar." },
    { fr: "Après quatre-vingt-dix jours, je parle un peu français.", pt: "Depois de noventa dias, falo um pouco de francês." },
    { fr: "Du printemps à l'hiver, cette route m'a tout appris.", pt: "Da primavera ao inverno, esta rota me ensinou tudo." },
  ],
};
