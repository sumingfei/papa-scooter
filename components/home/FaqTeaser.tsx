import Link from "next/link";
import FaqAccordion from "@/components/ui/FaqAccordion";
import SectionHeading from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/data";

const picks = [0, 1, 3, 5, 6].map((i) => faqs[i]);

export default function FaqTeaser() {
  return (
    <section className="container-x py-24" aria-labelledby="faq-heading">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <SectionHeading center={false} eyebrow="Good questions" title={<span id="faq-heading">Answers before you ask</span>}>
            Still wondering about something? Our mobility specialists are one call away, any time of day.
          </SectionHeading>
          <Link href="/faq" className="btn-ghost -mt-4">Read all FAQs</Link>
        </div>
        <FaqAccordion items={picks} />
      </div>
    </section>
  );
}
