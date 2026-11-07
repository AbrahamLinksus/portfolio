import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { allSkills } from './data/skills';

const skillNames = allSkills.map((s) => s.name) as [string, ...string[]];

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number(),
    status: z.enum(['Shipped', 'Live', 'In progress', 'Prototype']),
    // Which of the roles I'm open to this project best shows off.
    roles: z.array(z.enum(['Software', 'AI', 'Data'])),
    stack: z.array(z.string()),
    // Must match a name in src/data/skills.ts, so the Skills page can link back here.
    skills: z.array(z.enum(skillNames)).default([]),
    repo: z.string().url(),
    live: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number(),
    letter: z.string().length(1),
    color: z.enum(['pink', 'teal', 'yellow', 'orange', 'lime']),
    highlights: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
  }),
});

export const collections = { projects };
