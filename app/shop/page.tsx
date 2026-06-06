import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SlashLabel } from "@/components/ui/SlashLabel";
import { categories } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop — Tennex Express",
  description: "Browse all tennis equipment categories — racquets, strings, bags, balls, and accessories.",
};

export default function ShopPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="py-16 border-b border-hairline">
            <SlashLabel number="001" title="shop all" className="mb-4 block" />
            <h1 className="text-h1 text-ink">All tennis gear</h1>
          </div>

          <div className="py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop/${cat.slug}`}
                className="group bg-surface border border-hairline rounded-[16px] overflow-hidden hover:border-ink/30 transition-all duration-200"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={cat.heroImage}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-400 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[11px] font-medium text-muted tracking-[0.06em] uppercase mb-1">
                    {cat.number} /
                  </p>
                  <h2 className="text-[15px] font-medium text-ink">{cat.name}</h2>
                  <p className="text-[12px] text-muted mt-1">{cat.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
