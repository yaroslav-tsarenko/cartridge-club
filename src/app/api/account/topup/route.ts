import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@/lib/auth";
import { CURRENCIES, type CurrencyCode } from "@/lib/currency";

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
  const rate = CURRENCIES[currency]?.rate ?? 1;
  const amountEur = amount / rate;

  await prisma.$transaction([
    prisma.user.update({ where: { id: user.id }, data: { balance: { increment: amountEur } } }),
    prisma.balanceTransaction.create({
      data: {
        userId: user.id,
        amount: amountEur,
        type: "topup",
        description: `Top-up ${CURRENCIES[currency].symbol}${amount.toFixed(2)} ${currency}`,
      },
    }),
  ]);

  const updated = await prisma.user.findUnique({ where: { id: user.id } });
  return NextResponse.json({ ok: true, balance: updated?.balance ?? 0 });
}
