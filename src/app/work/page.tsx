import type { Metadata } from "next";
import { PageHead } from "@/components/layout/PageHead";
import { WorkList } from "@/components/work/WorkList";
import { internship, projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Five projects, mostly AI, all built end to end: RAG systems, MLOps, ML models and a full-stack tracker.",
};

export default function WorkPage() {
  return (
    <section className="site-wrap pt-[clamp(130px,16vw,190px)] pb-[clamp(80px,10vw,140px)]">
      <PageHead title="Work">
        <p>Five projects, mostly AI, all built end to end. Pick one for the full case study.</p>
      </PageHead>
      <WorkList projects={projects} />
      <div className="mt-10 flex items-start gap-[18px] rounded-[14px] border border-rim bg-char p-[22px]">
        <span className="label shrink-0 -rotate-3 rounded-md bg-paper px-2.5 py-1.5 text-[11px] text-ink">Internship</span>
        <p>
          <b>
            {internship.company}, {internship.date}.
          </b>{" "}
          <span className="text-fog">{internship.line}</span>
        </p>
      </div>
    </section>
  );
}
