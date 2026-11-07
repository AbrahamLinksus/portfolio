---
title: ReachInbox Email Scheduler
summary: An email campaign scheduler that survives restarts, never sends twice, and holds every sender's hourly limit across many workers.
year: 2026
status: Live
roles: [Software]
stack: [TypeScript, Express, BullMQ, Redis, Postgres, Drizzle, Elasticsearch, Next.js]
skills: ['TypeScript', 'Node.js / Express', 'Next.js / React', 'PostgreSQL', 'SQL', 'Redis / BullMQ', 'Elasticsearch', 'Docker', 'Distributed systems', 'Software architecture', 'Testing & TDD', 'REST APIs', 'Database design (ER, normalization, indexing)', 'Design patterns / SOLID']
repo: https://github.com/AbrahamLinksus/reachinbox-scheduler
live: https://reachinbox-scheduler-dusky.vercel.app
featured: true
order: 1
letter: R
color: pink
highlights:
  - { value: '497', label: 'tests across 48 files' }
  - { value: '2,000', label: 'emails in the load test, none lost or duplicated' }
  - { value: '0', label: 'cron jobs' }
---

## Problem & goal

Scheduling email campaigns sounds simple until things go wrong. A server restarts mid-send, two workers grab the same job, or a sender goes over its hourly limit and gets blocked. The brief was a scheduler with a dashboard, built in a 48-hour window. I set a harder goal: **no email is ever dropped or sent twice, whatever crashes.**

## Process & decisions

- **No cron anywhere.** Scheduling uses BullMQ delayed jobs only, so timing lives in one place.
- **Postgres is the source of truth.** The `emails` table doubles as an outbox. A relay moves due emails into Redis, and a reconciler repairs anything that drifts, so Redis can be wiped and rebuilt.
- **A rate limiter that holds across workers.** The hourly cap is a Redis Lua script keyed per sender. When an hour is full, the email moves to the next window instead of failing.
- **One codebase, four shapes.** A `ROLE` setting runs the process as the API, the worker, the relay, or all three, so each part scales on its own.
- **Safe retries in the UI.** The Next.js dashboard calls the API through a same-origin proxy, which avoids CORS and third-party cookies. Every campaign form carries an idempotency key, so retrying a failed request can't create a second campaign.

## Results & lessons

- **497 tests across 48 files.** Only SMTP is faked. Postgres, Redis, the Lua limiter and BullMQ are real in every integration test, because that's where the guarantees actually live.
- **The load test passes:** 2,000 emails, 4 workers, a cap of 100 per hour. The cap held, and nothing was lost or duplicated.
- **Each invariant is checked by mutation.** I broke the code on purpose and made sure a named test failed.
- **It's live** on Vercel and Render's free tiers. Elasticsearch isn't deployed there because no free tier exists, so search only works locally. Everything else works.

The lesson I keep coming back to is that a mocked dependency only proves your idea of that dependency. That's why every integration test runs against the real services.
