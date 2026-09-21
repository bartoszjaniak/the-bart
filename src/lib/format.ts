const DATE_FORMAT = new Intl.DateTimeFormat("pl-PL", {
	day: "numeric",
	month: "short",
	year: "numeric",
});

/** Data w formacie „12 lis 2024" (pl-PL, skrócony miesiąc). */
export function formatDate(date: Date | string): string {
	return DATE_FORMAT.format(new Date(date));
}
