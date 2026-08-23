import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icons";
import { Flag } from "./Flag";
import { TOTAL_DAYS, levelTitle } from "../lib/engine";

const LANG_NAME: Record<string, string> = {
  fr: "Francês",
  it: "Italiano",
  de: "Alemão",
  es: "Espanhol",
  en: "Inglês",
  zh: "Mandarim",
  ja: "Japonês",
};

export type AppView = "plan" | "map" | "verbs" | "cards" | "cast" | "passport" | "offline";

function useAnimatedNumber(target: number, duration = 700): number {
  const [display, setDisplay] = useState(target);
  const prev = useRef(target);
  useEffect(() => {
    const from = prev.current;
    const to = target;
    if (from === to) return;
    prev.current = to;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return display;
}

const TABS: { id: AppView; label: string; icon: "calendar" | "compass" | "passport" | "users" | "book" | "harddrive" | "cards" }[] = [
  { id: "plan", label: "Plano 90 dias", icon: "calendar" },
  { id: "map", label: "Mapa da rota", icon: "compass" },
  { id: "verbs", label: "Verbos", icon: "book" },
  { id: "cards", label: "Cartões", icon: "cards" },
  { id: "cast", label: "Compagnons", icon: "users" },
  { id: "offline", label: "Offline", icon: "harddrive" },
  { id: "passport", label: "Passaporte", icon: "passport" },
];

export function Header({
  view,
  onView,
  xp,
  streak,
  day,
  lang,
  onLanguages,
}: {
  view: AppView;
  onView: (v: AppView) => void;
  xp: number;
  streak: number;
  day: number;
  lang: string;
  onLanguages: () => void;
}) {
  const axp = useAnimatedNumber(xp);
  const dayLabel = Math.min(day, TOTAL_DAYS);
  const pct = Math.min(100, Math.round(((day - 1) / TOTAL_DAYS) * 100));

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink/12 bg-paper/92 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 sm:px-6">
        {/* marca */}
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg border-2 border-ink bg-bus text-card shadow-print-sm">
            <Icon name="compass" size={19} strokeWidth={2} />
          </span>
          <div className="leading-none">
            <p className="font-display text-lg font-extrabold tracking-tight">RUMO</p>
            <p className="mt-0.5 font-mono text-[9px] font-semibold tracking-[0.22em] text-ink-soft uppercase">
              90 dias · nível A1
            </p>
          </div>
        </div>

        {/* idioma ativo */}
        <button
          onClick={onLanguages}
          className="btn-press ml-1 flex items-center gap-2 rounded-lg border-2 border-ink/20 bg-card px-2.5 py-1.5 shadow-print-sm"
          title="Trocar de idioma"
        >
          <Flag code={lang} size={20} />
          <span className="font-mono text-[11px] font-semibold tracking-wide uppercase">{LANG_NAME[lang] ?? lang}</span>
          <span className="font-mono text-[9px] text-ink/40">trocar</span>
        </button>

        {/* abas */}
        <nav className="order-3 -mx-1 flex w-full gap-1 overflow-x-auto pb-0.5 md:order-none md:mx-0 md:w-auto md:flex-1 md:justify-center">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => onView(t.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[11px] font-semibold tracking-wide uppercase transition-all duration-200 ${
                view === t.id
                  ? "border-2 border-ink bg-ink text-paper shadow-print-sm"
                  : "border-2 border-transparent text-ink-soft hover:border-ink/20 hover:bg-card"
              }`}
            >
              <Icon name={t.icon} size={14} strokeWidth={2.2} />
              {t.label}
            </button>
          ))}
        </nav>

        {/* estatísticas */}
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <div
            className="flex items-center gap-1.5 rounded-lg border-2 border-ink/15 bg-card px-2.5 py-1.5"
            title="Sequência de dias com sessão concluída"
          >
            <span className={streak > 0 ? "text-flame" : "text-ink/30"}>
              <Icon name="flame" size={15} strokeWidth={2.2} />
            </span>
            <span className="font-mono text-[13px] font-semibold">{streak}</span>
          </div>

          <div
            className="hidden items-center gap-2 rounded-lg border-2 border-ink/15 bg-card px-2.5 py-1.5 sm:flex"
            title="Progresso dos 90 dias"
          >
            <span className="font-mono text-[11px] font-semibold whitespace-nowrap text-ink-soft">
              Dia <span className="text-bus">{dayLabel}</span>/90
            </span>
            <span className="h-1.5 w-14 overflow-hidden rounded-full bg-ink/10">
              <span
                className="block h-full rounded-full bg-bus transition-[width] duration-700"
                style={{ width: `${pct}%` }}
              />
            </span>
          </div>

          <div
            className="flex items-center gap-2 rounded-lg border-2 border-ink bg-mustard/15 px-2.5 py-1.5"
            title={`Nível: ${levelTitle(xp)}`}
          >
            <span className="text-mustard">
              <Icon name="star" size={15} strokeWidth={2.2} />
            </span>
            <span className="font-mono text-[13px] font-bold tabular-nums">{axp.toLocaleString("pt-BR")} XP</span>
            <span className="hidden font-mono text-[9px] font-semibold tracking-wider text-ink-soft uppercase lg:block">
              {levelTitle(xp)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
