"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/providers/CartProvider";
import { Button } from "@/components/ui/Button";
import type { CartItem } from "@/components/providers/CartProvider";

export function AddToCart({ item }: { item: Omit<CartItem, "qty"> }) {
  const { add } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="primary"
        size="lg"
        onClick={() => {
          add(item);
          setAdded(true);
          setTimeout(() => setAdded(false), 1500);
        }}
      >
        {added ? "Added to cart ✓" : "Add to cart"}
      </Button>
      <Button
        variant="secondary"
        size="lg"
        onClick={() => {
          add(item);
          router.push("/cart");
        }}
      >
        Buy now
      </Button>
    </div>
  );
}
