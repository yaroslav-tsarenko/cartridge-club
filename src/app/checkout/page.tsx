import { redirect } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CheckoutForm } from "@/components/store/CheckoutForm";
import { TopUpCheckout } from "@/components/store/TopUpCheckout";
import { currentUser } from "@/lib/auth";
import { CURRENCIES, DEFAULT_CURRENCY, type CurrencyCode } from "@/lib/currency";

export const metadata = { title: "Checkout — Cartridge Club" };

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ topup?: string; currency?: string }>;
}) {
  const user = await currentUser();
  if (!user) redirect("/login?next=/checkout");

  const sp = await searchParams;
  const topup = Number(sp.topup);
  const isTopUp = Number.isFinite(topup) && topup > 0;
  const currency = (sp.currency && sp.currency in CURRENCIES ? sp.currency : DEFAULT_CURRENCY) as CurrencyCode;

  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-3xl">Checkout</h1>
        {isTopUp ? (
          <TopUpCheckout amount={topup} currency={currency} />
        ) : (
          <CheckoutForm
            balance={user.balance}
            customer={{
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              address: `${user.street}, ${user.city}, ${user.postalCode}, ${user.country}`,
            }}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
