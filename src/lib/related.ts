import { publishedPosts, sortByDateDesc } from "./posts";

/** Minimalny strukturalny kontrakt wpisu posta — bez zależności od `astro:content`. */
export interface RelatedPostInput {
	id: string;
	data: {
		category: string;
		createdAt: Date;
		isDraft: boolean;
	};
}

/**
 * Powiązane artykuły: wyłącznie ta sama kategoria, bez bieżącego i bez draftów,
 * posortowane `createdAt` malejąco, maksymalnie `limit`.
 */
export function relatedPosts<T extends RelatedPostInput>(
	current: T,
	all: readonly T[],
	limit = 3,
): T[] {
	return sortByDateDesc(
		publishedPosts(all).filter(
			(entry) =>
				entry.id !== current.id &&
				entry.data.category === current.data.category,
		),
	).slice(0, limit);
}
