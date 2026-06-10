"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SlashLabel } from "@/components/ui/SlashLabel";
import { ServiceCard } from "@/components/cards/ServiceCard";

const CATEGORIES = [
  {
    number: "001",
    category: "Racquets",
    headline: "Frames that play above their price",
    paragraph:
      "Aluminum and graphite frames for every stage — beginner-friendly oversize heads, intermediate control frames, and junior sizes in 21, 23, and 25 inches.",
    included: [
      "Adult racquets from $32",
      "Junior racquets from $26",
      "All pre-strung, head cover included",
      "Grip sizes 4 1/4 to 4 1/2",
    ],
    image: "https://img.tennis-warehouse.com/watermark/rs.php?path=HSPMP6-1.jpg&nw=600",
    href: "/shop/racquets",
  },
  {
    number: "002",
    category: "Strings & accessories",
    headline: "Restring less, pay less",
    paragraph:
      "200m poly and multifilament reels at a fraction of pro-shop pricing. Tacky overgrips, silicone dampeners, and wristband sets shipped the same day.",
    included: [
      "Poly and multifilament reels from $38",
      "Tacky overgrip 3-packs from $9",
      "Novelty dampener 4-packs at $8",
      "Band and headband sets",
    ],
    image: "https://img.tennis-warehouse.com/watermark/rs.php?path=ALUSTR-SI-1.jpg&nw=600",
    href: "/shop/strings",
  },
  {
    number: "003",
    category: "Bags & court",
    headline: "Carry more, spend less",
    paragraph:
      "Daily backpacks, 6-pack tour bags, ball hoppers, agility cones, and practice ball buckets. Everything for the court in one order.",
    included: [
      "Court backpack from $39",
      "6-pack tour bag at $55",
      "75-ball hopper at $45",
      "60-pack practice balls at $45",
    ],
    image: "https://img.tennis-warehouse.com/watermark/rs.php?path=BPD6R-1.jpg&nw=600",
    href: "/shop/bags",
  },
];

export function ShopByCategory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 md:py-[160px] border-t border-hairline">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 mb-12"
        >
          <SlashLabel number="003" title="shop by category" />
          <h2 className="text-h2 text-ink max-w-[500px]">
            Everything you need on court
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.number}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.09,
              }}
            >
              <ServiceCard {...cat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
