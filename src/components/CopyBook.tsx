import { useMemo, useRef, useState } from "react";
import type { Week } from "../data/curriculum";
import { dicteeLines, uiStrings, weekTag } from "../data/content";
import type { UseProgressReturn } from "../hooks/useProgress";
import { getDayInfo } from "../lib/engine";
import { Icon } from "./Icons";
import { useToast } from "./Toasts";

const XP_COPIE = 15;

/** Faixa de acerto caractere a caractere: verde (certo), vermelho (errado), cinza (ainda vazio). */
function DiffStrip({ target, value }: { target: string; value: string }) {
  return (
    <div className="flex flex-wrap gap-[3px]" aria-hidden>
      {target.split("").map((ch, i) => {
        let cls = "bg-ink/10";
        if (i < value.length) cls = value[i] === ch ? "bg-leaf" : "bg-bus";
        if (ch === " ") cls = i < value.length ? (value[i] === " " ? "bg-leaf/40" : "bg-bus/40") : "bg-ink/5";
        return <span key={i} className={`h-1.5 w-1.5 rounded-full ${cls}`} />;
      })}
    </div>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <span className={filled ? "text-mustard" : "text-ink/20"}>
      <Icon name="star" size={13} strokeWidth={2.2} />
    </span>
  );
}

export function CopyBook({ week, day, prog }: { week: Week; day: number; prog: UseProgressReturn }) {
  const toast = useToast();
  const info = getDayInfo(day);
  const dayInWeek = day - (info.week - 1) * 7; // 1..7 (semana final: 1..6)
  const lines = useMemo(() => dicteeLines(week.id, dayInWeek), [week.id, dayInWeek]);

  const [values, setValues] = useState<string[]>(() => lines.map(() => ""));
  const [showTrans, setShowTrans] = useState(false);
  const [done, setDone] = useState(prog.isCopyDone(day));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  if (!lines.length) return null; // outros idiomas: em breve

  const targets = lines.map((l) => l.fr.trim());
  const lineDone = targets.map((t, i) => (values[i] ?? "").trim() === t);
  const allDone = lineDone.every(Boolean);
  const stars = Math.min(5, Math.ceil(info.week / 2.6));

  const totalChars = targets.reduce((s, t) => s + t.length, 0);
  const goodChars = targets.reduce((acc, t, i) => {
    const v = values[i] ?? "";
    return acc + t.split("").filter((ch, j) => v[j] === ch).length;
  }, 0);
  const accuracy = totalChars ? Math.round((goodChars / totalChars) * 100) : 0;

  const setValue = (i: number, v: string) => {
    setValues((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
    // avança o foco para a próxima linha ao completar
    if (v.trim() === targets[i] && i + 1 < targets.length) {
      window.setTimeout(() => inputRefs.current[i + 1]?.focus(), 60);
    }
  };

  const validate = () => {
    if (!allDone || done) return;
    const gained = prog.completeCopy(day, XP_COPIE);
    setDone(true);
    if (gained > 0) toast(`Copie parfaite ! +${gained} XP`, "xp");
  };

  return (
    <section className="mt-6" aria-label="Cahier de copie">
      {/* caderno */}
      <div className="cahier-paper relative overflow-hidden rounded-xl border-2 border-ink/25 shadow-print-sm">
        {/* fita adesiva */}
        <div className="absolute -top-2 left-1/2 z-10 h-5 w-24 -translate-x-1/2 rotate-[-2deg] rounded-sm bg-mustard/60 shadow-sm" aria-hidden />

        <header className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink/10 bg-card/70 px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-md border-2 border-ink bg-cobalt text-card shadow-print-sm">
              <Icon name="pen" size={16} strokeWidth={2} />
            </span>
            <div className="leading-tight">
              <p className="font-display text-[15px] font-extrabold tracking-tight">Cahier de copie</p>
              <p className="font-mono text-[9.5px] font-semibold tracking-[0.16em] text-ink-soft uppercase">
                {(() => {
                  const ui = uiStrings();
                  return `${ui.dayLabel} ${day}${ui.daySuffix} · ${info.week <= 12 ? weekTag(info.week) : ui.grandeRevisionShort}`;
                })()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5" title={`Difficulté ${stars}/5`}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} filled={i < stars} />
              ))}
            </div>
            <button
              onClick={() => setShowTrans((s) => !s)}
              className="btn-press rounded-md border-2 border-ink/20 bg-card px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wide uppercase shadow-print-sm"
            >
              {showTrans ? "Ocultar tradução" : "Tradução"}
            </button>
          </div>
        </header>

        <div className="cahier-margin px-4 py-4 sm:px-6">
          <p className="mb-3 font-mono text-[10px] font-semibold tracking-[0.18em] text-ink-soft uppercase">
            Recopie chaque phrase à la main · {lines.length} ligne{lines.length > 1 ? "s" : ""} aujourd'hui
          </p>

          <div className="flex flex-col gap-5">
            {targets.map((t, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                {/* modelo (a copiar) */}
                <p className={`font-hand text-[22px] leading-snug font-medium ${lineDone[i] ? "text-leaf" : "text-cobalt"}`}>
                  {lineDone[i] && (
                    <span className="mr-1.5 inline-block align-middle">
                      <Icon name="check" size={16} strokeWidth={3} />
                    </span>
                  )}
                  {t}
                </p>
                {showTrans && <p className="text-[12px] text-ink-soft italic">{lines[i].pt}</p>}

                {/* linha de escrita */}
                <div
                  className={`rounded-md border-b-2 px-2 pb-1 pt-0.5 transition-colors ${
                    lineDone[i] ? "border-leaf bg-leaf/5" : "border-cobalt/50 bg-paper/60 focus-within:border-cobalt"
                  }`}
                >
                  <input
                    ref={(el) => {
                      inputRefs.current[i] = el;
                    }}
                    value={values[i] ?? ""}
                    onChange={(e) => setValue(i, e.target.value)}
                    placeholder={done ? "Cópia concluída ✓" : "Écris ici…"}
                    disabled={done}
                    className="copy-input text-[21px]"
                    aria-label={`Copiar a frase ${i + 1}`}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                  />
                </div>
                <DiffStrip target={t} value={values[i] ?? ""} />
              </div>
            ))}
          </div>

          {/* rodapé */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t-2 border-dashed border-ink/15 pt-3.5">
            <div className="flex items-center gap-4 font-mono text-[11px] font-semibold text-ink-soft">
              <span>
                {lineDone.filter(Boolean).length}/{targets.length} lignes
              </span>
              <span className={accuracy >= 80 ? "text-leaf" : "text-ink-soft"}>précision {accuracy}%</span>
            </div>
            {done ? (
              <span className="flex items-center gap-1.5 rounded-full border-2 border-leaf/50 bg-leaf/10 px-3 py-1 font-mono text-[11px] font-bold tracking-wide text-leaf uppercase">
                <Icon name="check" size={13} strokeWidth={2.8} />
                Copiée · +{XP_COPIE} XP
              </span>
            ) : (
              <button
                onClick={validate}
                disabled={!allDone}
                className="btn-press flex items-center gap-1.5 rounded-lg border-2 border-ink bg-cobalt px-4 py-2 font-mono text-[11.5px] font-bold tracking-wide text-card uppercase shadow-print-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Icon name="pen" size={14} strokeWidth={2.2} />
                Valider la copie
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
