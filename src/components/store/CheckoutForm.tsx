"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { PaymentLogos } from "@/components/site/PaymentLogos";
import { useCart } from "@/components/providers/CartProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";

export function CheckoutForm({
  balance,
  customer,
}: {
  balance: number; // EUR
  customer: { name: string; email: string; address: string };
}) {
  const { items, totalEur, clear } = useCart();
  const { currency, format } = useCurrency();
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const insufficient = balance < totalEur - 1e-6;

  async function pay() {
    setError(null);
    if (items.length === 0) return setError("Your cart is empty.");
    if (!accepted) return setError("Please accept the terms to continue.");
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            kinguinId: i.kinguinId,
            name: i.name,
            qty: i.qty,
            priceEur: i.priceEur,
          })),
          currency,
          acceptedTerms: accepted,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      clear();
      router.push(`/account/orders/${data.orderId}?new=1`);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed");
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
      {/* Left: summary + seller */}
      <div className="space-y-4">
        <div className="cc-outline-plate rounded-card bg-card p-5">
          <h2 className="font-heading text-lg">Order summary</h2>
          <div className="mt-3 divide-y divide-line">
            {items.map((i) => (
              <div key={i.productId} className="flex items-center justify-between gap-3 py-2 text-sm">
                <span className="min-w-0 flex-1 truncate">
                  {i.name} <span className="text-muted">× {i.qty}</span>
                </span>
                <Price amountEur={i.priceEur * i.qty} className="font-heading" />
              </div>
            ))}
            {items.length === 0 && <p className="py-3 text-sm text-muted">Your cart is empty.</p>}
          </div>
        </div>

        <div className="cc-outline-plate rounded-card bg-card p-5 text-sm">
          <h2 className="font-heading text-lg">Seller &amp; billing</h2>
          <dl className="mt-3 space-y-1 text-muted">
            <div className="flex justify-between gap-4">
              <dt>Merchant of Record</dt>
              <dd className="text-right text-ink">ALDERROCK LTD</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Company No.</dt>
              <dd className="text-right text-ink">17381132</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Registered address</dt>
              <dd className="max-w-[60%] text-right text-ink">
                Dept 6984, 196 High Road, Wood Green, London, N22 8HH, United Kingdom
              </dd>
            </div>
          </dl>
          <div className="mt-4 border-t border-line pt-3">
            <p className="text-xs text-muted">Billed to</p>
            <p className="text-ink">{customer.name} · {customer.email}</p>
            <p className="text-ink">{customer.address}</p>
          </div>
        </div>
      </div>

      {/* Right: payment */}
      <aside className="cc-outline-plate h-fit rounded-card bg-card p-5">
        {error && <p className="mb-3 rounded-lg border-2 border-red bg-red-tint px-3 py-2 text-sm text-red">{error}</p>}

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Total</span>
          <Price amountEur={totalEur} className="font-display text-2xl" />
        </div>

        <div className="mt-3 rounded-lg bg-band p-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted">Account balance</span>
            <span className="font-heading">{format(balance)}</span>
          </div>
          {insufficient && (
            <p className="mt-2 text-xs text-red">
              Not enough balance.{" "}
              <Link href="/account?topup=1" className="underline">
                Top up
              </Link>{" "}
              to continue.
            </p>
          )}
        </div>

        <label className="mt-4 flex items-start gap-2 text-sm">
          <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-0.5 h-4 w-4" />
          <span>
            I agree to the{" "}
            <Link href="/terms" target="_blank" className="underline hover:text-cobalt">
              terms
            </Link>{" "}
            and{" "}
            <Link href="/returns" target="_blank" className="underline hover:text-cobalt">
              refund policy
            </Link>
            . I understand game keys are non-refundable once revealed.
          </span>
        </label>

        <Button
          variant="primary"
          className={`mt-4 w-full ${loading || insufficient || !accepted ? "opacity-50" : ""}`}
          disabled={loading || insufficient || !accepted || items.length === 0}
          onClick={pay}
        >
          {loading ? "Processing…" : `Pay ${format(totalEur)}`}
        </Button>

        <div className="mt-4 border-t border-line pt-3">
          <PaymentLogos />
          <p className="mt-2 text-[0.7rem] text-muted">
            Secured, PCI DSS compliant checkout. Merchant of Record: ALDERROCK LTD.
          </p>
        </div>
      </aside>
    </div>
  );
}
