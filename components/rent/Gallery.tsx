"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ProductArt from "@/components/ui/ProductArt";
import type { Product } from "@/lib/data";

const views = [
  { label: "Studio", bg: "from-brand-50 via-white to-coral-50", flip: false, zoom: 1 },
  { label: "Outdoors", bg: "from-sky-100 via-emerald-50 to-lime-100", flip: true, zoom: 1 },
  { label: "Detail", bg: "from-sun-100 via-white to-coral-50", flip: false, zoom: 1.6 },
];

export default function Gallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const v = views[active];
  return (
    <div>
      <div className={`relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-gradient-to-br ${v.bg} shadow-[var(--shadow-soft)]`}>
        {active === 1 && (
          <svg aria-hidden className="absolute bottom-0 w-full text-emerald-200" viewBox="0 0 400 80" preserveAspectRatio="none">
            <path fill="currentColor" d="M0 40 Q100 10 200 35 T400 30 V80 H0Z" />
          </svg>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-[8%]"
          >
            <div className="size-full" style={{ transform: `scaleX(${v.flip ? -1 : 1}) scale(${v.zoom})` }}>
              <ProductArt variant={product.art} accent={product.accent} className="size-full" title={`${product.name}, ${v.label.toLowerCase()} view`} />
            </div>
          </motion.div>
        </AnimatePresence>
        <span className="absolute top-5 left-5 rounded-full bg-white/90 px-4 py-1.5 text-sm font-bold text-brand-700 shadow">
          Sanitized & ready
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3" role="tablist" aria-label="Product views">
        {views.map((view, i) => (
          <button
            key={view.label}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br ${view.bg} ring-offset-2 transition ${
              i === active ? "ring-3 ring-coral-500" : "opacity-80 hover:opacity-100"
            }`}
          >
            <span className="absolute inset-[10%]" style={{ transform: `scaleX(${view.flip ? -1 : 1}) scale(${view.zoom})` }}>
              <ProductArt variant={product.art} accent={product.accent} className="size-full" />
            </span>
            <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-bold">{view.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
