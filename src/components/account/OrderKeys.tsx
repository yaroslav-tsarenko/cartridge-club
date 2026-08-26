"use client";

import { useState } from "react";

export function KeyReveal({ keys }: { keys: string[] }) {
  const [shown, setShown] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  if (keys.length === 0) {
    return <p className="text-xs text-muted">Keys are being processed and will appear here shortly.</p>;
  }

  async function copy(k: string, i: number) {
    await navigator.clipboard.writeText(k);
    setCopied(i);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="space-y-2">
      {!shown ? (
        <button
          onClick={() => setShown(true)}
          className="cc-outline rounded-lg bg-cobalt px-3 py-1.5 text-sm text-white"
        >
          Reveal {keys.length} key{keys.length > 1 ? "s" : ""}
        </button>
      ) : (
        keys.map((k, i) => (
          <div key={i} className="flex items-center gap-2">
            <code className="cc-outline flex-1 rounded-lg bg-bg px-3 py-2 font-mono text-sm tracking-wide">
              {k}
            </code>
            <button
              onClick={() => copy(k, i)}
              className="cc-outline rounded-lg bg-bg px-2.5 py-2 text-xs hover:bg-band"
            >
              {copied === i ? "Copied ✓" : "Copy"}
            </button>
          </div>
        ))
      )}
      {shown && (
        <p className="text-[0.7rem] text-muted">
          Redeemed keys are non-refundable. Store them somewhere safe.
        </p>
      )}
    </div>
  );
}
