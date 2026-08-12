import { bargainBin } from "@/lib/data";
import { formatPrice } from "@/lib/ui";
import { Section, SectionHead } from "@/components/ui/Section";
import { PlatformChip } from "@/components/ui/PlatformChip";
import { Starburst } from "@/components/ui/Sticker";
import { Reveal } from "@/components/ui/Reveal";

export function BargainBin() {
  return (
    <Section id="bargain">
      <SectionHead
        plate="Under €10 bin"
        accent="leaf"
        title="Dig through the crate — great little games that cost less than lunch."
      />
      <Reveal>
        {/* crate / box illustration */}
        <div className="relative rounded-card border-2 border-ink bg-band p-5 pt-8 [box-shadow:var(--shadow-plate)]">
          <span className="cc-tag absolute -top-4 left-6 -rotate-2 rounded-md bg-tangerine px-3 py-1.5 text-sm text-ink [box-shadow:var(--shadow-sticker)] [border:2px_solid_var(--color-ink)]">
            🗃 Bargain crate
          </span>
          <div className="absolute -right-3 -top-5">
            <Starburst accent="sun" size={70}>
              Cheap!
            </Starburst>
          </div>
          {/* crate slats */}
          <div
            className="pointer-events-none absolute inset-0 rounded-card opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, var(--color-ink) 0 2px, transparent 2px 44px)",
            }}
            aria-hidden
          />
          <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-4">
            {bargainBin.map((g) => (
              <a
                key={g.id}
                href="#"
                className="cc-outline group flex flex-col gap-2 rounded-card bg-card p-3 transition-transform hover:-translate-y-1 hover:-rotate-1"
              >
                <span
                  className="cc-outline block aspect-[3/4] rounded"
                  style={{ background: g.cover.hue }}
                  aria-hidden
                />
                <span className="block truncate font-heading text-sm">{g.title}</span>
                <span className="flex items-center justify-between">
                  <PlatformChip platform={g.platform} size="sm" />
                  <span className="font-heading text-base text-red">
                    {formatPrice(g.price)}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
