"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { PaymentLogos } from "@/components/site/PaymentLogos";
import { CURRENCIES, DEFAULT_CURRENCY, type CurrencyCode } from "@/lib/currency";
import { PayntWidget } from "@/components/store/PayntWidget";

interface PayntCheckoutData {
  checkoutId: string;
  scriptUrl: string;
  integrity?: string;
  shopperResultUrl: string;
}

export function TopUpCheckout({ amount, currency }: { amount: number; currency: CurrencyCode }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [waived, setWaived] = useState(false);
  const [payntData, setPayntData] = useState<PayntCheckoutData | null>(null);

  const cur = CURRENCIES[currency] ?? CURRENCIES[DEFAULT_CURRENCY];

  async function startTopupPayment() {
    setError(null);
    if (!waived) return setError("Please confirm the withdrawal waiver to continue.");
    setLoading(true);
    try {
      const res = await fetch("/api/paynt/prepare-topup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency, withdrawalWaiver: waived }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to initialize top-up");

      setPayntData({
        checkoutId: data.checkoutId,
        scriptUrl: data.scriptUrl,
        integrity: data.integrity,
        shopperResultUrl: data.shopperResultUrl,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Top-up failed");
    } finally {
      setLoading(false);
    }
  }

  // When card checkout is initialized, replace the entire block with full-width payment view
  if (payntData) {
    return (
      <div className="mx-auto mt-6 w-full max-w-4xl">
        <button
          type="button"
          onClick={() => setPayntData(null)}
          className="mb-4 inline-flex items-center gap-2 text-sm text-muted transition hover:text-ink font-medium"
        >
          <span className="text-base">←</span> Back to checkout options
        </button>

        <div className="cc-outline-plate rounded-card bg-card p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
            <div>
              <span className="cc-tag rounded bg-leaf px-2 py-0.5 text-[0.65rem] text-ink">
                Secure Card Checkout
              </span>
              <h2 className="mt-1 font-heading text-2xl">Top up balance</h2>
              <p className="text-xs text-muted mt-0.5">
                Statement descriptor: <strong className="text-ink">CartridgeClub</strong>
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-muted block">Amount to pay</span>
              <span className="font-display text-3xl sm:text-4xl text-ink">
                {cur.symbol}
                {amount.toFixed(2)} {currency}
              </span>
            </div>
          </div>

          {/* Secure Payment Widget */}
          <div className="py-6">
            <PayntWidget
              checkoutId={payntData.checkoutId}
              scriptUrl={payntData.scriptUrl}
              integrity={payntData.integrity}
              shopperResultUrl={payntData.shopperResultUrl}
            />
          </div>

          {/* Footer security notes */}
          <div className="border-t border-line pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
            <PaymentLogos />
            <p className="text-center sm:text-right text-[0.75rem]">
              SAQ-A PCI DSS compliant. 256-bit encrypted checkout.
              <br />
              Merchant of Record: ALDERROCK LTD.
            </p>
          </div>
        </div>
      </div>
    );
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
          Funds are credited to your account balance instantly upon successful payment and can be
          used for any purchase.
        </p>
        <p className="mt-3 rounded-lg bg-band p-3 text-xs text-muted">
          Credits are non-transferable virtual credits usable only within this platform. They are
          not cryptocurrency, not tradable, and not redeemable for cash.
        </p>
        <p className="mt-2 text-xs text-muted">
          Card statement descriptor: <strong className="text-ink">CartridgeClub</strong>
        </p>
      </div>

      <aside className="cc-outline-plate h-fit rounded-card bg-card p-5">
        {error && (
          <p className="mb-3 rounded-lg border-2 border-red bg-red-tint px-3 py-2 text-sm text-red">
            {error}
          </p>
        )}

        <div className="rounded-lg bg-band p-3 text-xs text-muted">
          <p className="font-semibold text-ink">Pay with Card</p>
          <p className="mt-1">
            Secure checkout supporting Visa, Mastercard and Amex via PayNT Copy &amp; Pay (SAQ-A
            compliant with 3D Secure).
          </p>
        </div>

        <label className="mt-4 flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={waived}
            onChange={(e) => setWaived(e.target.checked)}
            className="mt-0.5 h-4 w-4"
          />
          <span>
            I understand that by purchasing digital goods and requesting immediate delivery, I
            waive my statutory right of withdrawal once delivery begins.
          </span>
        </label>

        <Button
          variant="primary"
          className={`mt-4 w-full ${loading || !waived ? "opacity-50" : ""}`}
          disabled={loading || !waived}
          onClick={startTopupPayment}
        >
          {loading ? "Preparing…" : `Pay ${cur.symbol}${amount.toFixed(2)} with Card`}
        </Button>

        <div className="mt-4 border-t border-line pt-3">
          <PaymentLogos />
          <p className="mt-2 text-[0.7rem] text-muted">
            Secured, SAQ-A PCI DSS compliant checkout. Merchant of Record: ALDERROCK LTD.
          </p>
        </div>
      </aside>
    </div>
  );
}
