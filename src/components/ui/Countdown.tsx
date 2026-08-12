"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/ui";

/** Ticking countdown sticker for deals. */
export function Countdown({
  seconds,
  className,
}: {
  seconds: number;
  className?: string;
}) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(left / 3600)).padStart(2, "0");
  const m = String(Math.floor((left % 3600) / 60)).padStart(2, "0");
  const s = String(left % 60).padStart(2, "0");
  return (
    <span
      className={cn(
        "cc-tag inline-flex items-center gap-1 rounded-md bg-ink px-2 py-1 text-[0.66rem] text-invert",
        className
      )}
      aria-label={`Deal ends in ${h}:${m}:${s}`}
    >
      <span aria-hidden>⏱</span>
      <span className="tabular-nums">
        {h}:{m}:{s}
      </span>
    </span>
  );
}
