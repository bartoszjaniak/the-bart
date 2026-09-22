import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const postCollection = defineCollection({
	loader: glob({ base: "./src/content/post", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		createdAt: z.date(),
		isDraft: z.boolean().default(false),
		category: z.string(),
		tags: z.array(z.string()).default([]),
		image: z.string(),
		imageAlt: z.string(),
		stickyNote: z.string().optional(),
		// Maks. jeden badge na artykuł — wymusza to kształt schematu (obiekt, nie tablica).
		badge: z
			.object({
				label: z.string(),
				comment: z.string().optional(),
			})
			.optional(),
	}),
});

const projectCollection = defineCollection({
	loader: glob({ base: "./src/content/project", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		name: z.string(),
		description: z.string(),
		image: z.string(),
		imageAlt: z.string(),
		projectUrl: z.string().optional(),
		tags: z.array(z.string()).default([]),
		order: z.number().default(100),
	}),
});

export const collections = {
	post: postCollection,
	project: projectCollection,
};
