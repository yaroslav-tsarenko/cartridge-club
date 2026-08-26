"use client";

import { useEffect, useState } from "react";

export function ProductGallery({
  cover,
  screenshots,
  name,
}: {
  cover: string | null;
  screenshots: string[];
  name: string;
}) {
  const images = Array.from(new Set([cover, ...screenshots].filter(Boolean))) as string[];
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox, images.length]);

  if (images.length === 0) {
    return (
      <div className="cc-outline-plate grid h-64 place-items-center rounded-card bg-band text-muted">
        No image
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setLightbox(0)}
        className="cc-outline-plate group block w-full cursor-zoom-in overflow-hidden rounded-card bg-band"
        aria-label="Enlarge image"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[0]}
          alt={name}
          className="mx-auto max-h-[440px] w-full object-contain p-3 transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </button>

      {screenshots.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {screenshots.map((s, i) => (
            <button
              key={s}
              type="button"
              onClick={() => setLightbox(i + 1)}
              className="cc-outline aspect-video w-full cursor-zoom-in overflow-hidden rounded-lg bg-band"
              aria-label="Enlarge screenshot"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s} alt="" className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-2xl text-white hover:bg-white/20"
            aria-label="Close"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
                aria-label="Previous"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((i) => (i === null ? i : (i - 1 + images.length) % images.length));
                }}
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
                aria-label="Next"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((i) => (i === null ? i : (i + 1) % images.length));
                }}
              >
                ›
              </button>
            </>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[lightbox]}
            alt={name}
            className="max-h-[90vh] max-w-[92vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
