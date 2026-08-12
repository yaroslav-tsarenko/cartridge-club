import type { Accent } from "@/lib/data";
import { cn } from "@/lib/ui";
import { LabelPlate } from "./LabelPlate";

export function Section({
  children,
  className,
  band = false,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  band?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("py-12 md:py-16", band && "bg-band", className)}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHead({
  plate,
  accent = "cobalt",
  title,
  action,
}: {
  plate: string;
  accent?: Accent;
  title?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-2">
        <LabelPlate accent={accent}>{plate}</LabelPlate>
        {title && (
          <p className="max-w-xl text-sm text-muted md:text-base">{title}</p>
        )}
      </div>
      {action}
    </div>
  );
}
