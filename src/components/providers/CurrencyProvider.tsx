"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { CURRENCIES, DEFAULT_CURRENCY, type CurrencyCode } from "@/lib/currency";

type Ctx = {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  format: (amountEur: number) => string;
  convert: (amountEur: number) => number;
};

const CurrencyContext = createContext<Ctx | null>(null);

export function CurrencyProvider({
  initial = DEFAULT_CURRENCY,
  children,
}: {
  initial?: CurrencyCode;
  children: React.ReactNode;
}) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(initial);

  useEffect(() => {
    const stored = document.cookie
      .split("; ")
      .find((r) => r.startsWith("cc_currency="))
      ?.split("=")[1] as CurrencyCode | undefined;
    if (stored && CURRENCIES[stored]) setCurrencyState(stored);
  }, []);

  const setCurrency = useCallback((c: CurrencyCode) => {
    setCurrencyState(c);
    document.cookie = `cc_currency=${c}; path=/; max-age=${60 * 60 * 24 * 365}`;
  }, []);

  const convert = useCallback((amountEur: number) => amountEur * CURRENCIES[currency].rate, [currency]);
  const format = useCallback(
    (amountEur: number) => `${CURRENCIES[currency].symbol}${(amountEur * CURRENCIES[currency].rate).toFixed(2)}`,
    [currency]
  );

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format, convert }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
