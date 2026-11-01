import type { Metadata } from "next";
import ContactByLocation from "@/components/ContactByLocation";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Reach the Papa Scooter team in Las Vegas or Dallas by phone, email or our contact form.",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const { city } = await searchParams;
  return (
    <>
      <PageHero eyebrow="Contact" title="We're here to help">
        Questions about our scooters, delivery or a special request? Pick your city and a real person from the local team will get back to you fast.
      </PageHero>
      <ContactByLocation initialCity={city} />
    </>
  );
}
