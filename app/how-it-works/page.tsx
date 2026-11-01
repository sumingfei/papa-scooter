import type { Metadata } from "next";
import { BatteryCharging, ClipboardCheck, Headphones, Sparkles, Wrench } from "lucide-react";
import CtaBand from "@/components/home/CtaBand";
import HowItWorks from "@/components/home/HowItWorks";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Book online, we deliver and set up, then pick up when you're done. Here's how renting with Papa Scooter works.",
};

const care = [
  { icon: Wrench, title: "40-point inspection", text: "Brakes, tires, controls and frame checked by certified technicians before every rental." },
  { icon: Sparkles, title: "Hospital-grade cleaning", text: "Every surface is disinfected, then the scooter is sealed in a protective cover." },
  { icon: BatteryCharging, title: "Fully charged", text: "Batteries are load-tested and charged to 100% so you're ready to roll on arrival." },
  { icon: ClipboardCheck, title: "Personal walkthrough", text: "Our driver adjusts the fit and shows you driving, folding and charging." },
  { icon: Headphones, title: "Live support & swaps", text: "If anything goes wrong, just call us. We swap scooters within 3 hours in most areas." },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero eyebrow="How it works" title="Renting made refreshingly simple">
        From the first click to the final pickup, we take care of the details so you can enjoy the journey.
      </PageHero>
      <HowItWorks />
      <section className="bg-brand-50 py-24" aria-labelledby="care-heading">
        <div className="container-x">
          <SectionHeading eyebrow="The Papa Scooter standard" title={<span id="care-heading">Care that goes beyond the delivery</span>} />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {care.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 0.07} className="card p-6">
                <span className="grid size-12 place-items-center rounded-xl bg-coral-100 text-coral-700"><Icon className="size-6" aria-hidden /></span>
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <div className="pt-24"><CtaBand /></div>
    </>
  );
}
