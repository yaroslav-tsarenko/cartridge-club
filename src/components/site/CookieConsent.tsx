"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const KEY = "cc_cookie_consent";

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setOpen(true);
  }, []);

  const decide = (value: "all" | "essential") => {
    localStorage.setItem(KEY, value);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] p-3 sm:p-4">
      <div className="cc-outline-plate mx-auto flex max-w-4xl flex-col gap-3 rounded-card bg-card p-4 sm:flex-row sm:items-center sm:gap-5">
        <p className="flex-1 text-sm text-ink">
          We use cookies to keep your cart, remember your currency and improve the store. See our{" "}
          <Link href="/privacy" className="underline hover:text-cobalt">
            Privacy
          </Link>{" "}
          and{" "}
          <Link href="/cookies" className="underline hover:text-cobalt">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="ghost" onClick={() => decide("essential")}>
            Essential only
          </Button>
          <Button variant="primary" onClick={() => decide("all")}>
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
}
