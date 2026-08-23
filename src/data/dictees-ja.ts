/**
 * Cahier de copie — 書き取り (shakutori) em japonês.
 *
 * Cada semana propõe 3 frases (simples → complexa), sempre com romaji
 * acima do modelo para guiar a cópia dos kanas/kanji. Marcadores
 * temporais (dias da semana, meses, estações) + astronomia e futebol.
 */

import type { DicteeLine } from "./dictees-fr";

export const DICTEES_JA: Record<string, DicteeLine[]> = {
  tokyo: [
    { fr: "月曜日、東京に着きます。", py: "Getsuyōbi, Tōkyō ni tsukimasu.", pt: "Na segunda-feira chegamos a Tóquio." },
    { fr: "東京タワーはとても高いです。", py: "Tōkyō Tawā wa totemo takai desu.", pt: "A Torre de Tóquio é muito alta." },
    { fr: "夏、東京は暑いです。夜、空に星が見えます。", py: "Natsu, Tōkyō wa atsui desu. Yoru, sora ni hoshi ga miemasu.", pt: "No verão Tóquio é quente. À noite dá para ver estrelas no céu." },
  ],
  kyoto: [
    { fr: "火曜日、京都を歩きます。", py: "Kayōbi, Kyōto o arukimasu.", pt: "Na terça-feira caminhamos por Quioto." },
    { fr: "金閣寺は金色で、とてもきれいです。", py: "Kinkakuji wa kiniro de, totemo kirei desu.", pt: "O Kinkaku-ji é dourado e muito bonito." },
    { fr: "秋、もみじは赤くなります。お寺は古くて静かです。", py: "Aki, momiji wa akaku narimasu. Otera wa furukute shizuka desu.", pt: "No outono as folhas de bordo ficam vermelhas. Os templos são antigos e serenos." },
  ],
  osaka: [
    { fr: "水曜日、たこ焼きを食べます。", py: "Suiyōbi, takoyaki o tabemasu.", pt: "Na quarta-feira comemos takoyaki." },
    { fr: "大阪の食べ物はおいしいです。", py: "Ōsaka no tabemono wa oishii desu.", pt: "A comida de Osaka é deliciosa." },
    { fr: "日曜日、球場で野球を見ます。みんな大声で歌います。", py: "Nichiyōbi, kyūjō de yakyū o mimasu. Minna ōgoe de utaimasu.", pt: "No domingo assistimos ao beisebol no estádio. Todos cantam em voz alta." },
  ],
  hiroshima: [
    { fr: "木曜日、平和公園に行きます。", py: "Mokuyōbi, Heiwa Kōen ni ikimasu.", pt: "Na quinta-feira vamos ao Parque da Paz." },
    { fr: "原爆ドームは大切な歴史です。", py: "Genbaku Dōmu wa taisetsu na rekishi desu.", pt: "A Cúpula da Bomba Atômica é uma história importante." },
    { fr: "私たちは平和を忘れない。花は春にまた咲きます。", py: "Watashitachi wa heiwa o wasurenai. Hana wa haru ni mata sakimasu.", pt: "Não esquecemos a paz. As flores voltam a florescer na primavera." },
  ],
  fuji: [
    { fr: "金曜日、富士山に登ります。", py: "Kin'yōbi, Fujisan ni noborimasu.", pt: "Na sexta-feira subimos o Monte Fuji." },
    { fr: "富士山は日本で一番高い山です。", py: "Fujisan wa Nihon de ichiban takai yama desu.", pt: "O Fuji é a montanha mais alta do Japão." },
    { fr: "冬の夜、山の上で星がきらきら光ります。", py: "Fuyu no yoru, yama no ue de hoshi ga kirakira hikarimasu.", pt: "Nas noites de inverno as estrelas cintilam no topo da montanha." },
  ],
  sapporo: [
    { fr: "土曜日、雪祭りを見ます。", py: "Doyōbi, Yuki Matsuri o mimasu.", pt: "No sábado vemos o Festival de Neve." },
    { fr: "雪だるまは白くてかわいいです。", py: "Yukidaruma wa shirokute kawaii desu.", pt: "O boneco de neve é branco e fofo." },
    { fr: "二月、札幌は寒いです。でも雪の彫刻はきれいです。", py: "Nigatsu, Sapporo wa samui desu. Demo yuki no chōkoku wa kirei desu.", pt: "Em fevereiro Sapporo é fria. Mas as esculturas de neve são lindas." },
  ],
  nara: [
    { fr: "日曜日、鹿に会います。", py: "Nichiyōbi, shika ni aimasu.", pt: "No domingo encontramos os cervos." },
    { fr: "奈良の鹿は優しくて面白いです。", py: "Nara no shika wa yasashikute omoshiroi desu.", pt: "Os cervos de Nara são gentis e divertidos." },
    { fr: "東大寺の大仏は千三百年の歴史があります。", py: "Tōdaiji no Daibutsu wa sen-sanbyaku-nen no rekishi ga arimasu.", pt: "O Grande Buda do Tōdai-ji tem 1.300 anos de história." },
  ],
  okinawa: [
    { fr: "月曜日、海で泳ぎます。", py: "Getsuyōbi, umi de oyogimasu.", pt: "Na segunda-feira nadamos no mar." },
    { fr: "沖縄の海は青くて温かいです。", py: "Okinawa no umi wa aokute atatakai desu.", pt: "O mar de Okinawa é azul e quente." },
    { fr: "夏、サンゴ礁の魚と一緒に泳ぎます。楽しいです。", py: "Natsu, sangoshō no sakana to issho ni oyogimasu. Tanoshii desu.", pt: "No verão nadamos com os peixes do recife de coral. É divertido." },
  ],
  sanfrancisco: [
    { fr: "火曜日、金門橋を渡ります。", py: "Kayōbi, Kinkaku-kyō o watarimasu.", pt: "Na terça-feira cruzamos a Golden Gate." },
    { fr: "橋は赤くて、とても長いです。", py: "Hashi wa akakute, totemo nagai desu.", pt: "A ponte é vermelha e muito longa." },
    { fr: "九月、霧は朝に町を包みます。午後は晴れます。", py: "Kugatsu, kiri wa asa ni machi o tsutsumimasu. Gogo wa haremasu.", pt: "Em setembro a névoa envolve a cidade de manhã. À tarde abre o sol." },
  ],
  losangeles: [
    { fr: "水曜日、映画の町を歩きます。", py: "Suiyōbi, eiga no machi o arukimasu.", pt: "Na quarta-feira caminhamos pela cidade do cinema." },
    { fr: "ハリウッドの看板は有名です。", py: "Hariuddo no kanban wa yūmei desu.", pt: "O letreiro de Hollywood é famoso." },
    { fr: "夜、丘の上から町の光が星のように見えます。", py: "Yoru, oka no ue kara machi no hikari ga hoshi no yō ni miemasu.", pt: "À noite, do alto da colina, as luzes da cidade parecem estrelas." },
  ],
  seattle: [
    { fr: "木曜日、コーヒーを飲みます。", py: "Mokuyōbi, kōhī o nomimasu.", pt: "Na quinta-feira bebemos café." },
    { fr: "シアトルの雨は有名です。", py: "Shiatoru no ame wa yūmei desu.", pt: "A chuva de Seattle é famosa." },
    { fr: "宇宙針から雲と飛行機と星を見ます。", py: "Uchūshin kara kumo to hikōki to hoshi o mimasu.", pt: "Da Space Needle vemos nuvens, aviões e estrelas." },
  ],
  newyork: [
    { fr: "金曜日、タイムズスクエアに行きます。", py: "Kin'yōbi, Taimuzu Sukuea ni ikimasu.", pt: "Na sexta-feira vamos à Times Square." },
    { fr: "ニューヨークは大きくて速いです。", py: "Nyūyōku wa ōkikute hayai desu.", pt: "Nova York é grande e rápida." },
    { fr: "十二月、クリスマスツリーは百万の星のように光ります。", py: "Jūnigatsu, Kurisumasu Tsurī wa hyakuman no hoshi no yō ni hikarimasu.", pt: "Em dezembro a árvore de Natal brilha como um milhão de estrelas." },
  ],
  dc: [
    { fr: "土曜日、桜を見ます。", py: "Doyōbi, sakura o mimasu.", pt: "No sábado vemos as cerejeiras." },
    { fr: "桜は白くてきれいです。", py: "Sakura wa shirokute kirei desu.", pt: "As cerejeiras são brancas e bonitas." },
    { fr: "日曜日、試験を書きます。それから友達と桜の下で祝います。", py: "Nichiyōbi, shiken o kakimasu. Sorekara tomodachi to sakura no shita de iwaimasu.", pt: "No domingo escrevemos a prova. Depois celebramos com os amigos sob as cerejeiras." },
  ],
};
