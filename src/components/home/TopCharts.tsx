import Link from "next/link";
import type { Product } from "@/lib/kinguin";
import { Section, SectionHead } from "@/components/ui/Section";
import { Price } from "@/components/ui/Price";
import { Reveal } from "@/components/ui/Reveal";

export function TopCharts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <Section band id="charts">
      <SectionHead
        plate="Top charts"
        accent="tangerine"
        title="This week's most-loved keys, ranked by collectors like you."
      />
      <ol className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {products.map((p, i) => (
          <Reveal as="li" key={p.productId} delay={i * 40}>
            <Link
              href={`/product/${p.kinguinId}`}
              className="cc-outline group flex items-center gap-4 rounded-card bg-card p-3 transition-transform hover:-translate-y-0.5"
            >
              <span className="font-display text-4xl leading-none text-ink/15 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              {p.cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.cover}
                  alt={p.name}
                  loading="lazy"
                  className="cc-outline block h-16 w-12 shrink-0 rounded object-cover"
                />
              )}
              <span className="min-w-0 flex-1">
                <span className="block truncate font-heading text-sm">{p.name}</span>
                <span className="mt-1 flex items-center gap-2">
                  <span className="cc-tag rounded bg-ink/85 px-1.5 py-0.5 text-[0.6rem] text-white">
                    {p.platform}
                  </span>
                  {p.metacriticScore && (
                    <span className="cc-tag text-[0.62rem] text-leaf">★ {p.metacriticScore}</span>
                  )}
                </span>
              </span>
              <Price amountEur={p.priceEur} className="font-heading text-base text-red" />
            </Link>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
