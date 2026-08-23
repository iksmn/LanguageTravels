import { useMemo, useState } from "react";
import { castMap, weeks } from "../data/content";
import type { Week } from "../data/curriculum";
import type { UseProgressReturn } from "../hooks/useProgress";
import { getDayInfo } from "../lib/engine";
import { Icon, IconGlyph } from "./Icons";

const VB_W = 1000;
const VB_H = 640;

/* ── Rota Levante → Magrebe (9 países) ── */

/* Marrocos */
const MOROCCO_OUTLINE = "M35 255 L100 228 L150 245 L152 330 L125 395 L62 412 L32 345 Z";
/* Argélia */
const ALGERIA_OUTLINE = "M150 245 L215 230 L218 330 L200 395 L165 398 L152 330 Z";
/* Tunísia */
const TUNISIA_OUTLINE = "M215 230 L258 222 L272 245 L265 300 L235 312 L218 280 Z";
/* Líbia */
const LIBYA_OUTLINE = "M258 222 L330 235 L345 320 L320 415 L270 418 L245 350 L235 312 Z";
/* Egito */
const EGYPT_OUTLINE = "M330 235 L400 245 L402 340 L375 415 L338 395 L338 320 Z";
/* Palestina */
const PALESTINE_OUTLINE = "M400 245 L430 240 L435 310 L415 332 L402 300 Z";
/* Líbano */
const LEBANON_OUTLINE = "M430 240 L452 232 L456 288 L438 300 L435 270 Z";
/* Síria */
const SYRIA_OUTLINE = "M452 232 L435 190 L465 158 L545 150 L568 205 L545 245 L480 252 Z";
/* Iraque */
const IRAQ_OUTLINE = "M545 245 L568 205 L545 150 L600 132 L705 152 L730 225 L700 305 L655 365 L595 340 L570 300 Z";

const COUNTRY_OUTLINES = [
  MOROCCO_OUTLINE, ALGERIA_OUTLINE, TUNISIA_OUTLINE, LIBYA_OUTLINE, EGYPT_OUTLINE,
  PALESTINE_OUTLINE, LEBANON_OUTLINE, SYRIA_OUTLINE, IRAQ_OUTLINE,
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

export function ArabiaMap({
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
    const map = castMap();
    return w.cast.map((id) => map[id]?.name.split(" ")[0] ?? id).join(" & ");
  };

  return (
    <section className="flex flex-col gap-3">
      <div className="fade-up flex flex-wrap items-end justify-between gap-3 px-1">
        <div>
          <p className="font-mono text-[10px] font-semibold tracking-[0.22em] text-ink-soft uppercase">
            المسار العربي · 12 paradas + exame · Iraque, Síria, Líbano, Palestina, Egito, Líbia, Argélia, Tunísia e Marrocos
          </p>
          <h1 className="mt-1 max-w-xl font-display text-2xl leading-[1.08] font-extrabold tracking-tight sm:text-[28px]">
            De Bagdá a Marraquexe, <span className="text-bus">uma semana de cada vez</span>
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

      <div className="fade-up paper-grid relative overflow-hidden rounded-xl border-2 border-ink/25 bg-[#dce6e2] shadow-print" style={{ animationDelay: "120ms" }}>
        <div className="paper-noise pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div className="flex w-full justify-center sm:py-2">
          <div className="relative aspect-[1000/640] h-auto max-h-[78vh] w-full sm:w-auto sm:max-w-full sm:flex-1" style={{ maxHeight: "min(78vh, 760px)" }}>
            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full" role="img" aria-label="Mapa do mundo árabe com as 13 paradas da rota de árabe">
              {/* ondas decorativas (mares) */}
              <g stroke="#a8c8d8" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.9">
                <path d="M300 130 q6-8 12 0 t12 0" />
                <path d="M620 100 q6-8 12 0 t12 0" />
                <path d="M900 300 q6-8 12 0 t12 0" />
                <path d="M300 520 q6-8 12 0 t12 0" />
                <path d="M760 560 q6-8 12 0 t12 0" />
                <path d="M70 160 q6-8 12 0 t12 0" />
              </g>

              {/* territórios (Levante → Magrebe) */}
              {COUNTRY_OUTLINES.map((d, i) => (
                <path key={i} d={d} fill="#efe7d3" stroke="rgba(30,42,56,0.55)" strokeWidth="2" strokeLinejoin="round" />
              ))}

              {/* Nilo */}
              <path d="M365 415 C 368 380 370 355 372 340 C 374 322 368 305 366 295" fill="none" stroke="#a6d3e6" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
              {/* Tigre e Eufrates */}
              <path d="M600 150 C 620 200 635 250 645 290 C 650 315 652 335 655 355" fill="none" stroke="#a6d3e6" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
              <path d="M575 165 C 585 215 592 260 598 300 C 602 325 606 342 610 355" fill="none" stroke="#a6d3e6" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />

              {/* Saara (pontilhado) */}
              <g fill="rgba(190,150,80,0.35)">
                <circle cx="120" cy="440" r="2" />
                <circle cx="200" cy="450" r="2" />
                <circle cx="280" cy="460" r="2" />
                <circle cx="360" cy="465" r="2" />
                <circle cx="450" cy="470" r="2" />
                <circle cx="560" cy="450" r="2" />
                <circle cx="650" cy="430" r="2" />
              </g>

              {/* países e mares */}
              <g fontFamily="'IBM Plex Mono', monospace" fontSize="8.5" letterSpacing="1.8" fill="rgba(30,42,56,0.32)" fontWeight={600} textAnchor="middle">
                <text x="430" y="120" fontSize="10">البحر المتوسط · MEDITERRÂNEO</text>
                <text x="90" y="460" fontSize="9">المغرب</text>
                <text x="185" y="345" fontSize="8">الجزائر</text>
                <text x="245" y="282" fontSize="7">تونس</text>
                <text x="290" y="330" fontSize="8">ليبيا</text>
                <text x="370" y="320" fontSize="8">مصر</text>
                <text x="418" y="298" fontSize="6">فلسطين</text>
                <text x="443" y="278" fontSize="6">لبنان</text>
                <text x="500" y="210" fontSize="8">سوريا</text>
                <text x="630" y="250" fontSize="9">العراق</text>
                <text x="70" y="500" fontSize="9">المحيط الأطلسي</text>
                <text x="465" y="380" fontSize="8" transform="rotate(-64 465 380)">البحر الأحمر</text>
                <text x="790" y="250" fontSize="9">الخليج العربي</text>
                <text x="400" y="500" fontSize="10">الصَّحْراء الكُبْرى</text>
                <text x="362" y="400" fontSize="7" transform="rotate(-80 362 400)">النِّيل</text>
                <text x="622" y="340" fontSize="7" transform="rotate(-78 622 340)">دِجْلَة والفُرات</text>
              </g>

              {/* coordenadas */}
              <g fontFamily="'IBM Plex Mono', monospace" fill="rgba(30,42,56,0.55)">
                <text x="30" y="598" fontSize="10" fontWeight={600}>
                  33°19′N · 44°22′E
                </text>
                <text x="30" y="612" fontSize="8" letterSpacing="2.4" fill="rgba(30,42,56,0.4)">
                  العالَم العربي — مِنَ المُحيطِ إِلى الخَليج
                </text>
              </g>

              {/* rosa dos ventos */}
              <g transform="translate(930,100)">
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
