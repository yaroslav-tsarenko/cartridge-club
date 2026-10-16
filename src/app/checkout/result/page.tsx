import Link from "next/link";
import { redirect } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/Button";
import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPaymentStatus, isPaymentSuccessful } from "@/lib/paynt";
import { fulfillOrder, creditUserBalance } from "@/lib/orders";
import { type CurrencyCode } from "@/lib/currency";

export const metadata = { title: "Payment Result — Cartridge Club" };

export default async function CheckoutResultPage({
  searchParams,
}: {
  searchParams: Promise<{
    id?: string;
    resourcePath?: string;
    orderId?: string;
    type?: string;
    amount?: string;
    currency?: string;
    ref?: string;
  }>;
}) {
  const user = await currentUser();
  if (!user) redirect("/login");

  const sp = await searchParams;
  const { resourcePath, orderId, type, amount, currency, ref } = sp;

  if (!resourcePath) {
    return (
      <>
        <Header />
        <main id="main" className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
          <div className="cc-outline-plate rounded-card bg-card p-8">
            <h1 className="font-display text-2xl text-red">Payment Verification Error</h1>
            <p className="mt-3 text-sm text-muted">
              Missing payment verification details. If you completed a payment, please check your
              account or contact support.
            </p>
            <div className="mt-6">
              <Link href="/checkout">
                <Button variant="primary">Return to Checkout</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  let success = false;
  let errorMessage: string | null = null;
  let statusResult: any = null;

  try {
    statusResult = await getPaymentStatus(resourcePath);
    success = isPaymentSuccessful(statusResult.result.code);
    if (!success) {
      errorMessage =
        statusResult.result.description || "The payment transaction was not approved.";
    }
  } catch (err) {
    console.error("[CheckoutResult] Verification error:", err);
    errorMessage =
      err instanceof Error ? err.message : "Unable to verify transaction with payment provider.";
  }

  // Handle successful payment
  if (success) {
    if (orderId) {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
      });

      if (order && order.userId === user.id) {
        // Fulfill order if pending
        if (order.status === "pending") {
          await prisma.order.update({
            where: { id: order.id },
            data: { status: "paid" },
          });
          await fulfillOrder(order.id, "Card (Visa / Mastercard)");
        }
        redirect(`/account/orders/${order.id}?new=1`);
      }
    } else if (type === "topup" && amount) {
      await creditUserBalance(
        user.id,
        Number(amount),
        (currency ?? "GBP") as CurrencyCode,
        ref || statusResult?.id
      );
      redirect("/account?topped=1");
    }
  }

  // Handle failed payment
  if (orderId) {
    try {
      await prisma.order.updateMany({
        where: { id: orderId, status: "pending" },
        data: { status: "failed" },
      });
    } catch (e) {
      console.error("[CheckoutResult] Error updating order status:", e);
    }
  }

  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
        <div className="cc-outline-plate rounded-card bg-card p-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-red bg-red-tint text-2xl font-bold text-red">
            ✕
          </div>
          <h1 className="font-display text-3xl text-red">Payment Unsuccessful</h1>
          <p className="mt-3 text-sm text-ink font-medium">
            {errorMessage || "Your card was not charged. Please check your details and try again."}
          </p>
          {statusResult?.result?.code && (
            <p className="mt-1 text-xs text-muted">
              Reference code: {statusResult.result.code}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href={type === "topup" ? "/checkout?topup=1" : "/checkout"}>
              <Button variant="primary">Try Again</Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost">View Cart</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
