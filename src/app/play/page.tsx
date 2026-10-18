import type { Metadata } from "next";
import { PageHead } from "@/components/layout/PageHead";
import { ForgettingCurve } from "@/components/play/ForgettingCurve";
import { GenCanvas } from "@/components/play/GenCanvas";
import { Copy } from "@/components/ui/Copy";

export const metadata: Metadata = {
  title: "Play",
  description: "Games, side experiments and an interactive forgetting-curve toy from Jake Roberts.",
};

const GAMES = [
  { name: "[TODO: game]", note: "[TODO: hours / rank]" },
  { name: "[TODO: game]", note: "[TODO: hours / rank]" },
  { name: "LeetCode", note: "Counts as a game. [TODO: solved count]" },
];

const EXPERIMENTS = [0, 1, 2] as const;

function Pad() {
  return (
    <svg width="30" height="22" viewBox="0 0 30 22" aria-hidden="true">
      <rect x="1" y="4" width="28" height="15" rx="7" fill="#141311" />
      <rect x="6" y="10" width="7" height="2" fill="#efe8de" />
      <rect x="8.5" y="7.5" width="2" height="7" fill="#efe8de" />
      <circle cx="21" cy="9" r="1.6" fill="#ff6a1a" />
      <circle cx="24" cy="12" r="1.6" fill="#ff6a1a" />
    </svg>
  );
}

export default function PlayPage() {
  return (
    <section className="site-wrap pt-[clamp(130px,16vw,190px)] pb-[clamp(80px,10vw,140px)]">
      <PageHead title="Play">
        <p>Games, side experiments and a toy. Nothing here has a deadline.</p>
      </PageHead>

      <div className="grid gap-5 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7">
          <ForgettingCurve />
        </div>

        <div className="flex flex-col gap-3.5 lg:col-span-5">
          <h2 className="label text-fog">Currently playing</h2>
          <ul className="flex flex-col gap-3.5">
            {GAMES.map((g, i) => (
              <li
                key={i}
                data-sfx
                className="flex items-center gap-4 rounded-[14px] border border-rim bg-slate p-[18px] transition-transform duration-300 hover:translate-x-2 hover:-rotate-1"
              >
                <span className={`grid size-[58px] shrink-0 place-items-center rounded-[10px] ${i % 2 ? "bg-ember" : "bg-paper"}`}>
                  <Pad />
                </span>
                <span>
                  <b>
                    <Copy text={g.name} />
                  </b>
                  <span className="label mt-1 block text-fog normal-case">
                    <Copy text={g.note} />
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16">
        <p className="label text-fog">Side experiments</p>
        <h2 className="mt-2.5 font-display text-[clamp(24px,2.4vw,36px)] font-bold tracking-[-0.03em]">Half-finished on purpose</h2>
        <ul className="mt-5 grid gap-5 md:grid-cols-3">
          {EXPERIMENTS.map((n) => (
            <li
              key={n}
              className="relative flex aspect-video max-w-full flex-col justify-between overflow-hidden rounded-[20px] border border-rim bg-char p-[22px] md:aspect-square"
            >
              <GenCanvas variant={n} />
              <span className="label relative text-ember">Exp. 0{n + 1}</span>
              <div className="relative">
                <b>
                  <Copy text="[TODO: experiment]" />
                </b>
                <p className="mt-1 text-fog">
                  <Copy text="[TODO: one line]" />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
