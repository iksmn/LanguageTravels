import { useState } from "react";
import { LANGUAGES } from "../data/curriculum";
import { Flag } from "./Flag";
import { Icon } from "./Icons";
import { useToast } from "./Toasts";

const TILT = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-1"];

export function LangGate({ onPick }: { onPick: (code: string) => void }) {
  const toast = useToast();
  const [pickHover, setPickHover] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* fundo ambiente */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(700px 460px at 12% -8%, rgba(36,69,124,0.09), transparent 62%), radial-gradient(760px 500px at 96% 104%, rgba(215,38,61,0.08), transparent 62%), radial-gradient(520px 380px at 78% -6%, rgba(232,147,12,0.07), transparent 66%)",
          }}
        />
        <div className="spin-slower absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full border-2 border-dashed border-ink/10" />
        <div className="spin-slower absolute -right-32 -bottom-32 h-[420px] w-[420px] rounded-full border-2 border-dashed border-bus/15" style={{ animationDirection: "reverse" }} />
        <div className="absolute top-24 right-[12%] hidden text-bus/25 lg:block">
          <Icon name="plane" size={90} strokeWidth={1.2} />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1200px] flex-col px-4 py-8 sm:px-6">
        {/* topo */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl border-2 border-ink bg-bus text-card shadow-print">
              <Icon name="compass" size={22} strokeWidth={2} />
            </span>
            <div className="leading-none">
              <p className="font-display text-2xl font-extrabold tracking-tight">RUMO</p>
              <p className="mt-1 font-mono text-[9.5px] font-semibold tracking-[0.24em] text-ink-soft uppercase">
                aprendizado em movimento
              </p>
            </div>
          </div>
          <p className="hidden font-mono text-[11px] tracking-[0.18em] text-ink-soft uppercase md:block">
            1 idioma · 90 dias · 15 min/dia
          </p>
        </header>

        {/* chamada */}
        <div className="mt-14 max-w-2xl sm:mt-20">
          <p className="fade-up flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.22em] text-bus uppercase">
            <span className="h-2 w-2 rounded-full bg-bus" />
            Embarque aberto · Nível A1
          </p>
          <h1 className="fade-up mt-3 font-display text-4xl leading-[1.02] font-extrabold tracking-tight sm:text-[56px]" style={{ animationDelay: "80ms" }}>
            Escolha o idioma da sua
            <span className="relative inline-block px-2 text-bus">
              próxima viagem
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden>
                <path d="M2 7 C 60 2, 140 10, 198 4" stroke="#d7263d" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.55" />
              </svg>
            </span>
          </h1>
          <p className="fade-up mt-4 max-w-lg text-[15px] leading-relaxed text-ink-soft" style={{ animationDelay: "160ms" }}>
            Cada idioma é uma rota de <strong className="font-semibold text-ink">90 dias</strong> por lugares reais — vocabulário,
            diálogos, escuta e cultura, um passo por dia. Tudo salvo no seu navegador.
          </p>
        </div>

        {/* passaportes */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-14 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {LANGUAGES.map((l, i) => (
            <button
              key={l.code}
              onClick={() => (l.available ? onPick(l.code) : toast(`${l.name} chega em breve à rota — o Francês já está a bordo!`, "info"))}
              onMouseEnter={() => setPickHover(l.code)}
              onMouseLeave={() => setPickHover(null)}
              className={`fade-up group relative flex flex-col overflow-hidden rounded-xl border-2 p-4 text-left transition-all duration-300 ${TILT[i % TILT.length]} ${
                l.available
                  ? "border-ink bg-navy text-paper shadow-print hover:-translate-y-2 hover:rotate-0"
                  : "cursor-not-allowed border-ink/20 bg-card/80 text-ink/50 hover:-translate-y-1"
              }`}
              style={{ animationDelay: `${260 + i * 90}ms` }}
            >
              <div className="paper-noise pointer-events-none absolute inset-0 opacity-[0.06]" />
              <div className="relative flex items-start justify-between">
                <Flag code={l.flag} size={34} />
                {l.available ? (
                  <span className="flex items-center gap-1 rounded-full bg-bus px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.14em] text-card uppercase">
                    <span className="blink-dot h-1.5 w-1.5 rounded-full bg-card" />
                    A bordo
                  </span>
                ) : (
                  <span className="grid h-6 w-6 place-items-center rounded-full border border-ink/20 text-ink/40">
                    <Icon name="lock" size={12} strokeWidth={2.2} />
                  </span>
                )}
              </div>
              <p className={`relative mt-4 font-display text-xl font-extrabold tracking-tight ${l.available ? "" : "text-ink/60"}`}>
                {l.name}
              </p>
              <p className={`relative font-mono text-[11px] tracking-wide ${l.available ? "text-paper/70" : "text-ink/40"}`}>
                {l.native}
              </p>
              <p
                className={`relative mt-3 font-display text-[15px] font-semibold italic ${
                  l.available ? "text-mustard" : "text-ink/45"
                }`}
              >
                “{l.greeting}”
              </p>
              <div className={`relative mt-4 flex items-center justify-between border-t ${l.available ? "border-paper/20" : "border-ink/10"} pt-3 font-mono text-[10px] tracking-[0.16em] uppercase`}>
                <span className={l.available ? "text-paper/70" : "text-ink/40"}>90 dias · A1</span>
                {l.available ? (
                  <span
                    className={`flex items-center gap-1 font-bold text-card transition-transform duration-200 ${pickHover === l.code ? "translate-x-1" : ""}`}
                  >
                    Embarcar <Icon name="arrowRight" size={12} strokeWidth={2.6} />
                  </span>
                ) : (
                  <span className="text-ink/40">Em breve</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* rodapé do portão */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t-2 border-ink/10 pt-5 sm:mt-16">
          <p className="font-mono text-[11px] text-ink/50">
            Sem cadastro — seu progresso vive no <span className="font-semibold text-ink">localStorage</span> do navegador.
          </p>
          <p className="font-mono text-[11px] tracking-[0.18em] text-ink/50 uppercase">
            Próximo embarque: <span className="font-semibold text-bus">Deutsch</span> · Español · English · Italiano
          </p>
        </div>
      </div>
    </div>
  );
}
