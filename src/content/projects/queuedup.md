---
title: QueuedUp
summary: A spaced-repetition system where a card can be anything you can be graded on. The scheduler is the product.
year: 2026
status: Prototype
roles: [Software]
stack: [TypeScript, Next.js, Prisma, Postgres, pgvector, Turborepo]
skills: ['TypeScript', 'Next.js / React', 'PostgreSQL', 'SQL', 'Docker', 'Software architecture', 'Security', 'Testing & TDD', 'Prisma', 'CI/CD (GitHub Actions)', 'Database design (ER, normalization, indexing)', 'Design patterns / SOLID']
repo: https://github.com/AbrahamLinksus/queuedup_v2
featured: false
order: 5
letter: Q
color: lime
highlights:
  - { value: '3', label: 'database roles, enforced by Postgres' }
  - { value: '0', label: 'rows returned without a user scope' }
---

## Problem & goal

Flashcard apps assume a card is a question and an answer. I wanted a spaced-repetition system where **anything you can be graded on** can be a card, with a scheduler solid enough to build on.

## Process & decisions

- **A pure scheduler.** The core package can't import the database, do any I/O, or read the clock. The current time is passed in as a parameter, which makes every review log replayable.
- **Security in the database, not in my memory.** Instead of remembering to filter every query by user, Postgres row-level security does it. The app runs as one of three roles with different permissions.
- **Boundaries enforced in CI.** Lint rules stop modules from importing what they shouldn't, so the architecture can't quietly erode.
- **An outbox and a worker** handle side effects outside the request.

## Results & lessons

- A working end-to-end skeleton: magic-link sign-in, create a topic and a card, review it, watch the interval move, and see the outbox drain.
- Integration tests run against real Postgres, including one that checks a query without a user scope returns zero rows. A mocked database client proves nothing about row-level security.
- **What's next:** a generic card renderer, ordering by topic confidence, and timezone-aware day boundaries.
