import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://the-bart.com",
  integrations: [tailwind(), sitemap()],
  // plugins: [
  //   ViteImageOptimizer({
  //     png: {
  //       progressive: true,
  //       quality: 75,
  //     },
  //     jpeg: {
  //       quality: 75,
  //       progressive: true,
  //     },
  //   }),
  // ],
  // vite: {
  //   plugins: [myImagePlugin()],
  // },
});
