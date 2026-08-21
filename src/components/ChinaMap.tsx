import { useMemo, useState } from "react";
import { weeks } from "../data/content";
import type { Week } from "../data/curriculum";
import type { UseProgressReturn } from "../hooks/useProgress";
import { getDayInfo } from "../lib/engine";
import { Icon, IconGlyph } from "./Icons";

const VB_W = 920;
const VB_H = 640;

/* China continental estilizada */
const CHINA_OUTLINE =
  "M210 96 L300 52 L420 36 L540 44 L640 66 L676 100 L660 140 L632 176 L656 214 L648 268 L676 296 L660 340 L636 392 L612 428 L584 452 L540 462 L478 470 L430 508 L350 520 L268 500 L180 470 L110 420 L52 360 L44 280 L84 208 L150 140 Z";

/* Península da Coreia (Norte + Sul) */
const KOREA_OUTLINE =
  "M676 100 L728 96 L768 132 L782 190 L766 248 L728 292 L700 262 L692 212 L668 176 L664 138 Z";

/* Vietnã — o S do litoral */
const VIETNAM_OUTLINE =
  "M430 508 L478 470 L540 462 L566 470 L590 492 L612 522 L626 556 L616 594 L574 620 L522 610 L506 578 L520 548 L502 516 Z";

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

export function ChinaMap({
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
            东方路线 · rota do oriente · 12 paradas + exame · China, Coreia do Norte e Vietnã
          </p>
          <h1 className="mt-1 max-w-xl font-display text-2xl leading-[1.08] font-extrabold tracking-tight sm:text-[28px]">
            De Pequim a Hoi An, <span className="text-bus">uma semana de cada vez</span>
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

      <div className="fade-up paper-grid relative overflow-hidden rounded-xl border-2 border-ink/25 bg-[#d8e6e2] shadow-print" style={{ animationDelay: "120ms" }}>
        <div className="paper-noise pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div className="flex w-full justify-center sm:py-2">
          <div className="relative aspect-[920/640] h-auto max-h-[78vh] w-full sm:w-auto sm:max-w-full sm:flex-1" style={{ maxHeight: "min(78vh, 760px)" }}>
            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full" role="img" aria-label="Mapa do Leste Asiático com as 13 paradas da rota de mandarim">
              {/* mar: ondas decorativas */}
              <g stroke="#a8c8d8" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.9">
                <path d="M60 60 q6-8 12 0 t12 0" />
                <path d="M840 90 q6-8 12 0 t12 0" />
                <path d="M860 340 q6-8 12 0 t12 0" />
                <path d="M700 560 q6-8 12 0 t12 0" />
                <path d="M300 590 q6-8 12 0 t12 0" />
                <path d="M120 540 q6-8 12 0 t12 0" />
                <path d="M690 250 q5-7 10 0 t10 0" />
              </g>

              {/* territórios */}
              <path d={CHINA_OUTLINE} fill="#efe7d3" stroke="rgba(30,42,56,0.55)" strokeWidth="2" strokeLinejoin="round" />
              <path d={KOREA_OUTLINE} fill="#efe7d3" stroke="rgba(30,42,56,0.55)" strokeWidth="2" strokeLinejoin="round" />
              <path d={VIETNAM_OUTLINE} fill="#efe7d3" stroke="rgba(30,42,56,0.55)" strokeWidth="2" strokeLinejoin="round" />
              {/* Taiwan (sutil) */}
              <ellipse cx="712" cy="392" rx="10" ry="22" fill="#efe7d3" stroke="rgba(30,42,56,0.35)" strokeWidth="1.5" transform="rotate(14 712 392)" />
              {/* arco do Japão (contexto) */}
              <path d="M806 118 Q 852 200 812 302" fill="none" stroke="rgba(30,42,56,0.22)" strokeWidth="2.5" strokeDasharray="1 7" strokeLinecap="round" />

              {/* paralelo 38 (fronteira Coreia do Norte / do Sul) */}
              <path d="M694 216 L779 192" fill="none" stroke="rgba(150,60,60,0.4)" strokeWidth="2" strokeDasharray="6 5" />

              {/* rios */}
              <path d="M180 250 C 300 210 380 250 440 235 C 520 215 570 235 640 250" fill="none" stroke="#a6d3e6" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
              <path d="M160 360 C 300 390 430 370 500 350 C 560 335 620 320 655 305" fill="none" stroke="#a6d3e6" strokeWidth="4" strokeLinecap="round" opacity="0.9" />

              {/* montanhas */}
              <g fill="none" stroke="rgba(30,42,56,0.28)" strokeWidth="1.4" strokeLinecap="round">
                <path d="m230 470 8-13 8 13M246 485 254 472l8 13" />
                <path d="m630 118 7-11 7 11" />
                <path d="m420 300 8-13 8 13" />
              </g>

              {/* regiões e mares */}
              <g fontFamily="'IBM Plex Mono', monospace" fontSize="8.5" letterSpacing="1.8" fill="rgba(30,42,56,0.32)" fontWeight={600} textAnchor="middle">
                <text x="330" y="26">MONGÓLIA</text>
                <text x="520" y="22">SIBÉRIA</text>
                <text x="726" y="248">COREIA DO SUL</text>
                <text x="648" y="260" transform="rotate(-80 648 260)">MAR AMARELO</text>
                <text x="836" y="212" transform="rotate(-80 836 212)">MAR DO JAPÃO</text>
                <text x="676" y="512">MAR DO SUL DA CHINA</text>
                <text x="240" y="200" fontSize="10">XINJIANG</text>
                <text x="180" y="430" fontSize="10">TIBETE</text>
                <text x="430" y="180" fontSize="10">PLANÍCIE DO NORTE</text>
                <text x="395" y="420" fontSize="9">GUIZHOU · FAST</text>
              </g>

              {/* coordenadas */}
              <g fontFamily="'IBM Plex Mono', monospace" fill="rgba(30,42,56,0.55)">
                <text x="30" y="598" fontSize="10" fontWeight={600}>
                  39°54′N · 116°23′E
                </text>
                <text x="30" y="612" fontSize="8" letterSpacing="2.4" fill="rgba(30,42,56,0.4)">
                  LESTE ASIÁTICO — 中国 · 조선 · VIỆT NAM
                </text>
              </g>

              {/* rosa dos ventos */}
              <g transform="translate(852,560)">
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
                          S{String(w.num).padStart(2, "0")} · {w.city.split(" ")[0]}
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
                {stampedCount}<span className="text-ink/40">/13</span> carimbos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
