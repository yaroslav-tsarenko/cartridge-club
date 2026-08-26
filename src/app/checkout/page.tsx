import { redirect } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CheckoutForm } from "@/components/store/CheckoutForm";
import { currentUser } from "@/lib/auth";

export const metadata = { title: "Checkout — Cartridge Club" };

export default async function CheckoutPage() {
  const user = await currentUser();
  if (!user) redirect("/login?next=/checkout");

  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-3xl">Checkout</h1>
        <CheckoutForm
          balance={user.balance}
          customer={{
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            address: `${user.street}, ${user.city}, ${user.postalCode}, ${user.country}`,
          }}
        />
      </main>
      <Footer />
    </>
  );
}
