/**
 * Cahier de copie — corpus de ditados em alemão.
 *
 * Cada semana propõe 3 frases ordenadas da mais simples à mais complexa,
 * reutilizando o vocabulário da semana e integrando marcos temporais
 * (dias da semana, meses, estações) mais temas de futebol, automobilismo
 * e história alemã, para ancorar esse léxico A1 ao longo da rota.
 *
 * A dificuldade progride de duas formas:
 *  - ao longo da semana: copia-se 1, depois 2, depois as 3 frases;
 *  - ao longo da rota: as frases das últimas semanas são mais longas.
 */

export const DICTEES_DE: Record<string, { fr: string; pt: string }[]> = {
  berlin: [
    { fr: "Am Montag kommen wir in Berlin an.", pt: "Na segunda-feira chegamos a Berlim." },
    { fr: "Das Brandenburger Tor ist alt und schön. Wir machen viele Fotos.", pt: "O Portão de Brandemburgo é antigo e bonito. Tiramos muitas fotos." },
    { fr: "Im Herbst ist die Geschichte überall: die Mauer, das Museum, die Stadt.", pt: "No outono a história está em todo lugar: o Muro, o museu, a cidade." },
  ],
  hamburg: [
    { fr: "Am Dienstag regnet es im Hafen.", pt: "Na terça-feira chove no porto." },
    { fr: "Die Stadt hat mehr als zweitausend Brücken über das Wasser.", pt: "A cidade tem mais de duas mil pontes sobre a água." },
    { fr: "Im Februar trinken wir heißen Tee und schauen die großen Schiffe.", pt: "Em fevereiro bebemos chá quente e olhamos os grandes navios." },
  ],
  koeln: [
    { fr: "Am Mittwoch beginnt der Karneval in Köln.", pt: "Na quarta-feira começa o Carnaval em Colônia." },
    { fr: "Die Menschen singen und tanzen vor dem Dom.", pt: "As pessoas cantam e dançam diante da catedral." },
    { fr: "Im Frühling ist die ganze Stadt ein großes Fest mit Musik und Farben.", pt: "Na primavera a cidade inteira é uma grande festa com música e cores." },
  ],
  frankfurt: [
    { fr: "Am Donnerstag hat Julien drei Termine im Büro.", pt: "Na quinta-feira Julien tem três compromissos no escritório." },
    { fr: "Nach der Arbeit trinken wir einen Kaffee am Main.", pt: "Depois do trabalho bebemos um café à beira do Meno." },
    { fr: "Im Sommer sehen wir die Sterne über der großen Stadt.", pt: "No verão olhamos as estrelas sobre a grande cidade." },
  ],
  heidelberg: [
    { fr: "Am Freitag schauen wir die Sterne am Königstuhl.", pt: "Na sexta-feira olhamos as estrelas no Königstuhl." },
    { fr: "Das alte Schloss und die Universität sind berühmt.", pt: "O castelo antigo e a universidade são famosos." },
    { fr: "Im Herbst ist der Himmel klar und das Tal ist ruhig und dunkel.", pt: "No outono o céu está limpo e o vale está calmo e escuro." },
  ],
  stuttgart: [
    { fr: "Am Samstag besuchen wir das Automuseum in Stuttgart.", pt: "No sábado visitamos o museu do automóvel em Stuttgart." },
    { fr: "Hier hat im Jahr 1886 das Auto seine Geschichte begonnen.", pt: "Aqui, em 1886, o automóvel começou a sua história." },
    { fr: "Im Museum stehen die alten Autos von Mercedes und Porsche, schnell und schön.", pt: "No museu estão os carros antigos da Mercedes e da Porsche, rápidos e bonitos." },
  ],
  muenchen: [
    { fr: "Am Sonntag spielen Bayern und Dortmund in der Allianz Arena.", pt: "No domingo o Bayern e o Dortmund jogam na Allianz Arena." },
    { fr: "Die Mannschaft spielt gut und die Fans singen laut.", pt: "O time joga bem e os torcedores cantam alto." },
    { fr: "Im Herbst ist das Stadion voll: neunzig Minuten, ein Tor, ein großes Fest.", pt: "No outono o estádio está cheio: noventa minutos, um gol, uma grande festa." },
  ],
  zuerich: [
    { fr: "Am Montag fahren wir mit dem Zug nach Zürich.", pt: "Na segunda-feira vamos de trem a Zurique." },
    { fr: "Der Zug ist pünktlich und der See ist blau.", pt: "O trem é pontual e o lago é azul." },
    { fr: "Im Winter trinken wir heiße Schokolade und schauen die Sterne an der Urania.", pt: "No inverno bebemos chocolate quente e olhamos as estrelas na Urania." },
  ],
  vaduz: [
    { fr: "Am Dienstag gehen wir zu Fuß nach Vaduz.", pt: "Na terça-feira vamos a pé até Vaduz." },
    { fr: "Das Schloss steht hoch über dem kleinen Land.", pt: "O castelo fica no alto, acima do pequeno país." },
    { fr: "Im Frühling ist die Grenze offen und wir sehen den Rhein im Tal.", pt: "Na primavera a fronteira está aberta e vemos o Reno no vale." },
  ],
  innsbruck: [
    { fr: "Am Mittwoch fahren wir auf die Nordkette.", pt: "Na quarta-feira subimos a Nordkette." },
    { fr: "Es schneit und die Sterne glänzen über den Alpen.", pt: "Está nevando e as estrelas brilham sobre os Alpes." },
    { fr: "Im Winter ist der Berg hoch und kalt, aber der Himmel ist wunderbar.", pt: "No inverno a montanha é alta e fria, mas o céu é maravilhoso." },
  ],
  salzburg: [
    { fr: "Am Donnerstag hören wir Mozart in der Stadt.", pt: "Na quinta-feira ouvimos Mozart na cidade." },
    { fr: "Die Musik kommt aus dem Garten von Mirabell.", pt: "A música vem do jardim de Mirabell." },
    { fr: "Im Sommer spielen sie ein Konzert im Garten und erzählen die Geschichte der Stadt.", pt: "No verão tocam um concerto no jardim e contam a história da cidade." },
  ],
  wien: [
    { fr: "Am Freitag trinken wir einen Melange im Café Central.", pt: "Na sexta-feira bebemos um Melange no Café Central." },
    { fr: "Die Sachertorte schmeckt wunderbar und der Walzer klingt.", pt: "A Sachertorte é deliciosa e a valsa soa." },
    { fr: "Im Herbst tanzen wir auf dem Platz und danken für die Freiheit.", pt: "No outono dançamos na praça e agradecemos pela liberdade." },
  ],
  potsdam: [
    { fr: "Am Samstag sehen wir das Schloss Sanssouci in Potsdam.", pt: "No sábado vemos o Palácio de Sanssouci em Potsdam." },
    { fr: "Die Geschichte des Kinos beginnt hier in Babelsberg.", pt: "A história do cinema começa aqui em Babelsberg." },
    { fr: "Am Sonntag schreiben wir die Prüfung und feiern mit allen Freunden.", pt: "No domingo fazemos a prova e celebramos com todos os amigos." },
  ],
};
