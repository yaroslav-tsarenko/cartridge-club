"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navTabs, promoStrip } from "@/lib/data";
import { cn } from "@/lib/ui";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { PlatformChip } from "@/components/ui/PlatformChip";
import { StickerTag } from "@/components/ui/Sticker";
import { useCart } from "@/components/providers/CartProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { CURRENCIES, type CurrencyCode } from "@/lib/currency";
import { Logo } from "./Logo";

type MeUser = { firstName: string; email: string; balance: number } | null;

type MegaLink = { label: string; href: string };

// Every link maps to a real store query so no category lands on an empty page.
const megaContent: Record<string, { links: MegaLink[] }> = {
  Platforms: {
    links: [
      { label: "Steam", href: "/store?platform=Steam" },
      { label: "Ubisoft Connect", href: "/store?platform=Ubisoft" },
      { label: "EA App", href: "/store?platform=EA Play" },
      { label: "Epic Games", href: "/store?platform=Epic Games" },
      { label: "GOG", href: "/store?platform=GOG" },
      { label: "Battle.net", href: "/store?platform=Battle.net" },
    ],
  },
  Genres: {
    links: [
      { label: "Action", href: "/store?genre=Action" },
      { label: "Adventure", href: "/store?genre=Adventure" },
      { label: "RPG", href: "/store?genre=RPG" },
      { label: "Strategy", href: "/store?genre=Strategy" },
      { label: "Shooter", href: "/store?genre=Shooter" },
      { label: "Racing", href: "/store?genre=Racing" },
      { label: "Sports", href: "/store?genre=Sports" },
      { label: "Indie", href: "/store?genre=Indie" },
    ],
  },
  Deals: {
    links: [
      { label: "Under €5", href: "/store?priceTo=5" },
      { label: "Under €10", href: "/store?priceTo=10" },
      { label: "Under €25", href: "/store?priceTo=25" },
      { label: "Best sellers", href: "/store?sortBy=updatedAt&sortType=desc" },
      { label: "Clearance", href: "/store?priceTo=3" },
    ],
  },
  "New Releases": {
    links: [
      { label: "Newest additions", href: "/store?sortBy=kinguinId&sortType=desc" },
      { label: "Recently updated", href: "/store?sortBy=updatedAt&sortType=desc" },
      { label: "Trending now", href: "/store?sortBy=updatedAt&sortType=desc" },
    ],
  },
  "Pre-orders": {
    links: [
      { label: "Open pre-orders", href: "/store?preorder=1" },
      { label: "Day-one keys", href: "/store?preorder=1&sortBy=kinguinId&sortType=desc" },
    ],
  },
  "Top Charts": {
    links: [
      { label: "Top sellers", href: "/store?sortBy=updatedAt&sortType=desc" },
      { label: "Newest additions", href: "/store?sortBy=kinguinId&sortType=desc" },
      { label: "Under €10", href: "/store?priceTo=10" },
    ],
  },
  "Gift Cards": {
    links: [
      { label: "Steam Gift Card", href: "/store?q=Steam Gift Card" },
      { label: "PlayStation Store", href: "/store?q=PlayStation Network Card" },
      { label: "Xbox", href: "/store?q=Xbox Gift Card" },
      { label: "Nintendo eShop", href: "/store?q=Nintendo eShop Card" },
      { label: "Netflix", href: "/store?q=Netflix Gift Card" },
      { label: "Roblox", href: "/store?q=Roblox Gift Card" },
      { label: "Uber", href: "/store?q=Uber" },
    ],
  },
};

export function Header() {
  const router = useRouter();
  const { count: cartCount } = useCart();
  const { currency, setCurrency, format } = useCurrency();
  const [user, setUser] = useState<MeUser>(null);
  const [scrolled, setScrolled] = useState(false);
  const [openTab, setOpenTab] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [acc, setAcc] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user))
      .catch(() => {});
  }, []);

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

  const submitSearch = () => {
    const q = query.trim();
    router.push(q ? `/store?q=${encodeURIComponent(q)}` : "/store");
    setSearchFocus(false);
  };

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
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                aria-label="Currency"
              >
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                  <option key={c} value={c}>
                    {CURRENCIES[c].label} {CURRENCIES[c].symbol}
                  </option>
                ))}
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
                onKeyDown={(e) => e.key === "Enter" && submitSearch()}
                placeholder="Search 12,000+ official keys…"
                aria-label="Search games"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
              />
              <kbd className="cc-tag hidden rounded border border-line px-1.5 py-0.5 text-[0.6rem] text-muted sm:inline">
                ⏎
              </kbd>
            </div>
          </div>

          {/* Right cluster */}
          <div className="ml-auto flex shrink-0 items-center gap-2">
            {user ? (
              <Link
                href="/account"
                className="cc-outline hidden items-center gap-2 rounded-lg bg-card py-1 pl-1 pr-3 text-sm hover:bg-band sm:flex"
                aria-label={`Account — ${user.firstName}`}
                title="My account"
              >
                <span
                  aria-hidden
                  className="grid h-8 w-8 place-items-center rounded-md bg-cobalt font-heading text-sm text-white"
                >
                  {user.firstName.charAt(0).toUpperCase()}
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="cc-tag text-[0.55rem] text-muted">Balance</span>
                  <span className="font-heading">{format(user.balance)}</span>
                </span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="cc-outline hidden rounded-lg bg-card px-3 py-1.5 text-sm hover:bg-band sm:block"
              >
                Sign in
              </Link>
            )}
            <Link href={user ? "/account" : "/login"} aria-label="Account" className="sm:hidden">
              <IconButton label="Account" glyph="☺" as="span" />
            </Link>
            <Link href="/cart" aria-label="Cart">
              <IconButton label="Cart" glyph="▦" count={cartCount} accent="red" as="span" />
            </Link>
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
              <div className="cc-outline-plate grid grid-cols-[1.5fr_1fr] gap-6 rounded-b-xl border-t-0 bg-card p-6">
                <div>
                  <p className="cc-tag mb-3 text-[0.65rem] text-muted">Browse {openTab}</p>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5">
                    {megaContent[openTab]?.links.map((l) => (
                      <li key={l.label}>
                        <Link
                          href={l.href}
                          onClick={() => setOpenTab(null)}
                          className="font-heading text-sm text-ink hover:text-cobalt"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/store"
                  className="cc-outline relative flex flex-col justify-between overflow-hidden rounded-lg bg-red-tint p-4"
                >
                  <div className="absolute -right-2 -top-3">
                    <StickerTag accent="sun">Shop</StickerTag>
                  </div>
                  <p className="cc-tag text-[0.65rem] text-red">Official keys</p>
                  <div>
                    <p className="font-heading text-base leading-tight">12,000+ instant keys</p>
                    <p className="mt-1 font-heading text-sm text-red">Browse the full store →</p>
                  </div>
                </Link>
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
                        <li key={l.label}>
                          <Link
                            href={l.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-1.5 text-sm text-muted"
                          >
                            {l.label}
                          </Link>
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
                <Link href={user ? "/account" : "/login"} aria-label="Account" onClick={() => setMobileOpen(false)}>
                  <IconButton label="Account" glyph="☺" as="span" />
                </Link>
                <Link href="/cart" aria-label="Cart" onClick={() => setMobileOpen(false)}>
                  <IconButton label="Cart" glyph="▦" count={cartCount} accent="red" as="span" />
                </Link>
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
  as = "button",
}: {
  label: string;
  glyph: string;
  count?: number;
  accent?: "red" | "grape";
  as?: "button" | "span";
}) {
  const Tag = as;
  return (
    <Tag
      {...(as === "button" ? { type: "button" as const } : {})}
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
    </Tag>
  );
}
