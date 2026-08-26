import Link from "next/link";
import { redirect } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TopUpCard } from "@/components/account/TopUpCard";
import { LogoutButton } from "@/components/account/LogoutButton";
import { Price } from "@/components/ui/Price";
import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "My account — Cartridge Club" };

const statusStyle: Record<string, string> = {
  delivered: "bg-leaf text-ink",
  paid: "bg-cobalt text-white",
  processing: "bg-sun text-ink",
  pending: "bg-band text-muted",
  failed: "bg-red text-white",
};

export default async function AccountPage() {
  const user = await currentUser();
  if (!user) redirect("/login?next=/account");

  const [orders, transactions] = await Promise.all([
    prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: { items: true },
    }),
    prisma.balanceTransaction.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl">Hi, {user.firstName}</h1>
            <p className="text-sm text-muted">
              {user.email}
              {!user.emailVerified && (
                <span className="ml-2 rounded bg-sun px-1.5 py-0.5 text-[0.62rem] text-ink">
                  Email not verified
                </span>
              )}
            </p>
          </div>
          <LogoutButton />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[340px_1fr]">
          <div className="space-y-6">
            <TopUpCard balanceEur={user.balance} />

            <div className="cc-outline-plate rounded-card bg-card p-5">
              <p className="font-heading text-sm">Recent activity</p>
              <ul className="mt-3 divide-y divide-line">
                {transactions.length === 0 && (
                  <li className="py-3 text-xs text-muted">No transactions yet.</li>
                )}
                {transactions.map((t) => (
                  <li key={t.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                    <span className="min-w-0 flex-1 truncate text-muted">{t.description}</span>
                    <span className={t.amount >= 0 ? "font-heading text-leaf" : "font-heading text-red"}>
                      {t.amount >= 0 ? "+" : "−"}
                      <Price amountEur={Math.abs(t.amount)} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="cc-outline-plate rounded-card bg-card p-5">
            <h2 className="font-heading text-lg">Order history</h2>
            {orders.length === 0 ? (
              <div className="mt-4 rounded-lg bg-band p-6 text-center text-sm text-muted">
                No orders yet.{" "}
                <Link href="/store" className="font-heading text-cobalt hover:underline">
                  Browse the store →
                </Link>
              </div>
            ) : (
              <ul className="mt-3 divide-y divide-line">
                {orders.map((o) => (
                  <li key={o.id} className="py-3">
                    <Link href={`/account/orders/${o.id}`} className="group flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-heading text-sm group-hover:text-cobalt">
                          {o.items.map((i) => i.name).join(", ")}
                        </p>
                        <p className="text-xs text-muted">
                          {new Date(o.createdAt).toLocaleDateString("en-GB")} · {o.items.length} item(s) · #{o.id.slice(-8)}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <span className={`cc-tag rounded px-1.5 py-0.5 text-[0.6rem] ${statusStyle[o.status] ?? "bg-band"}`}>
                          {o.status}
                        </span>
                        <Price amountEur={o.total} className="font-heading text-sm" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
