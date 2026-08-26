import type { Product } from "@/lib/kinguin";
import { Section, SectionHead } from "@/components/ui/Section";
import { Rail } from "@/components/ui/Rail";
import { StoreCard } from "@/components/store/StoreCard";
import { Countdown } from "@/components/ui/Countdown";
import { Reveal } from "@/components/ui/Reveal";

export function DealsShelf({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
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
          {products.map((p) => (
            <StoreCard key={p.productId} product={p} />
          ))}
        </Rail>
      </Reveal>
    </Section>
  );
}
