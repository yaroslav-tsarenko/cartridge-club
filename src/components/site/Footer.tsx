"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/ui";
import { Barcode } from "@/components/ui/Barcode";
import { Button } from "@/components/ui/Button";
import { PaymentLogos } from "./PaymentLogos";
import { Logo } from "./Logo";

const EMAIL = "info@cartridge-club.com";

type FooterLink = { label: string; href: string };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All games", href: "/store" },
      { label: "Deals", href: "/store?priceTo=10" },
      { label: "New releases", href: "/store?sortBy=kinguinId&sortType=desc" },
      { label: "Pre-orders", href: "/store?preorder=1" },
      { label: "Gift cards", href: "/store?q=Gift Card" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help & contact", href: `mailto:${EMAIL}` },
      { label: "Refund policy", href: "/refund-policy" },
      { label: "Terms & conditions", href: "/terms" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Cookie policy", href: "/cookies" },
      { label: "Refund policy", href: "/refund-policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-8">
      {/* (1) Top band — Join the club membership card */}
      <div className="bg-band">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="flex flex-col gap-3">
            <Logo />
            <p className="max-w-md text-sm text-muted">
              A modern collector&apos;s store for official game keys. Real keys, instant
              email delivery, and a shelf that feels like the good old days.
            </p>
            <p className="text-sm text-muted">
              Questions?{" "}
              <a className="text-cobalt hover:underline" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </p>
            <p className="cc-tag text-[0.7rem] text-muted">EST. 2026 · Collector-approved</p>
          </div>

          <div className="cc-outline-plate relative overflow-hidden rounded-card bg-card p-5">
            <span className="cc-tag absolute -right-3 -top-3 rotate-3 rounded-md bg-sun px-2 py-1 text-[0.6rem] text-ink [box-shadow:var(--shadow-sticker)]">
              Members save more
            </span>
            <p className="font-heading text-lg">Join the club</p>
            <p className="mb-3 mt-1 text-sm text-muted">
              Deals, new drops and pre-order alerts — straight to your inbox.
            </p>
            <form
              className="flex flex-col gap-2 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                aria-label="Email address"
                placeholder="you@email.com"
                className="cc-outline flex-1 rounded-xl bg-bg px-3 py-2.5 text-sm outline-none placeholder:text-muted"
              />
              <Button type="submit" variant="primary">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      <hr className="cc-cutline" />

      {/* (2) Grouped columns on ink-navy */}
      <div className="bg-ink text-invert">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-2 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          <div className="hidden md:block">
            <p className="font-display text-2xl leading-tight">
              GREAT GAMES.
              <br />
              <span className="text-sun">REAL KEYS.</span>
            </p>
            <p className="mt-3 max-w-[16rem] text-sm opacity-70">
              Buying a game here feels like an event — like it used to.
            </p>
          </div>

          {columns.map((col) => (
            <FooterColumn key={col.title} title={col.title} links={col.links} />
          ))}
        </div>

        {/* (3) Trust row */}
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <PaymentLogos height={26} />
              <span className="cc-tag inline-flex items-center gap-1 rounded-md bg-leaf px-2 py-1 text-[0.62rem] text-ink">
                🔒 PCI DSS secure checkout
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="cc-tag text-[0.66rem] opacity-70">Official distributor · Merchant of Record: ALDERROCK LTD</span>
            </div>

            <Barcode className="text-invert opacity-80" />
          </div>
        </div>

        {/* (4) Bottom legal bar */}
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-[0.72rem] opacity-70 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <p>
              © 2026 Cartridge Club — operated by ALDERROCK LTD · Company No. 17381132 · Dept 6984, 196
              High Road, Wood Green, London, N22 8HH, United Kingdom
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <Link href="/privacy" className="hover:underline">Privacy</Link>
              <Link href="/terms" className="hover:underline">Terms</Link>
              <Link href="/cookies" className="hover:underline">Cookies</Link>
              <Link href="/refund-policy" className="hover:underline">Refund Policy</Link>
            </div>
          </div>
          <p className="mx-auto max-w-7xl px-4 pb-6 text-[0.66rem] opacity-45 sm:px-6 lg:px-8">
            Steam, Epic Games, Xbox, PlayStation and Nintendo are trademarks of their
            respective owners. Cartridge Club is an independent retailer and is not affiliated
            with or endorsed by these companies.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 py-2 md:border-0 md:py-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-2 md:pointer-events-none md:py-0"
      >
        <span className="cc-tag text-sm text-sun">{title}</span>
        <span aria-hidden className="text-invert md:hidden">
          {open ? "–" : "+"}
        </span>
      </button>
      <ul className={cn("space-y-2 pb-2 pt-1 md:!block md:pt-3", open ? "block" : "hidden")}>
        {links.map((l) => (
          <li key={l.label}>
            {l.href.startsWith("mailto:") ? (
              <a href={l.href} className="text-sm opacity-80 hover:text-sun hover:opacity-100">
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className="text-sm opacity-80 hover:text-sun hover:opacity-100">
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
