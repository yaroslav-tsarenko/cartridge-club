import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@/lib/auth";
import { isBlockedName } from "@/lib/catalog-filter";
import { type CurrencyCode } from "@/lib/currency";
import { fulfillOrder } from "@/lib/orders";

type CartLine = { productId: string; kinguinId: number; name: string; qty: number; priceEur: number };

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Please sign in to complete your order" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const lines: CartLine[] = Array.isArray(body?.items) ? body.items : [];
  const currency = (body?.currency ?? "GBP") as CurrencyCode;
  const payment = body?.payment === "card" ? "card" : "balance";
  if (!body?.acceptedTerms) {
    return NextResponse.json({ error: "Please accept the terms to continue" }, { status: 400 });
  }
  if (!body?.withdrawalWaiver) {
    return NextResponse.json(
      { error: "Please confirm the withdrawal waiver to continue" },
      { status: 400 }
    );
  }
  if (lines.length === 0) {
    return NextResponse.json({ error: "Your cart is empty" }, { status: 400 });
  }
  // Stock we do not sell must not slip through a stale or tampered cart.
  if (lines.some((l) => isBlockedName(l.name))) {
    return NextResponse.json(
      { error: "One or more items are no longer available. Please remove them from your cart." },
      { status: 400 }
    );
  }

  const totalEur = lines.reduce((s, l) => s + l.priceEur * l.qty, 0);
  if (payment === "balance" && user.balance < totalEur - 1e-6) {
    return NextResponse.json(
      { error: "Insufficient balance. Please top up your account.", need: "topup" },
      { status: 402 }
    );
  }

  // Create the order + deduct balance atomically.
  const order = await prisma.$transaction(async (tx) => {
    const o = await tx.order.create({
      data: {
        userId: user.id,
        total: totalEur,
        currency,
        status: "paid",
        items: {
          create: lines.map((l) => ({
            productId: l.productId,
            name: l.name,
            qty: l.qty,
            price: l.priceEur,
          })),
        },
      },
      include: { items: true },
    });
    if (payment === "balance") {
      await tx.user.update({ where: { id: user.id }, data: { balance: { decrement: totalEur } } });
      await tx.balanceTransaction.create({
        data: {
          userId: user.id,
          amount: -totalEur,
          type: "purchase",
          description: `Order ${o.id} — ${lines.length} item(s)`,
        },
      });
    }
    return o;
  });

  // Fulfil order via shared helper
  const methodLabel =
    payment === "balance" ? "Account balance (Credits)" : "Card (Visa / Mastercard)";
  const result = await fulfillOrder(order.id, methodLabel);

  return NextResponse.json({ ok: true, orderId: order.id, delivered: result.delivered });
}
