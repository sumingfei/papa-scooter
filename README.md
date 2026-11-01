# Papa Scooter

A rental website for two mobility scooters, the Voyager 4 and Breeze 3, in Las Vegas and Dallas.
Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion** and **lucide-react**.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
```

## Deploying to Cloudflare

The site runs on **Cloudflare Workers** through the [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare)
(`@opennextjs/cloudflare`). Some pages render per request (`/rent` and `/contact` read the city and dates
from the URL), so it's a Worker rather than a static Pages export.

```bash
npm run preview    # build for Workers and run it locally in workerd (http://localhost:8787)
npm run deploy     # build and deploy to Cloudflare (first time: `npx wrangler login`)
npm run upload     # build and upload a new version without promoting it (for gradual rollouts)
```

To deploy from GitHub instead, push the repo and connect it in the Cloudflare dashboard under
**Workers & Pages → Create → Import a repository**. Use `npx opennextjs-cloudflare build` as the build command
and `npx opennextjs-cloudflare deploy` as the deploy command.

Config files:

| File | Purpose |
| --- | --- |
| `wrangler.jsonc` | Worker name (`papa-scooter`), compatibility flags, static assets binding. Add a custom domain under `routes` or in the dashboard. |
| `open-next.config.ts` | Serves prerendered pages from static assets, so no R2 bucket or KV is needed. Switch to the R2 incremental cache if you add ISR/revalidation. |
| `next.config.ts` | `images.unoptimized`, since the logos in `public/brand` are pre-sized. Enable the Cloudflare Images binding if you add large photos. |
| `public/_headers` | Long-term caching for hashed `/_next/static` files. |

`metadataBase` in `app/layout.tsx`, `app/sitemap.ts` and `app/robots.ts` point at `https://papascooter.com`. Update them if your domain differs.

## What's inside

| Route | Description |
| --- | --- |
| `/` | Home: hero + availability widget, categories, featured carousel, how it works, use cases, animated stats, testimonials, locations, FAQ, CTA |
| `/rent` | Both scooters plus a side-by-side comparison table. Accepts `?city=&start=&end=` |
| `/rent/[slug]` | Product detail: gallery, tiered pricing, specs, booking panel with add-ons and live price quote |
| `/checkout` | 4-step checkout (details → info → delivery → review) with validation and an animated confirmation. **Demo only, no payment is taken.** |
| `/how-it-works`, `/locations`, `/faq`, `/about`, `/contact`, `/accessibility` | Supporting pages |

## Project structure

```
app/                 routes, layout (fonts, SEO metadata, LocalBusiness JSON-LD), sitemap & robots
components/
  layout/            Header, Footer, mobile call/book bar
  home/              Home page sections
  rent/              Catalog, gallery, booking panel
  checkout/          Checkout flow
  ui/                Shared pieces (ProductCard, ProductArt, Reveal, Counter, FAQ accordion…)
lib/data.ts          Seed data (products, add-ons, FAQs, locations, testimonials) + pricing helpers
```

All data lives in `lib/data.ts`. To connect a real backend, replace the exported arrays/helpers with API calls.

## Design system

Tokens are defined in `app/globals.css` (`@theme`): teal `brand-*`, coral `coral-*`, sunny `sun-*`, `cream` background, `ink` text.
Headings use Plus Jakarta Sans and body text uses Inter at an 18px base.

Product imagery is drawn with inline SVG illustrations (`components/ui/ProductArt.tsx`) so the site has no external image dependencies.
To use real photography, swap `ProductArt` for `next/image` and add the image host to `next.config.ts`.

## Accessibility

- WCAG 2.1 AA color contrast (CTA coral darkened to `#c9402b` for 4.9:1 on white)
- Skip link, semantic landmarks, labeled fields, announced errors, visible focus rings
- 48px minimum tap targets; sticky mobile Call / Book bar
- `prefers-reduced-motion` respected by all animations
