import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { products } from "@/lib/data";

export default function Featured() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-cream py-24" aria-labelledby="featured-heading">
      <div className="container-x">
        <SectionHeading eyebrow="Meet the fleet" title={<span id="featured-heading">Two scooters, zero guesswork</span>}>
          The steady four-wheel Voyager 4 or the nimble three-wheel Breeze 3. Each one is serviced, sanitized and fully charged.
        </SectionHeading>
        <ul className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {products.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 0.08}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <Link href="/rent" className="btn-brand px-8">Compare side by side</Link>
        </div>
      </div>
    </section>
  );
}
