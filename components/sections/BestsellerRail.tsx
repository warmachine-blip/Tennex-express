"use client";

import { useRef } from "react";
import { featured } from "@/lib/products";
import { ProductCard } from "@/components/cards/ProductCard";
import { SlashLabel } from "@/components/ui/SlashLabel";

export function BestsellerRail() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    startX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0;
    trackRef.current?.classList.add("cursor-grabbing");
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    e.preventDefault();
    const x = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    const walk = (x - startX.current) * 1.5;
    if (trackRef.current) trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => {
    dragging.current = false;
    trackRef.current?.classList.remove("cursor-grabbing");
  };

  const products = featured.bestSellers();

  return (
    <section className="py-20 md:py-[160px]">
      <div className="max-w-[1280px] mx-auto px-6 mb-8">
        <SlashLabel number="001" title="bestsellers" />
      </div>

      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto px-6 pb-4 drag-scroll select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className="min-w-[260px] max-w-[260px]"
          />
        ))}
      </div>
    </section>
  );
}
