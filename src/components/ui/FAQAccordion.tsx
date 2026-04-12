"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FAQItem {
  q: string;
  a: string;
  category?: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={idx}
            className={`bg-white border rounded-xl overflow-hidden editorial-shadow transition-all duration-300 ${
              isOpen ? "border-tertiary/40" : "border-outline-variant/10"
            }`}
          >
            <button
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="w-full flex items-center justify-between p-6 text-left group"
              aria-expanded={isOpen}
            >
              {item.category && (
                <span className="font-display text-[9px] uppercase tracking-widest text-tertiary mr-4 flex-shrink-0">
                  {item.category}
                </span>
              )}
              <h3 className="font-serif text-lg text-primary group-hover:text-tertiary transition-colors flex-1 pr-4">
                {item.q}
              </h3>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="material-symbols-outlined text-tertiary flex-shrink-0 select-none"
              >
                keyboard_arrow_down
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-on-surface-variant leading-relaxed">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
