import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Week } from "../data/curriculum";
import { CAST_MAP, findChar } from "../data/cast";
import {
  SESSION_ICONS,
  SESSION_META,
  XP,
  getDayInfo,
  sessionQuestions,
  xpForSession,
  type GenQ,
} from "../lib/engine";
import { canSpeak, speak, stopSpeaking } from "../lib/speech";
import { Icon, type IconName } from "./Icons";
import { Avatar } from "./Avatar";

/* ------------------------------ confete ------------------------------ */

const CONFETTI = ["#d7263d", "#e8930c", "#0e8f8b", "#2b6cb0", "#4a9c2f", "#8d4fa0", "#e4572e"];

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.35,
        dur: 1.1 + Math.random() * 0.9,
        color: CONFETTI[i % CONFETTI.length],
        w: 5 + Math.random() * 5,
        h: 8 + Math.random() * 7,
        round: Math.random() > 0.6,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden" aria-hidden>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            width: p.w,
            height: p.h,
            background: p.color,
            borderRadius: p.round ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}

function Stamp({ week }: { week: Week }) {
  return (
    <div
      className="stamp-in -rotate-6 grid h-40 w-40 place-items-center rounded-full border-4 border-double"
      style={{ borderColor: week.color, color: week.color }}
    >
      <div className="text-center leading-tight">
        <Icon name={week.icon} size={26} strokeWidth={2} className="mx-auto" />
        <p className="mt-1 font-display text-[15px] font-extrabold tracking-wide uppercase">{week.city}</p>
        <p className="font-mono text-[9.5px] font-semibold tracking-[0.22em]">SEMAINE {String(week.num).padStart(2, "0")}</p>
        <p className="mt-0.5 font-mono text-[8.5px] tracking-[0.14em]">A1 · RUMO</p>
      </div>
    </div>
  );
}

function Certificate({ xp, examXp }: { xp: number; examXp: number }) {
  return (
    <div className="relative rounded-xl border-4 border-double border-mustard bg-card p-6 text-center">
      <Confetti />
      <p className="font-mono text-[10px] font-bold tracking-[0.3em] text-mustard uppercase">République du Voyage</p>
      <div className="mx-auto mt-3 flex h-14 w-14 items-center justify-center rounded-full border-2 border-mustard text-mustard">
        <Icon name="cap" size={26} strokeWidth={1.8} />
      </div>
      <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight">Diplôme de Français</h3>
      <p className="font-mono text-[11px] font-semibold tracking-[0.24em] text-ink-soft uppercase">Niveau A1 · 90 jours</p>
      <p className="mx-auto mt-3 max-w-sm text-[13.5px] leading-relaxed text-ink-soft">
        Certificat attribué pour la conclusion de la route complète — de l'aéroport Charles de Gaulle au port
        d'Ajaccio — avec <strong className="text-ink">{xp.toLocaleString("pt-BR")} XP</strong> acumulés.
      </p>
      <div className="mx-auto mt-4 grid max-w-xs grid-cols-3 gap-2 font-mono text-[10px] text-ink-soft">
        <div className="rounded-md border border-ink/15 px-1 py-1.5">
          <p className="text-[13px] font-bold text-ink">90</p>
          dias
        </div>
        <div className="rounded-md border border-ink/15 px-1 py-1.5">
          <p className="text-[13px] font-bold text-ink">13</p>
          carimbos
        </div>
        <div className="rounded-md border border-ink/15 px-1 py-1.5">
          <p className="text-[13px] font-bold text-ink">+{examXp}</p>
          XP no exame
        </div>
      </div>
      <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-ink/40 uppercase">
        {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })} · RUMO
      </p>
    </div>
  );
}

/* --------------------------- vocabulário ----------------------------- */

function VocabCards({ week }: { week: Week }) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setFlipped((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });

  return (
    <div>
      <p className="mb-3 text-[13px] text-ink-soft">
        Toque para virar o cartão · <span className="font-mono text-[12px]">5 palavras novas</span>
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {week.vocab.map((v, i) => {
          const isFlipped = flipped.has(i);
          return (
            <button
              key={v.fr}
              onClick={() => toggle(i)}
              className="perspective-900 group h-[104px] text-left outline-none"
              aria-label={`Cartão de vocabulário: ${v.fr}`}
            >
              <div
                className={`preserve-3d relative h-full w-full rounded-xl border-2 border-ink/20 bg-card transition-transform duration-500 group-hover:border-ink/40 ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
              >
                <div className="backface-hidden absolute inset-0 flex flex-col justify-between rounded-xl p-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-display text-xl font-bold tracking-tight">{v.fr}</p>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(v.fr);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.stopPropagation();
                          speak(v.fr);
                        }
                      }}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-md border-2 border-ink/15 text-ink-soft transition-all hover:scale-110 hover:border-ink hover:text-bus"
                      title="Ouvir pronúncia"
                    >
                      <Icon name="volume" size={15} strokeWidth={2} />
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-ink-soft">{v.ipa}</p>
                </div>
                <div className="backface-hidden absolute inset-0 flex flex-col justify-center rounded-xl border-2 border-ink/15 p-3.5 [transform:rotateY(180deg)]" style={{ background: `${week.color}14` }}>
                  <p className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: week.color }}>
                    Tradução
                  </p>
                  <p className="mt-1 font-display text-lg font-bold">{v.pt}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------ diálogo ------------------------------ */

function DialogueScript({ week }: { week: Week }) {
  const [showTrans, setShowTrans] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const timeouts = useRef<number[]>([]);

  useEffect(() => () => timeouts.current.forEach((t) => window.clearTimeout(t)), []);

  const playAll = () => {
    if (playing) {
      stopSpeaking();
      timeouts.current.forEach((t) => window.clearTimeout(t));
      timeouts.current = [];
      setPlaying(false);
      setActive(null);
      return;
    }
    setPlaying(true);
    setShowTrans(true);
    let acc = 250;
    week.dialogue.forEach((line, i) => {
      timeouts.current.push(
        window.setTimeout(() => {
          speak(line.fr);
          setActive(i);
        }, acc),
      );
      acc += 2400;
    });
    timeouts.current.push(
      window.setTimeout(() => {
        setPlaying(false);
        setActive(null);
      }, acc + 400),
    );
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[13px] text-ink-soft">
          Conversa com <strong className="text-ink">{week.localName}</strong> · {week.localRole}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setShowTrans((s) => !s)}
            className="btn-press rounded-md border-2 border-ink/20 bg-card px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-wide uppercase shadow-print-sm"
          >
            {showTrans ? "Ocultar tradução" : "Ver tradução"}
          </button>
          <button
            onClick={playAll}
            className={`btn-press flex items-center gap-1.5 rounded-md border-2 border-ink px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-wide uppercase shadow-print-sm ${playing ? "bg-bus text-card" : "bg-card"}`}
          >
            <Icon name={playing ? "stop" : "play"} size={12} strokeWidth={2.4} />
            {playing ? "Parar" : "Reproduzir"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {week.dialogue.map((line, i) => {
          const you = line.who === "you";
          const ch = you ? null : findChar(line.speaker);
          const speakerLabel = you ? "Você" : line.speaker ?? week.localName;
          return (
            <div key={i} className={`flex items-end gap-2 ${you ? "justify-end" : "justify-start"}`}>
              {!you && (
                <span className={`shrink-0 rounded-full ring-2 ring-paper ${ch ? "" : "hidden"}`}>
                  {ch && <Avatar char={ch} size={30} />}
                </span>
              )}
              <div
                className={`max-w-[88%] rounded-xl border-2 px-3.5 py-2.5 transition-all duration-300 ${
                  you ? "border-ink/25 bg-card" : "border-ink/15 bg-paper"
                } ${active === i ? "-translate-y-0.5 shadow-print-sm" : ""}`}
                style={active === i ? { borderColor: ch?.color ?? week.color } : undefined}
              >
                <div className="mb-1 flex items-center gap-2">
                  <span
                    className="rounded px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-[0.14em] uppercase"
                    style={{ background: `${you ? "#4c5f74" : ch?.color ?? week.color}1f`, color: you ? "#4c5f74" : ch?.color ?? week.color }}
                  >
                    {speakerLabel}
                  </span>
                  <button
                    onClick={() => speak(line.fr)}
                    className="text-ink-soft transition-colors hover:text-bus"
                    title="Ouvir frase"
                  >
                    <Icon name="volume" size={14} strokeWidth={2} />
                  </button>
                </div>
                <p className="font-display text-[15.5px] leading-snug font-semibold">{line.fr}</p>
                {(showTrans || active === i) && (
                  <p className="mt-1 text-[12.5px] text-ink-soft italic">{line.pt}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* --------------------------- cultura --------------------------------- */

function CultureSession({ week }: { week: Week }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-xl border-2 border-ink bg-navy p-5 text-paper shadow-print">
        <div className="paper-noise pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div className="relative">
          <p className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.24em] text-mustard uppercase">
            <Icon name="sparkle" size={14} strokeWidth={2.2} />
            Le saviez-vous ?
          </p>
          <p className="mt-2.5 font-display text-[19px] leading-snug font-bold">{week.culture}</p>
          <p className="mt-2 font-mono text-[10.5px] tracking-[0.16em] text-paper/60 uppercase">
            {week.place} · {week.region}
          </p>
        </div>
      </div>
      <div className="rounded-xl border-2 border-ink/15 bg-card p-5">
        <p className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.24em] text-leaf uppercase">
          <Icon name="pin" size={14} strokeWidth={2.2} />
          Dica de local
        </p>
        <p className="mt-2 text-[14.5px] leading-relaxed text-ink">{week.tip}</p>
        <p className="mt-3 text-right font-mono text-[11px] text-ink-soft">— {week.localName}, {week.localRole.toLowerCase()}</p>
      </div>
      <button
        onClick={() => speak(week.culture.replace(/[«»]/g, ""))}
        className="flex w-fit items-center gap-2 self-end rounded-md border-2 border-ink/20 bg-card px-3 py-1.5 font-mono text-[10.5px] font-semibold tracking-wide uppercase shadow-print-sm btn-press"
      >
        <Icon name="volume" size={13} strokeWidth={2.2} />
        Ouvir o fato em francês
      </button>
    </div>
  );
}

/* ----------------------- quiz genérico / autoral --------------------- */

interface QuizShellProps {
  total: number;
  progress: number;
  title: string;
  color: string;
  children: ReactNode;
}

function QuizShell({ total, progress, title, color, children }: QuizShellProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <p className="shrink-0 font-mono text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color }}>
          {title}
        </p>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink/10">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${(progress / total) * 100}%`, background: color }}
          />
        </div>
        <p className="shrink-0 font-mono text-[11px] font-semibold text-ink-soft">
          {Math.min(progress, total)}/{total}
        </p>
      </div>
      {children}
    </div>
  );
}

function Options({
  options,
  picked,
  correct,
  onPick,
}: {
  options: string[];
  picked: number | null;
  correct: number;
  onPick: (i: number) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((opt, i) => {
        const isPicked = picked === i;
        const showState = picked !== null;
        const isCorrect = i === correct;
        let cls = "border-ink/20 bg-card hover:-translate-y-0.5 hover:border-ink hover:shadow-print-sm";
        if (showState && isCorrect) cls = "border-2 border-leaf bg-leaf/12 text-leaf";
        else if (showState && isPicked) cls = "border-2 border-bus bg-bus/10 text-bus shake";
        else if (showState) cls = "border-ink/15 bg-card opacity-55";
        return (
          <button
            key={`${opt}-${i}`}
            disabled={picked !== null}
            onClick={() => onPick(i)}
            className={`btn-press flex items-center justify-between gap-2 rounded-lg border-2 px-3.5 py-3 text-left font-display text-[15px] font-semibold transition-all duration-150 ${cls}`}
          >
            <span>{opt}</span>
            {showState && isCorrect && <Icon name="check" size={16} strokeWidth={2.8} />}
            {showState && isPicked && !isCorrect && <Icon name="x" size={16} strokeWidth={2.8} />}
          </button>
        );
      })}
    </div>
  );
}

function AuthoredQuiz({ week, onDone }: { week: Week; onDone: (score: number) => void }) {
  const qs = week.quiz;
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const q = qs[qi];

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    setAnswers((a) => [...a, i]);
  };
  const next = () => {
    if (qi + 1 < qs.length) {
      setQi(qi + 1);
      setPicked(null);
    } else {
      onDone(answers.filter((a, idx) => a === qs[idx].a).length);
    }
  };

  return (
    <QuizShell total={qs.length} progress={qi + (picked !== null ? 1 : 0)} title="Quiz da semana" color={week.color}>
      <h3 className="font-display text-[19px] leading-snug font-bold">{q.q}</h3>
      <Options options={q.options} picked={picked} correct={q.a} onPick={pick} />
      {picked !== null && (
        <div className={`fade-up flex items-start justify-between gap-3 rounded-lg border-2 px-3.5 py-3 ${picked === q.a ? "border-leaf/50 bg-leaf/10" : "border-bus/50 bg-bus/8"}`}>
          <div>
            <p className={`font-mono text-[11px] font-bold tracking-[0.14em] uppercase ${picked === q.a ? "text-leaf" : "text-bus"}`}>
              {picked === q.a ? "Exato! Très bien." : "Quase! A resposta certa está em verde."}
            </p>
            <p className="mt-1 text-[13px] leading-snug text-ink-soft">{q.why}</p>
          </div>
          <button onClick={next} className="btn-press flex shrink-0 items-center gap-1.5 rounded-lg border-2 border-ink bg-ink px-3.5 py-2 font-mono text-[11px] font-bold tracking-wide text-paper uppercase shadow-print-sm">
            {qi + 1 < qs.length ? "Próxima" : "Concluir"}
            <Icon name="arrowRight" size={13} strokeWidth={2.6} />
          </button>
        </div>
      )}
    </QuizShell>
  );
}

function GenQuiz({
  questions,
  kindLabel,
  color,
  listen,
  onDone,
}: {
  questions: GenQ[];
  kindLabel: string;
  color: string;
  listen: boolean;
  onDone: (score: number) => void;
}) {
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const q = questions[qi];

  useEffect(() => {
    if (listen && q.audio) {
      const t = window.setTimeout(() => speak(q.audio!), 350);
      return () => window.clearTimeout(t);
    }
  }, [qi, listen, q.audio]);

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    setAnswers((a) => [...a, i]);
  };
  const next = () => {
    if (qi + 1 < questions.length) {
      setQi(qi + 1);
      setPicked(null);
    } else {
      onDone(answers.filter((a, idx) => a === questions[idx].a).length);
    }
  };

  return (
    <QuizShell total={questions.length} progress={qi + (picked !== null ? 1 : 0)} title={kindLabel} color={color}>
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display text-[19px] leading-snug font-bold">{q.prompt}</h3>
        {listen && q.audio && (
          <button
            onClick={() => speak(q.audio!)}
            className="btn-press flex items-center gap-2 rounded-lg border-2 border-ink px-3 py-1.5 font-mono text-[11px] font-bold tracking-wide uppercase shadow-print-sm"
            style={{ background: `${color}18`, color }}
          >
            <Icon name="volume" size={14} strokeWidth={2.2} />
            Tocar de novo
          </button>
        )}
      </div>
      <Options options={q.options} picked={picked} correct={q.a} onPick={pick} />
      {picked !== null && (
        <div className={`fade-up flex items-center justify-between gap-3 rounded-lg border-2 px-3.5 py-2.5 ${picked === q.a ? "border-leaf/50 bg-leaf/10" : "border-bus/50 bg-bus/8"}`}>
          <p className={`text-[13px] leading-snug ${picked === q.a ? "text-leaf" : "text-ink-soft"}`}>
            {picked === q.a ? "Bonne réponse !" : q.why ?? `A resposta era «${q.options[q.a]}».`}
          </p>
          <button onClick={next} className="btn-press flex shrink-0 items-center gap-1.5 rounded-lg border-2 border-ink bg-ink px-3.5 py-2 font-mono text-[11px] font-bold tracking-wide text-paper uppercase shadow-print-sm">
            {qi + 1 < questions.length ? "Próxima" : "Concluir"}
            <Icon name="arrowRight" size={13} strokeWidth={2.6} />
          </button>
        </div>
      )}
    </QuizShell>
  );
}

/* ----------------------------- modal --------------------------------- */

interface Result {
  xp: number;
  score?: number;
  total?: number;
  reviewBonus: boolean;
}

export function SessionModal({
  day,
  dayDone,
  totalXp,
  onClose,
  onFinish,
  onExamFail,
  onCertificate,
}: {
  day: number;
  dayDone: boolean;
  totalXp: number;
  onClose: () => void;
  onFinish: (day: number, xp: number, score?: number, total?: number) => number;
  onExamFail: () => void;
  onCertificate: () => void;
}) {
  const info = getDayInfo(day);
  const meta = SESSION_META[info.type];
  const icon = SESSION_ICONS[info.type] as IconName;
  const week = info.weekData;

  const [phase, setPhase] = useState<"session" | "result">(dayDone ? "result" : "session");
  const [result, setResult] = useState<Result | null>(null);
  const [attempt, setAttempt] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  const seed = day * 97 + attempt * 13 + 5;
  const genQs = useMemo(
    () => (["review", "listening", "challenge", "exam"].includes(info.type) ? sessionQuestions(info, seed) : []),
    [info, seed],
  );

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => () => stopSpeaking(), []);

  const handleDone = (score: number, total: number) => {
    if (info.type === "exam" && score < XP.examPassScore) {
      onExamFail();
      setAttempt((a) => a + 1);
      return;
    }
    const xp = xpForSession(info.type, score, total);
    const gained = onFinish(day, xp, total > 0 ? score : undefined, total > 0 ? total : undefined);
    const reviewBonus = gained === 0 && total > 0;
    setResult({ xp: reviewBonus ? Math.max(5, Math.round(xp / 4)) : gained, score: total > 0 ? score : undefined, total: total > 0 ? total : undefined, reviewBonus });
    setPhase("result");
  };

  const finishPlain = () => {
    const xp = xpForSession(info.type, 0, 0);
    const gained = onFinish(day, xp);
    setResult({ xp: Math.max(gained, 0), reviewBonus: gained === 0 });
    setPhase("result");
  };

  const isExam = info.type === "exam";
  const stamp = info.type === "quiz" && week;
  const bodyColor = week?.color ?? meta.color;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-5">
      <div className="absolute inset-0 bg-ink/45 backdrop-blur-[3px]" onClick={onClose} />
      <div className="fade-up relative flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border-2 border-ink bg-paper shadow-print">
        {phase === "result" && (stamp || (isExam && day === 90)) && <Confetti />}

        {/* cabeçalho */}
        <header className="flex items-center gap-3 border-b-2 border-ink/12 bg-card px-4 py-3 sm:px-5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border-2 border-ink text-card shadow-print-sm" style={{ background: bodyColor }}>
            <Icon name={icon} size={19} strokeWidth={2} />
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="font-mono text-[9.5px] font-bold tracking-[0.2em] text-ink-soft uppercase">
              Dia {day} de 90 · {meta.label}
            </p>
            <h2 className="truncate font-display text-[17px] font-extrabold tracking-tight">
              {week ? `${week.title} — ${week.place}` : isExam ? "L'examen final" : "La Grande Révision"}
            </h2>
          </div>
          {dayDone && phase === "session" && (
            <span className="rounded-full border border-leaf/50 bg-leaf/10 px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.14em] text-leaf uppercase">
              Revisão
            </span>
          )}
          <button
            onClick={onClose}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-md border-2 border-ink/15 text-ink-soft transition-colors hover:border-bus hover:text-bus"
            title="Fechar (Esc)"
          >
            <Icon name="x" size={15} strokeWidth={2.4} />
          </button>
        </header>

        {/* corpo */}
        <div ref={bodyRef} className="slim-scroll flex-1 overflow-y-auto px-4 py-5 sm:px-6">
          {phase === "session" ? (
            <>
              {week && (
                <div className="fade-up mb-4 flex items-start gap-3 rounded-lg border-2 border-ink/12 bg-card px-3.5 py-3">
                  <div className="flex shrink-0 -space-x-2 pt-1">
                    {week.cast.map((id) => {
                      const c = CAST_MAP[id];
                      return c ? (
                        <span key={id} className="rounded-full ring-2 ring-paper" title={c.name}>
                          <Avatar char={c} size={30} />
                        </span>
                      ) : null;
                    })}
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: week.color }}>
                      Le récit · {week.themes.map((t) => t.fr).join(" · ")}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-soft italic">{week.story}</p>
                  </div>
                </div>
              )}
              {info.type === "vocab" && week && <VocabCards week={week} />}
              {info.type === "dialogue" && week && (
                <>
                  {week.num === 13 && (
                    <div className="mb-4">
                      <VocabCards week={week} />
                    </div>
                  )}
                  <DialogueScript week={week} />
                </>
              )}
              {info.type === "culture" && week && <CultureSession week={week} />}
              {info.type === "quiz" && week && <AuthoredQuiz week={week} onDone={(s) => handleDone(s, week.quiz.length)} />}
              {info.type === "review" && (
                <GenQuiz
                  key={`rv-${attempt}`}
                  questions={genQs}
                  kindLabel={week ? "Revisão da semana" : "Revisão geral"}
                  color={bodyColor}
                  listen={false}
                  onDone={(s) => handleDone(s, genQs.length)}
                />
              )}
              {info.type === "listening" && (
                <GenQuiz
                  key={`ls-${attempt}`}
                  questions={genQs}
                  kindLabel="Escuta · fr-FR"
                  color={bodyColor}
                  listen
                  onDone={(s) => handleDone(s, genQs.length)}
                />
              )}
              {info.type === "challenge" && (
                <GenQuiz
                  key={`ch-${attempt}`}
                  questions={genQs}
                  kindLabel={week ? "Desafio acumulado" : "Desafio da rota"}
                  color={bodyColor}
                  listen={false}
                  onDone={(s) => handleDone(s, genQs.length)}
                />
              )}
              {isExam && (
                <GenQuiz
                  key={`ex-${attempt}`}
                  questions={genQs}
                  kindLabel={`Exame final · mínimo ${XP.examPassScore}/10`}
                  color="#24457c"
                  listen={false}
                  onDone={(s) => handleDone(s, genQs.length)}
                />
              )}
            </>
          ) : (
            /* resultado */
            result && (
              <div className="flex flex-col items-center py-2 text-center">
                {isExam && day === 90 ? (
                  <div className="w-full">
                    <Certificate xp={totalXp} examXp={result.xp} />
                  </div>
                ) : stamp ? (
                  <Stamp week={week!} />
                ) : (
                  <div className="grid h-36 w-36 place-items-center rounded-full border-4 border-double" style={{ borderColor: bodyColor, color: bodyColor }}>
                    <div className="leading-tight">
                      <p className="font-display text-3xl font-extrabold">+{result.xp}</p>
                      <p className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase">XP</p>
                    </div>
                  </div>
                )}

                <h3 className="mt-5 font-display text-2xl font-extrabold tracking-tight">
                  {isExam && day === 90
                    ? "Approuvé! Você é A1."
                    : dayDone
                      ? "Revisão concluída!"
                      : stamp
                        ? "Carimbo conquistado!"
                        : "Sessão concluída!"}
                </h3>

                {result.score !== undefined && (
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] font-semibold">
                    <span className={`rounded-full border-2 px-3 py-1 ${result.score === result.total ? "border-leaf bg-leaf/10 text-leaf" : "border-ink/20 bg-card text-ink-soft"}`}>
                      {result.score}/{result.total} acertos
                    </span>
                    <span className="rounded-full border-2 border-mustard bg-mustard/12 px-3 py-1 text-ink">
                      +{result.xp} XP{result.reviewBonus ? " (bônus de revisão)" : ""}
                    </span>
                  </div>
                )}
                {result.score === undefined && result.xp > 0 && (
                  <span className="mt-3 rounded-full border-2 border-mustard bg-mustard/12 px-3 py-1 font-mono text-[11px] font-semibold text-ink">
                    +{result.xp} XP {result.reviewBonus ? "(bônus de revisão)" : ""}
                  </span>
                )}

                {stamp && (
                  <p className="mt-2 max-w-sm text-[13.5px] text-ink-soft">
                    Semana {week!.num} carimbada no passaporte. Próxima parada da rota desbloqueada!
                  </p>
                )}
                {dayDone && (
                  <p className="mt-2 text-[12px] text-ink-soft italic">
                    Este dia já estava concluído — você ganhou só um bônus de revisão. Praticar nunca é demais!
                  </p>
                )}

                <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                  {isExam && day === 90 ? (
                    <>
                      <button onClick={onCertificate} className="btn-press flex items-center gap-2 rounded-lg border-2 border-ink bg-mustard px-4 py-2.5 font-mono text-[12px] font-bold tracking-wide text-ink uppercase shadow-print-sm">
                        <Icon name="passport" size={15} strokeWidth={2.2} />
                        Ver no passaporte
                      </button>
                      <button onClick={onClose} className="btn-press rounded-lg border-2 border-ink bg-card px-4 py-2.5 font-mono text-[12px] font-semibold tracking-wide uppercase shadow-print-sm">
                        Voltar ao plano
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={onClose} className="btn-press flex items-center gap-2 rounded-lg border-2 border-ink bg-bus px-4 py-2.5 font-mono text-[12px] font-bold tracking-wide text-card uppercase shadow-print-sm">
                        Continuar
                        <Icon name="arrowRight" size={14} strokeWidth={2.4} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
          )}
        </div>

        {/* rodapé da sessão */}
        {phase === "session" && (info.type === "vocab" || info.type === "dialogue" || info.type === "culture") && (
          <footer className="flex items-center justify-between gap-3 border-t-2 border-ink/12 bg-card px-4 py-3 sm:px-5">
            <p className="font-mono text-[10.5px] font-semibold tracking-wide text-ink-soft uppercase">
              {dayDone ? "Modo revisão" : meta.xpHint}
            </p>
            <button
              onClick={finishPlain}
              className="btn-press flex items-center gap-2 rounded-lg border-2 border-ink px-4 py-2 font-mono text-[11.5px] font-bold tracking-wide text-card uppercase shadow-print-sm"
              style={{ background: bodyColor }}
            >
              <Icon name="check" size={14} strokeWidth={2.6} />
              Concluir sessão
            </button>
          </footer>
        )}
        {phase === "session" && ["quiz", "review", "listening", "challenge", "exam"].includes(info.type) && (
          <footer className="flex items-center justify-between border-t-2 border-ink/12 bg-card px-4 py-2.5 sm:px-5">
            <p className="font-mono text-[10px] font-semibold tracking-wide text-ink-soft uppercase">
              {isExam ? `Aprovação com ${XP.examPassScore}+ acertos` : canSpeak() ? "Dica: leia as opções em voz alta" : meta.xpHint}
            </p>
            <p className="font-mono text-[10px] font-semibold text-ink-soft uppercase">{meta.xpHint}</p>
          </footer>
        )}
      </div>
    </div>
  );
}
