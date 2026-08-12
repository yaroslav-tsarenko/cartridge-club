import { cn } from "@/lib/ui";

/** Decorative fake barcode print detail. */
export function Barcode({
  className,
  label = "0 74821 09318 4",
}: {
  className?: string;
  label?: string;
}) {
  const widths = [2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 2, 1, 3, 1, 2];
  return (
    <div className={cn("inline-flex flex-col items-center gap-1", className)} aria-hidden>
      <div className="flex h-9 items-end gap-[2px]">
        {widths.map((w, i) => (
          <span
            key={i}
            className="bg-current"
            style={{ width: w, height: i % 5 === 0 ? "100%" : "88%" }}
          />
        ))}
      </div>
      <span className="cc-tag text-[0.6rem] tracking-[0.2em] opacity-80">{label}</span>
    </div>
  );
}
