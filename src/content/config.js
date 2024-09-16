import { defineCollection, z } from "astro:content";

const postCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    dateFormatted: z.string(),
  }),
});

const projectCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    image: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  post: postCollection,
  project: projectCollection,
};
