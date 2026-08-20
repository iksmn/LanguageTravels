import { WEEKS } from "../data/curriculum";
import { CAST_MAP } from "../data/cast";
import {
  SESSION_ICONS,
  SESSION_META,
  TOTAL_DAYS,
  WEEKS_TOTAL,
  getDayInfo,
} from "../lib/engine";
import type { UseProgressReturn } from "../hooks/useProgress";
import { Icon, type IconName } from "./Icons";
import { Avatar } from "./Avatar";

function ProgressRing({ pct }: { pct: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid h-24 w-24 shrink-0 place-items-center">
      <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
        <circle cx="48" cy="48" r={r} fill="none" stroke="rgba(30,42,56,0.12)" strokeWidth="8" />
        <circle
          cx="48"
          cy="48"
          r={r}
          fill="none"
          stroke="#d7263d"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct / 100)}
          style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.2,0.8,0.3,1)" }}
        />
      </svg>
      <div className="absolute text-center leading-none">
        <p className="font-display text-xl font-extrabold">{Math.round(pct)}%</p>
        <p className="mt-0.5 font-mono text-[8.5px] tracking-[0.18em] text-ink-soft uppercase">rota</p>
      </div>
    </div>
  );
}

function DayCell({
  day,
  prog,
  onOpen,
  index,
}: {
  day: number;
  prog: UseProgressReturn;
  onOpen: (d: number) => void;
  index: number;
}) {
  const info = getDayInfo(day);
  const meta = SESSION_META[info.type];
  const done = prog.isDayDone(day);
  const current = prog.currentDay === day;
  const locked = !prog.unlockedDay(day);
  const icon = SESSION_ICONS[info.type] as IconName;
  const rec = prog.progress.days[day];

  return (
    <button
      onClick={() => onOpen(day)}
      title={`Dia ${day} — ${meta.label}${done && rec?.score !== undefined ? ` (${rec.score}/${rec.total})` : ""}${locked ? " · bloqueado" : ""}`}
      className={`fade-up group relative flex aspect-[5/4] flex-col items-center justify-center gap-0.5 rounded-lg border-2 transition-all duration-200 sm:aspect-[6/4] ${
        done
          ? "border-leaf/45 bg-leaf/10 text-leaf hover:-translate-y-0.5 hover:shadow-print-sm"
          : current
            ? "border-bus bg-bus/8 text-bus shadow-print-sm hover:-translate-y-0.5"
            : locked
              ? "border-ink/10 bg-ink/4 text-ink/25"
              : "border-ink/20 bg-card text-ink-soft hover:-translate-y-0.5 hover:shadow-print-sm"
      }`}
      style={{ animationDelay: `${index * 22}ms` }}
    >
      <span className="absolute top-1 left-1.5 font-mono text-[9px] font-semibold opacity-70">{day}</span>
      {done && (
        <span className="absolute top-0.5 right-1 text-leaf">
          <Icon name="check" size={10} strokeWidth={3} />
        </span>
      )}
      {current && <span className="blink-dot absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-bus" />}
      <span className="transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6">
        <Icon name={locked ? "lock" : icon} size={17} strokeWidth={2.1} />
      </span>
      <span className="hidden font-mono text-[8px] font-semibold tracking-[0.08em] uppercase opacity-80 sm:block">
        {locked ? "—" : meta.label.split(" ")[0]}
      </span>
    </button>
  );
}

function WeekRow({
  week,
  prog,
  onOpen,
  rowIndex,
}: {
  week: number;
  prog: UseProgressReturn;
  onOpen: (d: number) => void;
  rowIndex: number;
}) {
  const isFinal = week === WEEKS_TOTAL;
  const wk = isFinal ? null : WEEKS[week - 1];
  const startDay = (week - 1) * 7 + 1;
  const days = isFinal
    ? [85, 86, 87, 88, 89, 90]
    : Array.from({ length: 7 }, (_, i) => startDay + i);
  const stamped = prog.weekStamps.includes(week);
  const doneCount = days.filter((d) => prog.isDayDone(d)).length;

  return (
    <div
      className="fade-up grid grid-cols-1 gap-2 sm:grid-cols-[168px_1fr] sm:gap-3"
      style={{ animationDelay: `${80 + rowIndex * 60}ms` }}
    >
      {/* etiqueta da semana */}
      <div
        className={`flex items-center justify-between gap-2 rounded-lg border-2 px-3 py-2 sm:flex-col sm:items-start sm:justify-center ${
          isFinal ? "border-ink bg-navy text-paper" : stamped ? "border-leaf/40 bg-leaf/8" : "border-ink/15 bg-card"
        }`}
      >
        <div>
          <p className={`font-mono text-[10px] font-bold tracking-[0.18em] uppercase ${isFinal ? "text-mustard" : stamped ? "text-leaf" : "text-ink/45"}`}>
            {isFinal ? "Semana 13" : `Semaine ${String(week).padStart(2, "0")}`}
          </p>
          <p className={`mt-0.5 font-display text-[13.5px] leading-tight font-bold ${isFinal ? "text-paper" : "text-ink"}`}>
            {isFinal ? "La Grande Révision" : wk?.theme}
          </p>
          <p className={`mt-0.5 flex items-center gap-1 text-[11px] ${isFinal ? "text-paper/70" : "text-ink-soft"}`}>
            {!isFinal && <Icon name="pin" size={11} strokeWidth={2.2} />}
            {isFinal ? "Dias 85–90 · exame final" : wk?.city}
          </p>
        </div>
        {!isFinal && wk && (
          <div className="flex w-full items-center justify-between gap-2 sm:mt-1.5">
            <div className="flex -space-x-1.5">
              {wk.cast.map((id) => {
                const c = CAST_MAP[id];
                return c ? (
                  <span key={id} className="rounded-full ring-2 ring-card transition-transform duration-200 hover:-translate-y-1" title={c.name}>
                    <Avatar char={c} size={20} />
                  </span>
                ) : null;
              })}
            </div>
            <p className="truncate font-mono text-[8.5px] font-semibold tracking-[0.08em] text-ink/45 uppercase" title={wk.themes.map((t) => `${t.fr} — ${t.pt}`).join("\n")}>
              {wk.themes.map((t) => t.fr).join(" · ")}
            </p>
          </div>
        )}
        <div className="flex items-center gap-1.5 sm:mt-1">
          {stamped ? (
            <span className="flex items-center gap-1 font-mono text-[9.5px] font-bold tracking-wider text-leaf uppercase">
              <Icon name="check" size={11} strokeWidth={3} /> carimbo
            </span>
          ) : (
            <span className={`font-mono text-[9.5px] font-semibold tracking-wider uppercase ${isFinal ? "text-paper/60" : "text-ink/40"}`}>
              {doneCount}/{days.length} dias
            </span>
          )}
          {isFinal && prog.certificateEarned && (
            <span className="text-mustard">
              <Icon name="cap" size={15} strokeWidth={2.2} />
            </span>
          )}
        </div>
      </div>

      {/* células dos dias */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {days.map((d, i) => (
          <DayCell key={d} day={d} prog={prog} onOpen={onOpen} index={i} />
        ))}
        {isFinal && (
          <div className="flex aspect-[5/4] flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-mustard/50 bg-mustard/8 text-mustard sm:aspect-[6/4]">
            <Icon name="cap" size={18} strokeWidth={2} />
            <span className="font-mono text-[8px] font-bold tracking-[0.12em] uppercase">Diplôme</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function PlanView({
  prog,
  onOpenDay,
  onPassport,
}: {
  prog: UseProgressReturn;
  onOpenDay: (d: number) => void;
  onPassport: () => void;
}) {
  const finished = prog.currentDay > TOTAL_DAYS;
  const day = Math.min(prog.currentDay, TOTAL_DAYS);
  const info = getDayInfo(day);
  const meta = SESSION_META[info.type];
  const icon = SESSION_ICONS[info.type] as IconName;
  const doneDays = Math.min(prog.currentDay - 1, TOTAL_DAYS);
  const pct = (doneDays / TOTAL_DAYS) * 100;

  return (
    <div className="flex flex-col gap-5">
      {/* painel HOJE */}
      <section
        className="fade-up relative overflow-hidden rounded-xl border-2 border-ink bg-card shadow-print"
      >
        <div className="paper-noise pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div className="absolute top-0 left-0 h-full w-1.5" style={{ background: meta.color }} />
        <div className="relative flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
          <ProgressRing pct={pct} />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="flex items-center gap-1.5 rounded-full border-2 border-ink px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-[0.14em] uppercase"
                style={{ color: meta.color, borderColor: `${meta.color}66`, background: `${meta.color}12` }}
              >
                <Icon name={icon} size={12} strokeWidth={2.4} />
                {meta.label}
              </span>
              <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-ink-soft uppercase">
                {finished
                  ? "Programa concluído"
                  : info.week <= 12
                    ? `Semaine ${String(info.week).padStart(2, "0")} · ${info.weekData?.place} · ${info.weekData?.themes.map((t) => t.fr).join(" + ")}`
                    : "La Grande Révision"}
              </span>
            </div>

            {finished ? (
              <>
                <h2 className="mt-2 font-display text-[26px] leading-tight font-extrabold tracking-tight sm:text-3xl">
                  90 dias. 12 carimbos. <span className="text-bus">Un diplôme.</span>
                </h2>
                <p className="mt-1 max-w-xl text-[14px] text-ink-soft">
                  Você completou o Grand Tour pela Francofonia — de Paris aos Alpes suíços, de Bruxelas a Luxemburgo. Seu certificado A1 está no passaporte.
                </p>
              </>
            ) : (
              <>
                <h2 className="mt-2 font-display text-[26px] leading-tight font-extrabold tracking-tight sm:text-3xl">
                  Dia <span style={{ color: meta.color }}>{day}</span>
                  <span className="text-ink/30"> / 90</span>
                  {info.weekData && (
                    <span className="text-ink"> — {info.weekData.title}</span>
                  )}
                </h2>
                <p className="mt-1 max-w-xl text-[14px] text-ink-soft">
                  {info.type === "culture" && info.weekData
                    ? `Dia leve: um fato sobre ${info.weekData.city}, uma dica de local e +10 XP garantidos.`
                    : info.type === "exam"
                      ? "10 questões sobre toda a rota. Acerte 6+ para gravar seu certificado A1."
                      : info.weekData?.desc ?? "Revisão geral do que você já aprendeu na rota."}
                </p>
              </>
            )}
          </div>

          <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
            {finished ? (
              <button
                onClick={onPassport}
                className="btn-press flex items-center justify-center gap-2 rounded-lg border-2 border-ink bg-mustard px-5 py-3 font-mono text-[12px] font-bold tracking-wide text-ink uppercase shadow-print"
              >
                <Icon name="cap" size={16} strokeWidth={2.2} />
                Ver diploma
              </button>
            ) : (
              <button
                onClick={() => onOpenDay(day)}
                className="btn-press flex items-center justify-center gap-2 rounded-lg border-2 border-ink px-5 py-3 font-mono text-[12px] font-bold tracking-wide text-card uppercase shadow-print"
                style={{ background: meta.color }}
              >
                <Icon name="play" size={15} strokeWidth={2.2} />
                Começar sessão
              </button>
            )}
            <p className="text-center font-mono text-[10px] font-semibold tracking-[0.16em] text-ink-soft uppercase sm:text-right">
              {finished ? `${prog.progress.xp.toLocaleString("pt-BR")} XP acumulados` : `${meta.xpHint} · ~15 min`}
            </p>
          </div>
        </div>
      </section>

      {/* tabuleiro das 13 semanas */}
      <section className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between px-1">
          <h2 className="font-display text-lg font-bold tracking-tight">O plano de voo</h2>
          <p className="font-mono text-[10px] tracking-[0.16em] text-ink-soft uppercase">
            7 sessões por semana · 1 carimbo no quiz
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          {Array.from({ length: WEEKS_TOTAL }, (_, i) => (
            <WeekRow key={i + 1} week={i + 1} prog={prog} onOpen={onOpenDay} rowIndex={i} />
          ))}
        </div>
        <p className="px-1 pt-1 text-[12px] text-ink-soft italic">
          Cada semana é uma parada na Francofonia: vocabulário, diálogo, quiz (carimbo!), revisão, escuta, desafio e um dia de cultura.
        </p>
      </section>
    </div>
  );
}
