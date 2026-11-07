// Site-wide settings and navigation.
export const site = {
  name: 'Jake Roberts',
  title: 'Software Engineer',
  description: "Projects, skills, and what I'm building right now.",
  email: 'jakeroberts.a.05@gmail.com', // receives contact-form messages; not shown on the site
  socials: [
    { label: 'GitHub', href: 'https://github.com/AbrahamLinksus' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  ],
};

// Roles I'm open to, in priority order. Shown on the homepage.
export const roles = [
  { rank: '01', role: 'Software Engineer', tag: 'Top priority', pun: 'I ship it. Usually after the tests pass.', color: 'var(--pink)' },
  { rank: '02', role: 'AI Engineer', tag: 'Also yes', pun: "I'd be a great fit. No overfitting.", color: 'var(--teal)' },
  { rank: '03', role: 'Data Scientist', tag: "Wouldn't mind", pun: "Statistically, I'm likely to say yes.", color: 'var(--yellow)' },
];

export type NavItem = {
  href: string;
  label: string;
  letter: string;
  description: string;
  color: string;
};

// Order and colors match the full-page menu design.
export const nav: NavItem[] = [
  { href: '/projects', label: 'Projects', letter: 'P', description: 'Case studies: problem, process, results', color: 'var(--pink)' },
  { href: '/now', label: 'Now', letter: 'N', description: 'Fresh commits, served live from GitHub', color: 'var(--teal)' },
  { href: '/skills', label: 'Skills', letter: 'S', description: 'My stack, fully loaded', color: 'var(--yellow)' },
  { href: '/hobbies', label: 'Hobbies', letter: 'H', description: 'Life outside the terminal', color: 'var(--orange)' },
  { href: '/contact', label: 'Contact', letter: 'C', description: "Let's establish a connection", color: 'var(--lime)' },
];
