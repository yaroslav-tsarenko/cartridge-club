import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { type CurrencyCode } from "@/lib/currency";
import { creditUserBalance } from "@/lib/orders";

// Balance is stored in EUR (base unit). Top-up amount arrives in the user's
// selected currency and is converted to EUR before crediting.
export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const amount = Number(body?.amount);
  const currency = (body?.currency ?? "GBP") as CurrencyCode;
  if (!Number.isFinite(amount) || amount <= 0 || amount > 5000) {
    return NextResponse.json({ error: "Enter an amount between 1 and 5000" }, { status: 400 });
  }
  // The acquirer requires an explicit, unticked-by-default acknowledgement that
  // credits are platform-only and that immediate supply waives the statutory
  // withdrawal right. Enforced server-side as well as in the form.
  if (!body?.withdrawalWaiver) {
    return NextResponse.json(
      { error: "Please confirm the immediate-supply acknowledgement to continue" },
      { status: 400 }
    );
  }

  const result = await creditUserBalance(user.id, amount, currency);
  return NextResponse.json({ ok: true, balance: result.balance });
}
