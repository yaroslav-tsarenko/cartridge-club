import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const ok = status === "ok";
  const invalid = status === "invalid";

  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-md px-4 py-16 text-center sm:px-6">
        {ok ? (
          <>
            <h1 className="font-display text-3xl">Email confirmed ✓</h1>
            <p className="mt-2 text-sm text-muted">Thanks — your account is fully verified.</p>
          </>
        ) : invalid ? (
          <>
            <h1 className="font-display text-3xl">Link expired</h1>
            <p className="mt-2 text-sm text-muted">This confirmation link is invalid or has expired.</p>
          </>
        ) : (
          <>
            <h1 className="font-display text-3xl">Check your inbox</h1>
            <p className="mt-2 text-sm text-muted">
              We&apos;ve sent you a confirmation link. Click it to verify your email address.
            </p>
          </>
        )}
        <Link href="/account" className="mt-6 inline-block font-heading text-cobalt hover:underline">
          Go to my account
        </Link>
      </main>
      <Footer />
    </>
  );
}
