/**
 * Cahier de copie — corpus of Persian dictations (دیکته).
 *
 * Each week offers 3 sentences ordered from simple to complex, reusing the
 * week's vocabulary and weaving in time markers (weekdays, months, seasons)
 * plus astronomy, football and Persian history to anchor the A1 lexicon.
 */

export const DICTEES_FA: Record<string, { fr: string; pt: string }[]> = {
  tehran: [
    { fr: "دوشنبه به تهران می‌رسیم.", pt: "Na segunda-feira chegamos a Teerã." },
    { fr: "شهر بزرگ است و کوه‌ها بلند هستند.", pt: "A cidade é grande e as montanhas são altas." },
    { fr: "در زمستان برج میلاد زیر آسمان خاکستری می‌درخشد.", pt: "No inverno a Torre Milad brilha sob o céu cinzento." },
  ],
  tabriz: [
    { fr: "سه‌شنبه در بازار تبریز غذا می‌خوریم.", pt: "Na terça-feira comemos no bazar de Tabriz." },
    { fr: "بازار قدیمی است و فرش‌ها رنگارنگ هستند.", pt: "O bazar é antigo e os tapetes são coloridos." },
    { fr: "در پاییز مردم چای می‌نوشند و دربارهٔ فوتبال صحبت می‌کنند.", pt: "No outono as pessoas bebem chá e falam de futebol." },
  ],
  rasht: [
    { fr: "چهارشنبه کنار دریای خزر قدم می‌زنیم.", pt: "Na quarta-feira caminhamos à beira do mar Cáspio." },
    { fr: "هوا بارانی است و جنگل سبز است.", pt: "O tempo está chuvoso e a floresta é verde." },
    { fr: "در بهار برنج در شالیزارها رشد می‌کند و پرندگان آواز می‌خوانند.", pt: "Na primavera o arroz cresce nos campos e os pássaros cantam." },
  ],
  isfahan: [
    { fr: "پنج‌شنبه در میدان نقش جهان قدم می‌زنیم.", pt: "Na quinta-feira passeamos na praça Naqsh-e Jahan." },
    { fr: "مسجد آبی است و میدان بزرگ است.", pt: "A mesquita é azul e a praça é grande." },
    { fr: "نصف جهان، می‌گویند مردم؛ و راست می‌گویند.", pt: "«Metade do mundo», dizem as pessoas; e dizem a verdade." },
  ],
  yazd: [
    { fr: "جمعه در کویر یزد ستاره‌ها را می‌بینیم.", pt: "Na sexta-feira vemos as estrelas no deserto de Yazd." },
    { fr: "بادگیرها قدیمی هستند و خانه‌ها گلی.", pt: "As torres de vento são antigas e as casas são de barro." },
    { fr: "در تابستان شب‌های کویر خنک است و آسمان پر از ستاره است.", pt: "No verão as noites do deserto são frescas e o céu está cheio de estrelas." },
  ],
  persepolis: [
    { fr: "شنبه به تخت جمشید می‌رویم.", pt: "No sábado vamos a Persépolis." },
    { fr: "ستون‌های سنگی بلند و قدیمی هستند.", pt: "As colunas de pedra são altas e antigas." },
    { fr: "دو هزار و پانصد سال پیش پادشاهان اینجا جشن می‌گرفتند.", pt: "Há 2500 anos os reis celebravam aqui." },
  ],
  shiraz: [
    { fr: "یکشنبه در باغ ارم شعر می‌خوانیم.", pt: "No domingo lemos poesia no jardim Eram." },
    { fr: "حافظ و سعدی شاعران شیراز هستند.", pt: "Hafez e Saadi são os poetas de Shiraz." },
    { fr: "در بهار بوی گل‌های نارنج در همهٔ شهر می‌پیچد.", pt: "Na primavera o cheiro das flores de laranjeira se espalha por toda a cidade." },
  ],
  mashhad: [
    { fr: "دوشنبه در مشهد راه می‌رویم و سؤال می‌پرسیم.", pt: "Na segunda-feira andamos por Mashhad e fazemos perguntas." },
    { fr: "حرم بزرگ است و گنبد طلایی می‌درخشد.", pt: "O santuário é grande e a cúpula dourada brilha." },
    { fr: "زائران از همهٔ شهرها می‌آیند و چای می‌نوشند.", pt: "Os peregrinos vêm de todas as cidades e bebem chá." },
  ],
  herat: [
    { fr: "سه‌شنبه در هرات مناره‌ها را می‌بینیم.", pt: "Na terça-feira vemos os minaretes em Herat." },
    { fr: "مناره‌های آبی بلند و زیبا هستند.", pt: "Os minaretes azuis são altos e bonitos." },
    { fr: "هرات شهر علم و شعر است؛ مردم مهربان هستند.", pt: "Herat é a cidade da ciência e da poesia; as pessoas são bondosas." },
  ],
  balkh: [
    { fr: "چهارشنبه در بلخ با مردم صحبت می‌کنیم.", pt: "Na quarta-feira conversamos com as pessoas em Balkh." },
    { fr: "بلخ مادر شهرهاست و خیلی قدیمی است.", pt: "Balkh é a mãe das cidades e é muito antiga." },
    { fr: "مولانا اینجا به دنیا آمد و شعرهایش در همهٔ دنیا خوانده می‌شود.", pt: "Rumi nasceu aqui e os seus poemas são lidos no mundo inteiro." },
  ],
  dushanbe: [
    { fr: "پنج‌شنبه در دوشنبه بازار می‌رویم.", pt: "Na quinta-feira vamos ao mercado em Dushanbe." },
    { fr: "میوه‌ها شیرین هستند و مردم مهمان‌نواز.", pt: "As frutas são doces e as pessoas hospitaleiras." },
    { fr: "روز دوشنبه روز بازار است؛ به همین دلیل اسم شهر دوشنبه است.", pt: "Segunda-feira é dia de mercado; por isso a cidade se chama Dushanbe («segunda-feira»)." },
  ],
  samarkand: [
    { fr: "جمعه از رصدخانهٔ اولغ‌بیگ دیدن می‌کنیم.", pt: "Na sexta-feira visitamos o observatório de Ulugh Beg." },
    { fr: "اولغ‌بیگ ستاره‌ها را اندازه می‌گرفت.", pt: "Ulugh Beg media as estrelas." },
    { fr: "ششصد سال پیش ستاره‌شناسان سمرقند نقشهٔ آسمان را می‌ساختند.", pt: "Há seiscentos anos os astrónomos de Samarcanda construíam o mapa do céu." },
  ],
  tehranfinale: [
    { fr: "شنبه به برج آزادی می‌رویم.", pt: "No sábado vamos à Torre Azadi." },
    { fr: "برج سفید و بلند است و شهر زیر آن بیدار است.", pt: "A torre é branca e alta, e a cidade desperta sob ela." },
    { fr: "یکشنبه امتحان می‌نویسیم و با دوستان جشن می‌گیریم.", pt: "No domingo fazemos o exame e celebramos com os amigos." },
  ],
};
