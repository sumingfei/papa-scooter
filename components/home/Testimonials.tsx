"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Stars from "@/components/ui/Stars";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = testimonials[index];
  const go = (d: number) => setIndex((i) => (i + d + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => go(1), 7000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="container-x py-24" aria-labelledby="reviews-heading">
      <SectionHeading eyebrow="Real stories" title={<span id="reviews-heading">Smiles, miles and memories</span>} />
      <div
        className="relative mx-auto max-w-4xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div aria-hidden className="absolute -inset-4 -z-10 rotate-[-2deg] rounded-[2rem] bg-gradient-to-br from-coral-100 via-sun-100 to-brand-100" />
        <div className="card relative min-h-[22rem] overflow-hidden p-8 sm:p-12" aria-live="polite">
          <Quote className="absolute top-6 right-8 size-24 text-brand-50" aria-hidden />
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="relative"
            >
              <Stars rating={t.rating} size="size-6" />
              <blockquote className="mt-5 font-display text-xl leading-relaxed font-semibold text-ink sm:text-2xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="grid size-14 place-items-center rounded-full font-display text-lg font-bold text-white" style={{ background: t.color }} aria-hidden>
                  {t.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
                <span>
                  <span className="block font-bold">{t.name}</span>
                  <span className="text-muted">{t.location} · rented the {t.product}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button type="button" onClick={() => go(-1)} aria-label="Previous review" className="grid size-12 place-items-center rounded-full border-2 border-slate-200 bg-white hover:border-brand-600">
            <ChevronLeft aria-hidden />
          </button>
          <div className="flex gap-2">
            {testimonials.map((r, i) => (
              <button
                key={r.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show review from ${r.name}`}
                aria-current={i === index}
                className="grid size-6 place-items-center"
              >
                <span className={`block h-2.5 rounded-full transition-all ${i === index ? "w-8 bg-coral-600" : "w-2.5 bg-slate-300"}`} />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Next review" className="grid size-12 place-items-center rounded-full bg-brand-600 text-white hover:bg-brand-700">
            <ChevronRight aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
