import type { Metadata } from "next";
import { PageHead } from "@/components/layout/PageHead";
import { Copy } from "@/components/ui/Copy";

export const metadata: Metadata = {
  title: "Human",
  description: "The part of Jake's portfolio without a tech stack: where he's from, what he does off the keyboard, and what he values.",
};

const STORY = [
  "I grew up in Coimbatore and moved to Chennai to study computer science at SRM IST. I graduate in 2027.",
  "[TODO: how you got into code, 1–2 sentences]",
  "[TODO: what you do when you're not coding]",
];

const FACTS = ["Coimbatore → Chennai", "CGPA 8.14", "LeetCode regular", "In bed by 10", "Badminton", "Drums", "Bikes", "Runs LLMs locally"];

// Swap `src` in when real photos exist (next/image, AVIF/WebP served automatically).
const PHOTOS = [
  { todo: "[TODO photo: you]", caption: "this is me", pos: "left-0 top-5 -rotate-6" },
  { todo: "[TODO photo: desk setup]", caption: "where bugs live", pos: "right-0 top-0 rotate-[5deg]" },
  { todo: "[TODO photo: Coimbatore]", caption: "home", pos: "left-[22%] top-[180px] md:top-[230px] -rotate-1 z-[2]" },
];

const VALUES = [1, 2, 3].map((n) => ({ n, title: "[TODO: value]", body: "One sentence on what it looks like in practice." }));

export default function HumanPage() {
  return (
    <section className="site-wrap pt-[clamp(130px,16vw,190px)] pb-[clamp(80px,10vw,140px)]">
      <PageHead title="Human">
        <p>The bit of the portfolio without a tech stack.</p>
      </PageHead>

      <div className="grid items-start gap-16 md:grid-cols-[1.1fr_1fr]">
        <div>
          {STORY.map((para, i) => (
            <p
              key={i}
              className={`mb-5 max-w-[34ch] text-lead ${
                i === 0
                  ? "first-letter:float-left first-letter:pt-1.5 first-letter:pr-2.5 first-letter:font-serif first-letter:text-[3.4em] first-letter:leading-[0.8] first-letter:text-ember first-letter:italic"
                  : ""
              }`}
            >
              <Copy text={para} />
            </p>
          ))}
          <ul className="mt-7 flex flex-wrap gap-2.5" aria-label="Quick facts">
            {FACTS.map((f) =>
              f.startsWith("[TODO") ? (
                <li key={f} className="todo self-center">
                  {f}
                </li>
              ) : (
                <li key={f} className="rounded-full border border-rim bg-slate px-3.5 py-2 text-sm">
                  {f}
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="relative h-[440px] md:h-[560px]">
          {PHOTOS.map((p) => (
            <figure
              key={p.caption}
              className={`absolute w-[56%] bg-paper p-3 pb-11 text-ink shadow-[0_20px_40px_rgb(0_0_0/0.4)] transition-transform duration-[400ms] ease-(--ease-out-back) hover:z-[5] hover:scale-[1.04] hover:rotate-0 ${p.pos}`}
            >
              <div className="grid aspect-[4/5] place-items-center bg-[repeating-linear-gradient(45deg,#2a2622_0_10px,#24211e_10px_20px)] p-3 text-center">
                <span className="todo">{p.todo}</span>
              </div>
              <figcaption className="absolute bottom-3 left-3.5 font-serif text-xl italic">{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <ul className="mt-24 grid gap-5 md:grid-cols-3" aria-label="Values">
        {VALUES.map((v) => (
          <li key={v.n} className="rounded-[14px] border border-rim bg-char p-6">
            <span className="label text-ember">Value 0{v.n}</span>
            <h2 className="mt-3.5 mb-2 font-display text-[22px] font-bold tracking-[-0.02em]">
              <Copy text={v.title} />
            </h2>
            <p className="text-fog">{v.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
