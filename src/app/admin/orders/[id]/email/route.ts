import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { orderEmail } from "@/lib/mail";
import { formatMoney, type CurrencyCode } from "@/lib/currency";
import { parseKeys } from "../../../_lib";

/**
 * Renders the exact Order Confirmation email that was sent for an order, so
 * support (or a payment provider reviewing the flow) can see what the customer
 * received. Keys are shown as delivered — this route is admin-only.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await currentUser();
  if (!isAdminEmail(user?.email)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { id } = await params;
  const order = await prisma.order.findUnique({ where: { id }, include: { items: true, user: true } });
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const currency = (order.currency as CurrencyCode) ?? "EUR";
  const html = orderEmail({
    orderId: order.id,
    name: order.user.firstName,
    total: formatMoney(order.total, currency),
    lines: order.items.map((i) => ({ name: i.name, qty: i.qty, keys: parseKeys(i.keys) })),
  });

  return new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
