import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { SlashLabel } from "@/components/ui/SlashLabel";
import { ProductCard } from "@/components/cards/ProductCard";
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
      <Header />
      <main className="pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="max-w-[1280px] mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[12px] text-muted" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink transition-colors">Home</Link>
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
            <div className="flex flex-col gap-3">
              <div className="relative aspect-square rounded-[16px] overflow-hidden bg-bg border border-hairline">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
                {savings && (
                  <div className="absolute top-4 left-4 bg-accent text-ink text-[12px] font-medium px-3 py-1.5 rounded-full">
                    -{savings}% vs MSRP
                  </div>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.slice(1).map((img, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-[12px] overflow-hidden border border-hairline bg-bg flex-shrink-0">
                      <Image src={img} alt={`${product.shortName} view ${i + 2}`} fill sizes="80px" className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

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

              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div>
                  <p className="text-[13px] font-medium text-ink mb-2">Select option</p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        disabled={!v.inStock}
                        className={`px-4 py-2 rounded-full border text-[13px] font-medium transition-colors duration-150 ${
                          v.inStock
                            ? "border-hairline text-ink hover:border-ink cursor-pointer"
                            : "border-hairline text-muted opacity-50 cursor-not-allowed line-through"
                        }`}
                      >
                        {v.label}
                        {!v.inStock && " — sold out"}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to cart */}
              <div className="flex flex-col gap-3">
                <Button variant="primary" size="lg" className="w-full justify-center">
                  {product.inStock ? "Add to cart" : "Out of stock"}
                </Button>
                <p className="text-[12px] text-muted text-center">
                  Free overgrip included · Ships in 1 business day
                </p>
              </div>

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
