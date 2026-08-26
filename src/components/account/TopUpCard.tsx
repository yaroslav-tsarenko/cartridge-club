"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useCurrency } from "@/components/providers/CurrencyProvider";

export function TopUpCard({ balanceEur }: { balanceEur: number }) {
  const { currency, format, convert } = useCurrency();
  const router = useRouter();
  const [amount, setAmount] = useState("20");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const quick = [10, 20, 50, 100];

  async function topUp() {
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) return setMsg("Enter a valid amount.");
    setLoading(true);
    setMsg(null);
    const res = await fetch("/api/account/topup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: value, currency }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return setMsg(data.error || "Top-up failed");
    setMsg("Balance updated ✓");
    router.refresh();
  }

  return (
    <div className="cc-outline-plate rounded-card bg-card p-5">
      <p className="cc-tag text-[0.65rem] text-muted">Wallet balance</p>
      <p className="font-display text-3xl">{format(balanceEur)}</p>
      <p className="mt-1 text-xs text-muted">≈ {convert(balanceEur).toFixed(2)} {currency}</p>

      <div className="mt-4 border-t border-line pt-4">
        <p className="mb-2 font-heading text-sm">Add funds</p>
        <div className="flex flex-wrap gap-2">
          {quick.map((q) => (
            <button
              key={q}
              onClick={() => setAmount(String(q))}
              className={`cc-outline rounded-lg px-3 py-1.5 text-sm ${amount === String(q) ? "bg-cobalt text-white" : "bg-bg hover:bg-band"}`}
            >
              {format(q / (convert(1)))}
            </button>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="cc-outline w-full rounded-xl bg-bg px-3 py-2 text-sm outline-none"
            placeholder="Custom amount"
          />
          <Button variant="primary" onClick={topUp} disabled={loading} className={loading ? "opacity-50" : ""}>
            {loading ? "…" : "Top up"}
          </Button>
        </div>
        {msg && <p className="mt-2 text-xs text-muted">{msg}</p>}
        <p className="mt-2 text-[0.7rem] text-muted">
          Amounts are charged in {currency}. Balance is held in EUR for instant key purchases.
        </p>
      </div>
    </div>
  );
}
