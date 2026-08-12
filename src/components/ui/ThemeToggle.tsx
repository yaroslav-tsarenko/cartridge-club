"use client";

import { useEffect, useState } from "react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("cc-theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light shelf" : "Switch to midnight shelf"}
      aria-pressed={dark}
      className={`cc-tag inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[0.68rem] transition-colors hover:text-ink ${className}`}
    >
      <span aria-hidden>{mounted && dark ? "☾" : "☀"}</span>
      <span className="hidden sm:inline">{mounted && dark ? "Midnight" : "Daylight"}</span>
    </button>
  );
}
