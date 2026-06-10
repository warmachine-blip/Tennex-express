"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export function CartDrawer() {
  const { items, remove, setQty, total, count, isOpen, closeCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeCart(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        aria-hidden
        className={`fixed inset-0 bg-ink/30 backdrop-blur-[2px] z-[200] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 h-screen w-full max-w-[420px] bg-bg z-[201] flex flex-col shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-hairline flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-medium text-ink">Cart</span>
            {count > 0 && (
              <span className="text-[12px] font-medium text-muted bg-hairline px-2 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-hairline transition-colors duration-150 cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Items — flex-1 + min-h-0 so it shrinks correctly and scrolls */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-hairline">
                <path d="M5 5H8.5L11.5 25H30.5L33.5 10H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="15" cy="32" r="2" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="27" cy="32" r="2" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <p className="text-[14px] text-muted">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="text-[13px] font-medium text-ink underline underline-offset-2 cursor-pointer"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-hairline px-6">
              {items.map((item) => (
                <li
                  key={`${item.productId}:${item.variantId ?? ""}`}
                  className="flex gap-4 py-5"
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/shop/${item.category}/${item.slug}`}
                    onClick={closeCart}
                    className="relative flex-shrink-0 w-[80px] h-[80px] rounded-[10px] overflow-hidden bg-hairline/40 border border-hairline"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-contain p-1"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <Link
                        href={`/shop/${item.category}/${item.slug}`}
                        onClick={closeCart}
                        className="text-[13px] font-medium text-ink leading-snug hover:underline underline-offset-2 line-clamp-2 block"
                      >
                        {item.name}
                      </Link>
                      {item.variantLabel && (
                        <p className="text-[12px] text-muted mt-0.5">{item.variantLabel}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Qty stepper */}
                      <div className="flex items-center border border-hairline rounded-full">
                        <button
                          onClick={() => setQty(item.productId, item.variantId, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-8 h-8 flex items-center justify-center text-ink hover:bg-hairline transition-colors duration-150 cursor-pointer rounded-l-full text-[16px] leading-none"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-[13px] font-medium text-ink select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => setQty(item.productId, item.variantId, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-8 h-8 flex items-center justify-center text-ink hover:bg-hairline transition-colors duration-150 cursor-pointer rounded-r-full text-[16px] leading-none"
                        >
                          +
                        </button>
                      </div>

                      {/* Price + remove */}
                      <div className="flex items-center gap-3">
                        <span className="text-[14px] font-medium text-ink">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => remove(item.productId, item.variantId)}
                          aria-label="Remove item"
                          className="text-muted hover:text-ink transition-colors duration-150 cursor-pointer"
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="flex-shrink-0 border-t border-hairline px-6 py-6 flex flex-col gap-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[14px] text-muted">Subtotal</span>
              <span className="text-[16px] font-medium text-ink">${total.toFixed(2)}</span>
            </div>
            <p className="text-[12px] text-muted">
              Shipping and taxes calculated at checkout
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full bg-ink text-bg text-[14px] font-medium py-3.5 rounded-full hover:bg-ink/90 transition-colors duration-150 text-center mt-1 block"
            >
              Checkout
            </Link>
            <button
              onClick={closeCart}
              className="w-full text-[13px] font-medium text-muted hover:text-ink transition-colors duration-150 cursor-pointer"
            >
              Continue shopping
            </button>
          </div>
        )}
      </div>
    </>,
    document.body
  );
}
