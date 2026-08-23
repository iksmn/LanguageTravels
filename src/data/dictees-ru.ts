/**
 * Cahier de copie — corpus de диктантов на русском.
 *
 * Каждая неделя предлагает 3 фразы от простой к сложной: лексика недели,
 * дни недели, месяцы и времена года, а также футбол, космонавтика
 * и русская история для закрепления лексики A1.
 */

export const DICTEES_RU: Record<string, { fr: string; pt: string }[]> = {
  moscow: [
    { fr: "В понедельник мы приезжаем в Москву.", pt: "Na segunda-feira chegamos a Moscou." },
    { fr: "Красная площадь большая и красивая.", pt: "A Praça Vermelha é grande e bonita." },
    { fr: "Зимой в Москве холодно, но город очень красивый вечером.", pt: "No inverno faz frio em Moscou, mas a cidade é muito bonita à noite." },
  ],
  petersburg: [
    { fr: "Во вторник мы гуляем по Санкт-Петербургу.", pt: "Na terça-feira passeamos por São Petersburgo." },
    { fr: "Летом в городе белые ночи и много людей.", pt: "No verão há noites brancas na cidade e muita gente." },
    { fr: "В июне музеи открыты до ночи, а Нева блестит под небом.", pt: "Em junho os museus ficam abertos até tarde e o Neva brilha sob o céu." },
  ],
  vladimir: [
    { fr: "В среду мы едем во Владимир на поезде.", pt: "Na quarta-feira vamos a Vladimir de trem." },
    { fr: "Старые церкви и стены очень интересные.", pt: "As igrejas e muralhas antigas são muito interessantes." },
    { fr: "Осенью Золотое кольцо России рассказывает свою долгую историю.", pt: "No outono, o Anel de Ouro da Rússia conta a sua longa história." },
  ],
  kazan: [
    { fr: "В четверг мы едим эчпочмак в Казани.", pt: "Na quinta-feira comemos echpochmak em Kazan." },
    { fr: "Мечеть и кремль стоят рядом, это очень красиво.", pt: "A mesquita e o kremlin ficam lado a lado, é muito bonito." },
    { fr: "В Казани футбол любят так же сильно, как чак-чак.", pt: "Em Kazan o futebol é amado tanto quanto o chak-chak." },
  ],
  sochi: [
    { fr: "В пятницу мы купаемся в Чёрном море.", pt: "Na sexta-feira nadamos no Mar Negro." },
    { fr: "Летом в Сочи тепло и солнечно.", pt: "No verão faz calor e sol em Sochi." },
    { fr: "Вечером мы смотрим футбол, а потом звёзды над морем.", pt: "À noite assistimos ao futebol e depois às estrelas sobre o mar." },
  ],
  minsk: [
    { fr: "В субботу мы идём пешком по Минску.", pt: "No sábado caminhamos por Minsk." },
    { fr: "Улицы широкие, а площади большие и чистые.", pt: "As ruas são largas e as praças são grandes e limpas." },
    { fr: "Весной в парках цветут деревья, и люди гуляют до вечера.", pt: "Na primavera as árvores florescem nos parques e as pessoas passeiam até à noite." },
  ],
  ekaterinburg: [
    { fr: "В воскресенье мы едем в Екатеринбург.", pt: "No domingo vamos a Ecaterimburgo." },
    { fr: "Здесь Европа встречается с Азией.", pt: "Aqui a Europa encontra a Ásia." },
    { fr: "Уральские горы старые и тихие, а история города очень интересная.", pt: "Os montes Urais são antigos e silenciosos, e a história da cidade é muito interessante." },
  ],
  novosibirsk: [
    { fr: "В понедельник мы посещаем Академгородок.", pt: "Na segunda-feira visitamos Akademgorodok." },
    { fr: "Учёные живут в лесу и работают в институтах.", pt: "Os cientistas vivem na floresta e trabalham nos institutos." },
    { fr: "Зимой небо над Сибирью тёмное и чистое: звёзды видно очень хорошо.", pt: "No inverno o céu sobre a Sibéria é escuro e limpo: dá para ver muito bem as estrelas." },
  ],
  baikal: [
    { fr: "Во вторник мы смотрим на озеро Байкал.", pt: "Na terça-feira olhamos para o lago Baikal." },
    { fr: "Зимой лёд на озере синий и прозрачный.", pt: "No inverno o gelo do lago é azul e transparente." },
    { fr: "Байкал — самое глубокое озеро в мире, и вода в нём очень чистая.", pt: "O Baikal é o lago mais profundo do mundo e a sua água é muito limpa." },
  ],
  volgograd: [
    { fr: "В среду мы видим статую «Родина-мать».", pt: "Na quarta-feira vemos a estátua «Mãe Pátria»." },
    { fr: "Памятник очень большой и стоит на высоком холме.", pt: "O monumento é muito grande e fica no alto de uma colina." },
    { fr: "Девятого мая люди приходят сюда, чтобы помнить историю.", pt: "No dia nove de maio as pessoas vêm aqui para lembrar a história." },
  ],
  baikonur: [
    { fr: "В четверг мы едем на космодром Байконур.", pt: "Na quinta-feira vamos ao cosmódromo de Baikonur." },
    { fr: "Отсюда первый человек полетел в космос.", pt: "Daqui o primeiro ser humano voou para o espaço." },
    { fr: "Ночью в степи тихо: ракеты спят, а звёзды работают.", pt: "À noite a estepe está silenciosa: os foguetes dormem e as estrelas trabalham." },
  ],
  almaty: [
    { fr: "В пятницу мы поднимаемся в горы около Алматы.", pt: "Na sexta-feira subimos as montanhas perto de Almaty." },
    { fr: "Горы высокие, а воздух свежий и холодный.", pt: "As montanhas são altas e o ar é fresco e frio." },
    { fr: "Осенью листья жёлтые и красные, а вечером мы идём на футбол.", pt: "No outono as folhas ficam amarelas e vermelhas, e à noite vamos ao futebol." },
  ],
  moscowfinal: [
    { fr: "В субботу мы идём в Большой театр.", pt: "No sábado vamos ao Teatro Bolshoi." },
    { fr: "Музыка и танцы очень красивые.", pt: "A música e as danças são muito bonitas." },
    { fr: "В воскресенье мы пишем экзамен и празднуем с друзьями.", pt: "No domingo fazemos o exame e celebramos com os amigos." },
  ],
};
