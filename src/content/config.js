import { defineCollection, z } from "astro:content";

const postCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
      createdAt: z.date(),
    isDraft: z.boolean().default(false),
    image: z.string().optional(),
      imageAlt: z.string().optional()
  }),
});

const projectCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    image: z.string(),
    description: z.string(),
    projectUrl: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  post: postCollection,
  project: projectCollection,
};
