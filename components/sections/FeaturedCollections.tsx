"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SlashLabel } from "@/components/ui/SlashLabel";
import { CollectionCard } from "@/components/cards/CollectionCard";

const COLLECTIONS = [
  {
    name: "Beginner kit",
    category: "Starter bundle",
    image: "https://img.tennis-warehouse.com/watermark/rs.php?path=WU1005-1.jpg&nw=600",
    href: "/shop/racquets",
  },
  {
    name: "Intermediate kit",
    category: "Upgrade bundle",
    image: "https://img.tennis-warehouse.com/watermark/rs.php?path=WB9810-1.jpg&nw=600",
    href: "/shop/racquets",
  },
  {
    name: "Restring kit",
    category: "Strings & tools",
    image: "https://img.tennis-warehouse.com/watermark/rs.php?path=ALUSTR-SI-1.jpg&nw=600",
    href: "/shop/strings",
  },
  {
    name: "Coach kit",
    category: "Court equipment",
    image: "https://img.tennis-warehouse.com/watermark/rs.php?path=ELITE2R-1.jpg&nw=600",
    href: "/shop/machines",
  },
];

export function FeaturedCollections() {
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
          <SlashLabel number="005" title="featured collections" />
          <h2 className="text-h2 text-ink max-w-[500px]">
            Built for every stage of the game
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {COLLECTIONS.map((col, i) => (
            <motion.div
              key={col.name}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.09,
              }}
            >
              <CollectionCard {...col} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
