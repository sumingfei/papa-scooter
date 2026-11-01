import type { Metadata } from "next";
import { Heart, Leaf, Smile, Users } from "lucide-react";
import CtaBand from "@/components/home/CtaBand";
import Stats from "@/components/home/Stats";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About Us",
  description: "Papa Scooter exists so everyone can join the adventure. Meet the team behind the wheels.",
};

const values = [
  { icon: Heart, title: "Dignity first", text: "We design every interaction around respect, independence and choice." },
  { icon: Smile, title: "Joy in motion", text: "Mobility isn't medical to us. It's beach days, birthdays and bucket lists." },
  { icon: Users, title: "Caregivers welcome", text: "We support the families and friends who make the trip happen." },
  { icon: Leaf, title: "Built to last", text: "Rent instead of buy: well-maintained equipment, shared by thousands." },
];

const team = [
  { name: "Elena Vargas", role: "Founder & CEO", color: "#0f766e" },
  { name: "Marcus Chen", role: "Head of Operations", color: "#f97362" },
  { name: "Aisha Johnson", role: "Customer Care Lead", color: "#6366f1" },
  { name: "Tom Becker", role: "Chief Technician", color: "#f59e0b" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Our story" title="Everyone deserves to join the adventure">
        Papa Scooter started when our founder couldn&apos;t find a reliable scooter for her grandmother&apos;s first trip to the
        ocean in 20 years. Today we&apos;ve helped tens of thousands of people say yes to the trip.
      </PageHero>
      <section className="container-x pb-24">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 0.08} className="card p-7 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-brand-600 text-white"><Icon className="size-7" aria-hidden /></span>
              <h2 className="mt-5 text-xl font-bold">{title}</h2>
              <p className="mt-2 text-muted">{text}</p>
            </Reveal>
          ))}
        </ul>
      </section>
      <Stats />
      <section className="container-x py-24" aria-labelledby="team-heading">
        <SectionHeading eyebrow="The team" title={<span id="team-heading">The people behind the wheels</span>} />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal as="li" key={m.name} delay={i * 0.08} className="card overflow-hidden text-center">
              <div className="grid h-44 place-items-center" style={{ background: `${m.color}1a` }}>
                <span className="grid size-24 place-items-center rounded-full font-display text-3xl font-extrabold text-white shadow-lg" style={{ background: m.color }} aria-hidden>
                  {m.name.split(" ").map((w) => w[0]).join("")}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold">{m.name}</h3>
                <p className="text-muted">{m.role}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
