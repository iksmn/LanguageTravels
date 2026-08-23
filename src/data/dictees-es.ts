/**
 * Cahier de copie — corpus de dictados en español.
 *
 * Cada semana propone 3 frases ordenadas de la más simple a la más compleja,
 * reutilizando el vocabulario de la semana e integrando marcadores temporales
 * (días de la semana, meses, estaciones) más temas de fútbol, astronomía e
 * historia de España y Portugal, para anclar ese léxico A1 a lo largo de la ruta.
 *
 * La dificultad progresa de dos formas:
 *  - a lo largo de la semana: se copia 1, luego 2, luego las 3 frases;
 *  - a lo largo de la ruta: las frases de las últimas semanas son más largas.
 */

export const DICTEES_ES: Record<string, { fr: string; pt: string }[]> = {
  barcelona: [
    { fr: "El lunes llegamos a Barcelona por la mañana.", pt: "Na segunda-feira chegamos a Barcelona pela manhã." },
    { fr: "La Sagrada Familia es muy alta y muy bonita.", pt: "A Sagrada Família é muito alta e muito bonita." },
    { fr: "En verano, el sol brilla sobre el Camp Nou y la ciudad entera canta.", pt: "No verão, o sol brilha sobre o Camp Nou e a cidade inteira canta." },
  ],
  valencia: [
    { fr: "El martes comemos paella en la playa.", pt: "Na terça-feira comemos paella na praia." },
    { fr: "El arroz está caliente y el mar está azul.", pt: "O arroz está quente e o mar está azul." },
    { fr: "En primavera, las Fallas llenan las calles de fuego, música y flores.", pt: "Na primavera, as Fallas enchem as ruas de fogo, música e flores." },
  ],
  madrid: [
    { fr: "El miércoles visitamos el museo del Prado.", pt: "Na quarta-feira visitamos o museu do Prado." },
    { fr: "Por la noche, el Bernabéu brilla con las luces del estadio.", pt: "À noite, o Bernabéu brilha com as luzes do estádio." },
    { fr: "En otoño, la historia vive en cada plaza: el Palacio Real, la Puerta del Sol.", pt: "No outono, a história vive em cada praça: o Palácio Real, a Puerta del Sol." },
  ],
  toledo: [
    { fr: "El jueves leemos libros antiguos en la biblioteca.", pt: "Na quinta-feira lemos livros antigos na biblioteca." },
    { fr: "La ciudad tiene una historia muy larga y muy rica.", pt: "A cidade tem uma história muito longa e muito rica." },
    { fr: "En invierno, el cielo de Toledo es claro: los astrónomos miran las estrellas.", pt: "No inverno, o céu de Toledo é limpo: os astrônomos olham as estrelas." },
  ],
  granada: [
    { fr: "El viernes subimos a la Alhambra con Diego.", pt: "Na sexta-feira subimos à Alhambra com Diego." },
    { fr: "Los jardines del Generalife son verdes y tranquilos.", pt: "Os jardins do Generalife são verdes e tranquilos." },
    { fr: "Por la noche, el telescopio de Sierra Nevada busca planetas en el cielo de enero.", pt: "À noite, o telescópio de Sierra Nevada procura planetas no céu de janeiro." },
  ],
  sevilla: [
    { fr: "El sábado bailamos flamenco en la plaza.", pt: "No sábado dançamos flamenco na praça." },
    { fr: "La Giralda es alta y la catedral es muy grande.", pt: "A Giralda é alta e a catedral é muito grande." },
    { fr: "En abril, la Feria llena Sevilla de colores, caballos y música hasta el domingo.", pt: "Em abril, a Feira enche Sevilha de cores, cavalos e música até domingo." },
  ],
  porto: [
    { fr: "El domingo cruzamos el puente hacia Oporto.", pt: "No domingo cruzamos a ponte para o Porto." },
    { fr: "El vino del Duero es dulce y la ciudad es antigua.", pt: "O vinho do Douro é doce e a cidade é antiga." },
    { fr: "En el estadio del Dragón, los aficionados cantan todo el partido.", pt: "No estádio do Dragão, os torcedores cantam o jogo inteiro." },
  ],
  douro: [
    { fr: "El lunes navegamos por el río entre las viñas.", pt: "Na segunda-feira navegamos pelo rio entre as vinhas." },
    { fr: "En septiembre, la vendimia llena las montañas de gente.", pt: "Em setembro, a vindima enche as montanhas de gente." },
    { fr: "Los barcos rabelos llevan las barricas de vino desde hace trescientos años.", pt: "Os barcos rabelos transportam as barricas de vinho há trezentos anos." },
  ],
  coimbra: [
    { fr: "El martes escuchamos fado en la ciudad vieja.", pt: "Na terça-feira ouvimos fado na cidade velha." },
    { fr: "La universidad es una de las más antiguas de Europa.", pt: "A universidade é uma das mais antigas da Europa." },
    { fr: "En otoño, los estudiantes cantan y la biblioteca guarda siglos de historia.", pt: "No outono, os estudantes cantam e a biblioteca guarda séculos de história." },
  ],
  lisboa: [
    { fr: "El miércoles subimos al castillo de San Jorge.", pt: "Na quarta-feira subimos ao castelo de São Jorge." },
    { fr: "El tranvía amarillo pasa por las calles estrechas.", pt: "O elétrico amarelo passa pelas ruas estreitas." },
    { fr: "En verano, el estadio de la Luz se llena para el gran derbi de Lisboa.", pt: "No verão, o estádio da Luz se enche para o grande dérbi de Lisboa." },
  ],
  sintra: [
    { fr: "El jueves visitamos el palacio da Pena entre los árboles.", pt: "Na quinta-feira visitamos o palácio da Pena entre as árvores." },
    { fr: "El palacio es rojo y amarillo, como un sueño en la montaña.", pt: "O palácio é vermelho e amarelo, como um sonho na montanha." },
    { fr: "En primavera, la niebla sube por el bosque y los jardines huelen a flores.", pt: "Na primavera, a névoa sobe pelo bosque e os jardins cheiram a flores." },
  ],
  algarve: [
    { fr: "El viernes nadamos en el mar del Algarve.", pt: "Na sexta-feira nadamos no mar do Algarve." },
    { fr: "Las cuevas de Benagil tienen la luz del sol dentro.", pt: "As grutas de Benagil têm a luz do sol dentro." },
    { fr: "En agosto, la playa está llena y el cielo del sur es perfecto para mirar estrellas.", pt: "Em agosto, a praia está cheia e o céu do sul é perfeito para olhar as estrelas." },
  ],
  sagres: [
    { fr: "El sábado llegamos al cabo de San Vicente.", pt: "No sábado chegamos ao cabo de São Vicente." },
    { fr: "El viento es fuerte y el faro es viejo y blanco.", pt: "O vento é forte e o farol é velho e branco." },
    { fr: "El domingo escribimos el examen final y celebramos con todos los amigos del viaje.", pt: "No domingo escrevemos o exame final e celebramos com todos os amigos da viagem." },
  ],
};
