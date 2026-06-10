"use client";

import { CartProvider } from "@/contexts/CartContext";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { PageTransition } from "@/components/ui/PageTransition";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <PageTransition>{children}</PageTransition>
      <ScrollToTop />
    </CartProvider>
  );
}
