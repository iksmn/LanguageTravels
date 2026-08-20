import { useMemo, useState } from "react";
import { WEEKS, type Week } from "../data/curriculum";
import { castFirstNames } from "../data/cast";
import type { UseProgressReturn } from "../hooks/useProgress";
import { getDayInfo, SESSION_META } from "../lib/engine";
import { Icon, IconGlyph } from "./Icons";

const VB_W = 620;
const VB_H = 660;

const FRANCE_OUTLINE =
  "M368,52 L398,66 L492,88 L486,142 L478,168 L486,240 L492,290 L512,330 L522,428 L505,430 L462,470 L438,462 L400,478 L330,528 L240,540 L198,522 L192,498 L200,440 L196,430 L186,360 L212,300 L160,268 L96,256 L58,252 L78,232 L96,222 L150,208 L196,170 L206,140 L222,158 L240,170 L282,128 L340,72 Z";

const CORSICA = "M552,505 L568,512 L574,528 L568,560 L556,584 L548,566 L546,540 L548,518 Z";

const REGIONS: { label: string; x: number; y: number }[] = [
  { label: "HAUTS-DE-FRANCE", x: 330, y: 100 },
  { label: "GRAND EST", x: 418, y: 152 },
  { label: "NORMANDIE", x: 248, y: 148 },
  { label: "BRETAGNE", x: 112, y: 240 },
  { label: "ÎLE-DE-FRANCE", x: 356, y: 224 },
  { label: "PAYS DE LA LOIRE", x: 222, y: 278 },
  { label: "BOURGOGNE", x: 356, y: 278 },
  { label: "NOUVELLE-AQUITAINE", x: 258, y: 382 },
  { label: "ALPES", x: 452, y: 362 },
  { label: "OCCITANIE", x: 300, y: 482 },
  { label: "PROVENCE", x: 352, y: 468 },
  { label: "CORSE", x: 556, y: 602 },
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

export function FranceMap({
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
            La route · 12 paradas · 12 semanas
          </p>
          <h1 className="mt-1 max-w-xl font-display text-2xl leading-[1.08] font-extrabold tracking-tight sm:text-[28px]">
            De Paris à la Corse, <span className="text-bus">une semaine à la fois</span>
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
        <div className="relative mx-auto aspect-[620/660] w-full max-w-[820px]">
          <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full" role="img" aria-label="Mapa da França com as 12 paradas da rota">
            {/* mar: ondas decorativas */}
            <g stroke="#b7d3dd" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.9">
              <path d="M24 320 q6-8 12 0 t12 0" />
              <path d="M40 356 q6-8 12 0 t12 0" />
              <path d="M96 520 q6-8 12 0 t12 0" />
              <path d="M420 560 q6-8 12 0 t12 0" />
              <path d="M470 590 q6-8 12 0 t12 0" />
              <path d="M350 30 q6-8 12 0 t12 0" />
            </g>

            {/* território */}
            <path d={FRANCE_OUTLINE} fill="#efe7d3" stroke="rgba(30,42,56,0.55)" strokeWidth="2" strokeLinejoin="round" />
            <path d={CORSICA} fill="#efe7d3" stroke="rgba(30,42,56,0.55)" strokeWidth="2" strokeLinejoin="round" />

            {/* parques/montanhas decorativas */}
            <g fill="none" stroke="rgba(30,42,56,0.28)" strokeWidth="1.4" strokeLinecap="round">
              <path d="m470 300 8-13 8 13M486 318 494 305l8 13" />
              <path d="m420 120 7-11 7 11" />
            </g>

            {/* rios */}
            <path d="M212,300 C 260,290 300,270 340,250 C 380,230 400,205 420,180" fill="none" stroke="#a6d3e6" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
            <path d="M228,428 C 260,400 290,380 320,370" fill="none" stroke="#a6d3e6" strokeWidth="3" strokeLinecap="round" opacity="0.8" />

            {/* regiões */}
            <g fontFamily="'IBM Plex Mono', monospace" fontSize="8.5" letterSpacing="1.8" fill="rgba(30,42,56,0.32)" fontWeight={600} textAnchor="middle">
              {REGIONS.map((r) => (
                <text key={r.label} x={r.x} y={r.y}>
                  {r.label}
                </text>
              ))}
            </g>

            {/* mares */}
            <g fontFamily="'IBM Plex Mono', monospace" fill="#6d99ab" fontWeight={600} letterSpacing="3">
              <text x="230" y="88" fontSize="10" textAnchor="middle">
                LA MANCHE
              </text>
              <text x="118" y="430" fontSize="10" textAnchor="middle" transform="rotate(-72 118 430)">
                OCÉAN ATLANTIQUE
              </text>
              <text x="382" y="530" fontSize="10" textAnchor="middle">
                MER MÉDITERRANÉE
              </text>
            </g>

            {/* rota base */}
            <g fill="none" stroke="rgba(120,110,88,0.55)" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="2 8">
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
            <g transform="translate(84,96)">
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

            {/* coordenadas */}
            <g fontFamily="'IBM Plex Mono', monospace" fill="rgba(30,42,56,0.55)">
              <text x="30" y="612" fontSize="10" fontWeight={600}>
                46°36′N · 2°27′E
              </text>
              <text x="30" y="626" fontSize="8" letterSpacing="2.4" fill="rgba(30,42,56,0.4)">
                FRANCE — L'HEXAGONE
              </text>
            </g>

            {/* escala */}
            <g transform="translate(30,638)" fontFamily="'IBM Plex Mono', monospace">
              <g stroke="rgba(30,42,56,0.6)" strokeWidth="1">
                <rect x="0" y="0" width="34" height="4" fill="rgba(30,42,56,0.6)" />
                <rect x="34" y="0" width="34" height="4" fill="rgba(255,253,244,0.8)" />
                <rect x="68" y="0" width="34" height="4" fill="rgba(30,42,56,0.6)" />
              </g>
              <g fontSize="7.5" fill="rgba(30,42,56,0.5)">
                <text x="0" y="14">0</text>
                <text x="60" y="14">500 km</text>
              </g>
            </g>

            {/* pinos */}
            {WEEKS.map((w, i) => {
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
                      <text
                        y="24"
                        textAnchor="middle"
                        fontFamily="'IBM Plex Mono', monospace"
                        fontSize="7"
                        fill="rgba(30,42,56,0.35)"
                      >
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
              {stampedCount}<span className="text-ink/40">/12</span> carimbos
            </p>
          </div>
        </div>
      </div>

      <p className="px-1 text-[12px] text-ink-soft italic">
        Toque em uma parada para abrir a primeira sessão daquela semana. O tipo de sessão do dia ({Object.values(SESSION_META)[0].label.toLowerCase()}, diálogo, quiz…) aparece no plano.
      </p>
    </section>
  );
}
