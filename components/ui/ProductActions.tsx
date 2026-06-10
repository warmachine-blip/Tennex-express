"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { SizeGuideModal } from "@/components/ui/SizeGuideModal";
import type { ProductVariant } from "@/lib/products";

interface Props {
  productId: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  category: string;
  inStock: boolean;
  variants?: ProductVariant[];
}

export function ProductActions({
  productId, name, price, image, slug, category, inStock, variants,
}: Props) {
  const { add } = useCart();
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const hasVariants = variants && variants.length > 0;
  const firstInStock = hasVariants
    ? (variants.find((v) => v.inStock) ?? variants[0])
    : null;
  const [selectedId, setSelectedId] = useState(firstInStock?.id ?? "");

  const isClothing = category === "mens-clothing" || category === "womens-clothing";
  const sizeGuideGender = category === "womens-clothing" ? "womens" : "mens";

  const selected = hasVariants ? variants.find((v) => v.id === selectedId) : null;

  function handleAdd() {
    add({
      productId,
      name,
      price: price + (selected?.priceDelta ?? 0),
      image,
      slug,
      category,
      variantId: selected?.id,
      variantLabel: selected?.label,
    });
  }

  return (
    <>
      {isClothing && (
        <SizeGuideModal
          isOpen={sizeGuideOpen}
          onClose={() => setSizeGuideOpen(false)}
          gender={sizeGuideGender}
        />
      )}
    <div className="flex flex-col gap-6">
      {/* Variant picker */}
      {hasVariants && variants && (
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-[13px] font-medium text-ink">
              Size:{" "}
              <span className="font-normal text-muted">{selected?.label}</span>
            </p>
            {isClothing && (
              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="text-[12px] text-muted underline underline-offset-2 hover:text-ink transition-colors duration-150 cursor-pointer"
              >
                Size guide
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <button
                key={v.id}
                onClick={() => v.inStock && setSelectedId(v.id)}
                disabled={!v.inStock}
                className={`px-4 py-2.5 rounded-[10px] border-2 text-[13px] font-medium transition-all duration-150 ${
                  v.id === selectedId
                    ? "border-ink text-ink cursor-pointer"
                    : v.inStock
                    ? "border-hairline text-ink hover:border-muted cursor-pointer"
                    : "border-hairline text-muted opacity-40 cursor-not-allowed"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add to cart */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleAdd}
          disabled={!inStock}
          className={`w-full py-3.5 rounded-full text-[14px] font-medium transition-colors duration-150 ${
            inStock
              ? "bg-ink text-bg hover:bg-ink/90 cursor-pointer"
              : "bg-hairline text-muted cursor-not-allowed"
          }`}
        >
          {inStock ? "Add to cart" : "Out of stock"}
        </button>
        <p className="text-[12px] text-muted text-center">
          Free overgrip included · Ships in 1 business day
        </p>
      </div>
    </div>
    </>
  );
}
