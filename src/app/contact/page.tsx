import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHead } from "@/components/layout/PageHead";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { mailtoBody, mailtoHref, mailtoSubject } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Jake Roberts about AI engineering, software development or data science roles.",
};

export default function ContactPage() {
  return (
    <section className="site-wrap pt-[clamp(130px,16vw,190px)] pb-[clamp(80px,10vw,140px)]">
      <PageHead title="Say hi">
        <p>
          Roles, projects, or a good problem. I reply within <span className="todo">[TODO]</span> days.
        </p>
      </PageHead>

      <div className="grid items-start gap-14 lg:grid-cols-[1.2fr_1fr]">
        <ContactForm />

        <aside className="rounded-[20px] border border-dashed border-rim p-5 md:p-7">
          <p className="label text-fog">Prefer email?</p>
          <CopyEmail className="mt-3 text-[clamp(20px,2.4vw,30px)] leading-[1.1]" />
          <p className="mt-4 text-fog">
            Or{" "}
            <a href={mailtoHref} className="text-bone underline decoration-ember underline-offset-4 hover:text-ember">
              open your email app
            </a>{" "}
            with this filled in:
          </p>
          <pre className="mt-4 rounded-[10px] border border-rim bg-ink p-4 font-mono text-[13px] whitespace-pre-wrap text-fog">
            {`Subject: ${mailtoSubject}\n\n${mailtoBody}`}
          </pre>
        </aside>
      </div>
    </section>
  );
}
