import type { Accent, Platform } from "./data";

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Accent -> flat plate surface + AA-safe text color. One sticker color per element. */
export const accentSurface: Record<Accent, string> = {
  sun: "bg-sun text-ink",
  leaf: "bg-leaf text-ink",
  grape: "bg-grape text-white",
  tangerine: "bg-tangerine text-ink",
  red: "bg-red text-white",
  cobalt: "bg-cobalt text-white",
};

export const platformGlyph: Record<Platform, string> = {
  Steam: "◈",
  Epic: "◆",
  Xbox: "✕",
  PlayStation: "△",
  Nintendo: "◉",
};

export function formatPrice(value: number, currency = "€"): string {
  return `${currency}${value.toFixed(2)}`;
}
