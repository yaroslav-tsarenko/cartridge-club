import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

// Neutral, verifiable facts — the store is new, so no sales counts or ratings.
const facts = [
  { value: "100%", label: "Official keys" },
  { value: "Instant", label: "Email delivery" },
  { value: "PCI DSS", label: "Secure checkout" },
  { value: "24/7", label: "Customer support" },
];

export function Testimonials() {
  return (
    <Section band id="reviews">
      <SectionHead
        plate="Why buy here"
        accent="red"
        title="Real keys, instant delivery, honest prices."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {facts.map((f) => (
          <Reveal key={f.label}>
            <div className="cc-outline rounded-card bg-card p-5 text-center">
              <p className="font-display text-3xl leading-none text-red sm:text-4xl">
                {f.value}
              </p>
              <p className="cc-tag mt-2 text-[0.66rem] text-muted">{f.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
