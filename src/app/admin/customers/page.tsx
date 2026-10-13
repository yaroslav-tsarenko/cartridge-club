import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/currency";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const sp = await searchParams;
  const q = sp.q?.trim() ?? "";

  const users = await prisma.user.findMany({
    where: q
      ? {
          OR: [
            { email: { contains: q, mode: "insensitive" } },
            { firstName: { contains: q, mode: "insensitive" } },
            { lastName: { contains: q, mode: "insensitive" } },
          ],
        }
      : {},
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { _count: { select: { orders: true } } },
  });

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="font-display text-3xl">Customers</h1>
        <form action="/admin/customers" className="cc-outline flex items-center gap-2 rounded-xl bg-card px-3 py-2">
          <span className="text-muted" aria-hidden>
            ⌕
          </span>
          <input
            name="q"
            defaultValue={q}
            placeholder="Name or email…"
            className="w-56 bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </form>
      </div>

      <div className="cc-outline-plate mt-5 overflow-x-auto rounded-card bg-card">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="border-b-2 border-line text-[0.7rem] uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">Registered</th>
              <th className="px-4 py-3">Verified</th>
              <th className="px-4 py-3 text-center">Orders</th>
              <th className="px-4 py-3 text-right">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted">
                  No customers found.
                </td>
              </tr>
            )}
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-band/60">
                <td className="px-4 py-3">
                  <Link href={`/admin/customers/${u.id}`} className="font-heading text-cobalt hover:underline">
                    {u.firstName} {u.lastName}
                  </Link>
                  <p className="text-[0.7rem] text-muted">{u.email}</p>
                </td>
                <td className="px-4 py-3 text-muted">{u.country}</td>
                <td className="px-4 py-3 text-muted">
                  {new Date(u.createdAt).toLocaleDateString("en-GB")}
                </td>
                <td className="px-4 py-3 text-muted">{u.emailVerified ? "yes" : "no"}</td>
                <td className="px-4 py-3 text-center">{u._count.orders}</td>
                <td className="px-4 py-3 text-right font-heading">{formatMoney(u.balance, "EUR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
