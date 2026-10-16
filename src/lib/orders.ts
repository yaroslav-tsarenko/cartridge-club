import { prisma } from "@/lib/prisma";
import { placeOrder, downloadKeys, type OrderLine } from "@/lib/kinguin";
import { sendMail, orderEmail } from "@/lib/mail";
import { buildInvoicePdf } from "@/lib/invoice";
import { formatMoney, type CurrencyCode, CURRENCIES, DEFAULT_CURRENCY } from "@/lib/currency";

function demoKey() {
  const seg = () =>
    Array.from({ length: 5 }, () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]).join("");
  return `${seg()}-${seg()}-${seg()}`;
}

/**
 * Fulfills an order:
 *  1. Places order via Kinguin supplier API & downloads game keys (or demo fallback)
 *  2. Updates order status & attaches keys to items
 *  3. Generates invoice PDF
 *  4. Sends order confirmation email with attached PDF
 */
export async function fulfillOrder(orderId: string, paymentMethodLabel = "Card (Visa / Mastercard)") {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true, user: true },
  });

  if (!order) {
    throw new Error(`Order ${orderId} not found`);
  }

  // Idempotency: if already delivered or paid with keys, avoid duplicating supplier call
  if (order.status === "delivered") {
    return { ok: true, orderId: order.id, delivered: true, alreadyDelivered: true };
  }

  const user = order.user;
  const currency = (order.currency ?? "GBP") as CurrencyCode;
  const orderLines: OrderLine[] = order.items.map((i) => ({
    productId: i.productId,
    qty: i.qty,
    price: i.price,
  }));

  const keysByProduct = new Map<string, string[]>();
  let delivered = false;

  try {
    const { orderId: kinguinOrderId } = await placeOrder(orderLines, order.id);
    await prisma.order.update({ where: { id: order.id }, data: { kinguinOrderId } });
    const keys = await downloadKeys(kinguinOrderId);
    for (const k of keys) {
      const arr = keysByProduct.get(k.name) ?? [];
      arr.push(k.serial);
      keysByProduct.set(k.name, arr);
    }
    delivered = keys.length > 0;
  } catch (e) {
    console.error(`[orders] Kinguin fulfilment failed for order ${order.id}:`, e);
    if (process.env.KINGUIN_DEMO_FALLBACK === "true") {
      for (const item of order.items) {
        keysByProduct.set(
          item.name,
          Array.from({ length: item.qty }, () => demoKey())
        );
      }
      delivered = true;
    }
  }

  // Persist keys onto order items and update order status
  for (const item of order.items) {
    const keys = keysByProduct.get(item.name) ?? [];
    if (keys.length) {
      await prisma.orderItem.update({
        where: { id: item.id },
        data: { keys: JSON.stringify(keys) },
      });
    }
  }

  await prisma.order.update({
    where: { id: order.id },
    data: { status: delivered ? "delivered" : "paid" },
  });

  // Invoice + confirmation email
  try {
    const pdf = await buildInvoicePdf({
      orderId: order.id,
      date: new Date().toLocaleDateString("en-GB"),
      customer: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        address: `${user.street}\n${user.city}, ${user.postalCode}\n${user.country}`,
      },
      lines: order.items.map((l) => ({
        name: l.name,
        qty: l.qty,
        unit: formatMoney(l.price, currency),
        total: formatMoney(l.price * l.qty, currency),
      })),
      total: formatMoney(order.total, currency),
      currency,
      payment: {
        method: paymentMethodLabel,
        descriptor: "CartridgeClub",
      },
    });

    await sendMail({
      to: user.email,
      subject: `Your Cartridge Club order ${order.id}`,
      html: orderEmail({
        orderId: order.id,
        name: user.firstName,
        total: formatMoney(order.total, currency),
        lines: order.items.map((l) => ({
          name: l.name,
          qty: l.qty,
          keys: keysByProduct.get(l.name) ?? [],
        })),
      }),
      attachments: [
        { filename: `invoice-${order.id}.pdf`, content: pdf, contentType: "application/pdf" },
      ],
    });
  } catch (e) {
    console.error(`[orders] confirmation email failed for order ${order.id}:`, e);
  }

  return { ok: true, orderId: order.id, delivered };
}

/**
 * Credits a user's balance safely and records a BalanceTransaction
 */
export async function creditUserBalance(
  userId: string,
  amount: number,
  currency: CurrencyCode = "GBP",
  reference?: string
) {
  const rate = CURRENCIES[currency]?.rate ?? 1;
  const amountEur = amount / rate;
  const curMeta = CURRENCIES[currency] ?? CURRENCIES[DEFAULT_CURRENCY];

  const desc = reference
    ? `Top-up ${curMeta.symbol}${amount.toFixed(2)} ${currency} (${reference})`
    : `Top-up ${curMeta.symbol}${amount.toFixed(2)} ${currency}`;

  // Check if this reference transaction has already been recorded to prevent duplicate crediting
  if (reference) {
    const existing = await prisma.balanceTransaction.findFirst({
      where: {
        userId,
        description: { contains: reference },
      },
    });
    if (existing) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      return { ok: true, balance: user?.balance ?? 0, alreadyCredited: true };
    }
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { balance: { increment: amountEur } },
    }),
    prisma.balanceTransaction.create({
      data: {
        userId,
        amount: amountEur,
        type: "topup",
        description: desc,
      },
    }),
  ]);

  const updated = await prisma.user.findUnique({ where: { id: userId } });
  return { ok: true, balance: updated?.balance ?? 0 };
}
