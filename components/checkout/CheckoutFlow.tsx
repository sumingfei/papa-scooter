"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Lock, MapPin, PartyPopper, Phone } from "lucide-react";
import { type FormEvent, useMemo, useRef, useState } from "react";
import ProductArt from "@/components/ui/ProductArt";
import {
  PHONE,
  PHONE_HREF,
  daysBetween,
  formatPrice,
  getProduct,
  isoDate,
  locations,
  quote,
} from "@/lib/data";

const STEPS = ["Rental details", "Your info", "Delivery", "Review & confirm"];

const deliveryTypes = [
  { id: "hotel", label: "Hotel / resort" },
  { id: "home", label: "Home / vacation rental" },
  { id: "venue", label: "Convention center / venue" },
  { id: "airport", label: "Airport" },
];

const windows = ["9am – 12pm", "12pm – 3pm", "3pm – 6pm", "6pm – 9pm"];

function fmt(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-semibold text-coral-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function CheckoutFlow() {
  const sp = useSearchParams();
  const product = getProduct(sp.get("product") ?? "");
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const headingRef = useRef<HTMLHeadingElement>(null);

  const [form, setForm] = useState({
    start: sp.get("start") ?? isoDate(3),
    end: sp.get("end") ?? isoDate(10),
    addons: (sp.get("addons") ?? "").split(",").filter(Boolean),
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    forSomeoneElse: false,
    riderName: "",
    riderPhone: "",
    city: sp.get("city") ?? "",
    deliveryType: "hotel",
    address: "",
    window: windows[1],
    notes: "",
    agree: false,
  });
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  const days = daysBetween(form.start, form.end);
  const q = useMemo(() => (product ? quote(product, days, form.addons) : null), [product, days, form.addons]);

  if (!product || !q) {
    return (
      <section className="container-x py-24 text-center">
        <h1 className="text-4xl font-extrabold">Let&apos;s pick your ride first</h1>
        <p className="mt-4 text-lg text-muted">Your booking is empty. Pick a scooter to get started.</p>
        <Link href="/rent" className="btn-primary mt-8">Browse rentals</Link>
      </section>
    );
  }

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!form.start) e.start = "Choose a delivery date.";
      if (!form.end || form.end < form.start) e.end = "Pickup must be after delivery.";
    }
    if (s === 1) {
      if (!form.firstName.trim()) e.firstName = "Please enter your first name.";
      if (!form.lastName.trim()) e.lastName = "Please enter your last name.";
      if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address.";
      if (form.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a phone number with area code.";
      if (form.forSomeoneElse && !form.riderName.trim()) e.riderName = "Who will be riding?";
    }
    if (s === 2) {
      if (!form.city) e.city = "Choose a delivery city.";
      if (form.address.trim().length < 5) e.address = "Enter the delivery address or hotel name.";
    }
    if (s === 3 && !form.agree) e.agree = "Please accept the rental terms to continue.";
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => document.getElementById(Object.keys(e)[0])?.focus());
      return false;
    }
    return true;
  };

  const next = (e: FormEvent) => {
    e.preventDefault();
    if (!validate(step)) return;
    if (step === STEPS.length - 1) {
      setDone(`PS-${Math.random().toString(36).slice(2, 6).toUpperCase()}${Date.now().toString().slice(-4)}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const err = (k: string) => (errors[k] ? { "aria-invalid": true, "aria-describedby": `${k}-error` } : {});

  if (done) {
    return (
      <section className="container-x max-w-2xl py-20 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="mx-auto grid size-28 place-items-center rounded-full bg-brand-600 shadow-[var(--shadow-lift)]"
        >
          <svg viewBox="0 0 52 52" className="size-16" aria-hidden>
            <motion.path
              d="M14 27 L22 35 L38 17"
              fill="none"
              stroke="#fff"
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
          </svg>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h1 className="mt-8 text-4xl font-extrabold sm:text-5xl">You&apos;re all set, {form.firstName}!</h1>
          <p className="mt-4 text-lg text-muted">
            We&apos;ve sent a confirmation to <strong className="text-ink">{form.email}</strong>. A specialist will call
            the day before delivery to confirm your time.
          </p>
          <div className="card mt-8 p-6 text-left">
            <p className="text-sm font-semibold text-muted">Booking reference</p>
            <p className="font-display text-3xl font-extrabold tracking-wider text-brand-700">{done}</p>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div><dt className="text-sm text-muted">Equipment</dt><dd className="font-semibold">{product.name}</dd></div>
              <div><dt className="text-sm text-muted">Total</dt><dd className="font-semibold">${q.total.toFixed(2)}</dd></div>
              <div><dt className="text-sm text-muted">Delivery</dt><dd className="font-semibold">{fmt(form.start)}, {form.window}</dd></div>
              <div><dt className="text-sm text-muted">Pickup</dt><dd className="font-semibold">{fmt(form.end)}</dd></div>
              <div className="sm:col-span-2"><dt className="text-sm text-muted">Address</dt><dd className="font-semibold">{form.address}, {form.city}</dd></div>
            </dl>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-brand"><PartyPopper className="size-5" aria-hidden /> Back to home</Link>
            <a href={PHONE_HREF} className="btn-ghost"><Phone className="size-5" aria-hidden /> {PHONE}</a>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="container-x py-10 sm:py-14">
      <h1 className="text-3xl font-extrabold sm:text-4xl">Complete your booking</h1>

      <ol className="mt-8 grid grid-cols-4 gap-2" aria-label="Checkout progress">
        {STEPS.map((s, i) => {
          const state = i < step ? "done" : i === step ? "current" : "todo";
          return (
            <li key={s} aria-current={state === "current" ? "step" : undefined}>
              <button
                type="button"
                disabled={i > step}
                onClick={() => setStep(i)}
                className="group w-full text-left disabled:cursor-default"
              >
                <span className="relative block h-2 overflow-hidden rounded-full bg-slate-200">
                  <motion.span
                    className="absolute inset-y-0 left-0 rounded-full bg-brand-600"
                    initial={false}
                    animate={{ width: state === "todo" ? "0%" : "100%" }}
                    transition={{ duration: 0.4 }}
                  />
                </span>
                <span className={`mt-2 flex items-center gap-1.5 text-sm font-semibold ${state === "todo" ? "text-muted" : "text-ink"}`}>
                  <span className={`grid size-6 shrink-0 place-items-center rounded-full text-xs ${state === "done" ? "bg-brand-600 text-white" : state === "current" ? "bg-coral-600 text-white" : "bg-slate-200"}`}>
                    {state === "done" ? <Check className="size-3.5" aria-hidden /> : i + 1}
                  </span>
                  <span className="hidden sm:inline">{s}</span>
                  <span className="sr-only">{state === "done" ? "(completed)" : state === "todo" ? "(not started)" : ""}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <form onSubmit={next} noValidate className="card p-6 sm:p-8">
          <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold outline-none">
            Step {step + 1}: {STEPS[step]}
          </h2>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
              className="mt-6 space-y-5"
            >
              {step === 0 && (
                <>
                  <div className="flex items-center gap-4 rounded-2xl bg-brand-50 p-4">
                    <ProductArt variant={product.art} accent={product.accent} className="h-20 w-24 shrink-0" />
                    <div>
                      <p className="font-display text-lg font-bold">{product.name}</p>
                      <p className="text-sm text-muted">{product.tagline}</p>
                      <Link href={`/rent/${product.slug}`} className="text-sm font-semibold text-brand-700 underline">Change scooter or add-ons</Link>
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="start" label="Delivery date" error={errors.start}>
                      <input id="start" type="date" className="field" min={isoDate(0)} value={form.start} onChange={(e) => set("start", e.target.value)} {...err("start")} />
                    </Field>
                    <Field id="end" label="Pickup date" error={errors.end}>
                      <input id="end" type="date" className="field" min={form.start} value={form.end} onChange={(e) => set("end", e.target.value)} {...err("end")} />
                    </Field>
                  </div>
                  <p className="text-muted">That&apos;s <strong className="text-ink">{days} {days === 1 ? "day" : "days"}</strong> of freedom. 🎉</p>
                </>
              )}

              {step === 1 && (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="firstName" label="First name" error={errors.firstName}>
                      <input id="firstName" autoComplete="given-name" className="field" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} {...err("firstName")} />
                    </Field>
                    <Field id="lastName" label="Last name" error={errors.lastName}>
                      <input id="lastName" autoComplete="family-name" className="field" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} {...err("lastName")} />
                    </Field>
                    <Field id="email" label="Email" error={errors.email}>
                      <input id="email" type="email" autoComplete="email" className="field" value={form.email} onChange={(e) => set("email", e.target.value)} {...err("email")} />
                    </Field>
                    <Field id="phone" label="Mobile phone" error={errors.phone}>
                      <input id="phone" type="tel" autoComplete="tel" className="field" value={form.phone} onChange={(e) => set("phone", e.target.value)} {...err("phone")} />
                    </Field>
                  </div>
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-slate-200 p-4">
                    <input type="checkbox" className="size-5 accent-brand-600" checked={form.forSomeoneElse} onChange={(e) => set("forSomeoneElse", e.target.checked)} />
                    <span className="font-semibold">I&apos;m booking for a family member or someone in my care</span>
                  </label>
                  {form.forSomeoneElse && (
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="riderName" label="Rider's name" error={errors.riderName}>
                        <input id="riderName" className="field" value={form.riderName} onChange={(e) => set("riderName", e.target.value)} {...err("riderName")} />
                      </Field>
                      <Field id="riderPhone" label="Rider's phone (optional)">
                        <input id="riderPhone" type="tel" className="field" value={form.riderPhone} onChange={(e) => set("riderPhone", e.target.value)} />
                      </Field>
                    </div>
                  )}
                </>
              )}

              {step === 2 && (
                <>
                  <fieldset>
                    <legend className="label">Where should we deliver?</legend>
                    <div className="grid grid-cols-2 gap-3">
                      {deliveryTypes.map((d) => (
                        <label
                          key={d.id}
                          className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border-2 px-4 font-semibold transition ${form.deliveryType === d.id ? "border-brand-500 bg-brand-50" : "border-slate-200"}`}
                        >
                          <input type="radio" name="deliveryType" value={d.id} checked={form.deliveryType === d.id} onChange={() => set("deliveryType", d.id)} className="size-5 accent-brand-600" />
                          {d.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <Field id="city" label="City" error={errors.city}>
                    <select id="city" className="field" value={form.city} onChange={(e) => set("city", e.target.value)} {...err("city")}>
                      <option value="">Select a city</option>
                      {locations.map((l) => (
                        <option key={l.city} value={l.city}>{l.city}, {l.state}</option>
                      ))}
                    </select>
                  </Field>
                  <Field id="address" label={form.deliveryType === "hotel" ? "Hotel name & address" : form.deliveryType === "venue" ? "Venue name, hall & booth" : form.deliveryType === "airport" ? "Airport, airline & flight number" : "Street address"} error={errors.address}>
                    <input id="address" autoComplete="street-address" className="field" value={form.address} onChange={(e) => set("address", e.target.value)} {...err("address")} />
                  </Field>
                  <Field id="window" label="Preferred delivery window">
                    <select id="window" className="field" value={form.window} onChange={(e) => set("window", e.target.value)}>
                      {windows.map((w) => <option key={w}>{w}</option>)}
                    </select>
                  </Field>
                  <Field id="notes" label="Notes for our driver (optional)">
                    <textarea id="notes" rows={3} className="field py-3" placeholder="e.g. Room number, gate code, leave with concierge…" value={form.notes} onChange={(e) => set("notes", e.target.value)} />
                  </Field>
                </>
              )}

              {step === 3 && (
                <>
                  <dl className="grid gap-4 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2">
                    <div><dt className="text-sm text-muted">Renter</dt><dd className="font-semibold">{form.firstName} {form.lastName}</dd><dd className="text-sm">{form.email} · {form.phone}</dd></div>
                    {form.forSomeoneElse && <div><dt className="text-sm text-muted">Rider</dt><dd className="font-semibold">{form.riderName}</dd></div>}
                    <div><dt className="text-sm text-muted">Delivery</dt><dd className="font-semibold">{fmt(form.start)}, {form.window}</dd></div>
                    <div><dt className="text-sm text-muted">Pickup</dt><dd className="font-semibold">{fmt(form.end)}</dd></div>
                    <div className="sm:col-span-2"><dt className="text-sm text-muted">Address</dt><dd className="font-semibold">{form.address}, {form.city}</dd></div>
                  </dl>
                  <div className="flex items-start gap-3 rounded-2xl border-2 border-dashed border-brand-200 p-5">
                    <Lock className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />
                    <p className="text-[0.95rem] text-muted">
                      <strong className="text-ink">Demo checkout:</strong> no payment is taken. In production, a secure card
                      form would appear here, with a refundable hold placed at delivery.
                    </p>
                  </div>
                  <div>
                    <label className="flex cursor-pointer items-start gap-3">
                      <input id="agree" type="checkbox" className="mt-1 size-5 accent-brand-600" checked={form.agree} onChange={(e) => set("agree", e.target.checked)} {...err("agree")} />
                      <span>I agree to the <a href="#" className="font-semibold text-brand-700 underline">rental terms</a> and <a href="#" className="font-semibold text-brand-700 underline">cancellation policy</a>.</span>
                    </label>
                    {errors.agree && <p id="agree-error" className="mt-1.5 text-sm font-semibold text-coral-700" role="alert">{errors.agree}</p>}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-6">
            {step > 0 ? (
              <button type="button" onClick={() => setStep(step - 1)} className="btn-ghost">
                <ArrowLeft className="size-5" aria-hidden /> Back
              </button>
            ) : (
              <span />
            )}
            <button type="submit" className="btn-primary px-8">
              {step === STEPS.length - 1 ? <>Confirm booking <Check className="size-5" aria-hidden /></> : <>Continue <ArrowRight className="size-5" aria-hidden /></>}
            </button>
          </div>
        </form>

        <aside aria-label="Order summary">
          <div className="card sticky top-36 overflow-hidden">
            <div className="bg-gradient-to-br from-brand-50 to-coral-50 p-6">
              <ProductArt variant={product.art} accent={product.accent} className="mx-auto h-36 w-full" />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted"><CalendarDays className="size-4" aria-hidden /> {fmt(form.start)} → {fmt(form.end)}</p>
              {form.city && <p className="mt-1 flex items-center gap-2 text-sm text-muted"><MapPin className="size-4" aria-hidden /> {form.city}</p>}
              <dl className="mt-5 space-y-2 border-t border-slate-100 pt-5 text-[0.95rem]">
                <div className="flex justify-between"><dt>Rental ({days} {days === 1 ? "day" : "days"})</dt><dd className="font-semibold">{formatPrice(q.rental)}</dd></div>
                {q.extras.map((e) => (
                  <div key={e.id} className="flex justify-between"><dt>{e.name}</dt><dd className="font-semibold">{formatPrice(e.total)}</dd></div>
                ))}
                <div className="flex justify-between"><dt>Delivery & pickup</dt><dd className="font-semibold">{q.delivery ? formatPrice(q.delivery) : <span className="text-brand-700">FREE</span>}</dd></div>
                <div className="flex justify-between"><dt>Tax (7%)</dt><dd className="font-semibold">${q.tax.toFixed(2)}</dd></div>
                <div className="flex justify-between border-t border-slate-100 pt-3 font-display text-xl font-extrabold"><dt>Total</dt><dd>${q.total.toFixed(2)}</dd></div>
              </dl>
              {q.savings > 0 && (
                <p className="mt-4 rounded-xl bg-brand-50 px-4 py-2 text-center text-sm font-bold text-brand-700">
                  You&apos;re saving {formatPrice(q.savings)} with multi-day pricing
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
