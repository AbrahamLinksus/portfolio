---
title: Study Copilot
summary: A study assistant that reads your coursework, answers questions with time-aware retrieval, and plans study sessions on your Google Calendar.
year: 2026
status: In progress
roles: [AI, Software]
stack: [TypeScript, Next.js, LangChain, LangGraph, Chroma, Ollama, Google Calendar API]
skills: ['TypeScript', 'Next.js / React', 'LangChain / LangGraph', 'Vector databases (Chroma, pgvector)', 'LLMs & local models (Ollama)', 'RAG / retrieval', 'AI agents', 'Model evaluation & statistics']
repo: https://github.com/AbrahamLinksus/Study_copilot
featured: true
order: 2
letter: S
color: teal
highlights:
  - { value: '437', label: 'labeled queries in the eval suite' }
  - { value: '67% → 95%', label: 'temporal questions answered correctly' }
  - { value: '$0', label: 'per token: models run locally' }
---

## Problem & goal

Coursework changes over a term. Week-10 slides replace week-2 notes, and deadlines pass. Plain vector search ignores all of that: it returns whatever is most similar, even when it's out of date. I wanted an assistant that knows **what's current**, and can turn that into a study plan on my calendar.

## Process & decisions

- **Time-decay scoring.** Each result's score is its similarity, multiplied by a recency weight and an urgency weight. The recency weight is deliberately bounded. Unbounded, it spans about 45× over a semester, so the newest file would win every query regardless of topic.
- **Decay depends on the kind of document.** Slides replace each other, but a syllabus stays the right answer all term. The decay rate is set per source type.
- **Runs locally.** Ollama serves `nomic-embed-text` and `qwen2.5:7b` on-device, so there's no API key and no per-token cost. OpenAI stays available as a switch, for comparison.
- **A LangGraph agent** retrieves context, generates a plan, and syncs it to Google Calendar.
- **A real evaluation harness**, because a single set of results didn't hold up once I scaled it. It has 437 labeled queries over 95 documents in 9 courses, 623 BEIR queries with human judgements, BM25 and fusion baselines, bootstrap confidence intervals, and paired significance tests.

## Results & lessons

- Light decay (strength 0.05) raised temporal correctness from **67.2% to 95.3%**. It improved MRR by 0.019 and cost no significant recall.
- Aggressive decay (0.40) got temporal questions **100%** right, but recall@5 dropped 4.4 points and MRR fell by 0.278. The newest handout started beating the material the question was actually about.
- **The lesson:** scaling up the test set reversed my earlier conclusion. Decay should break ties between equally relevant results, not override relevance.
