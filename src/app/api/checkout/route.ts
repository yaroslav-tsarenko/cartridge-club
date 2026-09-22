import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@/lib/auth";
import { placeOrder, downloadKeys, type OrderLine } from "@/lib/kinguin";
import { sendMail, orderEmail } from "@/lib/mail";
import { buildInvoicePdf } from "@/lib/invoice";
import { formatMoney, type CurrencyCode } from "@/lib/currency";

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

  // Fulfil via Kinguin: place order, then fetch keys.
  const orderLines: OrderLine[] = lines.map((l) => ({
    productId: l.productId,
    qty: l.qty,
    price: l.priceEur,
  }));
  const keysByProduct = new Map<string, string[]>();
  let delivered = false;
  try {
    const { orderId } = await placeOrder(orderLines, order.id);
    await prisma.order.update({ where: { id: order.id }, data: { kinguinOrderId: orderId } });
    const keys = await downloadKeys(orderId);
    for (const k of keys) {
      const arr = keysByProduct.get(k.name) ?? [];
      arr.push(k.serial);
      keysByProduct.set(k.name, arr);
    }
    delivered = keys.length > 0;
  } catch (e) {
    console.error("[checkout] Kinguin fulfilment failed:", e);
    // Demo fallback lets the full delivery flow be exercised while the
    // Kinguin merchant balance is still being funded.
    if (process.env.KINGUIN_DEMO_FALLBACK === "true") {
      for (const l of lines) {
        keysByProduct.set(
          l.name,
          Array.from({ length: l.qty }, () => demoKey())
        );
      }
      delivered = true;
    }
  }

  // Persist keys onto order items and update status.
  const items = await prisma.orderItem.findMany({ where: { orderId: order.id } });
  for (const item of items) {
    const keys = keysByProduct.get(item.name) ?? [];
    if (keys.length) {
      await prisma.orderItem.update({ where: { id: item.id }, data: { keys: JSON.stringify(keys) } });
    }
  }
  await prisma.order.update({
    where: { id: order.id },
    data: { status: delivered ? "delivered" : "processing" },
  });

  // Invoice + confirmation email.
  try {
    const pdf = await buildInvoicePdf({
      orderId: order.id,
      date: new Date().toLocaleDateString("en-GB"),
      customer: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        address: `${user.street}\n${user.city}, ${user.postalCode}\n${user.country}`,
      },
      lines: lines.map((l) => ({
        name: l.name,
        qty: l.qty,
        unit: formatMoney(l.priceEur, currency),
        total: formatMoney(l.priceEur * l.qty, currency),
      })),
      total: formatMoney(totalEur, currency),
      currency,
    });
    await sendMail({
      to: user.email,
      subject: `Your Cartridge Club order ${order.id}`,
      html: orderEmail({
        orderId: order.id,
        name: user.firstName,
        total: formatMoney(totalEur, currency),
        lines: lines.map((l) => ({
          name: l.name,
          qty: l.qty,
          keys: keysByProduct.get(l.name) ?? [],
        })),
      }),
      attachments: [{ filename: `invoice-${order.id}.pdf`, content: pdf, contentType: "application/pdf" }],
    });
  } catch (e) {
    console.error("[checkout] confirmation email failed:", e);
  }

  return NextResponse.json({ ok: true, orderId: order.id, delivered });
}

function demoKey() {
  const seg = () =>
    Array.from({ length: 5 }, () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]).join("");
  return `${seg()}-${seg()}-${seg()}`;
}
