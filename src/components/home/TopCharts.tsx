import { games } from "@/lib/data";
import { formatPrice } from "@/lib/ui";
import { Section, SectionHead } from "@/components/ui/Section";
import { PlatformChip } from "@/components/ui/PlatformChip";
import { Reveal } from "@/components/ui/Reveal";

export function TopCharts() {
  const chart = [...games].sort((a, b) => b.rating - a.rating).slice(0, 10);
  return (
    <Section band id="charts">
      <SectionHead
        plate="Top charts"
        accent="tangerine"
        title="This week's most-loved keys, ranked by collectors like you."
      />
      <ol className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {chart.map((g, i) => (
          <Reveal as="li" key={g.id} delay={i * 40}>
            <a
              href="#"
              className="cc-outline group flex items-center gap-4 rounded-card bg-card p-3 transition-transform hover:-translate-y-0.5"
            >
              <span className="font-display text-4xl leading-none text-ink/15 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="cc-outline block h-16 w-12 shrink-0 rounded"
                style={{ background: g.cover.hue }}
                aria-hidden
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-heading text-sm">{g.title}</span>
                <span className="mt-1 flex items-center gap-2">
                  <PlatformChip platform={g.platform} size="sm" />
                  <span className="cc-tag text-[0.62rem] text-leaf">★ {g.rating}</span>
                </span>
              </span>
              <span className="font-heading text-base text-red">{formatPrice(g.price)}</span>
            </a>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
