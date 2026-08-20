import { useId, type ReactNode } from "react";

/** Bandeiras em SVG puro (24×16, cantos arredondados). */
export function Flag({ code, size = 22 }: { code: string; size?: number }) {
  const uid = useId().replace(/[:]/g, "");
  const clipId = `flagclip-${code}-${uid}`;
  const w = size;
  const h = (size * 2) / 3;

  let inner: ReactNode;
  switch (code) {
    case "fr":
      inner = (
        <>
          <rect width="8" height="16" fill="#24457c" />
          <rect x="8" width="8" height="16" fill="#fffdf4" />
          <rect x="16" width="8" height="16" fill="#d7263d" />
        </>
      );
      break;
    case "it":
      inner = (
        <>
          <rect width="8" height="16" fill="#3f9142" />
          <rect x="8" width="8" height="16" fill="#fffdf4" />
          <rect x="16" width="8" height="16" fill="#d7263d" />
        </>
      );
      break;
    case "de":
      inner = (
        <>
          <rect width="24" height="5.4" fill="#2b2b2b" />
          <rect y="5.4" width="24" height="5.3" fill="#d7263d" />
          <rect y="10.7" width="24" height="5.3" fill="#e8b40c" />
        </>
      );
      break;
    case "es":
      inner = (
        <>
          <rect width="24" height="16" fill="#d7263d" />
          <rect y="4" width="24" height="8" fill="#e8b40c" />
          <rect x="4.5" y="6.4" width="3.4" height="3.4" rx="1" fill="#c9a227" />
        </>
      );
      break;
    case "gb":
      inner = (
        <>
          <rect width="24" height="16" fill="#24457c" />
          <path d="M0 0l24 16M24 0L0 16" stroke="#fffdf4" strokeWidth="3.4" />
          <path d="M0 0l24 16M24 0L0 16" stroke="#d7263d" strokeWidth="1.5" />
          <path d="M12 0v16M0 8h24" stroke="#fffdf4" strokeWidth="5.4" />
          <path d="M12 0v16M0 8h24" stroke="#d7263d" strokeWidth="3" />
        </>
      );
      break;
    default:
      inner = <rect width="24" height="16" fill="#e4dcc6" />;
  }

  return (
    <svg width={w} height={h} viewBox="0 0 24 16" className="shrink-0" aria-hidden>
      <defs>
        <clipPath id={clipId}>
          <rect width="24" height="16" rx="3" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>{inner}</g>
      <rect width="24" height="16" rx="3" fill="none" stroke="rgba(30,42,56,0.3)" />
    </svg>
  );
}
