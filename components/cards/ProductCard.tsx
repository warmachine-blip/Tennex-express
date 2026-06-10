import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { categories } from "@/lib/products";
import { QuickAddButton } from "@/components/ui/QuickAddButton";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = "" }: ProductCardProps) {
  const savings = product.compareAt
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
    : null;
  const catLabel = categories.find((c) => c.slug === product.category)?.shortLabel ?? product.category;

  return (
    <div
      className={`group flex flex-col bg-surface border border-hairline rounded-[16px] overflow-hidden hover:border-ink/20 transition-all duration-300 ${className}`}
    >
      <Link href={`/shop/${product.category}/${product.slug}`} className="flex flex-col flex-1">
        {/* Image */}
        <div className="relative overflow-hidden aspect-square bg-hairline/30">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-4 transition-transform duration-400 group-hover:scale-[1.03]"
          />
          {savings && (
            <div className="absolute top-3 left-3 bg-accent text-ink text-[11px] font-medium px-2 py-1 rounded-full">
              -{savings}%
            </div>
          )}
          {!product.inStock && (
            <div className="absolute top-3 right-3 bg-bg/90 text-muted text-[11px] font-medium px-2 py-1 rounded-full border border-hairline">
              Sold out
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 pb-3 flex flex-col gap-3 flex-1">
          <div>
            <p className="text-[11px] font-medium text-muted tracking-[0.06em] uppercase mb-1">
              {catLabel}
            </p>
            <h3 className="text-[15px] font-medium text-ink leading-snug line-clamp-2">
              {product.shortName}
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] font-medium text-ink">{product.rating}</span>
            <span className="text-accent text-[12px]">★</span>
            <span className="text-[12px] text-muted">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="mt-auto flex items-baseline gap-2">
            <span className="text-[18px] font-medium text-ink">${product.price}</span>
            {product.compareAt && (
              <span className="text-[13px] text-muted line-through">${product.compareAt}</span>
            )}
          </div>
        </div>
      </Link>

      {/* Quick add */}
      <div className="px-5 pb-5 pt-2">
        <QuickAddButton product={product} />
      </div>
    </div>
  );
}
