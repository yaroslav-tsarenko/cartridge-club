"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/Button";

const inputCls = "cc-outline w-full rounded-xl bg-bg px-3 py-2.5 text-sm outline-none placeholder:text-muted";

function ResetForm() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirm) return setError("Passwords don't match.");
    setLoading(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Reset failed");
      setLoading(false);
      return;
    }
    setDone(true);
    setTimeout(() => router.push("/login"), 1800);
  }

  if (!token) {
    return <p className="mt-6 text-sm text-red">Missing reset token. Request a new link.</p>;
  }
  if (done) {
    return (
      <div className="cc-outline-plate mt-6 rounded-card bg-card p-6">
        <p className="text-sm">Password updated. Redirecting you to login…</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="cc-outline-plate mt-6 space-y-4 rounded-card bg-card p-6">
      {error && <p className="rounded-lg border-2 border-red bg-red-tint px-3 py-2 text-sm text-red">{error}</p>}
      <label className="block">
        <span className="mb-1 block font-heading text-xs text-muted">New password</span>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} required />
      </label>
      <label className="block">
        <span className="mb-1 block font-heading text-xs text-muted">Confirm password</span>
        <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={inputCls} required />
      </label>
      <Button type="submit" variant="primary" className={`w-full ${loading ? "opacity-50" : ""}`} disabled={loading}>
        {loading ? "Saving…" : "Set new password"}
      </Button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-md px-4 py-14 sm:px-6">
        <h1 className="font-display text-3xl">Choose a new password</h1>
        <Suspense fallback={<p className="mt-6 text-sm text-muted">Loading…</p>}>
          <ResetForm />
        </Suspense>
        <p className="mt-4 text-center text-sm text-muted">
          <Link href="/login" className="text-cobalt hover:underline">
            Back to login
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
