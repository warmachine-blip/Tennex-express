"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SlashLabel } from "@/components/ui/SlashLabel";
import Link from "next/link";

export function WhyTennex() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-[160px] border-t border-hairline"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6 max-w-[680px]"
        >
          <SlashLabel number="002" title="why Tennex" />

          <p className="text-h2 text-ink leading-tight">
            Real gear at real prices — no brand markup.
          </p>

          <p className="text-[16px] text-muted leading-relaxed">
            Tennis Warehouse sells the same frame for 3× what it costs to make. We cut out the brand
            tax by selling direct under our own label, sourced from the same factories that supply
            the big names. You get the gear. They keep the logo.{" "}
            <Link
              href="/about"
              className="text-ink underline underline-offset-4 hover:text-muted transition-colors"
            >
              See how it works
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
