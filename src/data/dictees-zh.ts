/**
 * Cahier de copie — 中文听写 / 抄写语料。
 *
 * Cada semana propõe 3 frases (simples → complexa) com vocabulário da rota,
 * dias da semana (星期一…星期日), meses e estações (春 夏 秋 冬),
 * além de astronomia 天文 e futebol 足球. O campo `py` traz o pinyin
 * como apoio de leitura e pronúncia.
 */

export const DICTEES_ZH: Record<string, { fr: string; pt: string; py?: string }[]> = {
  beijing: [
    { fr: "星期一，我们到北京。", pt: "Na segunda-feira chegamos a Pequim.", py: "Xīngqīyī, wǒmen dào Běijīng." },
    { fr: "故宫很大，也很漂亮。", pt: "A Cidade Proibida é grande e também muito bonita.", py: "Gùgōng hěn dà, yě hěn piàoliang." },
    { fr: "秋天的北京，天空很高，星星很多。", pt: "No outono em Pequim, o céu é alto e há muitas estrelas.", py: "Qiūtiān de Běijīng, tiānkōng hěn gāo, xīngxing hěn duō." },
  ],
  shanghai: [
    { fr: "星期二，我们喝咖啡。", pt: "Na terça-feira tomamos café.", py: "Xīngqī'èr, wǒmen hē kāfēi." },
    { fr: "外滩的晚上，灯很多。", pt: "À noite no Bund, há muitas luzes.", py: "Wàitān de wǎnshang, dēng hěn duō." },
    { fr: "上海队赢了两比零，大家都很高兴。", pt: "O time de Xangai venceu por dois a zero, todos ficaram felizes.", py: "Shànghǎi duì yíng le liǎng bǐ líng, dàjiā dōu hěn gāoxìng." },
  ],
  xian: [
    { fr: "星期三，我们吃饺子。", pt: "Na quarta-feira comemos jiaozi.", py: "Xīngqīsān, wǒmen chī jiǎozi." },
    { fr: "兵马俑有八千个，真了不起。", pt: "Há oito mil Guerreiros de Terracota, incrível.", py: "Bīngmǎyǒng yǒu bā qiān ge, zhēn liǎobuqǐ." },
    { fr: "西安的冬天很冷，但是历史很热。", pt: "O inverno de Xi'an é frio, mas a história é quente.", py: "Xī'ān de dōngtiān hěn lěng, dànshì lìshǐ hěn rè." },
  ],
  chengdu: [
    { fr: "星期四，我们看大熊猫。", pt: "Na quinta-feira vemos os pandas.", py: "Xīngqīsì, wǒmen kàn dà xióngmāo." },
    { fr: "火锅很好吃，我的家很温暖。", pt: "O hotpot é delicioso, minha casa é acolhedora.", py: "Huǒguō hěn hǎochī, wǒ de jiā hěn wēnnuǎn." },
    { fr: "春天，成都的花开了，足球队也赢了。", pt: "Na primavera, as flores de Chengdu abrem e o time também venceu.", py: "Chūntiān, Chéngdū de huā kāi le, zúqiúduì yě yíng le." },
  ],
  pingtang: [
    { fr: "星期五，我们去看望远镜。", pt: "Na sexta-feira vamos ver o telescópio.", py: "Xīngqīwǔ, wǒmen qù kàn wàngyuǎnjìng." },
    { fr: "FAST 是世界最大的望远镜。", pt: "O FAST é o maior telescópio do mundo.", py: "FAST shì shìjiè zuì dà de wàngyuǎnjìng." },
    { fr: "夜里很安静，月亮和星星都在天上。", pt: "À noite é silencioso, a lua e as estrelas estão no céu.", py: "Yèlǐ hěn ānjìng, yuèliang hé xīngxing dōu zài tiān shàng." },
  ],
  guilin: [
    { fr: "星期六，我们坐船。", pt: "No sábado andamos de barco.", py: "Xīngqīliù, wǒmen zuò chuán." },
    { fr: "桂林的山像画一样美。", pt: "As montanhas de Guilin são belas como uma pintura.", py: "Guìlín de shān xiàng huà yíyàng měi." },
    { fr: "夏天的漓江很蓝，天气很热。", pt: "No verão o rio Li é azul e o clima é quente.", py: "Xiàtiān de Lí Jiāng hěn lán, tiānqì hěn rè." },
  ],
  harbin: [
    { fr: "星期日，雪很大。", pt: "No domingo a neve é forte.", py: "Xīngqīrì, xuě hěn dà." },
    { fr: "冰灯节真漂亮，像星星在地上。", pt: "O festival de lanternas de gelo é lindo, como estrelas no chão.", py: "Bīngdēng jié zhēn piàoliang, xiàng xīngxing zài dì shàng." },
    { fr: "一月，哈尔滨很冷，可是我们很快乐。", pt: "Em janeiro, Harbin é fria, mas nós estamos felizes.", py: "Yīyuè, Hā'ěrbīn hěn lěng, kěshì wǒmen hěn kuàilè." },
  ],
  guangzhou: [
    { fr: "星期一，我们去市场。", pt: "Na segunda-feira vamos ao mercado.", py: "Xīngqīyī, wǒmen qù shìchǎng." },
    { fr: "点心很好吃，这个多少钱？", pt: "O dim sum é gostoso, quanto é isso?", py: "Diǎnxin hěn hǎochī, zhège duōshao qián?" },
    { fr: "广州的秋天不冷，足球比赛很多人看。", pt: "O outono de Guangzhou não é frio, muita gente vê a partida.", py: "Guǎngzhōu de qiūtiān bù lěng, zúqiú bǐsài hěn duō rén kàn." },
  ],
  pyongyang: [
    { fr: "星期二，地铁站很深。", pt: "Na terça-feira, a estação de metrô é muito funda.", py: "Xīngqī'èr, dìtiě zhàn hěn shēn." },
    { fr: "请问，大同江在哪里？", pt: "Com licença, onde fica o rio Taedong?", py: "Qǐngwèn, Dàtóng Jiāng zài nǎlǐ?" },
    { fr: "平壤的春天，樱桃树开花了。", pt: "Na primavera de Pyongyang, as cerejeiras floresceram.", py: "Píngrǎng de chūntiān, yīngtáo shù kāihuā le." },
  ],
  kumgangsan: [
    { fr: "星期三，我们爬山。", pt: "Na quarta-feira subimos a montanha.", py: "Xīngqīsān, wǒmen pá shān." },
    { fr: "金刚山有一万两千座山峰。", pt: "Kumgangsan tem doze mil picos.", py: "Jīngāng Shān yǒu yí wàn liǎng qiān zuò shānfēng." },
    { fr: "晚上，云海上面全是星星。", pt: "À noite, acima do mar de nuvens, tudo são estrelas.", py: "Wǎnshang, yúnhǎi shàngmiàn quán shì xīngxing." },
  ],
  hanoi: [
    { fr: "星期四，我们吃河粉。", pt: "Na quinta-feira comemos phở.", py: "Xīngqīsì, wǒmen chī héfěn." },
    { fr: "不要辣，谢谢！这碗粉真好吃。", pt: "Sem picante, obrigado! Esta tigela de phở é deliciosa.", py: "Bú yào là, xièxie! Zhè wǎn fěn zhēn hǎochī." },
    { fr: "河内的十月，天气不热，街上很多人。", pt: "Em outubro em Hanói, não faz calor e há muita gente na rua.", py: "Hénèi de shíyuè, tiānqì bú rè, jiē shàng hěn duō rén." },
  ],
  halong: [
    { fr: "星期五，我们坐船去下龙湾。", pt: "Na sexta-feira vamos de barco à baía de Halong.", py: "Xīngqīwǔ, wǒmen zuò chuán qù Xiàlóng Wān." },
    { fr: "海里有一个岛，岛上有一条龙的故事。", pt: "No mar há uma ilha, e na ilha há a história de um dragão.", py: "Hǎi lǐ yǒu yí ge dǎo, dǎo shàng yǒu yì tiáo lóng de gùshi." },
    { fr: "八月，海很蓝，鱼很多，星星也很亮。", pt: "Em agosto, o mar é azul, há muitos peixes e as estrelas brilham.", py: "Bāyuè, hǎi hěn lán, yú hěn duō, xīngxing yě hěn liàng." },
  ],
  hoian: [
    { fr: "星期六，会安的灯笼真美。", pt: "No sábado, as lanternas de Hoi An são lindas.", py: "Xīngqīliù, Huì'ān de dēnglong zhēn měi." },
    { fr: "你们是我的朋友，我爱你们。", pt: "Vocês são meus amigos, eu amo vocês.", py: "Nǐmen shì wǒ de péngyou, wǒ ài nǐmen." },
    { fr: "星期日我们写考试，然后一起庆祝九十天。", pt: "No domingo fazemos a prova e depois celebramos juntos os noventa dias.", py: "Xīngqīrì wǒmen xiě kǎoshì, ránhòu yìqǐ qìngzhù jiǔshí tiān." },
  ],
};
