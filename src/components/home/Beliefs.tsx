import { Eyebrow } from "@/components/ui/Eyebrow";

const BELIEFS = [
  { title: "Ship small, then sharpen.", body: "A working v1 teaches more than a perfect plan ever will." },
  { title: "Beat a baseline, or it didn't happen.", body: "Every model gets a dumb comparison and an honest metric." },
  { title: "Code is read more than it runs.", body: "Clear names, small functions. Future me is a user too." },
];

const LOOK = [
  "bg-paper text-ink -rotate-2",
  "bg-ember text-ink rotate-[1.5deg] md:translate-y-6",
  "bg-slate text-bone border border-rim -rotate-1",
];

export function Beliefs() {
  return (
    <section className="py-section">
      <div className="site-wrap">
        <Eyebrow>Field notes</Eyebrow>
        <h2 className="font-display text-h2 font-bold tracking-[-0.035em]">
          3 things I <em className="font-serif text-[1.1em] font-normal text-ember">believe</em> in
        </h2>
        <ol className="mt-14 grid gap-7 md:grid-cols-3 md:gap-6">
          {BELIEFS.map((b, i) => (
            <li
              key={b.title}
              className={`relative flex flex-col justify-between gap-7 rounded-md p-7 transition-transform duration-[400ms] ease-(--ease-out-back) hover:translate-y-[-8px] hover:rotate-0 md:min-h-[300px] ${LOOK[i]}`}
            >
              <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-[90px] -translate-x-1/2 -rotate-4 bg-paper/55 backdrop-blur-[2px]" />
              <span className="label">No. {i + 1}</span>
              <div>
                <h3 className="font-display text-h3 font-bold tracking-[-0.03em]">{b.title}</h3>
                <p className="mt-3 max-w-[30ch] opacity-80">{b.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
