import { MousePointerClick, PartyPopper, Truck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export const steps = [
  {
    icon: MousePointerClick,
    title: "Choose your ride",
    text: "Browse online or call a mobility specialist. Pick your dates and add extras like a spare battery or canopy.",
    color: "bg-coral-100 text-coral-700",
  },
  {
    icon: Truck,
    title: "We deliver & set up",
    text: "We bring it to your hotel, home or venue, fully charged, and show you exactly how everything works.",
    color: "bg-brand-100 text-brand-700",
  },
  {
    icon: PartyPopper,
    title: "Enjoy, then we pick up",
    text: "Explore with confidence and live support. When you're done, we collect it from where you are. No return trip needed.",
    color: "bg-sun-100 text-amber-700",
  },
];

export default function HowItWorks() {
  return (
    <section className="container-x py-24" aria-labelledby="how-heading">
      <SectionHeading eyebrow="How it works" title={<span id="how-heading">Rolling in three easy steps</span>}>
        No paperwork marathons and no pickup counters. We handle the logistics so you can focus on the fun.
      </SectionHeading>
      <ol className="relative grid gap-8 md:grid-cols-3">
        <svg className="absolute top-10 right-[16%] left-[16%] hidden h-6 md:block" viewBox="0 0 600 24" preserveAspectRatio="none" aria-hidden>
          <path d="M0 12 Q150 -8 300 12 T600 12" fill="none" stroke="#a9e3d9" strokeWidth="3" strokeDasharray="8 10" />
        </svg>
        {steps.map(({ icon: Icon, title, text, color }, i) => (
          <Reveal as="li" key={title} delay={i * 0.12} className="relative text-center">
              <span className={`relative mx-auto grid size-20 place-items-center rounded-[1.6rem] ${color} shadow-[var(--shadow-soft)]`}>
                <Icon className="size-9" aria-hidden />
                <span className="absolute -top-2 -right-2 grid size-8 place-items-center rounded-full bg-ink font-display text-sm font-bold text-white">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-6 text-2xl font-bold">{title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-muted">{text}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
