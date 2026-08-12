"use client";

import { useState } from "react";
import { games } from "@/lib/data";
import { cn } from "@/lib/ui";
import { Section, SectionHead } from "@/components/ui/Section";
import { ProductCard } from "@/components/ui/ProductCard";

const tabs = [
  { key: "new", label: "New Releases", accent: "cobalt" as const },
  { key: "pre", label: "Pre-orders", accent: "grape" as const },
];

export function NewAndPreorders() {
  const [tab, setTab] = useState("new");
  const list =
    tab === "new"
      ? games.filter((g) => g.releaseYear >= 2025)
      : games.filter((g) => g.tag?.accent === "grape" || g.releaseYear >= 2026);

  return (
    <Section id="new">
      <SectionHead
        plate="On the shelf next"
        accent="cobalt"
        title="Just landed and coming soon — reserve your key early."
        action={
          <div
            role="tablist"
            aria-label="New releases and pre-orders"
            className="cc-outline inline-flex gap-1 rounded-xl bg-card p-1"
          >
            {tabs.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  "cc-tag rounded-lg px-3 py-1.5 text-[0.72rem] transition-colors",
                  tab === t.key
                    ? t.accent === "grape"
                      ? "bg-grape text-white"
                      : "bg-cobalt text-white"
                    : "text-ink hover:bg-band"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        }
      />
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {list.map((g, i) => (
          <ProductCard key={g.id} game={g} index={i} />
        ))}
      </div>
    </Section>
  );
}
