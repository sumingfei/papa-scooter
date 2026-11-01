import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { PHONE, PHONE_HREF, locations } from "@/lib/data";

export const metadata: Metadata = {
  title: "Locations",
  description: "Papa Scooter delivers to hotels, homes, airports and convention centers in Las Vegas and Dallas.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHero eyebrow="Locations" title="We'll meet you where you're going">
        Delivery to hotels, vacation rentals, homes, airports and convention centers across Las Vegas and Dallas.
      </PageHero>
      <section className="container-x pb-16">
        <ul className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {locations.map((l, i) => (
            <Reveal as="li" key={l.city} delay={i * 0.08} className="card group relative overflow-hidden p-7 transition hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
              <div aria-hidden className="absolute -top-10 -right-10 size-32 rounded-full bg-brand-50 transition group-hover:scale-125" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-xl bg-coral-100 text-coral-700"><MapPin className="size-6" aria-hidden /></span>
                  {l.hub && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-sun-100 px-3 py-1 text-xs font-bold text-amber-900">
                      <Star className="size-3.5 fill-current" aria-hidden /> Same-day hub
                    </span>
                  )}
                </div>
                <h2 className="mt-5 text-2xl font-bold">{l.city}, {l.state}</h2>
                <ul className="mt-3 space-y-1.5 text-muted">
                  {l.spots.map((s) => <li key={s}>• {s}</li>)}
                </ul>
                <Link href={`/rent?city=${encodeURIComponent(l.city)}`} className="btn-brand mt-6 w-full">
                  Rent in {l.city}
                </Link>
              </div>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-12 rounded-[2rem] bg-brand-700 p-8 text-center text-white sm:p-12">
          <h2 className="text-3xl font-extrabold">Outside Las Vegas or Dallas?</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">
            We work with trusted partners across the country. Call us and we&apos;ll find a way to get you rolling.
          </p>
          <a href={PHONE_HREF} className="btn-primary mt-6">Call {PHONE}</a>
        </Reveal>
      </section>
    </>
  );
}
