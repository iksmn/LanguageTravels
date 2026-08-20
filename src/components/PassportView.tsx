import { useState } from "react";
import { WEEKS } from "../data/curriculum";
import { TOTAL_DAYS, levelTitle } from "../lib/engine";
import type { UseProgressReturn } from "../hooks/useProgress";
import { Icon } from "./Icons";

function formatDate(iso: string) {
  try {
    return new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  } catch {
    return iso;
  }
}

export function PassportView({ prog, onReset }: { prog: UseProgressReturn; onReset: () => void }) {
  const [confirming, setConfirming] = useState(false);
  const done = Math.min(prog.currentDay - 1, TOTAL_DAYS);
  const pct = Math.round((done / TOTAL_DAYS) * 100);

  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-5">
      {/* capa do passaporte */}
      <div className="fade-up relative overflow-hidden rounded-xl border-2 border-ink bg-navy p-6 text-paper shadow-print sm:p-7">
        <div className="paper-noise pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div className="spin-slower absolute -top-24 -right-24 h-72 w-72 rounded-full border-2 border-dashed border-paper/15" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-mustard text-mustard">
            <Icon name="passport" size={30} strokeWidth={1.6} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] font-bold tracking-[0.28em] text-mustard uppercase">
              Passeport d'apprentissage
            </p>
            <h1 className="mt-1 font-display text-[26px] leading-tight font-extrabold tracking-tight sm:text-3xl">
              Français · Niveau A1
            </h1>
            <p className="mt-1 text-[13px] text-paper/75">
              {done} de {TOTAL_DAYS} dias na rota · {prog.progress.xp.toLocaleString("pt-BR")} XP · {levelTitle(prog.progress.xp)}
            </p>
            <div className="mt-3 h-2 max-w-md overflow-hidden rounded-full bg-paper/15">
              <div className="bar-grow h-full rounded-full bg-mustard" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <div className="grid shrink-0 grid-cols-3 gap-2 text-center font-mono sm:grid-cols-1 sm:gap-1.5">
            <div>
              <p className="flex items-center justify-center gap-1 text-lg font-bold text-paper sm:justify-start">
                <Icon name="flame" size={15} strokeWidth={2.2} className="text-flame" />
                {prog.progress.streak}
              </p>
              <p className="text-[9px] tracking-[0.18em] text-paper/60 uppercase">sequência</p>
            </div>
            <div>
              <p className="flex items-center justify-center gap-1 text-lg font-bold text-paper sm:justify-start">
                <Icon name="check" size={15} strokeWidth={2.4} className="text-leaf" />
                {prog.weekStamps.length}/12
              </p>
              <p className="text-[9px] tracking-[0.18em] text-paper/60 uppercase">carimbos</p>
            </div>
            <div>
              <p className={`flex items-center justify-center gap-1 text-lg font-bold sm:justify-start ${prog.certificateEarned ? "text-mustard" : "text-paper/40"}`}>
                <Icon name="cap" size={15} strokeWidth={2.2} />
                {prog.certificateEarned ? "A1" : "—"}
              </p>
              <p className="text-[9px] tracking-[0.18em] text-paper/60 uppercase">diploma</p>
            </div>
          </div>
        </div>
      </div>

      {/* carimbos */}
      <div>
        <div className="mb-3 flex items-baseline justify-between px-1">
          <h2 className="font-display text-lg font-bold tracking-tight">Página de carimbos</h2>
          <p className="font-mono text-[10px] tracking-[0.16em] text-ink-soft uppercase">1 carimbo por semana · no dia do quiz</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {WEEKS.map((w, i) => {
            const rec = prog.progress.days[(w.num - 1) * 7 + 3];
            const earned = Boolean(rec);
            return (
              <div
                key={w.id}
                className={`fade-up flex aspect-square flex-col items-center justify-center rounded-full border-4 p-3 text-center transition-transform duration-300 ${
                  earned
                    ? "border-double hover:scale-105"
                    : "border-dashed border-ink/20 bg-card/60"
                } ${earned ? (i % 2 === 0 ? "-rotate-3" : "rotate-2") : ""}`}
                style={earned ? { borderColor: w.color, color: w.color, background: `${w.color}0d` } : undefined}
                title={earned ? `${w.place} — ${rec!.date}` : `Semana ${w.num}: conclua o quiz (dia ${(w.num - 1) * 7 + 3}) para carimbar`}
              >
                {earned ? (
                  <>
                    <Icon name={w.icon} size={20} strokeWidth={2} />
                    <p className="mt-1 font-display text-[12.5px] leading-tight font-extrabold uppercase">{w.city}</p>
                    <p className="font-mono text-[8.5px] font-bold tracking-[0.2em]">S{String(w.num).padStart(2, "0")}</p>
                    <p className="mt-0.5 font-mono text-[9px] opacity-75">{formatDate(rec!.date)}</p>
                    {rec!.score === rec!.total && (
                      <p className="mt-0.5 flex items-center gap-0.5 font-mono text-[8.5px] font-bold tracking-wider uppercase">
                        <Icon name="star" size={9} strokeWidth={2.6} /> ouro
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <Icon name="lock" size={16} strokeWidth={2} className="text-ink/25" />
                    <p className="mt-1 font-mono text-[9px] font-semibold tracking-[0.16em] text-ink/35 uppercase">
                      Semaine {String(w.num).padStart(2, "0")}
                    </p>
                    <p className="text-[10px] text-ink/30">{w.city}</p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* diploma */}
      <div>
        <div className="mb-3 flex items-baseline justify-between px-1">
          <h2 className="font-display text-lg font-bold tracking-tight">Diplôme A1</h2>
          <p className="font-mono text-[10px] tracking-[0.16em] text-ink-soft uppercase">liberado no dia 90</p>
        </div>
        {prog.certificateEarned ? (
          <div className="fade-up relative overflow-hidden rounded-xl border-4 border-double border-mustard bg-card p-6 text-center sm:p-8">
            <p className="font-mono text-[10px] font-bold tracking-[0.3em] text-mustard uppercase">République du Voyage</p>
            <div className="mx-auto mt-3 flex h-16 w-16 items-center justify-center rounded-full border-2 border-mustard text-mustard">
              <Icon name="cap" size={30} strokeWidth={1.8} />
            </div>
            <h3 className="mt-3 font-display text-[26px] font-extrabold tracking-tight">Diplôme de Français — Niveau A1</h3>
            <p className="mx-auto mt-2 max-w-md text-[13.5px] leading-relaxed text-ink-soft">
              Concedido a quem percorreu os 90 dias da rota francesa: 12 paradas, 60 palavras, diálogos, escuta e um
              exame final. <strong className="text-ink">Bravo, et à la prochaine !</strong>
            </p>
            <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-ink/45 uppercase">
              {prog.progress.days[TOTAL_DAYS]?.date ? formatDate(prog.progress.days[TOTAL_DAYS].date) : ""} · {prog.progress.xp.toLocaleString("pt-BR")} XP · RUMO
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-4 rounded-xl border-2 border-dashed border-ink/25 bg-card/70 p-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-ink/15 text-ink/30">
              <Icon name="lock" size={20} strokeWidth={2} />
            </span>
            <div>
              <p className="font-display text-[15px] font-bold">Ainda faltam {Math.max(0, TOTAL_DAYS - done)} dias de jornada.</p>
              <p className="mt-0.5 text-[13px] text-ink-soft">
                Complete a rota até o dia 90 e passe no exame final (6+ de 10) para gravar seu certificado aqui.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* rodapé: reset */}
      <div className="flex items-center justify-between gap-3 border-t-2 border-ink/10 px-1 pt-4">
        <p className="text-[12px] text-ink-soft">
          Progresso salvo localmente neste navegador. Zerar apaga XP, carimbos e sequência.
        </p>
        {confirming ? (
          <div className="flex shrink-0 items-center gap-2">
            <span className="font-mono text-[11px] font-semibold text-bus">Apagar tudo?</span>
            <button
              onClick={() => {
                onReset();
                setConfirming(false);
              }}
              className="btn-press rounded-md border-2 border-ink bg-bus px-3 py-1.5 font-mono text-[11px] font-bold tracking-wide text-card uppercase shadow-print-sm"
            >
              Sim, apagar
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="btn-press rounded-md border-2 border-ink/20 bg-card px-3 py-1.5 font-mono text-[11px] font-semibold uppercase"
            >
              Não
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirming(true)}
            className="btn-press flex shrink-0 items-center gap-1.5 rounded-md border-2 border-ink/20 bg-card px-3 py-1.5 font-mono text-[11px] font-semibold tracking-wide text-ink-soft uppercase shadow-print-sm hover:border-bus hover:text-bus"
          >
            <Icon name="reset" size={13} strokeWidth={2.2} />
            Zerar progresso
          </button>
        )}
      </div>
    </section>
  );
}
