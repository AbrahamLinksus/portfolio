"use client";

import { useState } from "react";
import { z } from "zod";
import { contactSchema, type ContactField } from "@/lib/contact";
import { useSound } from "@/components/providers/SoundProvider";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };
type Errors = Partial<Record<ContactField, string>>;

const FIELDS: { name: ContactField; label: string; type?: string; autoComplete?: string; placeholder: string }[] = [
  { name: "name", label: "Name", autoComplete: "name", placeholder: "Ada Lovelace" },
  { name: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "ada@company.com" },
  { name: "message", label: "Message", placeholder: "We're hiring an AI engineer and..." },
];

const firstErrors = (fields: Partial<Record<string, string[]>>): Errors =>
  Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, v?.[0]]));

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "", website: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const { blip } = useSound();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const next = firstErrors(z.flattenError(parsed.error).fieldErrors);
      setErrors(next);
      const first = FIELDS.find((f) => next[f.name]);
      if (first) document.getElementById(`contact-${first.name}`)?.focus();
      setStatus({ kind: "error", message: "A couple of fields need fixing first." });
      return;
    }
    setErrors({});
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; fields?: Record<string, string[]> };
      if (!res.ok) {
        if (data.fields) setErrors(firstErrors(data.fields));
        setStatus({ kind: "error", message: data.error ?? "Something went wrong. Please try again." });
        return;
      }
      setStatus({ kind: "sent" });
      blip(660, 0.08);
      window.setTimeout(() => blip(990, 0.12), 90);
    } catch {
      setStatus({ kind: "error", message: "Couldn't reach the server. Check your connection and try again." });
    }
  };

  if (status.kind === "sent") {
    return (
      <div role="status" className="flex flex-col gap-4 rounded-[20px] border border-ember bg-ember/10 p-8">
        <p className="font-display text-h3 font-bold tracking-[-0.03em]">Message sent.</p>
        <p className="text-fog">Thanks, {values.name.split(" ")[0]}. It&apos;s in my inbox and I&apos;ll reply to {values.email}.</p>
        <button
          type="button"
          onClick={() => {
            setValues({ name: "", email: "", message: "", website: "" });
            setStatus({ kind: "idle" });
          }}
          className="label self-start rounded-full border border-rim px-5 py-3 transition-colors hover:border-ember hover:text-ember"
        >
          Send another
        </button>
      </div>
    );
  }

  const inputClass = (f: ContactField) =>
    `rounded-[10px] border bg-ink px-4 py-3.5 text-bone transition-colors placeholder:text-fog/60 focus:border-ember focus:outline-none ${
      errors[f] ? "border-ember-soft" : "border-rim"
    }`;

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-5 rounded-[20px] border border-rim bg-char p-5 md:p-8">
      {FIELDS.map((f) => (
        <div key={f.name} className="flex flex-col gap-2">
          <label htmlFor={`contact-${f.name}`} className="label text-fog">
            {f.label}
          </label>
          {f.name === "message" ? (
            <textarea
              id={`contact-${f.name}`}
              name={f.name}
              rows={6}
              value={values.message}
              placeholder={f.placeholder}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
              className={`${inputClass("message")} min-h-[150px] resize-y`}
            />
          ) : (
            <input
              id={`contact-${f.name}`}
              name={f.name}
              type={f.type ?? "text"}
              autoComplete={f.autoComplete}
              value={values[f.name]}
              placeholder={f.placeholder}
              aria-invalid={!!errors[f.name]}
              aria-describedby={errors[f.name] ? `contact-${f.name}-error` : undefined}
              onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              className={inputClass(f.name)}
            />
          )}
          <p id={`contact-${f.name}-error`} className="min-h-[1lh] text-sm text-ember-soft">
            {errors[f.name]}
          </p>
        </div>
      ))}

      {/* Honeypot: off-screen and skipped by keyboard and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => setValues((v) => ({ ...v, website: e.target.value }))}
        />
      </div>

      {status.kind === "error" && (
        <p role="alert" className="rounded-[10px] border border-dashed border-ember-soft bg-ember-soft/10 px-4 py-3.5">
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="label inline-flex items-center gap-2.5 self-start rounded-full border border-ember bg-ember px-[22px] py-3.5 text-ink transition-colors hover:bg-ember-soft disabled:cursor-wait disabled:opacity-60"
      >
        {status.kind === "sending" ? "Sending…" : "Send message →"}
      </button>
    </form>
  );
}
