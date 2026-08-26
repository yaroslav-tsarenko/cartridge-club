"use client";

import { CurrencyProvider } from "./CurrencyProvider";
import { CartProvider } from "./CartProvider";
import type { CurrencyCode } from "@/lib/currency";

export function Providers({
  currency,
  children,
}: {
  currency?: CurrencyCode;
  children: React.ReactNode;
}) {
  return (
    <CurrencyProvider initial={currency}>
      <CartProvider>{children}</CartProvider>
    </CurrencyProvider>
  );
}
