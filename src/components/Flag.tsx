import { useId, type ReactNode } from "react";

/** Estrela de 5 pontas em path. */
function starPath(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? r : r * 0.42;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}

function Star({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return <path d={starPath(cx, cy, r)} fill="#e8b40c" />;
}

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
    case "cn":
      inner = (
        <>
          <rect width="24" height="16" fill="#d7263d" />
          <Star cx={4.6} cy={4.4} r={2.4} />
          <Star cx={8.6} cy={1.8} r={0.8} />
          <Star cx={9.8} cy={3.6} r={0.8} />
          <Star cx={9.8} cy={5.6} r={0.8} />
          <Star cx={8.6} cy={7.4} r={0.8} />
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
