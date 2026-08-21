import { useMemo, useState } from "react";
import type { Week } from "../data/curriculum";
import { castMap, weeks } from "../data/content";
import type { UseProgressReturn } from "../hooks/useProgress";
import { Icon, IconGlyph } from "./Icons";

const VB_W = 1000;
const VB_H = 640;

const USA_OUTLINE =
  "M60 190 C120 165 200 160 260 158 L330 162 C360 165 375 175 390 190 C402 202 400 218 392 228 C380 245 368 258 360 275 C352 295 342 315 335 335 C328 358 322 378 318 398 C315 415 322 432 330 448 C334 462 326 470 318 462 C305 448 295 432 285 425 C255 418 225 420 200 428 C185 432 178 448 172 462 C166 452 162 438 158 425 C130 412 105 400 92 385 C78 362 70 338 66 312 C60 280 56 245 58 218 Z";

const HOKKAIDO = "M800 118 C825 108 852 118 856 138 C860 158 845 172 822 172 C800 172 785 155 788 136 C790 125 792 121 800 118 Z";
const HONSHU = "M748 308 C762 288 782 282 800 276 C822 268 838 258 852 246 C864 236 878 232 888 242 C896 250 892 262 880 268 C866 276 856 286 844 296 C830 308 812 314 796 318 C778 322 758 322 748 308 Z";
const SHIKOKU = "M770 330 C782 324 798 326 806 334 C810 340 802 346 790 344 C778 342 766 338 770 330 Z";
const KYUSHU = "M730 330 C744 322 758 330 756 344 C754 358 742 366 730 360 C718 354 718 338 730 330 Z";

const LABELS: { label: string; x: number; y: number }[] = [
  { label: "CALIFÓRNIA", x: 150, y: 345 },
  { label: "TEXAS", x: 225, y: 450 },
  { label: "FLÓRIDA", x: 300, y: 442 },
  { label: "NOVA INGLATERRA", x: 380, y: 190 },
  { label: "HOKKAIDO 北海道", x: 822, y: 98 },
  { label: "HONSHU 本州", x: 845, y: 228 },
  { label: "SHIKOKU 四国", x: 790, y: 356 },
  { label: "KYUSHU 九州", x: 732, y: 382 },
  { label: "OKINAWA 沖縄", x: 668, y: 522 },
];

const PACIFIC_PATH = "M668 470 C560 540 380 560 130 372";

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

/** Flor de cerejeira estilizada. */
function Sakura({ x, y, s = 1, o = 0.8 }: { x: number; y: number; s?: number; o?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} opacity={o}>
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="0" cy="-4.2" rx="2.6" ry="4" fill="#f2a7c3" transform={`rotate(${r})`} />
      ))}
      <circle r="1.6" fill="#e8930c" />
    </g>
  );
}

/** Torii estilizado. */
function Torii({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`} stroke="#d7263d" strokeWidth="2.4" strokeLinecap="round" fill="none">
      <path d="M-11 -6 C-4 -9 4 -9 11 -6" />
      <path d="M-8 -2 H8" />
      <path d="M-6 -2 V8 M6 -2 V8" />
    </g>
  );
}

export function JapanMap({
  prog,
  onSelectWeek,
  onGoPlan,
}: {
  prog: UseProgressReturn;
  onSelectWeek: (week: number) => void;
  onGoPlan: () => void;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const allWeeks = useMemo(() => weeks(), [prog.lang]);
  const hoverWeek = useMemo(() => allWeeks.find((w) => w.id === hover) ?? null, [allWeeks, hover]);

  const currentWeek = Math.min(Math.floor((Math.min(prog.currentDay, 90) - 1) / 7) + 1, 13);
  const finished = prog.currentDay > 90;
  const stampedCount = prog.weekStamps.length;

  const stateOf = (w: Week): "stamped" | "current" | "open" | "locked" => {
    if (prog.weekStamps.includes(w.num)) return "stamped";
    if (w.num === currentWeek && !finished) return "current";
    if (w.num <= currentWeek) return "open";
    return "locked";
  };

  const castFirstNames = (num: number): string => {
    const wk = allWeeks.find((w) => w.num === num);
    if (!wk) return "";
    const map = castMap();
    return wk.cast.map((id) => map[id]?.name.split(" ")[0] ?? id).join(" & ");
  };

  return (
    <section className="flex flex-col gap-3">
      <div className="fade-up flex flex-wrap items-end justify-between gap-3 px-1">
        <div>
          <p className="font-mono text-[10px] font-semibold tracking-[0.22em] text-ink-soft uppercase">
            A rota · 13 paradas · 日本 → アメリカ
          </p>
          <h1 className="mt-1 max-w-xl font-display text-2xl leading-[1.08] font-extrabold tracking-tight sm:text-[28px]">
            De Tóquio a Washington, <span className="text-bus">cruzando o Pacífico</span>
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

      <div className="fade-up paper-grid relative overflow-hidden rounded-xl border-2 border-ink/25 bg-[#dbe9e8] shadow-print" style={{ animationDelay: "120ms" }}>
        <div className="paper-noise pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div className="flex w-full justify-center sm:py-2">
          <div className="relative aspect-[1000/640] h-auto max-h-[78vh] w-full sm:max-w-full sm:flex-1" style={{ maxHeight: "min(78vh, 760px)" }}>
            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full" role="img" aria-label="Mapa do Japão e Estados Unidos com as 13 paradas da rota">
              {/* mar: ondas */}
              <g stroke="#a9c8d6" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.85">
                <path d="M460 120 q7-9 14 0 t14 0" />
                <path d="M520 210 q7-9 14 0 t14 0" />
                <path d="M430 300 q7-9 14 0 t14 0" />
                <path d="M500 400 q7-9 14 0 t14 0" />
                <path d="M440 500 q7-9 14 0 t14 0" />
                <path d="M560 480 q7-9 14 0 t14 0" />
              </g>

              {/* territórios */}
              <path d={USA_OUTLINE} fill="#efe7d3" stroke="rgba(30,42,56,0.55)" strokeWidth="2" strokeLinejoin="round" />
              <path d={HOKKAIDO} fill="#efe7d3" stroke="rgba(30,42,56,0.55)" strokeWidth="2" strokeLinejoin="round" />
              <path d={HONSHU} fill="#efe7d3" stroke="rgba(30,42,56,0.55)" strokeWidth="2" strokeLinejoin="round" />
              <path d={SHIKOKU} fill="#efe7d3" stroke="rgba(30,42,56,0.55)" strokeWidth="1.8" strokeLinejoin="round" />
              <path d={KYUSHU} fill="#efe7d3" stroke="rgba(30,42,56,0.55)" strokeWidth="1.8" strokeLinejoin="round" />
              <g fill="#efe7d3" stroke="rgba(30,42,56,0.45)" strokeWidth="1.4">
                <circle cx="668" cy="470" r="5" />
                <circle cx="676" cy="486" r="4" />
                <circle cx="664" cy="500" r="3.5" />
              </g>

              {/* Monte Fuji decorativo */}
              <g transform="translate(838,300)">
                <path d="M-20 0 L-5 -16 L-2 -12 L0 -16 L3 -11 L20 0 Z" fill="#b3c4d6" stroke="rgba(30,42,56,0.4)" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M-8 -11 L-5 -16 L-2 -12 L0 -16 L3 -11 L6 -8 C2 -6 -4 -6 -8 -11 Z" fill="#fffdf4" stroke="rgba(30,42,56,0.25)" strokeWidth="0.8" />
              </g>

              {/* torii perto de Quioto */}
              <Torii x={770} y={284} />

              {/* cerejeiras perto de DC */}
              <Sakura x={338} y={258} s={1.1} />
              <Sakura x={352} y={250} s={0.8} o={0.7} />
              <Sakura x={366} y={260} s={0.95} o={0.85} />
              <Sakura x={342} y={284} s={0.75} o={0.65} />

              {/* mares */}
              <g fontFamily="'IBM Plex Mono', monospace" fill="#6d99ab" fontWeight={600} letterSpacing="3">
                <text x="490" y="80" fontSize="11" textAnchor="middle">
                  MAR DE BERING
                </text>
                <text x="500" y="300" fontSize="13" textAnchor="middle" letterSpacing="5">
                  OCEANO PACÍFICO
                </text>
                <text x="500" y="322" fontSize="10" textAnchor="middle" letterSpacing="6">
                  太平洋 · PACIFIC OCEAN
                </text>
                <text x="700" y="218" fontSize="9" textAnchor="middle">
                  MAR DO JAPÃO
                </text>
                <text x="620" y="430" fontSize="9" textAnchor="middle">
                  MAR DA CHINA ORIENTAL
                </text>
                <text x="430" y="560" fontSize="9" textAnchor="middle">
                  GOLFO DO MÉXICO
                </text>
                <text x="430" y="150" fontSize="9" textAnchor="middle">
                  ATLÂNTICO
                </text>
              </g>

              {/* regiões */}
              <g fontFamily="'IBM Plex Mono', monospace" fontSize="8.5" letterSpacing="1.8" fill="rgba(30,42,56,0.32)" fontWeight={600} textAnchor="middle">
                {LABELS.map((l) => (
                  <text key={l.label} x={l.x} y={l.y}>
                    {l.label}
                  </text>
                ))}
              </g>

              {/* voo transpacífico */}
              <path d={PACIFIC_PATH} fill="none" stroke="rgba(215,38,61,0.4)" strokeWidth="1.6" strokeDasharray="3 9" className="marching" />
              <g opacity="0.95">
                <animateMotion dur="10s" repeatCount="indefinite" rotate="auto" path={PACIFIC_PATH} />
                <g transform="translate(-11,-11) scale(0.92)" stroke="#d7263d" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <IconGlyph name="plane" />
                </g>
              </g>

              {/* rota base */}
              <g fill="none" stroke="rgba(120,110,88,0.55)" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="2 8">
                {allWeeks.slice(0, -1).map((w, i) => (
                  <path key={w.id} d={segPath(w, allWeeks[i + 1], i)} />
                ))}
              </g>

              {/* rota percorrida */}
              <g fill="none" strokeLinecap="round">
                {allWeeks.slice(0, -1).map((w, i) => {
                  const d = segPath(w, allWeeks[i + 1], i);
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
              <g transform="translate(905,90)">
                <circle r="30" fill="rgba(255,253,244,0.65)" stroke="rgba(30,42,56,0.3)" strokeWidth="1.4" />
                <g fill="rgba(30,42,56,0.45)">
                  <path d="M 0 -28 L 4 -6 L 0 0 L -4 -6 Z" />
                  <path d="M 0 28 L 4 6 L 0 0 L -4 6 Z" />
                  <path d="M -28 0 L -6 -4 L 0 0 L -6 4 Z" />
                  <path d="M 28 0 L 6 -4 L 0 0 L 6 4 Z" />
                </g>
                <g fill="rgba(215,38,61,0.85)" transform="rotate(45)">
                  <path d="M 0 -17 L 3.4 -4 L 0 0 L -3.4 -4 Z" />
                  <path d="M 0 17 L 3.4 4 L 0 0 L -3.4 4 Z" />
                </g>
                <text y="-35" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="11" fontWeight={700} fill="rgba(30,42,56,0.7)">
                  N
                </text>
              </g>

              {/* coordenadas + escala */}
              <g fontFamily="'IBM Plex Mono', monospace" fill="rgba(30,42,56,0.55)">
                <text x="32" y="598" fontSize="10" fontWeight={600}>
                  35°41′N · 139°41′E
                </text>
                <text x="32" y="612" fontSize="8" letterSpacing="2.4" fill="rgba(30,42,56,0.4)">
                  ROTA TRANS-PACÍFICO · 日本 — アメリカ
                </text>
              </g>
              <g transform="translate(32,622)" fontFamily="'IBM Plex Mono', monospace">
                <g stroke="rgba(30,42,56,0.6)" strokeWidth="1">
                  <rect x="0" y="0" width="40" height="4" fill="rgba(30,42,56,0.6)" />
                  <rect x="40" y="0" width="40" height="4" fill="rgba(255,253,244,0.8)" />
                  <rect x="80" y="0" width="40" height="4" fill="rgba(30,42,56,0.6)" />
                </g>
                <g fontSize="7.5" fill="rgba(30,42,56,0.5)">
                  <text x="0" y="14">0</text>
                  <text x="70" y="14">4.000 km</text>
                </g>
              </g>

              {/* pinos */}
              {allWeeks.map((w, i) => {
                const st = stateOf(w);
                const fill = st === "locked" ? "#b3ab96" : w.color;
                const clickable = st !== "locked";
                return (
                  <g key={w.id} className="pin-in" style={{ animationDelay: `${250 + i * 80}ms` }}>
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
                          fontSize="8"
                          fontWeight={600}
                          fill={st === "locked" ? "rgba(30,42,56,0.32)" : "rgba(30,42,56,0.62)"}
                        >
                          {String(w.num).padStart(2, "0")}
                        </text>
                        <text
                          y="24"
                          textAnchor="middle"
                          fontFamily="'IBM Plex Mono', monospace"
                          fontSize="7"
                          fill="rgba(30,42,56,0.35)"
                        >
                          {w.city.split(" · ")[0]}
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
                      ? "→ semana atual"
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
                {stampedCount}
                <span className="text-ink/40">/13</span> carimbos
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="px-1 text-[12px] text-ink-soft italic">
        8 semanas no Japão, 5 nos Estados Unidos — e um voo sobre o Pacífico no meio do caminho. Toque numa parada para abrir a primeira sessão da semana.
      </p>
    </section>
  );
}
