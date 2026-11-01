"use client";

import { useRouter } from "next/navigation";
import { CalendarDays, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { isoDate, locations } from "@/lib/data";

export default function BookingWidget() {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [start, setStart] = useState(isoDate(3));
  const [end, setEnd] = useState(isoDate(7));

  return (
    <form
      aria-label="Check availability"
      className="card relative z-10 grid gap-4 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-[1.3fr_1fr_1fr_auto] lg:items-end"
      onSubmit={(e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (city) params.set("city", city);
        params.set("start", start);
        params.set("end", end);
        router.push(`/rent?${params.toString()}`);
      }}
    >
      <div className="sm:col-span-2 lg:col-span-1">
        <label htmlFor="bw-city" className="label flex items-center gap-1.5">
          <MapPin className="size-4 text-brand-600" aria-hidden /> Location
        </label>
        <select id="bw-city" className="field" value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Choose a city</option>
          {locations.map((l) => (
            <option key={l.city} value={l.city}>{l.city}, {l.state}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="bw-start" className="label flex items-center gap-1.5">
          <CalendarDays className="size-4 text-brand-600" aria-hidden /> Start date
        </label>
        <input
          id="bw-start"
          type="date"
          className="field"
          min={isoDate(0)}
          value={start}
          onChange={(e) => {
            setStart(e.target.value);
            if (e.target.value > end) setEnd(e.target.value);
          }}
          required
        />
      </div>
      <div>
        <label htmlFor="bw-end" className="label flex items-center gap-1.5">
          <CalendarDays className="size-4 text-brand-600" aria-hidden /> End date
        </label>
        <input id="bw-end" type="date" className="field" min={start} value={end} onChange={(e) => setEnd(e.target.value)} required />
      </div>
      <button type="submit" className="btn-primary h-12 sm:col-span-2 lg:col-span-1">
        <Search className="size-5" aria-hidden /> Check availability
      </button>
    </form>
  );
}
