"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { PaymentLogos } from "@/components/site/PaymentLogos";
import { useCart } from "@/components/providers/CartProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { PayntWidget } from "@/components/store/PayntWidget";

interface PayntCheckoutData {
  orderId: string;
  checkoutId: string;
  scriptUrl: string;
  integrity?: string;
  shopperResultUrl: string;
  totalEur: number;
}

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
  const [waived, setWaived] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState<"balance" | "card">("card");
  const [payntData, setPayntData] = useState<PayntCheckoutData | null>(null);

  const insufficient = balance < totalEur - 1e-6;
  const canPay =
    !loading &&
    accepted &&
    waived &&
    items.length > 0 &&
    (method === "balance" ? !insufficient : true);

  async function handleBalancePayment() {
    setError(null);
    if (items.length === 0) return setError("Your cart is empty.");
    if (!accepted) return setError("Please accept the terms to continue.");
    if (!waived) return setError("Please confirm the withdrawal waiver to continue.");
    if (insufficient) return setError("Insufficient account balance. Please top up or choose card payment.");

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
          withdrawalWaiver: waived,
          payment: "balance",
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

  async function handleCardPayment() {
    setError(null);
    if (items.length === 0) return setError("Your cart is empty.");
    if (!accepted) return setError("Please accept the terms to continue.");
    if (!waived) return setError("Please confirm the withdrawal waiver to continue.");

    setLoading(true);
    try {
      const res = await fetch("/api/paynt/prepare-order", {
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
          withdrawalWaiver: waived,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to prepare card checkout");

      setPayntData({
        orderId: data.orderId,
        checkoutId: data.checkoutId,
        scriptUrl: data.scriptUrl,
        integrity: data.integrity,
        shopperResultUrl: data.shopperResultUrl,
        totalEur: totalEur,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to initialize card checkout");
    } finally {
      setLoading(false);
    }
  }

  // When card checkout is initialized, replace the entire checkout area with full-width payment view
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
              <h2 className="mt-1 font-heading text-2xl">
                Order #{payntData.orderId.slice(-8)}
              </h2>
              <p className="text-xs text-muted mt-0.5">
                Statement descriptor: <strong className="text-ink">CartridgeClub</strong>
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-muted block">Total to pay</span>
              <Price amountEur={payntData.totalEur} className="font-display text-3xl sm:text-4xl text-ink" />
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
            {items.length === 0 && (
              <p className="py-3 text-sm text-muted">Your cart is empty.</p>
            )}
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
            <div className="flex justify-between gap-4">
              <dt>Card statement descriptor</dt>
              <dd className="text-right text-ink">CartridgeClub</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-muted">
            The charge will appear on your card statement as <strong className="text-ink">CartridgeClub</strong>.
          </p>
          <div className="mt-4 border-t border-line pt-3">
            <p className="text-xs text-muted">Billed to</p>
            <p className="text-ink">{customer.name} · {customer.email}</p>
            <p className="text-ink">{customer.address}</p>
          </div>
        </div>
      </div>

      {/* Right: payment */}
      <aside className="cc-outline-plate h-fit rounded-card bg-card p-5">
        {error && (
          <p className="mb-3 rounded-lg border-2 border-red bg-red-tint px-3 py-2 text-sm text-red">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Total</span>
          <Price amountEur={totalEur} className="font-display text-2xl" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setMethod("card")}
            className={`cc-outline rounded-lg px-3 py-2 text-sm ${
              method === "card" ? "bg-cobalt text-white" : "bg-bg hover:bg-band"
            }`}
          >
            Card
          </button>
          <button
            type="button"
            onClick={() => setMethod("balance")}
            className={`cc-outline rounded-lg px-3 py-2 text-sm ${
              method === "balance" ? "bg-cobalt text-white" : "bg-bg hover:bg-band"
            }`}
          >
            Balance
          </button>
        </div>

        {method === "balance" ? (
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
                or pay with Card.
              </p>
            )}
          </div>
        ) : (
          <div className="mt-3 rounded-lg bg-band p-3 text-xs text-muted">
            <p className="font-semibold text-ink">Pay with Visa, Mastercard or Amex</p>
            <p className="mt-1">
              Click &quot;Proceed to Card Payment&quot; below to open the secure, PCI-DSS compliant
              payment widget with 3D Secure authentication.
            </p>
          </div>
        )}

        <p className="mt-3 rounded-lg bg-band p-3 text-xs text-muted">
          Credits are non-transferable virtual credits usable only within this platform. They are
          not cryptocurrency, not tradable, and not redeemable for cash.
        </p>
        <p className="mt-2 text-xs text-muted">
          Card statement descriptor: <strong className="text-ink">CartridgeClub</strong>
        </p>

        <label className="mt-4 flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-0.5 h-4 w-4"
          />
          <span>
            I agree to the{" "}
            <Link href="/terms" target="_blank" className="underline hover:text-cobalt">
              terms
            </Link>{" "}
            and{" "}
            <Link href="/refund-policy" target="_blank" className="underline hover:text-cobalt">
              refund policy
            </Link>
            . I understand game keys are non-refundable once revealed.
          </span>
        </label>

        <label className="mt-3 flex items-start gap-2 text-sm">
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
          className={`mt-4 w-full ${canPay ? "" : "opacity-50"}`}
          disabled={!canPay}
          onClick={method === "balance" ? handleBalancePayment : handleCardPayment}
        >
          {loading
            ? "Processing…"
            : method === "balance"
            ? `Pay with Balance (${format(totalEur)})`
            : `Proceed to Card Payment (${format(totalEur)})`}
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
