"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className = "" }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={`divide-y divide-hairline border-y border-hairline ${className}`}>
      {items.map((item, i) => (
        <div key={i}>
          <button
            className="w-full flex items-center justify-between py-5 text-left gap-4 group"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="text-h3 text-ink">{item.question}</span>
            <span
              className="flex-shrink-0 h-8 w-8 rounded-full border border-hairline flex items-center justify-center transition-all duration-200 group-hover:border-ink"
              aria-hidden
            >
              <span
                className="text-lg text-muted transition-transform duration-280"
                style={{
                  display: "block",
                  transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                +
              </span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                className="overflow-hidden"
              >
                <p className="pb-5 text-muted leading-relaxed">{item.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
