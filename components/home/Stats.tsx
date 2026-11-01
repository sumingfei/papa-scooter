import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";

const stats = [
  { to: 12000, suffix: "+", label: "Rentals delivered", color: "text-brand-600" },
  { to: 2, suffix: "", label: "Cities served", color: "text-coral-600" },
  { to: 4.9, decimals: 1, suffix: "★", label: "Average rating", color: "text-amber-600" },
  { to: 7, suffix: " days", label: "Live support every week", color: "text-indigo-600" },
];

export default function Stats() {
  return (
    <section aria-label="Papa Scooter by the numbers" className="container-x -mt-12 relative z-10">
      <Reveal>
        <dl className="card grid grid-cols-2 divide-slate-100 p-6 sm:p-10 lg:grid-cols-4 lg:divide-x">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col px-4 py-4 text-center">
              <dt className="order-2 mt-1 font-semibold text-muted">{s.label}</dt>
              <dd className={`font-display text-4xl font-extrabold sm:text-5xl ${s.color}`}>
                <Counter to={s.to} decimals={s.decimals} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
