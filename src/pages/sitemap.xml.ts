// Sitemap for search engines, built from the real page list.
import type { APIRoute } from 'astro';
import { getProjects } from '../lib/projects';

export const GET: APIRoute = async ({ site }) => {
  const projects = await getProjects();
  const paths = ['/', '/about', '/projects', '/skills', '/now', '/contact', ...projects.map((p) => `/projects/${p.id}`)];
  const urls = paths.map((p) => `  <url><loc>${new URL(p, site).href}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
