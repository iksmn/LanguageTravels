import { useMemo, useState } from "react";
import type { Week } from "../data/curriculum";
import { weeks } from "../data/content";
import { castFirstNames } from "../data/cast";
import type { UseProgressReturn } from "../hooks/useProgress";
import { getDayInfo } from "../lib/engine";
import { Icon, IconGlyph } from "./Icons";

const VB_W = 900;
const VB_H = 760;

/* ---- formas simplificadas (estilo cartaz de viagem) ---- */
const DEUTSCHLAND =
  "M420 78 C470 58 560 62 615 96 C648 118 655 152 668 190 C682 235 676 282 668 330 C660 380 662 430 648 475 C636 512 610 538 575 552 C540 566 500 560 462 550 C425 540 392 528 368 500 C348 476 342 442 338 408 C333 362 336 315 342 270 C347 232 338 196 350 158 C362 120 385 94 420 78 Z";
const SCHWEIZ =
  "M300 566 C338 548 398 550 442 562 C474 572 486 592 476 618 C462 646 406 658 352 652 C312 648 284 630 282 602 C281 585 288 574 300 566 Z";
const OESTERREICH =
  "M582 552 C640 534 726 538 796 558 C838 570 858 590 852 616 C842 642 786 654 724 648 C662 642 610 630 586 610 C570 594 570 568 582 552 Z";
const LIECHTENSTEIN =
  "M512 574 C520 566 536 568 541 582 C545 595 540 611 529 616 C518 620 508 610 507 596 C506 587 508 580 512 574 Z";
const ITALIEN =
  "M470 668 C510 654 560 656 600 672 C630 700 640 740 620 760 L430 760 C420 720 435 688 470 668 Z";
const FRANKREICH =
  "M200 200 C240 180 280 200 300 240 C315 290 310 360 300 420 C292 480 270 530 230 545 C190 550 160 520 150 470 C142 410 148 330 158 275 C166 235 178 212 200 200 Z";

function segPath(a: { x: number; y: number }, b: { x: number; y: number }, i: number) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const bend = Math.min(34, len * 0.14) * (i % 2 === 0 ? 1 : -1);
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

const LABEL: Record<string, { anchor: "start" | "middle" | "end"; dx: number }> = {
  vaduz: { anchor: "start", dx: 16 },
  potsdam: { anchor: "start", dx: 14 },
  zuerich: { anchor: "end", dx: -14 },
};

export function GermanyMap({
  prog,
  onSelectWeek,
  onGoPlan,
}: {
  prog: UseProgressReturn;
  onSelectWeek: (week: number) => void;
  onGoPlan: () => void;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const list = useMemo(() => weeks(), []);
  const hoverWeek = useMemo(() => list.find((w) => w.id === hover) ?? null, [hover, list]);

  const currentWeek = getDayInfo(Math.min(prog.currentDay, 90)).week;
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
            Die Route · 13 Stopps · 4 Länder
          </p>
          <h1 className="mt-1 max-w-xl font-display text-2xl leading-[1.08] font-extrabold tracking-tight sm:text-[28px]">
            Von Berlin nach Wien, <span className="text-bus">Woche für Woche</span>
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

      <div className="fade-up paper-grid relative overflow-hidden rounded-xl border-2 border-ink/25 bg-[#dfe9e4] shadow-print" style={{ animationDelay: "120ms" }}>
        <div className="paper-noise pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div className="relative aspect-[900/760] w-full">
          <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full" role="img" aria-label="Mapa da rota alemã: Alemanha, Suíça, Áustria e Liechtenstein">
            {/* mares */}
            <g fill="#bcd8e4" opacity="0.55">
              <path d="M0 0 H900 V70 C700 110 520 60 350 90 C220 112 90 90 0 120 Z" />
            </g>
            <Wave x={180} y={52} s={1.2} />
            <Wave x={520} y={34} s={1} />
            <Wave x={720} y={58} s={1.1} />

            {/* países vizinhos (atenuados) */}
            <path d={FRANKREICH} fill="#e6dfcc" stroke="rgba(30,42,56,0.22)" strokeWidth="1.6" />
            <path d={ITALIEN} fill="#e6dfcc" stroke="rgba(30,42,56,0.22)" strokeWidth="1.6" />
            <text x={205} y={360} fontFamily="'IBM Plex Mono', monospace" fontSize="13" letterSpacing="3" fill="rgba(30,42,56,0.25)" fontWeight={700} transform="rotate(-78 205 360)">
              FRANKREICH
            </text>
            <text x={520} y={725} fontFamily="'IBM Plex Mono', monospace" fontSize="12" letterSpacing="3" fill="rgba(30,42,56,0.25)" fontWeight={700} textAnchor="middle">
              ITALIEN
            </text>

            {/* países da rota */}
            <path d={DEUTSCHLAND} fill="#efe7d3" stroke="rgba(30,42,56,0.55)" strokeWidth="2.2" strokeLinejoin="round" />
            <path d={SCHWEIZ} fill="#f3ecdb" stroke="rgba(30,42,56,0.55)" strokeWidth="2.2" strokeLinejoin="round" />
            <path d={OESTERREICH} fill="#f3ecdb" stroke="rgba(30,42,56,0.55)" strokeWidth="2.2" strokeLinejoin="round" />
            <path d={LIECHTENSTEIN} fill="#f6efde" stroke="rgba(30,42,56,0.55)" strokeWidth="2" strokeLinejoin="round" />

            {/* Alpes decorativos */}
            <g fill="none" stroke="rgba(30,42,56,0.3)" strokeWidth="1.5" strokeLinecap="round">
              <path d="m470 520 9-14 9 14M488 536 497 522l9 14M452 536 461 522l9 14" />
              <path d="m620 600 8-12 8 12M636 614 644 602l8 12" />
              <path d="m700 596 8-12 8 12" />
            </g>

            {/* rios */}
            <path d="M365 265 C360 330 368 400 360 470 C355 510 362 545 372 566" fill="none" stroke="#a6d3e6" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
            <path d="M523 592 C523 560 528 520 540 490" fill="none" stroke="#a6d3e6" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />

            {/* nomes */}
            <g fontFamily="'IBM Plex Mono', monospace" fontWeight={600} fill="rgba(30,42,56,0.4)">
              <text x={470} y={300} fontSize="16" letterSpacing="6" textAnchor="middle">DEUTSCHLAND</text>
              <text x={368} y={612} fontSize="11" letterSpacing="3" textAnchor="middle">SCHWEIZ</text>
              <text x={716} y={600} fontSize="11" letterSpacing="3" textAnchor="middle">ÖSTERREICH</text>
              <text x={524} y={636} fontSize="8" letterSpacing="1.5" textAnchor="middle">LIECHTENSTEIN</text>
              <text x={460} y={40} fontSize="11" letterSpacing="3" fill="#6d99ab">NORDSEE</text>
              <text x={700} y={48} fontSize="11" letterSpacing="3" fill="#6d99ab">OSTSEE</text>
            </g>

            {/* rota base */}
            <g fill="none" stroke="rgba(120,110,88,0.55)" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="2 8">
              {list.slice(0, -1).map((w, i) => (
                <path key={w.id} d={segPath(w, list[i + 1], i)} />
              ))}
            </g>

            {/* rota percorrida */}
            <g fill="none" strokeLinecap="round">
              {list.slice(0, -1).map((w, i) => {
                const d = segPath(w, list[i + 1], i);
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

            {/* bússola */}
            <g transform="translate(120,120)">
              <circle r="34" fill="rgba(255,253,244,0.65)" stroke="rgba(30,42,56,0.3)" strokeWidth="1.4" />
              <g fill="rgba(30,42,56,0.45)">
                <path d="M 0 -30 L 4.5 -6 L 0 0 L -4.5 -6 Z" />
                <path d="M 0 30 L 4.5 6 L 0 0 L -4.5 6 Z" />
                <path d="M -30 0 L -6 -4.5 L 0 0 L -6 4.5 Z" />
                <path d="M 30 0 L 6 -4.5 L 0 0 L 6 4.5 Z" />
              </g>
              <g fill="rgba(215,38,61,0.85)" transform="rotate(45)">
                <path d="M 0 -18 L 3.5 -4.5 L 0 0 L -3.5 -4.5 Z" />
                <path d="M 0 18 L 3.5 4.5 L 0 0 L -3.5 4.5 Z" />
              </g>
              <text y="-40" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="12" fontWeight={700} fill="rgba(30,42,56,0.7)">
                N
              </text>
            </g>

            {/* coordenadas + escala */}
            <g fontFamily="'IBM Plex Mono', monospace" fill="rgba(30,42,56,0.55)">
              <text x={826} y={712} fontSize="11" fontWeight={600} textAnchor="end">51°10′N · 10°27′O</text>
              <text x={826} y={726} fontSize="8" letterSpacing="2.4" fill="rgba(30,42,56,0.4)" textAnchor="end">MITTELEUROPA</text>
            </g>
            <g transform="translate(700,738)" fontFamily="'IBM Plex Mono', monospace">
              <g stroke="rgba(30,42,56,0.6)" strokeWidth="1">
                <rect x="0" y="0" width="34" height="4" fill="rgba(30,42,56,0.6)" />
                <rect x="34" y="0" width="34" height="4" fill="rgba(255,253,244,0.8)" />
                <rect x="68" y="0" width="34" height="4" fill="rgba(30,42,56,0.6)" />
              </g>
              <g fontSize="7.5" fill="rgba(30,42,56,0.5)">
                <text x="0" y="14">0</text>
                <text x="60" y="14">400 km</text>
              </g>
            </g>

            {/* pinos */}
            {list.map((w, i) => {
              const st = stateOf(w);
              const fill = st === "locked" ? "#b3ab96" : w.color;
              const clickable = st !== "locked";
              const label = LABEL[w.id];
              return (
                <g key={w.id} className="pin-in" style={{ animationDelay: `${250 + i * 70}ms` }}>
                  <g transform={`translate(${w.x},${w.y})`}>
                    <g
                      className={clickable ? "pin-body cursor-pointer outline-none" : ""}
                      role="button"
                      tabIndex={clickable ? 0 : -1}
                      aria-label={`Semana ${w.num}: ${w.place}`}
                      onClick={() => clickable && onSelectWeek(w.num)}
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
                      {/* número da parada */}
                      <circle cx="-11" cy="-33" r="6.5" fill="#fffdf4" stroke="rgba(30,42,56,0.3)" strokeWidth="1" />
                      <text x="-11" y="-30.4" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="7.5" fontWeight={700} fill="rgba(30,42,56,0.75)">
                        {String(w.num).padStart(2, "0")}
                      </text>
                      <text
                        y="13"
                        textAnchor={label?.anchor ?? "middle"}
                        x={label?.dx ?? 0}
                        fontFamily="'IBM Plex Mono', monospace"
                        fontSize="9"
                        letterSpacing="1.2"
                        fontWeight={600}
                        fill={st === "locked" ? "rgba(30,42,56,0.32)" : "rgba(30,42,56,0.65)"}
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
              className="pointer-events-none absolute z-20 w-52 rounded-lg border-2 border-paper/25 bg-ink px-3 py-2 text-paper shadow-print-sm"
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
                    ? "→ semana atual"
                    : hoverWeek.num < currentWeek
                      ? "em aberto"
                      : "bloqueada"}
              </p>
            </div>
          )}

          {/* legenda */}
          <div className="absolute right-3 bottom-3 z-10 hidden rounded-lg border-2 border-ink/15 bg-card/95 px-3 py-2.5 text-[11px] font-medium text-ink-soft md:block">
            <p className="mb-1.5 font-mono text-[9px] font-semibold tracking-[0.2em] text-ink/50 uppercase">Legende</p>
            <ul className="space-y-1">
              <li className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full border border-ink/20 bg-leaf" /> Semana carimbada
              </li>
              <li className="flex items-center gap-2">
                <span className="blink-dot h-2.5 w-2.5 rounded-full border border-ink/20 bg-bus" /> Semana atual
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full border border-ink/20 bg-[#b3ab96]" /> Bloqueada
              </li>
            </ul>
          </div>

          {/* resumo */}
          <div className="absolute top-3 left-3 z-10 rounded-lg border-2 border-ink/15 bg-card/95 px-3 py-2">
            <p className="font-mono text-[9px] font-semibold tracking-[0.2em] text-ink/50 uppercase">Progresso da rota</p>
            <p className="mt-0.5 font-display text-[15px] font-extrabold">
              {prog.weekStamps.length}<span className="text-ink/40">/13</span> carimbos
            </p>
          </div>
        </div>
      </div>

      <p className="px-1 text-[12px] text-ink-soft italic">
        Toque em uma parada para abrir a primeira sessão daquela semana — de Berlim a Viena, com escalas em Zurique e no pequeno Liechtenstein.
      </p>
    </section>
  );
}
