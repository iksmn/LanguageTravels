import { useMemo, useState } from "react";
import { LOCATIONS, type Location } from "../data/lessons";
import type { UseProgressReturn } from "../hooks/useProgress";
import { IconGlyph, Icon } from "./Icons";

const VB_W = 1000;
const VB_H = 640;

const DISTRICTS: { label: string; x: number; y: number; anchor?: "start" | "middle" | "end" }[] = [
  { label: "KING'S CROSS", x: 648, y: 96, anchor: "start" },
  { label: "SOHO", x: 500, y: 316, anchor: "start" },
  { label: "WEST END", x: 420, y: 400, anchor: "middle" },
  { label: "BOROUGH", x: 648, y: 462, anchor: "start" },
  { label: "WESTMINSTER", x: 618, y: 330, anchor: "middle" },
  { label: "CITY OF LONDON", x: 716, y: 296, anchor: "middle" },
  { label: "HYDE PARK", x: 292, y: 412, anchor: "middle" },
  { label: "MAYFAIR", x: 368, y: 262, anchor: "middle" },
  { label: "GREENWICH", x: 900, y: 484, anchor: "middle" },
  { label: "PADDINGTON", x: 250, y: 172, anchor: "middle" },
];

const FLIGHT_PATH = "M -15 78 C 90 50 30 300 76 446";

/** Curva suave entre dois pinos, com leve arco orgânico. */
function segPath(a: { x: number; y: number }, b: { x: number; y: number }, i: number) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const bend = Math.min(34, len * 0.16) * (i % 2 === 0 ? 1 : -1);
  const cx = mx + (-dy / len) * bend;
  const cy = my + (dx / len) * bend;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}

export function MapView({
  prog,
  onSelect,
  onLocked,
  onGoCurrent,
}: {
  prog: UseProgressReturn;
  onSelect: (id: string) => void;
  onLocked: (loc: Location) => void;
  onGoCurrent: () => void;
}) {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const doneCount = prog.progress.completed.length;
  const hoverLoc = useMemo(() => LOCATIONS.find((l) => l.id === hoverId) ?? null, [hoverId]);

  const stateOf = (i: number): "done" | "current" | "locked" =>
    i < doneCount ? "done" : i === doneCount ? "current" : "locked";

  const nextLoc = prog.currentId ? LOCATIONS.find((l) => l.id === prog.currentId) : null;

  return (
    <section className="flex flex-col gap-3">
      {/* cabeçalho da rota */}
      <div className="fade-up flex flex-wrap items-end justify-between gap-3 px-1">
        <div>
          <p className="font-mono text-[10px] font-semibold tracking-[0.22em] text-ink-soft uppercase">
            Rota 01 · {LOCATIONS.length} paradas · Londres
          </p>
          <h1 className="mt-1 max-w-xl font-display text-2xl leading-[1.08] font-extrabold tracking-tight sm:text-[28px]">
            Do pouso em Heathrow ao adeus na <span className="text-bus">Tower Bridge</span>
          </h1>
        </div>
        {nextLoc ? (
          <button
            onClick={onGoCurrent}
            className="btn-press flex items-center gap-2 rounded-lg border-2 border-ink bg-bus px-3.5 py-2 font-mono text-[11px] font-semibold tracking-wide text-card uppercase shadow-print-sm"
          >
            Próxima parada: {nextLoc.namePt}
            <Icon name="arrowRight" size={14} strokeWidth={2.4} />
          </button>
        ) : (
          <span className="flex items-center gap-2 rounded-lg border-2 border-ink bg-leaf px-3.5 py-2 font-mono text-[11px] font-semibold tracking-wide text-card uppercase shadow-print-sm">
            <Icon name="check" size={14} strokeWidth={2.6} />
            Rota concluída
          </span>
        )}
      </div>

      {/* mapa */}
      <div className="fade-up paper-grid relative overflow-hidden rounded-xl border-2 border-ink/25 bg-[#efe7d3] shadow-print" style={{ animationDelay: "120ms" }}>
        <div className="paper-noise pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div className="relative aspect-[1000/640] w-full">
          <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full" role="img" aria-label="Mapa ilustrado de Londres com as paradas da rota">
            <defs>
              <path id="thamesPath" d="M -20 565 C 120 545 200 470 320 455 C 420 443 450 470 520 450 C 585 432 610 402 665 396 C 745 387 790 425 865 400 C 935 377 985 335 1020 322" fill="none" />
            </defs>

            {/* estradas */}
            <g stroke="rgba(30,42,56,0.10)" strokeWidth="1.4" strokeDasharray="5 7" fill="none">
              <path d="M 150 -10 L 215 650" />
              <path d="M -10 245 L 1010 168" />
              <path d="M 695 -10 L 625 650" />
              <path d="M 870 -10 L 930 650" />
            </g>

            {/* parques */}
            <g fill="#c8dcae" stroke="#a9c489" strokeWidth="1.4">
              <ellipse cx="295" cy="352" rx="70" ry="48" opacity="0.85" />
              <ellipse cx="478" cy="104" rx="52" ry="33" opacity="0.8" />
              <ellipse cx="395" cy="374" rx="30" ry="20" opacity="0.75" />
              <ellipse cx="842" cy="248" rx="48" ry="33" opacity="0.8" />
            </g>

            {/* Tâmisa */}
            <use href="#thamesPath" stroke="#a6d3e6" strokeWidth="30" strokeLinecap="round" />
            <use href="#thamesPath" stroke="#8fc6de" strokeWidth="18" strokeLinecap="round" opacity="0.7" />
            <text fontFamily="'IBM Plex Mono', monospace" fontSize="10" letterSpacing="3.5" fill="#4b7f99" opacity="0.85">
              <textPath href="#thamesPath" startOffset="13%">
                RIO TÂMISA · RIVER THAMES
              </textPath>
            </text>

            {/* bairros */}
            <g fontFamily="'IBM Plex Mono', monospace" fontSize="10" letterSpacing="2.2" fill="rgba(30,42,56,0.34)" fontWeight={600}>
              {DISTRICTS.map((d) => (
                <text key={d.label} x={d.x} y={d.y} textAnchor={d.anchor ?? "middle"}>
                  {d.label}
                </text>
              ))}
            </g>

            {/* voo GRU → LHR */}
            <path d={FLIGHT_PATH} fill="none" stroke="rgba(215,38,61,0.45)" strokeWidth="1.6" className="marching" style={{ strokeDasharray: "3 9" }} />
            <g opacity="0.95">
              <animateMotion dur="9s" repeatCount="indefinite" rotate="auto" path={FLIGHT_PATH} />
              <g transform="translate(-11,-11) scale(0.92)" stroke="#d7263d" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <IconGlyph name="plane" />
              </g>
            </g>

            {/* trilha base (pontilhada) */}
            <g fill="none" stroke="#b3a788" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="2 8">
              {LOCATIONS.slice(0, -1).map((loc, i) => (
                <path key={loc.id} d={segPath(loc, LOCATIONS[i + 1], i)} />
              ))}
            </g>

            {/* trilha percorrida */}
            <g fill="none" strokeLinecap="round">
              {LOCATIONS.slice(0, -1).map((loc, i) => {
                const d = segPath(loc, LOCATIONS[i + 1], i);
                const done = i <= doneCount - 2;
                const active = i === doneCount - 1 && doneCount < LOCATIONS.length;
                if (!done && !active) return null;
                return active ? (
                  <path key={`a-${loc.id}`} d={d} stroke="#d7263d" strokeWidth="3" className="marching" />
                ) : (
                  <path
                    key={`d-${loc.id}`}
                    d={d}
                    stroke="#d7263d"
                    strokeWidth="3.4"
                    pathLength={1}
                    strokeDasharray={1}
                    strokeDashoffset={0}
                    style={{ transition: "stroke-dashoffset 1s ease" }}
                  />
                );
              })}
            </g>

            {/* rosa dos ventos */}
            <g transform="translate(918,92)">
              <circle r="36" fill="rgba(255,253,244,0.6)" stroke="rgba(30,42,56,0.3)" strokeWidth="1.5" />
              <circle r="26" fill="none" stroke="rgba(30,42,56,0.18)" strokeWidth="1" />
              <g fill="rgba(30,42,56,0.45)">
                <path d="M 0 -34 L 5 -7 L 0 0 L -5 -7 Z" />
                <path d="M 0 34 L 5 7 L 0 0 L -5 7 Z" />
                <path d="M -34 0 L -7 -5 L 0 0 L -7 5 Z" />
                <path d="M 34 0 L 7 -5 L 0 0 L 7 5 Z" />
              </g>
              <g fill="rgba(215,38,61,0.85)" transform="rotate(45)">
                <path d="M 0 -20 L 4 -5 L 0 0 L -4 -5 Z" />
                <path d="M 0 20 L 4 5 L 0 0 L -4 5 Z" />
                <path d="M -20 0 L -5 -4 L 0 0 L -5 4 Z" />
                <path d="M 20 0 L 5 -4 L 0 0 L 5 4 Z" />
              </g>
              <text y="-42" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="12" fontWeight={700} fill="rgba(30,42,56,0.7)">
                N
              </text>
            </g>

            {/* coordenadas + escala */}
            <g fontFamily="'IBM Plex Mono', monospace" fill="rgba(30,42,56,0.55)">
              <text x="34" y="42" fontSize="11" fontWeight={600}>
                51°30′N · 0°07′W
              </text>
              <text x="34" y="57" fontSize="8.5" letterSpacing="2.5" fill="rgba(30,42,56,0.4)">
                LONDRES — REINO UNIDO
              </text>
            </g>
            <g transform="translate(34,596)" fontFamily="'IBM Plex Mono', monospace">
              <g stroke="rgba(30,42,56,0.6)" strokeWidth="1">
                <rect x="0" y="0" width="40" height="5" fill="rgba(30,42,56,0.6)" />
                <rect x="40" y="0" width="40" height="5" fill="rgba(255,253,244,0.8)" />
                <rect x="80" y="0" width="40" height="5" fill="rgba(30,42,56,0.6)" />
              </g>
              <g fontSize="8.5" fill="rgba(30,42,56,0.5)">
                <text x="0" y="16">0</text>
                <text x="36" y="16">5</text>
                <text x="72" y="16">10 km</text>
              </g>
            </g>

            {/* pinos */}
            {LOCATIONS.map((loc, i) => {
              const st = stateOf(i);
              const fill = st === "locked" ? "#b6ac95" : loc.color;
              return (
                <g key={loc.id} transform={`translate(${loc.x},${loc.y})`}>
                  <g className="pin-in" style={{ animationDelay: `${250 + i * 85}ms` }}>
                  <g
                    className="pin-body cursor-pointer outline-none"
                    role="button"
                    tabIndex={0}
                    aria-label={`Parada ${loc.num}: ${loc.namePt} (${st === "done" ? "concluída" : st === "current" ? "atual" : "bloqueada"})`}
                    onClick={() => (st === "locked" ? onLocked(loc) : onSelect(loc.id))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        st === "locked" ? onLocked(loc) : onSelect(loc.id);
                      }
                    }}
                    onMouseEnter={() => setHoverId(loc.id)}
                    onMouseLeave={() => setHoverId(null)}
                    onFocus={() => setHoverId(loc.id)}
                    onBlur={() => setHoverId(null)}
                  >
                    {st === "current" && <circle className="halo" cy="-24" r="24" fill={loc.color} opacity="0.5" />}
                    {prog.currentId === loc.id && (
                      <circle className="spin-slow" cy="-24" r="23" fill="none" stroke={loc.color} strokeWidth="1.6" strokeDasharray="4 5" />
                    )}
                    <path
                      d="M 0 0 C -3 -8 -16 -13 -16 -26 A 16 16 0 1 1 16 -26 C 16 -13 3 -8 0 0 Z"
                      fill={fill}
                      stroke="#fffdf4"
                      strokeWidth="2.2"
                    />
                    <g
                      transform="translate(-10,-34) scale(0.833)"
                      stroke="#fffdf4"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <IconGlyph name={st === "locked" ? "lock" : loc.icon} />
                    </g>
                    {st === "done" && (
                      <g transform="translate(13,-38)">
                        <circle r="7.5" fill="#fffdf4" stroke="rgba(30,42,56,0.25)" strokeWidth="1" />
                        <path d="M -3.2 0.2 L -1 2.6 L 3.4 -2.4" stroke="#4a9c2f" strokeWidth="2.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                    )}
                    <text
                      y="15"
                      textAnchor="middle"
                      fontFamily="'IBM Plex Mono', monospace"
                      fontSize="9.5"
                      letterSpacing="1.4"
                      fontWeight={600}
                      fill={st === "locked" ? "rgba(30,42,56,0.35)" : "rgba(30,42,56,0.62)"}
                    >
                      {loc.nameEn.toUpperCase()}
                    </text>
                    {st === "current" && (
                      <g transform="translate(0,-58)">
                        <rect x="-50" y="-14" width="100" height="17" rx="8.5" fill="#d7263d" />
                        <path d="M -4 3 L 4 3 L 0 8 Z" fill="#d7263d" />
                        <text y="-2" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fontWeight={700} letterSpacing="1.3" fill="#fffdf4">
                          VOCÊ ESTÁ AQUI
                        </text>
                      </g>
                    )}
                  </g>
                  </g>
                </g>
              );
            })}
          </svg>

          {/* tooltip */}
          {hoverLoc && (
            <div
              className="pointer-events-none absolute z-20 w-44 rounded-lg border-2 border-paper/25 bg-ink px-3 py-2 text-paper shadow-print-sm"
              style={{
                left: `${(hoverLoc.x / VB_W) * 100}%`,
                top: `${(hoverLoc.y / VB_H) * 100}%`,
                transform:
                  hoverLoc.y < 180
                    ? "translate(-50%, 26px)"
                    : "translate(-50%, calc(-100% - 66px))",
              }}
            >
              <p className="font-display text-[13px] leading-tight font-bold">
                {String(hoverLoc.num).padStart(2, "0")} · {hoverLoc.namePt}
              </p>
              <p className="mt-0.5 text-[11px] text-paper/75">{hoverLoc.theme}</p>
              <p className="mt-1 font-mono text-[9px] tracking-[0.18em] uppercase" style={{ color: hoverLoc.color === "#24457c" ? "#9db4e0" : hoverLoc.color }}>
                {prog.isCompleted(hoverLoc.id)
                  ? "✓ carimbada"
                  : prog.currentId === hoverLoc.id
                    ? "→ parada atual"
                    : "bloqueada"}
              </p>
            </div>
          )}

          {/* legenda */}
          <div className="absolute right-3 bottom-3 z-10 hidden rounded-lg border-2 border-ink/15 bg-card/95 px-3 py-2.5 text-[11px] font-medium text-ink-soft sm:block">
            <p className="mb-1.5 font-mono text-[9px] font-semibold tracking-[0.2em] text-ink/50 uppercase">Legenda</p>
            <ul className="space-y-1">
              <li className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full border border-ink/20 bg-leaf" /> Concluída
              </li>
              <li className="flex items-center gap-2">
                <span className="blink-dot h-2.5 w-2.5 rounded-full border border-ink/20 bg-bus" /> Parada atual
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full border border-ink/20 bg-[#b6ac95]" /> Bloqueada
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
