"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/kinguin";
import { cn } from "@/lib/ui";
import { Section, SectionHead } from "@/components/ui/Section";
import { StoreCard } from "@/components/store/StoreCard";

export function GenreExplorer({ products }: { products: Product[] }) {
  const [active, setActive] = useState<string>("All");

  const chips = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) {
      for (const g of p.genres) counts.set(g, (counts.get(g) ?? 0) + 1);
    }
    const top = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([g]) => g);
    return ["All", ...top];
  }, [products]);

  const filtered =
    active === "All" ? products : products.filter((p) => p.genres.includes(active));

  if (products.length === 0) return null;

  return (
    <Section band id="genres">
      <SectionHead
        plate="Genre explorer"
        accent="grape"
        title="Tap a label to filter the shelf. Everything updates instantly."
      />
      <div className="mb-7 flex flex-wrap gap-2">
        {chips.map((c) => {
          const isActive = active === c;
          return (
            <button
              key={c}
              onClick={() => setActive(c)}
              aria-pressed={isActive}
              className={cn(
                "cc-tag cc-stamp rounded-lg px-3 py-1.5 text-[0.74rem] transition-all",
                isActive
                  ? "cc-outline -rotate-1 bg-grape text-white"
                  : "border-2 border-line bg-card text-ink hover:bg-bg"
              )}
            >
              {c}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {filtered.length ? (
          filtered.map((p) => <StoreCard key={p.productId} product={p} />)
        ) : (
          <p className="col-span-full py-10 text-center text-muted">
            No keys in this genre yet — check back soon.
          </p>
        )}
      </div>
    </Section>
  );
}
