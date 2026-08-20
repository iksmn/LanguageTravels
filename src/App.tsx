import { useState } from "react";
import { LOCATIONS, type Location } from "./data/lessons";
import { useProgress } from "./hooks/useProgress";
import { ToastProvider, useToast } from "./components/Toasts";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { MapView } from "./components/MapView";
import { LessonModal } from "./components/LessonModal";
import { Passport } from "./components/Passport";

function Shell() {
  const prog = useProgress();
  const toast = useToast();
  const [view, setView] = useState<"map" | "passport">("map");
  const [lessonId, setLessonId] = useState<string | null>(null);

  const lessonLoc: Location | undefined = LOCATIONS.find((l) => l.id === lessonId);
  const lessonIdx = lessonLoc ? LOCATIONS.findIndex((l) => l.id === lessonLoc.id) : -1;
  const nextLoc = lessonIdx >= 0 ? LOCATIONS[lessonIdx + 1] : undefined;

  const openLesson = (id: string) => {
    if (prog.isUnlocked(id)) {
      setLessonId(id);
      return;
    }
    const loc = LOCATIONS.find((l) => l.id === id);
    const blocker = prog.currentId ? LOCATIONS.find((l) => l.id === prog.currentId) : null;
    toast(
      blocker && loc && loc.num > blocker.num
        ? `Rota em ordem: conclua "${blocker.namePt}" antes.`
        : `Esta parada ainda está fechada.`,
      "lock",
    );
  };

  const finishLesson = (score: number): number => {
    if (!lessonLoc) return 0;
    const gained = prog.complete(lessonLoc.id, score);
    if (gained > 0) {
      toast(
        score === 3
          ? `+${gained} XP · Selo de ouro em ${lessonLoc.nameEn}!`
          : `+${gained} XP · Carimbo de ${lessonLoc.nameEn} conquistado!`,
        "xp",
      );
      if (nextLoc) {
        window.setTimeout(() => toast(`Nova parada liberada: ${nextLoc.namePt}`, "success"), 900);
      }
    }
    return gained;
  };

  return (
    <div className="relative min-h-screen">
      {/* fundo ambiente */}
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

      <div className="relative z-10">
        <Header view={view} onView={setView} xp={prog.progress.xp} streak={prog.progress.streak} level={prog.level} />

        <main className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6 sm:py-6">
          {view === "map" ? (
            <div className="grid items-start gap-6 lg:grid-cols-[330px_1fr]">
              <div className="order-2 lg:order-1 lg:sticky lg:top-[76px]">
                <Sidebar prog={prog} onOpen={openLesson} />
              </div>
              <div className="order-1 lg:order-2">
                <MapView
                  prog={prog}
                  onSelect={openLesson}
                  onLocked={(loc) => openLesson(loc.id)}
                  onGoCurrent={() => prog.currentId && openLesson(prog.currentId)}
                />
              </div>
            </div>
          ) : (
            <Passport
              prog={prog}
              onReset={() => {
                prog.reset();
                toast("Progresso apagado. Boa nova viagem!", "info");
              }}
            />
          )}
        </main>

        <footer className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2 border-t-2 border-ink/10 px-4 py-5 font-mono text-[11px] text-ink/45 sm:px-6">
          <p>
            <span className="font-semibold text-ink">RUMO</span> · aprendizado em movimento — lição a lição, parada a parada.
          </p>
          <p className="tracking-[0.14em] uppercase">51.5072° N · 0.1276° W — Londres</p>
        </footer>
      </div>

      {lessonLoc && (
        <LessonModal
          key={lessonLoc.id}
          loc={lessonLoc}
          review={prog.isCompleted(lessonLoc.id)}
          onClose={() => setLessonId(null)}
          onFinish={finishLesson}
          hasNext={Boolean(nextLoc)}
          nextName={nextLoc?.namePt}
          onNext={() => nextLoc && setLessonId(nextLoc.id)}
          onPassport={() => {
            setLessonId(null);
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
