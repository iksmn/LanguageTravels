import { LOCATIONS, type Location } from "../data/lessons";
import type { UseProgressReturn } from "../hooks/useProgress";
import { Icon } from "./Icons";

type StopState = "done" | "current" | "locked";

function stateOf(loc: Location, prog: UseProgressReturn): StopState {
  if (prog.isCompleted(loc.id)) return "done";
  if (prog.currentId === loc.id) return "current";
  return "locked";
}

function Chip({ state, score }: { state: StopState; score?: string }) {
  if (state === "done")
    return (
      <span className="flex items-center gap-1 rounded-full border border-leaf/40 bg-leaf/12 px-2 py-0.5 font-mono text-[10px] font-semibold text-leaf">
        <Icon name="check" size={11} strokeWidth={2.6} />
        {score ?? "ok"}
      </span>
    );
  if (state === "current")
    return (
      <span className="flex items-center gap-1.5 rounded-full border border-bus/40 bg-bus/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-bus">
        <span className="blink-dot h-1.5 w-1.5 rounded-full bg-bus" />
        embarque
      </span>
    );
  return (
    <span className="flex items-center gap-1 rounded-full border border-ink/15 bg-ink/5 px-2 py-0.5 font-mono text-[10px] font-semibold text-ink/45">
      <Icon name="lock" size={11} strokeWidth={2.4} />
      fechada
    </span>
  );
}

export function Sidebar({
  prog,
  onOpen,
}: {
  prog: UseProgressReturn;
  onOpen: (id: string) => void;
}) {
  const done = prog.progress.completed.length;
  const pct = Math.round((done / LOCATIONS.length) * 100);

  return (
    <aside className="flex flex-col gap-4">
      {/* resumo da rota */}
      <div className="fade-up relative overflow-hidden rounded-xl border-2 border-ink bg-navy p-4 text-paper shadow-print">
        <div className="paper-noise pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div className="relative">
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.18em] text-paper/70">
            <span>ROTA 01</span>
            <span>LONDRES · UK</span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <span className="font-display text-2xl font-extrabold tracking-tight">GRU</span>
            <span className="relative h-[2px] flex-1 bg-paper/25">
              <Icon name="plane" size={15} className="absolute -top-[8px] left-1/2 -translate-x-1/2 text-mustard" strokeWidth={2} />
              <span className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-mustard transition-[width] duration-700" style={{ width: `${pct}%` }} />
            </span>
            <span className="font-display text-2xl font-extrabold tracking-tight">LHR</span>
          </div>
          <p className="mt-1.5 text-[12px] text-paper/75">São Paulo → Londres · {LOCATIONS.length} paradas</p>
          <div className="mt-3 flex items-center justify-between font-mono text-[11px]">
            <span className="text-paper/70">
              {done} de {LOCATIONS.length} carimbos
            </span>
            <span className="font-semibold text-mustard">{pct}%</span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-paper/15">
            <div
              className="bar-grow h-full rounded-full bg-mustard transition-[width] duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* bilhetes */}
      <div>
        <div className="mb-2 flex items-baseline justify-between px-1">
          <h2 className="font-display text-lg font-bold">Diário de bordo</h2>
          <span className="font-mono text-[10px] tracking-[0.16em] text-ink-soft uppercase">ordem da rota</span>
        </div>
        <ul className="slim-scroll flex flex-col gap-3">
          {LOCATIONS.map((loc, i) => {
            const st = stateOf(loc, prog);
            const stamp = prog.progress.stamps[loc.id];
            return (
              <li key={loc.id} className="fade-up" style={{ animationDelay: `${120 + i * 70}ms` }}>
                <button
                  onClick={() => onOpen(loc.id)}
                  className={`ticket group flex w-full items-center gap-3 p-3 text-left transition-all duration-200 ${
                    st === "current"
                      ? "border-2 border-bus shadow-print-sm hover:-translate-y-0.5"
                      : st === "done"
                        ? "hover:-translate-y-0.5 hover:shadow-print-sm"
                        : "opacity-70 grayscale-[35%] hover:opacity-90"
                  }`}
                >
                  <span className="w-6 shrink-0 text-center font-mono text-lg font-semibold text-ink/25">
                    {String(loc.num).padStart(2, "0")}
                  </span>
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-md border-2 border-ink/15 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-3"
                    style={{ backgroundColor: `${loc.color}1f`, color: st === "locked" ? "#8b8474" : loc.color }}
                  >
                    <Icon name={st === "locked" ? "lock" : loc.icon} size={19} strokeWidth={2} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-[15px] font-bold leading-tight">
                      {loc.namePt}
                    </span>
                    <span className="block truncate text-[12px] text-ink-soft">{loc.theme}</span>
                  </span>
                  <Chip state={st} score={stamp?.score} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* como funciona */}
      <div className="rounded-xl border-2 border-dashed border-ink/25 bg-card/70 p-4">
        <p className="font-mono text-[10px] font-semibold tracking-[0.18em] text-ink-soft uppercase">Como funciona</p>
        <ul className="mt-2 space-y-1.5 text-[13px] text-ink-soft">
          <li className="flex gap-2">
            <span className="font-mono font-semibold text-bus">1.</span> Toque no pino da parada para abrir a lição.
          </li>
          <li className="flex gap-2">
            <span className="font-mono font-semibold text-bus">2.</span> Estude o vocabulário, ouça o diálogo e vença o quiz.
          </li>
          <li className="flex gap-2">
            <span className="font-mono font-semibold text-bus">3.</span> Ganhe XP, carimbe o passaporte e desbloqueie o próximo destino.
          </li>
        </ul>
      </div>
    </aside>
  );
}
