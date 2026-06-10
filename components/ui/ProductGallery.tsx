"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  productName: string;
  savings?: number | null;
}

export function ProductGallery({ images, productName, savings }: Props) {
  const [active, setActive] = useState(0);

  const prev = useCallback(() =>
    setActive((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() =>
    setActive((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (images.length < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, images.length]);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square rounded-[16px] overflow-hidden bg-bg border border-hairline group">
        <Image
          key={active}
          src={images[active]}
          alt={`${productName} — view ${active + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={active === 0}
          className="object-contain transition-opacity duration-200"
        />

        {savings != null && (
          <div className="absolute top-4 left-4 bg-accent text-ink text-[12px] font-medium px-3 py-1.5 rounded-full z-10">
            -{savings}% vs MSRP
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-bg/80 backdrop-blur border border-hairline flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 hover:bg-bg cursor-pointer z-10"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-bg/80 backdrop-blur border border-hairline flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 hover:bg-bg cursor-pointer z-10"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`View ${i + 1}`}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-150 cursor-pointer ${
                    i === active ? "bg-ink scale-125" : "bg-ink/30 hover:bg-ink/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View ${i + 1}`}
              className={`relative flex-shrink-0 w-[72px] h-[72px] rounded-[10px] overflow-hidden border-2 transition-all duration-150 cursor-pointer ${
                i === active
                  ? "border-ink"
                  : "border-hairline hover:border-muted"
              }`}
            >
              <Image
                src={src}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                sizes="72px"
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
