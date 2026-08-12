import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    n: "01",
    glyph: "🛒",
    accent: "bg-red text-white",
    title: "Buy",
    body: "Pick your game and check out securely in seconds.",
  },
  {
    n: "02",
    glyph: "📧",
    accent: "bg-cobalt text-white",
    title: "Key lands instantly",
    body: "Your official key hits your inbox the moment payment clears.",
  },
  {
    n: "03",
    glyph: "🎮",
    accent: "bg-leaf text-ink",
    title: "Activate & play",
    body: "Redeem on your platform and jump straight into the game.",
  },
];

export function HowItWorks() {
  return (
    <Section band id="how">
      <SectionHead
        plate="How it works"
        accent="tangerine"
        title="Three steps from checkout to playing. No boxes to wait for."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 90}>
            <div className="cc-outline relative flex h-full flex-col gap-3 rounded-card bg-card p-6">
              <span className="absolute right-4 top-3 font-display text-5xl text-ink/10">
                {s.n}
              </span>
              <span
                className={`grid h-14 w-14 place-items-center rounded-xl border-2 border-ink text-2xl [box-shadow:var(--shadow-sticker)] ${s.accent}`}
                aria-hidden
              >
                {s.glyph}
              </span>
              <h3 className="font-heading text-lg">{s.title}</h3>
              <p className="text-sm text-muted">{s.body}</p>
              {i < steps.length - 1 && (
                <span
                  className="cc-tag absolute -right-3 top-1/2 hidden -translate-y-1/2 text-2xl text-ink/30 md:block"
                  aria-hidden
                >
                  →
                </span>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
