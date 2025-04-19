import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://the-bart.com",  
  integrations: [tailwind(), sitemap()],
  prefetch: {
    prefetchAll: true,
    defaultStrategy:"viewport"
  },
  plugins: [
    ViteImageOptimizer({
      png: {
        progressive: true,
        quality: 75,
      },
      jpeg: {
        quality: 75,
        progressive: true,
      },
    }),
  ]
});
