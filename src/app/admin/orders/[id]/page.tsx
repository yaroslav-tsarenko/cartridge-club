import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatMoney, type CurrencyCode } from "@/lib/currency";
import { maskKey, paidFromBalanceIds, parseKeys, statusBadge } from "../../_lib";

export const dynamic = "force-dynamic";

export default async function AdminOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true, user: true },
  });
  if (!order) notFound();

  const [balanceIds, ledger] = await Promise.all([
    paidFromBalanceIds([order.id]),
    prisma.balanceTransaction.findMany({
      where: { userId: order.userId },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);
  const paidFromBalance = balanceIds.has(order.id);
  const currency = (order.currency as CurrencyCode) ?? "EUR";
  const keyCount = order.items.reduce((n, i) => n + parseKeys(i.keys).length, 0);

  return (
    <>
      <Link href="/admin" className="text-sm text-muted hover:text-cobalt">
        ← All orders
      </Link>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl">Order #{order.id.slice(-8)}</h1>
          <p className="mt-1 font-mono text-xs text-muted">{order.id}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`cc-tag rounded px-2 py-1 text-[0.65rem] ${statusBadge(order.status)}`}>
            {order.status}
          </span>
          <span className="font-display text-2xl">{formatMoney(order.total, currency)}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_330px]">
        <div className="space-y-5">
          <section className="cc-outline-plate rounded-card bg-card p-5">
            <h2 className="font-heading text-lg">Items</h2>
            <table className="mt-3 w-full text-left text-sm">
              <thead className="border-b border-line text-[0.7rem] uppercase tracking-wide text-muted">
                <tr>
                  <th className="py-2">Product</th>
                  <th className="py-2">Supplier ID</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Unit</th>
                  <th className="py-2 text-right">Line total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {order.items.map((i) => (
                  <tr key={i.id}>
                    <td className="py-3 pr-3">
                      <p className="font-heading">{i.name}</p>
                      <div className="mt-1 space-y-1">
                        {parseKeys(i.keys).map((k, n) => (
                          <p key={n} className="font-mono text-[0.7rem] text-muted">
                            key {n + 1}: {maskKey(k)}
                          </p>
                        ))}
                        {parseKeys(i.keys).length === 0 && (
                          <p className="text-[0.7rem] text-muted">no key delivered yet</p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 font-mono text-[0.7rem] text-muted">{i.productId}</td>
                    <td className="py-3 text-center">{i.qty}</td>
                    <td className="py-3 text-right">{formatMoney(i.price, currency)}</td>
                    <td className="py-3 text-right font-heading">
                      {formatMoney(i.price * i.qty, currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-line">
                  <td colSpan={4} className="py-3 text-right text-muted">
                    Total charged
                  </td>
                  <td className="py-3 text-right font-display text-lg">
                    {formatMoney(order.total, currency)}
                  </td>
                </tr>
              </tfoot>
            </table>
            <p className="mt-3 text-xs text-muted">
              Keys are masked in the back office. The full key is visible only to the customer in
              their account and in the delivery email.
            </p>
          </section>

          <section className="cc-outline-plate rounded-card bg-card p-5">
            <h2 className="font-heading text-lg">Fulfilment timeline</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <TimelineRow label="Order created" value={new Date(order.createdAt).toLocaleString("en-GB")} />
              <TimelineRow
                label="Payment captured"
                value={`${paidFromBalance ? "Account balance" : "Card (Visa / Mastercard)"} · ${formatMoney(order.total, currency)}`}
              />
              <TimelineRow
                label="Supplier order"
                value={order.kinguinOrderId ? `${order.kinguinOrderId} (Kinguin ESA)` : "not placed"}
              />
              <TimelineRow
                label="Keys delivered"
                value={keyCount > 0 ? `${keyCount} key(s) emailed to ${order.user.email}` : "pending"}
              />
              <TimelineRow label="Invoice" value={`invoice-${order.id}.pdf attached to the confirmation email`} />
            </ul>
            <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-3">
              <a
                href={`/admin/orders/${order.id}/email`}
                target="_blank"
                className="cc-outline rounded-lg bg-bg px-3 py-1.5 text-sm hover:bg-band"
              >
                View confirmation email ↗
              </a>
              <a
                href={`/admin/orders/${order.id}/invoice`}
                target="_blank"
                className="cc-outline rounded-lg bg-bg px-3 py-1.5 text-sm hover:bg-band"
              >
                Open PDF invoice ↗
              </a>
            </div>
          </section>

          <section className="cc-outline-plate rounded-card bg-card p-5">
            <h2 className="font-heading text-lg">Customer balance ledger</h2>
            <ul className="mt-3 divide-y divide-line text-sm">
              {ledger.length === 0 && <li className="py-3 text-muted">No balance activity.</li>}
              {ledger.map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-3 py-2">
                  <span className="min-w-0 flex-1 truncate text-muted">
                    {new Date(t.createdAt).toLocaleDateString("en-GB")} · {t.description}
                  </span>
                  <span className={t.amount >= 0 ? "font-heading text-leaf" : "font-heading text-red"}>
                    {t.amount >= 0 ? "+" : "−"}
                    {formatMoney(Math.abs(t.amount), currency)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted">
              Credits are platform-only: they can be topped up and spent, never withdrawn, cashed out
              or transferred.
            </p>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="cc-outline-plate rounded-card bg-card p-5 text-sm">
            <h2 className="font-heading text-lg">Customer</h2>
            <dl className="mt-3 space-y-2">
              <Row label="Name" value={`${order.user.firstName} ${order.user.lastName}`} />
              <Row label="Email" value={order.user.email} />
              <Row label="Email verified" value={order.user.emailVerified ? "yes" : "no"} />
              <Row label="Phone" value={order.user.phone} />
              <Row label="Date of birth" value={order.user.dateOfBirth} />
              <Row label="Customer since" value={new Date(order.user.createdAt).toLocaleDateString("en-GB")} />
              <Row label="Balance" value={formatMoney(order.user.balance, currency)} />
            </dl>
            <Link
              href={`/admin/customers/${order.userId}`}
              className="mt-3 inline-block text-xs text-cobalt hover:underline"
            >
              View all orders by this customer →
            </Link>
          </section>

          <section className="cc-outline-plate rounded-card bg-card p-5 text-sm">
            <h2 className="font-heading text-lg">Billing address</h2>
            <p className="mt-3 whitespace-pre-line text-ink">
              {`${order.user.firstName} ${order.user.lastName}\n${order.user.street}\n${order.user.city}, ${order.user.postalCode}\n${order.user.country}`}
            </p>
          </section>

          <section className="cc-outline-plate rounded-card bg-card p-5 text-sm">
            <h2 className="font-heading text-lg">Payment</h2>
            <dl className="mt-3 space-y-2">
              <Row label="Method" value={paidFromBalance ? "Account balance" : "Card"} />
              <Row label="Settlement currency" value={order.currency} />
              <Row label="Statement descriptor" value="CartridgeClub" />
              <Row label="Merchant of Record" value="ALDERROCK LTD" />
              <Row label="Company No." value="17381132" />
              <Row label="Terms accepted" value="yes (required at checkout)" />
              <Row label="Withdrawal waiver" value="yes (required at checkout)" />
            </dl>
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

function TimelineRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex flex-wrap justify-between gap-2 border-b border-line pb-2 last:border-0">
      <span className="text-muted">{label}</span>
      <span className="text-ink">{value}</span>
    </li>
  );
}
