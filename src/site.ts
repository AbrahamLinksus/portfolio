// Site-wide settings and navigation.
export const site = {
  name: 'Jake Roberts',
  title: 'Software Engineer',
  description: "Projects, skills, and what I'm building right now.",
  email: 'jakeroberts.a.05@gmail.com', // receives contact-form messages; not shown on the site
  // Formspree form ID (the part after formspree.io/f/). Messages are emailed to the account that owns the form.
  // Leave empty until the form exists; the page then explains that the form isn't connected yet.
  contactFormId: 'xqppodgz',
  socials: [
    { label: 'GitHub', href: 'https://github.com/AbrahamLinksus' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jake-roberts05/' },
  ],
};

// Roles I'm open to, in priority order. Shown on the homepage.
export const roles = [
  { rank: '01', role: 'Software Engineer', tag: 'Top priority', pun: 'Top of my stack.', color: 'var(--pink)' },
  { rank: '02', role: 'AI Engineer', tag: 'Also yes', pun: 'My attention is all yours.', color: 'var(--teal)' },
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
  { href: '/skills', label: 'Skills', letter: 'S', description: 'Things I can do without Stack Overflow', color: 'var(--yellow)' },
  { href: '/hobbies', label: 'Hobbies', letter: 'H', description: 'Offline mode: on', color: 'var(--orange)' },
  { href: '/contact', label: 'Contact', letter: 'C', description: "Let's sync up", color: 'var(--lime)' },
];
