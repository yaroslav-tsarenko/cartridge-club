import { StickerCircle } from "./Sticker";

/** Rating circle in sunshine yellow. */
export function Rating({ value, size = 40 }: { value: number; size?: number }) {
  return (
    <StickerCircle accent="sun" size={size} className="flex-col gap-0">
      <span className="font-heading text-[0.85rem] leading-none">
        {value.toFixed(1)}
      </span>
      <span className="cc-tag text-[0.42rem] opacity-80">RATED</span>
    </StickerCircle>
  );
}
