import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/cards/ProductCard";
import { SlashLabel } from "@/components/ui/SlashLabel";
import { categories, findByCategory, type Category } from "@/lib/products";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) return {};
  return {
    title: `${cat.name} — Tennex Express`,
    description: cat.tagline,
    openGraph: {
      title: `${cat.name} | Tennex Express`,
      description: cat.tagline,
    },
  };
}

const JSON_LD_BREADCRUMB = (catName: string, catSlug: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://tennexexpress.com" },
    { "@type": "ListItem", position: 2, name: "Shop", item: "https://tennexexpress.com/shop" },
    { "@type": "ListItem", position: 3, name: catName, item: `https://tennexexpress.com/shop/${catSlug}` },
  ],
});

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();

  const products = findByCategory(category as Category);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(JSON_LD_BREADCRUMB(cat.name, cat.slug)),
        }}
      />
      <Header />
      <main className="pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="max-w-[1280px] mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[12px] text-muted" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-ink transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-ink">{cat.name}</span>
          </nav>
        </div>

        {/* Header */}
        <div className="max-w-[1280px] mx-auto px-6 py-12 border-b border-hairline">
          <SlashLabel number={cat.number} title={cat.name.toLowerCase()} className="mb-4 block" />
          <h1 className="text-h1 text-ink mb-3">{cat.name}</h1>
          <p className="text-[16px] text-muted max-w-[480px]">{cat.tagline}</p>
        </div>

        {/* Product grid */}
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          {products.length === 0 ? (
            <p className="text-muted">No products in this category yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
