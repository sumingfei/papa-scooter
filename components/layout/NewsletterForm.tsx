"use client";

import { Check } from "lucide-react";
import { useState } from "react";

export default function NewsletterForm() {
  const [done, setDone] = useState(false);
  if (done) {
    return (
      <p className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 font-semibold text-white" role="status">
        <Check className="size-5 text-sun-300" aria-hidden /> You&apos;re subscribed. Welcome aboard!
      </p>
    );
  }
  return (
    <form
      className="mt-4 flex flex-col gap-2 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input id="newsletter-email" type="email" required placeholder="you@email.com" className="field flex-1 border-transparent" />
      <button type="submit" className="btn-primary">Subscribe</button>
    </form>
  );
}
