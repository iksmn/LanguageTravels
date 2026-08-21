/**
 * Os 250 verbos essenciais do francês — base: lista dos verbos mais conjugados
 * do Reverso Conjugator (https://conjugator.reverso.net/index-french-1-250.html).
 * Cada verbo traz o grupo e a tradução; o conjugador gera o PRÉSENT complet.
 */

export type VerbGroup = 1 | 2 | 3;

export interface Verb {
  inf: string;
  g: VerbGroup;
  pt: string;
}

export const VERB_SOURCE_URL = "https://conjugator.reverso.net/index-french-1-250.html";

export function reversoUrl(inf: string): string {
  const base = inf.replace(/^s'|^se /, "").replace(/'/g, "-");
  return `https://conjugator.reverso.net/conjugation-french-verb-${base}.html`;
}

const V = (inf: string, g: VerbGroup, pt: string): Verb => ({ inf, g, pt });

/* ------------------------------------------------------------------ */
/*  A base dos 250 (ordenação inspirada na frequência do Reverso)      */
/* ------------------------------------------------------------------ */

const RAW: Verb[] = [
  V("être", 3, "ser, estar"), V("avoir", 3, "ter"), V("faire", 3, "fazer"), V("aller", 3, "ir"), V("dire", 3, "dizer"),
  V("pouvoir", 3, "poder"), V("vouloir", 3, "querer"), V("savoir", 3, "saber"), V("voir", 3, "ver"), V("venir", 3, "vir"),
  V("devoir", 3, "dever"), V("prendre", 3, "pegar, levar"), V("trouver", 1, "encontrar"), V("donner", 1, "dar"), V("parler", 1, "falar"),
  V("aimer", 1, "amar, gostar"), V("passer", 1, "passar"), V("mettre", 3, "colocar, pôr"), V("tenir", 3, "segurar, manter"), V("porter", 1, "carregar, vestir"),
  V("regarder", 1, "olhar"), V("demander", 1, "pedir, perguntar"), V("rester", 1, "ficar, permanecer"), V("répondre", 3, "responder"), V("entendre", 3, "ouvir"),
  V("appeler", 1, "chamar, ligar"), V("permettre", 3, "permitir"), V("penser", 1, "pensar"), V("considérer", 1, "considerar"), V("croire", 3, "acreditar"),
  V("sentir", 3, "sentir, cheirar"), V("rendre", 3, "devolver"), V("servir", 3, "servir"), V("sortir", 3, "sair"), V("partir", 3, "partir, ir embora"),
  V("perdre", 3, "perder"), V("montrer", 1, "mostrar"), V("arriver", 1, "chegar"), V("changer", 1, "mudar"), V("vivre", 3, "viver"),
  V("comprendre", 3, "compreender"), V("attendre", 3, "esperar"), V("écrire", 3, "escrever"), V("tomber", 1, "cair"), V("offrir", 3, "oferecer"),
  V("essayer", 1, "tentar"), V("chercher", 1, "procurar"), V("choisir", 2, "escolher"), V("exister", 1, "existir"), V("refuser", 1, "recusar"),
  V("connaître", 3, "conhecer"), V("travailler", 1, "trabalhar"), V("représenter", 1, "representar"), V("assurer", 1, "assegurar"), V("suivre", 3, "seguir"),
  V("ouvrir", 3, "abrir"), V("gagner", 1, "ganhar"), V("paraître", 3, "parecer"), V("accepter", 1, "aceitar"), V("recevoir", 3, "receber"),
  V("agir", 2, "agir"), V("rappeler", 1, "lembrar, ligar de novo"), V("créer", 1, "criar"), V("apprendre", 3, "aprender"), V("jouer", 1, "jogar, tocar"),
  V("reconnaître", 3, "reconhecer"), V("définir", 2, "definir"), V("adopter", 1, "adotar"), V("mourir", 3, "morrer"), V("réaliser", 1, "realizar"),
  V("produire", 3, "produzir"), V("former", 1, "formar"), V("lire", 3, "ler"), V("entrer", 1, "entrar"), V("proposer", 1, "propor"),
  V("vendre", 3, "vender"), V("occuper", 1, "ocupar"), V("revenir", 3, "voltar"), V("exiger", 1, "exigir"), V("devenir", 3, "tornar-se"),
  V("décider", 1, "decidir"), V("appliquer", 1, "aplicar"), V("courir", 3, "correr"), V("organiser", 1, "organizar"), V("conduire", 3, "dirigir"),
  V("valoir", 3, "valer"), V("engager", 1, "contratar, engajar"), V("expliquer", 1, "explicar"), V("tourner", 1, "virar, girar"), V("installer", 1, "instalar"),
  V("payer", 1, "pagar"), V("rencontrer", 1, "encontrar, conhecer"), V("couper", 1, "cortar"), V("intéresser", 1, "interessar"), V("sembler", 1, "parecer"),
  V("présenter", 1, "apresentar"), V("acheter", 1, "comprar"), V("commencer", 1, "começar"), V("monter", 1, "subir, montar"), V("laisser", 1, "deixar"),
  V("utiliser", 1, "usar, utilizar"), V("poursuivre", 3, "prosseguir"), V("contenir", 3, "conter"), V("ajouter", 1, "acrescentar"), V("préparer", 1, "preparar"),
  V("éviter", 1, "evitar"), V("annoncer", 1, "anunciar"), V("participer", 1, "participar"), V("découvrir", 3, "descobrir"), V("arrêter", 1, "parar"),
  V("toucher", 1, "tocar"), V("remplacer", 1, "substituir"), V("atteindre", 3, "alcançar"), V("écouter", 1, "escutar"), V("retirer", 1, "retirar"),
  V("appartenir", 3, "pertencer"), V("réussir", 2, "conseguir, ter êxito"), V("oublier", 1, "esquecer"), V("manger", 1, "comer"), V("boire", 3, "beber"),
  V("plaire", 3, "agradar"), V("protéger", 1, "proteger"), V("lever", 1, "levantar"), V("maintenir", 3, "manter"), V("naître", 3, "nascer"),
  V("soutenir", 3, "apoiar, sustentar"), V("étudier", 1, "estudar"), V("traiter", 1, "tratar"), V("exposer", 1, "expor"), V("lancer", 1, "lançar"),
  V("partager", 1, "compartilhar"), V("goûter", 1, "provar, saborear"), V("finir", 2, "terminar, acabar"), V("remplir", 2, "encher, preencher"), V("réunir", 2, "reunir"),
  V("grandir", 2, "crescer"), V("rougir", 2, "corar, ficar vermelho"), V("réfléchir", 2, "refletir, pensar"), V("réagir", 2, "reagir"), V("établir", 2, "estabelecer"),
  V("punir", 2, "punir"), V("bâtir", 2, "construir"), V("obéir", 2, "obedecer"), V("saisir", 2, "agarrar"), V("franchir", 2, "cruzar, transpor"),
  V("avertir", 2, "avisar"), V("garantir", 2, "garantir"), V("fournir", 2, "fornecer"), V("investir", 2, "investir"), V("engloutir", 2, "devorar"),
  V("dormir", 3, "dormir"), V("fuir", 3, "fugir"), V("rire", 3, "rir"), V("sourire", 3, "sorrir"), V("nuire", 3, "prejudicar"),
  V("cuire", 3, "cozinhar, assar"), V("traduire", 3, "traduzir"), V("construire", 3, "construir"), V("réduire", 3, "reduzir"), V("introduire", 3, "introduzir"),
  V("suffire", 3, "bastar"), V("conclure", 3, "concluir"), V("résoudre", 3, "resolver"), V("craindre", 3, "temer"), V("peindre", 3, "pintar"),
  V("joindre", 3, "juntar, contatar"), V("rejoindre", 3, "reencontrar"), V("éteindre", 3, "apagar"), V("plaindre", 3, "lamentar"), V("vaincre", 3, "vencer"),
  V("battre", 3, "bater"), V("combattre", 3, "combater"), V("abattre", 3, "derrubar"), V("admettre", 3, "admitir"), V("promettre", 3, "prometer"),
  V("soumettre", 3, "submeter"), V("transmettre", 3, "transmitir"), V("commettre", 3, "cometer"), V("omettre", 3, "omitir"), V("descendre", 3, "descer"),
  V("défendre", 3, "defender"), V("prétendre", 3, "pretender"), V("surprendre", 3, "surpreender"), V("entreprendre", 3, "empreender"), V("répandre", 3, "espalhar"),
  V("fondre", 3, "derreter"), V("confondre", 3, "confundir"), V("mordre", 3, "morder"), V("tordre", 3, "torcer"), V("suspendre", 3, "suspender"),
  V("distraire", 3, "distrair"), V("taire", 3, "calar"), V("satisfaire", 3, "satisfazer"), V("survivre", 3, "sobreviver"), V("prévoir", 3, "prever"),
  V("revoir", 3, "rever"), V("falloir", 3, "ser preciso"), V("pleuvoir", 3, "chover"), V("mouvoir", 3, "mover"), V("émouvoir", 3, "emocionar"),
  V("apercevoir", 3, "perceber, avistar"), V("concevoir", 3, "conceber"), V("percevoir", 3, "perceber, cobrar"), V("s'asseoir", 3, "sentar-se"), V("se souvenir", 3, "lembrar-se"),
  V("équivaloir", 3, "equivaler"), V("prévaloir", 3, "prevalecer"), V("parvenir", 3, "conseguir, chegar"), V("convenir", 3, "convir, combinar"), V("intervenir", 3, "intervir"),
  V("détenir", 3, "deter"), V("retenir", 3, "reter"), V("obtenir", 3, "obter"), V("entretenir", 3, "conservar, manter"), V("reprendre", 3, "retomar"),
  V("disparaître", 3, "desaparecer"), V("s'abstenir", 3, "abster-se"), V("acquérir", 3, "adquirir"), V("conquérir", 3, "conquistar"), V("cueillir", 3, "colher"),
  V("accueillir", 3, "acolher"), V("recueillir", 3, "recolher"), V("souffrir", 3, "sofrer"), V("couvrir", 3, "cobrir"), V("mentir", 3, "mentir"),
  V("consentir", 3, "consentir"), V("convertir", 3, "converter"), V("divertir", 3, "divertir"), V("séduire", 3, "seduzir"), V("flirter", 1, "flertar, paquerar"),
  V("embrasser", 1, "beijar, abraçar"), V("blottir", 2, "aninhar-se (se ~)"), V("jeter", 1, "jogar, lançar"), V("souhaiter", 1, "desejar"), V("espérer", 1, "ter esperança"),
  V("préférer", 1, "preferir"), V("rêver", 1, "sonhar"), V("admirer", 1, "admirar"), V("raconter", 1, "contar (história)"), V("remercier", 1, "agradecer"),
  V("saluer", 1, "cumprimentar"), V("inviter", 1, "convidar"), V("fêter", 1, "festejar"), V("célébrer", 1, "celebrar"), V("nager", 1, "nadar"),
  V("skier", 1, "esquiar"), V("bronzer", 1, "bronzear-se"), V("habiter", 1, "morar"), V("traverser", 1, "atravessar"), V("nettoyer", 1, "limpar"),
  V("danser", 1, "dançar"), V("chanter", 1, "cantar"), V("marcher", 1, "caminhar, funcionar"), V("voyager", 1, "viajar"), V("visiter", 1, "visitar"),
  V("compter", 1, "contar, calcular"), V("envoyer", 3, "enviar"), V("appuyer", 1, "apoiar, apertar"), V("ennuyer", 1, "entediar"), V("employer", 1, "empregar"),
  V("renvoyer", 3, "devolver, despedir"), V("tutoyer", 1, "tratar por tu"), V("vouvoyer", 1, "tratar por vous"), V("épeler", 1, "soletrar"), V("projeter", 1, "projetar"),
];

const seen = new Set<string>();
const DEDUPED: Verb[] = [];
for (const v of RAW) {
  if (!seen.has(v.inf)) {
    seen.add(v.inf);
    DEDUPED.push(v);
  }
}
export const VERB_LIST: Verb[] = DEDUPED.slice(0, 250);
export const VERB_MAP: Record<string, Verb> = Object.fromEntries(VERB_LIST.map((v) => [v.inf, v]));

export const GROUP_LABEL: Record<VerbGroup, string> = {
  1: "1ᵉʳ groupe · -er",
  2: "2ᵉ groupe · -ir",
  3: "3ᵉ groupe · irréguliers",
};
export const GROUP_COLOR: Record<VerbGroup, string> = { 1: "#0e8f8b", 2: "#e8930c", 3: "#d7263d" };

export const PRONOUNS = ["je", "tu", "il/elle", "nous", "vous", "ils/elles"];
export const IMPERSONAL = new Set(["falloir", "pleuvoir"]);

/* ------------------------------------------------------------------ */
/*  Tabelas de irregulares (présent de l'indicatif)                    */
/* ------------------------------------------------------------------ */

const IRREG: Record<string, string> = {
  être: "suis,es,est,sommes,êtes,sont",
  avoir: "ai,as,a,avons,avez,ont",
  faire: "fais,fais,fait,faisons,faites,font",
  aller: "vais,vas,va,allons,allez,vont",
  dire: "dis,dis,dit,disons,dites,disent",
  pouvoir: "peux,peux,peut,pouvons,pouvez,peuvent",
  vouloir: "veux,veux,veut,voulons,voulez,veulent",
  savoir: "sais,sais,sait,savons,savez,savent",
  voir: "vois,vois,voit,voyons,voyez,voient",
  venir: "viens,viens,vient,venons,venez,viennent",
  devoir: "dois,dois,doit,devons,devez,doivent",
  prendre: "prends,prends,prend,prenons,prenez,prennent",
  tenir: "tiens,tiens,tient,tenons,tenez,tiennent",
  croire: "crois,crois,croit,croyons,croyez,croient",
  valoir: "vaux,vaux,vaut,valons,valez,valent",
  boire: "bois,bois,boit,buvons,buvez,boivent",
  recevoir: "reçois,reçois,reçoit,recevons,recevez,reçoivent",
  falloir: ",,faut,,,",
  pleuvoir: ",,pleut,,,",
  mouvoir: "meus,meus,meut,mouvons,mouvez,meuvent",
  émouvoir: "émeus,émeus,émeut,émouvons,émouvez,émeuvent",
  apercevoir: "aperçois,aperçois,aperçoit,apercevons,apercevez,aperçoivent",
  concevoir: "conçois,conçois,conçoit,concevons,concevez,conçoivent",
  percevoir: "perçois,perçois,perçoit,percevons,percevez,perçoivent",
  asseoir: "assieds,assieds,assied,asseyons,asseyez,asseyent",
  équivaloir: "équivaux,équivaux,équivaut,équivalons,équivalez,équivalent",
  prévaloir: "prévaux,prévaux,prévaut,prévalons,prévalez,prévalent",
  fuir: "fuis,fuis,fuit,fuyons,fuyez,fuient",
  vaincre: "vaincs,vaincs,vainc,vainquons,vainquez,vainquent",
  résoudre: "résous,résous,résout,résolvons,résolvez,résolvent",
  bouillir: "bous,bous,bout,bouillons,bouillez,bouillent",
  acquérir: "acquiers,acquiers,acquiert,acquérons,acquérez,acquièrent",
  conquérir: "conquiers,conquiers,conquiert,conquérons,conquérez,conquièrent",
  lire: "lis,lis,lit,lisons,lisez,lisent",
  élire: "élis,élis,élit,élisons,élisez,élisent",
  écrire: "écris,écris,écrit,écrivons,écrivez,écrivent",
  inscrire: "inscris,inscris,inscrit,inscrivons,inscrivez,inscrivent",
  décrire: "décris,décris,décrit,décrivons,décrivez,décrivent",
  prescrire: "prescris,prescris,prescrit,prescrivons,prescrivez,prescrivent",
  satisfaire: "satisfais,satisfais,satisfait,satisfaisons,satisfaites,satisfont",
  prévoir: "prévois,prévois,prévoit,prévoyons,prévoyez,prévoient",
  revoir: "revois,revois,revoit,revoyons,revoyez,revoient",
  plaire: "plais,plais,plaît,plaisons,plaisez,plaisent",
  taire: "tais,tais,tait,taisons,taisez,taisent",
  distraire: "distrais,distrais,distrait,distrayons,distrayez,distraient",
  vivre: "vis,vis,vit,vivons,vivez,vivent",
  survivre: "survis,survis,survit,survivons,survivez,survivent",
  suivre: "suis,suis,suit,suivons,suivez,suivent",
  conclure: "conclus,conclus,conclut,concluons,concluez,concluent",
  suffire: "suffis,suffis,suffit,suffisons,suffisez,suffisent",
  sentir: "sens,sens,sent,sentons,sentez,sentent",
  sortir: "sors,sors,sort,sortons,sortez,sortent",
  partir: "pars,pars,part,partons,partez,partent",
  dormir: "dors,dors,dort,dormons,dormez,dorment",
  courir: "cours,cours,court,courons,courez,courent",
  mourir: "meurs,meurs,meurt,mourons,mourez,meurent",
  mentir: "mens,mens,ment,mentons,mentez,mentent",
  consentir: "consens,consens,consent,consentons,consentez,consentent",
  servir: "sers,sers,sert,servons,servez,servent",
};

/* ------------------------------------------------------------------ */
/*  Conjugador (présent de l'indicatif)                                */
/* ------------------------------------------------------------------ */

const VOWEL = /^[aeéèêëiîoôœuûhy]/i;

const È_STEMS = new Set([
  "acheter", "lever", "peser", "geler", "peler", "modeler", "celer", "haleter",
  "marteler", "espérer", "préférer", "célébrer", "inquiéter", "protéger",
]);

function g1(inf: string): string[] {
  // -eler / -eter com dobra de consoante
  if (/(appeler|rappeler|épeler)$/.test(inf)) {
    const r = inf.slice(0, -2); // "appel"
    const rr = r + r[r.length - 1]; // "appell"
    return [rr + "e", rr + "es", rr + "e", r + "ons", r + "ez", rr + "ent"];
  }
  if (/(jeter|projeter|rejeter)$/.test(inf)) {
    const r = inf.slice(0, -2); // "jet"
    return [r + "te", r + "tes", r + "te", r + "ons", r + "ez", r + "tent"];
  }
  // -yer → -ie (payer, nettoyer, appuyer, envoyer…)
  if (/[aeou]yer$/.test(inf)) {
    const r = inf.slice(0, -3); // "netto" / "pa" / "appu"
    return [r + "ie", r + "ies", r + "ie", inf.slice(0, -1) + "ons", inf.slice(0, -1) + "ez", r + "ient"];
  }
  // acento grave (acheter, lever, espérer, protéger…)
  if (È_STEMS.has(inf)) {
    const x = inf.slice(0, -2); // "achet", "espér", "protég"
    const s = x.replace(/([ée])([a-z])$/, "è$2"); // "achèt", "espèr", "protèg"
    return [s + "e", s + "es", s + "e", x + "ons", x + "ez", s + "ent"];
  }
  // -ger → nous …eons
  if (inf.endsWith("ger")) {
    const r = inf.slice(0, -2); // "mang"
    return [r + "e", r + "es", r + "e", r + "eons", r + "ez", r + "ent"];
  }
  // -cer → nous …çons
  if (inf.endsWith("cer")) {
    const r = inf.slice(0, -2); // "commen"
    return [r + "ce", r + "ces", r + "ce", r + "çons", r + "ez", r + "cent"];
  }
  const r = inf.slice(0, -2);
  return [r + "e", r + "es", r + "e", r + "ons", r + "ez", r + "ent"];
}

function g2(inf: string): string[] {
  const r = inf.slice(0, -2); // "fin"
  return [r + "is", r + "is", r + "it", r + "issons", r + "issez", r + "issent"];
}

function g3(inf: string): string[] {
  if (IRREG[inf]) return IRREG[inf].split(",");

  // familles -prendre / -tenir / -venir
  if (inf.endsWith("prendre")) {
    const r = inf.slice(0, -5) + "pren";
    return [r + "ds", r + "ds", r + "d", r + "ons", r + "ez", r + "nent"];
  }
  if (inf.endsWith("tenir")) {
    const base = inf.slice(0, -5);
    return [base + "tiens", base + "tiens", base + "tient", base + "tenons", base + "tenez", base + "tiennent"];
  }
  if (inf.endsWith("venir")) {
    const base = inf.slice(0, -5);
    return [base + "viens", base + "viens", base + "vient", base + "venons", base + "venez", base + "viennent"];
  }
  // -vrir / -frir / -illir → terminações do 1ᵉʳ groupe
  if (/(vrir|frir|illir)$/.test(inf)) {
    const r = inf.slice(0, -2);
    return [r + "e", r + "es", r + "e", r + "ons", r + "ez", r + "ent"];
  }
  // -indre (craindre, peindre, joindre…)
  if (inf.endsWith("indre")) {
    const r = inf.slice(0, -3); // "crai"
    return [r + "ns", r + "ns", r + "nt", r + "gnons", r + "gnez", r + "gnent"];
  }
  // -uire → infix -s- no plural (conduire, construire, nuire…)
  if (inf.endsWith("uire")) {
    const r = inf.slice(0, -2); // "condui"
    return [r + "s", r + "s", r + "t", r + "sons", r + "sez", r + "sent"];
  }
  // -ivre / -ire / -ure sem infix (vivre, suivre, rire, conclure…)
  if (/(ivre|ire|ure)$/.test(inf)) {
    const r = inf.slice(0, -2); // "viv", "ri", "conclu"
    return [r + "s", r + "s", r + "t", r + "ons", r + "ez", r + "ent"];
  }
  // -aître / -oître
  if (inf.endsWith("ître")) {
    const r = inf.slice(0, -4); // "conna"
    return [r + "is", r + "is", r + "ît", r + "issons", r + "issez", r + "issent"];
  }
  // -ettre (mettre, permettre…)
  if (inf.endsWith("ettre")) {
    const r = inf.slice(0, -3); // "mett"
    const rs = r.slice(0, -1); // "met"
    return [rs + "s", rs + "s", rs, r + "ons", r + "ez", r + "ent"];
  }
  // -ttre (battre, combattre…)
  if (inf.endsWith("ttre")) {
    const r = inf.slice(0, -3); // "batt"
    const rs = r.slice(0, -1); // "bat"
    return [rs + "s", rs + "s", rs, r + "ons", r + "ez", r + "ent"];
  }
  // -oire (croire já tabelado)
  if (inf.endsWith("oire")) {
    const r = inf.slice(0, -2);
    return [r + "s", r + "s", r + "t", r + "ons", r + "ez", r + "ent"];
  }
  // -re regular (vendre, attendre, rendre…)
  if (inf.endsWith("re")) {
    const r = inf.slice(0, -2); // "vend"
    return [r + "s", r + "s", r, r + "ons", r + "ez", r + "ent"];
  }
  return [];
}

/** Conjugação completa no présent (verbos impessoais: só a 3ª pessoa preenchida). */
export function conjugate(inf: string): string[] | null {
  const reflexive = inf.startsWith("s'") || inf.startsWith("se ");
  const base = reflexive ? inf.replace(/^s'|^se /, "") : inf;

  let forms: string[];
  if (IRREG[base]) forms = IRREG[base].split(",");
  else {
    const verb = VERB_MAP[inf] ?? VERB_MAP[base];
    if (!verb) return null;
    forms = verb.g === 1 ? g1(base) : verb.g === 2 ? g2(base) : g3(base);
  }
  if (!forms.length) return null;
  if (!reflexive) return forms;

  const prefixes = ["me", "te", "se", "nous", "vous", "se"];
  return forms.map((f, i) => {
    if (!f) return f;
    const p = prefixes[i];
    return (VOWEL.test(f) ? p + "'" : p + " ") + f;
  });
}

/** « je ___ » com elisão (j' + vogal). */
export function withPronoun(person: number, form: string): string {
  const p = ["je", "tu", "il", "nous", "vous", "ils"][person];
  if (person === 0 && VOWEL.test(form)) return "j'" + form;
  return p + " " + form;
}
