import { games } from "@/lib/data";
import { Section, SectionHead } from "@/components/ui/Section";
import { Rail } from "@/components/ui/Rail";
import { ProductCard } from "@/components/ui/ProductCard";
import { Countdown } from "@/components/ui/Countdown";
import { Reveal } from "@/components/ui/Reveal";

export function DealsShelf() {
  const deals = games.filter((g) => g.oldPrice);
  return (
    <Section id="deals">
      <SectionHead
        plate="⚡ Deals shelf"
        accent="red"
        title="Fresh markdowns on official keys — grab them before the timer runs out."
        action={<Countdown seconds={6 * 3600 + 42 * 60 + 18} />}
      />
      <Reveal>
        <Rail>
          {deals.map((g, i) => (
            <ProductCard key={g.id} game={g} index={i} />
          ))}
        </Rail>
      </Reveal>
    </Section>
  );
}
