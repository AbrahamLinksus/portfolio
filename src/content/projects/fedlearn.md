---
title: fedLearn
summary: Federated learning for smart-home anomaly detection, with a reputation system that spots and removes poisoned clients.
year: 2026
status: Prototype
roles: [AI, Data]
stack: [Python, FastAPI, PyTorch, Streamlit, Plotly]
skills: ['Python', 'FastAPI', 'PyTorch', 'Federated learning', 'Distributed systems', 'Security', 'REST APIs']
repo: https://github.com/AbrahamLinksus/fedLearn
featured: false
order: 7
letter: F
color: pink
highlights:
  - { value: '100', label: 'simulated IoT clients' }
  - { value: '3', label: 'attack types simulated' }
visual: {"glance": {"problem": "In federated learning, one compromised device can quietly poison the shared model.", "built": "A 100-device smart-home simulation where the server scores every client and responds in stages.", "result": "Poisoned, replayed and flooding clients get caught and contained, live on a dashboard."}, "shots": [{"caption": "Live dashboard: rounds and reputations"}, {"caption": "A client being quarantined"}], "flow": {"title": "One training round", "steps": [{"label": "100 home devices", "note": "Each trains an LSTM autoencoder", "kind": "input"}, {"label": "Send updates", "note": "Never the raw data", "kind": "step"}, {"label": "Aggregator", "note": "FastAPI", "kind": "step"}, {"label": "Reputation score", "note": "Per client, every round", "kind": "gate"}, {"label": "Allow · monitor · quarantine · remove", "kind": "gate"}, {"label": "Shared model", "kind": "output"}]}}
caseFile: {"codename": "The device that poisoned the model", "case": "Federated learning trains a shared model without collecting anyone's raw data. Each device trains locally and sends only its updates. The catch: a compromised device can send poisoned updates and quietly wreck the model. I built a simulation to explore how a server can learn whom to trust.", "clues": [{"fact": "Raw data never leaves the home.", "meant": "100 simulated devices each train an LSTM autoencoder locally and send only updates."}, {"fact": "Any device could be compromised.", "meant": "The FastAPI aggregator tracks a reputation score for every client, every round."}, {"fact": "One bad round shouldn't ban an honest device.", "meant": "Graduated responses: allowed, monitored, quarantined, removed."}, {"fact": "You can't defend what you haven't attacked.", "meant": "Built-in poisoning, replay and flooding attacks, shown live on a Streamlit dashboard."}], "evidence": [{"label": "Simulated devices", "before": "", "after": "100"}, {"label": "Attack types", "before": "", "after": "3"}], "verdict": "Solved for the simulation. Bad clients get caught and contained, and telemetry shows how fast and what each block protects.", "lesson": "In a distributed system, trust has to be earned and measured all the time, not assumed at the start."}
---

## Problem & goal

Federated learning trains a shared model without collecting anyone's raw data. Each device trains locally and sends only its updates. The catch is that a compromised device can send poisoned updates and quietly wreck the model. I built a simulation to explore **how a server can learn whom to trust**.

## Process & decisions

- **100 simulated smart-home devices**, each training an LSTM autoencoder to spot unusual sensor readings.
- **A FastAPI aggregator** that combines updates and tracks a reputation score for every client.
- **Graduated responses.** Each client is allowed, monitored, quarantined or removed, based on its reputation and how often it's been blocked or caught poisoning.
- **Built-in attacks** to test the defences: poisoned updates, replayed updates, and flooding.
- **A live Streamlit dashboard** showing rounds, reputations and security telemetry as they happen.

## Results & lessons

- The whole simulation starts with one command, and integration smoke checks cover the main flow.
- Security telemetry records how quickly a bad client is caught and how many neighbouring clients a block protects.
- **The lesson:** in a distributed system, trust has to be earned and measured continuously, not assumed at the start.
