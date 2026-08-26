"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/Button";

const inputCls = "cc-outline w-full rounded-xl bg-bg px-3 py-2.5 text-sm outline-none placeholder:text-muted";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setSent(true);
    setLoading(false);
  }

  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-md px-4 py-14 sm:px-6">
        <h1 className="font-display text-3xl">Reset your password</h1>
        {sent ? (
          <div className="cc-outline-plate mt-6 rounded-card bg-card p-6">
            <p className="text-sm">
              If an account exists for <strong>{email}</strong>, we&apos;ve sent a reset link. Check your inbox
              (and spam folder).
            </p>
            <Link href="/login" className="mt-4 inline-block font-heading text-cobalt hover:underline">
              Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={submit} className="cc-outline-plate mt-6 space-y-4 rounded-card bg-card p-6">
            <p className="text-sm text-muted">Enter your email and we&apos;ll send you a link to reset it.</p>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="you@email.com" required />
            <Button type="submit" variant="primary" className={`w-full ${loading ? "opacity-50" : ""}`} disabled={loading}>
              {loading ? "Sending…" : "Send reset link"}
            </Button>
          </form>
        )}
      </main>
      <Footer />
    </>
  );
}
