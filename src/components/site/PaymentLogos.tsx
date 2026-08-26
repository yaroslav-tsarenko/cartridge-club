import { cn } from "@/lib/ui";

// Colour payment marks (Visa, Mastercard, PCI DSS) used at checkout and footer.
export function PaymentLogos({ className, height = 28 }: { className?: string; height?: number }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {[
        { src: "/pay/visa.svg", alt: "Visa" },
        { src: "/pay/mastercard.svg", alt: "Mastercard" },
        { src: "/pay/pci-dss.svg", alt: "PCI DSS compliant" },
      ].map((p) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={p.alt}
          src={p.src}
          alt={p.alt}
          height={height}
          style={{ height }}
          className="w-auto rounded bg-white p-1 shadow-[0_1px_0_0_rgba(0,0,0,0.15)]"
        />
      ))}
    </div>
  );
}
