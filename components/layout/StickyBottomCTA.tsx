"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function StickyBottomCTA() {
  const [visible, setVisible] = useState(false);
  const footerRef = useRef<Element | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const hero = document.getElementById("hero");
      const heroBottom = hero ? hero.getBoundingClientRect().bottom + scrollY : 800;
      const past = scrollY > heroBottom;

      const footer = document.querySelector("footer");
      if (footer) footerRef.current = footer;
      const nearFooter = footer
        ? footer.getBoundingClientRect().top < window.innerHeight + 200
        : false;

      setVisible(past && !nearFooter);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-ink text-bg rounded-full px-7 py-3.5 text-[14px] font-medium hover:bg-ink-soft transition-colors duration-200 shadow-none"
          >
            Shop now →
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
