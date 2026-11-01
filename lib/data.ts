export type ArtVariant = "scooter-4" | "scooter-3";

export interface AddOn {
  id: string;
  name: string;
  dailyPrice: number;
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  art: ArtVariant;
  accent: string;
  tagline: string;
  dailyPrice: number;
  weeklyPrice: number;
  monthlyPrice: number;
  rating: number;
  reviewCount: number;
  popularity: number;
  specs: {
    range_km: number | null;
    top_speed_kmh: number | null;
    max_user_weight_kg: number;
    weight_kg: number;
    folded: boolean;
    battery_type: string | null;
  };
  description: string;
  includedItems: string[];
  idealFor: string[];
  addOns: string[];
}

export const addOns: AddOn[] = [
  { id: "battery", name: "Extra battery", dailyPrice: 8, description: "Doubles your range for long days out." },
  { id: "protection", name: "Damage protection", dailyPrice: 5, description: "Worry-free cover for accidental damage." },
  { id: "canopy", name: "Sun & rain canopy", dailyPrice: 6, description: "Stay cool in the sun and dry in a shower." },
  { id: "basket", name: "Rear storage basket", dailyPrice: 3, description: "Extra room for shopping and day bags." },
  { id: "cupholder", name: "Cup & phone holder", dailyPrice: 2, description: "Keep drinks and maps within reach." },
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "voyager-4-mobility-scooter",
    name: "Voyager 4",
    art: "scooter-4",
    accent: "#f97362",
    tagline: "Stable four-wheel comfort, all day",
    dailyPrice: 39,
    weeklyPrice: 219,
    monthlyPrice: 649,
    rating: 4.9,
    reviewCount: 531,
    popularity: 100,
    specs: { range_km: 25, top_speed_kmh: 7, max_user_weight_kg: 159, weight_kg: 48, folded: true, battery_type: "Sealed lead-acid, 2 × 18Ah" },
    description:
      "Our most-booked scooter. A padded swivel captain's seat, adjustable tiller and big front basket make the Voyager 4 a favorite for casino resorts and convention halls. It folds easily for trunk storage.",
    includedItems: ["Voyager 4 scooter", "Batteries & charger", "Front basket", "Key & lanyard", "Delivery & pickup"],
    idealFor: ["Casino resorts", "Convention centers", "Shopping malls"],
    addOns: ["battery", "protection", "canopy", "basket", "cupholder"],
  },
  {
    id: "p2",
    slug: "breeze-3-mobility-scooter",
    name: "Breeze 3",
    art: "scooter-3",
    accent: "#f59e0b",
    tagline: "Nimble three-wheeler for tight spaces",
    dailyPrice: 35,
    weeklyPrice: 199,
    monthlyPrice: 589,
    rating: 4.9,
    reviewCount: 201,
    popularity: 80,
    specs: { range_km: 22, top_speed_kmh: 7, max_user_weight_kg: 136, weight_kg: 41, folded: true, battery_type: "Sealed lead-acid, 2 × 12Ah" },
    description:
      "Three wheels give the Breeze 3 extra legroom and a tight turning circle, perfect for crowded casinos, stores and convention halls. It folds easily for trunk storage.",
    includedItems: ["Breeze 3 scooter", "Battery pack & charger", "Front basket", "Delivery & pickup"],
    idealFor: ["Trade shows", "Tight hotel rooms", "Car trunks"],
    addOns: ["battery", "protection", "canopy", "basket"],
  },
];

export const testimonials = [
  {
    name: "Margaret L.",
    location: "Las Vegas, NV",
    quote:
      "The scooter was waiting at our hotel when we arrived. I did the whole Strip with my grandkids, which I didn't think would be possible this year!",
    rating: 5,
    product: "Voyager 4",
    color: "#f97362",
  },
  {
    name: "David & Ana R.",
    location: "Dallas, TX",
    quote:
      "Delivered straight to our hotel before a big convention week and picked up the morning we flew home. The Breeze 3 folded right into the trunk. Flawless.",
    rating: 5,
    product: "Breeze 3",
    color: "#0f766e",
  },
  {
    name: "James T.",
    location: "Dallas, TX",
    quote:
      "After my knee surgery I wasn't going to miss my daughter's wedding. Papa Scooter got me a scooter the same afternoon, and the team was so kind on the phone.",
    rating: 5,
    product: "Voyager 4",
    color: "#6366f1",
  },
  {
    name: "Priya S.",
    location: "Las Vegas, NV",
    quote:
      "I rent a Breeze 3 every time I'm in town for a trade show. It's spotless, charged and turns on a dime in crowded halls. Plus they actually answer the phone!",
    rating: 5,
    product: "Breeze 3",
    color: "#f59e0b",
  },
  {
    name: "Robert K.",
    location: "Dallas, TX",
    quote:
      "Booking for my mom from across the country was simple. They called her to walk through the controls. Real peace of mind for a caregiver.",
    rating: 5,
    product: "Voyager 4",
    color: "#0ea5e9",
  },
];

export const faqs: { category: string; q: string; a: string }[] = [
  {
    category: "Booking",
    q: "How far in advance should I book?",
    a: "We recommend booking 1–2 weeks ahead during holidays and peak travel seasons. Same-day and next-day rentals are often available, so just call us and we'll do our best.",
  },
  {
    category: "Booking",
    q: "Do I need a prescription or doctor's note?",
    a: "No. Anyone can rent from Papa Scooter. If you're unsure whether the Voyager 4 or Breeze 3 suits you best, our mobility specialists are happy to help you choose.",
  },
  {
    category: "Booking",
    q: "Can I book on behalf of a family member?",
    a: "Absolutely. Many of our bookings are made by caregivers and family. Just add the rider's name and phone number at checkout and we'll coordinate delivery with them.",
  },
  {
    category: "Delivery",
    q: "Where do you deliver?",
    a: "We deliver to hotels, vacation rentals, homes, airports, convention centers and event venues across Las Vegas and Dallas. Delivery and pickup are free on rentals of 3 days or more.",
  },
  {
    category: "Delivery",
    q: "Will someone show me how to use it?",
    a: "Yes. Every delivery includes a hands-on walkthrough of controls, folding and charging. You'll also get a printed quick-start guide and live phone support.",
  },
  {
    category: "Delivery",
    q: "Can you deliver to the airport?",
    a: "Yes. We meet you at Harry Reid (LAS), DFW or Love Field and collect the scooter there when you fly home, so you're rolling from the moment you land.",
  },
  {
    category: "Equipment",
    q: "How clean are the scooters?",
    a: "Every scooter is inspected, serviced and disinfected with hospital-grade cleaner between rentals, then sealed in a protective cover until it reaches you.",
  },
  {
    category: "Equipment",
    q: "What if something breaks down?",
    a: "Call our support line. In most service areas we'll swap your scooter within 3 hours at no extra cost.",
  },
  {
    category: "Payment",
    q: "Is there a security deposit?",
    a: "A refundable authorization hold of $100–$250 is placed depending on the scooter. It's released within 48 hours of pickup. Adding damage protection reduces your hold to $0.",
  },
  {
    category: "Payment",
    q: "What is your cancellation policy?",
    a: "Cancel for free up to 48 hours before your delivery time. Cancellations inside 48 hours receive a full credit toward a future rental.",
  },
];

export const locations = [
  {
    city: "Las Vegas",
    state: "NV",
    spots: ["The Strip hotels & resorts", "Las Vegas Convention Center", "Harry Reid (LAS) Airport", "Downtown & Fremont Street"],
    hub: true,
    phone: "(702) 555-0142",
    phoneHref: "tel:+17025550142",
    email: "lasvegas@papascooter.com",
    address: "3960 Howard Hughes Pkwy, Suite 500, Las Vegas, NV 89169",
    hours: "9am – 9pm, 7 days a week",
  },
  {
    city: "Dallas",
    state: "TX",
    spots: ["Downtown & Uptown hotels", "Kay Bailey Hutchison Convention Center", "DFW & Love Field airports", "AT&T Stadium & Fair Park"],
    hub: true,
    phone: "(214) 555-0187",
    phoneHref: "tel:+12145550187",
    email: "dallas@papascooter.com",
    address: "2200 Ross Ave, Suite 300, Dallas, TX 75201",
    hours: "9am – 9pm, 7 days a week",
  },
];

export const useCases = [
  { title: "Vacations & conventions", text: "Delivered to your hotel, convention center or vacation rental before you arrive.", icon: "Building2", color: "#0ea5e9" },
  { title: "Shows & stadiums", text: "Skip the long walks between casinos, arenas and stadiums. Enjoy every show and every game.", icon: "Ticket", color: "#f97362" },
  { title: "Recovering from surgery", text: "Flexible weekly and monthly plans while you heal, without the cost of buying.", icon: "HeartPulse", color: "#16a34a" },
  { title: "Visiting family", text: "Keep up with the grandkids at the park, the mall and every family dinner.", icon: "Users", color: "#8b5cf6" },
  { title: "Events & weddings", text: "Stay comfortable at receptions, galas and once-in-a-lifetime days.", icon: "PartyPopper", color: "#f59e0b" },
];

export const PHONE = "1-800-848-3727";
export const PHONE_HREF = "tel:+18008483727";

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function wheelLabel(p: Pick<Product, "art">) {
  return p.art === "scooter-4" ? "4-wheel scooter" : "3-wheel scooter";
}

export function formatPrice(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

/** Best price for a rental length: combines monthly, weekly and daily tiers. */
export function rentalPrice(p: Pick<Product, "dailyPrice" | "weeklyPrice" | "monthlyPrice">, days: number) {
  if (days <= 0) return 0;
  const months = Math.floor(days / 30);
  let rest = days - months * 30;
  const weeks = Math.floor(rest / 7);
  rest -= weeks * 7;
  const tiered = months * p.monthlyPrice + weeks * p.weeklyPrice + Math.min(rest * p.dailyPrice, p.weeklyPrice);
  return Math.min(tiered, days * p.dailyPrice);
}

export const DELIVERY_FEE = 25;
export const FREE_DELIVERY_DAYS = 3;

export function daysBetween(start?: string, end?: string) {
  if (!start || !end) return 0;
  const ms = new Date(end + "T12:00:00").getTime() - new Date(start + "T12:00:00").getTime();
  return Math.max(1, Math.round(ms / 86_400_000));
}

export function isoDate(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

export function quote(product: Product, days: number, addOnIds: string[]) {
  const rental = rentalPrice(product, days);
  const extras = addOns.filter((a) => addOnIds.includes(a.id)).map((a) => ({ ...a, total: a.dailyPrice * days }));
  const delivery = days >= FREE_DELIVERY_DAYS ? 0 : DELIVERY_FEE;
  const subtotal = rental + extras.reduce((s, e) => s + e.total, 0) + delivery;
  const tax = Math.round(subtotal * 0.07 * 100) / 100;
  return { rental, extras, delivery, subtotal, tax, total: subtotal + tax, savings: product.dailyPrice * days - rental };
}
