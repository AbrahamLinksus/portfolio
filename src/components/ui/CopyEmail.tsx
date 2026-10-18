"use client";

import { useRef, useState } from "react";
import { site } from "@/lib/site";

/** Click-to-copy email. Falls back to selecting the text if the clipboard is blocked. */
export function CopyEmail({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const addr = useRef<HTMLSpanElement>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      const range = document.createRange();
      if (addr.current) range.selectNodeContents(addr.current);
      const sel = getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`group block text-left font-display font-bold tracking-[-0.03em] break-all transition-colors hover:text-ember-soft ${className}`}
    >
      <span ref={addr}>{site.email}</span>
      <span
        aria-live="polite"
        className={`ml-3 inline-block rounded-full border px-2.5 py-1 align-middle font-mono text-xs font-semibold tracking-[0.06em] uppercase transition-colors ${
          copied ? "border-ember bg-ember text-ink" : "border-rim text-fog"
        }`}
      >
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
