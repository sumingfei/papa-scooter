import Image from "next/image";
import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="Papa Scooter home">
      {light ? (
        <span className="relative grid size-12 place-items-center overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-soft)] ring-1 ring-slate-200 transition group-hover:rotate-[-6deg]">
          <Image src="/brand/logo-footer.png" alt="" width={144} height={144} className="size-full" />
        </span>
      ) : (
        <Image
          src="/brand/logo-header.png"
          alt=""
          width={109}
          height={144}
          className="h-12 w-auto transition group-hover:rotate-[-6deg]"
          priority
        />
      )}
      <span className="leading-none">
        <span className={`block font-display text-xl font-extrabold tracking-tight ${light ? "text-white" : "text-ink"}`}>
          Papa
        </span>
        <span className={`block text-[0.7rem] font-semibold tracking-[0.25em] uppercase ${light ? "text-brand-100" : "text-brand-600"}`}>
          Scooter
        </span>
      </span>
    </Link>
  );
}
