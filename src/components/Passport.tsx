import { useEffect, useRef, useState } from "react";
import { LOCATIONS } from "../data/lessons";
import type { UseProgressReturn } from "../hooks/useProgress";
import { Icon } from "./Icons";

export function Passport({ prog, onReset }: { prog: UseProgressReturn; onReset: () => void }) {
  const [armed, setArmed] = useState(false);
  const disarm = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(disarm.current), []);

  const done = prog.progress.completed.length;
  const gold = Object.values(prog.progress.stamps).filter((s) => s.perfect).length;

  const handleReset = () => {
    if (!armed) {
      setArmed(true);
      disarm.current = window.setTimeout(() => setArmed(false), 2600);
      return;
    }
    window.clearTimeout(disarm.current);
    setArmed(false);
    onReset();
  };

  return (
    <section className="mx-auto w-full max-w-4xl">
      {/* capa do passaporte */}
      <div className="fade-up relative overflow-hidden rounded-xl border-2 border-ink bg-navy p-5 text-paper shadow-print sm:p-6">
        <div className="paper-noise pointer-events-none absolute inset-0 opacity-[0.07]" />
        <div className="pointer-events-none absolute -top-10 -right-10 h-44 w-44 rounded-full border-2 border-dashed border-paper/20" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] font-semibold tracking-[0.26em] text-paper/60 uppercase">
              Documento de viagem · Rumo
            </p>
            <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight">Passaporte do Viajante</h1>
            <p className="mt-1 max-w-md text-[13.5px] text-paper/75">
              Cada lição concluída vira um carimbo. Acerte tudo e ganhe o <span className="font-semibold text-mustard">selo de ouro</span>.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="font-display text-4xl leading-none font-extrabold text-mustard">
                {done}
                <span className="text-paper/50">/{LOCATIONS.length}</span>
              </p>
              <p className="mt-1 font-mono text-[9px] tracking-[0.22em] text-paper/60 uppercase">carimbos</p>
            </div>
            <div className="text-center">
              <p className="flex items-center justify-center gap-1 font-display text-4xl leading-none font-extrabold text-mustard">
                {gold}
                <Icon name="star" size={22} strokeWidth={2} />
              </p>
              <p className="mt-1 font-mono text-[9px] tracking-[0.22em] text-paper/60 uppercase">selos de ouro</p>
            </div>
          </div>
        </div>
      </div>

      {/* carimbos */}
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4">
        {LOCATIONS.map((loc, i) => {
          const stamp = prog.progress.stamps[loc.id];
          if (!stamp) {
            return (
              <div key={loc.id} className="fade-up flex flex-col items-center" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="grid aspect-square w-full max-w-[150px] place-items-center rounded-full border-2 border-dashed border-ink/25 text-ink/35 transition-colors hover:border-ink/40 hover:text-ink/55">
                  <div className="flex flex-col items-center gap-1.5 text-center">
                    <Icon name="lock" size={18} strokeWidth={2} />
                    <p className="font-mono text-[9px] font-semibold tracking-[0.2em] uppercase">Parada {String(loc.num).padStart(2, "0")}</p>
                    <p className="px-3 font-display text-[12px] leading-tight font-bold">{loc.namePt}</p>
                  </div>
                </div>
                <p className="mt-2 font-mono text-[9px] tracking-[0.18em] text-ink/35 uppercase">aguardando viagem</p>
              </div>
            );
          }
          return (
            <div key={loc.id} className="fade-up flex flex-col items-center" style={{ animationDelay: `${i * 60}ms` }}>
              <div
                className={`stamp-in grid aspect-square w-full max-w-[150px] cursor-default place-items-center rounded-full border-4 border-double transition-transform duration-300 hover:scale-105 ${
                  i % 2 === 0 ? "-rotate-6" : "rotate-3"
                }`}
                style={{ borderColor: loc.color, color: loc.color }}
                title={`Concluída em ${stamp.date} · ${stamp.score}`}
              >
                <div className="grid h-[82%] w-[82%] place-items-center rounded-full border-2 border-dashed" style={{ borderColor: loc.color }}>
                  <div className="flex flex-col items-center gap-0.5 px-3 text-center">
                    <Icon name={loc.icon} size={20} strokeWidth={2} />
                    <p className="font-mono text-[8px] font-bold tracking-[0.22em] uppercase">{loc.nameEn}</p>
                    <p className="font-display text-[12.5px] leading-tight font-extrabold">{loc.namePt}</p>
                    <p className="font-mono text-[8.5px] tracking-wide uppercase">
                      {stamp.date} · {stamp.score}
                    </p>
                    {stamp.perfect && (
                      <span className="flex items-center gap-1 font-mono text-[8px] font-bold text-mustard">
                        <Icon name="star" size={9} strokeWidth={2.6} /> OURO
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="mt-2 font-mono text-[9px] tracking-[0.18em] text-ink/45 uppercase">
                carimbada em {stamp.date}
              </p>
            </div>
          );
        })}
      </div>

      {/* rodapé */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t-2 border-dashed border-ink/15 pt-4">
        <p className="font-mono text-[11px] text-ink/45">Seus carimbos ficam salvos neste navegador.</p>
        <button
          onClick={handleReset}
          className={`btn-press flex items-center gap-2 rounded-md border-2 px-3 py-1.5 font-mono text-[11px] font-semibold tracking-wide uppercase shadow-print-sm ${
            armed ? "border-ink bg-bus text-card" : "border-ink/30 bg-card text-ink-soft hover:border-ink hover:text-ink"
          }`}
        >
          <Icon name="reset" size={13} strokeWidth={2.2} />
          {armed ? "Clique de novo para confirmar" : "Apagar progresso"}
        </button>
      </div>
    </section>
  );
}
