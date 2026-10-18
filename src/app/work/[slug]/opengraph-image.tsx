import { getProject, projects } from "@/lib/projects";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "Case study by Jake Roberts";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug) ?? projects[0];
  const [first, ...rest] = p.title.split(" ");
  return ogImage({
    eyebrow: `CASE STUDY · ${p.category.toUpperCase()}`,
    title: first,
    accent: rest.length ? `${rest.join(" ")}.` : ".",
    footer: p.summary,
  });
}
