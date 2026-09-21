import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://the-bart.com",
  integrations: [sitemap()],
  // Astro 7 domyślnie używa compressHTML: "jsx", co usuwa spacje między inline elementami.
  // Zostajemy przy zachowaniu z Astro 6, żeby nie zmienić wyglądu strony.
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport"
  },
  output: "server",
  adapter: vercel({
    isr: true,
    imageService: true,
    webAnalytics: { enabled: true }
  }),
  vite: {
    plugins: [tailwindcss()]
  }
});
