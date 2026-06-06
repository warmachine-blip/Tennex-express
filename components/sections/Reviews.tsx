"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { SlashLabel } from "@/components/ui/SlashLabel";
import { ReviewCard } from "@/components/cards/ReviewCard";

const REVIEWS = [
  {
    rating: 5,
    quote:
      "Got the Rally 100 for my daughter — she's been playing for 3 months and already wants to upgrade. This frame held up fine and didn't kill my wallet while she figured things out.",
    author: "Maria S.",
    role: "Tennis parent, Austin TX",
    avatar: "https://picsum.photos/seed/review-1/72/72",
  },
  {
    rating: 5,
    quote:
      "The overgrips are genuinely as good as the Wilson ones I was buying at twice the price. Ordered 3 six-packs and they'll last me all season.",
    author: "James R.",
    role: "Intermediate player, Chicago IL",
    avatar: "https://picsum.photos/seed/review-2/72/72",
  },
  {
    rating: 5,
    quote:
      "Shipped in 2 days, arrived well packaged, and the bag is better than the stock photo. Using it daily.",
    author: "Priya K.",
    role: "Club player, New York NY",
    avatar: "https://picsum.photos/seed/review-3/72/72",
  },
  {
    rating: 4.8,
    quote:
      "Rally Pro is a solid step up from the beginner frame. Strung a bit lower and it plays closer to a $200 stick. Recommended for anyone in the intermediate range.",
    author: "Tom B.",
    role: "USTA 4.0, Seattle WA",
    avatar: "https://picsum.photos/seed/review-4/72/72",
  },
  {
    rating: 5,
    quote:
      "I coach 12 kids on weekends and ordered 3 junior starter kits at once. Turnaround was fast, everything was labeled correctly, and the sticker packs were a surprise hit.",
    author: "Coach Danielle H.",
    role: "Junior coach, Atlanta GA",
    avatar: "https://picsum.photos/seed/review-5/72/72",
  },
];

export function Reviews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    startX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    e.preventDefault();
    const x = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    if (trackRef.current)
      trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5;
  };
  const onMouseUp = () => { dragging.current = false; };

  return (
    <section ref={ref} className="py-20 md:py-[160px] border-t border-hairline">
      <div className="max-w-[1280px] mx-auto px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4"
        >
          <SlashLabel number="007" title="reviews" />
          <h2 className="text-h2 text-ink max-w-[500px]">
            What players are saying
          </h2>
        </motion.div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto px-6 pb-4 drag-scroll"
        style={{ scrollbarWidth: "none" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {REVIEWS.map((review, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.09 }}
          >
            <ReviewCard {...review} className="max-w-[360px]" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
