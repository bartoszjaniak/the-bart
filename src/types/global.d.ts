export type {};

declare global {
	interface Window {
		dataLayer: unknown[];
		gtag: (
			command: string,
			targetId?: string | Date,
			config?: Record<string, unknown>,
		) => void;
	}

	// Global gtag function
	function gtag(
		command: string,
		targetId?: string | Date,
		config?: Record<string, unknown>,
	): void;
}
