import { Eyebrow } from "@/components/ui/Eyebrow";

export function Statement() {
  return (
    <section id="statement" className="py-section">
      <div className="site-wrap">
        <Eyebrow>The short version</Eyebrow>
        <div className="grid items-end gap-10 md:grid-cols-[1fr_auto]">
          <p className="max-w-[20ch] font-display text-h2 leading-[1.04] font-bold tracking-[-0.035em]">
            I aim to build software that doesn&apos;t break.{" "}
            <em className="font-serif text-[1.12em] font-normal tracking-[-0.01em] text-ember">
              Everything else can wobble a bit.
            </em>
          </p>
          <p className="max-w-[30ch] text-fog">
            <b className="font-semibold text-bone">Final-year CSE at SRM.</b> I build apps, data pipelines and ML models,
            and I care most about the part where they keep working.
          </p>
        </div>
      </div>
    </section>
  );
}
