import type { Metadata } from "next";
import FaqAccordion from "@/components/ui/FaqAccordion";
import PageHero from "@/components/ui/PageHero";
import { PHONE, PHONE_HREF, faqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about booking, delivery, cleaning, payment and cancellations for Papa Scooter rentals.",
};

const groups = Array.from(new Set(faqs.map((f) => f.category)));

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero eyebrow="FAQ" title="Questions? We've got answers">
        Can&apos;t find what you need? Call <a href={PHONE_HREF} className="font-semibold text-brand-700 underline">{PHONE}</a>, day or night.
      </PageHero>
      <div className="container-x grid gap-10 pb-12 lg:grid-cols-[14rem_1fr]">
        <nav aria-label="FAQ categories" className="hidden lg:block">
          <ul className="sticky top-36 space-y-1">
            {groups.map((g) => (
              <li key={g}>
                <a href={`#${g.toLowerCase()}`} className="block rounded-xl px-4 py-2.5 font-semibold hover:bg-brand-50 hover:text-brand-700">{g}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-14">
          {groups.map((g) => (
            <section key={g} id={g.toLowerCase()} aria-labelledby={`faq-${g}`} className="scroll-mt-36">
              <h2 id={`faq-${g}`} className="mb-5 text-2xl font-bold">{g}</h2>
              <FaqAccordion items={faqs.filter((f) => f.category === g)} defaultOpen={null} />
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
