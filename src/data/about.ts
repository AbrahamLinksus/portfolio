// About page: Jake's story, as a timeline. Years marked approx were worked out from school grades.
export type Kind = 'education' | 'tech' | 'hobby';

export type Moment = {
  year: string; // shown as the timeline label
  kind: Kind;
  title: string;
  line?: string;
  approx?: boolean;
  future?: boolean;
  link?: { href: string; label: string };
};

export const kinds: Record<Kind, { label: string; color: string }> = {
  education: { label: 'School & college', color: 'var(--teal)' },
  tech: { label: 'Tech', color: 'var(--pink)' },
  hobby: { label: 'Off the keyboard', color: 'var(--orange)' },
};

export const origin = {
  remember: 'All-rounder, kind of.',
  story: [
    "I was fifteen when a movie showed a hacker typing into a terminal, and I wanted to know what that felt like. My first program was a Python script that drew a circle.",
    'What hooked me was the structure of a programming language itself: low-level enough to control the machine, high-level enough to think in. I have been working my way up and down that ladder ever since.',
  ],
};

export const timeline: Moment[] = [
  { year: '2011', kind: 'education', title: 'Camford International School, Coimbatore', line: 'Classes 1 to 6.', approx: true },
  { year: '2013', kind: 'hobby', title: 'Started playing the drums', line: 'Thirteen years later, still behind the kit.' },
  { year: '2017', kind: 'education', title: 'Stanes School (CBSE), Coimbatore', line: 'Classes 7 to 12.', approx: true },
  { year: '2019', kind: 'tech', title: 'My first program', line: 'A Python script that drew a circle. A movie hacker in a terminal started it all.' },
  { year: '2021', kind: 'hobby', title: 'Picked up badminton', line: 'Three hours a day, every day, ever since.' },
  { year: '2022', kind: 'tech', title: 'Fluent in Python', line: 'Python became the language I think in.' },
  { year: '2023', kind: 'education', title: 'SRM IST, B.Tech Computer Science', line: 'Started at SRM Institute of Science and Technology.' },
  { year: '2023', kind: 'tech', title: 'Got into data structures and algorithms' },
  { year: 'Mid 2023', kind: 'tech', title: 'Put DSA down, picked up machine learning', line: 'Models, data and statistics took over.' },
  { year: '2024', kind: 'tech', title: 'Got into frontend', line: 'React, Next.js and making things people can actually use.' },
  { year: '2025', kind: 'tech', title: 'Backend systems and AI engineering', line: 'Queues, databases and distributed systems, then LLMs, retrieval and agents.', link: { href: '/projects', label: 'See the projects' } },
  { year: '2026', kind: 'tech', title: 'Came back to DSA and finished it', line: '99 problems across 17 topics. Systems design is partly done.', link: { href: '/skills', label: 'See it in the Skill Cortex' } },
  { year: '2026', kind: 'education', title: 'STEP ranking: 94', line: 'At SRM IST.' },
  { year: '2027', kind: 'education', title: 'Graduating', line: 'B.Tech Computer Science, SRM IST.', future: true },
];
