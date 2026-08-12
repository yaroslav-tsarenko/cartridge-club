import type { Platform } from "@/lib/data";
import { cn, platformGlyph } from "@/lib/ui";

/** Quiet, consistent flat platform tag — deliberately calmer than brand colors. */
export function PlatformChip({
  platform,
  className,
  size = "md",
}: {
  platform: Platform;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "cc-tag inline-flex items-center gap-1 rounded-md border border-line bg-chip text-chip-ink",
        size === "sm" ? "px-1.5 py-0.5 text-[0.62rem]" : "px-2 py-1 text-[0.68rem]",
        className
      )}
    >
      <span aria-hidden className="text-[0.9em] leading-none">
        {platformGlyph[platform]}
      </span>
      {platform}
    </span>
  );
}
