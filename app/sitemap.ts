import type { MetadataRoute } from "next";
import { products } from "@/lib/data";

const BASE = "https://papascooter.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/rent", "/how-it-works", "/locations", "/faq", "/about", "/contact", "/accessibility"];
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}` })),
    ...products.map((p) => ({ url: `${BASE}/rent/${p.slug}` })),
  ];
}
