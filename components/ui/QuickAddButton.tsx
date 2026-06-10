"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/lib/products";

interface QuickAddButtonProps {
  product: Product;
}

export function QuickAddButton({ product }: QuickAddButtonProps) {
  const { add } = useCart();
  const inStockVariants = product.variants?.filter((v) => v.inStock) ?? [];
  const [selectedId, setSelectedId] = useState(inStockVariants[0]?.id ?? "");
  const [added, setAdded] = useState(false);

  if (!product.inStock) {
    return (
      <button
        disabled
        className="w-full rounded-full border border-hairline text-muted text-[13px] font-medium py-3 cursor-not-allowed"
      >
        Sold out
      </button>
    );
  }

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    const variant = inStockVariants.find((v) => v.id === selectedId);
    add({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      slug: product.slug,
      category: product.category,
      variantId: variant?.id,
      variantLabel: variant?.label,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <div className="flex flex-col gap-2">
      {inStockVariants.length > 1 && (
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          onClick={(e) => e.preventDefault()}
          className="w-full rounded-2xl border border-hairline bg-surface px-4 py-2.5 text-[13px] text-ink focus:outline-none focus:border-ink transition-colors appearance-none cursor-pointer"
        >
          {inStockVariants.map((v) => (
            <option key={v.id} value={v.id}>
              {v.label}
            </option>
          ))}
        </select>
      )}
      <button
        onClick={handleAdd}
        className="w-full rounded-full bg-ink text-bg text-[13px] font-medium py-3 hover:bg-ink/80 transition-colors cursor-pointer"
      >
        {added ? "Added ✓" : "Add to cart"}
      </button>
    </div>
  );
}
