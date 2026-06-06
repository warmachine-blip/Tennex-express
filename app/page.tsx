import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyBottomCTA } from "@/components/layout/StickyBottomCTA";
import { Hero } from "@/components/sections/Hero";
import { BestsellerRail } from "@/components/sections/BestsellerRail";
import { Marquee } from "@/components/ui/Marquee";
import { WhyTennex } from "@/components/sections/WhyTennex";
import { ShopByCategory } from "@/components/sections/ShopByCategory";
import { HowWeSource } from "@/components/sections/HowWeSource";
import { StatRow } from "@/components/ui/StatRow";
import { FeaturedCollections } from "@/components/sections/FeaturedCollections";
import { WhyShopWithUs } from "@/components/sections/WhyShopWithUs";
import { Reviews } from "@/components/sections/Reviews";
import { StarterBundles } from "@/components/sections/StarterBundles";
import { FAQs } from "@/components/sections/FAQs";

export const metadata: Metadata = {
  title: "Real tennis gear, real prices — Tennex Express",
  description:
    "Affordable tennis racquets, strings, bags, balls, and accessories for beginner and intermediate players. Sourced direct, ships in 2 days.",
  openGraph: {
    title: "Tennex Express — Real tennis gear, real prices",
    description:
      "Affordable tennis equipment for beginners and intermediate players. Sourced direct, ships in 2 days.",
  },
};

const STATS_1 = [
  { value: "1,200+", numeric: 1200, label: "Players served" },
  { value: "4.9/5", label: "Average rating" },
  { value: "99%", numeric: 99, label: "On-time shipping" },
  { value: "60%", numeric: 60, label: "Avg savings vs MSRP" },
];

const STATS_2 = [
  { value: "8+", label: "Years in tennis" },
  { value: "99%", numeric: 99, label: "Satisfaction" },
  { value: "1,200+", numeric: 1200, label: "Happy players" },
  { value: "$2M+", label: "Saved vs MSRP" },
];

const MARQUEE_ITEMS = [
  "Racquets",
  "Strings",
  "Bags",
  "Balls",
  "Overgrips",
  "Court gear",
  "Junior",
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tennex Express",
  url: "https://tennexexpress.com",
  description: "Affordable tennis equipment for beginners and intermediate players.",
  sameAs: [
    "https://instagram.com/tennexexpress",
    "https://tiktok.com/@tennexexpress",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <Header />
      <main className="flex flex-col">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Bestseller rail */}
        <BestsellerRail />

        {/* 3. Category marquee */}
        <Marquee items={MARQUEE_ITEMS} />

        {/* 4. Why Tennex */}
        <WhyTennex />

        {/* 5. Shop by category */}
        <ShopByCategory />

        {/* 6. How we source */}
        <HowWeSource />

        {/* 7. Stats strip */}
        <StatRow stats={STATS_1} />

        {/* 8. Featured collections */}
        <FeaturedCollections />

        {/* 9. Why shop with us */}
        <WhyShopWithUs />

        {/* 10. Reviews */}
        <Reviews />

        {/* 11. Stats strip again */}
        <StatRow stats={STATS_2} />

        {/* 12. Starter bundles */}
        <StarterBundles />

        {/* 13. FAQs */}
        <FAQs />
      </main>

      <Footer />
      <StickyBottomCTA />
    </>
  );
}
