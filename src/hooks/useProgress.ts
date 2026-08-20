import { useEffect, useRef, useState } from "react";
import { LOCATIONS, PERFECT_BONUS, XP_PER_QUESTION, levelFromXp, xpIntoLevel, XP_PER_LEVEL } from "../data/lessons";

export type Stamp = { date: string; score: string; perfect: boolean };

export type Progress = {
  completed: string[];
  xp: number;
  stamps: Record<string, Stamp>;
  streak: number;
  lastActive: string;
};

const KEY = "rumo-progress-v1";

const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const shiftISO = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw) as Progress;
      if (p && Array.isArray(p.completed) && typeof p.xp === "number") {
        return {
          completed: p.completed,
          xp: p.xp,
          stamps: p.stamps ?? {},
          streak: typeof p.streak === "number" ? p.streak : 1,
          lastActive: typeof p.lastActive === "string" ? p.lastActive : todayISO(),
        };
      }
    }
  } catch {
    /* estado corrompido → recomeça */
  }
  return { completed: [], xp: 0, stamps: {}, streak: 1, lastActive: todayISO() };
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(load);
  const hydrated = useRef(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(progress));
    } catch {
      /* sem storage disponível */
    }
  }, [progress]);

  /* Sequência de dias: atualiza uma vez ao abrir o app */
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    setProgress((p) => {
      const today = todayISO();
      if (p.lastActive === today) return p;
      const streak = p.lastActive === shiftISO(-1) ? p.streak + 1 : 1;
      return { ...p, streak, lastActive: today };
    });
  }, []);

  const isCompleted = (id: string) => progress.completed.includes(id);

  const unlockedIndex = Math.min(progress.completed.length, LOCATIONS.length - 1);
  const currentId =
    progress.completed.length >= LOCATIONS.length
      ? null
      : LOCATIONS[unlockedIndex].id;

  const isUnlocked = (id: string) => {
    const idx = LOCATIONS.findIndex((l) => l.id === id);
    if (idx === -1) return false;
    return progress.completed.includes(id) || idx <= unlockedIndex;
  };

  /** Registra conclusão. Retorna o XP ganho (0 em modo revisão). */
  const complete = (id: string, score: number): number => {
    if (progress.completed.includes(id)) return 0;
    const gained = score * XP_PER_QUESTION + (score === 3 ? PERFECT_BONUS : 0);
    const date = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
    setProgress((p) =>
      p.completed.includes(id)
        ? p
        : {
            ...p,
            xp: p.xp + gained,
            completed: [...p.completed, id],
            stamps: {
              ...p.stamps,
              [id]: { date, score: `${score}/3`, perfect: score === 3 },
            },
          },
    );
    return gained;
  };

  const reset = () => {
    setProgress({ completed: [], xp: 0, stamps: {}, streak: progress.streak, lastActive: todayISO() });
  };

  return {
    progress,
    complete,
    reset,
    isCompleted,
    isUnlocked,
    currentId,
    level: levelFromXp(progress.xp),
    levelXp: xpIntoLevel(progress.xp),
    xpPerLevel: XP_PER_LEVEL,
    routeDone: progress.completed.length >= LOCATIONS.length,
  };
}

export type UseProgressReturn = ReturnType<typeof useProgress>;
