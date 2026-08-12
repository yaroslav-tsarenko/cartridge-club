"use client";

import { useState } from "react";
import type { Game } from "@/lib/data";
import { cn, formatPrice } from "@/lib/ui";
import { GameCover } from "./GameCover";
import { PlatformChip } from "./PlatformChip";
import { Rating } from "./Rating";
import { Starburst, StickerTag } from "./Sticker";

/** The one unified product card. Paper-white, 2px ink outline, stamp-press add-to-cart. */
export function ProductCard({ game, index = 0 }: { game: Game; index?: number }) {
  const [owned, setOwned] = useState(false);
  const [wished, setWished] = useState(false);
  const discounted = game.oldPrice && game.oldPrice > game.price;
  const pct = discounted
    ? Math.round((1 - game.price / (game.oldPrice as number)) * 100)
    : 0;

  return (
    <article
      className={cn(
        "cc-outline group relative flex flex-col rounded-card bg-card p-3",
        "transition-[transform,box-shadow] duration-200 ease-out",
        "hover:-translate-y-[3px] hover:shadow-lift hover:[border-width:3px]"
      )}
    >
      {/* Cover with placed stickers */}
      <div className="relative">
        <GameCover game={game} />

        <div className="absolute left-2 top-2">
          <PlatformChip platform={game.platform} size="sm" />
        </div>

        {discounted && (
          <div className="absolute -right-2 -top-3">
            <Starburst accent="sun" size={58}>
              -{pct}%
            </Starburst>
          </div>
        )}

        {!discounted && game.tag && (
          <div className="absolute -right-1 top-2">
            <StickerTag accent={game.tag.accent}>{game.tag.label}</StickerTag>
          </div>
        )}

        <div className="absolute -bottom-3 right-2">
          <Rating value={game.rating} size={42} />
        </div>

        {/* Wishlist — add to collection (bookshelf) */}
        <button
          type="button"
          onClick={() => setWished((w) => !w)}
          aria-pressed={wished}
          aria-label={wished ? "Remove from collection" : "Add to collection"}
          className={cn(
            "cc-stamp cc-outline absolute left-2 bottom-2 grid h-9 w-9 place-items-center rounded-lg text-lg",
            wished ? "bg-grape text-white" : "bg-card text-ink"
          )}
        >
          <span aria-hidden>{wished ? "▣" : "▤"}</span>
        </button>

        {/* OWNED stamp overlay */}
        {owned && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <span
              className="cc-tag rounded-lg border-[3px] border-red px-4 py-2 text-2xl text-red"
              style={{
                background: "rgba(255,252,245,0.72)",
                animation: "stamp-owned 0.5s var(--ease-back) both",
              }}
            >
              OWNED ✓
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="mt-5 flex flex-1 flex-col">
        <h3 className="font-heading text-[1.05rem] leading-tight tracking-tight">
          {game.title}
        </h3>

        <div className="mt-1.5 flex flex-wrap gap-1">
          {game.genres.map((g) => (
            <span
              key={g}
              className="cc-tag rounded border border-line px-1.5 py-0.5 text-[0.6rem] text-muted"
            >
              {g}
            </span>
          ))}
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {game.instant && (
            <span className="cc-tag inline-flex items-center gap-1 rounded-md bg-leaf px-1.5 py-0.5 text-[0.6rem] text-ink">
              ⚡ Instant
            </span>
          )}
          <span className="cc-tag rounded-md border border-line bg-chip px-1.5 py-0.5 text-[0.6rem] text-chip-ink">
            {game.region}
          </span>
        </div>

        {/* Price + add */}
        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div className="leading-none">
            {discounted && (
              <div className="cc-tag text-[0.72rem] text-muted line-through">
                {formatPrice(game.oldPrice as number)}
              </div>
            )}
            <div className="font-heading text-xl tracking-tight text-ink">
              {formatPrice(game.price)}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setOwned(true);
              window.setTimeout(() => setOwned(false), 1400);
            }}
            className="cc-stamp cc-outline inline-flex items-center gap-1.5 rounded-xl bg-red px-3 py-2 font-heading text-sm text-white hover:brightness-105"
            aria-label={`Add ${game.title} to cart`}
          >
            <span aria-hidden>＋</span> Add
          </button>
        </div>
      </div>
    </article>
  );
}
