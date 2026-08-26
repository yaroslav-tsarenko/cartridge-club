"use client";

import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { useCart } from "@/components/providers/CartProvider";

export default function CartPage() {
  const { items, remove, setQty, totalEur } = useCart();

  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-3xl">Your cart</h1>

        {items.length === 0 ? (
          <div className="cc-outline-plate mt-6 rounded-card bg-card p-10 text-center">
            <p className="text-muted">Your cart is empty.</p>
            <Link href="/store" className="mt-4 inline-block font-heading text-cobalt hover:underline">
              Browse the store →
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-3">
              {items.map((i) => (
                <div key={i.productId} className="cc-outline-plate flex items-center gap-3 rounded-card bg-card p-3">
                  <div className="h-20 w-16 shrink-0 overflow-hidden rounded bg-band">
                    {i.cover && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={i.cover} alt={i.name} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link href={`/product/${i.kinguinId}`} className="line-clamp-2 font-heading text-sm hover:text-cobalt">
                      {i.name}
                    </Link>
                    <p className="text-xs text-muted">{i.platform}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={i.qty}
                      onChange={(e) => setQty(i.productId, Number(e.target.value))}
                      className="cc-outline rounded-lg bg-bg px-2 py-1 text-sm"
                    >
                      {Array.from({ length: 9 }, (_, n) => n + 1).map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                    <Price amountEur={i.priceEur * i.qty} className="w-20 text-right font-heading text-sm" />
                    <button onClick={() => remove(i.productId)} aria-label="Remove" className="text-muted hover:text-red">
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="cc-outline-plate h-fit rounded-card bg-card p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <Price amountEur={totalEur} className="font-heading" />
              </div>
              <div className="mt-1 flex items-center justify-between text-sm">
                <span className="text-muted">Delivery</span>
                <span className="text-leaf">Instant · Free</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                <span className="font-heading">Total</span>
                <Price amountEur={totalEur} className="font-display text-xl" />
              </div>
              <Link href="/checkout" className="mt-4 block">
                <Button variant="primary" className="w-full">
                  Checkout
                </Button>
              </Link>
              <p className="mt-3 text-center text-[0.7rem] text-muted">Prices include VAT where applicable.</p>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
