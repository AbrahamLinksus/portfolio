// Site-wide settings and navigation. Placeholders until real details are supplied.
export const site = {
  name: 'Your Name',
  title: 'Software Engineer',
  description: "Projects, skills, and what I'm building right now.",
  email: 'hello@example.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/AbrahamLinksus' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  ],
};

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
  { href: '/now', label: 'Now', letter: 'N', description: "What I'm building, live from GitHub", color: 'var(--teal)' },
  { href: '/skills', label: 'Skills', letter: 'S', description: "What I've learned and where I used it", color: 'var(--yellow)' },
  { href: '/hobbies', label: 'Hobbies', letter: 'H', description: 'Life outside code', color: 'var(--orange)' },
  { href: '/contact', label: 'Contact', letter: 'C', description: 'Send me a message', color: 'var(--lime)' },
];
