"use client";

import { useRef } from "react";
import { cn } from "@/lib/ui";

/** Box-spine shelf rail — swipeable with momentum, thin shelf line, arrow controls. */
export function Rail({
  children,
  className,
  itemClassName = "w-[220px] sm:w-[240px]",
}: {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: number) => {
    ref.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  const items = Array.isArray(children) ? children : [children];

  return (
    <div className="relative">
      <div className="cc-shelf">
        <div
          ref={ref}
          className={cn(
            "cc-no-scrollbar flex gap-5 overflow-x-auto scroll-smooth pb-2",
            "snap-x snap-mandatory",
            className
          )}
        >
          {items.map((child, i) => (
            <div
              key={i}
              className={cn("shrink-0 snap-start", itemClassName)}
              style={{ filter: "drop-shadow(0 6px 6px rgba(30,36,51,0.14))" }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
          className="cc-stamp cc-outline grid h-9 w-9 place-items-center rounded-lg bg-card text-ink hover:bg-band"
        >
          <span aria-hidden>‹</span>
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
          className="cc-stamp cc-outline grid h-9 w-9 place-items-center rounded-lg bg-card text-ink hover:bg-band"
        >
          <span aria-hidden>›</span>
        </button>
      </div>
    </div>
  );
}
