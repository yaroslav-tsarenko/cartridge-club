import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatMoney, type CurrencyCode } from "@/lib/currency";
import { paidFromBalanceIds, statusBadge } from "./_lib";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 25;

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const q = sp.q?.trim() ?? "";
  const status = sp.status?.trim() ?? "";
  const page = Math.max(1, Number(sp.page) || 1);

  const where = {
    ...(status ? { status } : {}),
    ...(q
      ? {
          OR: [
            { id: { contains: q } },
            { kinguinOrderId: { contains: q } },
            { user: { email: { contains: q, mode: "insensitive" as const } } },
            { user: { lastName: { contains: q, mode: "insensitive" as const } } },
            { items: { some: { name: { contains: q, mode: "insensitive" as const } } } },
          ],
        }
      : {}),
  };

  const [orders, total, counts, revenue] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { items: true, user: true },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.order.count({ where }),
    prisma.order.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.order.aggregate({ _sum: { total: true }, _count: { _all: true } }),
  ]);

  const balanceOrders = await paidFromBalanceIds(orders.map((o) => o.id));
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const buildHref = (patch: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries({ q, status, page, ...patch })) {
      if (v !== undefined && v !== "" && v !== 1) params.set(k, String(v));
    }
    const s = params.toString();
    return s ? `/admin?${s}` : "/admin";
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl">Orders</h1>
          <p className="mt-1 text-sm text-muted">
            {revenue._count._all.toLocaleString()} orders ·{" "}
            {formatMoney(revenue._sum.total ?? 0, "EUR")} gross merchandise value
          </p>
        </div>
        <form action="/admin" className="cc-outline flex items-center gap-2 rounded-xl bg-card px-3 py-2">
          <span className="text-muted" aria-hidden>
            ⌕
          </span>
          <input
            name="q"
            defaultValue={q}
            placeholder="Order ID, email, product…"
            className="w-64 bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </form>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={buildHref({ status: undefined, page: undefined })}
          className={`cc-outline rounded-lg px-3 py-1.5 text-sm ${status ? "bg-card hover:bg-band" : "bg-cobalt text-white"}`}
        >
          All ({revenue._count._all})
        </Link>
        {counts.map((c) => (
          <Link
            key={c.status}
            href={buildHref({ status: c.status, page: undefined })}
            className={`cc-outline rounded-lg px-3 py-1.5 text-sm ${status === c.status ? "bg-cobalt text-white" : "bg-card hover:bg-band"}`}
          >
            {c.status} ({c._count._all})
          </Link>
        ))}
      </div>

      <div className="cc-outline-plate mt-5 overflow-x-auto rounded-card bg-card">
        <table className="w-full min-w-[780px] text-left text-sm">
          <thead className="border-b-2 border-line text-[0.7rem] uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Placed</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted">
                  No orders match this filter.
                </td>
              </tr>
            )}
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-band/60">
                <td className="px-4 py-3">
                  <Link href={`/admin/orders/${o.id}`} className="font-heading text-cobalt hover:underline">
                    #{o.id.slice(-8)}
                  </Link>
                  {o.kinguinOrderId && (
                    <p className="text-[0.7rem] text-muted">supplier {o.kinguinOrderId}</p>
                  )}
                </td>
                <td className="px-4 py-3 text-muted">
                  {new Date(o.createdAt).toLocaleString("en-GB")}
                </td>
                <td className="px-4 py-3">
                  <p>{o.user.firstName} {o.user.lastName}</p>
                  <p className="text-[0.7rem] text-muted">{o.user.email}</p>
                </td>
                <td className="px-4 py-3 text-muted">
                  {o.items.length} · <span className="text-ink">{o.items[0]?.name ?? "—"}</span>
                  {o.items.length > 1 && <span className="text-muted"> +{o.items.length - 1}</span>}
                </td>
                <td className="px-4 py-3 text-muted">
                  {balanceOrders.has(o.id) ? "Balance" : "Card"}
                </td>
                <td className="px-4 py-3">
                  <span className={`cc-tag rounded px-1.5 py-0.5 text-[0.6rem] ${statusBadge(o.status)}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-heading">
                  {formatMoney(o.total, (o.currency as CurrencyCode) ?? "EUR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3 text-sm">
          {page > 1 && (
            <Link href={buildHref({ page: page - 1 })} className="cc-outline rounded-lg bg-card px-3 py-1.5 hover:bg-band">
              ← Prev
            </Link>
          )}
          <span className="text-muted">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link href={buildHref({ page: page + 1 })} className="cc-outline rounded-lg bg-card px-3 py-1.5 hover:bg-band">
              Next →
            </Link>
          )}
        </div>
      )}
    </>
  );
}
