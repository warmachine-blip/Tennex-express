"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SlashLabel } from "@/components/ui/SlashLabel";
import { BenefitCard } from "@/components/cards/BenefitCard";

const BENEFITS = [
  {
    number: "01",
    headline: "Honest prices",
    description: "We publish our landed cost per unit so you can see exactly what you're saving vs the incumbents.",
  },
  {
    number: "02",
    headline: "Fast 2-day shipping",
    description: "Stocked in the US, shipped within 1 business day. Standard orders arrive in 2 days.",
  },
  {
    number: "03",
    headline: "Free overgrip every order",
    description: "Every order ships with a free Tennex Tack overgrip. At $0.20 unit cost, it's our best loyalty move.",
  },
  {
    number: "04",
    headline: "Real player reviews",
    description: "Reviews are from verified buyers only. We don't curate or remove negative feedback.",
  },
  {
    number: "05",
    headline: "No-fuss returns",
    description: "30-day free returns on all orders. No restocking fees. Print the label, drop it off, done.",
  },
  {
    number: "06",
    headline: "Owned, not dropshipped",
    description: "We hold the inventory ourselves. No third-party seller surprises, no substitutions, no delays.",
  },
];

export function WhyShopWithUs() {
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
          <SlashLabel number="006" title="why shop with us" />
          <h2 className="text-h2 text-ink max-w-[500px]">
            Six reasons players keep coming back
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit.number}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.09,
              }}
            >
              <BenefitCard {...benefit} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
