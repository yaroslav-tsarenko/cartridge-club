import type { Accent } from "@/lib/data";
import { accentSurface, cn } from "@/lib/ui";

const rotations = ["-rotate-3", "-rotate-2", "rotate-2", "rotate-3"] as const;

const accentText: Record<Accent, string> = {
  sun: "text-ink",
  leaf: "text-ink",
  tangerine: "text-ink",
  grape: "text-white",
  red: "text-white",
  cobalt: "text-white",
};

// Deterministic 12-point star, rounded so SSR and client serialize identically.
const STAR_POINTS = (() => {
  const spikes = 12;
  const step = 360 / (spikes * 2);
  const pts: string[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? 49 : 38;
    const a = (i * step - 90) * (Math.PI / 180);
    pts.push(`${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
})();

/** Die-cut starburst — the deal sticker. SVG shape with real ink outline + hard offset shadow. */
export function Starburst({
  children,
  accent = "sun",
  className,
  size = 72,
}: {
  children: React.ReactNode;
  accent?: Accent;
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={cn(
        "relative inline-grid -rotate-3 select-none place-items-center leading-none",
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <polygon
          points={STAR_POINTS}
          fill="var(--color-ink)"
          transform="translate(2.5 2.5)"
          opacity="0.85"
        />
        <polygon
          points={STAR_POINTS}
          fill={`var(--color-${accent})`}
          stroke="var(--color-ink)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={cn("cc-tag relative px-1 text-center", accentText[accent])}
        style={{ fontSize: Math.round((size / 5.4) * 10) / 10 }}
      >
        {children}
      </span>
    </span>
  );
}

/** Rounded-corner rectangle sticker — platform / region / info tags. */
export function StickerTag({
  children,
  accent = "cobalt",
  className,
  rotate = true,
  outline = true,
}: {
  children: React.ReactNode;
  accent?: Accent;
  className?: string;
  rotate?: boolean;
  outline?: boolean;
}) {
  const rot = rotate ? rotations[1] : "";
  return (
    <span
      className={cn(
        "cc-tag inline-flex items-center gap-1 rounded-md px-2 py-1 text-[0.7rem]",
        accentSurface[accent],
        outline && "cc-outline",
        rot,
        className
      )}
    >
      {children}
    </span>
  );
}

/** Circle sticker — rating / round badges. */
export function StickerCircle({
  children,
  accent = "sun",
  className,
  size = 44,
}: {
  children: React.ReactNode;
  accent?: Accent;
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={cn(
        "cc-tag cc-outline inline-grid -rotate-2 place-items-center rounded-full leading-none",
        accentSurface[accent],
        className
      )}
      style={{ width: size, height: size }}
    >
      {children}
    </span>
  );
}
