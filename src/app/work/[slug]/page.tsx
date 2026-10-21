import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectArt } from "@/components/art/ProjectArt";
import { Copy, isTodo } from "@/components/ui/Copy";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: p.title, description: `${p.summary} ${isTodo(p.outcome) ? "" : p.outcome}`.trim() };
}

const SECTIONS = ["Problem", "What I built", "Stack", "Architecture", "Result", "Links"] as const;
const anchor = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

function Section({ title, children, last = false }: { title: (typeof SECTIONS)[number]; children: React.ReactNode; last?: boolean }) {
  return (
    <section id={anchor(title)} className={`max-w-[70ch] scroll-mt-28 ${last ? "" : "mb-12 border-b border-rim pb-12"}`}>
      <h2 className="mb-4 font-display text-[clamp(24px,2.4vw,36px)] font-bold tracking-[-0.03em]">{title}</h2>
      {children}
    </section>
  );
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];

  const meta = [
    ["Role", p.role],
    ["Timeline", p.timeline],
    ["Stack", p.tags.filter((t) => !isTodo(t)).join(", ") || p.tags[0]],
    ["Status", p.status],
  ];

  return (
    <article className="site-wrap pt-[clamp(130px,16vw,190px)] pb-[clamp(80px,10vw,140px)]">
      <Link href="/work" className="label mb-7 inline-flex gap-2 text-fog transition-colors hover:text-ember">
        ← All work
      </Link>

      <header className="mb-14 grid items-end gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        <div>
          <p className="label text-ember">● {p.category}</p>
          <h1 className="mt-4 font-display text-[clamp(44px,11vw,104px)] leading-[0.92] lg:text-[clamp(52px,5.6vw,104px)] font-extrabold tracking-[-0.05em]">{p.title}</h1>
          <p className="mt-[18px] max-w-[34ch] text-lead">{p.summary}</p>
        </div>
        <dl className="grid overflow-hidden rounded-[14px] border border-rim bg-rim sm:grid-cols-2" style={{ gap: 1 }}>
          {meta.map(([k, v]) => (
            <div key={k} className="min-w-0 bg-char px-[18px] py-4">
              <dt className="label mb-1.5 text-fog">{k}</dt>
              <dd>
                <Copy text={v} />
              </dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="aspect-[16/10] max-w-full overflow-hidden rounded-[20px] border border-rim bg-char md:aspect-[21/9]">
        <ProjectArt slug={p.slug} wide />
      </div>

      <div className="mt-[72px] grid grid-cols-1 gap-6 md:grid-cols-[220px_minmax(0,1fr)] md:gap-14">
        <nav aria-label="Sections" className="label flex flex-wrap gap-x-4 gap-y-2.5 self-start text-fog md:sticky md:top-28 md:flex-col">
          {SECTIONS.map((s) => (
            <a key={s} href={`#${anchor(s)}`} className="transition-colors hover:text-ember">
              {s}
            </a>
          ))}
        </nav>

        <div className="min-w-0">
          <Section title="Problem">
            <p className="text-fog">
              <Copy text={p.problem} />
            </p>
          </Section>
          <Section title="What I built">
            <p className="text-fog">
              <Copy text={p.built} />
            </p>
          </Section>
          <Section title="Stack">
            <ul className="flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <li key={t} className={isTodo(t) ? "todo" : "rounded-full border border-rim px-2.5 py-1.5 font-mono text-xs"}>
                  {t}
                </li>
              ))}
            </ul>
          </Section>
          <Section title="Architecture">
            <figure tabIndex={0} aria-label="Architecture diagram" className="overflow-x-auto rounded-2xl border-2 border-dashed border-rim p-7">
              <ol className="flex min-w-[560px] items-center gap-3" aria-label="Data flow, left to right">
                {p.architecture.map((box, n) => (
                  <li key={box} className="flex flex-1 items-center gap-3">
                    <span
                      className={`flex-1 rounded-[10px] border px-3 py-[18px] text-center font-mono text-xs ${
                        n === p.architectureCore ? "border-ember bg-ember text-ink" : "border-rim bg-slate"
                      }`}
                    >
                      {box}
                    </span>
                    {n < p.architecture.length - 1 && (
                      <span aria-hidden="true" className="text-ember">
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>
              <figcaption className="label mt-[18px] text-fog"><Copy text="Placeholder · [TODO: replace with the real architecture diagram]" /></figcaption>
            </figure>
          </Section>
          <Section title="Result">
            <p className="text-lead">
              <Copy text={p.result} />
            </p>
          </Section>
          <Section title="Links" last>
            <div className="flex flex-wrap gap-3">
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="label inline-flex items-center gap-2.5 rounded-full border border-ember bg-ember px-[22px] py-3.5 text-ink transition-colors hover:bg-ember-soft"
              >
                Repo ↗
              </a>
              {p.demo ? (
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label inline-flex items-center gap-2.5 rounded-full border border-rim px-[22px] py-3.5 transition-colors hover:border-ember hover:text-ember"
                >
                  Live demo ↗
                </a>
              ) : null}
            </div>
          </Section>

          <Link
            href={`/work/${next.slug}`}
            className="group mt-16 grid grid-cols-[1fr_auto] items-center gap-4 border-y border-rim py-7 transition-colors hover:text-ember"
          >
            <span>
              <span className="label block text-fog">Next project</span>
              <span className="font-display text-[clamp(28px,3.5vw,48px)] font-bold tracking-[-0.035em]">{next.title}</span>
            </span>
            <span aria-hidden="true" className="text-[28px] transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
