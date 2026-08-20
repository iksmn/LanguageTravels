import { useEffect, useMemo, useRef, useState } from "react";
import { PERFECT_BONUS, XP_PER_QUESTION, type Location, type Vocab } from "../data/lessons";
import { canSpeak, speak, stopSpeaking } from "../lib/speech";
import { Icon } from "./Icons";

type Stage = "vocab" | "dialogue" | "quiz" | "done";

const CONFETTI_COLORS = ["#d7263d", "#e8930c", "#0e8f8b", "#4a9c2f", "#2b6cb0", "#8d4fa0"];

const STAGE_LABELS: { id: Stage; label: string }[] = [
  { id: "vocab", label: "Vocabulário" },
  { id: "dialogue", label: "Diálogo" },
  { id: "quiz", label: "Quiz" },
];

function FlipCard({ v, color, delay }: { v: Vocab; color: string; delay: number }) {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => {
    if (!flipped) speak(v.en);
    setFlipped((f) => !f);
  };
  return (
    <div className="perspective-900 fade-up h-[104px]" style={{ animationDelay: `${delay}ms` }}>
      <button
        onClick={toggle}
        className={`preserve-3d relative h-full w-full text-left transition-transform duration-500 ${flipped ? "[transform:rotateY(180deg)]" : ""}`}
        aria-label={flipped ? `Ver inglês: ${v.en}` : `Ver tradução: ${v.pt}`}
      >
        {/* frente — inglês */}
        <span className="backface-hidden absolute inset-0 flex flex-col justify-between rounded-lg border-2 border-ink/15 bg-card p-3 shadow-[inset_0_-3px_0_rgba(30,42,56,0.06)] transition-colors hover:border-ink/40">
          <span className="flex items-start justify-between gap-2">
            <span className="font-mono text-[9px] font-semibold tracking-[0.18em] uppercase" style={{ color }}>
              EN · toque p/ virar
            </span>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                speak(v.en);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.stopPropagation();
                  speak(v.en);
                }
              }}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-ink/15 bg-paper text-ink-soft transition-colors hover:text-bus"
              aria-label={`Ouvir ${v.en}`}
            >
              <Icon name="volume" size={14} strokeWidth={2} />
            </span>
          </span>
          <span>
            <span className="block font-display text-xl leading-tight font-bold">{v.en}</span>
            <span className="mt-0.5 block font-mono text-[11px] text-ink-soft">{v.ipa}</span>
          </span>
        </span>
        {/* verso — português */}
        <span
          className="backface-hidden absolute inset-0 flex flex-col justify-between rounded-lg border-2 border-ink/25 p-3 text-card [transform:rotateY(180deg)]"
          style={{ backgroundColor: color }}
        >
          <span className="font-mono text-[9px] font-semibold tracking-[0.18em] uppercase opacity-80">PT · tradução</span>
          <span>
            <span className="block font-display text-lg leading-tight font-bold">{v.pt}</span>
            <span className="mt-0.5 block font-mono text-[11px] opacity-75">{v.en}</span>
          </span>
        </span>
      </button>
    </div>
  );
}

export function LessonModal({
  loc,
  review,
  onClose,
  onFinish,
  onNext,
  hasNext,
  nextName,
  onPassport,
}: {
  loc: Location;
  review: boolean;
  onClose: () => void;
  onFinish: (score: number) => number;
  onNext: () => void;
  hasNext: boolean;
  nextName?: string;
  onPassport?: () => void;
}) {
  /* congela o modo no momento da abertura — o progresso muda durante a lição */
  const [isReview] = useState(review);
  const [stage, setStage] = useState<Stage>("vocab");
  const [showTrans, setShowTrans] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [activeLine, setActiveLine] = useState(-1);
  const [quizIdx, setQuizIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<{ gained: number; score: number } | null>(null);

  const timers = useRef<number[]>([]);
  const audioOk = canSpeak();

  /* trava o scroll do body + tecla Esc */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      stopSpeaking();
      timers.current.forEach(clearTimeout);
    };
  }, [onClose]);

  const stopDialogue = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    stopSpeaking();
    setPlaying(false);
    setActiveLine(-1);
  };

  const playDialogue = () => {
    if (playing) {
      stopDialogue();
      return;
    }
    setPlaying(true);
    let t = 300;
    loc.dialogue.forEach((line, i) => {
      timers.current.push(
        window.setTimeout(() => {
          speak(line.en);
          setActiveLine(i);
        }, t),
      );
      t += Math.min(4600, 1100 + line.en.length * 52);
    });
    timers.current.push(
      window.setTimeout(() => {
        setPlaying(false);
        setActiveLine(-1);
      }, t + 400),
    );
  };

  const q = loc.quiz[quizIdx];

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.a) setScore((s) => s + 1);
  };

  const advance = () => {
    if (quizIdx < loc.quiz.length - 1) {
      setQuizIdx((v) => v + 1);
      setPicked(null);
    } else {
      const gained = onFinish(score);
      setResult({ gained, score });
      setStage("done");
    }
  };

  const confetti = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        dur: 2.4 + Math.random() * 1.4,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        w: 5 + Math.random() * 5,
        h: 8 + Math.random() * 7,
      })),
    [],
  );

  const stageIdx = STAGE_LABELS.findIndex((s) => s.id === stage);
  const stampDate = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/70 p-3 sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="fade-up relative mx-auto my-2 w-[min(700px,100%)] overflow-hidden rounded-xl border-2 border-ink bg-paper shadow-print sm:my-6">
        {/* banner do lugar */}
        <div
          className="relative flex items-center gap-3.5 p-4 text-card sm:p-5"
          style={{
            backgroundColor: loc.color,
            backgroundImage:
              "repeating-linear-gradient(-45deg, rgba(255,255,255,0.09) 0 12px, transparent 12px 24px)",
          }}
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border-2 border-card/30 bg-card/15">
            <Icon name={loc.icon} size={26} strokeWidth={1.9} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] font-semibold tracking-[0.22em] uppercase opacity-80">
              Parada {String(loc.num).padStart(2, "0")} · {loc.nameEn}
            </p>
            <h2 className="truncate font-display text-xl leading-tight font-extrabold sm:text-2xl">{loc.namePt}</h2>
            <p className="truncate text-[12.5px] opacity-85">{loc.theme}</p>
          </div>
          {isReview && (
            <span className="hidden rounded-full border border-card/40 bg-ink/25 px-2.5 py-1 font-mono text-[9px] font-semibold tracking-[0.16em] uppercase sm:block">
              Revisão
            </span>
          )}
          <button
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-card/30 bg-ink/20 transition-colors hover:bg-ink/40"
            aria-label="Fechar lição"
          >
            <Icon name="x" size={17} strokeWidth={2.4} />
          </button>
        </div>

        {/* etapas */}
        <div className="flex gap-1.5 border-b-2 border-ink/10 bg-card p-2.5">
          {STAGE_LABELS.map((s, i) => {
            const done = stage === "done" || i < stageIdx;
            const active = s.id === stage;
            return (
              <div
                key={s.id}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 font-mono text-[10px] font-semibold tracking-[0.14em] uppercase transition-colors duration-300 ${
                  done ? "bg-leaf/12 text-leaf" : active ? "bg-ink text-paper" : "bg-ink/5 text-ink/35"
                }`}
              >
                {done ? <Icon name="check" size={11} strokeWidth={3} /> : <span>{i + 1}.</span>}
                {s.label}
              </div>
            );
          })}
        </div>

        <div className="relative min-h-[380px] p-4 sm:p-5">
          {/* confete */}
          {stage === "done" && (
            <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden>
              {confetti.map((c, i) => (
                <span
                  key={i}
                  className="confetti-piece rounded-[2px]"
                  style={{
                    left: `${c.left}%`,
                    width: c.w,
                    height: c.h,
                    backgroundColor: c.color,
                    animationDuration: `${c.dur}s`,
                    animationDelay: `${c.delay}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* ------- VOCABULÁRIO ------- */}
          {stage === "vocab" && (
            <div>
              <p className="text-[13.5px] text-ink-soft">{loc.desc}</p>
              <div className="mt-3 flex items-start gap-2.5 rounded-lg border-2 border-dashed border-mustard/60 bg-mustard/10 px-3 py-2.5">
                <Icon name="star" size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-mustard" />
                <p className="text-[12.5px] font-medium text-ink">
                  <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase">Dica de bordo · </span>
                  {loc.tip}
                </p>
              </div>
              <p className="mt-4 mb-2 font-mono text-[10px] font-semibold tracking-[0.2em] text-ink-soft uppercase">
                Toque nos cartões para virar {audioOk && "· áudio em inglês britânico"}
              </p>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {loc.vocab.map((v, i) => (
                  <FlipCard key={v.en} v={v} color={loc.color} delay={i * 70} />
                ))}
              </div>
              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => setStage("dialogue")}
                  className="btn-press flex items-center gap-2 rounded-lg border-2 border-ink bg-bus px-4 py-2.5 font-mono text-[12px] font-semibold tracking-wide text-card uppercase shadow-print-sm"
                >
                  Ir para o diálogo
                  <Icon name="arrowRight" size={15} strokeWidth={2.4} />
                </button>
              </div>
            </div>
          )}

          {/* ------- DIÁLOGO ------- */}
          {stage === "dialogue" && (
            <div>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-[10px] font-semibold tracking-[0.18em] text-ink-soft uppercase">
                  Conversa com {loc.localName} · {loc.localRole}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowTrans((v) => !v)}
                    className={`rounded-md border-2 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wide uppercase transition-colors ${
                      showTrans ? "border-ink bg-ink text-paper" : "border-ink/25 bg-card text-ink-soft hover:border-ink"
                    }`}
                  >
                    Tradução {showTrans ? "on" : "off"}
                  </button>
                  {audioOk && (
                    <button
                      onClick={playDialogue}
                      className={`btn-press flex items-center gap-1.5 rounded-md border-2 border-ink px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wide uppercase shadow-print-sm ${
                        playing ? "bg-bus text-card" : "bg-card text-ink hover:bg-paper"
                      }`}
                    >
                      <Icon name={playing ? "stop" : "play"} size={11} strokeWidth={2.4} />
                      {playing ? "Parar" : "Ouvir tudo"}
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2.5">
                {loc.dialogue.map((line, i) => {
                  const you = line.who === "you";
                  const active = activeLine === i;
                  return (
                    <div key={i} className={`fade-up flex items-end gap-2 ${you ? "flex-row-reverse" : ""}`} style={{ animationDelay: `${i * 90}ms` }}>
                      <span
                        className={`mb-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-ink/15 font-mono text-[10px] font-bold ${
                          you ? "bg-ink text-paper" : "bg-card text-ink"
                        }`}
                        style={!you ? { color: loc.color } : undefined}
                      >
                        {you ? "V" : loc.localName[0]}
                      </span>
                      <div
                        className={`group relative max-w-[82%] rounded-lg border-2 px-3 py-2 transition-all duration-200 ${
                          you ? "rounded-br-sm" : "rounded-bl-sm"
                        } ${active ? "scale-[1.02]" : ""}`}
                        style={{
                          backgroundColor: you ? `${loc.color}1c` : "#fffdf4",
                          borderColor: active ? loc.color : "rgba(30,42,56,0.13)",
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <p className="text-[14px] font-semibold">{line.en}</p>
                          {audioOk && (
                            <button
                              onClick={() => speak(line.en)}
                              className="shrink-0 text-ink/30 opacity-0 transition-all group-hover:opacity-100 hover:text-bus focus:opacity-100"
                              aria-label={`Ouvir: ${line.en}`}
                            >
                              <Icon name="volume" size={14} strokeWidth={2.1} />
                            </button>
                          )}
                        </div>
                        {showTrans && <p className="mt-0.5 text-[12px] text-ink-soft italic">{line.pt}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex items-center justify-between gap-2">
                <button
                  onClick={() => setStage("vocab")}
                  className="rounded-lg border-2 border-ink/25 bg-card px-3.5 py-2.5 font-mono text-[11px] font-semibold tracking-wide text-ink-soft uppercase transition-colors hover:border-ink hover:text-ink"
                >
                  ← Vocabulário
                </button>
                <button
                  onClick={() => setStage("quiz")}
                  className="btn-press flex items-center gap-2 rounded-lg border-2 border-ink bg-bus px-4 py-2.5 font-mono text-[12px] font-semibold tracking-wide text-card uppercase shadow-print-sm"
                >
                  Encarar o quiz
                  <Icon name="arrowRight" size={15} strokeWidth={2.4} />
                </button>
              </div>
            </div>
          )}

          {/* ------- QUIZ ------- */}
          {stage === "quiz" && (
            <div>
              <div className="mb-3 flex items-center justify-between font-mono text-[10px] font-semibold tracking-[0.18em] text-ink-soft uppercase">
                <span>Quiz da parada {String(loc.num).padStart(2, "0")}</span>
                <span>
                  Pergunta {quizIdx + 1} de {loc.quiz.length}
                </span>
              </div>
              <div className="mb-4 h-2 overflow-hidden rounded-full border border-ink/15 bg-ink/5">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((quizIdx + (picked !== null ? 1 : 0)) / loc.quiz.length) * 100}%`, backgroundColor: loc.color }}
                />
              </div>

              <h3 className="font-display text-xl leading-snug font-bold">{q.q}</h3>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {q.options.map((opt, i) => {
                  const isCorrect = i === q.a;
                  const isPicked = picked === i;
                  let cls = "border-ink/15 bg-card hover:border-ink hover:-translate-y-0.5";
                  if (picked !== null) {
                    if (isCorrect) cls = "border-leaf bg-leaf/12 text-leaf";
                    else if (isPicked) cls = "border-bus bg-bus/10 text-bus shake";
                    else cls = "border-ink/10 bg-card opacity-45";
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => pick(i)}
                      disabled={picked !== null}
                      className={`flex items-center gap-2.5 rounded-lg border-2 px-3 py-2.5 text-left text-[14px] font-semibold transition-all duration-200 ${cls}`}
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 border-current/25 font-mono text-[11px] font-bold">
                        {picked !== null && isCorrect ? (
                          <Icon name="check" size={12} strokeWidth={3} />
                        ) : picked !== null && isPicked ? (
                          <Icon name="x" size={12} strokeWidth={3} />
                        ) : (
                          "ABCD"[i]
                        )}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {picked !== null && (
                <div className="fade-up mt-4 rounded-lg border-l-4 bg-ink/5 p-3" style={{ borderLeftColor: picked === q.a ? "#4a9c2f" : "#d7263d" }}>
                  <p className="text-[13px] leading-relaxed">
                    <span className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: picked === q.a ? "#4a9c2f" : "#d7263d" }}>
                      {picked === q.a ? "Na mosca! " : "Quase! "}
                    </span>
                    <span className="text-ink-soft">{q.why}</span>
                  </p>
                </div>
              )}

              <div className="mt-5 flex justify-end">
                <button
                  onClick={advance}
                  disabled={picked === null}
                  className="btn-press flex items-center gap-2 rounded-lg border-2 border-ink bg-bus px-4 py-2.5 font-mono text-[12px] font-semibold tracking-wide text-card uppercase shadow-print-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {quizIdx < loc.quiz.length - 1 ? "Próxima pergunta" : "Ver resultado"}
                  <Icon name="arrowRight" size={15} strokeWidth={2.4} />
                </button>
              </div>
            </div>
          )}

          {/* ------- RESULTADO ------- */}
          {stage === "done" && result && (
            <div className="relative z-20 flex flex-col items-center text-center">
              <div
                className="stamp-in -rotate-6 grid h-44 w-44 place-items-center rounded-full border-4 border-double"
                style={{ borderColor: loc.color, color: loc.color }}
              >
                <div className="grid h-[148px] w-[148px] place-items-center rounded-full border-2 border-dashed" style={{ borderColor: loc.color }}>
                  <div className="flex flex-col items-center gap-1 px-4">
                    <Icon name={loc.icon} size={24} strokeWidth={1.9} />
                    <p className="font-mono text-[8.5px] font-bold tracking-[0.24em] uppercase">{loc.nameEn}</p>
                    <p className="font-display text-[15px] leading-tight font-extrabold">{loc.namePt}</p>
                    <p className="font-mono text-[9px] tracking-wide uppercase">
                      {stampDate} · {result.score}/3
                    </p>
                    {result.score === 3 && (
                      <span className="flex items-center gap-1 font-mono text-[9px] font-bold text-mustard">
                        <Icon name="star" size={10} strokeWidth={2.4} /> SELO DE OURO
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <h3 className="mt-5 font-display text-2xl font-extrabold">
                {isReview ? "Revisão concluída!" : result.score === 3 ? "Impecável!" : "Carimbo conquistado!"}
              </h3>
              <p className="mt-1 max-w-sm text-[13.5px] text-ink-soft">
                {hasNext
                  ? `A rota continua: a próxima parada já está desbloqueada no mapa.`
                  : "Você cruzou Londres inteira. Passaporte completo — parabéns, viajante!"}
              </p>

              <div className="mt-4 w-full max-w-xs rounded-lg border-2 border-ink/15 bg-card p-3.5 text-left">
                <div className="flex justify-between text-[13px]">
                  <span className="text-ink-soft">Quiz ({result.score}/3 certas)</span>
                  <span className="font-mono font-semibold">+{result.score * XP_PER_QUESTION} XP</span>
                </div>
                {result.score === 3 && !review && (
                  <div className="mt-1 flex justify-between text-[13px]">
                    <span className="flex items-center gap-1 text-ink-soft">
                      <Icon name="star" size={12} strokeWidth={2.2} className="text-mustard" /> Bônus perfeição
                    </span>
                    <span className="font-mono font-semibold text-mustard">+{PERFECT_BONUS} XP</span>
                  </div>
                )}
                <div className="mt-2 flex justify-between border-t-2 border-dashed border-ink/15 pt-2 text-[15px] font-bold">
                  <span>Total</span>
                  <span className="font-mono" style={{ color: loc.color }}>
                    +{result.gained} XP
                  </span>
                </div>
                {isReview && (
                  <p className="mt-2 text-[11.5px] text-ink-soft italic">
                    Modo revisão: sem XP extra — mas praticar nunca é demais.
                  </p>
                )}
              </div>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <button
                  onClick={onClose}
                  className="rounded-lg border-2 border-ink/25 bg-card px-4 py-2.5 font-mono text-[11px] font-semibold tracking-wide text-ink-soft uppercase transition-colors hover:border-ink hover:text-ink"
                >
                  Voltar ao mapa
                </button>
                {hasNext ? (
                  <button
                    onClick={onNext}
                    className="btn-press flex items-center gap-2 rounded-lg border-2 border-ink bg-bus px-4 py-2.5 font-mono text-[12px] font-semibold tracking-wide text-card uppercase shadow-print-sm"
                  >
                    Próxima: {nextName}
                    <Icon name="arrowRight" size={15} strokeWidth={2.4} />
                  </button>
                ) : (
                  <button
                    onClick={onPassport ?? onClose}
                    className="btn-press flex items-center gap-2 rounded-lg border-2 border-ink bg-leaf px-4 py-2.5 font-mono text-[12px] font-semibold tracking-wide text-card uppercase shadow-print-sm"
                  >
                    <Icon name="passport" size={15} strokeWidth={2.2} />
                    Ver passaporte
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
