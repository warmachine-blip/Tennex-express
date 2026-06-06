"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Racquets", href: "/shop/racquets" },
  { label: "Strings", href: "/shop/strings" },
  { label: "Bags", href: "/shop/bags" },
  { label: "Balls", href: "/shop/balls" },
  { label: "Accessories", href: "/shop/accessories" },
  { label: "Junior", href: "/shop/junior" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/95 backdrop-blur-sm border-b border-hairline"
          : "bg-transparent"
      }`}
    >
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
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-muted hover:text-ink transition-colors duration-150 px-3 py-2 rounded-full hover:bg-hairline/50"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/about"
            className="hidden md:block text-[13px] font-medium text-muted hover:text-ink transition-colors duration-150"
          >
            About
          </Link>
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg border-t border-hairline px-6 py-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-ink border-b border-hairline pb-4"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/about"
            className="text-[15px] font-medium text-muted"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
        </div>
      )}
    </header>
  );
}
