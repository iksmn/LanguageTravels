import { useMemo, useState } from "react";
import {
  activeLang,
  conjugateLang,
  conjugatorSourceUrl,
  conjugatorUrl,
  groupColor,
  groupLabel,
  isItalian,
  pronouns,
  speechLang,
  verbList,
  weekVerbs,
  withPronounLang,
  type VerbShape,
} from "../data/content";
import type { UseProgressReturn } from "../hooks/useProgress";
import { mulberry32, shuffle } from "../lib/engine";
import { canSpeak, speak } from "../lib/speech";
import { Icon } from "./Icons";

const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

type Filter = "all" | 1 | 2 | 3 | "tour";

const isImpersonal = (inf: string) => !isItalian() && (inf === "falloir" || inf === "pleuvoir");

/* ------------------------- mini-quiz de conjugação ------------------- */

function VerbQuiz({ verb, onDone }: { verb: VerbShape; onDone: (score: number, total: number) => void }) {
  const isImper = isImpersonal(verb.inf);
  const persons = isImper ? [2] : [0, 1, 2, 3, 4, 5];
  const forms = conjugateLang(verb.inf) ?? [];

  const questions = useMemo(() => {
    const rng = mulberry32(verb.inf.length * 97 + verb.inf.charCodeAt(0));
    return persons.map((p) => {
      const correct = forms[p];
      const others = [...new Set(forms.filter((_, i) => i !== p && forms[i]))];
      const options = shuffle([correct, ...shuffle(others, rng).slice(0, 3)], rng);
      return { person: p, correct, options };
    });
  }, [verb.inf, forms.join("|"), persons.join(",")]);

  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const q = questions[qi];
  if (!q || !q.correct) return null;

  const pronoun = withPronounLang(q.person, q.correct).replace(/ .+$/, "");

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (q.options[i] === q.correct) setScore((s) => s + 1);
  };
  const next = () => {
    if (qi + 1 < questions.length) {
      setQi(qi + 1);
      setPicked(null);
    } else {
      onDone(score, questions.length);
    }
  };

  return (
    <div className="rounded-lg border-2 border-ink/15 bg-paper p-3.5">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] font-bold tracking-[0.16em] text-ink-soft uppercase">
          Quiz · questão {qi + 1}/{questions.length}
        </p>
        <p className="font-mono text-[11px] font-semibold" style={{ color: groupColor(verb.g) }}>
          {score} acerto{score === 1 ? "" : "s"}
        </p>
      </div>
      <p className="mt-2 font-display text-[17px] font-bold">
        Conjugue: « {pronoun} ___ » <span className="text-ink-soft">({verb.inf})</span>
      </p>
      <div className="mt-2.5 grid grid-cols-2 gap-1.5">
        {q.options.map((opt, i) => {
          const show = picked !== null;
          const isCorrect = opt === q.correct;
          const isPicked = picked === i;
          let cls = "border-ink/20 bg-card hover:border-ink hover:-translate-y-0.5";
          if (show && isCorrect) cls = "border-leaf bg-leaf/12 text-leaf";
          else if (show && isPicked) cls = "border-bus bg-bus/10 text-bus shake";
          else if (show) cls = "border-ink/12 bg-card opacity-50";
          return (
            <button
              key={`${opt}-${i}`}
              disabled={show}
              onClick={() => pick(i)}
              className={`btn-press rounded-md border-2 px-2.5 py-1.5 text-left font-display text-[14px] font-semibold ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="fade-up mt-2 flex items-center justify-between gap-2">
          <p className={`text-[12.5px] ${q.options[picked] === q.correct ? "text-leaf" : "text-ink-soft"}`}>
            {q.options[picked] === q.correct ? (isItalian() ? "Bravissimo!" : "Très bien !") : `Correto: «${withPronounLang(q.person, q.correct)}»`}
          </p>
          <button
            onClick={next}
            className="btn-press flex items-center gap-1 rounded-md border-2 border-ink bg-ink px-3 py-1.5 font-mono text-[10.5px] font-bold tracking-wide text-paper uppercase"
          >
            {qi + 1 < questions.length ? "Próxima" : "Concluir"}
            <Icon name="arrowRight" size={12} strokeWidth={2.6} />
          </button>
        </div>
      )}
    </div>
  );
}

/* ----------------------- mini-quiz de mandarim ----------------------- */

function ZhVerbQuiz({ verb, onDone }: { verb: VerbShape; onDone: (score: number, total: number) => void }) {
  const questions = useMemo(() => {
    const rng = mulberry32(verb.inf.length * 97 + verb.inf.charCodeAt(0));
    const others = shuffle(verbList().filter((v) => v.inf !== verb.inf), rng).slice(0, 9);
    const mk = (correct: string, distractors: string[]) => {
      const options = shuffle([correct, ...shuffle(distractors, rng).slice(0, 3)], rng);
      return { options, correct };
    };
    return [
      { prompt: `O que significa «${verb.inf} ${verb.py}»?`, ...mk(verb.pt, others.map((v) => v.pt)) },
      { prompt: `Como se diz “${verb.pt}”?`, ...mk(`${verb.inf} ${verb.py}`, others.map((v) => `${v.inf} ${v.py}`)) },
      { prompt: `Qual é o pinyin de «${verb.inf}»?`, ...mk(verb.py ?? "", others.map((v) => v.py ?? "").filter(Boolean)) },
    ];
  }, [verb.inf]);

  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const q = questions[qi];
  if (!q) return null;

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (q.options[i] === q.correct) setScore((s) => s + 1);
  };
  const next = () => {
    if (qi + 1 < questions.length) {
      setQi(qi + 1);
      setPicked(null);
    } else {
      onDone(score, questions.length);
    }
  };

  return (
    <div className="rounded-lg border-2 border-ink/15 bg-paper p-3.5">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] font-bold tracking-[0.16em] text-ink-soft uppercase">
          Quiz · questão {qi + 1}/{questions.length}
        </p>
        <p className="font-mono text-[11px] font-semibold" style={{ color: groupColor(verb.g) }}>
          {score} acerto{score === 1 ? "" : "s"}
        </p>
      </div>
      <p className="mt-2 font-display text-[17px] font-bold">{q.prompt}</p>
      <div className="mt-2.5 grid grid-cols-2 gap-1.5">
        {q.options.map((opt, i) => {
          const show = picked !== null;
          const isCorrect = opt === q.correct;
          const isPicked = picked === i;
          let cls = "border-ink/20 bg-card hover:border-ink hover:-translate-y-0.5";
          if (show && isCorrect) cls = "border-leaf bg-leaf/12 text-leaf";
          else if (show && isPicked) cls = "border-bus bg-bus/10 text-bus shake";
          else if (show) cls = "border-ink/12 bg-card opacity-50";
          return (
            <button
              key={`${opt}-${i}`}
              disabled={show}
              onClick={() => pick(i)}
              className={`btn-press rounded-md border-2 px-2.5 py-1.5 text-left font-display text-[15px] font-semibold ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="fade-up mt-2 flex items-center justify-between gap-2">
          <p className={`text-[12.5px] ${q.options[picked] === q.correct ? "text-leaf" : "text-ink-soft"}`}>
            {q.options[picked] === q.correct ? "很好！(hěn hǎo!)" : `Correto: «${q.correct}»`}
          </p>
          <button
            onClick={next}
            className="btn-press flex items-center gap-1 rounded-md border-2 border-ink bg-ink px-3 py-1.5 font-mono text-[10.5px] font-bold tracking-wide text-paper uppercase"
          >
            {qi + 1 < questions.length ? "Próxima" : "Concluir"}
            <Icon name="arrowRight" size={12} strokeWidth={2.6} />
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------ detalhe ------------------------------ */

function VerbDetail({
  verb,
  best,
  onClose,
  onScore,
}: {
  verb: VerbShape;
  best: number;
  onClose: () => void;
  onScore: (score: number, total: number) => void;
}) {
  const forms = conjugateLang(verb.inf) ?? [];
  const isImper = isImpersonal(verb.inf);
  const isZh = activeLang() === "zh";
  const [training, setTraining] = useState(false);
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);
  const rows = isImper ? [2] : [0, 1, 2, 3, 4, 5];
  const PR = pronouns();

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-5">
      <div className="absolute inset-0 bg-ink/45 backdrop-blur-[3px]" onClick={onClose} />
      <div className="fade-up slim-scroll relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl border-2 border-ink bg-paper p-5 shadow-print">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className={`font-extrabold tracking-tight ${isZh ? "font-display text-[40px]" : "font-display text-[26px]"}`}>{verb.inf}</h2>
            {isZh && verb.py && <p className="font-mono text-[15px] font-semibold text-cobalt">{verb.py}</p>}
            <p className="text-[14px] text-ink-soft">{verb.pt}</p>
            <span
              className="mt-1.5 inline-block rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide"
              style={{ borderColor: `${groupColor(verb.g)}55`, color: groupColor(verb.g), background: `${groupColor(verb.g)}0d` }}
            >
              {groupLabel(verb.g)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-md border-2 border-ink/15 text-ink-soft hover:border-bus hover:text-bus"
          >
            <Icon name="x" size={15} strokeWidth={2.4} />
          </button>
        </div>

        {/* cartão do caractere (mandarim — não conjuga) */}
        {isZh && (
          <div className="mt-4 rounded-lg border-2 border-ink/15 bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-ink-soft uppercase">Caractere · 汉字</p>
              <button
                onClick={() => speak(verb.inf, speechLang())}
                className="btn-press flex items-center gap-1.5 rounded-md border-2 border-ink/20 bg-paper px-2.5 py-1 font-mono text-[10px] font-semibold uppercase shadow-print-sm"
              >
                <Icon name="volume" size={13} strokeWidth={2.2} />
                Ouvir
              </button>
            </div>
            <div className="mt-3 flex items-center justify-center gap-6 py-2">
              <span className="font-display text-[64px] leading-none font-extrabold" style={{ color: groupColor(verb.g) }}>
                {verb.inf}
              </span>
              <div className="leading-tight">
                <p className="font-mono text-[16px] font-semibold text-cobalt">{verb.py}</p>
                <p className="text-[15px] font-semibold">{verb.pt}</p>
              </div>
            </div>
            <p className="mt-2 border-t border-ink/8 pt-2 text-[11px] text-ink-soft italic">
              O mandarim não conjuga verbos — a forma é única para todas as pessoas e tempos.
            </p>
          </div>
        )}

        {/* tabela de conjugação */}
        {!isZh && <div className="mt-4 overflow-hidden rounded-lg border-2 border-ink/15">
          <div className="flex items-center justify-between bg-ink px-3 py-1.5">
            <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-paper uppercase">
              {activeLang() === "it"
                ? "Presente indicativo"
                : activeLang() === "de"
                  ? "Präsens"
                  : activeLang() === "es"
                    ? "Presente de indicativo"
                    : activeLang() === "en"
                      ? "Simple present"
                      : "Présent de l'indicatif"}
            </p>
            <button
              onClick={() => rows.forEach((p) => forms[p] && speak(withPronounLang(p, forms[p]), speechLang()))}
              className="flex items-center gap-1 font-mono text-[10px] font-semibold text-paper/80 hover:text-mustard"
            >
              <Icon name="volume" size={13} strokeWidth={2.2} />
              ouvir tudo
            </button>
          </div>
          <table className="w-full bg-card">
            <tbody>
              {rows.map((p) =>
                forms[p] ? (
                  <tr key={p} className="group border-t border-ink/8">
                    <td className="w-[38%] px-3 py-1.5 font-mono text-[11px] font-semibold tracking-wide text-ink-soft uppercase">
                      {PR[p]}
                    </td>
                    <td className="px-3 py-1.5 font-display text-[16px] font-bold">{forms[p]}</td>
                    <td className="w-10 pr-2 text-right">
                      <button
                        onClick={() => speak(withPronounLang(p, forms[p]), speechLang())}
                        className="text-ink/30 transition-colors hover:text-bus group-hover:text-ink-soft"
                        title="Ouvir"
                      >
                        <Icon name="volume" size={15} strokeWidth={2} />
                      </button>
                    </td>
                  </tr>
                ) : null,
              )}
            </tbody>
          </table>
          {isImper && (
            <p className="border-t border-ink/8 bg-paper px-3 py-1.5 text-[11px] text-ink-soft italic">
              Verbe impersonnel — usado sobretudo na 3ª pessoa (il faut / il pleut).
            </p>
          )}
        </div>}

        {/* quiz / resultado */}
        <div className="mt-4">
          {!training && !result && (
            <div className="flex items-center justify-between gap-3 rounded-lg border-2 border-dashed border-ink/25 bg-card/70 px-3.5 py-3">
              <div>
                <p className="font-display text-[15px] font-bold">{isZh ? "Treinar este caractere" : "Treinar este verbo"}</p>
                <p className="text-[12px] text-ink-soft">
                  {isZh ? "3 questões: significado, caractere e pinyin." : isImper ? "1 questão rápida." : "6 questões — uma por pessoa."}{" "}
                  {best > 0 && `Melhor: ${best}/${isZh ? 3 : isImper ? 1 : 6}.`}
                </p>
              </div>
              <button
                onClick={() => setTraining(true)}
                className="btn-press flex shrink-0 items-center gap-1.5 rounded-lg border-2 border-ink px-3.5 py-2 font-mono text-[11px] font-bold tracking-wide text-card uppercase shadow-print-sm"
                style={{ background: groupColor(verb.g) }}
              >
                <Icon name="play" size={13} strokeWidth={2.4} />
                Treinar
              </button>
            </div>
          )}
          {training &&
            (isZh ? (
              <ZhVerbQuiz
                verb={verb}
                onDone={(score, total) => {
                  setResult({ score, total });
                  setTraining(false);
                  onScore(score, total);
                }}
              />
            ) : (
              <VerbQuiz
                verb={verb}
                onDone={(score, total) => {
                  setResult({ score, total });
                  setTraining(false);
                  onScore(score, total);
                }}
              />
            ))}
          {result && (
            <div className="fade-up rounded-lg border-2 border-leaf/50 bg-leaf/10 px-3.5 py-3">
              <p className="font-display text-[16px] font-bold text-leaf">
                {result.score}/{result.total} —{" "}
                {result.score === result.total
                  ? isItalian() ? "Perfetto!" : "Parfait !"
                  : result.score >= result.total / 2
                    ? isItalian() ? "Molto bene!" : "Très bien !"
                    : "Continue !"}
              </p>
              <button
                onClick={() => {
                  setResult(null);
                  setTraining(true);
                }}
                className="mt-1 flex items-center gap-1 font-mono text-[11px] font-semibold text-ink-soft underline hover:text-ink"
              >
                <Icon name="repeat" size={12} strokeWidth={2.2} />
                treinar de novo
              </button>
            </div>
          )}
        </div>

        <a
          href={conjugatorUrl(verb.inf)}
          target="_blank"
          rel="noreferrer"
          className="mt-4 flex items-center gap-1.5 font-mono text-[11px] font-semibold text-cobalt hover:underline"
        >
          <Icon name="globe" size={13} strokeWidth={2.2} />
          {activeLang() === "it"
            ? "Tutte le coniugazioni su Reverso"
            : activeLang() === "de"
              ? "Alle Konjugationen auf Reverso"
              : activeLang() === "es"
                ? "Todas las conjugaciones en Reverso"
                : activeLang() === "en"
                  ? "All conjugations on Reverso"
                  : "Toutes les conjugaisons sur Reverso"}
        </a>
      </div>
    </div>
  );
}

/* ------------------------------ lista -------------------------------- */

export function VerbsView({ prog }: { prog: UseProgressReturn }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<VerbShape | null>(null);

  const it = isItalian();
  const lang = activeLang();
  const allVerbs = useMemo(() => verbList(), [lang]);
  const TOUR_VERBS = useMemo(() => new Set(Object.values(weekVerbs()).flat()), [lang]);
  const verbsRecord = prog.progress.verbs ?? {};
  const masteredThreshold = lang === "zh" ? 3 : 6;
  const trained = Object.keys(verbsRecord).filter((k) => (verbsRecord[k] ?? 0) > 0).length;
  const mastered = Object.keys(verbsRecord).filter((k) => (verbsRecord[k] ?? 0) >= masteredThreshold).length;

  const TOUR_LABEL =
    lang === "it"
      ? "★ del viaggio"
      : lang === "de"
        ? "★ der Route"
        : lang === "es"
          ? "★ de la ruta"
          : lang === "en"
            ? "★ of the route"
            : "★ du Grand Tour";
  const ALL_LABEL =
    lang === "it" ? "Tutti" : lang === "de" ? "Alle" : lang === "es" ? "Todos" : lang === "en" ? "All" : "Tous";
  const FILTERS: { id: Filter; label: string; color?: string }[] = [
    { id: "all", label: `${ALL_LABEL} · ${allVerbs.length}` },
    { id: 1, label: groupLabel(1), color: groupColor(1) },
    { id: 2, label: groupLabel(2), color: groupColor(2) },
    { id: 3, label: groupLabel(3), color: groupColor(3) },
    { id: "tour", label: TOUR_LABEL, color: "#b8860b" },
  ];

  const list = useMemo(() => {
    const q = norm(query.trim());
    return verbList().filter((v) => {
      if (filter === 1 || filter === 2 || filter === 3) {
        if (v.g !== filter) return false;
      } else if (filter === "tour" && !TOUR_VERBS.has(v.inf)) return false;
      if (q && !norm(v.inf).includes(q) && !norm(v.pt).includes(q)) return false;
      return true;
    });
  }, [query, filter, TOUR_VERBS, it]);

  return (
    <div className="flex flex-col gap-5">
      {/* topo */}
      <section className="fade-up relative overflow-hidden rounded-xl border-2 border-ink bg-ink p-5 text-paper shadow-print sm:p-6">
        <div className="paper-noise pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.24em] text-mustard uppercase">
              <Icon name="book" size={14} strokeWidth={2.2} />
              {lang === "it" ? "Il Coniugatore" : lang === "de" ? "Der Konjugator" : lang === "es" ? "El Conjugador" : lang === "en" ? "The Conjugator" : "Le Conjugueur"}
            </p>
            <h1 className="mt-2 font-display text-[26px] leading-[1.08] font-extrabold tracking-tight sm:text-3xl">
              {lang === "it" ? (
                <>I {allVerbs.length} verbi <span className="text-mustard">essenziali</span></>
              ) : lang === "de" ? (
                <>Die {allVerbs.length} <span className="text-mustard">wichtigen</span> Verben</>
              ) : lang === "es" ? (
                <>Los {allVerbs.length} verbos <span className="text-mustard">esenciales</span></>
              ) : lang === "en" ? (
                <>The {allVerbs.length} <span className="text-mustard">essential</span> verbs</>
              ) : (
                <>Les {allVerbs.length} verbes <span className="text-mustard">essentiels</span></>
              )}
            </h1>
            <p className="mt-1.5 max-w-xl text-[13.5px] leading-relaxed text-paper/75">
              Baseados na lista dos verbos mais conjugados do{" "}
              <a href={conjugatorSourceUrl()} target="_blank" rel="noreferrer" className="font-semibold text-mustard underline decoration-mustard/40 hover:decoration-mustard">
                Reverso Conjugator
              </a>
              . Toque num verbo para ver o presente completo, ouvir e treinar.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <div className="rounded-lg border-2 border-paper/20 bg-paper/8 px-4 py-2.5 text-center">
              <p className="font-display text-[22px] font-extrabold text-mustard">{trained}</p>
              <p className="font-mono text-[9px] font-semibold tracking-[0.16em] text-paper/60 uppercase">treinados</p>
            </div>
            <div className="rounded-lg border-2 border-paper/20 bg-paper/8 px-4 py-2.5 text-center">
              <p className="font-display text-[22px] font-extrabold text-leaf">{mastered}</p>
              <p className="font-mono text-[9px] font-semibold tracking-[0.16em] text-paper/60 uppercase">dominados</p>
            </div>
          </div>
        </div>
      </section>

      {/* controles */}
      <div className="fade-up flex flex-col gap-3" style={{ animationDelay: "80ms" }}>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={it ? "Cerca un verbo… (es.: ballare, amare)" : "Buscar verbo… (ex.: danser, amar)"}
            className="w-full rounded-lg border-2 border-ink/20 bg-card py-2.5 pl-9 pr-3 font-sans text-[14px] outline-none transition-colors placeholder:text-ink/35 focus:border-ink"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={String(f.id)}
              onClick={() => setFilter(f.id)}
              className={`btn-press rounded-full border-2 px-3 py-1 font-mono text-[10.5px] font-semibold tracking-wide uppercase transition-colors ${
                filter === f.id
                  ? "border-ink text-card shadow-print-sm"
                  : "border-ink/20 bg-card text-ink-soft hover:border-ink/50"
              }`}
              style={filter === f.id ? { background: f.color ?? "#1e2a38", borderColor: f.color ?? "#1e2a38" } : undefined}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* grid */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {list.map((v, i) => {
          const score = verbsRecord[v.inf] ?? 0;
          const isTour = TOUR_VERBS.has(v.inf);
          return (
            <button
              key={v.inf}
              onClick={() => setSelected(v)}
              className="fade-up group flex flex-col items-start gap-1 rounded-lg border-2 border-ink/15 bg-card p-3 text-left transition-all duration-150 hover:-translate-y-0.5 hover:border-ink hover:shadow-print-sm"
              style={{ animationDelay: `${Math.min(i, 30) * 14}ms` }}
            >
              <div className="flex w-full items-center justify-between gap-1">
                <span className="h-1.5 w-8 rounded-full" style={{ background: groupColor(v.g) }} />
                <span className="flex items-center gap-1">
                  {isTour && <Icon name="star" size={11} strokeWidth={2.4} className="text-mustard" />}
                  {score >= 6 ? (
                    <Icon name="check" size={12} strokeWidth={3} className="text-leaf" />
                  ) : score > 0 ? (
                    <span className="font-mono text-[9px] font-bold text-mustard">{score}/6</span>
                  ) : null}
                </span>
              </div>
              <span className="font-display text-[16px] font-bold leading-tight group-hover:underline group-hover:decoration-2">
                {v.inf}
              </span>
              <span className="text-[11.5px] leading-snug text-ink-soft">{v.pt}</span>
            </button>
          );
        })}
      </div>

      {list.length === 0 && (
        <p className="py-10 text-center font-mono text-[12px] tracking-wide text-ink-soft uppercase">
          Nenhum verbo encontrado — tente outra busca.
        </p>
      )}

      <p className="px-1 text-[12px] text-ink-soft italic">
        {canSpeak()
          ? "Dica: use o botão de som para ouvir cada forma e repetir em voz alta — a pronúncia fixa a conjugação."
          : "Seu navegador não tem síntese de voz, mas as tabelas e o quiz funcionam normalmente."}
      </p>

      {selected && (
        <VerbDetail
          verb={selected}
          best={verbsRecord[selected.inf] ?? 0}
          onClose={() => setSelected(null)}
          onScore={(score, total) => {
            if (total === 6) prog.saveVerbScore(selected.inf, score);
            else if (total === 1 && score === 1) prog.saveVerbScore(selected.inf, 6);
          }}
        />
      )}
    </div>
  );
}
