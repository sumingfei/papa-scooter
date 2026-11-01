"use client";

import Link from "next/link";
import { CalendarDays, Check, Headphones, Info, ShieldCheck, Truck } from "lucide-react";
import { useMemo, useState } from "react";
import { type AddOn, type Product, FREE_DELIVERY_DAYS, daysBetween, formatPrice, isoDate, locations, quote } from "@/lib/data";

export default function BookingPanel({
  product,
  addOns,
  initialStart,
  initialEnd,
  initialCity,
}: {
  product: Product;
  addOns: AddOn[];
  initialStart?: string;
  initialEnd?: string;
  initialCity?: string;
}) {
  const [start, setStart] = useState(initialStart ?? isoDate(3));
  const [end, setEnd] = useState(initialEnd ?? isoDate(10));
  const [city, setCity] = useState(initialCity ?? "");
  const [selected, setSelected] = useState<string[]>([]);

  const days = daysBetween(start, end);
  const q = useMemo(() => quote(product, days, selected), [product, days, selected]);

  const href = `/checkout?${new URLSearchParams({
    product: product.slug,
    start,
    end,
    ...(city ? { city } : {}),
    ...(selected.length ? { addons: selected.join(",") } : {}),
  }).toString()}`;

  return (
    <div className="card overflow-hidden">
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-5 text-white">
        <p className="text-sm font-semibold text-brand-100">Reserve your {product.name}</p>
        <p className="mt-1">
          <span className="font-display text-4xl font-extrabold">{formatPrice(product.dailyPrice)}</span>
          <span className="text-brand-100"> / day</span>
        </p>
      </div>
      <form className="space-y-5 p-6" onSubmit={(e) => e.preventDefault()} aria-label="Booking options">
        <fieldset className="grid grid-cols-2 gap-3">
          <legend className="label flex items-center gap-1.5"><CalendarDays className="size-4 text-brand-600" aria-hidden /> Rental dates</legend>
          <div>
            <label htmlFor="bp-start" className="text-xs font-semibold text-muted">Delivery</label>
            <input
              id="bp-start"
              type="date"
              className="field"
              min={isoDate(0)}
              value={start}
              onChange={(e) => {
                setStart(e.target.value);
                if (e.target.value >= end) setEnd(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="bp-end" className="text-xs font-semibold text-muted">Pickup</label>
            <input id="bp-end" type="date" className="field" min={start} value={end} onChange={(e) => setEnd(e.target.value)} />
          </div>
        </fieldset>

        <div>
          <label htmlFor="bp-city" className="label">Delivery city</label>
          <select id="bp-city" className="field" value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Select a city</option>
            {locations.map((l) => (
              <option key={l.city} value={l.city}>{l.city}, {l.state}</option>
            ))}
          </select>
        </div>

        {addOns.length > 0 && (
          <fieldset>
            <legend className="label">Add-ons</legend>
            <div className="space-y-2">
              {addOns.map((a) => {
                const on = selected.includes(a.id);
                return (
                  <label
                    key={a.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-3 transition ${on ? "border-brand-500 bg-brand-50" : "border-slate-200 hover:border-brand-200"}`}
                  >
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => setSelected((s) => (on ? s.filter((x) => x !== a.id) : [...s, a.id]))}
                      className="mt-1 size-5 accent-brand-600"
                    />
                    <span className="flex-1">
                      <span className="flex justify-between font-semibold">
                        {a.name} <span className="text-brand-700">+{formatPrice(a.dailyPrice)}/day</span>
                      </span>
                      <span className="block text-sm text-muted">{a.description}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}

        <dl className="space-y-2 rounded-2xl bg-slate-50 p-4 text-[0.95rem]" aria-live="polite">
          <div className="flex justify-between">
            <dt>{product.name} × {days} {days === 1 ? "day" : "days"}</dt>
            <dd className="font-semibold">{formatPrice(q.rental)}</dd>
          </div>
          {q.savings > 0 && (
            <div className="flex justify-between text-brand-700">
              <dt>Multi-day savings</dt>
              <dd className="font-semibold">−{formatPrice(q.savings)}</dd>
            </div>
          )}
          {q.extras.map((e) => (
            <div key={e.id} className="flex justify-between">
              <dt>{e.name}</dt>
              <dd className="font-semibold">{formatPrice(e.total)}</dd>
            </div>
          ))}
          <div className="flex justify-between">
            <dt>Delivery & pickup</dt>
            <dd className="font-semibold">{q.delivery === 0 ? <span className="text-brand-700">FREE</span> : formatPrice(q.delivery)}</dd>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-2 font-display text-lg font-extrabold">
            <dt>Estimated total</dt>
            <dd>{formatPrice(q.subtotal)}</dd>
          </div>
          <p className="flex items-center gap-1.5 text-xs text-muted"><Info className="size-3.5" aria-hidden /> Taxes calculated at checkout.</p>
        </dl>

        {days < FREE_DELIVERY_DAYS && (
          <p className="rounded-xl bg-sun-100 px-4 py-3 text-sm font-semibold text-amber-900">
            Rent {FREE_DELIVERY_DAYS - days} more {FREE_DELIVERY_DAYS - days === 1 ? "day" : "days"} to unlock free delivery!
          </p>
        )}

        <Link href={href} className="btn-primary w-full text-lg">Continue to booking</Link>
        <ul className="space-y-2 text-sm text-muted">
          <li className="flex items-center gap-2"><Check className="size-4 text-brand-600" aria-hidden /> Free cancellation up to 48 hours before</li>
          <li className="flex items-center gap-2"><Truck className="size-4 text-brand-600" aria-hidden /> Delivered charged with a hands-on walkthrough</li>
          <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-brand-600" aria-hidden /> Sanitized & sealed before every rental</li>
          <li className="flex items-center gap-2"><Headphones className="size-4 text-brand-600" aria-hidden /> Live support during your rental</li>
        </ul>
      </form>
    </div>
  );
}
