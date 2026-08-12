import type { Game } from "@/lib/data";
import { cn } from "@/lib/ui";

/** Flat "boxed edition" cover — cheap flat-color rendering, box-front proportions. */
export function GameCover({
  game,
  className,
  rounded = "rounded-lg",
}: {
  game: Game;
  className?: string;
  rounded?: string;
}) {
  const initials = game.title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <div
      className={cn("relative aspect-[3/4] w-full overflow-hidden", rounded, className)}
      style={{ background: game.cover.hue }}
      role="img"
      aria-label={`${game.title} cover`}
    >
      {/* spine stripe */}
      <span
        className="absolute inset-y-0 left-0 w-[10%]"
        style={{ background: game.cover.sub }}
      />
      {/* label band */}
      <span
        className="absolute inset-x-0 top-[14%] h-[3px]"
        style={{ background: "rgba(255,252,245,0.85)" }}
      />
      <span
        className="absolute inset-x-0 bottom-[16%] h-[3px]"
        style={{ background: "rgba(30,36,51,0.35)" }}
      />
      {/* big knocked-out initials like a box logo */}
      <span
        className="absolute inset-0 grid place-items-center font-display text-[3.4rem] leading-none tracking-tight"
        style={{ color: "rgba(255,252,245,0.92)" }}
      >
        {initials}
      </span>
      {/* platform footer strip */}
      <span
        className="cc-tag absolute inset-x-0 bottom-0 grid place-items-center py-1 text-[0.6rem]"
        style={{ background: "rgba(30,36,51,0.55)", color: "#FFFCF5" }}
      >
        {game.platform.toUpperCase()} · {game.releaseYear}
      </span>
    </div>
  );
}
