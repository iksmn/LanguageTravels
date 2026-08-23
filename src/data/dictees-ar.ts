/**
 * Cahier de copie — corpus of Arabic dictations (إملاء).
 *
 * Each week offers 3 sentences ordered from simple to complex, reusing the
 * week's vocabulary and weaving in time markers (weekdays, months, seasons)
 * plus astronomy, football and Arab history to anchor the A1 lexicon.
 */

export const DICTEES_AR: Record<string, { fr: string; pt: string }[]> = {
  cairo: [
    { fr: "يَوْمَ الِاثْنَيْنِ نَصِلُ إِلى القاهِرَة.", pt: "Na segunda-feira chegamos ao Cairo." },
    { fr: "المَدينَةُ كَبيرَةٌ وَالشَّمْسُ ساطِعَة.", pt: "A cidade é grande e o sol está brilhante." },
    { fr: "في الشِّتاءِ يَشْرَبُ النّاسُ الشّايَ في المَقاهي القَديمَة.", pt: "No inverno as pessoas bebem chá nos cafés antigos." },
  ],
  giza: [
    { fr: "يَوْمَ الثُّلاثاءِ نَرى الأَهْرامات.", pt: "Na terça-feira vemos as pirâmides." },
    { fr: "الأَهْراماتُ ثَلاثٌ وَهِيَ قَديمَةٌ جِدًّا.", pt: "As pirâmides são três e são muito antigas." },
    { fr: "قَبْلَ أَرْبَعَةِ آلافِ سَنَةٍ بَنى المِصْرِيُّونَ هذِهِ الأَهْرامات.", pt: "Há quatro mil anos os egípcios construíram estas pirâmides." },
  ],
  alexandria: [
    { fr: "يَوْمَ الأَرْبِعاءِ نَمْشي عَلى البَحْر.", pt: "Na quarta-feira caminhamos à beira-mar." },
    { fr: "مَكْتَبَةُ الإِسْكَنْدَرِيَّةِ كَبيرَةٌ وَجَميلَة.", pt: "A Biblioteca de Alexandria é grande e bonita." },
    { fr: "في الصَّيْفِ البَحْرُ أَزْرَقُ وَالمَنارَةُ القَديمَةُ تَحْكي التّاريخ.", pt: "No verão o mar é azul e o antigo farol conta a história." },
  ],
  petra: [
    { fr: "يَوْمَ الخَميسِ نَدْخُلُ البَتْراء.", pt: "Na quinta-feira entramos em Petra." },
    { fr: "الخَزْنَةُ وَرْدِيَّةٌ وَمَنْحوتَةٌ في الصَّخْر.", pt: "O Tesouro é rosado e esculpido na rocha." },
    { fr: "الطَّريقُ ضَيِّقٌ وَطَويلٌ، ثُمَّ تَظْهَرُ الخَزْنَةُ فَجْأَة.", pt: "O caminho é estreito e longo, e então o Tesouro aparece de repente." },
  ],
  amman: [
    { fr: "يَوْمَ الجُمُعَةِ نَأْكُلُ المَنْسَفَ في عَمّان.", pt: "Na sexta-feira comemos mansaf em Amã." },
    { fr: "الطَّعامُ لَذيذٌ وَالنّاسُ كُرَماء.", pt: "A comida é deliciosa e as pessoas são generosas." },
    { fr: "عَمّانُ مَدينَةُ التِّلالِ السَّبْعِ، وَالجِبالُ حَوْلَها هادِئَة.", pt: "Amã é a cidade das sete colinas, e as montanhas ao redor são tranquilas." },
  ],
  beirut: [
    { fr: "يَوْمَ السَّبْتِ نَسْمَعُ المُوسيقى في بَيْروت.", pt: "No sábado ouvimos música em Beirute." },
    { fr: "البَحْرُ قَريبٌ وَالمَقاهي مُمْتَلِئَة.", pt: "O mar está perto e os cafés estão cheios." },
    { fr: "في الرَّبيعِ تَزْهَرُ أَشْجارُ اللَيْمونِ وَتَغْنّي المَدينَة.", pt: "Na primavera as laranjeiras florescem e a cidade canta." },
  ],
  dubai: [
    { fr: "يَوْمَ الأَحَدِ نَشْتري التُّمورَ في السّوق.", pt: "No domingo compramos tâmaras no mercado." },
    { fr: "بُرْجُ خَليفَة عالٍ جِدًّا.", pt: "O Burj Khalifa é muito alto." },
    { fr: "في الصَّيْفِ اللَّيْلُ دافِئٌ وَالمَدينَةُ تَلْمَعُ كَالنُّجوم.", pt: "No verão a noite é quente e a cidade brilha como as estrelas." },
  ],
  muscat: [
    { fr: "يَوْمَ الِاثْنَيْنِ نُشاهِدُ الجِبالَ وَالبَحْرَ في مَسْقَط.", pt: "Na segunda-feira vemos as montanhas e o mar em Mascate." },
    { fr: "الجامِعُ كَبيرٌ وَأَبْيَضُ وَهادِئ.", pt: "A mesquita é grande, branca e serena." },
    { fr: "الصَّيّادونَ يَخْرُجونَ إِلى البَحْرِ قَبْلَ شُروقِ الشَّمْس.", pt: "Os pescadores saem para o mar antes do nascer do sol." },
  ],
  marrakesh: [
    { fr: "يَوْمَ الثُّلاثاءِ نَزورُ سوقَ مَراكِش.", pt: "Na terça-feira visitamos o mercado de Marraquexe." },
    { fr: "السّوقُ كَبيرٌ وَالأَلْوانُ كَثيرَة.", pt: "O mercado é grande e as cores são muitas." },
    { fr: "في ساحةِ جامعِ الفَنا المُوسيقى وَالقِصَصُ حَتّى اللَّيْل.", pt: "Na praça Jemaa el-Fna há música e histórias até à noite." },
  ],
  fes: [
    { fr: "يَوْمَ الأَرْبِعاءِ نَرى الجُلودَ في فاس.", pt: "Na quarta-feira vemos os curtumes em Fez." },
    { fr: "المَدينَةُ القَديمَةُ قَديمَةٌ جِدًّا وَجَميلَة.", pt: "A cidade velha é muito antiga e bonita." },
    { fr: "جامِعَةُ القَرَوِيِّينَ مِنْ أَقْدَمِ جامِعاتِ العالَم.", pt: "A Universidade de al-Qarawiyyin é uma das mais antigas do mundo." },
  ],
  casablanca: [
    { fr: "يَوْمَ الخَميسِ نَمْشي عَلى الكورْنيش في الدّارِ البَيْضاء.", pt: "Na quinta-feira caminhamos no calçadão de Casablanca." },
    { fr: "مَسْجِدُ الحَسَنِ الثّاني عالٍ وَرائِع.", pt: "A Mesquita Hassan II é alta e magnífica." },
    { fr: "في الشِّتاءِ النّاسُ يَشْرَبونَ القَهْوَةَ وَيَتَحَدَّثونَ عَنْ كُرَةِ القَدَم.", pt: "No inverno as pessoas bebem café e falam de futebol." },
  ],
  tunis: [
    { fr: "يَوْمَ الجُمُعَةِ نَزورُ قَرْطاجَ القَديمَة.", pt: "Na sexta-feira visitamos a antiga Cartago." },
    { fr: "التّاريخُ هُنا في كُلِّ مَكان.", pt: "A história está aqui em todo o lugar." },
    { fr: "في الرَّبيعِ البَحْرُ هادِئٌ وَالسَّماءُ صافِيَةٌ فَوْقَ الميناء.", pt: "Na primavera o mar está calmo e o céu limpo sobre o porto." },
  ],
  doha: [
    { fr: "يَوْمَ السَّبْتِ نَزورُ مَدينَةَ التَّعْليمِ في الدَّوْحَة.", pt: "No sábado visitamos a Cidade da Educação em Doha." },
    { fr: "المَكْتَباتُ كَبيرَةٌ وَالحَديثَةُ جَميلَة.", pt: "As bibliotecas são grandes e os jardins são bonitos." },
    { fr: "يَوْمَ الأَحَدِ نَكْتُبُ الاِمْتِحانَ وَنَحْتَفِلُ مَعَ الأَصْدِقاء.", pt: "No domingo escrevemos o exame e celebramos com os amigos." },
  ],
};
