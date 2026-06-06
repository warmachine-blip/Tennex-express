"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SlashLabel } from "@/components/ui/SlashLabel";
import { Accordion } from "@/components/ui/Accordion";

const FAQS = [
  {
    question: "How fast does my order ship?",
    answer:
      "Orders placed before 3 PM ET on business days ship the same day from our US warehouse. Standard delivery is 2 business days. We don't dropship — we hold the inventory ourselves, so there are no delays from a third-party seller.",
  },
  {
    question: "What's your return policy?",
    answer:
      "30-day free returns on all orders. If you're not happy with your purchase for any reason, email us for a prepaid return label. No restocking fees. Refunds are processed within 3–5 business days.",
  },
  {
    question: "How do I choose the right racquet grip size?",
    answer:
      "Measure from the bottom of your palm to the tip of your ring finger. Under 4 inches → 4 1/8. 4–4.25 inches → 4 1/4. 4.25–4.5 inches → 4 3/8. If you're between sizes, go smaller — it's easier to build up a grip than to cut it down. Our sizing guide has photos.",
  },
  {
    question: "Can you restring my racquet?",
    answer:
      "We don't currently offer a restringing service, but we do sell 200m reels of poly and multifilament string at prices that make pro-shop restrings look like a scam. A reel will restring 15–20 racquets. We'll publish a beginner restringing guide in the blog.",
  },
  {
    question: "What size racquet does my kid need?",
    answer:
      "Ages 4–6: 19–21 inch. Ages 6–8: 23 inch. Ages 8–10: 25 inch. Ages 10–12: 26 inch. Over 12, many kids can use an adult 27 inch frame at a reduced weight. When in doubt, go one size smaller — a shorter frame is much easier to swing than one that's too long.",
  },
  {
    question: "Do you restock sold-out items?",
    answer:
      "Yes. Most items restock within 2–4 weeks. You can sign up for restock alerts on any sold-out product page. Items marked 'restock soon' are already on order.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently US only. We're looking at Canada as the first international market — sign up for the newsletter to hear when that launches.",
  },
  {
    question: "Do you offer gift cards?",
    answer:
      "Not yet, but it's on the roadmap. If you need to buy gear as a gift right now, place the order with the recipient's address and we'll pack it clean — no invoice in the box.",
  },
];

export function FAQs() {
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
          <SlashLabel number="009" title="FAQs" />
          <h2 className="text-h2 text-ink max-w-[500px]">
            Common questions
          </h2>
        </motion.div>

        <div className="max-w-[780px]">
          <Accordion items={FAQS} />
        </div>
      </div>
    </section>
  );
}
