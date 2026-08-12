import { Section, SectionHead } from "@/components/ui/Section";
import { CountUp } from "@/components/ui/CountUp";
import { StickerCircle } from "@/components/ui/Sticker";
import { Reveal } from "@/components/ui/Reveal";

const quotes = [
  {
    name: "Mara V.",
    accent: "sun" as const,
    text: "Key landed before I'd even closed the tab. Felt exactly like ripping open a new box as a kid.",
  },
  {
    name: "Deniz K.",
    accent: "leaf" as const,
    text: "The sticker vibe is unreal and the prices are the best I've found. My go-to shop now.",
  },
  {
    name: "Jonas P.",
    accent: "cobalt" as const,
    text: "Bought a pre-order, got the key on release morning. Zero fuss, totally trustworthy.",
  },
];

const stats = [
  { to: 480000, suffix: "+", label: "Keys delivered" },
  { to: 4.9, decimals: 1, suffix: "/5", label: "Average rating" },
  { to: 12000, suffix: "+", label: "Titles on the shelf" },
  { to: 60, suffix: "s", label: "Avg. delivery time" },
];

export function Testimonials() {
  return (
    <Section band id="reviews">
      <SectionHead
        plate="Collector love"
        accent="red"
        title="Thousands of players, one very happy shelf."
      />

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Reveal key={s.label}>
            <div className="cc-outline rounded-card bg-card p-5 text-center">
              <p className="font-display text-3xl leading-none text-red sm:text-4xl">
                <CountUp to={s.to} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </p>
              <p className="cc-tag mt-2 text-[0.66rem] text-muted">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {quotes.map((q, i) => (
          <Reveal key={q.name} delay={i * 80}>
            <figure className="cc-outline flex h-full flex-col gap-3 rounded-card bg-card p-5">
              <span className="cc-tag text-sun">★★★★★</span>
              <blockquote className="flex-1 text-sm leading-relaxed">
                &ldquo;{q.text}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-2">
                <StickerCircle accent={q.accent} size={34}>
                  <span className="font-heading text-xs">{q.name[0]}</span>
                </StickerCircle>
                <span className="font-heading text-sm">{q.name}</span>
                <span className="cc-tag ml-auto text-[0.6rem] text-leaf">✓ Verified</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
