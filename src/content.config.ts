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
    // The case file under the toy: the problem as the case, clues, exhibits and the verdict.
    caseFile: z
      .object({
        codename: z.string(),
        case: z.string(),
        clues: z.array(z.object({ fact: z.string(), meant: z.string() })),
        exhibits: z.array(z.object({ src: z.string(), caption: z.string(), alt: z.string() })).default([]),
        evidence: z.array(z.object({ label: z.string(), before: z.string(), after: z.string() })).default([]),
        verdict: z.string(),
        lesson: z.string(),
      })
      .optional(),
    // The visual "at a glance" opening of a case study. All parts are optional.
    visual: z
      .object({
        glance: z.object({ problem: z.string(), built: z.string(), result: z.string() }).optional(),
        // Screenshots of the output; a shot without src shows a "screenshot coming" frame.
        shots: z.array(z.object({ caption: z.string(), src: z.string().optional() })).default([]),
        // How it works, as a left-to-right flow (top-to-bottom on phones).
        flow: z
          .object({
            title: z.string(),
            steps: z.array(z.object({ label: z.string(), note: z.string().optional(), kind: z.enum(['input', 'step', 'store', 'gate', 'human', 'output']).default('step') })),
            footnote: z.string().optional(),
          })
          .optional(),
        charts: z
          .array(
            z.discriminatedUnion('type', [
              z.object({
                type: z.literal('bars'),
                title: z.string(),
                note: z.string().optional(),
                min: z.number().default(0),
                max: z.number().optional(),
                format: z.string().default('{v}'),
                decimals: z.number().optional(),
                lowerIsBetter: z.boolean().default(false),
                bars: z.array(z.object({ label: z.string(), value: z.number(), highlight: z.boolean().default(false) })),
              }),
              z.object({
                type: z.literal('line'),
                title: z.string(),
                note: z.string().optional(),
                yMin: z.number(),
                yMax: z.number(),
                yFormat: z.string().default('{v}'),
                xLabel: z.string(),
                points: z.array(z.object({ x: z.string(), y: z.number() })),
                source: z.string().optional(),
              }),
            ]),
          )
          .default([]),
      })
      .default({ shots: [], charts: [] }),
  }),
});

export const collections = { projects };
