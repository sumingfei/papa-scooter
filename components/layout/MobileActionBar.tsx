import Link from "next/link";
import { CalendarCheck, Phone } from "lucide-react";
import { PHONE_HREF } from "@/lib/data";

export default function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-8px_24px_-12px_rgb(15_23_42/0.2)] backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a href={PHONE_HREF} className="btn-ghost w-full">
          <Phone className="size-5" aria-hidden /> Call us
        </a>
        <Link href="/rent" className="btn-primary w-full">
          <CalendarCheck className="size-5" aria-hidden /> Book
        </Link>
      </div>
    </div>
  );
}
