import advancedDsa from './knowledge/advanced-dsa.json';
import notesRepo from './knowledge/notes.json';

// Data for the Skill Cortex (the neural map at the top of the Skills page).
// Main skills come from skills.ts. Extra neurons below are parts of those skills
// (or coursework topics) that only appear in the map, not in the skill lists.

// Regions of work. Left hemisphere builds, right hemisphere learns.
// Related regions mirror each other across the midline.
export const regions = {
  f: { name: 'Frontend & full-stack', p: [-0.95, 0.3, 0.7], roles: ['swe'] },
  b: { name: 'Backend engineering', p: [-0.75, 0.68, -0.05], roles: ['swe'] },
  o: { name: 'DevOps & cloud', p: [-0.9, 0.05, -0.78], roles: ['swe'] },
  y: { name: 'Systems & low-level', p: [-1.0, -0.62, 0.05], roles: ['swe'] },
  a: { name: 'AI & LLM engineering', p: [0.95, 0.3, 0.7], roles: ['ai'] },
  e: { name: 'Data engineering', p: [0.75, 0.68, -0.05], roles: ['data'] },
  d: { name: 'Data science', p: [0.9, 0.05, -0.78], roles: ['data'] },
  m: { name: 'Machine learning', p: [1.0, -0.62, 0.05], roles: ['ai', 'data'] },
} as const;
export type RegionKey = keyof typeof regions;

// Which regions of work use each main skill (letters are region keys).
export const workOf: Record<string, string> = {
  Python: 'bedma',
  SQL: 'bed',
  JavaScript: 'fb',
  'HTML / CSS': 'f',
  TypeScript: 'fba',
  'C++': 'y',
  C: 'y',
  'Next.js / React': 'f',
  'Node.js / Express': 'b',
  'Tailwind CSS': 'f',
  XGBoost: 'dm',
  'scikit-learn': 'dm',
  'pandas / NumPy': 'edm',
  'OpenAI API': 'a',
  FastAPI: 'ba',
  'LangChain / LangGraph': 'a',
  PySpark: 'ed',
  Prisma: 'b',
  PyTorch: 'ma',
  TensorFlow: 'm',
  Django: 'b',
  PostgreSQL: 'be',
  MySQL: 'be',
  MongoDB: 'be',
  'Vector databases (Chroma, pgvector)': 'a',
  Linux: 'yo',
  'Git / GitHub': 'fbo',
  'Redis / BullMQ': 'b',
  Elasticsearch: 'be',
  'CI/CD (GitHub Actions)': 'o',
  Docker: 'ob',
  AWS: 'o',
  'GCP (incl. Pub/Sub)': 'oe',
  'LLMs & local models (Ollama)': 'a',
  'RAG / retrieval': 'a',
  'AI agents': 'a',
  'Model evaluation & statistics': 'dma',
  'Feature engineering & calibration': 'dm',
  'Federated learning': 'my',
  'Software architecture': 'b',
  'REST APIs': 'bf',
  'Database design (ER, normalization, indexing)': 'be',
  'Data structures & algorithms': 'yb',
  'Design patterns / SOLID': 'bf',
  'Distributed systems': 'boe',
  'Testing & TDD': 'bf',
  Security: 'bo',
  'Operating systems': 'y',
  'Computer networks': 'yo',
  'Computer architecture': 'y',
  'Compilers & code optimization': 'y',
};

// Extra neurons. `parent` = the listed skill this is part of (its level is inherited).
// `level` is only set for topics without a parent; `confirmed: false` marks a level Jake hasn't confirmed.
// `projects` = project slugs where the repo shows it.
export type ExtraNeuron = {
  name: string;
  parent?: string;
  cat?: number;
  level?: 'Advanced' | 'Comfortable' | 'Learning';
  confirmed?: boolean;
  work: string;
  projects?: string[];
};

export const extraNeurons: ExtraNeuron[] = [
  // Frontend
  { name: 'React hooks & state', parent: 'Next.js / React', work: 'f', projects: ['reachinbox-scheduler', 'study-copilot', 'queuedup'] },
  { name: 'Server rendering & routing', parent: 'Next.js / React', work: 'f', projects: ['reachinbox-scheduler', 'study-copilot', 'queuedup'] },
  { name: 'Responsive layouts', parent: 'HTML / CSS', work: 'f' },
  { name: 'DOM & browser events', parent: 'JavaScript', work: 'f' },
  { name: 'Async / await & promises', parent: 'JavaScript', work: 'fb' },
  { name: 'Type-safe APIs', parent: 'TypeScript', work: 'fb', projects: ['reachinbox-scheduler', 'queuedup'] },

  // Backend
  { name: 'Job queues & delayed jobs', parent: 'Redis / BullMQ', work: 'b', projects: ['reachinbox-scheduler'] },
  { name: 'Distributed rate limiting', parent: 'Redis / BullMQ', work: 'bo', projects: ['reachinbox-scheduler'] },
  { name: 'Idempotency keys', parent: 'REST APIs', work: 'b', projects: ['reachinbox-scheduler'] },
  { name: 'Transactional outbox', parent: 'Software architecture', work: 'be', projects: ['reachinbox-scheduler', 'queuedup'] },
  { name: 'Ports & adapters', parent: 'Software architecture', work: 'b', projects: ['reachinbox-scheduler'] },
  { name: 'Middleware & request guards', parent: 'Node.js / Express', work: 'b', projects: ['reachinbox-scheduler'] },
  { name: 'OAuth & session auth', parent: 'Security', work: 'bf', projects: ['reachinbox-scheduler', 'queuedup'] },
  { name: 'Webhook verification (HMAC, OIDC)', parent: 'Security', work: 'bo', projects: ['nextup'] },
  { name: 'ORM schema migrations', parent: 'Prisma', work: 'be', projects: ['queuedup'] },
  { name: 'Concurrency & multithreading', parent: 'Operating systems', work: 'yb', projects: ['reachinbox-scheduler'] },

  // DevOps & cloud
  { name: 'Docker Compose', parent: 'Docker', work: 'o', projects: ['reachinbox-scheduler', 'nextup', 'queuedup'] },
  { name: 'Health checks & Prometheus metrics', parent: 'Distributed systems', work: 'o', projects: ['reachinbox-scheduler'] },
  { name: 'Lint & dependency-boundary checks in CI', parent: 'CI/CD (GitHub Actions)', work: 'o', projects: ['queuedup'] },
  { name: 'Static hosting & preview deploys', parent: 'CI/CD (GitHub Actions)', work: 'of', projects: ['reachinbox-scheduler'] },
  { name: 'Bash & shell scripting', parent: 'Linux', work: 'oy', projects: ['fedlearn'] },
  { name: 'Secrets & environment config', parent: 'Security', work: 'o', projects: ['reachinbox-scheduler', 'nextup'] },

  // Systems & low-level
  { name: 'Memory management', parent: 'Operating systems', work: 'y' },
  { name: 'Virtual memory & paging', parent: 'Operating systems', work: 'y' },
  { name: 'Process & disk scheduling', parent: 'Operating systems', work: 'y' },
  { name: 'Semaphores & mutexes', parent: 'Operating systems', work: 'y' },
  { name: 'Deadlock detection & avoidance', parent: 'Operating systems', work: 'y' },
  { name: 'TCP/IP', parent: 'Computer networks', work: 'yo' },
  { name: 'Socket programming', parent: 'Computer networks', work: 'yb' },
  { name: 'Pipelining & ISAs (x86, MIPS)', parent: 'Computer architecture', work: 'y' },
  { name: 'RISC vs CISC', parent: 'Computer architecture', work: 'y' },
  { name: 'Control-flow graphs & IR', parent: 'Compilers & code optimization', work: 'y' },
  { name: 'Dead code elimination & constant folding', parent: 'Compilers & code optimization', work: 'y' },
  { name: 'Register allocation', parent: 'Compilers & code optimization', work: 'y' },
  { name: 'Big-O analysis', parent: 'Data structures & algorithms', work: 'yb' },
  { name: 'Dynamic programming', parent: 'Data structures & algorithms', work: 'y' },
  { name: 'Object-oriented programming', cat: 5, level: 'Advanced', work: 'bf' },

  // Data engineering
  { name: 'Spark ETL pipelines', parent: 'PySpark', work: 'e', projects: ['recall-prediction'] },
  { name: 'Parquet & columnar storage', parent: 'PySpark', work: 'e', projects: ['recall-prediction'] },
  { name: 'Partitioning large datasets', parent: 'PySpark', work: 'e', projects: ['recall-prediction'] },
  { name: 'Window functions', parent: 'SQL', work: 'ed', projects: ['recall-prediction'] },
  { name: 'Indexing & query tuning', parent: 'Database design (ER, normalization, indexing)', work: 'be' },
  { name: 'Row-level security', parent: 'PostgreSQL', work: 'be', projects: ['queuedup'] },
  { name: 'Full-text search', parent: 'Elasticsearch', work: 'be', projects: ['reachinbox-scheduler'] },
  { name: 'Event-driven ingestion (Pub/Sub)', parent: 'GCP (incl. Pub/Sub)', work: 'eo', projects: ['nextup'] },

  // Data science
  { name: 'Exploratory data analysis', parent: 'pandas / NumPy', work: 'd' },
  { name: 'Bootstrap CIs & permutation tests', parent: 'Model evaluation & statistics', work: 'd', projects: ['study-copilot'] },
  { name: 'Train / calibration / test splits', parent: 'Model evaluation & statistics', work: 'dm', projects: ['recall-prediction'] },
  { name: 'Data leakage detection', parent: 'Feature engineering & calibration', work: 'dm', projects: ['recall-prediction'] },
  { name: 'Live dashboards (Streamlit, Plotly)', parent: 'pandas / NumPy', work: 'd', projects: ['fedlearn'] },
  { name: 'Probability theory', cat: 3, level: 'Comfortable', work: 'dm' },
  { name: 'Linear algebra', cat: 3, level: 'Comfortable', work: 'md' },

  // Machine learning
  { name: 'Gradient boosting', parent: 'XGBoost', work: 'm', projects: ['recall-prediction'] },
  { name: 'Isotonic calibration', parent: 'Feature engineering & calibration', work: 'm', projects: ['recall-prediction'] },
  { name: 'Cross-validation', parent: 'scikit-learn', work: 'md' },
  { name: 'LSTM autoencoders', parent: 'PyTorch', work: 'm', projects: ['fedlearn'] },
  { name: 'Anomaly detection', parent: 'Federated learning', work: 'm', projects: ['fedlearn'] },
  { name: 'Robust aggregation & poisoning defense', parent: 'Federated learning', work: 'my', projects: ['fedlearn'] },

  // AI & LLM engineering
  { name: 'Embeddings', parent: 'RAG / retrieval', work: 'a', projects: ['study-copilot', 'nextup'] },
  { name: 'Chunking strategies', parent: 'RAG / retrieval', work: 'a', projects: ['study-copilot', 'nextup'] },
  { name: 'Time-aware re-ranking', parent: 'RAG / retrieval', work: 'a', projects: ['study-copilot'] },
  { name: 'Retrieval evals (BEIR, MRR, nDCG)', parent: 'Model evaluation & statistics', work: 'ad', projects: ['study-copilot'] },
  { name: 'Prompt design', parent: 'LLMs & local models (Ollama)', work: 'a', projects: ['study-copilot', 'nextup'] },
  { name: 'Tool calling', parent: 'AI agents', work: 'a', projects: ['nextup'] },
  { name: 'Structured outputs', parent: 'AI agents', work: 'a', projects: ['nextup'] },
  { name: 'Confidence gating', parent: 'AI agents', work: 'a', projects: ['nextup'] },
  { name: 'Prompt-injection defense', parent: 'AI agents', work: 'ab', projects: ['nextup'] },
  { name: 'Graph state machines', parent: 'LangChain / LangGraph', work: 'a', projects: ['study-copilot'] },
  { name: 'Artificial intelligence (search, logic)', cat: 3, level: 'Advanced', work: 'a' },
];

// Study notes: topics from note/practice repos become neurons, and each problem or note
// becomes a small "memory" around its topic. Work regions per topic:
export type MemoryItem = {
  title: string;
  path: string;
  day: string | null;
  kind: 'problem' | 'note';
  status: 'done' | 'sketch' | 'planned';
  takeaway?: string;
  source?: string | null;
  firstSeen?: string | null;
  revisions?: number;
  links?: string[];
};
// A line from the notes repo's _topics.md: "- path → skill: … · region: … · level: …".
export type TopicMap = { skill?: string; region?: string; level?: string; suggested?: boolean } | null;
export type StudySource = { source: string; url: string; branch: string; topics: { topic: string; map?: TopicMap; items: MemoryItem[] }[] };

// advancedDSA is a one-time snapshot. notes.json is refreshed from github.com/AbrahamLinksus/notes
// before every build by scripts/sync-notes.mjs.
export const studySources: StudySource[] = [advancedDsa as StudySource, notesRepo as StudySource];

// How free-text skills in the notes repo's _topics.md map onto neurons already in the brain.
// Anything not listed here (and not an exact neuron name) becomes its own subject hub neuron.
export const skillAliases: Record<string, string> = {
  statistics: 'Model evaluation & statistics',
  probability: 'Probability theory',
  'data preprocessing': 'Feature engineering & calibration',
  'feature engineering': 'Feature engineering & calibration',
  dsa: 'Data structures & algorithms',
  'data structures': 'Data structures & algorithms',
  algorithms: 'Data structures & algorithms',
  'operating systems': 'Operating systems',
  networking: 'Computer networks',
};

// Free-text region names from _topics.md, matched to region keys.
export const regionAliases: Record<string, string> = {
  frontend: 'f', 'full-stack': 'f', backend: 'b', devops: 'o', cloud: 'o', systems: 'y', 'low-level': 'y',
  ai: 'a', llm: 'a', 'data engineering': 'e', 'data science': 'd', 'machine learning': 'm', ml: 'm',
};

// Neuron type for a new subject hub, by the region it lives in.
export const regionCategory: Record<string, number> = { f: 4, b: 4, o: 4, y: 5, e: 2, d: 3, m: 3, a: 3 };

// Which listed skill each study topic belongs to, and where it sits in the brain.
export const studyTopicMeta: Record<string, { parent: string; work: string }> = {
  'Hashing & hash maps': { parent: 'Data structures & algorithms', work: 'yb' },
  'Sorting & top-k': { parent: 'Data structures & algorithms', work: 'yb' },
  'Sliding window & two pointers': { parent: 'Data structures & algorithms', work: 'yb' },
  'Arrays & prefix sums': { parent: 'Data structures & algorithms', work: 'yb' },
  'Math & combinatorics': { parent: 'Data structures & algorithms', work: 'yd' },
  'String matching': { parent: 'Data structures & algorithms', work: 'yb' },
  'Linked lists': { parent: 'Data structures & algorithms', work: 'y' },
  'Stacks, queues & deques': { parent: 'Data structures & algorithms', work: 'y' },
  'Heaps & ordered maps': { parent: 'Data structures & algorithms', work: 'y' },
  'Binary trees': { parent: 'Data structures & algorithms', work: 'y' },
  'BSTs & balanced trees': { parent: 'Data structures & algorithms', work: 'y' },
  'Graph traversal (BFS / DFS)': { parent: 'Data structures & algorithms', work: 'y' },
  'Topological sort & cycles': { parent: 'Data structures & algorithms', work: 'y' },
  'Union-find & MSTs': { parent: 'Data structures & algorithms', work: 'y' },
  'Shortest paths': { parent: 'Data structures & algorithms', work: 'y' },
  'Greedy algorithms': { parent: 'Data structures & algorithms', work: 'y' },
  'Dominator trees (compilers)': { parent: 'Compilers & code optimization', work: 'y' },
};
