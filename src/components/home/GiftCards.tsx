import { Section } from "@/components/ui/Section";
import { LabelPlate } from "@/components/ui/LabelPlate";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const cards = [
  { store: "Steam", accent: "#2B5CE6", value: "€50" },
  { store: "PlayStation", accent: "#7A4FD0", value: "€25" },
  { store: "Nintendo", accent: "#E5484D", value: "€35" },
];

export function GiftCards() {
  return (
    <Section id="giftcards">
      <div className="cc-outline-plate grid items-center gap-8 overflow-hidden rounded-card bg-sun/90 p-8 lg:grid-cols-2">
        <div>
          <LabelPlate accent="grape">🎁 Gift cards</LabelPlate>
          <h3 className="mt-4 font-display text-4xl leading-none text-ink sm:text-5xl">
            Give the gift of
            <br />
            <span className="text-red">instant joy.</span>
          </h3>
          <p className="mt-4 max-w-md text-ink/80">
            Digital gift cards for every store, delivered by email in seconds. No plastic, no
            waiting — just pick a value and send the fun.
          </p>
          <div className="mt-6">
            <Button as="a" href="/store?q=Gift Card" variant="primary" size="lg">
              Shop gift cards
            </Button>
          </div>
        </div>

        <div className="relative h-56 sm:h-64">
          {cards.map((c, i) => (
            <Reveal
              key={c.store}
              delay={i * 90}
              className="absolute left-1/2 top-1/2"
            >
              <div
                className="cc-outline flex h-36 w-60 -translate-x-1/2 -translate-y-1/2 flex-col justify-between rounded-xl p-4 text-white"
                style={{
                  background: c.accent,
                  transform: `translate(-50%,-50%) rotate(${(i - 1) * 8}deg) translateX(${
                    (i - 1) * 42
                  }px)`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="cc-tag text-[0.7rem] opacity-90">Cartridge Club</span>
                  <span className="cc-tag rounded bg-white/20 px-1.5 py-0.5 text-[0.6rem]">
                    GIFT
                  </span>
                </div>
                <div>
                  <p className="font-heading text-lg">{c.store}</p>
                  <p className="font-display text-3xl leading-none">{c.value}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
