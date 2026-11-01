"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import { PHONE, PHONE_HREF } from "@/lib/data";

const nav = [
  { href: "/rent", label: "Rent" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/locations", label: "Locations" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 shadow-[var(--shadow-soft)] backdrop-blur-md" : "bg-cream/80 backdrop-blur-sm"
      }`}
    >
      <div className="hidden bg-brand-800 text-sm text-brand-50 md:block">
        <div className="container-x flex h-11 items-center">
          <p>
            <span className="font-semibold text-sun-300">Free delivery & pickup</span> on rentals of 3+ days · Sanitized every time
          </p>
        </div>
      </div>
      <div className="container-x flex h-20 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-full px-4 py-2.5 font-semibold transition hover:bg-brand-50 hover:text-brand-700 ${
                      active ? "text-brand-700" : "text-ink"
                    }`}
                  >
                    {item.label}
                    {active && <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-coral-500" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <a href={PHONE_HREF} className="hidden items-center gap-2 font-bold text-brand-700 xl:flex">
            <span className="grid size-10 place-items-center rounded-full bg-brand-100">
              <Phone className="size-4" aria-hidden />
            </span>
            <span>
              <span className="block text-xs font-medium text-muted">Call us</span>
              {PHONE}
            </span>
          </a>
          <Link href="/rent" className="btn-primary hidden sm:inline-flex">
            Book Now
          </Link>
          <button
            type="button"
            className="grid size-12 place-items-center rounded-full border-2 border-slate-200 bg-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-100 bg-white lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x py-4">
              <ul className="space-y-1">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="block rounded-xl px-4 py-3 text-lg font-semibold hover:bg-brand-50">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
