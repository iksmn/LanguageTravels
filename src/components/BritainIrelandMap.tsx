import { useMemo, useState } from "react";
import { weeks } from "../data/content";
import type { Week } from "../data/curriculum";
import type { UseProgressReturn } from "../hooks/useProgress";
import { getDayInfo } from "../lib/engine";
import { Icon, IconGlyph } from "./Icons";

const VB_W = 720;
const VB_H = 560;

/* Grã-Bretanha estilizada: Escócia (topo), Inglaterra (meio), País de Gales (península oeste) */
const GREAT_BRITAIN =
  "M360,30 L420,50 L430,90 L415,120 L440,160 L455,220 L470,280 L460,330 L440,360 L400,375 L360,365 L330,345 L320,310 L285,290 L295,255 L315,240 L330,215 L350,180 L340,150 L310,120 L330,80 L350,50 Z";

/* Irlanda: a ilha menor a oeste, com a Irlanda do Norte no nordeste */
const IRELAND =
  "M130,90 L190,85 L210,110 L200,140 L210,180 L190,230 L140,245 L100,215 L90,170 L100,130 Z";

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

export function BritainIrelandMap({
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
            The British Isles route · 12 stops + exam · UK &amp; Ireland
          </p>
          <h1 className="mt-1 max-w-xl font-display text-2xl leading-[1.08] font-extrabold tracking-tight sm:text-[28px]">
            From London to Greenwich, <span className="text-bus">one week at a time</span>
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

      <div className="fade-up paper-grid relative overflow-hidden rounded-xl border-2 border-ink/25 bg-[#cfdfe8] shadow-print" style={{ animationDelay: "120ms" }}>
        <div className="paper-noise pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div className="flex w-full justify-center sm:py-2">
          <div className="relative aspect-[720/560] h-auto max-h-[78vh] w-full sm:w-auto sm:max-w-full sm:flex-1" style={{ maxHeight: "min(78vh, 720px)" }}>
            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full" role="img" aria-label="Mapa das Ilhas Britânicas com as 13 paradas da rota">
              {/* mar: ondas decorativas */}
              <g stroke="#9fbcc9" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.9">
                <path d="M40 80 q6-8 12 0 t12 0" />
                <path d="M30 260 q6-8 12 0 t12 0" />
                <path d="M60 420 q6-8 12 0 t12 0" />
                <path d="M300 500 q6-8 12 0 t12 0" />
                <path d="M540 460 q6-8 12 0 t12 0" />
                <path d="M620 200 q6-8 12 0 t12 0" />
                <path d="M580 60 q6-8 12 0 t12 0" />
                <path d="M240 60 q6-8 12 0 t12 0" />
              </g>

              {/* territórios */}
              <path d={GREAT_BRITAIN} fill="#e9e2cf" stroke="rgba(30,42,56,0.55)" strokeWidth="2" strokeLinejoin="round" />
              <path d={IRELAND} fill="#e9e2cf" stroke="rgba(30,42,56,0.55)" strokeWidth="2" strokeLinejoin="round" />

              {/* fronteira Irlanda do Norte / República da Irlanda (sutil) */}
              <path
                d="M190,85 L178,118 L186,140 L200,140"
                fill="none"
                stroke="rgba(150,60,60,0.28)"
                strokeWidth="2.5"
                strokeDasharray="6 5"
              />

              {/* divisões do Reino Unido (Escócia / Inglaterra, sutis) */}
              <path
                d="M310,120 L340,150 L350,180"
                fill="none"
                stroke="rgba(90,90,130,0.2)"
                strokeWidth="2"
                strokeDasharray="5 5"
              />

              {/* montanhas (Highlands + Snowdon) */}
              <g fill="none" stroke="rgba(30,42,56,0.28)" strokeWidth="1.4" strokeLinecap="round">
                <path d="m330 60 8-13 8 13M346 75 354 62l8 13" />
                <path d="m300 255 8-13 8 13" />
              </g>

              {/* rios (Tâmisa) */}
              <path d="M460,330 C 440,325 420,322 400,318 C 380,314 370,308 360,300" fill="none" stroke="#a6d3e6" strokeWidth="3.5" strokeLinecap="round" opacity="0.9" />

              {/* regiões */}
              <g fontFamily="'IBM Plex Mono', monospace" fontSize="8.5" letterSpacing="1.8" fill="rgba(30,42,56,0.32)" fontWeight={600} textAnchor="middle">
                <text x="380" y="95">SCOTLAND</text>
                <text x="410" y="250">ENGLAND</text>
                <text x="297" y="272" transform="rotate(-12 297 272)">WALES</text>
                <text x="192" y="112">N. IRELAND</text>
                <text x="140" y="200">IRELAND</text>
                <text x="560" y="140" transform="rotate(78 560 140)">NORTH SEA</text>
                <text x="262" y="150" transform="rotate(-75 262 150)">IRISH SEA</text>
                <text x="60" y="300" transform="rotate(-80 60 300)">ATLANTIC</text>
                <text x="420" y="430">ENGLISH CHANNEL</text>
              </g>

              {/* coordenadas */}
              <g fontFamily="'IBM Plex Mono', monospace" fill="rgba(30,42,56,0.55)">
                <text x="30" y="520" fontSize="10" fontWeight={600}>
                  54°35′N · 3°10′W
                </text>
                <text x="30" y="534" fontSize="8" letterSpacing="2.4" fill="rgba(30,42,56,0.4)">
                  BRITISH ISLES — UK &amp; IRELAND
                </text>
              </g>

              {/* rosa dos ventos */}
              <g transform="translate(640,470)">
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
                className="pointer-events-none absolute z-20 w-52 rounded-lg border-2 border-paper/25 bg-ink px-3 py-2 text-paper shadow-print-sm"
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

      <p className="px-1 text-[12px] text-ink-soft italic">
        Toque em uma parada para abrir a primeira sessão daquela semana. O tipo de sessão do dia (vocabulário, diálogo, quiz…) aparece no plano.
      </p>
    </section>
  );
}
