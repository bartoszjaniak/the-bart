/** Absolutny URL obrazu względem `Astro.site`; zwraca wejście, gdy brak konfiguracji. */
export function absoluteImageUrl(image: string, site: URL | undefined): string {
	if (!site) return image;
	try {
		return new URL(image, site).href;
	} catch {
		return image;
	}
}
