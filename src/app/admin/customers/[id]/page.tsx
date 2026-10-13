import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/currency";
import { statusBadge } from "../../_lib";

export const dynamic = "force-dynamic";

export default async function AdminCustomerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      orders: { orderBy: { createdAt: "desc" }, include: { items: true } },
      transactions: { orderBy: { createdAt: "desc" }, take: 20 },
    },
  });
  if (!user) notFound();

  const spent = user.orders.reduce((s, o) => s + o.total, 0);

  return (
    <>
      <Link href="/admin/customers" className="text-sm text-muted hover:text-cobalt">
        ← All customers
      </Link>

      <h1 className="mt-3 font-display text-3xl">
        {user.firstName} {user.lastName}
      </h1>
      <p className="mt-1 text-sm text-muted">
        {user.email} · registered {new Date(user.createdAt).toLocaleDateString("en-GB")} ·{" "}
        {user.orders.length} order(s) · {formatMoney(spent, "EUR")} lifetime
      </p>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_330px]">
        <section className="cc-outline-plate rounded-card bg-card p-5">
          <h2 className="font-heading text-lg">Orders</h2>
          <ul className="mt-3 divide-y divide-line text-sm">
            {user.orders.length === 0 && <li className="py-3 text-muted">No orders yet.</li>}
            {user.orders.map((o) => (
              <li key={o.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <Link href={`/admin/orders/${o.id}`} className="font-heading text-cobalt hover:underline">
                    #{o.id.slice(-8)}
                  </Link>
                  <p className="truncate text-[0.7rem] text-muted">
                    {new Date(o.createdAt).toLocaleString("en-GB")} ·{" "}
                    {o.items.map((i) => i.name).join(", ")}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className={`cc-tag rounded px-1.5 py-0.5 text-[0.6rem] ${statusBadge(o.status)}`}>
                    {o.status}
                  </span>
                  <span className="font-heading">{formatMoney(o.total, "EUR")}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <aside className="space-y-5">
          <section className="cc-outline-plate rounded-card bg-card p-5 text-sm">
            <h2 className="font-heading text-lg">Account</h2>
            <dl className="mt-3 space-y-2">
              <Row label="Balance" value={formatMoney(user.balance, "EUR")} />
              <Row label="Email verified" value={user.emailVerified ? "yes" : "no"} />
              <Row label="Phone" value={user.phone} />
              <Row label="Date of birth" value={user.dateOfBirth} />
              <Row label="Country" value={user.country} />
            </dl>
            <p className="mt-3 text-xs text-muted">
              Balance can be topped up and spent on the platform only. There is no withdrawal or
              payout function.
            </p>
          </section>

          <section className="cc-outline-plate rounded-card bg-card p-5 text-sm">
            <h2 className="font-heading text-lg">Balance ledger</h2>
            <ul className="mt-3 divide-y divide-line">
              {user.transactions.length === 0 && <li className="py-3 text-muted">No activity.</li>}
              {user.transactions.map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-3 py-2">
                  <span className="min-w-0 flex-1 truncate text-muted">{t.description}</span>
                  <span className={t.amount >= 0 ? "font-heading text-leaf" : "font-heading text-red"}>
                    {t.amount >= 0 ? "+" : "−"}
                    {formatMoney(Math.abs(t.amount), "EUR")}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="max-w-[60%] break-words text-right text-ink">{value}</dd>
    </div>
  );
}
