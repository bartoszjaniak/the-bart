import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  plugins: [
    ViteImageOptimizer({
      png: {
        progressive: true,
        quality: 75,
      },
    }),
  ],
});
