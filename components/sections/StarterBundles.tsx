"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SlashLabel } from "@/components/ui/SlashLabel";
import { PricingCard } from "@/components/cards/PricingCard";

const BUNDLES = [
  {
    tier: "Beginner kit",
    audience: "For players picking up their first racquet",
    price: 79,
    compareAt: 180,
    items: [
      "Rally 100 aluminum racquet (27\")",
      "3 x Tennex Tack overgrip",
      "Novelty dampener 4-pack",
      "6 x practice balls",
      "Court backpack",
    ],
    featured: false,
    href: "/shop",
  },
  {
    tier: "Intermediate kit",
    audience: "For players ready to level up their gear",
    price: 149,
    compareAt: 400,
    items: [
      "Rally Pro graphite composite racquet",
      "Tour 6-pack bag",
      "Spin Poly 1.25 reel (200m)",
      "Tack overgrip 6-pack",
      "Novelty dampener 4-pack",
      "Wristband + headband set",
    ],
    featured: true,
    href: "/shop",
  },
  {
    tier: "Coach kit",
    audience: "For coaches running group sessions",
    price: 349,
    compareAt: 750,
    items: [
      "Ball hopper 75-pack",
      "Practice balls 60-pack bucket",
      "Agility cones set of 12",
      "2 × Rally 100 aluminum racquets",
      "Spin Poly reel (200m)",
      "6 × Tack overgrip packs",
    ],
    featured: false,
    href: "/shop",
  },
];

export function StarterBundles() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="bundles" ref={ref} className="py-20 md:py-[160px] border-t border-hairline">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 mb-12"
        >
          <SlashLabel number="008" title="starter bundles" />
          <h2 className="text-h2 text-ink max-w-[500px]">
            Everything you need, bundled and priced right
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {BUNDLES.map((bundle, i) => (
            <motion.div
              key={bundle.tier}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.09,
              }}
            >
              <PricingCard {...bundle} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
