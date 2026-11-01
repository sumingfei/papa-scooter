import Link from "next/link";
import { Phone } from "lucide-react";
import ProductArt from "@/components/ui/ProductArt";
import Reveal from "@/components/ui/Reveal";
import { PHONE, PHONE_HREF } from "@/lib/data";

export default function CtaBand() {
  return (
    <section className="container-x">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-coral-700 via-coral-600 to-[#d9533c] px-6 py-14 text-white sm:px-14">
          <div aria-hidden className="absolute -top-20 -right-20 size-80 rounded-full bg-white/15" />
          <div aria-hidden className="absolute -bottom-24 left-1/3 size-64 rounded-full bg-white/10" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 className="text-3xl font-extrabold text-white sm:text-5xl [text-shadow:0_2px_12px_rgb(0_0_0/0.15)]">
                Your next adventure starts with a click.
              </h2>
              <p className="mt-4 max-w-xl text-lg font-medium text-white">
                Book in under 3 minutes, or talk to a friendly specialist who&apos;ll help you choose.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/rent" className="btn bg-ink px-8 text-lg text-white hover:-translate-y-0.5 hover:bg-black">
                  Book now
                </Link>
                <a href={PHONE_HREF} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-lg font-semibold text-coral-700 transition hover:-translate-y-0.5">
                  <Phone className="size-5" aria-hidden /> {PHONE}
                </a>
              </div>
            </div>
            <ProductArt variant="scooter-3" accent="#0f766e" className="animate-float mx-auto hidden h-64 w-full lg:block" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
