// Project data for the home carousel, /work and /work/[slug].
// Anything written as "[TODO: ...]" renders as a highlighted placeholder.

export type ProjectSlug = "crosscheck" | "study-copilot" | "triageiq" | "recall" | "queuedup";

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
    slug: "crosscheck",
    title: "Crosscheck",
    category: "AI · Retrieval",
    summary: "Contradiction-aware RAG over SEC filings.",
    outcome: "Flags when two filings disagree instead of quietly picking one. [TODO: metric]",
    tags: ["RAG", "SEC filings", "[TODO: stack]"],
    role: "[TODO: role]",
    timeline: "[TODO: dates]",
    status: "[TODO: live / archived]",
    problem: "[TODO: 2–3 sentences on who has the problem and why it matters]",
    built:
      "A retrieval pipeline over SEC filings that surfaces conflicting statements side by side. [TODO: key features and the hardest decision]",
    stack: ["RAG", "[TODO: stack]"],
    architecture: ["SEC filings", "Chunk + embed", "Retriever", "Contradiction check", "Answer + sources"],
    architectureCore: 3,
    result: "[TODO: metric or outcome]",
    repo: "https://github.com/AbrahamLinksus", // [TODO] exact repo URL
    demo: "",
  },
  {
    slug: "study-copilot",
    title: "Study Copilot",
    category: "AI · Assistant",
    summary: "A RAG-powered assistant that answers from your own course material.",
    outcome: "[TODO: outcome]",
    tags: ["Next.js", "LangChain", "RAG"],
    role: "[TODO: role]",
    timeline: "[TODO: dates]",
    status: "[TODO: live / archived]",
    problem: "[TODO: 2–3 sentences on who has the problem and why it matters]",
    built: "An academic assistant that retrieves from course material before it answers. [TODO: key features]",
    stack: ["Next.js", "LangChain", "[TODO: vector store / model]"],
    architecture: ["Next.js UI", "API route", "LangChain chain", "Vector store", "LLM"],
    architectureCore: 2,
    result: "[TODO: outcome]",
    repo: "https://github.com/AbrahamLinksus", // [TODO] exact repo URL
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
  {
    slug: "recall",
    title: "Recall Prediction",
    category: "Machine learning",
    summary: "Predicts when a Duolingo learner is about to forget a word.",
    outcome: "XGBoost AUC 0.652 vs 0.583 for the logistic baseline.",
    tags: ["XGBoost", "Half-life regression", "Duolingo data"],
    role: "[TODO: role]",
    timeline: "[TODO: dates]",
    status: "[TODO: live / archived]",
    problem: "[TODO: 2–3 sentences on who has the problem and why it matters]",
    built: "A half-life regression setup on Duolingo practice data, compared against a logistic baseline. [TODO: features used]",
    stack: ["XGBoost", "Half-life regression", "[TODO: stack]"],
    architecture: ["Practice logs", "Features", "Logistic baseline", "XGBoost", "Evaluate (AUC)"],
    architectureCore: 3,
    result: "XGBoost reached an AUC of 0.652, against 0.583 for the logistic regression baseline.",
    repo: "https://github.com/AbrahamLinksus", // [TODO] exact repo URL
    demo: "",
  },
  {
    slug: "queuedup",
    title: "QueuedUp",
    category: "Full-stack",
    summary: "A spaced-repetition tracker that tells you which problem to practise next.",
    outcome: "[TODO: outcome]",
    tags: ["Full-stack", "Spaced repetition", "[TODO: stack]"],
    role: "[TODO: role]",
    timeline: "[TODO: dates]",
    status: "[TODO: live / archived]",
    problem: "[TODO: 2–3 sentences on who has the problem and why it matters]",
    built: "A full-stack practice tracker that schedules reviews with spaced repetition. [TODO: key features]",
    stack: ["[TODO: stack]"],
    architecture: ["Web client", "API", "Scheduler", "Database"],
    architectureCore: 2,
    result: "[TODO: outcome]",
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
