import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { prepareCheckout } from "@/lib/paynt";
import { type CurrencyCode, CURRENCIES, DEFAULT_CURRENCY } from "@/lib/currency";

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Please sign in to top up your balance" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const amount = Number(body?.amount);
  const currency = (body?.currency ?? "GBP") as CurrencyCode;

  if (!Number.isFinite(amount) || amount <= 0 || amount > 5000) {
    return NextResponse.json({ error: "Enter an amount between 1 and 5000" }, { status: 400 });
  }

  if (!body?.withdrawalWaiver) {
    return NextResponse.json(
      { error: "Please confirm the immediate-supply acknowledgement to continue" },
      { status: 400 }
    );
  }

  const host = req.headers.get("host");
  const proto =
    req.headers.get("x-forwarded-proto") || (host?.includes("localhost") ? "http" : "https");
  const origin =
    req.headers.get("origin") ||
    (host ? `${proto}://${host}` : process.env.NEXT_PUBLIC_SITE_URL || "https://cartridge-club.com");

  const ref = `topup_${user.id.slice(-6)}_${Date.now()}`;
  const shopperResultUrl = `${origin.replace(
    /\/+$/,
    ""
  )}/checkout/result?type=topup&amount=${amount}&currency=${currency}&ref=${encodeURIComponent(
    ref
  )}`;

  try {
    const checkout = await prepareCheckout({
      amount,
      currency,
      merchantTransactionId: ref,
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
      checkoutId: checkout.checkoutId,
      integrity: checkout.integrity,
      scriptUrl: checkout.scriptUrl,
      shopperResultUrl,
    });
  } catch (e) {
    console.error("[PayNT prepare-topup] Error:", e);
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
