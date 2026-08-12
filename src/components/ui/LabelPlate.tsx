import type { Accent } from "@/lib/data";
import { accentSurface, cn } from "@/lib/ui";

/** Section header on a flat cartridge-label color plate — chunky heading knocked out. */
export function LabelPlate({
  children,
  accent = "cobalt",
  className,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  accent?: Accent;
  className?: string;
  as?: "h2" | "h3" | "span";
}) {
  return (
    <Tag
      className={cn(
        "cc-plate -rotate-1 text-xl md:text-2xl",
        accentSurface[accent],
        className
      )}
    >
      {children}
    </Tag>
  );
}
