import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";

const WANTS = [
  ["AI engineering", "First choice"],
  ["Software development", "Close second"],
  ["Data science", "Also yes"],
  ["Work that matters", "Real users, real problems"],
  ["A strong team", "People I can learn from"],
] as const;

export function LookingFor() {
  return (
    <section className="pt-[clamp(110px,13vw,170px)] pb-section">
      <div className="site-wrap grid items-end gap-14 md:grid-cols-[1.3fr_1fr]">
        <div>
          <Eyebrow>Open to work · 2026–27</Eyebrow>
          <h2 className="font-display text-h2 font-bold tracking-[-0.035em]">
            What I&apos;m <em className="font-serif text-[1.1em] font-normal text-ember">looking for</em>
          </h2>
          <Link
            href="/contact"
            className="group mt-10 inline-flex items-center gap-4 rounded-full bg-ember py-5 pr-[30px] pl-[34px] font-display text-lead font-bold text-ink transition-[gap,background-color] duration-300 hover:gap-7 hover:bg-ember-soft"
          >
            Let&apos;s talk
            <span className="grid size-[42px] place-items-center rounded-full bg-ink text-ember" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
        <dl className="flex flex-col border-t border-rim">
          {WANTS.map(([what, note]) => (
            <div key={what} className="flex flex-col gap-1 border-b border-rim py-[18px] sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <dt className="font-display text-lead font-bold">{what}</dt>
              <dd className="label text-fog sm:text-right">{note}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
