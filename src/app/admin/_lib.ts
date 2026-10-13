import "server-only";
import { prisma } from "@/lib/prisma";

export function statusBadge(status: string): string {
  const map: Record<string, string> = {
    delivered: "bg-leaf text-ink",
    paid: "bg-cobalt text-white",
    processing: "bg-sun text-ink",
    pending: "bg-band text-muted",
    failed: "bg-red text-white",
  };
  return map[status] ?? "bg-band text-muted";
}

/**
 * Orders settled from account Balance. Checkout writes a `purchase` ledger
 * entry naming the order, so the payment method is derivable without storing
 * it twice.
 */
export async function paidFromBalanceIds(orderIds: string[]): Promise<Set<string>> {
  if (orderIds.length === 0) return new Set();
  const rows = await prisma.balanceTransaction.findMany({
    where: { type: "purchase", OR: orderIds.map((id) => ({ description: { contains: id } })) },
    select: { description: true },
  });
  const found = new Set<string>();
  for (const id of orderIds) {
    if (rows.some((r) => r.description.includes(id))) found.add(id);
  }
  return found;
}

/** Keys are shown masked in the back office; full keys stay with the customer. */
export function maskKey(key: string): string {
  if (key.length <= 4) return "••••";
  return `${"•".repeat(Math.max(4, key.length - 4))}${key.slice(-4)}`;
}

export function parseKeys(raw: string): string[] {
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}
