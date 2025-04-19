import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://the-bart.com",
  integrations: [tailwind(), sitemap()],
  prefetch: {
    prefetchAll: true,
    defaultStrategy:"viewport"
  },
  output: "server",
  adapter: vercel({
    isr: true,
    imageService: true,
    webAnalytics: { enabled: true }
  })
});