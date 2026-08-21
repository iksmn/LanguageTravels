/**
 * Os ~250 verbos essenciais do italiano (lista fornecida) + conjugador do
 * PRESENTE INDICATIVO. Estrutura espelha src/data/verbs.ts (francês).
 */

export type VerbGroupIT = 1 | 2 | 3; // 1ª -are · 2ª -ere · 3ª -ire

export interface VerbIT {
  inf: string;
  g: VerbGroupIT;
  pt: string;
}

export const IT_PRONOUNS = ["io", "tu", "lui/lei", "noi", "voi", "loro"];

const P: [string, string][] = [
  ["essere", "ser, estar"], ["vedere", "ver"], ["avere", "ter"], ["dire", "dizer"], ["andare", "ir"],
  ["fare", "fazer"], ["trovare", "encontrar"], ["sapere", "saber"], ["prendere", "pegar"], ["parlare", "falar"],
  ["garantire", "garantir"], ["lavorare", "trabalhar"], ["ottenere", "obter"], ["vivere", "viver"], ["creare", "criar"],
  ["utilizzare", "utilizar"], ["usare", "usar"], ["dare", "dar"], ["capire", "entender"], ["migliorare", "melhorar"],
  ["aiutare", "ajudar"], ["venire", "vir"], ["evitare", "evitar"], ["fornire", "fornecer"], ["portare", "levar"],
  ["sentire", "sentir"], ["pensare", "pensar"], ["mantenere", "manter"], ["lasciare", "deixar"], ["uccidere", "matar"],
  ["raggiungere", "alcançar"], ["cercare", "procurar"], ["tenere", "segurar"], ["mettere", "colocar"], ["cambiare", "mudar"],
  ["tornare", "voltar"], ["ridurre", "reduzir"], ["giocare", "jogar"], ["continuare", "continuar"], ["promuovere", "promover"],
  ["controllare", "controlar"], ["scegliere", "escolher"], ["credere", "acreditar"], ["mangiare", "comer"], ["guardare", "olhar"],
  ["affrontare", "enfrentar"], ["morire", "morrer"], ["chiedere", "pedir"], ["provare", "experimentar"], ["iniziare", "começar"],
  ["adottare", "adotar"], ["rendere", "tornar"], ["scoprire", "descobrir"], ["stare", "estar, ficar"], ["diventare", "tornar-se"],
  ["sostenere", "sustentar"], ["aumentare", "aumentar"], ["perdere", "perder"], ["salvare", "salvar"], ["proteggere", "proteger"],
  ["sviluppare", "desenvolver"], ["aggiungere", "adicionar"], ["passare", "passar"], ["leggere", "ler"], ["offrire", "oferecer"],
  ["assicurare", "assegurar"], ["seguire", "seguir"], ["pagare", "pagar"], ["uscire", "sair"], ["entrare", "entrar"],
  ["chiamare", "chamar"], ["rispondere", "responder"], ["rimanere", "permanecer"], ["dormire", "dormir"], ["presentare", "apresentar"],
  ["costruire", "construir"], ["combattere", "combater"], ["aprire", "abrir"], ["risolvere", "resolver"], ["arrivare", "chegar"],
  ["modificare", "modificar"], ["conoscere", "conhecer"], ["restare", "permanecer"], ["applicare", "aplicar"], ["visitare", "visitar"],
  ["imparare", "aprender"], ["ricordare", "lembrar"], ["scrivere", "escrever"], ["valutare", "avaliar"], ["comprare", "comprar"],
  ["rafforzare", "reforçar"], ["soddisfare", "satisfazer"], ["accettare", "aceitar"], ["gestire", "gerir"], ["aspettare", "esperar"],
  ["vincere", "vencer"], ["contribuire", "contribuir"], ["ricevere", "receber"], ["finire", "terminar"], ["realizzare", "realizar"],
  ["partire", "partir"], ["condividere", "compartilhar"], ["consentire", "consentir"], ["decidere", "decidir"], ["vendere", "vender"],
  ["acquistare", "adquirir"], ["verificare", "verificar"], ["permettere", "permitir"], ["comprendere", "compreender"], ["dimostrare", "demonstrar"],
  ["partecipare", "participar"], ["selezionare", "selecionar"], ["stabilire", "estabelecer"], ["scaricare", "baixar"], ["guidare", "dirigir"],
  ["organizzare", "organizar"], ["produrre", "produzir"], ["determinare", "determinar"], ["ascoltare", "escutar"], ["superare", "superar"],
  ["discutere", "discutir"], ["eliminare", "eliminar"], ["rispettare", "respeitar"], ["accedere", "acessar"], ["dimenticare", "esquecer"],
  ["riconoscere", "reconhecer"], ["definire", "definir"], ["spiegare", "explicar"], ["crescere", "crescer"], ["ringraziare", "agradecer"],
  ["inserire", "inserir"], ["incontrare", "encontrar"], ["preparare", "preparar"], ["fermare", "parar"], ["mostrare", "mostrar"],
  ["funzionare", "funcionar"], ["prevenire", "prevenir"], ["esprimere", "expressar"], ["svolgere", "desempenhar"], ["impedire", "impedir"],
  ["servire", "servir"], ["godere", "desfrutar"], ["cominciare", "começar"], ["includere", "incluir"], ["smettere", "parar"],
  ["chiudere", "fechar"], ["raccogliere", "recolher"], ["immaginare", "imaginar"], ["indicare", "indicar"], ["agire", "agir"],
  ["rimuovere", "remover"], ["studiare", "estudar"], ["avviare", "iniciar"], ["coprire", "cobrir"], ["eseguire", "executar"],
  ["effettuare", "efetuar"], ["considerare", "considerar"], ["distruggere", "destruir"], ["inviare", "enviar"], ["sembrare", "parecer"],
  ["incoraggiare", "encorajar"], ["recuperare", "recuperar"], ["assumere", "assumir"], ["correre", "correr"], ["comunicare", "comunicar"],
  ["esaminare", "examinar"], ["richiedere", "requisitar"], ["introdurre", "introduzir"], ["individuare", "identificar"], ["limitare", "limitar"],
  ["causare", "causar"], ["favorire", "favorecer"], ["installare", "instalar"], ["cadere", "cair"], ["sopravvivere", "sobreviver"],
  ["attuare", "implementar"], ["saltare", "saltar"], ["identificare", "identificar"], ["sparare", "atirar"], ["sostituire", "substituir"],
  ["amare", "amar"], ["notare", "notar"], ["ballare", "dançar"], ["finanziare", "financiar"], ["piacere", "agradar"],
  ["confermare", "confirmar"], ["completare", "completar"], ["difendere", "defender"], ["nascondere", "esconder"], ["indossare", "vestir"],
  ["suonare", "tocar, soar"], ["rubare", "roubar"], ["concludere", "concluir"], ["tagliare", "cortar"], ["proporre", "propor"],
  ["girare", "girar"], ["visualizzare", "visualizar"], ["elaborare", "elaborar"], ["sottolineare", "sublinhar"], ["contenere", "conter"],
  ["ammettere", "admitir"], ["volare", "voar"], ["proseguire", "prosseguir"], ["pregare", "rezar"], ["trattare", "tratar"],
  ["votare", "votar"], ["camminare", "caminhar"], ["viaggiare", "viajar"], ["cantare", "cantar"], ["toccare", "tocar"],
  ["trasformare", "transformar"], ["mandare", "mandar"], ["condurre", "conduzir"], ["compiere", "cumprir"], ["piangere", "chorar"],
  ["scappare", "escapar"], ["conservare", "conservar"], ["contare", "contar"], ["esplorare", "explorar"], ["chiarire", "esclarecer"],
  ["riflettere", "refletir"], ["accogliere", "acolher"], ["facilitare", "facilitar"], ["istituire", "instituir"], ["trasmettere", "transmitir"],
  ["firmare", "assinar"], ["investire", "investir"], ["contattare", "contatar"], ["lottare", "lutar"], ["respirare", "respirar"],
  ["pulire", "limpar"], ["spostare", "mover"], ["osservare", "observar"], ["riparare", "reparar"], ["fissare", "fixar"],
  ["trascorrere", "passar (tempo)"], ["informare", "informar"], ["analizzare", "analisar"], ["esercitare", "exercer"], ["conseguire", "conseguir"],
  ["concedere", "conceder"], ["insegnare", "ensinar"], ["assistere", "assistir"], ["procedere", "proceder"], ["imporre", "impor"],
  ["registrare", "registrar"], ["monitorare", "monitorar"], ["ammirare", "admirar"], ["premere", "premer"], ["trasferire", "transferir"],
];

function groupOf(inf: string): VerbGroupIT {
  if (inf.endsWith("are")) return 1;
  if (inf.endsWith("ere")) return 2;
  return 3; // -ire
}

export const VERB_LIST_IT: VerbIT[] = P.map(([inf, pt]) => ({ inf, g: groupOf(inf), pt }));
export const VERB_MAP_IT: Record<string, VerbIT> = Object.fromEntries(VERB_LIST_IT.map((v) => [v.inf, v]));

export const GROUP_LABEL_IT: Record<VerbGroupIT, string> = {
  1: "1ª coniug. · -are",
  2: "2ª coniug. · -ere",
  3: "3ª coniug. · -ire",
};
export const GROUP_COLOR_IT: Record<VerbGroupIT, string> = { 1: "#0e8f8b", 2: "#e8930c", 3: "#2f8f6b" };

/* ------------------------------------------------------------------ */
/*  Tabelas de irregulares (presente indicativo)                       */
/* ------------------------------------------------------------------ */

const IRREG_IT: Record<string, string> = {
  essere: "sono,sei,è,siamo,siete,sono",
  avere: "ho,hai,ha,abbiamo,avete,hanno",
  dire: "dico,dici,dice,diciamo,dite,dicono",
  andare: "vado,vai,va,andiamo,andate,vanno",
  fare: "faccio,fai,fa,facciamo,fate,fanno",
  sapere: "so,sai,sa,sappiamo,sapete,sanno",
  venire: "vengo,vieni,viene,veniamo,venite,vengono",
  stare: "sto,stai,sta,stiamo,state,stanno",
  dare: "do,dai,dà,diamo,date,danno",
  uscire: "esco,esci,esce,usciamo,uscite,escono",
  piacere: "piaccio,piaci,piace,piacciamo,piacete,piacciono",
  morire: "muoio,muori,muore,moriamo,morite,muoiono",
  scegliere: "scelgo,scegli,sceglie,scegliamo,scegliete,scelgono",
  raccogliere: "raccolgo,raccogli,raccoglie,raccogliamo,raccogliete,raccolgono",
  accogliere: "accolgo,accogli,accoglie,accogliamo,accogliete,accolgono",
  condurre: "conduco,conduci,conduce,conduciamo,conducete,conducono",
  produrre: "produco,produci,produce,produciamo,producete,producono",
  introdurre: "introduco,introduci,introduce,introduciamo,introducete,introducono",
  ridurre: "riduco,riduci,riduce,riduciamo,riducete,riducono",
  rimanere: "rimango,rimani,rimane,rimaniamo,rimanete,rimangono",
  tenere: "tengo,tieni,tiene,teniamo,tenete,tengono",
  mantenere: "mantengo,mantieni,mantiene,manteniamo,mantenete,mantengono",
  contenere: "contengo,contieni,contiene,conteniamo,contenete,contengono",
  ottenere: "ottengo,ottieni,ottiene,otteniamo,ottenete,ottengono",
  sostenere: "sostengo,sostieni,sostiene,sosteniamo,sostenete,sostengono",
  salire: "salgo,sali,sale,saliamo,salite,salgono",
  volere: "voglio,vuoi,vuole,vogliamo,volete,vogliono",
  potere: "posso,puoi,può,possiamo,potete,possono",
  dovere: "devo,devi,deve,dobbiamo,dovete,devono",
  bere: "bevo,bevi,beve,beviamo,bevete,bevono",
};

/** Verbos -ire que inserem -isc- (capire → capisco). */
const ISC = new Set(["capire", "finire", "pulire", "costruire", "garantire", "fornire", "preferire"]);

/* ------------------------------------------------------------------ */
/*  Conjugador (presente indicativo)                                   */
/* ------------------------------------------------------------------ */

function g1(inf: string): string[] {
  const stem = inf.slice(0, -3); // remove "are"
  const E = ["o", "i", "a", "iamo", "ate", "ano"];
  if (stem.endsWith("i")) {
    // -ciare / -giare: cai o "i" antes de terminações em "i"
    const s = stem.slice(0, -1);
    return [stem + E[0], s + E[1], stem + E[2], s + E[3], stem + E[4], stem + E[5]];
  }
  if (inf.endsWith("care") || inf.endsWith("gare")) {
    // -care / -gare: insere "h" antes de "i" / "iamo"
    return [stem + E[0], stem + "h" + E[1], stem + E[2], stem + "h" + E[3], stem + E[4], stem + E[5]];
  }
  return E.map((e) => stem + e);
}

function g2(inf: string): string[] {
  const stem = inf.slice(0, -3); // remove "ere"
  return ["o", "i", "e", "iamo", "ete", "ono"].map((e) => stem + e);
}

function g3(inf: string): string[] {
  const stem = inf.slice(0, -3); // remove "ire"
  if (ISC.has(inf)) {
    return [stem + "isco", stem + "isci", stem + "isce", stem + "iamo", stem + "ite", stem + "iscono"];
  }
  return ["o", "i", "e", "iamo", "ite", "ono"].map((e) => stem + e);
}

export function conjugateIT(inf: string): string[] | null {
  if (IRREG_IT[inf]) return IRREG_IT[inf].split(",");
  const verb = VERB_MAP_IT[inf];
  if (!verb) return null;
  if (verb.g === 1) return g1(inf);
  if (verb.g === 2) return g2(inf);
  return g3(inf);
}

export function withPronounIT(person: number, form: string): string {
  return IT_PRONOUNS[person] + " " + form;
}
