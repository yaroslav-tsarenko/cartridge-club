import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPaymentStatus, isPaymentSuccessful } from "@/lib/paynt";
import { fulfillOrder, creditUserBalance } from "@/lib/orders";
import { type CurrencyCode } from "@/lib/currency";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    let body: any = null;
    try {
      body = JSON.parse(rawBody);
    } catch {
      // Might be URL-encoded
      const params = new URLSearchParams(rawBody);
      body = Object.fromEntries(params.entries());
    }

    // PayNT webhooks typically pass resourcePath or payment object
    const resourcePath =
      body?.resourcePath || body?.payload?.resourcePath || body?.path;

    let transaction: any = body;
    if (resourcePath) {
      transaction = await getPaymentStatus(resourcePath);
    }

    const code = transaction?.result?.code;
    const merchantTransactionId =
      transaction?.merchantTransactionId || body?.merchantTransactionId;

    if (!code || !isPaymentSuccessful(code)) {
      return NextResponse.json({ ok: true, message: "Ignored non-success status" });
    }

    if (merchantTransactionId) {
      if (merchantTransactionId.startsWith("topup_")) {
        // Find user by reference or amount
        console.log(`[PayNT Webhook] Top-up confirmed: ${merchantTransactionId}`);
      } else {
        // It's an order ID
        const order = await prisma.order.findUnique({
          where: { id: merchantTransactionId },
        });

        if (order && order.status === "pending") {
          await prisma.order.update({
            where: { id: order.id },
            data: { status: "paid" },
          });
          await fulfillOrder(order.id, "Card (Visa / Mastercard)");
          console.log(`[PayNT Webhook] Order ${order.id} fulfilled via webhook`);
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[PayNT Webhook] Error:", err);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
