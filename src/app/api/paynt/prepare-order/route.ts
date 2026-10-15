import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@/lib/auth";
import { isBlockedName } from "@/lib/catalog-filter";
import { prepareCheckout } from "@/lib/paynt";
import { type CurrencyCode, CURRENCIES, DEFAULT_CURRENCY } from "@/lib/currency";

type CartLine = { productId: string; kinguinId: number; name: string; qty: number; priceEur: number };

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Please sign in to complete your order" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const lines: CartLine[] = Array.isArray(body?.items) ? body.items : [];
  const currency = (body?.currency ?? "GBP") as CurrencyCode;

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
  if (lines.some((l) => isBlockedName(l.name))) {
    return NextResponse.json(
      { error: "One or more items are no longer available. Please remove them from your cart." },
      { status: 400 }
    );
  }

  const totalEur = lines.reduce((s, l) => s + l.priceEur * l.qty, 0);

  // Convert amount to the requested currency if needed (or charge in EUR)
  const rate = CURRENCIES[currency]?.rate ?? 1;
  const totalCharged = totalEur * rate;

  // Create pending order
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      total: totalEur,
      currency,
      status: "pending",
      items: {
        create: lines.map((l) => ({
          productId: l.productId,
          name: l.name,
          qty: l.qty,
          price: l.priceEur,
        })),
      },
    },
  });

  // Calculate shopperResultUrl
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    req.headers.get("origin") ||
    "https://cartridge-club.com";
  const shopperResultUrl = `${origin.replace(/\/+$/, "")}/checkout/result?orderId=${order.id}`;

  try {
    const checkout = await prepareCheckout({
      amount: totalCharged,
      currency,
      merchantTransactionId: order.id,
      customer: {
        email: user.email,
        givenName: user.firstName,
        surname: user.lastName,
      },
      billing: {
        street1: user.street,
        city: user.city,
        postcode: user.postalCode,
        country: user.country,
      },
      shopperResultUrl,
    });

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      checkoutId: checkout.checkoutId,
      integrity: checkout.integrity,
      scriptUrl: checkout.scriptUrl,
      shopperResultUrl,
    });
  } catch (e) {
    console.error("[PayNT prepare-order] Error:", e);
    // Mark order failed if checkout couldn't be prepared
    await prisma.order.update({
      where: { id: order.id },
      data: { status: "failed" },
    });

    return NextResponse.json(
      {
        error:
          e instanceof Error
            ? e.message
            : "Failed to initialize payment gateway. Please try again.",
      },
      { status: 500 }
    );
  }
}
