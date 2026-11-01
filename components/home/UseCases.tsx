import { Building2, HeartPulse, PartyPopper, Ticket, Users } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { useCases } from "@/lib/data";

const icons = { Building2, Ticket, HeartPulse, Users, PartyPopper };

export default function UseCases() {
  return (
    <section className="relative bg-brand-800 py-24 text-white" aria-labelledby="uses-heading">
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 right-10 size-80 rounded-full bg-brand-600/50 blur-3xl" />
        <div className="absolute bottom-0 left-10 size-72 rounded-full bg-coral-500/20 blur-3xl" />
      </div>
      <div className="container-x relative">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow bg-white/10 text-sun-300">Made for real life</span>
          <h2 id="uses-heading" className="mt-4 text-3xl font-extrabold sm:text-4xl lg:text-[2.6rem]">
            Wherever life takes you, we&apos;ll get you there
          </h2>
          <p className="mt-4 text-lg text-brand-100">Short trips, long recoveries and once-in-a-lifetime moments.</p>
        </Reveal>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {useCases.map((u, i) => {
            const Icon = icons[u.icon as keyof typeof icons];
            return (
              <Reveal as="li" key={u.title} delay={i * 0.08} className="group rounded-[var(--radius-card)] border border-white/10 bg-white/5 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/10">
                <span className="grid size-14 place-items-center rounded-2xl text-white transition group-hover:scale-110 group-hover:rotate-6" style={{ background: u.color }}>
                  <Icon className="size-7" aria-hidden />
                </span>
                <h3 className="mt-5 text-xl font-bold">{u.title}</h3>
                <p className="mt-2 text-[0.95rem] text-brand-100">{u.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
