import CtaBand from "@/components/home/CtaBand";
import FaqTeaser from "@/components/home/FaqTeaser";
import Featured from "@/components/home/Featured";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import LocationsStrip from "@/components/home/LocationsStrip";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import TrustBar from "@/components/home/TrustBar";
import UseCases from "@/components/home/UseCases";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Featured />
      <HowItWorks />
      <UseCases />
      <Stats />
      <Testimonials />
      <LocationsStrip />
      <FaqTeaser />
      <CtaBand />
    </>
  );
}
