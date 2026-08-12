"use client";

import { useState } from "react";
import { cn } from "@/lib/ui";
import { Section, SectionHead } from "@/components/ui/Section";

const faqs = [
  {
    q: "How fast will I get my key?",
    a: "Almost always instantly. The moment your payment clears, your official key is emailed to you and saved to your account — typically within 60 seconds.",
  },
  {
    q: "Are these keys official and legit?",
    a: "Yes. Every key is sourced from authorised distributors and publishers. We're an independent retailer, not a grey-market reseller.",
  },
  {
    q: "Which platforms do you support?",
    a: "Steam, Epic Games, Xbox, PlayStation and Nintendo. Each product page shows exactly where the key activates and any region restrictions.",
  },
  {
    q: "Can I get a refund?",
    a: "If a key hasn't been revealed or activated, you can request a refund from your orders page. Activated keys can't be refunded, in line with digital goods policy.",
  },
  {
    q: "What is the collection wishlist?",
    a: "Tap the bookshelf icon on any game to add it to your collection. It's your personal shelf — track prices and buy when you're ready.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq">
      <SectionHead
        plate="Questions?"
        accent="grape"
        title="Everything you need to know before you grab a key."
      />
      <div className="mx-auto max-w-3xl">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="border-b-2 border-dashed border-line">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <span className="font-heading text-base md:text-lg">{f.q}</span>
                  <span
                    className={cn(
                      "cc-outline grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-card text-lg transition-transform",
                      isOpen && "rotate-45 bg-red text-white"
                    )}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
              </h3>
              <div
                className={cn(
                  "grid transition-all duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <p className="overflow-hidden text-sm leading-relaxed text-muted">{f.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
