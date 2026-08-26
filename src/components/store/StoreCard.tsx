"use client";

import Link from "next/link";
import { useState } from "react";
import { Price } from "@/components/ui/Price";
import { useCart } from "@/components/providers/CartProvider";
import type { Product } from "@/lib/kinguin";

export function StoreCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add({
      productId: product.productId,
      kinguinId: product.kinguinId,
      name: product.name,
      priceEur: product.priceEur,
      cover: product.cover,
      platform: product.platform,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="cc-outline-plate group flex flex-col overflow-hidden rounded-card bg-card">
      <Link href={`/product/${product.kinguinId}`} className="relative block aspect-[3/4] overflow-hidden bg-band">
        {product.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.cover}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-muted">No image</div>
        )}
        <span className="cc-tag absolute left-2 top-2 rounded bg-ink/85 px-1.5 py-0.5 text-[0.6rem] text-white">
          {product.platform}
        </span>
        {product.isPreorder && (
          <span className="cc-tag absolute right-2 top-2 rounded bg-grape px-1.5 py-0.5 text-[0.6rem] text-white">
            Pre-order
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-3">
        <Link href={`/product/${product.kinguinId}`} className="line-clamp-2 font-heading text-sm leading-tight hover:text-cobalt">
          {product.name}
        </Link>
        <div className="mt-1 flex items-center gap-2 text-[0.68rem] text-muted">
          {product.releaseYear && <span>{product.releaseYear}</span>}
          <span>· {product.region}</span>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <Price amountEur={product.priceEur} className="font-heading text-base text-ink" />
          <button
            type="button"
            onClick={onAdd}
            className="cc-outline cc-stamp rounded-lg bg-red px-3 py-1.5 text-xs font-heading text-white hover:brightness-105"
          >
            {added ? "Added ✓" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
