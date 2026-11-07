// Skills and self-assessed levels. Project files reference skills by `name`.
export type Level = 'Advanced' | 'Comfortable' | 'Learning';

export const levels: Record<Level, { rank: number; note: string; color: string }> = {
  Advanced: { rank: 3, note: 'Could teach it', color: 'var(--pink)' },
  Comfortable: { rank: 2, note: 'Daily driver', color: 'var(--teal)' },
  Learning: { rank: 1, note: 'Still in beta', color: 'var(--yellow)' },
};

export type Skill = { name: string; level: Level };
export type SkillGroup = { title: string; pun: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    pun: 'Fluent in three. Also fluent in error messages.',
    skills: [
      { name: 'Python', level: 'Advanced' },
      { name: 'SQL', level: 'Advanced' },
      { name: 'TypeScript', level: 'Comfortable' },
    ],
  },
  {
    title: 'Frameworks & libraries',
    pun: 'Standing on the shoulders of npm and pip.',
    skills: [
      { name: 'Next.js / React', level: 'Advanced' },
      { name: 'Node.js / Express', level: 'Advanced' },
      { name: 'XGBoost', level: 'Advanced' },
      { name: 'FastAPI', level: 'Comfortable' },
      { name: 'LangChain / LangGraph', level: 'Comfortable' },
      { name: 'PySpark', level: 'Comfortable' },
      { name: 'PyTorch', level: 'Learning' },
    ],
  },
  {
    title: 'Data & infrastructure',
    pun: 'Where the data lives, and how it gets around.',
    skills: [
      { name: 'PostgreSQL', level: 'Advanced' },
      { name: 'Vector databases (Chroma, pgvector)', level: 'Advanced' },
      { name: 'Redis / BullMQ', level: 'Comfortable' },
      { name: 'Elasticsearch', level: 'Comfortable' },
      { name: 'Docker', level: 'Learning' },
    ],
  },
  {
    title: 'AI & data',
    pun: 'Models, measured honestly.',
    skills: [
      { name: 'LLMs & local models (Ollama)', level: 'Advanced' },
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
      { name: 'Distributed systems', level: 'Comfortable' },
      { name: 'Testing', level: 'Comfortable' },
      { name: 'Security', level: 'Comfortable' },
    ],
  },
];

export const allSkills = skillGroups.flatMap((g) => g.skills);

export const skillSlug = (name: string) =>
  name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
