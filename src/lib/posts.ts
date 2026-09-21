/** Minimalny strukturalny kontrakt wpisu — bez zależności od `astro:content`. */
export interface PostLike {
	data: {
		createdAt: Date;
		isDraft: boolean;
	};
}

/** Wpisy bez draftów (`isDraft`). Nie mutuje wejścia. */
export function publishedPosts<T extends PostLike>(all: readonly T[]): T[] {
	return all.filter((entry) => !entry.data.isDraft);
}

/** Sortowanie malejąco po `createdAt`. Nie mutuje wejścia. */
export function sortByDateDesc<T extends { data: { createdAt: Date } }>(
	entries: readonly T[],
): T[] {
	return [...entries].sort(
		(a, b) => b.data.createdAt.getTime() - a.data.createdAt.getTime(),
	);
}
