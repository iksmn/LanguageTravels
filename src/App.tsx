import { useState } from "react";
import { TOTAL_DAYS, XP, getDayInfo, weekStampDay } from "./lib/engine";
import { useProgress } from "./hooks/useProgress";
import { ToastProvider, useToast } from "./components/Toasts";
import { LangGate } from "./components/LangGate";
import { Header, type AppView } from "./components/Header";
import { PlanView } from "./components/PlanView";
import { FranceMap } from "./components/FranceMap";
import { PassportView } from "./components/PassportView";
import { SessionModal } from "./components/SessionModal";

function Shell() {
  const prog = useProgress();
  const toast = useToast();
  const [view, setView] = useState<AppView>("plan");
  const [sessionDay, setSessionDay] = useState<number | null>(null);

  /* ---------- sem idioma ativo: portão de embarque ---------- */
  if (!prog.lang) {
    return (
      <LangGate
        onPick={(code) => {
          prog.chooseLanguage(code);
          toast("Bienvenue à bord! Sua rota de 90 dias começa no Dia 1.", "success");
        }}
      />
    );
  }

  /* ---------- ações ---------- */
  const openDay = (d: number) => {
    if (!prog.unlockedDay(d)) {
      const cur = Math.min(prog.currentDay, TOTAL_DAYS);
      const need = getDayInfo(cur);
      toast(
        `Dia bloqueado — conclua antes o Dia ${cur} (${need.type === "exam" ? "exame final" : getDayInfo(cur).week <= 12 ? getDayInfo(cur).weekData?.theme ?? "sessão" : "revisão"}).`,
        "lock",
      );
      return;
    }
    setSessionDay(d);
  };

  const finishSession = (day: number, xp: number, score?: number, total?: number): number => {
    const gained = prog.completeDay(day, {
      xp,
      score,
      total,
      date: new Date().toISOString().slice(0, 10),
    });

    if (gained > 0) {
      // avisos de marco
      const wasStampDay = weekStampDay(getDayInfo(day).week) === day;
      if (wasStampDay) {
        const wk = getDayInfo(day).weekData;
        window.setTimeout(
          () => toast(`Nova parada no mapa liberada: ${wk ? wk.place : "semana seguinte"}!`, "success"),
          1100,
        );
      }
      if (day + 1 > TOTAL_DAYS) {
        window.setTimeout(() => toast("Programa completo! Seu diplôme espera no Passaporte.", "xp"), 1100);
      }
    }
    return gained;
  };

  const activeRecord = sessionDay !== null ? prog.progress.days[sessionDay] : undefined;

  return (
    <div className="relative min-h-screen">
      {/* fundo ambiente */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(640px 420px at 90% -6%, rgba(36,69,124,0.07), transparent 65%), radial-gradient(720px 480px at -8% 100%, rgba(215,38,61,0.06), transparent 65%), radial-gradient(520px 380px at 55% 118%, rgba(232,147,12,0.05), transparent 70%)",
          }}
        />
        <div className="spin-slower absolute -top-44 -right-44 h-[520px] w-[520px] rounded-full border-2 border-dashed border-ink/10" />
        <div className="float-y absolute -bottom-24 -left-24 h-72 w-72 rounded-full border-2 border-dashed border-ink/8" />
      </div>

      <div className="relative z-10">
        <Header
          view={view}
          onView={setView}
          xp={prog.progress.xp}
          streak={prog.progress.streak}
          day={prog.currentDay}
          onLanguages={() => prog.backToGate()}
        />

        <main className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6 sm:py-6">
          {view === "plan" && (
            <PlanView prog={prog} onOpenDay={openDay} onPassport={() => setView("passport")} />
          )}
          {view === "map" && (
            <FranceMap
              prog={prog}
              onSelectWeek={(w) => openDay((w - 1) * 7 + 1)}
              onGoPlan={() => setView("plan")}
            />
          )}
          {view === "passport" && (
            <PassportView
              prog={prog}
              onReset={() => {
                prog.resetActive();
                toast("Progresso apagado. Bonne route na próxima tentativa!", "info");
              }}
            />
          )}
        </main>

        <footer className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2 border-t-2 border-ink/10 px-4 py-5 font-mono text-[11px] text-ink/45 sm:px-6">
          <p>
            <span className="font-semibold text-ink">RUMO</span> · aprendizado em movimento — um idioma por viagem, um
            dia por passo.
          </p>
          <p className="tracking-[0.14em] uppercase">48°51′N · 2°21′E — Paris, ponto de partida</p>
        </footer>
      </div>

      {sessionDay !== null && (
        <SessionModal
          key={`${sessionDay}`}
          day={sessionDay}
          dayDone={Boolean(activeRecord)}
          totalXp={prog.progress.xp}
          onClose={() => setSessionDay(null)}
          onFinish={finishSession}
          onExamFail={() =>
            toast(`Quase! O exame exige ${XP.examPassScore}+ acertos — revise as semanas e tente de novo.`, "lock")
          }
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
