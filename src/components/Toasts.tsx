import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { Icon, type IconName } from "./Icons";

type Kind = "success" | "xp" | "lock" | "info";
type Toast = { id: number; msg: string; kind: Kind };

const ToastCtx = createContext<(msg: string, kind?: Kind) => void>(() => {});

export const useToast = () => useContext(ToastCtx);

const KIND_META: Record<Kind, { icon: IconName; cls: string }> = {
  success: { icon: "check", cls: "bg-leaf text-card" },
  xp: { icon: "star", cls: "bg-mustard text-ink" },
  lock: { icon: "lock", cls: "bg-ink text-paper" },
  info: { icon: "pin", cls: "bg-cobalt text-card" },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);

  const push = useCallback((msg: string, kind: Kind = "info") => {
    const id = nextId.current++;
    setToasts((t) => [...t.slice(-3), { id, msg, kind }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3800);
  }, []);

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed right-4 bottom-4 z-[80] flex w-[min(320px,calc(100vw-2rem))] flex-col gap-2">
        {toasts.map((t) => {
          const meta = KIND_META[t.kind];
          return (
            <div
              key={t.id}
              className="toast-in pointer-events-auto flex items-center gap-3 rounded-lg border-2 border-ink bg-card px-3 py-2.5 shadow-print-sm"
            >
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-md ${meta.cls}`}>
                <Icon name={meta.icon} size={16} strokeWidth={2.2} />
              </span>
              <p className="text-[13px] font-semibold leading-snug text-ink">{t.msg}</p>
            </div>
          );
        })}
      </div>
    </ToastCtx.Provider>
  );
}
