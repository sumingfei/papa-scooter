import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    // Logos are pre-sized in /public/brand, so skip the image optimizer (which would need Cloudflare Images on Workers).
    unoptimized: true,
  },
};

export default nextConfig;

// Lets `next dev` read Cloudflare bindings from wrangler.jsonc.
initOpenNextCloudflareForDev();
