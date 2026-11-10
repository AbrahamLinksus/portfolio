---
title: nextup
summary: A personal assistant that triages my Notion pages and Gmail, acts on what it's sure about, and queues the rest for me to review.
year: 2026
status: In progress
roles: [AI, Software]
stack: [Python, FastAPI, Postgres, pgvector, Ollama, Claude, MCP]
skills: ['Python', 'FastAPI', 'PostgreSQL', 'Vector databases (Chroma, pgvector)', 'LLMs & local models (Ollama)', 'RAG / retrieval', 'AI agents', 'Docker', 'Security', 'REST APIs', 'GCP (incl. Pub/Sub)']
repo: https://github.com/AbrahamLinksus/nextup
featured: true
order: 5
letter: N
color: orange
highlights:
  - { value: '4', label: 'rules decide what it may do alone' }
  - { value: '2', label: 'model calls in the action path' }
  - { value: '1', label: 'gate every action must pass' }
visual: {"glance": {"problem": "Most AI assistants act on everything, including what they should have asked about.", "built": "An assistant for my Notion and Gmail that acts only when four rules pass, and queues a draft otherwise.", "result": "Runs end to end on fixtures, with commands to audit every decision and its cost."}, "shots": [{"caption": "Review queue with ready-made drafts"}, {"caption": "Decision audit for one item"}], "flow": {"title": "What happens to each new item", "steps": [{"label": "Notion / Gmail", "note": "Verified webhooks", "kind": "input"}, {"label": "Chunk + embed", "kind": "step"}, {"label": "Classify", "kind": "step"}, {"label": "Propose action", "kind": "step"}, {"label": "Gate: 4 rules", "note": "Confident, fields sure, date valid, no injection flag", "kind": "gate"}, {"label": "Act, or queue for me", "note": "Failing the gate leaves a draft", "kind": "output"}]}}
caseFile: {"codename": "The assistant that asked first", "case": "Most AI agent demos happily do things. I wanted an assistant that knows the difference between what it may do on its own and what it has to ask about. It reads my Notion pages and Gmail, works out what needs doing, and either does it or hands me a ready-made draft.", "clues": [{"fact": "Nobody watches the pipeline.", "meant": "Incoming items get narrow model calls only. Chat is the full tool-using agent, because I am there to say no."}, {"fact": "Confidence can be faked.", "meant": "The prompt-injection flag overrides all four rules of the gate."}, {"fact": "Failing the gate shouldn't waste the work.", "meant": "The item lands in my review queue with its partial draft attached."}, {"fact": "Webhooks can be spoofed.", "meant": "Gmail is verified with OIDC, Notion with HMAC, and the API refuses to start in public without a token."}], "evidence": [{"label": "Rules in the gate", "before": "", "after": "4"}, {"label": "Model calls in the action path", "before": "", "after": "2"}, {"label": "Without a calendar connection", "before": "", "after": "every action is a dry run"}], "verdict": "Solved. It runs end to end on fixtures, and every decision and its cost can be audited.", "lesson": "The hard part of an agent isn't getting it to act. It's deciding when it shouldn't."}
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
