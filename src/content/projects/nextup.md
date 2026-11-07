---
title: nextup
summary: A personal assistant that triages my Notion pages and Gmail, acts on what it's sure about, and queues the rest for me to review.
year: 2026
status: In progress
roles: [AI, Software]
stack: [Python, FastAPI, Postgres, pgvector, Ollama, Claude, MCP]
skills: [Python, FastAPI, PostgreSQL, LLMs, AI agents, Security]
repo: https://github.com/AbrahamLinksus/nextup
featured: true
order: 4
letter: N
color: orange
highlights:
  - { value: '4', label: 'rules decide what it may do alone' }
  - { value: '2', label: 'model calls in the action path' }
  - { value: '1', label: 'gate every action must pass' }
---

## Problem & goal

Most "AI agent" demos happily do things. I wanted an assistant that knows **the difference between what it may do on its own and what it has to ask about**. It reads my Notion pages and Gmail, works out what needs doing, and either does it or hands me a ready-made draft.

## Process & decisions

- **Two ways of running.** Incoming items go through a fixed pipeline: chunk, embed, classify, propose, gate, then act or queue. Nobody is watching, so the model only gets narrow calls. When I chat with it, it's a proper tool-using agent, because I'm there to say no.
- **One gate decides everything.** An action goes ahead only if four rules pass: the classification is confident, each field is confident, the date isn't in the past, and the item isn't flagged as a possible prompt injection. The injection flag overrides everything, because confidence is exactly what a manipulative message would try to fake.
- **Failing the gate isn't failure.** The item lands in my review queue with its partial draft attached, so I accept or tweak it instead of starting from scratch.
- **Locked down by default.** Webhooks are verified the way each source signs them (OIDC for Gmail, HMAC for Notion), and the API refuses to start in public without a token. Without a calendar connection, every action is a dry run.
- **Runs offline.** A local Ollama model works out of the box, and a mock Notion API lets the whole pipeline run with no accounts.

## Results & lessons

- The pipeline runs end to end on fixtures, and there are commands to audit any decision (`assistant audit`) and measure what it costs (`assistant metrics`).
- **The lesson:** the hard part of an agent isn't getting it to act. It's deciding when it shouldn't.
