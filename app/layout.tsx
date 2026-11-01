import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileActionBar from "@/components/layout/MobileActionBar";
import { PHONE, locations } from "@/lib/data";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", weight: ["500", "600", "700", "800"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://papascooter.com"),
  title: {
    default: "Papa Scooter | Mobility Scooter Rentals in Las Vegas & Dallas",
    template: "%s | Papa Scooter",
  },
  description:
    "Rent the Voyager 4 or Breeze 3 mobility scooter, delivered to your hotel, home or venue in Las Vegas and Dallas. Sanitized scooters, live support, free delivery on 3+ day rentals.",
  openGraph: {
    type: "website",
    siteName: "Papa Scooter",
    title: "Papa Scooter: Go further, your way.",
    description: "Mobility scooter rentals delivered to your door or hotel in Las Vegas and Dallas.",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0f766e" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Papa Scooter",
  description: "Mobility scooter rentals with delivery in Las Vegas and Dallas.",
  telephone: PHONE,
  email: "hello@papascooter.com",
  url: "https://papascooter.com",
  priceRange: "$$",
  openingHours: "Mo-Su 00:00-23:59",
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "2140" },
  areaServed: locations.map((l) => `${l.city}, ${l.state}`),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
