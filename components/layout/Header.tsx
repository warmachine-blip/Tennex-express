"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { SearchModal } from "@/components/ui/SearchModal";
import { useCart } from "@/contexts/CartContext";

const NAV_LINKS = [
  { label: "Racquets", href: "/shop/racquets" },
  { label: "Strings", href: "/shop/strings" },
  { label: "Bags", href: "/shop/bags" },
  { label: "Balls", href: "/shop/balls" },
  { label: "Accessories", href: "/shop/accessories" },
  { label: "Junior", href: "/shop/junior" },
  { label: "Men's", href: "/shop/mens-clothing" },
  { label: "Women's", href: "/shop/womens-clothing" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count, openCart } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const ANNOUNCE = [
    "Free shipping on orders $75+",
    "New Men's & Women's apparel — shop now",
    "Use code TENNEX10 for 10% off",
    "30-day free returns on all orders",
  ];
  const track = [...ANNOUNCE, ...ANNOUNCE];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement bar */}
      <div className="bg-ink h-8 overflow-hidden relative flex items-center">
        <div
          className="flex w-max announce-track"
          style={{ animation: "announce-scroll 30s linear infinite" }}
        >
          {track.map((item, i) => (
            <span key={i} className="flex items-center gap-3 text-[11px] font-medium text-bg/80 tracking-[0.06em] uppercase px-8 whitespace-nowrap">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-bg/50 shrink-0">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M6 4v2l1.5 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              {item}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes announce-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @media (prefers-reduced-motion: reduce) {
            .announce-track { animation: none !important; }
          }
        `}</style>
      </div>

      {/* Nav bar */}
      <div className={`transition-all duration-300 ${
        scrolled
          ? "bg-bg/95 backdrop-blur-sm border-b border-hairline"
          : "bg-transparent"
      }`}>
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-[15px] font-medium text-ink tracking-[-0.01em] flex-shrink-0"
        >
          Tennex Express
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-medium transition-colors duration-150 px-3 py-2 rounded-full ${
                  active
                    ? "text-ink bg-hairline/60"
                    : "text-muted hover:text-ink hover:bg-hairline/50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/about"
            className={`hidden md:block text-[13px] font-medium transition-colors duration-150 ${pathname === "/about" ? "text-ink" : "text-muted hover:text-ink"}`}
          >
            About
          </Link>

          {/* Search button */}
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search products"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-hairline transition-colors duration-150 cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>

          {/* Cart button */}
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-hairline transition-colors duration-150 cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2.5 2.5H4.5L6.5 13.5H15.5L17.5 6H5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="8" cy="16.5" r="1.25" stroke="currentColor" strokeWidth="1.4"/>
              <circle cx="14" cy="16.5" r="1.25" stroke="currentColor" strokeWidth="1.4"/>
            </svg>
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-ink text-bg text-[10px] font-medium rounded-full flex items-center justify-center px-1 leading-none">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </button>

          <Button href="/shop" variant="primary" size="sm">
            Shop now
          </Button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block h-px w-5 bg-ink transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block h-px w-5 bg-ink transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-5 bg-ink transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg border-t border-hairline px-6 py-6 flex flex-col gap-4">
          <button
            onClick={() => { setMenuOpen(false); setSearchOpen(true); }}
            className="flex items-center gap-3 text-[15px] font-medium text-muted border-b border-hairline pb-4 text-left cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Search
          </button>
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[15px] font-medium border-b border-hairline pb-4 ${active ? "text-ink" : "text-muted"}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/about"
            className={`text-[15px] font-medium ${pathname === "/about" ? "text-ink" : "text-muted"}`}
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
        </div>
      )}

      <CartDrawer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
