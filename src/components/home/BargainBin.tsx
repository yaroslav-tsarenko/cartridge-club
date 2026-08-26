import Link from "next/link";
import type { Product } from "@/lib/kinguin";
import { Section, SectionHead } from "@/components/ui/Section";
import { Price } from "@/components/ui/Price";
import { Starburst } from "@/components/ui/Sticker";
import { Reveal } from "@/components/ui/Reveal";

export function BargainBin({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <Section id="bargain">
      <SectionHead
        plate="Under €10 bin"
        accent="leaf"
        title="Dig through the crate — great little games that cost less than lunch."
      />
      <Reveal>
        <div className="relative rounded-card border-2 border-ink bg-band p-5 pt-8 [box-shadow:var(--shadow-plate)]">
          <span className="cc-tag absolute -top-4 left-6 -rotate-2 rounded-md bg-tangerine px-3 py-1.5 text-sm text-ink [box-shadow:var(--shadow-sticker)] [border:2px_solid_var(--color-ink)]">
            🗃 Bargain crate
          </span>
          <div className="absolute -right-3 -top-5">
            <Starburst accent="sun" size={70}>
              Cheap!
            </Starburst>
          </div>
          <div
            className="pointer-events-none absolute inset-0 rounded-card opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, var(--color-ink) 0 2px, transparent 2px 44px)",
            }}
            aria-hidden
          />
          <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-4">
            {products.map((p) => (
              <Link
                key={p.productId}
                href={`/product/${p.kinguinId}`}
                className="cc-outline group flex flex-col gap-2 rounded-card bg-card p-3 transition-transform hover:-translate-y-1 hover:-rotate-1"
              >
                {p.cover && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.cover}
                    alt={p.name}
                    loading="lazy"
                    className="cc-outline block aspect-[3/4] w-full rounded object-cover"
                  />
                )}
                <span className="block truncate font-heading text-sm">{p.name}</span>
                <span className="flex items-center justify-between">
                  <span className="cc-tag rounded bg-ink/85 px-1.5 py-0.5 text-[0.6rem] text-white">
                    {p.platform}
                  </span>
                  <Price amountEur={p.priceEur} className="font-heading text-base text-red" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
