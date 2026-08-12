"use client";

import { useState } from "react";
import { games, genres } from "@/lib/data";
import { accentSurface, cn } from "@/lib/ui";
import { Section, SectionHead } from "@/components/ui/Section";
import { ProductCard } from "@/components/ui/ProductCard";

export function GenreExplorer() {
  const [active, setActive] = useState<string>("All");
  const chips = ["All", ...genres.map((g) => g.name)];
  const filtered =
    active === "All"
      ? games
      : games.filter((g) => g.genres.includes(active));

  return (
    <Section band id="genres">
      <SectionHead
        plate="Genre explorer"
        accent="grape"
        title="Tap a cartridge label to filter the shelf. Everything updates instantly."
      />
      <div className="mb-7 flex flex-wrap gap-2">
        {chips.map((c) => {
          const accent = genres.find((g) => g.name === c)?.accent ?? "cobalt";
          const isActive = active === c;
          return (
            <button
              key={c}
              onClick={() => setActive(c)}
              aria-pressed={isActive}
              className={cn(
                "cc-tag cc-stamp rounded-lg px-3 py-1.5 text-[0.74rem] transition-all",
                isActive
                  ? cn("cc-outline -rotate-1", accentSurface[accent])
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
          filtered.map((g, i) => <ProductCard key={g.id} game={g} index={i} />)
        ) : (
          <p className="col-span-full py-10 text-center text-muted">
            No keys in this genre yet — check back soon.
          </p>
        )}
      </div>
    </Section>
  );
}
