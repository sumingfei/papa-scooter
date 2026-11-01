import { CalendarDays, MapPin } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import Reveal from "@/components/ui/Reveal";
import { formatPrice, products, wheelLabel } from "@/lib/data";

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const rows: [string, (p: (typeof products)[number]) => string][] = [
  ["Type", (p) => wheelLabel(p)],
  ["Daily / weekly", (p) => `${formatPrice(p.dailyPrice)} / ${formatPrice(p.weeklyPrice)}`],
  ["Range per charge", (p) => `${p.specs.range_km} km`],
  ["Top speed", (p) => `${p.specs.top_speed_kmh} km/h`],
  ["Max rider weight", (p) => `${p.specs.max_user_weight_kg} kg`],
  ["Scooter weight", (p) => `${p.specs.weight_kg} kg`],
  ["Folds for trunk storage", (p) => (p.specs.folded ? "Yes" : "No")],
  ["Best for", (p) => p.idealFor.join(", ")],
];

export default function Catalog({ city, start, end }: { city?: string; start?: string; end?: string }) {
  const params = new URLSearchParams();
  if (city) params.set("city", city);
  if (start) params.set("start", start);
  if (end) params.set("end", end);
  const query = params.size ? `?${params.toString()}` : "";

  return (
    <section className="container-x pb-12" aria-label="Rental lineup">
      {(city || start) && (
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl bg-brand-600 px-6 py-4 text-white">
          <span className="font-semibold">Showing availability</span>
          {city && <span className="inline-flex items-center gap-2"><MapPin className="size-4 text-sun-300" aria-hidden /> {city}</span>}
          {start && end && (
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4 text-sun-300" aria-hidden /> {formatDate(start)} – {formatDate(end)}
            </span>
          )}
          <span className="ml-auto rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">✓ Both scooters available</span>
        </div>
      )}

      <ul className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        {products.map((p, i) => (
          <Reveal as="li" key={p.id} delay={i * 0.08}>
            <ProductCard product={p} query={query} />
          </Reveal>
        ))}
      </ul>

      <Reveal className="mx-auto mt-16 max-w-4xl">
        <h2 className="text-3xl font-extrabold">Side by side</h2>
        <div className="card mt-6 overflow-x-auto">
          <table className="w-full text-left">
            <caption className="sr-only">Voyager 4 and Breeze 3 compared</caption>
            <thead>
              <tr className="border-b border-slate-100">
                <td className="px-5 py-4" />
                {products.map((p) => (
                  <th key={p.id} scope="col" className="px-5 py-4 font-display text-lg font-bold">{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, value], i) => (
                <tr key={label} className={i % 2 ? "" : "bg-slate-50"}>
                  <th scope="row" className="px-5 py-3.5 font-semibold text-muted">{label}</th>
                  {products.map((p) => (
                    <td key={p.id} className="px-5 py-3.5 font-semibold">{value(p)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}
