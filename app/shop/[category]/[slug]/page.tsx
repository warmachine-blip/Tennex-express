import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SlashLabel } from "@/components/ui/SlashLabel";
import { ProductCard } from "@/components/cards/ProductCard";
import { ProductGallery } from "@/components/ui/ProductGallery";
import { ProductActions } from "@/components/ui/ProductActions";
import { products, findBySlug, findByCategory, categories } from "@/lib/products";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = findBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Tennex Express`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0], width: 800, height: 800, alt: product.name }],
    },
  };
}

function buildBreadcrumbJsonLd(product: NonNullable<ReturnType<typeof findBySlug>>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://tennexexpress.com" },
      { "@type": "ListItem", position: 2, name: "Shop", item: "https://tennexexpress.com/shop" },
      { "@type": "ListItem", position: 3, name: product.category, item: `https://tennexexpress.com/shop/${product.category}` },
      { "@type": "ListItem", position: 4, name: product.shortName, item: `https://tennexexpress.com/shop/${product.category}/${product.slug}` },
    ],
  };
}

function buildJsonLd(product: ReturnType<typeof findBySlug>) {
  if (!product) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    brand: { "@type": "Brand", name: "Tennex Express" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://tennexexpress.com/shop/${product.category}/${product.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { category, slug } = await params;
  const product = findBySlug(slug);
  if (!product || product.category !== category) notFound();

  const related = findByCategory(product.category as Parameters<typeof findByCategory>[0])
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const cat = categories.find((c) => c.slug === product.category);
  const savings = product.compareAt
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildJsonLd(product)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbJsonLd(product)),
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
            <Link href={`/shop/${category}`} className="hover:text-ink transition-colors">
              {cat?.name ?? category}
            </Link>
            <span>/</span>
            <span className="text-ink">{product.shortName}</span>
          </nav>
        </div>

        {/* Product grid */}
        <div className="max-w-[1280px] mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Gallery */}
            <ProductGallery
              images={product.images}
              productName={product.name}
              savings={savings}
            />

            {/* Details — sticky on scroll */}
            <div className="lg:sticky lg:top-24 h-fit flex flex-col gap-6">
              <div>
                <SlashLabel
                  number={cat?.number ?? "01"}
                  title={cat?.name.toLowerCase() ?? category}
                  className="mb-3 block"
                />
                <h1 className="text-h1 text-ink mb-2">{product.name}</h1>
                <p className="text-[15px] text-muted leading-relaxed">{product.description}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <span className="text-[22px] font-medium text-ink">{product.rating}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`text-[16px] ${i < Math.round(product.rating) ? "text-accent" : "text-hairline"}`}>★</span>
                  ))}
                </div>
                <span className="text-[13px] text-muted">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 py-4 border-y border-hairline">
                <span className="text-h2 text-ink">${product.price}</span>
                {product.compareAt && (
                  <span className="text-[16px] text-muted line-through">${product.compareAt}</span>
                )}
                {savings && (
                  <span className="text-[13px] font-medium text-success">Save {savings}%</span>
                )}
              </div>

              {/* Variants + Add to cart */}
              <ProductActions
                productId={product.id}
                name={product.name}
                price={product.price}
                image={product.images[0]}
                slug={product.slug}
                category={product.category}
                inStock={product.inStock}
                variants={product.variants}
              />

              {/* Spec list */}
              <div className="border-t border-hairline pt-6">
                <p className="text-[12px] font-medium text-muted tracking-[0.04em] uppercase mb-3">
                  Specifications
                </p>
                <ul className="flex flex-col gap-2">
                  {product.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2 text-[13px] text-ink">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-muted flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div className="mt-20 pt-16 border-t border-hairline">
              <h2 className="text-h2 text-ink mb-8">You might also like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
