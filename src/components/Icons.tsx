import type { JSX } from "react";

export type IconName =
  | "plane"
  | "train"
  | "coffee"
  | "museum"
  | "tree"
  | "market"
  | "theater"
  | "bridge"
  | "compass"
  | "flame"
  | "star"
  | "lock"
  | "check"
  | "volume"
  | "x"
  | "arrowRight"
  | "arrowLeft"
  | "pin"
  | "passport"
  | "reset"
  | "play"
  | "stop"
  | "globe"
  | "sun"
  | "utensils"
  | "mountain"
  | "wave"
  | "book"
  | "chat"
  | "help"
  | "repeat"
  | "ear"
  | "trophy"
  | "sparkle"
  | "cap"
  | "calendar"
  | "flag"
  | "users"
  | "music"
  | "wine"
  | "heart";

/** Glifos puros (viewBox 24×24, stroke=currentColor) — reutilizáveis dentro de <svg> maior. */
export function IconGlyph({ name }: { name: IconName }): JSX.Element {
  switch (name) {
    case "plane":
      return (
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2Z" />
      );
    case "train":
      return (
        <>
          <rect x="5" y="3" width="14" height="13" rx="2.5" />
          <path d="M5 10h14" />
          <path d="M9 13.5h.01M15 13.5h.01" strokeWidth={2.4} />
          <path d="m8.5 16-2 4M15.5 16l2 4M6.5 20h11" />
        </>
      );
    case "coffee":
      return (
        <>
          <path d="M17 9h1.5a2.5 2.5 0 0 1 0 5H17" />
          <path d="M4 9h13v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z" />
          <path d="M8 2.5v2.5M12 2.5v2.5" />
        </>
      );
    case "museum":
      return (
        <>
          <path d="M3 10 12 4l9 6" />
          <path d="M5.5 10v7M10 10v7M14 10v7M18.5 10v7" />
          <path d="M3.5 21h17M4 17.5h16" />
        </>
      );
    case "tree":
      return (
        <>
          <path d="M12 22v-4" />
          <path d="M12 18c-3.9 0-6.3-2.5-6.3-5.8 0-1.9 1-3.5 2.3-4.4C8.4 5.2 10 3 12 3s3.6 2.2 4 4.8c1.3.9 2.3 2.5 2.3 4.4 0 3.3-2.4 5.8-6.3 5.8Z" />
        </>
      );
    case "market":
      return (
        <>
          <path d="m5.2 9 2.3-4.5M18.8 9l-2.3-4.5" />
          <path d="M3 9h18l-1.7 9.3a2 2 0 0 1-2 1.7H6.7a2 2 0 0 1-2-1.7Z" />
          <path d="M8.2 12.5v3M12 12.5v3M15.8 12.5v3" />
        </>
      );
    case "theater":
      return (
        <>
          <path d="M4 4h16v8a8 8 0 0 1-16 0Z" />
          <path d="M8.5 9.5h.01M15.5 9.5h.01" strokeWidth={2.4} />
          <path d="M8.5 13.2c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8" />
        </>
      );
    case "bridge":
      return (
        <>
          <path d="M2.5 19h19" />
          <path d="M6 19V9.5L8 6.5l2 3V19M14 19v-9.5l2-3 2 3V19" />
          <path d="M10 11h4M10 14.5h4" />
          <path d="M2.5 13H6M18 13h3.5" />
        </>
      );
    case "compass":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2 5-5 2 2-5Z" />
        </>
      );
    case "flame":
      return (
        <path d="M12 22c4.2 0 7-2.8 7-6.6 0-2.9-1.7-4.9-3.1-6.5C14.4 7.2 13 5.4 13 2.2c-3.4 2-5 4.9-4.4 7.5-.9-.3-1.6-1-2-2C5 9.4 4 11.7 4 14.2 4 18.6 7.6 22 12 22Z" />
      );
    case "star":
      return <path d="m12 2.5 2.3 6.4 6.7 2.3-6.7 2.3L12 20l-2.3-6.5L3 11.2l6.7-2.3Z" />;
    case "lock":
      return (
        <>
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </>
      );
    case "check":
      return <path d="m4.5 12.5 5 5 10-11" />;
    case "volume":
      return (
        <>
          <path d="M11 5 6 9H3v6h3l5 4Z" />
          <path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" />
        </>
      );
    case "x":
      return <path d="M6 6l12 12M18 6 6 18" />;
    case "arrowRight":
      return <path d="M4 12h16M13 5l7 7-7 7" />;
    case "arrowLeft":
      return <path d="M20 12H4M11 5l-7 7 7 7" />;
    case "pin":
      return (
        <>
          <path d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </>
      );
    case "passport":
      return (
        <>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <circle cx="12" cy="10" r="3" />
          <path d="M8 16.5h8" />
        </>
      );
    case "reset":
      return (
        <>
          <path d="M3 12a9 9 0 1 0 3-6.7" />
          <path d="M3 4v5h5" />
        </>
      );
    case "play":
      return <path d="M8 5.5v13l11-6.5Z" />;
    case "stop":
      return <rect x="7" y="7" width="10" height="10" rx="1.5" />;
    case "globe":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
        </>
      );
    case "sun":
      return (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3 7 7M17 17l1.7 1.7M18.7 5.3 17 7M7 17l-1.7 1.7" />
        </>
      );
    case "utensils":
      return (
        <>
          <path d="M7 2.5v19M4.5 2.5v4.5a2.5 2.5 0 0 0 5 0V2.5" />
          <path d="M17.5 21.5V12c-1.9-1.6-2.6-5.4 0-9.5v19" />
        </>
      );
    case "mountain":
      return (
        <>
          <path d="m3 19 5.5-9.5 3 4.5L15 8.5l6 10.5Z" />
          <path d="M13.2 13.5 15 11.7l1.6 1.6" />
        </>
      );
    case "wave":
      return (
        <>
          <path d="M2 9q2.5-4 5 0t5 0t5 0t5 0" />
          <path d="M2 15q2.5-4 5 0t5 0t5 0t5 0" />
        </>
      );
    case "book":
      return (
        <>
          <path d="M4 19.5V5a2 2 0 0 1 2-2h14v17H6.5A2.5 2.5 0 0 0 4 22Z" />
          <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20" />
          <path d="M9 7h7" />
        </>
      );
    case "chat":
      return (
        <>
          <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
          <path d="M8.5 10h.01M12 10h.01M15.5 10h.01" strokeWidth={2.4} />
        </>
      );
    case "help":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.3 9a2.8 2.8 0 0 1 5.5.8c0 1.9-2.8 2.3-2.8 3.7" />
          <path d="M12 17h.01" strokeWidth={2.6} />
        </>
      );
    case "repeat":
      return (
        <>
          <path d="m17 2 4 4-4 4" />
          <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
          <path d="m7 22-4-4 4-4" />
          <path d="M21 13v1a4 4 0 0 1-4 4H3" />
        </>
      );
    case "ear":
      return (
        <>
          <path d="M6 8.5a6 6 0 1 1 12 0c0 3.6-3 4.2-3 7a3 3 0 0 1-6 0" />
          <path d="M9.5 8.5a2.5 2.5 0 0 1 5 0c0 1.6-1.2 2.1-1.7 3.3" />
        </>
      );
    case "trophy":
      return (
        <>
          <path d="M8 21h8M12 17v4M7 4h10v6a5 5 0 0 1-10 0Z" />
          <path d="M7 5H4v1.5A3.5 3.5 0 0 0 7.5 10M17 5h3v1.5A3.5 3.5 0 0 1 16.5 10" />
        </>
      );
    case "sparkle":
      return (
        <>
          <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5l-1.8-5.9L4.5 10.8 10.2 9Z" />
          <path d="M19 3v3M17.5 4.5h3M5 17.5v3M3.5 19h3" />
        </>
      );
    case "cap":
      return (
        <>
          <path d="M12 4 2 9l10 5 10-5Z" />
          <path d="M6 11.8V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.2" />
          <path d="M22 9v5" />
        </>
      );
    case "calendar":
      return (
        <>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M3 10.5h18" />
        </>
      );
    case "flag":
      return (
        <>
          <path d="M5 21V4" />
          <path d="M5 4h13l-2.5 3.5L18 11H5" />
        </>
      );
    case "users":
      return (
        <>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
          <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M17.5 14.4c2.4.7 4 2.5 4 5.1" />
        </>
      );
    case "music":
      return (
        <>
          <path d="M9 18V6l10-2v12" />
          <circle cx="6.5" cy="18" r="2.5" />
          <circle cx="16.5" cy="16" r="2.5" />
        </>
      );
    case "wine":
      return (
        <>
          <path d="M8 3h8c0 4.4-1.8 7-4 7s-4-2.6-4-7Z" />
          <path d="M12 10v8M8 21h8" />
        </>
      );
    case "heart":
      return (
        <path d="M12 20.5S4 15 4 9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5c0 5.5-8 11-8 11Z" />
      );
    default:
      return <circle cx="12" cy="12" r="8" />;
  }
}

export function Icon({
  name,
  size = 20,
  className,
  strokeWidth = 1.8,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <IconGlyph name={name} />
    </svg>
  );
}
