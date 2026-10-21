// Project data for the home carousel, /work and /work/[slug].
// Anything written as "[TODO: ...]" renders as a highlighted placeholder.

export type ProjectSlug = "study-copilot" | "triageiq" | "recall" | "queuedup";

export type Project = {
  slug: ProjectSlug;
  title: string;
  category: string;
  /** One line: what it is. */
  summary: string;
  /** One line: the result or outcome. */
  outcome: string;
  tags: string[];
  role: string;
  timeline: string;
  status: string;
  problem: string;
  built: string;
  stack: string[];
  /** Boxes for the architecture placeholder, left to right. */
  architecture: string[];
  /** Index of the box to highlight as the core of the system. */
  architectureCore: number;
  result: string;
  repo: string;
  demo: string;
};

export const projects: Project[] = [
  {
    slug: "study-copilot",
    title: "Study Copilot",
    category: "AI · RAG agent",
    summary:
      "A study assistant that reads your course material, answers questions from it, and plans study sessions on your Google Calendar.",
    outcome:
      "Time-aware ranking picks the current version of a revised handout 100% of the time, up from 67%, with no significant loss in retrieval quality.",
    tags: ["LangGraph", "Chroma", "Ollama"],
    role: "[TODO: role]",
    timeline: "[TODO: dates]",
    status: "[TODO: live / archived]",
    problem:
      "Course material goes out of date: week 2's handout gets revised in week 10, and deadlines pass. A normal RAG system ranks by topic alone, so it happily answers from the stale version.",
    built:
      "A Next.js app that ingests syllabi, slides, notes and past papers into Chroma, then re-ranks retrieved chunks by recency and deadline urgency. A LangGraph agent turns that context into a study plan, falls back to web search when coverage is low, and syncs the sessions to Google Calendar. Everything runs locally on Ollama, so there are no API keys or per-token costs.",
    stack: [
      "Next.js",
      "TypeScript",
      "LangChain",
      "LangGraph",
      "Chroma",
      "Ollama (nomic-embed-text, qwen2.5:7b)",
      "Prisma",
      "Google Calendar API",
      "Vitest",
    ],
    architecture: ["Upload", "Chunk + embed", "Chroma", "Time-decay re-rank", "LangGraph planner", "Google Calendar"],
    architectureCore: 3,
    result:
      "Evaluated on 437 labelled queries across 9 courses, with confidence intervals and significance tests, plus the external BEIR benchmarks. Time-decay ranking took \"current version wins\" from 67.2% to 100% (p < 0.001) with no significant cost to recall or MRR, and a hybrid BM25 + dense retriever reached nDCG@10 0.969, the best of the variants measured.",
    repo: "https://github.com/AbrahamLinksus/Study_copilot",
    demo: "",
  },
  {
    slug: "recall",
    title: "Recall Prediction",
    category: "Machine learning",
    summary:
      "Predicts the chance a Duolingo learner remembers a word at their next review, so a scheduler knows when to show it again.",
    outcome: "XGBoost AUC 0.652 vs 0.583 for the logistic baseline, on 23,218 held-out learners.",
    tags: ["PySpark", "XGBoost", "Calibration"],
    role: "[TODO: role]",
    timeline: "[TODO: dates]",
    status: "[TODO: live / archived]",
    problem:
      "Spaced-repetition schedulers need a recall probability they can trust, not just a ranking, because they schedule the next review for when that probability hits a target.",
    built:
      "A PySpark pipeline over Duolingo's 12.85M review logs: 18 leak-free features built with time-based windows, so no item sees answers from later in the same session; splits by learner, so test learners never appear in training; and an XGBoost model with isotonic calibration fitted on its own held-out set.",
    stack: ["Python", "PySpark", "XGBoost", "scikit-learn", "pandas", "Parquet"],
    architecture: ["Raw logs (12.85M)", "Spark ingest", "Feature build", "XGBoost", "Isotonic calibration", "Evaluate"],
    architectureCore: 3,
    result:
      "Tested on 4.75M reviews from 23,218 unseen learners, AUC rose from 0.583 for the logistic-regression baseline to 0.652, and calibration error dropped to 0.00055. The strongest signals were learner ability and word difficulty.",
    repo: "https://github.com/AbrahamLinksus/recallPrediction",
    demo: "",
  },
  {
    slug: "queuedup",
    title: "QueuedUp",
    category: "Full-stack",
    summary: "A spaced-repetition app for anything you can be graded on, such as DSA problems, CS fundamentals or AI concepts.",
    outcome:
      "Rebuilt from scratch, replacing a hard-coded review schedule with the FSRS algorithm, plus database-enforced privacy between users.",
    tags: ["Next.js", "Postgres", "FSRS"],
    role: "[TODO: role]",
    timeline: "[TODO: dates]",
    status: "[TODO: live / archived]",
    problem:
      "The first version's headline feature was fake. The \"spaced repetition\" was a fixed list of days (2, 5, 9, 16), and progress lived in the browser, so it didn't sync across devices.",
    built:
      "A rebuild around a proper scheduler, structured as a monorepo: a pure FSRS scheduling core with no database, I/O or clock access, so any review history can be replayed exactly; Postgres row-level security, so users only ever see their own data; an append-only review log; a transactional outbox drained by a separate worker; magic-link sign-in; and lint rules that enforce the module boundaries.",
    stack: ["Next.js", "TypeScript", "Postgres", "Prisma", "ts-fsrs", "Turborepo", "Vitest", "Docker"],
    architecture: ["Next.js app", "Practice service", "FSRS scheduler", "Postgres (RLS)", "Outbox worker"],
    architectureCore: 2,
    result:
      "A working path from sign-in to grading a card, where the interval updates and the outbox drains. It's covered by unit tests, integration tests against a real database (including a check that a query run without a user returns nothing), and one end-to-end test.",
    repo: "https://github.com/AbrahamLinksus/queuedup_v2",
    demo: "",
  },
  {
    slug: "triageiq",
    title: "TriageIQ",
    category: "MLOps · Health",
    summary: "Clinical risk prediction on MIMIC-III, wrapped in a full MLOps pipeline.",
    outcome: "[TODO: metric]",
    tags: ["MLOps", "MIMIC-III", "[TODO: stack]"],
    role: "[TODO: role]",
    timeline: "[TODO: dates]",
    status: "[TODO: live / archived]",
    problem: "[TODO: 2–3 sentences on who has the problem and why it matters]",
    built: "A risk model trained on MIMIC-III, with training, validation, deployment and monitoring as one pipeline. [TODO: details]",
    stack: ["MLOps", "MIMIC-III", "[TODO: stack]"],
    architecture: ["MIMIC-III", "Features", "Train + validate", "Model registry", "Serve + monitor"],
    architectureCore: 2,
    result: "[TODO: metric]",
    repo: "https://github.com/AbrahamLinksus", // [TODO] exact repo URL
    demo: "",
  },
];

export const internship = {
  company: "Drylogic Solutions",
  date: "Dec 2024",
  line: "Built an email campaign scheduler in Python, test-first (TDD), inside an Agile team.",
};

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
