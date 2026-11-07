// Skills and self-assessed levels. Project files reference skills by `name`.
export type Level = 'Advanced' | 'Comfortable' | 'Learning';

export const levels: Record<Level, { rank: number; note: string; color: string }> = {
  Advanced: { rank: 3, note: 'Could teach it', color: 'var(--pink)' },
  Comfortable: { rank: 2, note: 'Daily driver', color: 'var(--teal)' },
  Learning: { rank: 1, note: 'Still in beta', color: 'var(--yellow)' },
};

// `from`: where the skill was learned, when no project on the site shows it yet.
export type Skill = { name: string; level: Level; from?: string[] };
export type SkillGroup = { title: string; pun: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    pun: 'Fluent in several. Also fluent in error messages.',
    skills: [
      { name: 'Python', level: 'Advanced' , from: ['Drylogic internship'] },
      { name: 'SQL', level: 'Advanced' , from: ['SQL certificates'] },
      { name: 'JavaScript', level: 'Advanced' , from: ['Web Dev & React course'] },
      { name: 'HTML / CSS', level: 'Advanced' , from: ['Web Dev & React course'] },
      { name: 'TypeScript', level: 'Comfortable' },
      { name: 'C++', level: 'Learning' , from: ['C++ certificate'] },
      { name: 'C', level: 'Learning' },
    ],
  },
  {
    title: 'Frameworks & libraries',
    pun: 'Standing on the shoulders of npm and pip.',
    skills: [
      { name: 'Next.js / React', level: 'Advanced' , from: ['Web Dev & React course'] },
      { name: 'Node.js / Express', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Advanced' },
      { name: 'XGBoost', level: 'Advanced' },
      { name: 'scikit-learn', level: 'Advanced' },
      { name: 'pandas / NumPy', level: 'Advanced' },
      { name: 'OpenAI API', level: 'Advanced' , from: ['IBM GenAI certificate'] },
      { name: 'FastAPI', level: 'Comfortable' },
      { name: 'LangChain / LangGraph', level: 'Comfortable' },
      { name: 'PySpark', level: 'Comfortable' },
      { name: 'Prisma', level: 'Comfortable' },
      { name: 'PyTorch', level: 'Learning' },
      { name: 'TensorFlow', level: 'Learning' },
      { name: 'Django', level: 'Learning' },
    ],
  },
  {
    title: 'Data & infrastructure',
    pun: 'Where the data lives, and how it gets around.',
    skills: [
      { name: 'PostgreSQL', level: 'Advanced' },
      { name: 'MySQL', level: 'Advanced' },
      { name: 'MongoDB', level: 'Advanced' },
      { name: 'Vector databases (Chroma, pgvector)', level: 'Advanced' },
      { name: 'Linux', level: 'Advanced' , from: ['Linux & SQL certificate'] },
      { name: 'Git / GitHub', level: 'Advanced' , from: ['Git & GitHub certificate'] },
      { name: 'Redis / BullMQ', level: 'Comfortable' },
      { name: 'Elasticsearch', level: 'Comfortable' },
      { name: 'CI/CD (GitHub Actions)', level: 'Comfortable' },
      { name: 'Docker', level: 'Learning' },
      { name: 'AWS', level: 'Learning' },
      { name: 'GCP (incl. Pub/Sub)', level: 'Learning' },
    ],
  },
  {
    title: 'AI & data',
    pun: 'Models, measured honestly.',
    skills: [
      { name: 'LLMs & local models (Ollama)', level: 'Advanced' , from: ['IBM GenAI certificate'] },
      { name: 'RAG / retrieval', level: 'Advanced' },
      { name: 'AI agents', level: 'Advanced' },
      { name: 'Model evaluation & statistics', level: 'Advanced' },
      { name: 'Feature engineering & calibration', level: 'Advanced' },
      { name: 'Federated learning', level: 'Comfortable' },
    ],
  },
  {
    title: 'Engineering',
    pun: 'The parts nobody sees until they break.',
    skills: [
      { name: 'Software architecture', level: 'Advanced' },
      { name: 'REST APIs', level: 'Advanced' },
      { name: 'Database design (ER, normalization, indexing)', level: 'Advanced' , from: ['DBMS coursework'] },
      { name: 'Data structures & algorithms', level: 'Advanced' , from: ['Coursework'] },
      { name: 'Design patterns / SOLID', level: 'Advanced' },
      { name: 'Distributed systems', level: 'Comfortable' },
      { name: 'Testing & TDD', level: 'Comfortable' , from: ['Drylogic internship'] },
      { name: 'Security', level: 'Comfortable' },
    ],
  },
  {
    title: 'Core CS',
    pun: 'Below the abstractions, where the real fun is.',
    skills: [
      { name: 'Operating systems', level: 'Advanced' , from: ['Coursework'] },
      { name: 'Computer networks', level: 'Advanced' , from: ['Coursework'] },
      { name: 'Computer architecture', level: 'Advanced' , from: ['Coursework'] },
      { name: 'Compilers & code optimization', level: 'Advanced' , from: ['ACM workshop'] },
    ],
  },
];

export type Certification = { name: string; issuer: string };

export const certifications: Certification[] = [
  { name: 'IBM Generative AI Engineering Professional Certificate', issuer: 'Coursera' },
  { name: 'Web Development and React (3 courses)', issuer: 'Coursera' },
  { name: 'Programming in C++', issuer: 'Coursera' },
  { name: 'Tools of the Trade: Linux and SQL', issuer: 'Coursera' },
  { name: 'Intro to SQL', issuer: 'Coursera' },
  { name: 'Getting Started with Git and GitHub', issuer: 'Coursera' },
  { name: 'Compiler Design for Today’s World (workshop)', issuer: 'ACM' },
];

export const allSkills = skillGroups.flatMap((g) => g.skills);

export const skillSlug = (name: string) =>
  name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Which skills matter for each role I'm open to. Drives the role heatmap on the Skills page.
export type RoleKey = 'swe' | 'ai' | 'data';

export const roleInfo: Record<RoleKey, { name: string; color: string }> = {
  swe: { name: 'Software Engineer', color: 'var(--pink)' },
  ai: { name: 'AI Engineer', color: 'var(--teal)' },
  data: { name: 'Data Scientist', color: 'var(--yellow)' },
};

const roleMap: Record<string, RoleKey[]> = {
  Python: ['swe', 'ai', 'data'],
  SQL: ['swe', 'data'],
  JavaScript: ['swe'],
  'HTML / CSS': ['swe'],
  TypeScript: ['swe', 'ai'],
  'C++': ['swe'],
  C: ['swe'],
  'Next.js / React': ['swe'],
  'Node.js / Express': ['swe'],
  'Tailwind CSS': ['swe'],
  XGBoost: ['ai', 'data'],
  'scikit-learn': ['ai', 'data'],
  'pandas / NumPy': ['ai', 'data'],
  'OpenAI API': ['ai'],
  FastAPI: ['swe', 'ai'],
  'LangChain / LangGraph': ['ai'],
  PySpark: ['data'],
  Prisma: ['swe'],
  PyTorch: ['ai', 'data'],
  TensorFlow: ['ai', 'data'],
  Django: ['swe'],
  PostgreSQL: ['swe', 'ai', 'data'],
  MySQL: ['swe', 'data'],
  MongoDB: ['swe', 'data'],
  'Vector databases (Chroma, pgvector)': ['ai'],
  Linux: ['swe', 'ai', 'data'],
  'Git / GitHub': ['swe', 'ai', 'data'],
  'Redis / BullMQ': ['swe'],
  Elasticsearch: ['swe'],
  'CI/CD (GitHub Actions)': ['swe'],
  Docker: ['swe', 'ai'],
  AWS: ['swe', 'ai'],
  'GCP (incl. Pub/Sub)': ['swe', 'ai'],
  'LLMs & local models (Ollama)': ['ai'],
  'RAG / retrieval': ['ai'],
  'AI agents': ['ai'],
  'Model evaluation & statistics': ['ai', 'data'],
  'Feature engineering & calibration': ['ai', 'data'],
  'Federated learning': ['ai', 'data'],
  'Software architecture': ['swe', 'ai'],
  'REST APIs': ['swe', 'ai'],
  'Database design (ER, normalization, indexing)': ['swe', 'data'],
  'Data structures & algorithms': ['swe', 'ai', 'data'],
  'Design patterns / SOLID': ['swe'],
  'Distributed systems': ['swe', 'ai'],
  'Testing & TDD': ['swe'],
  Security: ['swe', 'ai'],
  'Operating systems': ['swe'],
  'Computer networks': ['swe'],
  'Computer architecture': ['swe'],
  'Compilers & code optimization': ['swe'],
};

export const rolesFor = (name: string): RoleKey[] => roleMap[name] ?? [];

// Short names for the heatmap labels, where the full name is long.
const shortNames: Record<string, string> = {
  'Vector databases (Chroma, pgvector)': 'Vector DBs',
  'LLMs & local models (Ollama)': 'LLMs & Ollama',
  'Database design (ER, normalization, indexing)': 'Database design',
  'Model evaluation & statistics': 'Model eval & stats',
  'Feature engineering & calibration': 'Feature engineering',
  'GCP (incl. Pub/Sub)': 'GCP',
  'CI/CD (GitHub Actions)': 'CI/CD',
  'Data structures & algorithms': 'DSA',
  'Compilers & code optimization': 'Compilers',
};
export const shortName = (name: string) => shortNames[name] ?? name;
