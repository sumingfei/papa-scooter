import Link from "next/link";
import { CheckCircle2, Clock, ShieldCheck, Sparkles, Star, Truck } from "lucide-react";
import ProductArt from "@/components/ui/ProductArt";
import Reveal from "@/components/ui/Reveal";
import BookingWidget from "./BookingWidget";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 lg:pb-24">
      {/* Decorative blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-drift absolute -top-32 -right-32 size-[34rem] rounded-full bg-brand-200/50 blur-3xl" />
        <div className="animate-drift absolute top-40 -left-40 size-[28rem] rounded-full bg-coral-100 blur-3xl [animation-delay:-5s]" />
        <div className="absolute right-1/3 bottom-0 size-64 rounded-full bg-sun-100 blur-3xl" />
      </div>

      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <Reveal>
          <span className="eyebrow">
            <Sparkles className="size-4" aria-hidden /> Rated 4.9 by 2,000+ happy riders
          </span>
          <h1 className="mt-6 text-[2.6rem] leading-[1.05] font-extrabold text-ink sm:text-6xl lg:text-[4.1rem]">
            Freedom to move,{" "}
            <span className="relative whitespace-nowrap text-brand-600">
              delivered
              <svg className="absolute -bottom-2 left-0 w-full text-coral-500" viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden>
                <path d="M3 12C70 4 200 2 297 9" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
              </svg>
            </span>{" "}
            to your door.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
            Comfortable mobility scooters, cleaned, charged and dropped off at your hotel, home or
            venue in Las Vegas and Dallas. Go further, your way.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-semibold text-ink">
            {["Free delivery 3+ days", "No prescription needed", "Cancel free up to 48h"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-brand-600" aria-hidden /> {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/rent" className="btn-primary px-8 text-lg">Browse rentals</Link>
            <Link href="/how-it-works" className="btn-ghost px-8 text-lg">How it works</Link>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative mx-auto w-full max-w-xl">
          <div className="relative aspect-square">
            <div className="absolute inset-[6%] rounded-[42%_58%_55%_45%/48%_42%_58%_52%] bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 shadow-[var(--shadow-lift)]" />
            <div className="absolute inset-[6%] overflow-hidden rounded-[42%_58%_55%_45%/48%_42%_58%_52%]">
              <div className="absolute -right-10 -bottom-16 size-72 rounded-full bg-white/10" />
              <div className="absolute top-10 left-10 size-24 rounded-full bg-sun-400/30" />
              <svg className="absolute bottom-0 w-full text-brand-900/30" viewBox="0 0 400 120" aria-hidden>
                <path fill="currentColor" d="M0 70 Q100 30 200 60 T400 50 V120 H0Z" />
              </svg>
            </div>
            <div className="animate-float absolute inset-[14%] drop-shadow-2xl">
              <ProductArt variant="scooter-4" accent="#f97362" className="size-full" title="Papa Scooter Voyager 4 mobility scooter" />
            </div>

            <div className="animate-float absolute top-[6%] -left-2 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-[var(--shadow-lift)] [animation-delay:-2s] sm:-left-6">
              <span className="grid size-11 place-items-center rounded-xl bg-coral-100 text-coral-600">
                <Truck className="size-6" aria-hidden />
              </span>
              <span className="text-sm leading-tight">
                <span className="block font-bold text-ink">Delivered to your hotel</span>
                <span className="text-muted">Today, 2:30 pm</span>
              </span>
            </div>
            <div className="animate-float absolute right-0 bottom-[12%] rounded-2xl bg-white p-4 shadow-[var(--shadow-lift)] [animation-delay:-4s] sm:-right-4">
              <span className="flex items-center gap-1 text-sun-400">
                {Array.from({ length: 5 }, (_, i) => <Star key={i} className="size-4 fill-current" aria-hidden />)}
              </span>
              <span className="mt-1 block font-display text-2xl font-extrabold text-ink">4.9 / 5</span>
              <span className="text-sm text-muted">from 2,140 reviews</span>
            </div>
            <div className="absolute top-[60%] -left-2 flex items-center gap-2 rounded-full bg-sun-400 px-4 py-2 text-sm font-bold text-ink shadow-lg sm:-left-6">
              <ShieldCheck className="size-4" aria-hidden /> Sanitized & sealed
            </div>
            <div className="absolute top-[18%] right-[2%] hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-700 shadow-lg sm:flex">
              <Clock className="size-4" aria-hidden /> Live support
            </div>
          </div>
        </Reveal>
      </div>

      <div className="container-x mt-12 lg:mt-4">
        <Reveal delay={0.25}>
          <BookingWidget />
        </Reveal>
      </div>
    </section>
  );
}
