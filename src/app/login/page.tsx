"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/Button";

const inputCls = "cc-outline w-full rounded-xl bg-bg px-3 py-2.5 text-sm outline-none placeholder:text-muted";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      router.push("/account");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-md px-4 py-14 sm:px-6">
        <h1 className="font-display text-3xl">Welcome back</h1>
        <p className="mt-1 text-sm text-muted">Log in to see your keys, balance and orders.</p>

        <form onSubmit={submit} className="cc-outline-plate mt-6 space-y-4 rounded-card bg-card p-6">
          {error && (
            <p className="rounded-lg border-2 border-red bg-red-tint px-3 py-2 text-sm text-red">{error}</p>
          )}
          <label className="block">
            <span className="mb-1 block font-heading text-xs text-muted">Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} required />
          </label>
          <label className="block">
            <span className="mb-1 block font-heading text-xs text-muted">Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} required />
          </label>
          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm text-cobalt hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" variant="primary" className={`w-full ${loading ? "opacity-50" : ""}`} disabled={loading}>
            {loading ? "Signing in…" : "Log in"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted">
          New here?{" "}
          <Link href="/register" className="font-heading text-cobalt hover:underline">
            Create an account
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
