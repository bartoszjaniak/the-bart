/**
 * Glify dekoracyjne (aria-hidden). Muszą być monochromatyczne —
 * glify emoji renderują się kolorowo, dlatego `⚙` zapisujemy jako `⚙︎`
 * (U+2699 + U+FE0E — wariant tekstowy).
 */
export const DEFAULT_GLYPH = "▧";

const CATEGORY_GLYPHS: Record<string, string> = {
	AI: "⚙︎",
	TECH: "▯",
	LIFESTYLE: "♧",
};

export function categoryGlyph(category: string): string {
	return CATEGORY_GLYPHS[category] ?? DEFAULT_GLYPH;
}

export function projectGlyph(icon?: string): string {
	return icon ?? DEFAULT_GLYPH;
}
