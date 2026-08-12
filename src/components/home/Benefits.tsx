import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const benefits = [
  { glyph: "⚡", accent: "bg-sun text-ink", title: "Instant delivery", body: "Keys by email in seconds, day or night." },
  { glyph: "✓", accent: "bg-leaf text-ink", title: "Official distributors", body: "Sourced only from authorised partners." },
  { glyph: "🔒", accent: "bg-cobalt text-white", title: "Secure payment", body: "Encrypted checkout with buyer protection." },
  { glyph: "↩", accent: "bg-grape text-white", title: "Easy refunds", body: "Not activated? Get your money back, simply." },
  { glyph: "▤", accent: "bg-tangerine text-ink", title: "Collection wishlist", body: "Save games to your shelf and buy later." },
  { glyph: "★", accent: "bg-red text-white", title: "Collector-approved", body: "Rated 4.9 by thousands of players." },
];

export function Benefits() {
  return (
    <Section id="benefits">
      <SectionHead
        plate="Why the club"
        accent="leaf"
        title="Everything you'd want from a store run by people who collect games themselves."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b, i) => (
          <Reveal key={b.title} delay={i * 60}>
            <div className="cc-outline flex h-full items-start gap-3 rounded-card bg-card p-5 transition-transform hover:-translate-y-0.5">
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 border-ink text-lg [box-shadow:var(--shadow-sticker)] ${b.accent}`}
                aria-hidden
              >
                {b.glyph}
              </span>
              <span>
                <span className="block font-heading text-base">{b.title}</span>
                <span className="mt-0.5 block text-sm text-muted">{b.body}</span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
