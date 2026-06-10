"use client";

import { useState } from "react";
import type { ProductVariant } from "@/lib/products";

interface Props {
  variants: ProductVariant[];
  label?: string;
}

export function VariantPicker({ variants, label = "Size" }: Props) {
  const firstInStock = variants.find((v) => v.inStock) ?? variants[0];
  const [selectedId, setSelectedId] = useState(firstInStock.id);

  const selected = variants.find((v) => v.id === selectedId);

  return (
    <div>
      <p className="text-[13px] font-medium text-ink mb-2.5">
        {label}:{" "}
        <span className="font-normal text-muted">{selected?.label}</span>
      </p>
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
  );
}
