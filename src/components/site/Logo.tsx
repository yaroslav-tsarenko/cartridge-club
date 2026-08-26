import Link from "next/link";
import { cn } from "@/lib/ui";

/** Chunky wordmark with a small cartridge glyph. */
export function Logo({
  className,
  compact = false,
  href = "/",
}: {
  className?: string;
  compact?: boolean;
  href?: string;
}) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-2", className)}>
      <span
        className="cc-outline grid h-9 w-9 place-items-center rounded-md bg-red text-white"
        aria-hidden
      >
        {/* cartridge glyph */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 3h13l3 3v15H4V3z"
            fill="currentColor"
            stroke="var(--color-ink)"
            strokeWidth="1.6"
          />
          <rect x="7" y="6" width="8" height="4" rx="1" fill="var(--color-ink)" opacity="0.85" />
          <rect x="7" y="16" width="10" height="2" rx="1" fill="var(--color-ink)" opacity="0.5" />
        </svg>
      </span>
      <span className="font-display text-xl leading-none tracking-tight text-ink">
        CARTRIDGE
        {!compact && <span className="text-red">·</span>}
        <span className="text-cobalt">CLUB</span>
      </span>
    </Link>
  );
}
