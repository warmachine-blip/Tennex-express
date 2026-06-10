import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Page not found — Tennex Express",
};

const QUICK_LINKS = [
  { label: "Racquets", href: "/shop/racquets" },
  { label: "Strings", href: "/shop/strings" },
  { label: "Bags", href: "/shop/bags" },
  { label: "Balls", href: "/shop/balls" },
  { label: "Accessories", href: "/shop/accessories" },
  { label: "Junior", href: "/shop/junior" },
  { label: "Men's", href: "/shop/mens-clothing" },
  { label: "Women's", href: "/shop/womens-clothing" },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-20 min-h-[70vh]">
        <div className="max-w-[480px] mx-auto px-6 text-center">
          <p className="text-[96px] font-medium leading-none text-hairline mb-6 select-none">
            404
          </p>
          <h1 className="text-h2 text-ink mb-3">Page not found</h1>
          <p className="text-[15px] text-muted leading-relaxed mb-10">
            We couldn&apos;t find the page you were looking for. It may have
            moved or been removed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="text-[13px] font-medium text-muted hover:text-ink transition-colors"
            >
              ← Back to home
            </Link>
            <span className="hidden sm:block text-hairline">|</span>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-ink text-bg text-[13px] font-medium hover:bg-ink/80 transition-colors"
            >
              Browse all gear
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-hairline">
            <p className="text-[11px] font-medium text-muted tracking-[0.06em] uppercase mb-4">
              Quick links
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-full border border-hairline text-[12px] text-muted hover:text-ink hover:border-ink transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
