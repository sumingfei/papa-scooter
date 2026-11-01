import Link from "next/link";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { PHONE, PHONE_HREF } from "@/lib/data";
import NewsletterForm from "./NewsletterForm";

const columns = [
  {
    title: "Rent",
    links: [
      { href: "/rent/voyager-4-mobility-scooter", label: "Voyager 4" },
      { href: "/rent/breeze-3-mobility-scooter", label: "Breeze 3" },
      { href: "/rent", label: "Compare scooters" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/locations", label: "Locations" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
      { href: "/accessibility", label: "Accessibility statement" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-brand-900 pb-28 text-brand-50 md:pb-0">
      <svg className="absolute -top-px left-0 w-full text-cream" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden>
        <path fill="currentColor" d="M0 0h1440v20c-240 40-480 40-720 20S240 0 0 30z" />
      </svg>
      <div className="container-x grid gap-12 pt-24 pb-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-brand-100">
            Premium mobility rentals delivered to your door or hotel in Las Vegas and Dallas, so you can go further, your way.
          </p>
          <ul className="mt-6 space-y-3 text-brand-100">
            <li>
              <a href={PHONE_HREF} className="inline-flex items-center gap-3 font-semibold text-white hover:text-sun-300">
                <Phone className="size-5 text-sun-300" aria-hidden /> {PHONE}
              </a>
            </li>
            <li>
              <a href="mailto:hello@papascooter.com" className="inline-flex items-center gap-3 hover:text-white">
                <Mail className="size-5 text-sun-300" aria-hidden /> hello@papascooter.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="size-5 text-sun-300" aria-hidden /> Deliveries 9am–9pm
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-5 text-sun-300" aria-hidden /> Las Vegas, NV &amp; Dallas, TX
            </li>
          </ul>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-lg font-bold text-white">{col.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-brand-100 transition hover:text-white hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <h2 className="text-lg font-bold text-white">Get travel tips & offers</h2>
          <p className="mt-2 text-brand-100">Accessible travel guides and 10% off your first rental.</p>
          <NewsletterForm />
          <div className="mt-8 flex gap-3">
            {[
              { Icon: Facebook, label: "Facebook" },
              { Icon: Instagram, label: "Instagram" },
              { Icon: Youtube, label: "YouTube" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={`Papa Scooter on ${label}`}
                className="grid size-12 place-items-center rounded-full bg-white/10 transition hover:-translate-y-0.5 hover:bg-coral-600"
              >
                <Icon className="size-5" aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-6 text-sm text-brand-200">
          <p>© {new Date().getFullYear()} Papa Scooter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
