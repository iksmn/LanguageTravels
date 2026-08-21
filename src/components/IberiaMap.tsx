import { useMemo, useState } from "react";
import { weeks } from "../data/content";
import type { Week } from "../data/curriculum";
import type { UseProgressReturn } from "../hooks/useProgress";
import { getDayInfo } from "../lib/engine";
import { Icon, IconGlyph } from "./Icons";

const VB_W = 720;
const VB_H = 560;

/* Península Ibérica estilizada: Espanha + Portugal, com Baleares */
const IBERIA_OUTLINE =
  "M150,80 L250,60 L360,55 L470,65 L560,90 L600,120 L590,170 L575,220 L555,280 L540,330 L505,390 L455,440 L395,465 L330,455 L270,445 L210,430 L150,415 L110,395 L85,370 L78,330 L85,290 L92,240 L95,190 L110,140 L130,105 Z";
const BALEARICS = [
  "M600,235 q8,-4 14,2 q4,6 -3,9 q-8,3 -12,-3 q-3,-5 1,-8 Z",
  "M622,250 q6,-3 10,2 q3,5 -2,7 q-6,2 -9,-2 q-2,-4 1,-7 Z",
];

function segPath(a: { x: number; y: number }, b: { x: number; y: number }, i: number) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const bend = Math.min(30, len * 0.15) * (i % 2 === 0 ? 1 : -1);
  const cx = mx + (-dy / len) * bend;
  const cy = my + (dx / len) * bend;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}

export function IberiaMap({
  prog,
  onSelectWeek,
  onGoPlan,
}: {
  prog: UseProgressReturn;
  onSelectWeek: (week: number) => void;
  onGoPlan: () => void;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const hoverWeek = useMemo(() => weeks().find((w) => w.id === hover) ?? null, [hover]);

  const currentWeek = getDayInfo(Math.min(prog.currentDay, 90)).week;
  const stampedCount = prog.weekStamps.length;
  const finished = prog.currentDay > 90;

  const stateOf = (w: Week): "stamped" | "current" | "open" | "locked" => {
    if (prog.weekStamps.includes(w.num)) return "stamped";
    if (w.num === currentWeek && !finished) return "current";
    if (w.num <= currentWeek) return "open";
    return "locked";
  };

  const castFirstNames = (num: number) => {
    const w = weeks().find((x) => x.num === num);
    if (!w) return "";
    return w.cast.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(" & ");
  };

  return (
    <section className="flex flex-col gap-3">
      <div className="fade-up flex flex-wrap items-end justify-between gap-3 px-1">
        <div>
          <p className="font-mono text-[10px] font-semibold tracking-[0.22em] text-ink-soft uppercase">
            La ruta ibérica · 12 paradas + examen · Espanha e Portugal
          </p>
          <h1 className="mt-1 max-w-xl font-display text-2xl leading-[1.08] font-extrabold tracking-tight sm:text-[28px]">
            De Barcelona ao <span className="text-bus">fin del mundo</span>, una semana a la vez
          </h1>
        </div>
        <button
          onClick={onGoPlan}
          className="btn-press flex items-center gap-2 rounded-lg border-2 border-ink bg-bus px-3.5 py-2 font-mono text-[11px] font-semibold tracking-wide text-card uppercase shadow-print-sm"
        >
          Ver plan de 90 días
          <Icon name="arrowRight" size={14} strokeWidth={2.4} />
        </button>
      </div>

      <div className="fade-up paper-grid relative overflow-hidden rounded-xl border-2 border-ink/25 bg-[#d8e7ee] shadow-print" style={{ animationDelay: "120ms" }}>
        <div className="paper-noise pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div className="flex w-full justify-center sm:py-2">
          <div className="relative aspect-[720/560] h-auto max-h-[78vh] w-full sm:w-auto sm:max-w-full sm:flex-1" style={{ maxHeight: "min(78vh, 720px)" }}>
            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full" role="img" aria-label="Mapa da Península Ibérica com as 13 paradas da rota">
              {/* mar: ondas decorativas */}
              <g stroke="#a8c8d8" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.9">
                <path d="M30 120 q6-8 12 0 t12 0" />
                <path d="M20 300 q6-8 12 0 t12 0" />
                <path d="M40 460 q6-8 12 0 t12 0" />
                <path d="M300 510 q6-8 12 0 t12 0" />
                <path d="M520 500 q6-8 12 0 t12 0" />
                <path d="M660 180 q6-8 12 0 t12 0" />
                <path d="M640 90 q6-8 12 0 t12 0" />
              </g>

              {/* território */}
              <path d={IBERIA_OUTLINE} fill="#efe7d3" stroke="rgba(30,42,56,0.55)" strokeWidth="2" strokeLinejoin="round" />
              {BALEARICS.map((d, i) => (
                <path key={i} d={d} fill="#efe7d3" stroke="rgba(30,42,56,0.45)" strokeWidth="1.5" />
              ))}

              {/* divisor Portugal/Espanha (sutil) */}
              <path
                d="M150,80 L160,150 L148,235 L118,300 L98,280 L150,415"
                fill="none"
                stroke="rgba(150,60,60,0.25)"
                strokeWidth="2.5"
                strokeDasharray="7 6"
              />

              {/* montanhas (Pirineos + Sierra Nevada) */}
              <g fill="none" stroke="rgba(30,42,56,0.28)" strokeWidth="1.4" strokeLinecap="round">
                <path d="m520 90 8-13 8 13M536 105 544 92l8 13" />
                <path d="m400 425 8-13 8 13M416 440 424 427l8 13" />
              </g>

              {/* rios */}
              <path d="M200,165 C 240,180 260,200 280,225 C 300,250 310,270 320,300" fill="none" stroke="#a6d3e6" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
              <path d="M360,240 C 340,260 320,275 300,285 C 260,300 220,300 180,295" fill="none" stroke="#a6d3e6" strokeWidth="3" strokeLinecap="round" opacity="0.8" />

              {/* regiões */}
              <g fontFamily="'IBM Plex Mono', monospace" fontSize="8.5" letterSpacing="1.8" fill="rgba(30,42,56,0.32)" fontWeight={600} textAnchor="middle">
                <text x="340" y="150">CASTILLA Y LEÓN</text>
                <text x="250" y="320">EXTREMADURA</text>
                <text x="430" y="300">CASTILLA-LA MANCHA</text>
                <text x="380" y="360">ANDALUCÍA</text>
                <text x="150" y="200">PORTUGAL</text>
                <text x="520" y="190">ARAGÓN</text>
                <text x="590" y="280" transform="rotate(-70 590 280)">MEDITERRÁNEO</text>
                <text x="60" y="220" transform="rotate(-80 60 220)">ATLÁNTICO</text>
                <text x="300" y="520" textAnchor="middle">GOLFO DE CÁDIZ</text>
                <text x="250" y="60" textAnchor="middle">MAR CANTÁBRICO</text>
              </g>

              {/* coordenadas */}
              <g fontFamily="'IBM Plex Mono', monospace" fill="rgba(30,42,56,0.55)">
                <text x="30" y="520" fontSize="10" fontWeight={600}>
                  40°24′N · 3°42′W
                </text>
                <text x="30" y="534" fontSize="8" letterSpacing="2.4" fill="rgba(30,42,56,0.4)">
                  PENÍNSULA IBÉRICA — ESPAÑA &amp; PORTUGAL
                </text>
              </g>

              {/* rosa dos ventos */}
              <g transform="translate(655,470)">
                <circle r="28" fill="rgba(255,253,244,0.65)" stroke="rgba(30,42,56,0.3)" strokeWidth="1.4" />
                <g fill="rgba(30,42,56,0.45)">
                  <path d="M 0 -26 L 4 -6 L 0 0 L -4 -6 Z" />
                  <path d="M 0 26 L 4 6 L 0 0 L -4 6 Z" />
                  <path d="M -26 0 L -6 -4 L 0 0 L -6 4 Z" />
                  <path d="M 26 0 L 6 -4 L 0 0 L 6 4 Z" />
                </g>
                <g fill="rgba(215,38,61,0.85)" transform="rotate(45)">
                  <path d="M 0 -16 L 3.4 -4 L 0 0 L -3.4 -4 Z" />
                  <path d="M 0 16 L 3.4 4 L 0 0 L -3.4 4 Z" />
                </g>
                <text y="-33" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="10" fontWeight={700} fill="rgba(30,42,56,0.7)">
                  N
                </text>
              </g>

              {/* rota base */}
              <g fill="none" stroke="rgba(120,110,88,0.55)" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="2 8">
                {weeks().slice(0, -1).map((w, i) => (
                  <path key={w.id} d={segPath(w, weeks()[i + 1], i)} />
                ))}
              </g>

              {/* rota percorrida */}
              <g fill="none" strokeLinecap="round">
                {weeks().slice(0, -1).map((w, i) => {
                  const d = segPath(w, weeks()[i + 1], i);
                  const done = i <= currentWeek - 2 || finished;
                  const active = !finished && i === currentWeek - 1;
                  if (!done && !active) return null;
                  return active ? (
                    <path key={`a-${w.id}`} d={d} stroke="#d7263d" strokeWidth="2.8" className="marching" />
                  ) : (
                    <path key={`d-${w.id}`} d={d} stroke="#d7263d" strokeWidth="3" />
                  );
                })}
              </g>

              {/* pinos */}
              {weeks().map((w, i) => {
                const st = stateOf(w);
                const fill = st === "locked" ? "#b3ab96" : w.color;
                const clickable = st !== "locked";
                return (
                  <g key={w.id} className="pin-in" style={{ animationDelay: `${250 + i * 80}ms` }}>
                    <g transform={`translate(${w.x},${w.y})`}>
                      <g
                        className={`${clickable ? "pin-body cursor-pointer outline-none" : ""}`}
                        role="button"
                        tabIndex={clickable ? 0 : -1}
                        aria-label={`Semana ${w.num}: ${w.place} (${st})`}
                        onClick={() => (st === "locked" ? undefined : onSelectWeek(w.num))}
                        onKeyDown={(e) => {
                          if ((e.key === "Enter" || e.key === " ") && clickable) {
                            e.preventDefault();
                            onSelectWeek(w.num);
                          }
                        }}
                        onMouseEnter={() => setHover(w.id)}
                        onMouseLeave={() => setHover(null)}
                        onFocus={() => setHover(w.id)}
                        onBlur={() => setHover(null)}
                      >
                        {st === "current" && <circle className="halo" cy="-20" r="20" fill={w.color} opacity="0.5" />}
                        {st === "current" && (
                          <circle className="spin-slow" cy="-20" r="19" fill="none" stroke={w.color} strokeWidth="1.4" strokeDasharray="4 5" />
                        )}
                        <path
                          d="M 0 0 C -2.6 -6.8 -13.5 -11 -13.5 -22 A 13.5 13.5 0 1 1 13.5 -22 C 13.5 -11 2.6 -6.8 0 0 Z"
                          fill={fill}
                          stroke="#fffdf4"
                          strokeWidth="2"
                        />
                        <g transform="translate(-8.3,-28.8) scale(0.694)" stroke="#fffdf4" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <IconGlyph name={st === "locked" ? "lock" : w.icon} />
                        </g>
                        {st === "stamped" && (
                          <g transform="translate(11,-32)">
                            <circle r="6.5" fill="#fffdf4" stroke="rgba(30,42,56,0.25)" strokeWidth="1" />
                            <path d="M -2.8 0.2 L -0.9 2.2 L 3 -2.1" stroke="#4a9c2f" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                          </g>
                        )}
                        <text
                          y="13"
                          textAnchor="middle"
                          fontFamily="'IBM Plex Mono', monospace"
                          fontSize="8.5"
                          letterSpacing="1.2"
                          fontWeight={600}
                          fill={st === "locked" ? "rgba(30,42,56,0.32)" : "rgba(30,42,56,0.62)"}
                        >
                          {w.city.toUpperCase()}
                        </text>
                        <text y="24" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="7" fill="rgba(30,42,56,0.35)">
                          S{String(w.num).padStart(2, "0")}
                        </text>
                      </g>
                    </g>
                  </g>
                );
              })}
            </svg>

            {/* tooltip */}
            {hoverWeek && (
              <div
                className="pointer-events-none absolute z-20 w-48 rounded-lg border-2 border-paper/25 bg-ink px-3 py-2 text-paper shadow-print-sm"
                style={{
                  left: `${(hoverWeek.x / VB_W) * 100}%`,
                  top: `${(hoverWeek.y / VB_H) * 100}%`,
                  transform: hoverWeek.y < 150 ? "translate(-50%, 24px)" : "translate(-50%, calc(-100% - 56px))",
                }}
              >
                <p className="font-display text-[13px] leading-tight font-bold">
                  S{String(hoverWeek.num).padStart(2, "0")} · {hoverWeek.place}
                </p>
                <p className="mt-0.5 text-[11px] text-paper/75">
                  {hoverWeek.theme} · con {castFirstNames(hoverWeek.num)}
                </p>
                <p className="mt-1 font-mono text-[9px] tracking-[0.18em] uppercase" style={{ color: hoverWeek.color === "#b8860b" ? "#d9b64e" : hoverWeek.color }}>
                  {prog.weekStamps.includes(hoverWeek.num)
                    ? "✓ sellada"
                    : hoverWeek.num === currentWeek
                      ? "→ semana actual"
                      : hoverWeek.num < currentWeek
                        ? "abierta"
                        : "bloqueada"}
                </p>
              </div>
            )}

            {/* legenda */}
            <div className="absolute right-3 bottom-3 z-10 hidden rounded-lg border-2 border-ink/15 bg-card/95 px-3 py-2.5 text-[11px] font-medium text-ink-soft md:block">
              <p className="mb-1.5 font-mono text-[9px] font-semibold tracking-[0.2em] text-ink/50 uppercase">Leyenda</p>
              <ul className="space-y-1">
                <li className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full border border-ink/20 bg-leaf" /> Semana sellada
                </li>
                <li className="flex items-center gap-2">
                  <span className="blink-dot h-2.5 w-2.5 rounded-full border border-ink/20 bg-bus" /> Semana actual
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full border border-ink/20 bg-[#b3ab96]" /> Bloqueada
                </li>
              </ul>
            </div>

            {/* resumo */}
            <div className="absolute top-3 left-3 z-10 rounded-lg border-2 border-ink/15 bg-card/95 px-3 py-2">
              <p className="font-mono text-[9px] font-semibold tracking-[0.2em] text-ink/50 uppercase">Progreso de la ruta</p>
              <p className="mt-0.5 font-display text-[15px] font-extrabold">
                {stampedCount}<span className="text-ink/40">/13</span> sellos
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="px-1 text-[12px] text-ink-soft italic">
        Toca una parada para abrir la primera sesión de esa semana. El tipo de sesión del día (vocabulario, diálogo, quiz…) aparece en el plan.
      </p>
    </section>
  );
}
