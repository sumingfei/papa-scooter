import Link from "next/link";
import ProductArt from "@/components/ui/ProductArt";

export default function NotFound() {
  return (
    <section className="container-x py-24 text-center">
      <ProductArt variant="scooter-3" accent="#f97362" className="animate-float mx-auto h-48 w-64" />
      <h1 className="mt-6 text-5xl font-extrabold">Oops, wrong turn!</h1>
      <p className="mt-4 text-lg text-muted">We couldn&apos;t find that page, but we can get you back on track.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn-primary">Go home</Link>
        <Link href="/rent" className="btn-ghost">Browse rentals</Link>
      </div>
    </section>
  );
}
