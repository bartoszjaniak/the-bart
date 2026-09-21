import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const postCollection = defineCollection({
  loader: glob({ base: "./src/content/post", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    createdAt: z.date(),
    isDraft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

const projectCollection = defineCollection({
  loader: glob({ base: "./src/content/project", pattern: "**/*.md" }),
  schema: z.object({
    name: z.string(),
    image: z.string(),
    imageAlt: z.string().optional(),
    description: z.string(),
    projectUrl: z.string().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(100),
  }),
});

export const collections = {
  post: postCollection,
  project: projectCollection,
};
