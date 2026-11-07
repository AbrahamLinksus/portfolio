---
title: Recall Prediction
summary: Predicting whether a language learner will remember a word on their next review, as a calibrated probability a scheduler can trust.
year: 2026
status: Shipped
roles: [Data, AI]
stack: [Python, PySpark, XGBoost, Parquet]
skills: [Python, PySpark, XGBoost, Feature engineering, Calibration, Statistics]
repo: https://github.com/AbrahamLinksus/recallPrediction
featured: true
order: 3
letter: P
color: yellow
highlights:
  - { value: '12.85M', label: 'review logs processed' }
  - { value: '0.652', label: 'AUC, vs 0.583 for the baseline' }
  - { value: '0.00055', label: 'calibration error after isotonic' }
---

## Problem & goal

Spaced-repetition apps decide when to show a word again by asking when your chance of remembering it drops below a target. That means the model's output has to be a **true probability**, not just a ranking. Using Duolingo's public Half-Life Regression dataset of 12.85 million review logs, I set out to predict next-review recall well enough for a scheduler to rely on.

## Process & decisions

- **Accuracy is useless here.** Learners recall 90.45% of words, so always guessing "remembered" beats any model on accuracy. I report AUC and calibration instead.
- **The label is a proportion, not a yes/no.** Each row is a review session. I expanded it into weighted correct and incorrect trials, which gives 23.4M trials without throwing information away.
- **Split by learner, not by row.** Test learners never appear in training, so the results show the model works on new people.
- **I found and fixed a silent leak.** 99.7% of rows share a timestamp with another row from the same learner, so a row-based window let an item see results from its own session. Switching to a time-based window fixed it. It never raised an error; I only caught it by asserting a value that should stay constant within a session.
- **A separate calibration set,** so the calibrator never sees data the model was tuned on.

## Results & lessons

Tested on **23,218 held-out learners** (4.75M trials):

| Model | AUC | Calibration error (ECE) |
| --- | --- | --- |
| Logistic regression baseline | 0.5833 | 0.00168 |
| XGBoost, 18 features | 0.6517 | 0.00100 |
| XGBoost + isotonic calibration | 0.6516 | 0.00055 |

- **The engineered features are what scale.** Moving from a 482K-row sample to the full data added 0.040 AUC to XGBoost, while the baseline stayed flat.
- **Most of the miscalibration was a small-data effect.** Error dropped 12× with more data alone. Isotonic calibration then halved what was left.
