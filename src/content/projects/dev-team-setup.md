---
title: Dev Team Setup
summary: A Claude Code plugin that turns an idea into a working project with a team of AI agents, with a visual and your approval at every step.
year: 2026
status: In progress
roles: [AI, Software]
stack: [Claude Code, Python, Bash, Git, GitHub Actions]
skills: ['AI agents', 'Python', 'Software architecture', 'Testing & TDD', 'Git / GitHub', 'CI/CD (GitHub Actions)', 'Security', 'Linux']
repo: https://github.com/AbrahamLinksus/dev-team-setup
featured: false
order: 2
letter: D
color: yellow
highlights:
  - { value: '26', label: 'specialist agents across software, AI/ML and data science' }
  - { value: '9', label: 'stages from first question to handover' }
  - { value: '33', label: 'automated tests, run in CI on every push' }
visual: {"glance": {"problem": "One AI session building a whole app forgets decisions and edits what it should not.", "built": "A Claude Code plugin: an orchestrator runs a team of 26 agents through a pipeline with your approval at every step.", "result": "v0.5.1, with 33 tests in CI and a benchmark against a normal session."}, "shots": [{"caption": "Result card: Approve, Change, Reject"}, {"caption": "How it works, idea to handover"}], "flow": {"title": "From one line to a working project", "steps": [{"label": "Your idea", "note": "/setup-project …", "kind": "input"}, {"label": "Spec interview", "note": "With wireframes", "kind": "human"}, {"label": "Design", "note": "High-level, then team pick, then low-level", "kind": "step"}, {"label": "Build loop", "note": "Agents work inside their scope", "kind": "step"}, {"label": "Result card", "note": "Approve · Change · Reject", "kind": "human"}, {"label": "Handover", "note": "As-built docs and a walkthrough", "kind": "output"}], "footnote": "Every step is checkpointed in git, so a build can resume on any device."}}
caseFile: {"codename": "The agent who edited too much", "case": "Asking one AI session to build an app works for small things, then falls apart: it forgets earlier decisions, edits files it shouldn't, and you only find out at the end. I wanted the opposite. Type one line, answer a few questions, and approve every step while a team of agents does the work.", "clues": [{"fact": "One session forgets earlier decisions.", "meant": "An orchestrator that never writes code. It delegates, and passes file paths instead of pasting logs into its own context."}, {"fact": "Agents wander outside their job.", "meant": "Each agent has a written scope. A hook blocks out-of-scope edits and fails closed."}, {"fact": "Sessions end mid-build.", "meant": "Every step is checkpointed in git, so a build resumes on any device."}, {"fact": "People change their minds.", "meant": "Change requests you approve, with the design docs kept true to the code."}], "exhibits": [{"src": "/images/projects/dts-result-card.webp", "caption": "Exhibit A: the result card you approve after every task", "alt": "A result card showing goals, test results and Approve, Change and Reject buttons."}, {"src": "/images/projects/dts-how-it-works.webp", "caption": "Exhibit B: from idea to handover", "alt": "Diagram of the pipeline from an idea through spec, design and build to handover."}], "evidence": [{"label": "Specialist agents", "before": "", "after": "26"}, {"label": "Stages, idea to handover", "before": "", "after": "9"}, {"label": "Tests in CI", "before": "", "after": "33"}], "verdict": "Solved at v0.5.1: a plugin where nothing reaches the repo until you approve it.", "lesson": "The useful part of an agent team isn't more agents. It's the structure around them: who may touch what, where a human decides, and how work survives being interrupted."}
---

## Problem & goal

Asking one AI session to "build me an app" works for small things, then falls apart: it forgets earlier decisions, edits files it shouldn't, and you only find out at the end. I wanted the opposite. **You type one line, answer a few questions, and approve every step**, while a team of agents does the work, and you can do all of it from your phone.

## Process & decisions

- **The orchestrator never writes code.** `/setup-project` runs as an orchestrator that only plans, hands tasks to subagents and runs the approval gates. Planning agents (planner, researcher, architect, env setup, git) always run; the build team is picked from 26 agents after the high-level design is approved, so a data project gets an EDA agent and a web app gets a frontend coder.
- **A fixed pipeline with stops.** Spec interview with wireframes, high-level design, team pick, low-level design and conventions, environment setup, task plan, then the build loop and a handover. It stops for your answer at each stage, and after every task you get a result card with the goals, test results and a screenshot: Approve, Change or Reject.
- **Agents stay in their lane.** Every agent has a written scope of what it may change and which shell commands it may run. A hook blocks out-of-scope edits as they happen, and a check after each step reverts anything that slipped through a script. It fails closed: if the guard errors, the edit is refused.
- **It survives the session ending.** Each step is checkpointed in git, so `/setup-project resume <repo>` picks up exactly where it stopped, on any device.
- **Changing your mind is normal.** Say "make it work offline" and the plan is updated as a change request you approve, and the design docs are kept true to the code as it's built.
- **It watches its own context.** The orchestrator passes file paths between agents instead of pasting diffs and logs into its own context, so long builds don't drown it.

## Results & lessons

- At v0.5.1, with a test suite for the plugin's structure, the scope guard and the git checkpoints running in CI, and an example run with real planning output for a small todo app.
- A one-file benchmark, `bench.py`, builds the same app with a normal Claude Code session and with the plugin, and compares tokens, cost, how often you had to step in, and whether the app actually works.
- **The lesson:** the useful part of an agent team isn't more agents. It's the structure around them: who may touch what, where a human decides, and how work survives being interrupted.
