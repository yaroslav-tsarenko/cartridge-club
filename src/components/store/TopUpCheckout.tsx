"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { PaymentLogos } from "@/components/site/PaymentLogos";
import { CURRENCIES, DEFAULT_CURRENCY, type CurrencyCode } from "@/lib/currency";

export function TopUpCheckout({ amount, currency }: { amount: number; currency: CurrencyCode }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "", name: "" });

  const cur = CURRENCIES[currency] ?? CURRENCIES[DEFAULT_CURRENCY];
  const cardComplete =
    card.number.replace(/\s/g, "").length >= 15 &&
    /^\d{2}\/\d{2}$/.test(card.expiry) &&
    card.cvc.length >= 3 &&
    card.name.trim().length > 1;

  async function pay() {
    setError(null);
    if (!cardComplete) return setError("Please enter your card details.");
    setLoading(true);
    try {
      const res = await fetch("/api/account/topup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Top-up failed");
      router.push("/account?topped=1");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Top-up failed");
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="cc-outline-plate h-fit rounded-card bg-card p-5">
        <h2 className="font-heading text-lg">Top up your balance</h2>
        <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-sm">
          <span className="text-muted">Amount to add</span>
          <span className="font-display text-2xl">
            {cur.symbol}
            {amount.toFixed(2)} {currency}
          </span>
        </div>
        <p className="mt-3 text-xs text-muted">
          Funds are credited to your account balance instantly and can be used for any purchase.
        </p>
      </div>

      <aside className="cc-outline-plate h-fit rounded-card bg-card p-5">
        {error && (
          <p className="mb-3 rounded-lg border-2 border-red bg-red-tint px-3 py-2 text-sm text-red">{error}</p>
        )}
        <div className="space-y-2">
          <input
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="Card number"
            value={card.number}
            onChange={(e) =>
              setCard((c) => ({
                ...c,
                number: e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 16)
                  .replace(/(.{4})/g, "$1 ")
                  .trim(),
              }))
            }
            className="cc-outline w-full rounded-xl bg-bg px-3 py-2 text-sm outline-none"
          />
          <div className="flex gap-2">
            <input
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM/YY"
              value={card.expiry}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                setCard((c) => ({ ...c, expiry: v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v }));
              }}
              className="cc-outline w-1/2 rounded-xl bg-bg px-3 py-2 text-sm outline-none"
            />
            <input
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="CVC"
              value={card.cvc}
              onChange={(e) => setCard((c) => ({ ...c, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
              className="cc-outline w-1/2 rounded-xl bg-bg px-3 py-2 text-sm outline-none"
            />
          </div>
          <input
            autoComplete="cc-name"
            placeholder="Name on card"
            value={card.name}
            onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))}
            className="cc-outline w-full rounded-xl bg-bg px-3 py-2 text-sm outline-none"
          />
        </div>

        <Button
          variant="primary"
          className={`mt-4 w-full ${loading || !cardComplete ? "opacity-50" : ""}`}
          disabled={loading || !cardComplete}
          onClick={pay}
        >
          {loading ? "Processing…" : `Pay ${cur.symbol}${amount.toFixed(2)}`}
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
