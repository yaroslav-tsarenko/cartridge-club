// Kinguin returns prices in EUR, so EUR is our base unit.
// Rates are relative to 1 EUR. Update periodically or wire a live FX feed.
export type CurrencyCode = "GBP" | "EUR" | "USD";

export const CURRENCIES: Record<
  CurrencyCode,
  { symbol: string; label: string; rate: number; locale: string }
> = {
  GBP: { symbol: "£", label: "GBP", rate: 0.85, locale: "UK" },
  EUR: { symbol: "€", label: "EUR", rate: 1, locale: "EU" },
  USD: { symbol: "$", label: "USD", rate: 1.08, locale: "US" },
};

export const DEFAULT_CURRENCY: CurrencyCode = "GBP";

export function convert(amountEur: number, to: CurrencyCode): number {
  return amountEur * CURRENCIES[to].rate;
}

export function formatMoney(amountEur: number, to: CurrencyCode): string {
  const value = convert(amountEur, to);
  return `${CURRENCIES[to].symbol}${value.toFixed(2)}`;
}

// Format an amount already expressed in the target currency (e.g. balance).
export function formatInCurrency(amount: number, to: CurrencyCode): string {
  return `${CURRENCIES[to].symbol}${amount.toFixed(2)}`;
}
