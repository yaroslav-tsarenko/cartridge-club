"use client";

import { useEffect, useState } from "react";
import { games, platforms } from "@/lib/data";
import { cn, formatPrice } from "@/lib/ui";
import { Button } from "@/components/ui/Button";
import { GameCover } from "@/components/ui/GameCover";
import { PlatformChip } from "@/components/ui/PlatformChip";
import { Starburst, StickerTag } from "@/components/ui/Sticker";

const slides = [games[3], games[0], games[6]];

const spotlights = [
  { label: "Deal of the day", accent: "sun" as const, game: games[5] },
  { label: "New release", accent: "cobalt" as const, game: games[3] },
  { label: "Pre-order", accent: "grape" as const, game: games[6] },
];

export function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const game = slides[i];
  const discounted = game.oldPrice && game.oldPrice > game.price;
  const pct = discounted
    ? Math.round((1 - game.price / (game.oldPrice as number)) * 100)
    : 0;

  return (
    <section
      className="bg-bg"
      aria-label="Featured games"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-16 lg:px-8">
        {/* Copy */}
        <div className="order-2 lg:order-1">
          <span className="cc-tag inline-flex items-center gap-2 rounded-md bg-sun px-2.5 py-1 text-[0.7rem] text-ink [box-shadow:var(--shadow-sticker)] [border:2px_solid_var(--color-ink)]">
            ★ New season · fresh drops weekly
          </span>
          <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Great games.
            <br />
            <span className="text-red">Real keys.</span>
            <br />
            <span className="text-cobalt">Instant joy.</span>
          </h1>
          <p className="mt-5 max-w-md text-base text-muted md:text-lg">
            Official keys for Steam, Epic, Xbox, PlayStation and Nintendo — delivered to your
            inbox the moment you buy. Buying a game here feels like an event.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button as="a" href="#deals" variant="primary" size="lg">
              Grab the key
            </Button>
            <Button as="a" href="#how" variant="ghost" size="lg" className="!shadow-none border-cobalt">
              How it works →
            </Button>
          </div>

          <p className="cc-tag mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.72rem] text-muted">
            <span>⚡ Instant email delivery</span>
            <span>✓ Official distributors</span>
            <span>🔒 Secure payment</span>
            <span className="text-leaf">★ Rated 4.9</span>
          </p>
        </div>

        {/* Boxed edition display */}
        <div className="relative order-1 mx-auto w-full max-w-sm lg:order-2">
          <div className="relative">
            {/* back shelf glow plate */}
            <div
              className="absolute inset-0 -z-0 translate-x-4 translate-y-6 rotate-3 rounded-2xl bg-cobalt-tint"
              aria-hidden
            />
            <div className="cc-outline-plate relative rotate-[-4deg] rounded-2xl bg-card p-3 transition-transform duration-500">
              <GameCover game={game} rounded="rounded-xl" />
              <div className="absolute -left-4 -top-4">
                {discounted ? (
                  <Starburst accent="sun" size={82}>
                    -{pct}%
                  </Starburst>
                ) : (
                  <StickerTag accent="grape" className="text-sm">
                    Pre-order
                  </StickerTag>
                )}
              </div>
              <div className="absolute -right-3 top-6">
                <PlatformChip platform={game.platform} />
              </div>
              <div className="mt-3 flex items-center justify-between px-1 pb-1">
                <div>
                  <p className="font-heading text-lg leading-tight">{game.title}</p>
                  <p className="cc-tag text-[0.66rem] text-muted">{game.genres.join(" · ")}</p>
                </div>
                <p className="font-heading text-2xl text-red">{formatPrice(game.price)}</p>
              </div>
            </div>
          </div>

          {/* slide controls */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {slides.map((s, n) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setI(n)}
                aria-label={`Show ${s.title}`}
                aria-current={n === i}
                className={cn(
                  "h-2.5 rounded-full border-2 border-ink transition-all",
                  n === i ? "w-7 bg-red" : "w-2.5 bg-card"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Spotlight mini box-fronts */}
      <div className="mx-auto grid max-w-7xl gap-4 px-4 pb-8 sm:grid-cols-3 sm:px-6 lg:px-8">
        {spotlights.map((s) => (
          <a
            key={s.label}
            href="#deals"
            className="cc-outline group flex items-center gap-3 rounded-card bg-card p-3 transition-transform hover:-translate-y-0.5"
          >
            <span
              className="cc-outline block h-16 w-12 shrink-0 rounded"
              style={{ background: s.game.cover.hue }}
              aria-hidden
            />
            <span className="min-w-0">
              <StickerTag accent={s.accent} className="!text-[0.58rem]" rotate={false}>
                {s.label}
              </StickerTag>
              <span className="mt-1 block truncate font-heading text-sm">{s.game.title}</span>
              <span className="font-heading text-sm text-red">
                {formatPrice(s.game.price)}
              </span>
            </span>
          </a>
        ))}
      </div>

      {/* Platform quick-rail + trust ribbon */}
      <div className="border-y-2 border-ink bg-band">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 px-4 py-3 sm:px-6 lg:justify-between lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="cc-tag text-[0.68rem] text-muted">Shop by platform:</span>
            {platforms.map((p) => (
              <PlatformChip key={p.name} platform={p.name} />
            ))}
          </div>
          <div className="cc-tag flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.68rem]">
            <span>⚡ Instant delivery</span>
            <span className="text-cobalt">✓ Official distributors</span>
            <span>🔒 Secure payment</span>
            <span className="text-leaf">★ 4.9 average</span>
          </div>
        </div>
      </div>
    </section>
  );
}
