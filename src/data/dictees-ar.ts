/**
 * Cahier de copie — corpus of Arabic dictations (إملاء).
 *
 * Cada semana propõe 3 frases (simples → complexa) com marcadores
 * temporais (dias da semana, meses, estações), astronomia, futebol e
 * história do Levante ao Magrebe.
 */

import type { DicteeLine } from "./dictees-fr";

export const DICTEES_AR: Record<string, DicteeLine[]> = {
  baghdad: [
    { fr: "يَوْمَ الِاثْنَيْنِ نَصِلُ إِلى بَغْداد.", py: "Yawm al-ithnayn naṣilu ilā Baghdād.", pt: "Na segunda-feira chegamos a Bagdá." },
    { fr: "بَيْتُ الحِكْمَةِ كانَ مَدْرَسَةً لِلنُّجومِ والرِّياضِيّات.", py: "Bayt al-Ḥikma kāna madrasatan lin-nujūm wa-r-riyāḍiyyāt.", pt: "A Casa da Sabedoria era uma escola de estrelas e matemática." },
    { fr: "في الخَريفِ يَجْري نَهْرُ دِجْلَةَ هادِئًا، وَاللَّيْلَ يَلْعَبُ الزَّوْراء.", py: "Fī al-kharīf yajrī nahr Dijla hādiʾan, wa-l-layla yalʿabu az-Zawrāʾ.", pt: "No outono o rio Tigre corre calmo, e à noite o Zawraa joga." },
  ],
  ur: [
    { fr: "يَوْمَ الثُّلاثاءِ نَرى الزَّقّورَةَ في أور.", py: "Yawm ath-thulāthāʾ narā az-zaqqūra fī Ūr.", pt: "Na terça-feira vemos o zigurate em Ur." },
    { fr: "السُّومَرِيُّونَ عَدُّوا النُّجومَ قَبْلَ خَمْسَةِ آلافِ سَنَة.", py: "As-sūmariyyūna ʿaddū an-nujūma qabla khamsat ālāf sana.", pt: "Os sumérios contaram as estrelas há cinco mil anos." },
    { fr: "القَمَرُ كانَ ساعَتَهُمُ القَديمَة، وَالشَّمْسُ تُشْرِقُ مِنَ الشَّرْق.", py: "Al-qamar kāna sāʿatahum al-qadīma, wa-sh-shams tushriqu min ash-sharq.", pt: "A lua era o relógio antigo deles, e o sol nasce do leste." },
  ],
  damascus: [
    { fr: "يَوْمَ الأَرْبِعاءِ نَمْشي في سوقِ دِمَشْق.", py: "Yawm al-arbiʿāʾ namshī fī sūq Dimashq.", pt: "Na quarta-feira caminhamos no souk de Damasco." },
    { fr: "الجامِعُ الأُمَوِيُّ قَديمٌ وَجَميلٌ جِدًّا.", py: "Al-jāmiʿ al-umawiyy qadīm wa-jamīl jiddan.", pt: "A Mesquita Omíada é antiga e muito bonita." },
    { fr: "مِنْ قاسِيون، في اللِّيالي الصّافِيَةِ، نَرى المَدينَةَ كَالنُّجوم.", py: "Min Qāsyūn, fī al-layālī aṣ-ṣāfiya, narā al-madīna kan-nujūm.", pt: "Do Qasioun, nas noites claras, vemos a cidade como estrelas." },
  ],
  aleppo: [
    { fr: "يَوْمَ الخَميسِ نَأْكُلُ الكُبَّةَ في حَلَب.", py: "Yawm al-khamīs naʾkulu al-kubba fī Ḥalab.", pt: "Na quinta-feira comemos kebbe em Alepo." },
    { fr: "أُمّي تَطْبُخُ وأَبي يَحْكي قِصَصَ القَلْعَة.", py: "Ummī taṭbukhu wa-abī yaḥkī qiṣaṣ al-qalʿa.", pt: "Minha mãe cozinha e meu pai conta histórias da cidadela." },
    { fr: "يَوْمَ الجُمُعَةِ يَلْعَبُ الاتِّحاد، وَالمَدينَةُ كُلُّها تَهْتِف.", py: "Yawm al-jumʿa yalʿabu al-Ittiḥād, wa-l-madīna kullahā tahtif.", pt: "Na sexta-feira o Ittihad joga, e a cidade inteira torce." },
  ],
  beirut: [
    { fr: "يَوْمَ السَّبْتِ نَسْمَعُ فَيْرُوز على الكورنيش.", py: "Yawm as-sabt nasmaʿu Fayrūz ʿalā al-kornīsh.", pt: "No sábado ouvimos Fairouz no calçadão." },
    { fr: "الموسيقى تَمْلَأُ الهَواءَ، وَالبَحْرُ أَزْرَق.", py: "Al-mūsīqā tamlāʾ al-hawāʾa, wa-l-baḥr azraq.", pt: "A música enche o ar, e o mar é azul." },
    { fr: "في الصَّيْفِ، ديربي بَيْروت يَجْمَعُ المَدينَةَ في مَساءٍ واحِد.", py: "Fī aṣ-ṣayf, dīrbī Bayrūt yajmaʿu al-madīna fī masāʾin wāḥid.", pt: "No verão, o dérbi de Beirute reúne a cidade numa só noite." },
  ],
  bethlehem: [
    { fr: "يَوْمَ الأَحَدِ نَنظُرُ إِلى نَجْمَةِ بَيْتَ لَحْم.", py: "Yawm al-aḥad nanẓuru ilā najmat Bayt Laḥm.", pt: "No domingo olhamos a estrela de Belém." },
    { fr: "أَشْجارُ الزَّيْتونِ قَديمَةٌ، وَالأَمَلُ في قُلوبِنا.", py: "Ashjār az-zaytūn qadīma, wa-l-amal fī qulūbinā.", pt: "As oliveiras são antigas, e a esperança está em nossos corações." },
    { fr: "في الشِّتاءِ، الفِدائِيُّ يَلْعَبُ، وَالنَّجْمَةُ تَلْمَعُ فَوقَ التَّلّ.", py: "Fī ash-shitāʾ, al-Fidāʾī yalʿabu, wa-n-najma talmaʿu fawqa at-tall.", pt: "No inverno, o Fida'i joga, e a estrela brilha sobre a colina." },
  ],
  cairo: [
    { fr: "يَوْمَ الِاثْنَيْنِ نَزورُ الأَهْرامات.", py: "Yawm al-ithnayn nazūru al-ahrāmāt.", pt: "Na segunda-feira visitamos as pirâmides." },
    { fr: "الفَراعِنَةُ بَنَوْها بِمُساعَدَةِ النُّجوم.", py: "Al-farāʿina banawhā bimusāʿadat an-nujūm.", pt: "Os faraós as construíram com a ajuda das estrelas." },
    { fr: "في الرَّبيعِ، نَهْرُ النيلِ يَجْري، وَديربي القاهِرَةِ يَقْتَرِب.", py: "Fī ar-rabīʿ, nahr an-Nīl yajrī, wa-dīrbī al-Qāhira yaqtarib.", pt: "Na primavera o Nilo corre, e o dérbi do Cairo se aproxima." },
  ],
  alexandria: [
    { fr: "يَوْمَ الثُّلاثاءِ نَقْرَأُ في المَكْتَبَة.", py: "Yawm ath-thulāthāʾ naqraʾu fī al-maktaba.", pt: "Na terça-feira lemos na biblioteca." },
    { fr: "كانَتْ فيها أَرْبَعُمِئَةِ أَلْفِ كِتابٍ قَديم.", py: "Kānat fīhā arbaʿumiʾat alf kitāb qadīm.", pt: "Havia nela 400 mil livros antigos." },
    { fr: "مِنْ شُرفَةِ البَحْر، نَراقِبُ القَمَرَ وَالنُّجومَ حَتّى الفَجْر.", py: "Min shurfat al-baḥr, nurāqibu al-qamar wa-n-nujūma ḥattā al-fajr.", pt: "Da varanda do mar, observamos a lua e as estrelas até o amanhecer." },
  ],
  leptismagna: [
    { fr: "يَوْمَ الأَرْبِعاءِ نَسْبَحُ في بَحْرِ ليبيا.", py: "Yawm al-arbiʿāʾ nasbaḥu fī baḥr Lībiyā.", pt: "Na quarta-feira nadamos no mar da Líbia." },
    { fr: "المَسْرَحُ الرّومانِيُّ مُواجِهٌ لِلأَمْواج.", py: "Al-masraḥ ar-rūmāniyy muwājih lil-amwāj.", pt: "O teatro romano está de frente para as ondas." },
    { fr: "في تَمّوز، الماءُ صافٍ، وَالآثارُ تَحْكي أَلْفَيْ سَنَة.", py: "Fī Tammūz, al-māʾ ṣāfin, wa-l-āthār taḥkī alfay sana.", pt: "Em julho, a água é límpida, e as ruínas contam dois mil anos." },
  ],
  algiers: [
    { fr: "يَوْمَ الخَميسِ نَصْعَدُ دَرَجاتِ القَصْبَة.", py: "Yawm al-khamīs naṣʿadu darajāt al-qaṣba.", pt: "Na quinta-feira subimos as escadas da Casbah." },
    { fr: "المَدينَةُ بَيْضاء، وَمِنْ كُلِّ سَطْحٍ نَرى البَحْر.", py: "Al-madīna bayḍāʾ, wa-min kulli saṭḥin narā al-baḥr.", pt: "A cidade é branca, e de cada terraço vemos o mar." },
    { fr: "في أَيلول، الشَّعْبِيُّ يَغْنّي لِلْمَدينَة، وَالفَنانِكُ يَلْعَبون.", py: "Fī Aylūl, ash-shaʿbiyy yaghannī lil-madīna, wa-l-Fannāk yalʿabūn.", pt: "Em setembro, o chaabi canta a cidade, e os Fennecs jogam." },
  ],
  carthage: [
    { fr: "يَوْمَ الجُمُعَةِ نَذْهَبُ إِلى قَرْطاج.", py: "Yawm al-jumʿa nadhhabu ilā Qarṭāj.", pt: "Na sexta-feira vamos a Cartago." },
    { fr: "حَنِّبَعَلُ حَلُمَ هُنا بِعُبورِ الجِبال.", py: "Ḥannibaʿalu ḥaluma hunā bi-ʿubūr al-jibāl.", pt: "Aníbal sonhou aqui em cruzar as montanhas." },
    { fr: "في الشِّتاءِ، البَحْرُ يَهْدَأُ، وَنَحْنُ نَتَذَكَّرُ التّاريخ.", py: "Fī ash-shitāʾ, al-baḥr yahdaʾu, wa-naḥnu natadhakkar at-tārīkh.", pt: "No inverno o mar se acalma, e nós lembramos a história." },
  ],
  fez: [
    { fr: "يَوْمَ السَّبْتِ نَرى الدِّباغاتِ في فاس.", py: "Yawm as-sabt narā ad-dibāghāt fī Fās.", pt: "No sábado vemos os curtumes em Fez." },
    { fr: "جامِعَةُ القَرَوِيّينَ أَقْدَمُ جامِعَةٍ في العالَم.", py: "Jāmiʿat al-Qarawiyyīn aqdam jāmiʿa fī al-ʿālam.", pt: "A Universidade al-Qarawiyyin é a mais antiga do mundo." },
    { fr: "في الرَّبيعِ، الأَيْدي تَصْنَعُ التّاريخَ، وَالشَّمْسُ تُجَفِّفُ الجُلود.", py: "Fī ar-rabīʿ, al-aydī taṣnaʿu at-tārīkh, wa-sh-shams tujaffifu al-julūd.", pt: "Na primavera, as mãos fazem a história, e o sol seca os couros." },
  ],
  marrakesh: [
    { fr: "يَوْمَ الأَحَدِ نَشْتري التُّمورَ في جامِعِ الفَنا.", py: "Yawm al-aḥad nashtari at-tumūr fī Jāmiʿ al-Fanā.", pt: "No domingo compramos tâmaras na Jemaa el-Fna." },
    { fr: "مِنْ بَغْداد إِلى مَرّاكِش، يا لَها مِنْ رِحْلَة!", py: "Min Baghdād ilā Marrākush, yā lahā min riḥla!", pt: "De Bagdá a Marraquexe, que viagem!" },
    { fr: "يَوْمَ الِاثْنَيْنِ نَكْتُبُ الاِمْتِحانَ، وَشُكْرًا لِكُلِّ شَيء.", py: "Yawm al-ithnayn naktubu al-imtiḥān, wa-shukran likulli shayʾ.", pt: "Na segunda-feira escrevemos o exame, e obrigado por tudo." },
  ],
};
