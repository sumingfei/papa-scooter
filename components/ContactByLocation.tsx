"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import ContactForm from "@/components/ContactForm";
import { locations } from "@/lib/data";

type Location = (typeof locations)[number];

// Stylised street maps: desert grid for Las Vegas, the Trinity River for Dallas.
function CityMap({ loc }: { loc: Location }) {
  const vegas = loc.city === "Las Vegas";
  return (
    <div className="relative h-56 overflow-hidden rounded-[var(--radius-card)]" role="img" aria-label={`Map showing our ${loc.city} office`}>
      <svg className="absolute inset-0 size-full" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <rect width="400" height="220" fill={vegas ? "#fdf0d9" : "#d5f2ec"} />
        {vegas ? (
          <>
            <circle cx="340" cy="40" r="60" fill="#f6dcb0" />
            <path d="M0 190 Q60 170 120 185 T260 180 T400 175 V220 H0Z" fill="#efcf9c" />
          </>
        ) : (
          <path d="M0 170 Q90 120 170 160 T330 120 T400 90 V120 Q340 150 300 160 T180 190 T0 205Z" fill="#a5d8f3" />
        )}
        <path d="M0 60 H400 M0 130 H400 M80 0 V220 M200 0 V220 M320 0 V220" stroke="#fff" strokeWidth="10" />
        <path d="M0 95 H400 M140 0 V220 M260 0 V220" stroke="#fff" strokeWidth="5" />
      </svg>
      <span className="absolute top-[40%] left-[42%] flex -translate-x-1/2 -translate-y-full flex-col items-center">
        <span className="rounded-full bg-white px-3 py-1 text-sm font-bold shadow">Papa Scooter {loc.city}</span>
        <MapPin className="size-10 fill-coral-500 text-coral-700" aria-hidden />
      </span>
    </div>
  );
}

export default function ContactByLocation({ initialCity }: { initialCity?: string }) {
  const [city, setCity] = useState(locations.some((l) => l.city === initialCity) ? initialCity! : locations[0].city);
  const loc = locations.find((l) => l.city === city)!;

  const choose = (next: string) => {
    setCity(next);
    const url = new URL(window.location.href);
    url.searchParams.set("city", next);
    window.history.replaceState(null, "", url);
  };

  const channels = [
    { icon: Phone, title: `Call ${loc.city}`, value: loc.phone, href: loc.phoneHref },
    { icon: Mail, title: "Email", value: loc.email, href: `mailto:${loc.email}` },
    { icon: Clock, title: "Delivery hours", value: loc.hours },
    { icon: MapPin, title: `${loc.city} office`, value: loc.address },
  ];

  return (
    <section className="container-x pb-12">
      <fieldset className="mx-auto mb-10 max-w-xl">
        <legend className="mb-3 w-full text-center font-display text-lg font-bold">Choose your location</legend>
        <div className="grid grid-cols-2 gap-2 rounded-full bg-white p-1.5 shadow-[var(--shadow-soft)]">
          {locations.map((l) => (
            <label
              key={l.city}
              className={`flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-4 font-semibold transition has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-sun-400 ${
                l.city === city ? "bg-brand-600 text-white" : "text-ink hover:bg-brand-50"
              }`}
            >
              <input type="radio" name="contact-city" value={l.city} checked={l.city === city} onChange={() => choose(l.city)} className="sr-only" />
              <MapPin className="size-5" aria-hidden /> {l.city}, {l.state}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4" aria-live="polite">
          {channels.map(({ icon: Icon, title, value, href }) => (
            <div key={title} className="card flex items-center gap-4 p-5">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-600 text-white"><Icon className="size-6" aria-hidden /></span>
              <div>
                <p className="text-sm font-semibold text-muted">{title}</p>
                {href ? <a href={href} className="font-display text-lg font-bold text-brand-700 hover:underline">{value}</a> : <p className="font-semibold">{value}</p>}
              </div>
            </div>
          ))}
          <CityMap loc={loc} />
        </div>
        <ContactForm key={loc.city} city={loc.city} />
      </div>
    </section>
  );
}
