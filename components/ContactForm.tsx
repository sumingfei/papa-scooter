"use client";

import { CheckCircle2, Send } from "lucide-react";
import { useState } from "react";

export default function ContactForm({ city }: { city: string }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="card grid place-items-center p-10 text-center" role="status">
        <CheckCircle2 className="size-16 text-brand-600" aria-hidden />
        <h2 className="mt-4 text-3xl font-extrabold">Message received!</h2>
        <p className="mt-2 max-w-md text-muted">Thanks for reaching out. Our {city} team will reply within 2 hours (usually much sooner).</p>
      </div>
    );
  }

  return (
    <form
      className="card space-y-5 p-6 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <h2 className="text-2xl font-bold">Message our {city} team</h2>
      <input type="hidden" name="location" value={city} />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="label">Your name</label>
          <input id="c-name" required autoComplete="name" className="field" />
        </div>
        <div>
          <label htmlFor="c-phone" className="label">Phone (optional)</label>
          <input id="c-phone" type="tel" autoComplete="tel" className="field" />
        </div>
      </div>
      <div>
        <label htmlFor="c-email" className="label">Email</label>
        <input id="c-email" type="email" required autoComplete="email" className="field" />
      </div>
      <div>
        <label htmlFor="c-topic" className="label">How can we help?</label>
        <select id="c-topic" className="field">
          <option>Choosing the right scooter</option>
          <option>Question about an existing booking</option>
          <option>Group or event rental</option>
          <option>Partnerships (hotels, venues)</option>
          <option>Something else</option>
        </select>
      </div>
      <div>
        <label htmlFor="c-msg" className="label">Message</label>
        <textarea id="c-msg" required rows={5} className="field py-3" />
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto sm:px-10">
        <Send className="size-5" aria-hidden /> Send message
      </button>
    </form>
  );
}
