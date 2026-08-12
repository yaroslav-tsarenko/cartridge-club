"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { games, navTabs, platforms, promoStrip, genres } from "@/lib/data";
import { cn, formatPrice } from "@/lib/ui";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { PlatformChip } from "@/components/ui/PlatformChip";
import { StickerTag } from "@/components/ui/Sticker";
import { Logo } from "./Logo";

const megaContent: Record<string, { links: string[] }> = {
  Platforms: { links: platforms.map((p) => p.name) },
  Genres: { links: genres.map((g) => g.name) },
  Deals: { links: ["Flash deals", "Under €10", "Bundle savings", "Weekly picks", "Clearance"] },
  "New Releases": { links: ["This week", "Last 30 days", "Coming soon", "Editor's picks"] },
  "Pre-orders": { links: ["Open pre-orders", "Special editions", "Season passes", "Day-one keys"] },
  "Top Charts": { links: ["Top 10 global", "Trending", "Most wishlisted", "Staff favourites"] },
  "Gift Cards": { links: ["Steam wallet", "PlayStation Store", "Xbox", "Nintendo eShop"] },
};

export function Header({
  cartCount = 3,
  wishCount = 5,
}: {
  cartCount?: number;
  wishCount?: number;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [openTab, setOpenTab] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [acc, setAcc] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenTab(null);
        setMobileOpen(false);
        setSearchFocus(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return games
      .filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.genres.some((x) => x.toLowerCase().includes(q)) ||
          g.platform.toLowerCase().includes(q)
      )
      .slice(0, 5);
  }, [query]);

  const featured = games.find((g) => g.oldPrice)!;

  return (
    <header id="top" className="sticky top-0 z-50">
      {/* (1) Top strip on manila */}
      <div className="bg-band text-muted">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-[0.7rem] sm:px-6 lg:px-8">
          <div className="cc-no-scrollbar flex items-center gap-2 overflow-hidden">
            <span className="cc-tag hidden shrink-0 rounded bg-leaf px-1.5 py-0.5 text-[0.6rem] text-ink sm:inline">
              ● Live
            </span>
            <div className="relative flex overflow-hidden">
              <div className="flex shrink-0 animate-[marquee_22s_linear_infinite] gap-6 whitespace-nowrap pr-6">
                {[...promoStrip, ...promoStrip].map((p, i) => (
                  <span key={i} className="cc-tag text-[0.66rem]">
                    {p} <span className="text-red">·</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <label className="cc-tag hidden items-center gap-1 text-[0.66rem] sm:flex">
              <span className="sr-only">Currency</span>
              <select
                className="cursor-pointer bg-transparent text-[0.66rem] outline-none"
                defaultValue="EUR"
                aria-label="Currency"
              >
                <option>EUR €</option>
                <option>USD $</option>
                <option>GBP £</option>
              </select>
            </label>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* (2) Main bar on cream */}
      <div
        className={cn(
          "border-b-2 border-ink bg-bg transition-all duration-200",
          scrolled ? "py-2 shadow-[0_3px_0_0_var(--cc-shadow)]" : "py-3"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            className="cc-outline grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-card text-xl lg:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <span aria-hidden>≡</span>
          </button>

          <Logo className="shrink-0" />

          {/* Search with instant results */}
          <div className="relative mx-auto hidden w-full max-w-xl md:block">
            <div className="cc-outline flex items-center gap-2 rounded-xl bg-card px-3 py-2">
              <span aria-hidden className="text-muted">
                ⌕
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setTimeout(() => setSearchFocus(false), 150)}
                placeholder="Search 12,000+ official keys…"
                aria-label="Search games"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
              />
              <kbd className="cc-tag hidden rounded border border-line px-1.5 py-0.5 text-[0.6rem] text-muted sm:inline">
                /
              </kbd>
            </div>

            {searchFocus && results.length > 0 && (
              <div className="cc-outline absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-xl bg-card p-2">
                {results.map((g) => (
                  <a
                    key={g.id}
                    href="#"
                    className="flex items-center gap-3 rounded-lg p-2 hover:bg-band"
                  >
                    <span
                      className="h-12 w-9 shrink-0 rounded"
                      style={{ background: g.cover.hue }}
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-heading text-sm">{g.title}</span>
                      <PlatformChip platform={g.platform} size="sm" />
                    </span>
                    <span className="font-heading text-sm">{formatPrice(g.price)}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Right cluster */}
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <IconButton label="Account" glyph="☺" />
            <IconButton label="Collection (wishlist)" glyph="▤" count={wishCount} accent="grape" />
            <IconButton label="Cart" glyph="▦" count={cartCount} accent="red" />
          </div>
        </div>
      </div>

      {/* (3) Nav row of flat pill tabs */}
      <div className="relative hidden border-b-2 border-line bg-bg lg:block" ref={navRef}>
        <nav
          className="mx-auto flex max-w-7xl items-center gap-2 px-4 sm:px-6 lg:px-8"
          aria-label="Primary"
          onMouseLeave={() => setOpenTab(null)}
        >
          {navTabs.map((tab) => {
            const active = openTab === tab;
            return (
              <div key={tab} className="py-2">
                <button
                  type="button"
                  onMouseEnter={() => setOpenTab(tab)}
                  onFocus={() => setOpenTab(tab)}
                  onClick={() => setOpenTab(active ? null : tab)}
                  aria-expanded={active}
                  aria-haspopup="true"
                  className={cn(
                    "cc-tag rounded-lg px-3 py-1.5 text-[0.78rem] transition-colors",
                    active
                      ? "cc-outline bg-cobalt text-white"
                      : "text-ink hover:bg-band"
                  )}
                >
                  {tab}
                </button>
              </div>
            );
          })}
          <span className="cc-tag ml-auto inline-flex items-center gap-1 text-[0.7rem] text-leaf">
            ⚡ Instant email delivery
          </span>
        </nav>

        {/* Mega panel */}
        {openTab && (
          <div
            className="absolute inset-x-0 top-full z-40"
            onMouseEnter={() => setOpenTab(openTab)}
            onMouseLeave={() => setOpenTab(null)}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="cc-outline-plate grid grid-cols-[1.2fr_1.5fr_1fr] gap-6 rounded-b-xl border-t-0 bg-card p-6">
                <div>
                  <p className="cc-tag mb-3 text-[0.65rem] text-muted">Browse {openTab}</p>
                  <ul className="space-y-1.5">
                    {megaContent[openTab]?.links.map((l) => (
                      <li key={l}>
                        <a
                          href="#"
                          className="font-heading text-sm text-ink hover:text-cobalt"
                        >
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="cc-tag mb-3 text-[0.65rem] text-muted">Fresh on the shelf</p>
                  <div className="grid grid-cols-4 gap-2">
                    {games.slice(0, 4).map((g) => (
                      <a key={g.id} href="#" className="group/mini">
                        <span
                          className="cc-outline block aspect-[3/4] rounded"
                          style={{ background: g.cover.hue }}
                          aria-hidden
                        />
                        <span className="mt-1 block truncate text-[0.65rem] text-muted group-hover/mini:text-ink">
                          {g.title}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
                <a
                  href="#"
                  className="cc-outline relative flex flex-col justify-between overflow-hidden rounded-lg bg-red-tint p-4"
                >
                  <div className="absolute -right-2 -top-3">
                    <StickerTag accent="sun">Deal</StickerTag>
                  </div>
                  <p className="cc-tag text-[0.65rem] text-red">Featured</p>
                  <div>
                    <p className="font-heading text-base leading-tight">{featured.title}</p>
                    <p className="mt-1 font-heading text-lg text-red">
                      {formatPrice(featured.price)}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-ink/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="absolute left-0 top-0 h-full w-[86%] max-w-sm overflow-y-auto border-r-2 border-ink bg-bg p-4">
            <div className="flex items-center justify-between">
              <Logo compact />
              <button
                type="button"
                className="cc-outline grid h-9 w-9 place-items-center rounded-lg bg-card text-lg"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <span aria-hidden>✕</span>
              </button>
            </div>

            <div className="cc-outline mt-4 flex items-center gap-2 rounded-xl bg-card px-3 py-2">
              <span aria-hidden className="text-muted">
                ⌕
              </span>
              <input
                placeholder="Search keys…"
                aria-label="Search games"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
              />
            </div>

            <ul className="mt-4 divide-y divide-line border-y border-line">
              {navTabs.map((tab) => (
                <li key={tab}>
                  <button
                    type="button"
                    onClick={() => setAcc(acc === tab ? null : tab)}
                    aria-expanded={acc === tab}
                    className="flex w-full items-center justify-between py-3 font-heading text-sm"
                  >
                    {tab}
                    <span aria-hidden className="text-muted">
                      {acc === tab ? "–" : "+"}
                    </span>
                  </button>
                  {acc === tab && (
                    <ul className="pb-3 pl-3">
                      {megaContent[tab]?.links.map((l) => (
                        <li key={l}>
                          <a href="#" className="block py-1.5 text-sm text-muted">
                            {l}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center justify-between">
              <ThemeToggle />
              <div className="flex gap-2">
                <IconButton label="Collection" glyph="▤" count={wishCount} accent="grape" />
                <IconButton label="Cart" glyph="▦" count={cartCount} accent="red" />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function IconButton({
  label,
  glyph,
  count,
  accent,
}: {
  label: string;
  glyph: string;
  count?: number;
  accent?: "red" | "grape";
}) {
  return (
    <button
      type="button"
      aria-label={count ? `${label}, ${count} items` : label}
      className="cc-stamp cc-outline relative grid h-10 w-10 place-items-center rounded-lg bg-card text-lg text-ink hover:bg-band"
    >
      <span aria-hidden>{glyph}</span>
      {typeof count === "number" && count > 0 && (
        <span
          className={cn(
            "cc-tag absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full border-2 border-ink px-1 text-[0.6rem]",
            accent === "grape" ? "bg-grape text-white" : "bg-red text-white"
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
