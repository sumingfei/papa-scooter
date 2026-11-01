import Link from "next/link";
import { Building2, MapPin, Plane, Ticket } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { locations } from "@/lib/data";

export default function LocationsStrip() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-coral-50 via-cream to-brand-50 py-24" aria-labelledby="loc-heading">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <SectionHeading center={false} eyebrow="Where we deliver" title={<span id="loc-heading">Waiting for you in Las Vegas and Dallas</span>}>
            Hotels, resorts, airports, convention centers and private homes. If you can give us an address, we&apos;ll be there.
          </SectionHeading>
          <ul className="-mt-4 space-y-3 font-semibold">
            <li className="flex items-center gap-3"><Building2 className="size-5 text-brand-600" aria-hidden /> 300+ partner hotels & resorts</li>
            <li className="flex items-center gap-3"><Ticket className="size-5 text-brand-600" aria-hidden /> Venue drop-off at convention centers & stadiums</li>
            <li className="flex items-center gap-3"><Plane className="size-5 text-brand-600" aria-hidden /> Meet-and-greet at major airports</li>
          </ul>
          <Link href="/locations" className="btn-brand mt-8">See all locations</Link>
        </div>
        <Reveal>
          <div className="relative rounded-[2rem] bg-brand-700 p-6 shadow-[var(--shadow-lift)] sm:p-8">
            <svg aria-hidden className="absolute inset-0 size-full opacity-20" viewBox="0 0 400 300" preserveAspectRatio="none">
              {Array.from({ length: 12 }, (_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 25} x2="400" y2={i * 25} stroke="#fff" strokeWidth="0.5" />
              ))}
              {Array.from({ length: 16 }, (_, i) => (
                <line key={`v${i}`} x1={i * 25} y1="0" x2={i * 25} y2="300" stroke="#fff" strokeWidth="0.5" />
              ))}
            </svg>
            <ul className="relative grid gap-4 sm:grid-cols-2">
              {locations.map((l) => (
                <li key={l.city} className="group rounded-2xl bg-white/95 p-5 transition hover:-translate-y-1 hover:bg-white">
                  <span className="flex items-center gap-2">
                    <span className="relative grid size-8 place-items-center">
                      {l.hub && <span className="absolute inset-0 animate-ping rounded-full bg-coral-400 opacity-40" />}
                      <MapPin className="relative size-5 text-coral-600" aria-hidden />
                    </span>
                    <span className="font-display font-bold text-ink">{l.city}</span>
                  </span>
                  <ul className="mt-2 space-y-1 text-sm text-muted">
                    {l.spots.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
