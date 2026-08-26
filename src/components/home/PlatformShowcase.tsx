import { games, platforms } from "@/lib/data";
import { cn, platformGlyph } from "@/lib/ui";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const accents = ["cobalt", "grape", "leaf", "tangerine", "red"] as const;

export function PlatformShowcase() {
  return (
    <Section band id="platforms">
      <SectionHead
        plate="Every platform"
        accent="cobalt"
        title="One shelf, every store. Pick your platform and start collecting."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {platforms.map((p, i) => {
          const count = games.filter((g) => g.platform === p.name).length;
          const accent = accents[i % accents.length];
          return (
            <Reveal key={p.name} delay={i * 50}>
              <a
                href={`/store?platform=${encodeURIComponent(p.name)}`}
                className="cc-outline group flex h-full flex-col items-center gap-2 rounded-card bg-card p-5 text-center transition-transform hover:-translate-y-1"
              >
                <span
                  className={cn(
                    "grid h-14 w-14 place-items-center rounded-xl border-2 border-ink text-2xl [box-shadow:var(--shadow-sticker)]",
                    `bg-${accent}`,
                    accent === "leaf" || accent === "tangerine" ? "text-ink" : "text-white"
                  )}
                  aria-hidden
                >
                  {platformGlyph[p.name]}
                </span>
                <span className="font-heading text-base">{p.name}</span>
                <span className="cc-tag text-[0.64rem] text-muted">{count}+ keys</span>
              </a>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
