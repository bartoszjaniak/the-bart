export type CardVariant = "yellow" | "blue" | "pink";

const VARIANTS: CardVariant[] = ["yellow", "blue", "pink"];

export function variantForIndex(i: number): CardVariant {
	return VARIANTS[i % VARIANTS.length];
}
