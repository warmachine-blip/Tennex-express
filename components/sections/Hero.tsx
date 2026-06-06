"use client";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { ScarcityPill } from "@/components/ui/ScarcityPill";
import { TrustStrip } from "@/components/ui/TrustStrip";
import { Button } from "@/components/ui/Button";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.08 },
  }),
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-6 bg-bg"
    >
      <div className="max-w-[800px] mx-auto flex flex-col items-center text-center gap-8">
        {/* Scarcity pill */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <ScarcityPill />
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-hero text-ink"
        >
          All the tennis gear you need. Real prices.
        </motion.h1>

        {/* Subline */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-[17px] text-muted leading-relaxed max-w-[520px]"
        >
          Tennex Express sources direct from vetted manufacturers and ships from the US in 2 days. No brand tax.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Button href="/shop/racquets" variant="primary" size="lg">
            Shop racquets
          </Button>
          <Button href="#bundles" variant="ghost" size="lg">
            View pricing
          </Button>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <TrustStrip />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="h-8 w-px bg-hairline" />
        <span className="text-[11px] text-muted tracking-[0.08em] uppercase">scroll</span>
      </motion.div>
    </section>
  );
}
