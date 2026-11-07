---
title: fedLearn
summary: Federated learning for smart-home anomaly detection, with a reputation system that spots and removes poisoned clients.
year: 2026
status: Prototype
roles: [AI, Data]
stack: [Python, FastAPI, PyTorch, Streamlit, Plotly]
skills: ['Python', 'FastAPI', 'PyTorch', 'Federated learning', 'Distributed systems', 'Security']
repo: https://github.com/AbrahamLinksus/fedLearn
featured: false
order: 6
letter: F
color: pink
highlights:
  - { value: '100', label: 'simulated IoT clients' }
  - { value: '3', label: 'attack types simulated' }
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
