import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icons";
import { XP_PER_LEVEL } from "../data/lessons";

/** Número que "conta" até o valor alvo quando ele muda. */
function useCountUp(target: number) {
  const [val, setVal] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const from = prev.current;
    if (from === target) {
      setVal(target);
      return;
    }
    const t0 = performance.now();
    const dur = 550;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setVal(Math.round(from + (target - from) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else prev.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return val;
}

export function Header({
  view,
  onView,
  xp,
  streak,
  level,
}: {
  view: "map" | "passport";
  onView: (v: "map" | "passport") => void;
  xp: number;
  streak: number;
  level: number;
}) {
  const shownXp = useCountUp(xp);
  const pct = Math.min(100, Math.round(((xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100));

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-card/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 sm:px-6">
        {/* marca */}
        <div className="flex items-center gap-2.5">
          <span className="group grid h-10 w-10 place-items-center rounded-lg border-2 border-ink bg-bus text-card shadow-print-sm transition-transform duration-300 hover:rotate-45">
            <Icon name="compass" size={22} strokeWidth={2} />
          </span>
          <div className="leading-none">
            <p className="font-display text-[22px] font-extrabold tracking-tight">Rumo</p>
            <p className="mt-0.5 font-mono text-[10px] tracking-[0.14em] text-ink-soft uppercase">
              inglês · Londres
            </p>
          </div>
        </div>

        {/* abas */}
        <nav className="order-3 flex w-full justify-center sm:order-none sm:w-auto sm:flex-1">
          <div className="flex rounded-full border-2 border-ink bg-paper p-1">
            {(
              [
                { id: "map", label: "Mapa da rota", icon: "pin" },
                { id: "passport", label: "Passaporte", icon: "passport" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => onView(t.id)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-wide uppercase transition-all duration-200 sm:px-4 ${
                  view === t.id
                    ? "bg-ink text-paper shadow-print-sm"
                    : "text-ink-soft hover:bg-card hover:text-ink"
                }`}
              >
                <Icon name={t.icon} size={14} strokeWidth={2.2} />
                {t.label}
              </button>
            ))}
          </div>
        </nav>

        {/* estatísticas */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <span
            className="flex items-center gap-1 rounded-full border-2 border-ink/15 bg-mustard/15 px-2.5 py-1 font-mono text-[11px] font-semibold text-ink"
            title="Dias seguidos de estudo"
          >
            <Icon name="flame" size={14} strokeWidth={2.1} className="text-flame" />
            {streak} {streak === 1 ? "dia" : "dias"}
          </span>

          <span className="hidden items-center gap-1 rounded-full border-2 border-ink/15 bg-cobalt/10 px-2.5 py-1 font-mono text-[11px] font-semibold sm:flex">
            <Icon name="globe" size={14} strokeWidth={2.1} className="text-cobalt" />
            Nível {level}
          </span>

          <div className="hidden w-28 md:block" title={`${xp % XP_PER_LEVEL}/${XP_PER_LEVEL} XP para o próximo nível`}>
            <div className="mb-1 flex items-baseline justify-between font-mono text-[10px] text-ink-soft">
              <span className="font-semibold text-ink">{shownXp} XP</span>
              <span>{pct}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full border border-ink/20 bg-ink/5">
              <div
                className="h-full rounded-full bg-bus transition-[width] duration-700 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
