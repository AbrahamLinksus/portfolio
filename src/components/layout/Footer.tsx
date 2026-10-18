import { site } from "@/lib/site";
import { LocalTime } from "@/components/ui/LocalTime";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { AwakeStatus, EasterEgg, ReplayIntro } from "./FooterExtras";

const links = [
  { label: "GitHub", href: site.socials.github },
  { label: "LeetCode", href: site.socials.leetcode },
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "Resume", href: site.resume },
];

export function Footer() {
  return (
    <footer className="border-t border-rim bg-char pt-16 pb-[max(2.25rem,env(safe-area-inset-bottom,0px))]">
      <div className="site-wrap">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="label text-fog">Click to copy</p>
            <CopyEmail className="mt-3 text-[clamp(22px,3vw,40px)] leading-[1.1]" />
          </div>
          <div>
            <p className="label text-fog">Local time · {site.timeZone}</p>
            <LocalTime className="mt-3 block font-display text-h3 font-bold tracking-[-0.02em] tabular-nums" />
            <p className="label mt-1.5 text-fog">
              <AwakeStatus />
            </p>
          </div>
          <div>
            <p className="label text-fog">Elsewhere</p>
            <ul className="mt-3 flex flex-col">
              {links.map((l) => (
                <li key={l.label}>
                  {l.href ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-between border-b border-rim py-2 transition-colors hover:text-ember"
                    >
                      {l.label} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <span className="flex justify-between border-b border-rim py-2 text-fog">
                      {l.label} <span className="todo">[TODO: url]</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="label mt-16 flex flex-wrap justify-between gap-3 text-fog">
          <span>
            <EasterEgg /> 2026 {site.name}
          </span>
          <span>
            <ReplayIntro /> · Built with Next.js, GSAP and a lot of coffee
          </span>
        </div>
      </div>
    </footer>
  );
}
