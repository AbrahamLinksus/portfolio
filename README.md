# Jake Roberts · Portfolio

Personal site for Jake Roberts (B.Tech CSE, SRM IST, class of 2027): AI engineering first, then SDE, then data science.

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS v4 · GSAP ScrollTrigger · Framer Motion · Lenis · Resend · Vercel.

## Run it

```bash
npm install
cp .env.example .env.local   # fill in the Resend keys to make the contact form send
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
npm run lint
```

## Where things live

| What | Where |
|---|---|
| Name, role, links, email, time zone | `src/lib/site.ts` |
| Projects, case studies, internship | `src/lib/projects.ts` |
| Design tokens (colours, type scale, spacing) | `src/app/globals.css` (`@theme`) |
| Home sections | `src/components/home/*` |
| Intro (stick figure shoving the orange sheet) | `src/components/intro/*` |
| Menu, header, footer | `src/components/layout/*` |
| Sound, page transitions, smooth scroll, toasts | `src/components/providers/*` |
| Contact API (zod, rate limit, honeypot, Resend) | `src/app/api/contact/route.ts` |
| OG images, sitemap, robots, icon | `src/app/opengraph-image.tsx`, `src/app/work/[slug]/opengraph-image.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/icon.svg` |

Text written as `[TODO: ...]` renders as a highlighted chip on the site, so unfinished content is easy to spot. Search the repo for `TODO` to find them all.

Still needed: email address, `public/resume.pdf`, photos for `/human`, project outcomes/metrics, stacks, repo and demo URLs, game names, values.

## Environment variables

See `.env.example`.

| Key | Needed for |
|---|---|
| `RESEND_API_KEY` | Sending contact-form email |
| `CONTACT_TO_EMAIL` | The inbox that receives messages |
| `CONTACT_FROM_EMAIL` | Sender. Use an address on a domain verified in Resend. `onboarding@resend.dev` works for testing but only delivers to your own Resend account email |
| `NEXT_PUBLIC_SITE_URL` | Optional. Canonical URL for metadata and sitemap. On Vercel the production domain is used automatically |

Without the Resend keys the form shows a friendly "not set up yet" message and the email/mailto fallback still works.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project**, import the repo. The framework preset (Next.js) is detected; no build settings to change.
3. Add the environment variables above under **Settings → Environment Variables**.
4. Deploy. Add a custom domain under **Settings → Domains** if you have one.

Note on rate limiting: the contact route limits each IP to 5 messages per 10 minutes, held in memory. On Vercel that limit is per function instance, which is fine for a personal site. For a strict global limit, swap `src/lib/rate-limit.ts` for Upstash Redis.

## Accessibility and motion

- `prefers-reduced-motion` turns off the intro, smooth scroll, parallax, carousel transitions, marquee and entrance animations.
- The menu is a modal dialog with a focus trap; the page behind it is inert.
- Sound is off by default and only starts after the visitor turns it on.
- axe-core reports 0 violations on every route at desktop and phone width.
