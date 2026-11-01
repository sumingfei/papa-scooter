import Link from "next/link";
import { BatteryCharging, Gauge, Weight } from "lucide-react";
import { type Product, formatPrice, wheelLabel } from "@/lib/data";
import ProductArt from "./ProductArt";
import Stars from "./Stars";

export default function ProductCard({ product, query = "" }: { product: Product; query?: string }) {
  const { specs } = product;
  const chips = [
    specs.range_km && { icon: BatteryCharging, label: `${specs.range_km} km range` },
    specs.top_speed_kmh && { icon: Gauge, label: `${specs.top_speed_kmh} km/h` },
    specs.max_user_weight_kg > 0 && { icon: Weight, label: `Up to ${specs.max_user_weight_kg} kg` },
  ].filter(Boolean) as { icon: typeof Gauge; label: string }[];

  return (
    <article className="card group relative flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]">
      <div className="relative bg-gradient-to-br from-brand-50 via-white to-coral-50 px-6 pt-6">
        <ProductArt variant={product.art} accent={product.accent} className="mx-auto h-44 w-full transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold tracking-wider text-brand-600 uppercase">{wheelLabel(product)}</p>
        <h3 className="mt-1 text-xl font-bold">
          <Link href={`/rent/${product.slug}${query}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-[0.95rem] text-muted">{product.tagline}</p>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted">
          <Stars rating={product.rating} /> <span className="font-semibold text-ink">{product.rating}</span> ({product.reviewCount})
        </div>
        {chips.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {chips.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                <Icon className="size-3.5 text-brand-600" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-6">
          <p>
            <span className="font-display text-2xl font-extrabold text-ink">{formatPrice(product.dailyPrice)}</span>
            <span className="text-sm text-muted">/day</span>
            <span className="block text-xs text-muted">{formatPrice(product.weeklyPrice)}/week</span>
          </p>
          <span className="whitespace-nowrap rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-coral-600">
            View & book
          </span>
        </div>
      </div>
    </article>
  );
}
