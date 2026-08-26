import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Price } from "@/components/ui/Price";
import { KeyReveal } from "@/components/account/OrderKeys";
import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Order — Cartridge Club" };

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await currentUser();
  if (!user) redirect(`/login?next=/account/orders/${id}`);

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
  if (!order || order.userId !== user.id) notFound();

  const parseKeys = (raw: string): string[] => {
    try {
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  };

  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Link href="/account" className="text-sm text-muted hover:text-cobalt">
          ← Back to account
        </Link>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-3xl">Order #{order.id.slice(-8)}</h1>
          <span className="cc-tag rounded bg-leaf px-2 py-1 text-[0.65rem] text-ink">{order.status}</span>
        </div>
        <p className="mt-1 text-sm text-muted">
          Placed {new Date(order.createdAt).toLocaleString("en-GB")}
        </p>

        <div className="mt-6 space-y-4">
          {order.items.map((item) => {
            const keys = parseKeys(item.keys);
            return (
              <div key={item.id} className="cc-outline-plate rounded-card bg-card p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-heading">{item.name}</p>
                    <p className="text-xs text-muted">Qty {item.qty}</p>
                  </div>
                  <Price amountEur={item.price * item.qty} className="font-heading" />
                </div>
                <div className="mt-4 border-t border-line pt-4">
                  <p className="mb-2 cc-tag text-[0.65rem] text-muted">Your game key{keys.length > 1 ? "s" : ""}</p>
                  <KeyReveal keys={keys} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="cc-outline-plate mt-4 flex items-center justify-between rounded-card bg-card p-5">
          <span className="font-heading">Total paid</span>
          <Price amountEur={order.total} className="font-display text-2xl" />
        </div>

        <p className="mt-4 text-xs text-muted">
          A receipt with a PDF invoice was emailed to {user.email}. Merchant of Record: ALDERROCK LTD.
        </p>
      </main>
      <Footer />
    </>
  );
}
