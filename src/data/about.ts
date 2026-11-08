// About page content, in Jake's own words.
export const intro = [
  "Hi, I'm Jake Roberts. I'm a Computer Science student at SRM Institute of Science and Technology, Chennai (class of 2027), working toward a career in software, AI or data.",
  'What hooked me was the structure of a programming language itself: low-level enough to control the machine, high-level enough to think in. I have been working my way up and down that ladder ever since.',
  'Most of what I build comes from a problem I ran into myself.',
];

// Each project solved a problem the previous one created.
export type ChainLink = { project: string; problem: string; built: string };
export const chain: ChainLink[] = [
  {
    project: 'queuedup',
    problem: 'Practising DSA and CS concepts consistently.',
    built: 'QueuedUp, a spaced-repetition tracker for practising DSA and CS concepts.',
  },
  {
    project: 'nextup',
    problem: 'Keeping up with practice meant keeping up with everything else.',
    built: 'NextUp, an assistant that pulls in my Notion and Gmail, sorts each item, and schedules tasks on its own.',
  },
  {
    project: 'study-copilot',
    problem: 'I wanted something to study with.',
    built: 'Study Copilot, a RAG-powered academic assistant.',
  },
  {
    project: 'recall-prediction',
    problem: "I wanted to know when I'd actually forget something.",
    built: "Recall Prediction, a model of my own memory curve trained on Duolingo's spaced-repetition data.",
  },
];

export const highlights = [
  {
    kind: 'Research · 2026',
    title: 'Co-authored paper',
    line: 'Byzantine-resilient federated learning for anomaly detection in smart-home IoT.',
    link: { href: '/projects/fedlearn', label: 'See the fedLearn project' },
    color: 'var(--teal)',
  },
  {
    kind: 'Internship · Dec 2024',
    title: 'Drylogic Solutions',
    line: 'Built an email campaign scheduler in Python.',
    color: 'var(--orange)',
  },
];

// Off the keyboard: short, plain lines about what Jake does away from the screen.
export const activities = [
  {
    kind: 'Music',
    title: 'Prog, by a mile',
    line: 'Dream Theater, Pink Floyd, Tool, Toto and Steven Wilson. Full albums, start to finish, usually while I build.',
    color: 'var(--teal)',
  },
  {
    kind: 'Riding',
    title: '5 years, ~30,000 km',
    line: 'Mostly up to hill stations: Ooty, Valparai, Yelagiri, the Jawadhu Hills. Riding is how I clear my head.',
    color: 'var(--orange)',
  },
  {
    kind: 'Drums',
    title: '13 years behind the kit',
    line: 'Prog and rock, at home and at church. Favourite to play: Free Bird.',
    color: 'var(--pink)',
  },
  {
    kind: 'Badminton',
    title: 'Three hours a day',
    line: 'On my home court, every day, for five years.',
    color: 'var(--lime)',
  },
];

