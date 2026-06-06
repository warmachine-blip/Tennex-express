"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SlashLabel } from "@/components/ui/SlashLabel";
import { ProcessCard } from "@/components/cards/ProcessCard";

const STEPS = [
  {
    number: "01",
    headline: "Source",
    description:
      "We vet Alibaba suppliers directly — factory audits, sample runs, and reference checks before any SKU makes the catalog.",
  },
  {
    number: "02",
    headline: "Test",
    description:
      "Every product goes through a paid sample run and independent QC inspection before we commit to inventory. If it fails, it stays off the site.",
  },
  {
    number: "03",
    headline: "Ship",
    description:
      "Stocked in our US warehouse and shipped within 1 business day. Standard delivery in 2 days. Free shipping on orders over $49.",
  },
];

export function HowWeSource() {
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
          <SlashLabel number="004" title="how we source" />
          <h2 className="text-h2 text-ink max-w-[500px]">
            Factory to your door, no middleman
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.09,
              }}
            >
              <ProcessCard {...step} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
