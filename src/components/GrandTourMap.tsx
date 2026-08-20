import { useMemo, useState } from "react";
import { WEEKS, type Week } from "../data/curriculum";
import { castFirstNames } from "../data/cast";
import type { UseProgressReturn } from "../hooks/useProgress";
import { getDayInfo } from "../lib/engine";
import { Icon, IconGlyph } from "./Icons";

const VB_W = 900;
const VB_H = 720;

/* ---- formas simplificadas dos países (estilo cartaz de viagem) ---- */
const FRANCE =
  "M300 198 C370 178 460 180 515 200 C560 218 582 245 588 285 C592 330 585 380 560 415 C545 435 535 455 535 475 C537 500 548 520 568 535 C578 542 583 548 585 552 C540 575 480 588 425 590 C360 590 300 578 265 552 C238 528 228 480 230 435 C232 390 240 345 252 305 C262 265 278 228 300 198 Z";
const SUISSE =
  "M545 440 C560 425 600 420 640 428 C662 433 668 450 662 470 C655 492 625 505 590 505 C560 505 542 492 538 475 C535 462 538 450 545 440 Z";
const BELGIQUE =
  "M355 140 C348 110 360 78 395 62 C430 48 470 52 495 75 C512 92 515 118 505 140 C495 152 470 160 440 162 C405 164 372 155 355 140 Z";
const LUXEMBOURG =
  "M505 150 C520 138 542 140 552 155 C560 168 558 185 548 195 C536 203 518 202 508 192 C500 182 498 165 505 150 Z";
const CORSE =
  "M648 590 C660 588 668 600 668 618 C668 638 662 652 652 655 C644 655 640 645 640 628 C640 612 642 596 648 590 Z";
const ALLEMAGNE =
  "M600 90 C680 70 800 80 870 130 C890 220 880 330 840 400 C780 430 700 425 640 410 C620 350 615 250 610 180 C606 140 602 110 600 90 Z";
const ITALIE =
  "M640 500 C700 480 790 490 860 530 C880 590 870 660 830 700 C760 715 690 700 650 660 C630 610 630 545 640 500 Z";

/* ajustes de rótulo para pinos próximos */
const LABEL: Record<string, { anchor: "start" | "middle" | "end"; dx: number; dy?: number }> = {
  cdg: { anchor: "end", dx: -16 },
  lemarais: { anchor: "start", dx: 16 },
  geneve: { anchor: "end", dx: -14 },
  verbier: { anchor: "start", dx: 14 },
};

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

export function GrandTourMap({
  prog,
  onSelectWeek,
  onGoPlan,
}: {
  prog: UseProgressReturn;
  onSelectWeek: (week: number) => void;
  onGoPlan: () => void;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const hoverWeek = useMemo(() => WEEKS.find((w) => w.id === hover) ?? null, [hover]);

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
            Le Grand Tour · 4 pays · 12 semanas
          </p>
          <h1 className="mt-1 max-w-xl font-display text-2xl leading-[1.08] font-extrabold tracking-tight sm:text-[28px]">
            De Paris aux Alpes suisses, <span className="text-bus">une semaine à la fois</span>
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

      <div className="fade-up paper-grid relative overflow-hidden rounded-xl border-2 border-ink/25 bg-[#dce8e2] shadow-print" style={{ animationDelay: "120ms" }}>
        <div className="paper-noise pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div className="flex w-full justify-center py-1">
          <div className="relative aspect-[900/720] h-auto w-full" style={{ maxHeight: "min(80vh, 820px)" }}>
            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full" role="img" aria-label="Mapa do Grand Tour: França, Suíça, Bélgica e Luxemburgo">
              {/* mar — ondas decorativas */}
              <g>
                <Wave x={330} y={40} />
                <Wave x={400} y={26} />
                <Wave x={460} y={44} />
                <Wave x={700} y={600} />
                <Wave x={740} y={630} />
                <Wave x={780} y={585} />
                <Wave x={120} y={300} />
                <Wave x={100} y={360} />
                <Wave x={140} y={420} />
                <Wave x={700} y={680} />
              </g>

              {/* países vizinhos (atenuados) */}
              <path d={ALLEMAGNE} fill="#e7e2d2" stroke="rgba(30,42,56,0.22)" strokeWidth="1.4" strokeDasharray="5 6" opacity="0.75" />
              <path d={ITALIE} fill="#e9e3d0" stroke="rgba(30,42,56,0.22)" strokeWidth="1.4" strokeDasharray="5 6" opacity="0.75" />

              {/* países do Grand Tour */}
              <path d={FRANCE} fill="#efe7d3" stroke="rgba(30,42,56,0.55)" strokeWidth="2" strokeLinejoin="round" />
              <path d={SUISSE} fill="#f2e8cf" stroke="rgba(30,42,56,0.55)" strokeWidth="2" strokeLinejoin="round" />
              <path d={BELGIQUE} fill="#f0e6d0" stroke="rgba(30,42,56,0.55)" strokeWidth="2" strokeLinejoin="round" />
              <path d={LUXEMBOURG} fill="#f4ead2" stroke="rgba(30,42,56,0.55)" strokeWidth="2" strokeLinejoin="round" />
              <path d={CORSE} fill="#efe7d3" stroke="rgba(30,42,56,0.55)" strokeWidth="2" strokeLinejoin="round" />

              {/* lagos & rios */}
              <ellipse cx="552" cy="447" rx="16" ry="7" fill="#a6d3e6" stroke="#8fc6de" strokeWidth="1" transform="rotate(-18 552 447)" />
              <path d="M588 285 C 575 330 560 380 545 430" fill="none" stroke="#a6d3e6" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
              <path d="M300 520 C 340 500 380 490 420 488" fill="none" stroke="#a6d3e6" strokeWidth="3" strokeLinecap="round" opacity="0.7" />

              {/* Alpes (montanhas) */}
              <g fill="none" stroke="rgba(30,42,56,0.32)" strokeWidth="1.5" strokeLinecap="round">
                <path d="m560 470 9-15 9 15M578 478 587 463l9 15M600 486 609 471l9 15" />
                <path d="m620 452 8-13 8 13" />
              </g>

              {/* rótulos dos países */}
              <g fontFamily="'IBM Plex Mono', monospace" fontWeight={700} letterSpacing="2.6" textAnchor="middle">
                <text x="400" y="340" fontSize="15" fill="rgba(30,42,56,0.42)">FRANCE</text>
                <text x="600" y="470" fontSize="11" fill="rgba(30,42,56,0.42)">SUISSE</text>
                <text x="430" y="100" fontSize="11" fill="rgba(30,42,56,0.42)">BELGIQUE</text>
                <text x="528" y="140" fontSize="7.5" fill="rgba(30,42,56,0.42)">LUX.</text>
                <text x="654" y="630" fontSize="8" fill="rgba(30,42,56,0.42)">CORSE</text>
                <text x="760" y="240" fontSize="12" fill="rgba(30,42,56,0.25)">ALLEMAGNE</text>
                <text x="760" y="600" fontSize="12" fill="rgba(30,42,56,0.25)">ITALIE</text>
              </g>

              {/* mares */}
              <g fontFamily="'IBM Plex Mono', monospace" fill="#6d99ab" fontWeight={600} letterSpacing="3">
                <text x="420" y="20" fontSize="10" textAnchor="middle">MER DU NORD</text>
                <text x="80" y="480" fontSize="10" textAnchor="middle" transform="rotate(-75 80 480)">OCÉAN ATLANTIQUE</text>
                <text x="720" y="660" fontSize="10" textAnchor="middle">MER MÉDITERRANÉE</text>
              </g>

              {/* rota base */}
              <g fill="none" stroke="rgba(120,110,88,0.5)" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="2 8">
                {WEEKS.slice(0, -1).map((w, i) => (
                  <path key={w.id} d={segPath(w, WEEKS[i + 1], i)} />
                ))}
              </g>

              {/* rota percorrida */}
              <g fill="none" strokeLinecap="round">
                {WEEKS.slice(0, -1).map((w, i) => {
                  const d = segPath(w, WEEKS[i + 1], i);
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
              <g transform="translate(110,110)">
                <circle r="32" fill="rgba(255,253,244,0.65)" stroke="rgba(30,42,56,0.3)" strokeWidth="1.4" />
                <g fill="rgba(30,42,56,0.45)">
                  <path d="M 0 -30 L 4.5 -6 L 0 0 L -4.5 -6 Z" />
                  <path d="M 0 30 L 4.5 6 L 0 0 L -4.5 6 Z" />
                  <path d="M -30 0 L -6 -4.5 L 0 0 L -6 4.5 Z" />
                  <path d="M 30 0 L 6 -4.5 L 0 0 L 6 4.5 Z" />
                </g>
                <g fill="rgba(215,38,61,0.85)" transform="rotate(45)">
                  <path d="M 0 -18 L 3.6 -4 L 0 0 L -3.6 -4 Z" />
                  <path d="M 0 18 L 3.6 4 L 0 0 L -3.6 4 Z" />
                </g>
                <text y="-38" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="11" fontWeight={700} fill="rgba(30,42,56,0.7)">N</text>
              </g>

              {/* coordenadas + escala */}
              <g fontFamily="'IBM Plex Mono', monospace" fill="rgba(30,42,56,0.55)">
                <text x="30" y="676" fontSize="10" fontWeight={600}>46°N · 4°E</text>
                <text x="30" y="690" fontSize="8" letterSpacing="2.4" fill="rgba(30,42,56,0.4)">LA FRANCOPHONIE — EUROPE</text>
              </g>
              <g transform="translate(30,700)" fontFamily="'IBM Plex Mono', monospace">
                <g stroke="rgba(30,42,56,0.6)" strokeWidth="1">
                  <rect x="0" y="0" width="34" height="4" fill="rgba(30,42,56,0.6)" />
                  <rect x="34" y="0" width="34" height="4" fill="rgba(255,253,244,0.8)" />
                  <rect x="68" y="0" width="34" height="4" fill="rgba(30,42,56,0.6)" />
                </g>
                <g fontSize="7.5" fill="rgba(30,42,56,0.5)">
                  <text x="0" y="13">0</text>
                  <text x="58" y="13">400 km</text>
                </g>
              </g>

              {/* pinos */}
              {WEEKS.map((w, i) => {
                const st = stateOf(w);
                const fill = st === "locked" ? "#b3ab96" : w.color;
                const clickable = st !== "locked";
                const label = LABEL[w.id] ?? { anchor: "middle" as const, dx: 0 };
                return (
                  <g key={w.id} className="pin-in" style={{ animationDelay: `${250 + i * 75}ms` }}>
                    <g transform={`translate(${w.x},${w.y})`}>
                      <g
                        className={clickable ? "pin-body cursor-pointer outline-none" : ""}
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
                        {st === "current" && <circle className="halo" cy="-20" r="21" fill={w.color} opacity="0.5" />}
                        {st === "current" && (
                          <circle className="spin-slow" cy="-20" r="20" fill="none" stroke={w.color} strokeWidth="1.4" strokeDasharray="4 5" />
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
                        {/* número da parada */}
                        <g transform="translate(-13,-33)">
                          <circle r="7.5" fill="#fffdf4" stroke={fill} strokeWidth="1.6" />
                          <text y="3" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fontWeight={700} fill={fill}>
                            {String(w.num).padStart(2, "0")}
                          </text>
                        </g>
                        {st === "stamped" && (
                          <g transform="translate(12,-31)">
                            <circle r="6.5" fill="#fffdf4" stroke="rgba(30,42,56,0.25)" strokeWidth="1" />
                            <path d="M -2.8 0.2 L -0.9 2.2 L 3 -2.1" stroke="#4a9c2f" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                          </g>
                        )}
                        <text
                          x={label.dx}
                          y="14"
                          textAnchor={label.anchor}
                          fontFamily="'IBM Plex Mono', monospace"
                          fontSize="9"
                          letterSpacing="1.1"
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
                className="pointer-events-none absolute z-20 w-52 rounded-lg border-2 border-paper/25 bg-ink px-3 py-2 text-paper shadow-print-sm"
                style={{
                  left: `${(hoverWeek.x / VB_W) * 100}%`,
                  top: `${(hoverWeek.y / VB_H) * 100}%`,
                  transform: hoverWeek.y < 180 ? "translate(-50%, 26px)" : "translate(-50%, calc(-100% - 60px))",
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

            {/* resumo */}
            <div className="absolute top-3 left-3 z-10 rounded-lg border-2 border-ink/15 bg-card/95 px-3 py-2">
              <p className="font-mono text-[9px] font-semibold tracking-[0.2em] text-ink/50 uppercase">Grand Tour</p>
              <p className="mt-0.5 font-display text-[15px] font-extrabold">
                {stampedCount}<span className="text-ink/40">/12</span> carimbos
              </p>
              <p className="font-mono text-[8.5px] text-ink-soft">🇫🇷 🇨🇭 🇧🇪 🇱🇺</p>
            </div>

            {/* legenda */}
            <div className="absolute right-3 bottom-3 z-10 hidden rounded-lg border-2 border-ink/15 bg-card/95 px-3 py-2.5 text-[11px] font-medium text-ink-soft md:block">
              <p className="mb-1.5 font-mono text-[9px] font-semibold tracking-[0.2em] text-ink/50 uppercase">Legenda</p>
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
          </div>
        </div>
      </div>

      <p className="px-1 text-[12px] text-ink-soft italic">
        Toque em uma parada para abrir a primeira sessão daquela semana. Os dias 10–19 formam o <strong className="text-ink">intermédio romântico</strong> — uma festa em Paris e um chalé nos Alpes suíços.
      </p>
    </section>
  );
}
