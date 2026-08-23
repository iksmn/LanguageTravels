/**
 * Cahier de copie — corpus de ditados em italiano.
 *
 * 3 frases por semana, da mais simples à mais complexa, com referências a
 * dias da semana, meses e estações. Temas: automobilismo (Monza, Fiat, Imola),
 * Vaticano e locais históricos (Colosseo, Pompei, Arena, Duomo…).
 */

import type { DicteeLine } from "./dictees-fr";

export const DICTEES_IT: Record<string, DicteeLine[]> = {
  milano: [
    { fr: "Domenica andiamo a Monza per il Gran Premio.", pt: "No domingo vamos a Monza para o Grande Prêmio." },
    { fr: "A settembre le macchine rosse corrono veloci nel parco.", pt: "Em setembro os carros vermelhos correm velozes no parque." },
    { fr: "Il circuito ha cento anni, ma ogni primavera è ancora pieno di tifosi.", pt: "O circuito tem cem anos, mas a cada primavera ainda está cheio de torcedores." },
  ],
  torino: [
    { fr: "Sabato visitiamo il Museo dell'Automobile.", pt: "No sábado visitamos o Museu do Automóvel." },
    { fr: "Torino fabbrica macchine da due secoli, in ogni stagione.", pt: "Turim fabrica carros há dois séculos, em todas as estações." },
    { fr: "In inverno la città è grigia, però i fari delle vecchie Fiat brillano come stelle.", pt: "No inverno a cidade fica cinzenta, mas os faróis dos velhos Fiat brilham como estrelas." },
  ],
  lugano: [
    { fr: "Lunedì prendiamo il treno per Lugano.", pt: "Na segunda pegamos o trem para Lugano." },
    { fr: "In estate il lago è blu e le montagne sono verdi.", pt: "No verão o lago é azul e as montanhas são verdes." },
    { fr: "Giovedì mattina compriamo il biglietto e attraversiamo il confine senza passaporto.", pt: "Quinta de manhã compramos a passagem e cruzamos a fronteira sem passaporte." },
  ],
  sanktmoritz: [
    { fr: "Martedì sciiamo sulle montagne.", pt: "Na terça esquiamos nas montanhas." },
    { fr: "A dicembre la neve copre i tetti di Sankt Moritz.", pt: "Em dezembro a neve cobre os telhados de St. Moritz." },
    { fr: "Il treno rosso arriva in gennaio, puntuale anche in pieno inverno.", pt: "O trem vermelho chega em janeiro, pontual mesmo no auge do inverno." },
  ],
  verona: [
    { fr: "Venerdì entriamo nell'Arena di Verona.", pt: "Na sexta entramos na Arena de Verona." },
    { fr: "L'anfiteatro romano ha duemila anni e ogni estate ospita l'opera.", pt: "O anfiteatro romano tem dois mil anos e a cada verão recebe a ópera." },
    { fr: "Di sera, in luglio, le stelle brillano sopra le pietre antiche.", pt: "À noite, em julho, as estrelas brilham sobre as pedras antigas." },
  ],
  venezia: [
    { fr: "Domenica attraversiamo il Ponte di Rialto.", pt: "No domingo atravessamos a Ponte de Rialto." },
    { fr: "In autunno l'acqua alta entra in piazza San Marco.", pt: "No outono a água alta entra na Praça de São Marcos." },
    { fr: "I gondolieri cantano in novembre, quando la nebbia copre i canali.", pt: "Os gondoleiros cantam em novembro, quando a névoa cobre os canais." },
  ],
  bologna: [
    { fr: "Mercoledì andiamo a Imola in moto.", pt: "Na quarta vamos a Imola de moto." },
    { fr: "Il circuito Enzo Ferrari è vicino, e la domenica i motori cantano.", pt: "O circuito Enzo Ferrari fica perto, e aos domingos os motores cantam." },
    { fr: "In ottobre mangiamo la pasta sotto i portici più vecchi d'Europa.", pt: "Em outubro comemos massa sob os pórticos mais velhos da Europa." },
  ],
  firenze: [
    { fr: "Sabato saliamo sulla cupola del Duomo.", pt: "No sábado subimos na cúpula do Duomo." },
    { fr: "Il Ponte Vecchio ha negozi d'oro da settecento anni.", pt: "A Ponte Vecchio tem lojas de ouro há setecentos anos." },
    { fr: "In primavera gli Uffizi sono pieni, così visitiamo i musei il martedì.", pt: "Na primavera os Uffizi ficam cheios, então visitamos os museus na terça." },
  ],
  roma: [
    { fr: "Domenica visitiamo la Basilica di San Pietro.", pt: "No domingo visitamos a Basílica de São Pedro." },
    { fr: "Il Vaticano ha la cupola più famosa del mondo e musei pieni d'arte.", pt: "O Vaticano tem a cúpula mais famosa do mundo e museus cheios de arte." },
    { fr: "Il Colosseo ha duemila anni: in giugno i turisti lo fotografano dall'alba al tramonto.", pt: "O Coliseu tem dois mil anos: em junho os turistas o fotografam do amanhecer ao pôr do sol." },
  ],
  napoli: [
    { fr: "Martedì prendiamo il treno per Pompei.", pt: "Na terça pegamos o trem para Pompei." },
    { fr: "Nell'anno settantanove il Vesuvio coprì la città in un giorno d'autunno.", pt: "No ano 79 o Vesúvio cobriu a cidade num dia de outono." },
    { fr: "Le strade romane sono intatte: in aprile camminiamo dove camminavano i gladiatori.", pt: "As ruas romanas estão intactas: em abril caminhamos onde caminhavam os gladiadores." },
  ],
  amalfi: [
    { fr: "Giovedì nuotiamo nel mare blu.", pt: "Na quinta nadamos no mar azul." },
    { fr: "In agosto la costiera è piena di barche e di limoni.", pt: "Em agosto a costa está cheia de barcos e limões." },
    { fr: "Domenica sera mangiamo la pizza più buona d'Italia, guardando le stelle.", pt: "No domingo à noite comemos a melhor pizza da Itália, olhando as estrelas." },
  ],
  palermo: [
    { fr: "Venerdì visitiamo il palazzo dei Normanni.", pt: "Na sexta visitamos o palácio dos Normandos." },
    { fr: "La Cappella Palatina brilla d'oro in tutte le stagioni.", pt: "A Capela Palatina brilha em ouro em todas as estações." },
    { fr: "In marzo il mercato di Ballarò profuma di arance e di storia.", pt: "Em março o mercado de Ballarò tem cheiro de laranjas e de história." },
  ],
  esamefinale: [
    { fr: "Lunedì ripasso tutti i verbi della strada.", pt: "Na segunda reviso todos os verbos da rota." },
    { fr: "Da Milano a Palermo ho imparato novanta giorni di italiano, dall'inverno alla primavera.", pt: "De Milão a Palermo aprendi noventa dias de italiano, do inverno à primavera." },
    { fr: "Sabato faccio l'esame finale: poi festeggiamo con una macchina rossa e un cielo pieno di stelle.", pt: "No sábado faço o exame final: depois festejamos com um carro vermelho e um céu cheio de estrelas." },
  ],
};
