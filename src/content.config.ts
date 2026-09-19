import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const chapters = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/chapters' }),
  schema: z.object({
    key: z.string().regex(/^[a-z0-9-]+$/), locale: z.enum(['en', 'pt-br']), slug: z.string().regex(/^[a-z0-9-]+$/),
    order: z.number().int().min(1).max(5), title: z.string(), question: z.string(),
    summary: z.string(), mediaId: z.string(), galleryIds: z.array(z.string()).default([]), sourceIds: z.array(z.string()),
    personIds: z.array(z.string()), placeIds: z.array(z.string()),
    publication: z.enum(['preview', 'published', 'draft']),
    translation: z.enum(['reviewed', 'provisional']),
  }),
});
export const collections = { chapters };
