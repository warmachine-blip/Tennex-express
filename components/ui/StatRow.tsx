"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Stat {
  value: string;     // "1,200+" or "4.9/5" — raw display string
  numeric?: number;  // for counter animation; omit if not numeric
  label: string;
}

interface StatRowProps {
  stats: Stat[];
  className?: string;
}

function AnimatedNumber({ value, numeric }: { value: string; numeric?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayed, setDisplayed] = useState("0");

  useEffect(() => {
    if (!isInView || numeric === undefined) {
      setDisplayed(value);
      return;
    }
    const start = Date.now();
    const duration = 1400;
    const raf = requestAnimationFrame(function tick() {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numeric);
      setDisplayed(value.replace(/[\d,]+/, current.toLocaleString()));
      if (progress < 1) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [isInView, numeric, value]);

  return <span ref={ref}>{displayed}</span>;
}

export function StatRow({ stats, className = "" }: StatRowProps) {
  return (
    <div
      className={`flex flex-wrap items-stretch divide-x divide-hairline border-y border-hairline ${className}`}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className="flex-1 min-w-[160px] flex flex-col items-center justify-center gap-1 px-8 py-8"
        >
          <span className="text-stat-number text-ink">
            <AnimatedNumber value={stat.value} numeric={stat.numeric} />
          </span>
          <span className="text-slash-label text-muted tracking-[0.06em] text-center">
            // {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
