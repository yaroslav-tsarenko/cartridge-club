"use client";

import { useCurrency } from "@/components/providers/CurrencyProvider";
import { cn } from "@/lib/ui";

// Renders an EUR-native amount in the currently selected currency.
export function Price({
  amountEur,
  className,
  strike = false,
}: {
  amountEur: number;
  className?: string;
  strike?: boolean;
}) {
  const { format } = useCurrency();
  return (
    <span className={cn(strike && "text-muted line-through", className)}>
      {format(amountEur)}
    </span>
  );
}
