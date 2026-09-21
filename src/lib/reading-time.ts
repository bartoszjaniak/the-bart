/** Czas czytania w minutach: słowa ÷ 200 wpm, minimum 1. */
const WORDS_PER_MINUTE = 200;

export function readingTime(body: string): number {
	const words = body.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
