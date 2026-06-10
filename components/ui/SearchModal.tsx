"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { products, type Product } from "@/lib/products";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortName.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.replace(/-/g, " ").toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.hashtags.some((h) => h.toLowerCase().includes(q))
    )
    .slice(0, 8);
}

export function SearchModal({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = searchProducts(query);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(-1);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => { setActiveIndex(-1); }, [query]);

  const navigate = useCallback(
    (product: Product) => {
      router.push(`/shop/${product.category}/${product.slug}`);
      onClose();
    },
    [router, onClose]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      navigate(results[activeIndex]);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden
        className={`fixed inset-0 bg-ink/40 backdrop-blur-[3px] z-[300] transition-opacity duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        className={`fixed left-1/2 z-[301] w-full max-w-[560px] transition-all duration-200 ${
          isOpen
            ? "top-[88px] opacity-100 -translate-x-1/2 pointer-events-auto"
            : "top-[80px] opacity-0 -translate-x-1/2 pointer-events-none"
        }`}
        onKeyDown={handleKeyDown}
      >
        <div className="mx-4 bg-bg rounded-2xl shadow-2xl border border-hairline overflow-hidden">
          {/* Input row */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-hairline">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-muted flex-shrink-0"
            >
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, brands…"
              className="flex-1 bg-transparent text-[14px] text-ink placeholder:text-muted outline-none"
            />
            {query ? (
              <button
                onClick={() => setQuery("")}
                className="text-muted hover:text-ink transition-colors duration-150 cursor-pointer"
                aria-label="Clear search"
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            ) : (
              <kbd className="hidden sm:flex items-center text-[11px] text-muted border border-hairline rounded px-1.5 py-0.5 font-mono leading-none">
                Esc
              </kbd>
            )}
          </div>

          {/* Results */}
          {query.trim() ? (
            <div className="max-h-[360px] overflow-y-auto">
              {results.length === 0 ? (
                <div className="px-4 py-8 text-center text-[13px] text-muted">
                  No results for &ldquo;{query}&rdquo;
                </div>
              ) : (
                <ul>
                  {results.map((product, i) => (
                    <li key={product.id}>
                      <button
                        onClick={() => navigate(product)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-100 cursor-pointer ${
                          i === activeIndex ? "bg-hairline/60" : "hover:bg-hairline/40"
                        }`}
                      >
                        <div className="relative flex-shrink-0 w-[48px] h-[48px] rounded-lg overflow-hidden bg-hairline/50 border border-hairline">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="48px"
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-ink truncate">{product.name}</p>
                          <p className="text-[12px] text-muted">{product.brand}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-[13px] font-medium text-ink">${product.price}</p>
                          <p className="text-[11px] text-muted capitalize">
                            {product.category.replace(/-/g, " ")}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            /* Empty state — quick category links */
            <div className="px-4 py-4 flex flex-wrap gap-2">
              {["racquets", "strings", "bags", "balls", "accessories", "mens-clothing", "womens-clothing"].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => { router.push(`/shop/${cat}`); onClose(); }}
                    className="text-[12px] text-muted border border-hairline rounded-full px-3 py-1.5 hover:border-ink hover:text-ink transition-colors duration-150 cursor-pointer capitalize"
                  >
                    {cat.replace(/-/g, " ")}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}
