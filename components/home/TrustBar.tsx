import { BadgeCheck, Headphones, ShieldCheck, Truck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const items = [
  { icon: Truck, title: "Delivery & pickup", text: "Hotels, homes, airports and venues" },
  { icon: ShieldCheck, title: "Sanitized every time", text: "Hospital-grade cleaning between rentals" },
  { icon: Headphones, title: "Live, real humans", text: "Phone support from your local team" },
  { icon: BadgeCheck, title: "Fully insured", text: "Optional $0-deposit damage protection" },
];

export default function TrustBar() {
  return (
    <section aria-label="Why Papa Scooter" className="container-x">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }, i) => (
          <Reveal as="li" key={title} delay={i * 0.08} className="flex h-full items-start gap-4 rounded-2xl border border-slate-200/70 bg-white/70 p-5">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-600 text-white">
                <Icon className="size-6" aria-hidden />
              </span>
              <span>
                <span className="block font-display text-lg font-bold">{title}</span>
                <span className="text-[0.95rem] text-muted">{text}</span>
              </span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
