import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, FileText, Sparkles } from "lucide-react";
import BookingPanel from "@/components/rent/BookingPanel";
import Gallery from "@/components/rent/Gallery";
import ProductCard from "@/components/ui/ProductCard";
import Reveal from "@/components/ui/Reveal";
import Stars from "@/components/ui/Stars";
import { addOns, formatPrice, getProduct, products, wheelLabel } from "@/lib/data";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: `${p.name} Rental: ${formatPrice(p.dailyPrice)}/day`,
    description: `${p.tagline}. ${p.description.slice(0, 120)}…`,
    openGraph: { title: `Rent the ${p.name} | Papa Scooter` },
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const sp = await searchParams;
  const others = products.filter((p) => p.id !== product.id);
  const { specs } = product;

  const specRows = [
    ["Range per charge", specs.range_km ? `${specs.range_km} km` : "Not powered"],
    ["Top speed", specs.top_speed_kmh ? `${specs.top_speed_kmh} km/h` : "—"],
    ["Max rider weight", specs.max_user_weight_kg ? `${specs.max_user_weight_kg} kg` : "—"],
    ["Scooter weight", `${specs.weight_kg} kg`],
    ["Folds for trunk storage", specs.folded ? "Yes" : "No"],
    ["Battery", specs.battery_type ?? "None required"],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: "Mobility scooter",
    brand: { "@type": "Brand", name: "Papa Scooter" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount },
    offers: { "@type": "Offer", priceCurrency: "USD", price: product.dailyPrice, availability: "https://schema.org/InStock" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-x pt-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
            <li><Link href="/" className="hover:text-brand-700 hover:underline">Home</Link></li>
            <li aria-hidden><ChevronRight className="size-4" /></li>
            <li><Link href="/rent" className="hover:text-brand-700 hover:underline">Rent</Link></li>
            <li aria-hidden><ChevronRight className="size-4" /></li>
            <li aria-current="page" className="font-semibold text-ink">{product.name}</li>
          </ol>
        </nav>
      </div>

      <section className="container-x grid gap-10 py-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
        <div>
          <Gallery product={product} />
          <Reveal className="mt-10">
            <p className="text-sm font-bold tracking-wider text-brand-600 uppercase">{wheelLabel(product)}</p>
            <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">{product.name}</h1>
            <p className="mt-2 text-xl text-muted">{product.tagline}</p>
            <p className="mt-3 flex items-center gap-2">
              <Stars rating={product.rating} size="size-5" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-muted">({product.reviewCount} reviews)</span>
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { label: "Daily", price: product.dailyPrice, note: "" },
                { label: "Weekly", price: product.weeklyPrice, note: `Save ${Math.round((1 - product.weeklyPrice / (product.dailyPrice * 7)) * 100)}%` },
                { label: "Monthly", price: product.monthlyPrice, note: `Save ${Math.round((1 - product.monthlyPrice / (product.dailyPrice * 30)) * 100)}%` },
              ].map((t) => (
                <div key={t.label} className="rounded-2xl border-2 border-slate-200 bg-white p-4 text-center">
                  <p className="text-sm font-semibold text-muted">{t.label}</p>
                  <p className="font-display text-2xl font-extrabold">{formatPrice(t.price)}</p>
                  {t.note && <p className="mt-1 inline-block rounded-full bg-coral-100 px-2 py-0.5 text-xs font-bold text-coral-700">{t.note}</p>}
                </div>
              ))}
            </div>
            <p className="mt-8 text-lg">{product.description}</p>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Reveal>
              <h2 className="text-2xl font-bold">What&apos;s included</h2>
              <ul className="mt-4 space-y-3">
                {product.includedItems.map((i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-600 text-white"><Check className="size-4" aria-hidden /></span>
                    {i}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-2xl font-bold">Ideal for</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {product.idealFor.map((i) => (
                  <li key={i} className="inline-flex items-center gap-1.5 rounded-full bg-sun-100 px-4 py-2 font-semibold text-amber-900">
                    <Sparkles className="size-4" aria-hidden /> {i}
                  </li>
                ))}
              </ul>
              <a href="#" className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-700 underline-offset-4 hover:underline">
                <FileText className="size-5" aria-hidden /> Download user guide (PDF)
              </a>
            </Reveal>
          </div>

          <Reveal className="mt-12">
            <h2 className="text-2xl font-bold">Specifications</h2>
            <table className="card mt-4 w-full overflow-hidden text-left">
              <caption className="sr-only">{product.name} specifications</caption>
              <tbody>
                {specRows.map(([k, v], i) => (
                  <tr key={k} className={i % 2 ? "bg-slate-50" : ""}>
                    <th scope="row" className="px-5 py-3.5 font-semibold text-muted">{k}</th>
                    <td className="px-5 py-3.5 font-semibold">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>

        <div>
          <div className="lg:sticky lg:top-36">
            <BookingPanel
              product={product}
              addOns={addOns.filter((a) => product.addOns.includes(a.id))}
              initialStart={sp.start}
              initialEnd={sp.end}
              initialCity={sp.city}
            />
          </div>
        </div>
      </section>

      <section className="container-x py-16" aria-labelledby="related-heading">
        <h2 id="related-heading" className="mb-8 text-3xl font-extrabold">Also in the fleet</h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((p) => (
            <li key={p.id}><ProductCard product={p} /></li>
          ))}
        </ul>
      </section>
    </>
  );
}
