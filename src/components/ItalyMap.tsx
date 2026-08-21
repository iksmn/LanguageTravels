import { useMemo, useState } from "react";
import { WEEKS_IT } from "../data/curriculum-it";
import type { Week } from "../data/curriculum";
import { castFirstNames } from "../data/cast";
import type { UseProgressReturn } from "../hooks/useProgress";
import { getDayInfo } from "../lib/engine";
import { Icon, IconGlyph } from "./Icons";

const VB_W = 620;
const VB_H = 700;

/* ---- formas estilizadas (estilo cartaz de viagem) ---- */
const SVIZZERA =
  "M140 62 C195 40 300 36 385 48 C432 56 452 78 447 104 C441 128 400 142 348 144 C278 148 198 144 162 126 C136 112 130 86 140 62 Z";
const ITALIA =
  "M150 150 C230 134 350 134 430 152 C452 158 462 178 456 200 C468 238 470 290 462 330 C458 366 470 410 492 444 C512 474 522 500 508 512 C494 522 480 508 470 492 C462 514 456 542 446 562 C438 586 424 602 408 596 C396 590 394 570 402 548 C392 516 384 486 388 456 C374 428 360 408 352 388 C338 368 326 352 322 332 C308 306 302 282 306 258 C292 242 282 228 284 212 C266 206 250 204 240 206 C225 210 210 220 200 232 C188 246 178 258 172 268 C160 262 152 240 150 220 C148 196 148 172 150 150 Z";
const SICILIA =
  "M392 618 C410 610 436 612 452 626 C462 640 458 660 442 668 C420 678 396 672 384 656 C376 642 378 626 392 618 Z";
const SARDEGNA =
  "M292 520 C306 514 318 522 320 542 C322 566 316 590 304 596 C292 600 284 588 283 566 C282 546 284 528 292 520 Z";

const LABEL: Record<string, { anchor: "start" | "middle" | "end"; dx: number; dy?: number }> = {
  torino: { anchor: "end", dx: -14 },
  lugano: { anchor: "start", dx: 14 },
  venezia: { anchor: "start", dx: 14 },
  palermo: { anchor: "middle", dx: 0, dy: 4 },
};

function segPath(a: { x: number; y: number }, b: { x: number; y: number }, i: number) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const bend = Math.min(30, len * 0.14) * (i % 2 === 0 ? 1 : -1);
  const cx = mx + (-dy / len) * bend;
  const cy = my + (dx / len) * bend;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}

function Wave({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      d={`M ${x} ${y} q ${6 * s} ${-8 * s} ${12 * s} 0 t ${12 * s} 0`}
      fill="none"
      stroke="#a9c9d6"
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.9"
    />
  );
}

export function ItalyMap({
  prog,
  onSelectWeek,
  onGoPlan,
}: {
  prog: UseProgressReturn;
  onSelectWeek: (week: number) => void;
  onGoPlan: () => void;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const hoverWeek = useMemo(() => WEEKS_IT.find((w) => w.id === hover) ?? null, [hover]);

  const currentWeek = getDayInfo(Math.min(prog.currentDay, 90)).week;
  const stampedCount = prog.weekStamps.length;
  const finished = prog.currentDay > 90;

  const stateOf = (w: Week): "stamped" | "current" | "open" | "locked" => {
    if (prog.weekStamps.includes(w.num)) return "stamped";
    if (w.num === currentWeek && !finished) return "current";
    if (w.num <= currentWeek) return "open";
    return "locked";
  };

  return (
    <section className="flex flex-col gap-3">
      <div className="fade-up flex flex-wrap items-end justify-between gap-3 px-1">
        <div>
          <p className="font-mono text-[10px] font-semibold tracking-[0.22em] text-ink-soft uppercase">
            La strada · 13 tappe · Italia + Svizzera
          </p>
          <h1 className="mt-1 max-w-xl font-display text-2xl leading-[1.08] font-extrabold tracking-tight sm:text-[28px]">
            Da Milano alla Sicilia, <span className="text-bus">una settimana alla volta</span>
          </h1>
        </div>
        <button
          onClick={onGoPlan}
          className="btn-press flex items-center gap-2 rounded-lg border-2 border-ink bg-bus px-3.5 py-2 font-mono text-[11px] font-semibold tracking-wide text-card uppercase shadow-print-sm"
        >
          Ver plano de 90 dias
          <Icon name="arrowRight" size={14} strokeWidth={2.4} />
        </button>
      </div>

      <div className="fade-up paper-grid relative overflow-hidden rounded-xl border-2 border-ink/25 bg-[#dde9e6] shadow-print" style={{ animationDelay: "120ms" }}>
        <div className="paper-noise pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div className="flex w-full justify-center sm:py-2">
          <div className="relative aspect-[620/700] h-auto max-h-[80vh] w-full sm:w-auto sm:flex-1" style={{ maxHeight: "min(80vh, 820px)" }}>
            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full" role="img" aria-label="Mapa da Itália e Suíça com as 13 paradas da rota">
              {/* mar: ondas */}
              <g>
                <Wave x={70} y={300} /><Wave x={90} y={380} /><Wave x={70} y={460} />
                <Wave x={520} y={300} /><Wave x={540} y={380} /><Wave x={520} y={560} />
                <Wave x={330} y={690} /><Wave x={180} y={640} />
              </g>

              {/* países */}
              <path d={SVIZZERA} fill="#e7e2cf" stroke="rgba(30,42,56,0.55)" strokeWidth="2" strokeLinejoin="round" />
              <path d={ITALIA} fill="#efe7d3" stroke="rgba(30,42,56,0.6)" strokeWidth="2.4" strokeLinejoin="round" />
              <path d={SICILIA} fill="#efe7d3" stroke="rgba(30,42,56,0.6)" strokeWidth="2.4" strokeLinejoin="round" />
              <path d={SARDEGNA} fill="#efe7d3" stroke="rgba(30,42,56,0.55)" strokeWidth="2" strokeLinejoin="round" />

              {/* Alpes decorativos */}
              <g fill="none" stroke="rgba(30,42,56,0.3)" strokeWidth="1.4" strokeLinecap="round">
                <path d="m200 118 8-13 8 13M225 128 233 115l8 13M360 95l7-11 7 11" />
              </g>
              {/* vulcão (Vesúvio) */}
              <path d="m440 500 8-14 8 14" fill="none" stroke="rgba(215,38,61,0.5)" strokeWidth="1.6" strokeLinecap="round" />

              {/* nomes dos mares / regiões */}
              <g fontFamily="'IBM Plex Mono', monospace" fill="#6d99ab" fontWeight={600} letterSpacing="2.5">
                <text x={150} y={560} fontSize="9" textAnchor="middle" transform="rotate(-75 150 560)">MAR TIRRENO</text>
                <text x={530} y={430} fontSize="9" textAnchor="middle" transform="rotate(75 530 430)">MAR ADRIÁTICO</text>
                <text x={310} y={688} fontSize="9" textAnchor="middle">MAR MEDITERRÂNEO</text>
              </g>
              <g fontFamily="'IBM Plex Mono', monospace" fontSize="8" letterSpacing="1.6" fill="rgba(30,42,56,0.3)" fontWeight={600} textAnchor="middle">
                <text x={295} y={95}>SVIZZERA</text>
                <text x={310} y={310}>ITALIA</text>
                <text x={418} y={650}>SICILIA</text>
                <text x={302} y={560}>SARDEGNA</text>
              </g>

              {/* coordenadas + escala */}
              <g fontFamily="'IBM Plex Mono', monospace" fill="rgba(30,42,56,0.55)">
                <text x={28} y={40} fontSize="10" fontWeight={600}>45°28′N · 9°11′E</text>
                <text x={28} y={54} fontSize="8" letterSpacing="2.4" fill="rgba(30,42,56,0.4)">ITALIA — LO STIVALE</text>
              </g>
              <g transform="translate(28,648)" fontFamily="'IBM Plex Mono', monospace">
                <g stroke="rgba(30,42,56,0.6)" strokeWidth="1">
                  <rect x="0" y="0" width="30" height="4" fill="rgba(30,42,56,0.6)" />
                  <rect x="30" y="0" width="30" height="4" fill="rgba(255,253,244,0.8)" />
                  <rect x="60" y="0" width="30" height="4" fill="rgba(30,42,56,0.6)" />
                </g>
                <g fontSize="7.5" fill="rgba(30,42,56,0.5)">
                  <text x="0" y="14">0</text>
                  <text x="52" y="14">400 km</text>
                </g>
              </g>

              {/* rota base */}
              <g fill="none" stroke="rgba(120,110,88,0.55)" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="2 8">
                {WEEKS_IT.slice(0, -1).map((w, i) => (
                  <path key={w.id} d={segPath(w, WEEKS_IT[i + 1], i)} />
                ))}
              </g>
              {/* rota percorrida */}
              <g fill="none" strokeLinecap="round">
                {WEEKS_IT.slice(0, -1).map((w, i) => {
                  const d = segPath(w, WEEKS_IT[i + 1], i);
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

              {/* rosa dos ventos */}
              <g transform="translate(556,80)">
                <circle r="28" fill="rgba(255,253,244,0.65)" stroke="rgba(30,42,56,0.3)" strokeWidth="1.4" />
                <g fill="rgba(30,42,56,0.45)">
                  <path d="M 0 -26 L 4 -5 L 0 0 L -4 -5 Z" />
                  <path d="M 0 26 L 4 5 L 0 0 L -4 5 Z" />
                  <path d="M -26 0 L -5 -4 L 0 0 L -5 4 Z" />
                  <path d="M 26 0 L 5 -4 L 0 0 L 5 4 Z" />
                </g>
                <g fill="rgba(215,38,61,0.85)" transform="rotate(45)">
                  <path d="M 0 -16 L 3.2 -4 L 0 0 L -3.2 -4 Z" />
                  <path d="M 0 16 L 3.2 4 L 0 0 L -3.2 4 Z" />
                </g>
                <text y="-33" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="10" fontWeight={700} fill="rgba(30,42,56,0.7)">N</text>
              </g>

              {/* pinos */}
              {WEEKS_IT.map((w, i) => {
                const st = stateOf(w);
                const fill = st === "locked" ? "#b3ab96" : w.color;
                const clickable = st !== "locked";
                const lab = LABEL[w.id];
                return (
                  <g key={w.id} className="pin-in" style={{ animationDelay: `${250 + i * 80}ms` }}>
                    <g transform={`translate(${w.x},${w.y})`}>
                      <g
                        className={clickable ? "pin-body cursor-pointer outline-none" : ""}
                        role="button"
                        tabIndex={clickable ? 0 : -1}
                        aria-label={`Settimana ${w.num}: ${w.place}`}
                        onClick={() => (clickable ? onSelectWeek(w.num) : undefined)}
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
                        <path
                          d="M 0 0 C -2.6 -6.8 -13.5 -11 -13.5 -22 A 13.5 13.5 0 1 1 13.5 -22 C 13.5 -11 2.6 -6.8 0 0 Z"
                          fill={fill}
                          stroke="#fffdf4"
                          strokeWidth="2"
                        />
                        <g transform="translate(-8.3,-28.8) scale(0.694)" stroke="#fffdf4" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <IconGlyph name={st === "locked" ? "lock" : w.icon} />
                        </g>
                        {/* número da tappa */}
                        <text
                          y="-18.5"
                          textAnchor="middle"
                          fontFamily="'IBM Plex Mono', monospace"
                          fontSize="8"
                          fontWeight={700}
                          fill="#fffdf4"
                        >
                          {String(w.num).padStart(2, "0")}
                        </text>
                        {st === "stamped" && (
                          <g transform="translate(11,-32)">
                            <circle r="6.5" fill="#fffdf4" stroke="rgba(30,42,56,0.25)" strokeWidth="1" />
                            <path d="M -2.8 0.2 L -0.9 2.2 L 3 -2.1" stroke="#4a9c2f" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                          </g>
                        )}
                        <text
                          x={lab?.dx ?? 0}
                          y={(lab?.dy ?? 0) + 14}
                          textAnchor={lab?.anchor ?? "middle"}
                          fontFamily="'IBM Plex Mono', monospace"
                          fontSize="8.5"
                          letterSpacing="1.2"
                          fontWeight={600}
                          fill={st === "locked" ? "rgba(30,42,56,0.32)" : "rgba(30,42,56,0.62)"}
                        >
                          {w.city.toUpperCase()}
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
                  transform: hoverWeek.y < 170 ? "translate(-50%, 24px)" : "translate(-50%, calc(-100% - 56px))",
                }}
              >
                <p className="font-display text-[13px] leading-tight font-bold">
                  S{String(hoverWeek.num).padStart(2, "0")} · {hoverWeek.place}
                </p>
                <p className="mt-0.5 text-[11px] text-paper/75">
                  {hoverWeek.theme} · com {castFirstNames(hoverWeek.num)}
                </p>
                <p className="mt-1 font-mono text-[9px] tracking-[0.18em] uppercase" style={{ color: hoverWeek.color === "#24457c" ? "#9db4e0" : hoverWeek.color }}>
                  {prog.weekStamps.includes(hoverWeek.num)
                    ? "✓ carimbada"
                    : hoverWeek.num === currentWeek
                      ? "→ settimana attuale"
                      : hoverWeek.num < currentWeek
                        ? "em aberto"
                        : "bloqueada"}
                </p>
              </div>
            )}

            {/* legenda */}
            <div className="absolute right-3 bottom-3 z-10 hidden rounded-lg border-2 border-ink/15 bg-card/95 px-3 py-2.5 text-[11px] font-medium text-ink-soft md:block">
              <p className="mb-1.5 font-mono text-[9px] font-semibold tracking-[0.2em] text-ink/50 uppercase">Legenda</p>
              <ul className="space-y-1">
                <li className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full border border-ink/20 bg-leaf" /> Tappa carimbada
                </li>
                <li className="flex items-center gap-2">
                  <span className="blink-dot h-2.5 w-2.5 rounded-full border border-ink/20 bg-bus" /> Tappa attuale
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full border border-ink/20 bg-[#b3ab96]" /> Bloqueada
                </li>
              </ul>
            </div>

            {/* resumo */}
            <div className="absolute top-3 left-3 z-10 rounded-lg border-2 border-ink/15 bg-card/95 px-3 py-2">
              <p className="font-mono text-[9px] font-semibold tracking-[0.2em] text-ink/50 uppercase">Progresso</p>
              <p className="mt-0.5 font-display text-[15px] font-extrabold">
                {stampedCount}<span className="text-ink/40">/13</span> carimbos
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="px-1 text-[12px] text-ink-soft italic">
        Toque em uma tappa para abrir a primeira sessão daquela settimana. A Suíça italiana (Lugano e St. Moritz) faz parte da rota.
      </p>
    </section>
  );
}
