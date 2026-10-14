import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { buildInvoicePdf } from "@/lib/invoice";
import { formatMoney, type CurrencyCode } from "@/lib/currency";
import { paidFromBalanceIds } from "../../../_lib";

/** Rebuilds the PDF invoice attached to the order's confirmation email. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await currentUser();
  if (!isAdminEmail(user?.email)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { id } = await params;
  const order = await prisma.order.findUnique({ where: { id }, include: { items: true, user: true } });
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const currency = (order.currency as CurrencyCode) ?? "EUR";
  const c = order.user;
  const pdf = await buildInvoicePdf({
    orderId: order.id,
    date: new Date(order.createdAt).toLocaleDateString("en-GB"),
    customer: {
      name: `${c.firstName} ${c.lastName}`,
      email: c.email,
      address: `${c.street}\n${c.city}, ${c.postalCode}\n${c.country}`,
    },
    lines: order.items.map((i) => ({
      name: i.name,
      qty: i.qty,
      unit: formatMoney(i.price, currency),
      total: formatMoney(i.price * i.qty, currency),
    })),
    total: formatMoney(order.total, currency),
    currency,
    payment: {
      method: (await paidFromBalanceIds([order.id])).has(order.id)
        ? "Account balance (Credits)"
        : "Card (Visa / Mastercard)",
      descriptor: "CartridgeClub",
    },
  });

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="invoice-${order.id}.pdf"`,
    },
  });
}
