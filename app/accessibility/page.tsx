import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { PHONE, PHONE_HREF } from "@/lib/data";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Papa Scooter's commitment to an accessible website for everyone.",
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHero eyebrow="Accessibility" title="Accessibility statement" />
      <article className="container-x max-w-3xl space-y-6 pb-12 text-lg [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_li]:ml-6 [&_li]:list-disc">
        <p>
          Accessibility is at the heart of what we do. We aim for our website to conform to the{" "}
          <strong>Web Content Accessibility Guidelines (WCAG) 2.1, Level AA</strong>.
        </p>
        <h2>What we&apos;ve done</h2>
        <ul className="space-y-2">
          <li>Text and interface colors meet a minimum 4.5:1 contrast ratio.</li>
          <li>All functionality is available with a keyboard, with clearly visible focus indicators.</li>
          <li>Large tap targets (at least 48 pixels) for easier use with limited dexterity.</li>
          <li>Animations respect your device&apos;s &ldquo;reduce motion&rdquo; setting.</li>
          <li>Forms have descriptive labels and clear, announced error messages.</li>
        </ul>
        <h2>Prefer to talk?</h2>
        <p>
          You can always book by phone with a friendly specialist at{" "}
          <a href={PHONE_HREF} className="font-semibold text-brand-700 underline">{PHONE}</a>.
        </p>
        <h2>Feedback</h2>
        <p>
          If you run into any barrier on our site, please email{" "}
          <a href="mailto:access@papascooter.com" className="font-semibold text-brand-700 underline">access@papascooter.com</a>.
          We respond within two business days.
        </p>
      </article>
    </>
  );
}
