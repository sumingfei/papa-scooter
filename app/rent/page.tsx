import type { Metadata } from "next";
import Catalog from "@/components/rent/Catalog";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Rent a Mobility Scooter",
  description: "Compare the Voyager 4 and Breeze 3 mobility scooters, delivered to your hotel or home in Las Vegas and Dallas.",
};

export default async function RentPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  return (
    <>
      <PageHero eyebrow="Rent" title="Pick your scooter">
        Two proven models, every one delivered, set up and explained in person. Weekly and monthly rates save up to 45%.
      </PageHero>
      <Catalog city={sp.city} start={sp.start} end={sp.end} />
    </>
  );
}
