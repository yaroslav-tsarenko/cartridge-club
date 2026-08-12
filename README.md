# cartridge-club

**Cartridge Club** — the joy of 90s game boxes, rebuilt as a modern collector's store for digital game keys.

A light-first, sticker-driven e-commerce UI built with **Next.js 15 (App Router)** and **Tailwind CSS v4**, using a fully centralized design-token system (no ad-hoc colors, no magic numbers).

## Highlights

- **Design tokens** — semantic CSS variables with a light "paper" theme (primary) and a full dark "midnight shelf" variant, exposed to Tailwind via `@theme`.
- **Ownable motifs** — die-cut SVG starburst stickers, 2px ink outlines with hard offset shadows, label plates, box-spine shelf rails, fake barcode, and an "OWNED" purchase stamp.
- **Feature-rich header** — promo marquee, instant search, mega panels, sticky condensing, and a mobile slide-in drawer.
- **Full homepage** — hero shelf, deals rail with countdown, top charts, new/pre-orders tabs, live genre explorer, bargain crate, platform showcase, gift cards, how-it-works, benefits, testimonials with count-ups, and an FAQ.
- **Accessible & responsive** — WCAG AA color pairings, focus-visible rings, ARIA on menus/tabs/accordions, `prefers-reduced-motion` support, and swipeable rails on mobile.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build
