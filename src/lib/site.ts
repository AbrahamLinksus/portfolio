export const site = {
  name: "Jake Roberts",
  role: "AI engineer · Software developer",
  tagline: "B.Tech CSE · SRM IST · Class of 2027",
  // NEXT_PUBLIC_SITE_URL wins; on Vercel the production domain is filled in automatically.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  email: "[TODO: email]",
  timeZone: "Asia/Kolkata",
  city: "Chennai",
  resume: "/resume.pdf", // [TODO] add public/resume.pdf
  socials: {
    github: "https://github.com/AbrahamLinksus",
    leetcode: "https://leetcode.com/u/abrahamlinksus/",
    linkedin: "", // [TODO] LinkedIn URL
  },
} as const;

export const menuLinks = [
  { href: "/work", label: "Work" },
  { href: "/human", label: "Human" },
  { href: "/play", label: "Play" },
  { href: "/contact", label: "Contact" },
] as const;
