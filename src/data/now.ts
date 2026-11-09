// The Now page finds repos by itself: at every build, scripts/sync-now.mjs asks GitHub for every
// public repo of NOW_OWNER and keeps those pushed in the last WINDOW_DAYS.
// The list below is optional extra detail for known repos (a case-study link, a nicer name),
// and the fallback list if the GitHub API can't be reached.
export const NOW_OWNER = 'AbrahamLinksus';
// Repos never shown on the Now page (study and practice repos).
export const nowExclude = ['AbrahamLinksus/notes', 'AbrahamLinksus/advancedDSA'];

export type NowRepo = {
  repo: string; // owner/name on GitHub
  name: string;
  description: string;
  project?: string; // slug of a case study on this site
  kind: 'project' | 'learning' | 'site';
  part: 'study' | 'practice' | 'build'; // which moving part of my academics it belongs to
};

export const nowRepos: NowRepo[] = [
  { repo: 'AbrahamLinksus/portfolio', name: 'This portfolio', description: 'The site you are on: Astro, a neural map of my skills, and notes that sync themselves.', kind: 'site', part: 'build' },
  { repo: 'AbrahamLinksus/notes', name: 'Study notes', description: 'Atomic notes on everything I study. Every commit grows the Skill Cortex.', kind: 'learning', part: 'study' },
  { repo: 'AbrahamLinksus/advancedDSA', name: 'Advanced DSA', description: 'Daily data-structures and algorithms practice, from hashing to shortest paths.', kind: 'learning', part: 'practice' },
  { repo: 'AbrahamLinksus/reachinbox-scheduler', name: 'ReachInbox Email Scheduler', description: 'An email scheduler that never sends twice and holds every hourly limit.', project: 'reachinbox-scheduler', kind: 'project', part: 'build' },
  { repo: 'AbrahamLinksus/Study_copilot', name: 'Study Copilot', description: 'Time-aware retrieval over coursework, with study plans on my calendar.', project: 'study-copilot', kind: 'project', part: 'build' },
  { repo: 'AbrahamLinksus/nextup', name: 'nextup', description: 'A personal assistant that knows what it may do alone and what to ask about.', project: 'nextup', kind: 'project', part: 'build' },
  { repo: 'AbrahamLinksus/queuedup_v2', name: 'QueuedUp', description: 'Spaced repetition where anything you can be graded on is a card.', project: 'queuedup', kind: 'project', part: 'build' },
  { repo: 'AbrahamLinksus/recallPrediction', name: 'Recall Prediction', description: 'Calibrated predictions of whether a learner remembers a word.', project: 'recall-prediction', kind: 'project', part: 'build' },
  { repo: 'AbrahamLinksus/dev-team-setup', name: 'Dev Team Setup', description: 'A Claude Code plugin that builds a project with a team of AI agents, with your approval at every step.', project: 'dev-team-setup', kind: 'project', part: 'build' },
  { repo: 'AbrahamLinksus/fedLearn', name: 'fedLearn', description: 'Federated learning that spots and removes poisoned clients.', project: 'fedlearn', kind: 'project', part: 'build' },
];

// A repo counts as active if it had a commit in this many days.
export const ACTIVE_DAYS = 30;
// The Now page shows only repos pushed within this many days; older cards drop off.
export const WINDOW_DAYS = 7;

// What only Jake can write: where each project is stuck and what's next. Last pushes come from GitHub.
// Fields left out are simply not shown.
export type NowNote = { stuck?: string; next?: string };
export const projectNotes: Record<string, NowNote> = {
  // 'AbrahamLinksus/reachinbox-scheduler': { stuck: '...', next: '...' },
};
