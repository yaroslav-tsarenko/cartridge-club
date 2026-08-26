import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export function LegalPage({
  title,
  updated = "August 2026",
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl">{title}</h1>
        <p className="cc-tag mt-2 text-[0.7rem] text-muted">Last updated · {updated}</p>
        <div className="cc-legal mt-8 space-y-5 text-sm leading-relaxed text-ink/90">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}

export function LegalHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-heading text-lg text-ink">{children}</h2>;
}
