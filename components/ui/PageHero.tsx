import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function PageHero({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-14 pb-12 sm:pt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-drift absolute -top-40 right-0 size-[30rem] rounded-full bg-brand-100 blur-3xl" />
        <div className="absolute -left-20 top-10 size-80 rounded-full bg-coral-50 blur-3xl" />
      </div>
      <Reveal className="container-x max-w-3xl text-center">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl lg:text-6xl">{title}</h1>
        {children && <p className="mx-auto mt-5 max-w-2xl text-lg text-muted sm:text-xl">{children}</p>}
      </Reveal>
    </section>
  );
}
