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
