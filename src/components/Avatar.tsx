import { useId } from "react";
import type { Character } from "../data/cast";

/** Retrato estilizado em SVG puro, montado a partir dos traços do personagem. */
export function Avatar({
  char,
  size = 48,
  className,
  title,
}: {
  char: Character;
  size?: number;
  className?: string;
  title?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const a = char.avatar;
  const ink = "#1e2a38";

  const hairCap = (
    <path d="M27 28 C27 16.5 53 16.5 53 28 C53 21 48 17.5 40 17.5 C32 17.5 27 21 27 28 Z" fill={a.hair} />
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      className={className}
      role="img"
      aria-label={title ?? char.name}
    >
      <title>{title ?? `${char.name} — ${char.profPt}`}</title>
      <clipPath id={`av-${uid}`}>
        <circle cx="40" cy="40" r="37" />
      </clipPath>
      <circle cx="40" cy="40" r="38" fill={`${char.color}1c`} />
      <g clipPath={`url(#av-${uid})`}>
        {/* corpo */}
        <path d="M19 82 C19 60 29 53 40 53 C51 53 61 60 61 82 Z" fill={a.shirt} />
        {/* cabelo longo atrás */}
        {(a.hairStyle === "long" || a.hairStyle === "bob") && (
          <path d="M25 26 C23 42 25 52 31 58 L34 50 C29 44 28 34 29 26 Z M55 26 C57 42 55 52 49 58 L46 50 C51 44 52 34 51 26 Z" fill={a.hair} />
        )}
        {/* pescoço + cabeça */}
        <rect x="36" y="42" width="8" height="10" rx="3" fill={a.skin} />
        <circle cx="40" cy="30" r="13.5" fill={a.skin} />
        {/* franja / topo */}
        {hairCap}
        {a.hairStyle === "bun" && (
          <>
            <circle cx="40" cy="13.5" r="5.5" fill={a.hair} />
            <rect x="36.5" y="17" width="7" height="2.4" rx="1.2" fill={char.color} />
          </>
        )}
        {a.hairStyle === "bob" && (
          <>
            <rect x="24.5" y="26" width="7.5" height="17" rx="3.5" fill={a.hair} />
            <rect x="48" y="26" width="7.5" height="17" rx="3.5" fill={a.hair} />
          </>
        )}
        {/* boina */}
        {a.accessory === "beret" && (
          <g transform="rotate(-7 40 19)">
            <ellipse cx="40" cy="18.5" rx="15.5" ry="6" fill="#c8102e" />
            <circle cx="40" cy="12.5" r="2" fill="#c8102e" />
          </g>
        )}
        {/* gorro */}
        {a.accessory === "beanie" && (
          <>
            <path d="M26.5 27 C26.5 14.5 53.5 14.5 53.5 27 L53.5 29 L26.5 29 Z" fill="#334155" />
            <rect x="25.5" y="26.5" width="29" height="4.5" rx="2.2" fill="#475569" />
          </>
        )}
        {/* rosto */}
        <circle cx="34.6" cy="31" r="1.7" fill={ink} />
        <circle cx="45.4" cy="31" r="1.7" fill={ink} />
        {a.accessory === "mustache" ? (
          <>
            <path
              d="M33.5 36.8 C35.5 39 38 39 40 36.8 C42 39 44.5 39 46.5 36.8"
              stroke="#3d2e23"
              strokeWidth="2.6"
              strokeLinecap="round"
              fill="none"
            />
            <path d="M36.5 41.5 Q40 44 43.5 41.5" stroke={ink} strokeWidth="1.7" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <path d="M35.8 37 Q40 40.6 44.2 37" stroke={ink} strokeWidth="1.7" strokeLinecap="round" fill="none" />
        )}
        {/* óculos */}
        {a.accessory === "glasses" && (
          <g stroke={ink} strokeWidth="1.8" fill="none">
            <circle cx="34.6" cy="31" r="5" />
            <circle cx="45.4" cy="31" r="5" />
            <path d="M39.6 31 h0.8" />
            <path d="M29.6 30 L27 29 M50.4 30 L53 29" />
          </g>
        )}
      </g>
      <circle cx="40" cy="40" r="37.4" fill="none" stroke={char.color} strokeWidth="2.4" />
    </svg>
  );
}
