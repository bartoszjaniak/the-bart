import { defineConfig, fontProviders } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
	site: "https://the-bart.com",
	integrations: [mdx(), sitemap()],
	// Astro 7 domyślnie używa compressHTML: "jsx", co usuwa spacje między inline elementami.
	// Zostajemy przy zachowaniu z Astro 6, żeby nie zmienić wyglądu strony.
	compressHTML: true,
	prefetch: {
		prefetchAll: true,
		defaultStrategy: "viewport",
	},
	fonts: [
		{
			// Provider `fontsource` pobiera pliki z CDN (jsDelivr) w trakcie builda — build wymaga sieci.
			// Alternatywa offline/self-host: `fontProviders.local()` z plikami w `src/assets/fonts`.
			provider: fontProviders.fontsource(),
			name: "Anton",
			cssVariable: "--font-anton",
			weights: [400],
			styles: ["normal"],
			// Jawnie `latin-ext` — polskie diakrytyki (ą ć ę ł ń ó ś ź ż) inaczej polecą z fallbacku.
			subsets: ["latin", "latin-ext"],
			// Ostatni element musi być rodziną generyczną, żeby API wygenerowało metryczny fallback.
			fallbacks: ["Impact", "Arial Black", "sans-serif"],
			display: "swap",
		},
	],
	output: "server",
	adapter: vercel({
		isr: true,
		imageService: true,
		webAnalytics: { enabled: true },
	}),
	vite: {
		plugins: [tailwindcss()],
	},
});
