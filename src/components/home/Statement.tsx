import { Eyebrow } from "@/components/ui/Eyebrow";

export function Statement() {
  return (
    <section id="statement" className="py-section">
      <div className="site-wrap">
        <Eyebrow>The short version</Eyebrow>
        <div className="grid items-end gap-10 md:grid-cols-[1fr_auto]">
          <p className="max-w-[16ch] font-display text-h2 leading-[1.04] font-bold tracking-[-0.035em]">
            Serious about systems that ship.{" "}
            <em className="font-serif text-[1.12em] font-normal tracking-[-0.01em] text-ember">
              Unserious about almost everything else.
            </em>
          </p>
          <p className="max-w-[30ch] text-fog">
            <b className="font-semibold text-bone">I build AI products end to end:</b> retrieval, models, the API and
            the UI someone actually clicks. Then I go play something.
          </p>
        </div>
      </div>
    </section>
  );
}
