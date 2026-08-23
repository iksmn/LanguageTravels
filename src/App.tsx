import { useEffect, useRef, useState } from "react";
import { useProgress } from "./hooks/useProgress";
import { ToastProvider, useToast } from "./components/Toasts";
import { Header, type AppView } from "./components/Header";
import { LangGate } from "./components/LangGate";
import { PlanView } from "./components/PlanView";
import { GrandTourMap } from "./components/GrandTourMap";
import { ItalyMap } from "./components/ItalyMap";
import { IberiaMap } from "./components/IberiaMap";
import { GermanyMap } from "./components/GermanyMap";
import { BritainIrelandMap } from "./components/BritainIrelandMap";
import { ChinaMap } from "./components/ChinaMap";
import { JapanMap } from "./components/JapanMap";
import { OfflineView } from "./components/OfflineView";
import { PassportView } from "./components/PassportView";
import { CastView } from "./components/CastView";
import { VerbsView } from "./components/VerbsView";
import { FlashcardsView } from "./components/FlashcardsView";
import { SessionModal } from "./components/SessionModal";
import { getDayInfo, TOTAL_DAYS } from "./lib/engine";
import { setLang, langMeta } from "./data/content";

function Ambient() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(640px 420px at 88% -6%, rgba(215,38,61,0.06), transparent 65%), radial-gradient(720px 480px at -8% 96%, rgba(14,143,139,0.07), transparent 65%), radial-gradient(520px 380px at 55% 118%, rgba(232,147,12,0.06), transparent 70%)",
        }}
      />
      <div className="spin-slower absolute -top-44 -right-44 h-[520px] w-[520px] rounded-full border-2 border-dashed border-ink/10" />
      <div className="float-y absolute -bottom-24 -left-24 h-72 w-72 rounded-full border-2 border-dashed border-ink/8" />
    </div>
  );
}

function Shell() {
  const prog = useProgress();
  const toast = useToast();
  const [view, setView] = useState<AppView>("plan");
  const [sessionDay, setSessionDay] = useState<number | null>(null);
  const firstLoad = useRef(true);

  // Ao escolher idioma pela primeira vez, começa no plano; depois, lembra a aba.
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    if (prog.lang) setView("plan");
  }, [prog.lang]);

  if (!prog.lang) {
    return <LangGate onPick={prog.chooseLanguage} />;
  }

  // Mantém o resolvedor de conteúdo sincronizado com o idioma ativo.
  setLang(
    prog.lang === "it"
      ? "it"
      : prog.lang === "de"
        ? "de"
        : prog.lang === "es"
          ? "es"
          : prog.lang === "en"
            ? "en"
            : prog.lang === "zh"
              ? "zh"
              : prog.lang === "ja"
                ? "ja"
                : "fr",
  );

  const openDay = (d: number) => {
    if (d < 1 || d > TOTAL_DAYS) return;
    if (!prog.unlockedDay(d)) {
      const currentWeek = getDayInfo(Math.min(prog.currentDay, 84)).week;
      toast(
        d <= 84
          ? `Dia bloqueado: conclua antes a Semana ${String(currentWeek).padStart(2, "0")}.`
          : "A Grande Revisão abre depois do dia 84.",
        "lock",
      );
      return;
    }
    setSessionDay(d);
  };

  const finishDay = (day: number, xp: number, score?: number, total?: number): number => {
    return prog.completeDay(day, {
      score,
      total,
      date: new Date().toISOString().slice(0, 10),
      xp,
    });
  };

  const activeRecord = sessionDay ? prog.progress.days[sessionDay] : undefined;

  return (
    <div className="relative min-h-screen">
      <Ambient />
      <div className="relative z-10">
        <Header
          view={view}
          onView={setView}
          xp={prog.progress.xp}
          streak={prog.progress.streak}
          day={prog.currentDay}
          lang={prog.lang}
          onLanguages={() => prog.backToGate()}
        />

        <main className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6 sm:py-6">
          {view === "plan" && (
            <PlanView prog={prog} onOpenDay={openDay} onPassport={() => setView("passport")} />
          )}
          {view === "map" &&
            (() => {
              const MapComp =
                prog.lang === "it"
                  ? ItalyMap
                  : prog.lang === "de"
                    ? GermanyMap
                    : prog.lang === "es"
                      ? IberiaMap
                      : prog.lang === "en"
                        ? BritainIrelandMap
                        : prog.lang === "zh"
                          ? ChinaMap
                          : GrandTourMap;
              return (
                <MapComp
                  prog={prog}
                  onSelectWeek={(week: number) => {
                    const firstDay = (week - 1) * 7 + 1;
                    if (prog.unlockedDay(firstDay)) setSessionDay(firstDay);
                    else toast(`A Semana ${String(week).padStart(2, "0")} ainda está fechada — siga a rota em ordem.`, "lock");
                  }}
                  onGoPlan={() => setView("plan")}
                />
              );
            })()}
          {view === "cast" && (
            <CastView
              onOpenWeek={(week) => {
                setView("map");
                toast(`Semana ${String(week).padStart(2, "0")} destacada no mapa da rota.`, "info");
              }}
            />
          )}
          {view === "verbs" && <VerbsView prog={prog} />}
          {view === "cards" && <FlashcardsView prog={prog} />}
          {view === "offline" && <OfflineView prog={prog} />}
          {view === "passport" && (
            <PassportView
              prog={prog}
              onReset={() => {
                prog.resetActive();
                toast(`Progresso de ${langMeta().name.toLowerCase()} apagado. Boa nova rota!`, "info");
              }}
              onResetAll={() => {
                prog.resetAll();
                toast("Progresso de todos os idiomas apagado. Boa nova jornada!", "info");
              }}
            />
          )}
        </main>

        <footer className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2 border-t-2 border-ink/10 px-4 py-5 font-mono text-[11px] text-ink/45 sm:px-6">
          <p>
            <span className="font-semibold text-ink">RUMO</span> · 90 dias · nível A1 — {langMeta().greeting} Rota de{" "}
            {langMeta().name.toLowerCase()} ativa.
          </p>
          <p className="tracking-[0.14em] uppercase">A2 em breve · {langMeta().native}</p>
        </footer>
      </div>

      {sessionDay !== null && (
        <SessionModal
          key={`${sessionDay}`}
          day={sessionDay}
          dayDone={Boolean(activeRecord)}
          totalXp={prog.progress.xp}
          prog={prog}
          onClose={() => setSessionDay(null)}
          onFinish={finishDay}
          onExamFail={() => toast("Não foi dessa vez — o exame final pode ser refeito com novas questões.", "info")}
          onCertificate={() => {
            setSessionDay(null);
            setView("passport");
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Shell />
    </ToastProvider>
  );
}
