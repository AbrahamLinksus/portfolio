---
title: Recall Prediction
summary: Predicting whether a language learner will remember a word on their next review, as a calibrated probability a scheduler can trust.
year: 2026
status: Shipped
roles: [Data, AI]
stack: [Python, PySpark, XGBoost, Parquet]
skills: ['Python', 'PySpark', 'XGBoost', 'Feature engineering & calibration', 'Model evaluation & statistics']
repo: https://github.com/AbrahamLinksus/recallPrediction
featured: true
order: 3
letter: P
color: yellow
highlights:
  - { value: '12.85M', label: 'review logs processed' }
  - { value: '0.652', label: 'AUC, vs 0.583 for the baseline' }
  - { value: '0.00055', label: 'calibration error after isotonic' }
visual: {"glance": {"problem": "A spaced-repetition scheduler needs a true probability of remembering a word, not just a ranking.", "built": "An XGBoost model on 12.85M Duolingo reviews, split by learner and calibrated on a separate set.", "result": "AUC 0.652 against 0.583 for the baseline, with calibration error down to 0.00055."}, "shots": [], "flow": {"title": "From review logs to a probability", "steps": [{"label": "12.85M review logs", "note": "Duolingo HLR dataset", "kind": "input"}, {"label": "Weighted trials", "note": "Each session expanded: 23.4M trials", "kind": "step"}, {"label": "Split by learner", "note": "Test learners never seen in training", "kind": "gate"}, {"label": "18 features", "note": "Time-based windows, no leak", "kind": "step"}, {"label": "XGBoost", "kind": "step"}, {"label": "Isotonic calibration", "note": "On its own held-out set", "kind": "gate"}, {"label": "P(recall)", "note": "Ready for a scheduler", "kind": "output"}]}, "charts": [{"type": "line", "title": "The memory curve in the data", "note": "Recall barely falls: 91.6% within an hour, 88.2% after four months. Duolingo brings words back just before you would forget them, so almost every review is a success. That is why accuracy is useless here and a calibrated probability is what matters.", "yMin": 86, "yMax": 93, "yFormat": "{v}%", "xLabel": "Time since the word was last practised", "points": [{"x": "1 hr", "y": 91.6}, {"x": "3 hr", "y": 90.3}, {"x": "8 hr", "y": 90.1}, {"x": "1 d", "y": 90.3}, {"x": "2 d", "y": 90.2}, {"x": "4 d", "y": 90.0}, {"x": "1 wk", "y": 89.8}, {"x": "2 wk", "y": 89.6}, {"x": "1 mo", "y": 89.1}, {"x": "2 mo", "y": 88.3}, {"x": "4 mo", "y": 88.2}], "source": "All 12.85M reviews, weighted by trials. Axis zoomed to 86–93%."}, {"type": "bars", "title": "Telling remembered from forgotten (AUC)", "note": "0.5 is a coin flip. The bars start there.", "min": 0.5, "max": 0.7, "format": "{v}", "decimals": 3, "bars": [{"label": "Logistic regression baseline", "value": 0.5833}, {"label": "XGBoost, 18 features", "value": 0.6517}, {"label": "XGBoost + isotonic", "value": 0.6516, "highlight": true}]}, {"type": "bars", "title": "Calibration error (lower is better)", "min": 0, "max": 0.0018, "format": "{v}", "decimals": 5, "lowerIsBetter": true, "bars": [{"label": "Logistic regression baseline", "value": 0.00168}, {"label": "XGBoost, 18 features", "value": 0.001}, {"label": "XGBoost + isotonic", "value": 0.00055, "highlight": true}]}]}
caseFile: {"codename": "The scheduler that lied", "case": "A spaced-repetition app shows you a word again right before you would forget it. To do that it needs the exact chance that you still remember, not just a ranking of which words are harder. A model that ranks well but gets the probability slightly wrong sends every review at the wrong time.", "clues": [{"fact": "90.45% of reviews are remembered.", "meant": "Accuracy is useless: always guessing \"remembered\" beats any model. I measured AUC and calibration instead."}, {"fact": "Each row is a whole review session.", "meant": "Expanded into weighted right and wrong trials: 23.4M of them, nothing thrown away."}, {"fact": "99.7% of rows share a timestamp with another row from the same learner.", "meant": "A silent leak: a row could see its own session. Time-based windows fixed it. No error ever fired."}, {"fact": "The test must be on strangers.", "meant": "Split by learner, so 23,218 test learners never appear in training."}], "exhibits": [{"src": "/images/projects/recall-calibration.webp", "caption": "Exhibit A: predicted vs real recall on held-out learners", "alt": "Reliability curve: the calibrated XGBoost line sits on the diagonal; the baseline wanders off it."}], "evidence": [{"label": "AUC (0.5 is a coin flip)", "before": "0.583", "after": "0.652"}, {"label": "Calibration error", "before": "0.00168", "after": "0.00055"}, {"label": "Learners tested", "before": "", "after": "23,218 unseen"}], "verdict": "Solved. XGBoost on 18 features, calibrated on its own held-out set, gives a probability a scheduler can trust.", "lesson": "The most dangerous bug never raised an error. I only caught the leak by asserting a value that should stay constant within a session."}
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
