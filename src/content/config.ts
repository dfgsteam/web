import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    client: z.string(),
    category: z.enum(['client', 'work']),
    status: z.enum(['live', 'client-project', 'under-construction']),
    order: z.number(),
    year: z.string(),
    tech: z.array(z.string()),
    summary: z.string(),
    accentFrom: z.string(),
    accentTo: z.string(),
    liveUrl: z.string().optional(),
  }),
});

export const collections = { projects };
