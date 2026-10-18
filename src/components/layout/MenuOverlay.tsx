"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useLenis } from "@/components/providers/SmoothScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { menuLinks, site } from "@/lib/site";
import { LocalTime } from "@/components/ui/LocalTime";

const EASE = [0.7, 0, 0.2, 1] as const;

export function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const reduced = useReducedMotion();

  // Lock scroll, move focus in, close on Escape, keep Tab inside.
  useEffect(() => {
    if (!open) return;
    const returnTo = document.activeElement as HTMLElement | null;
    const smooth = lenis.current;
    smooth?.stop();
    document.documentElement.style.overflow = "hidden";
    // Everything behind the dialog is unreachable while it is open.
    const behind = [...document.querySelectorAll<HTMLElement>("#main, footer, header")];
    behind.forEach((el) => (el.inert = true));
    const focusables = () => [...(panel.current?.querySelectorAll<HTMLElement>("a, button") ?? [])];
    const t = window.setTimeout(() => focusables()[1]?.focus(), 250);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const f = focusables();
      const first = f[0];
      const last = f[f.length - 1];
      const wrapTo = e.shiftKey ? (document.activeElement === first ? last : null) : document.activeElement === last ? first : null;
      if (wrapTo) {
        e.preventDefault();
        wrapTo.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      smooth?.start();
      document.documentElement.style.overflow = "";
      behind.forEach((el) => (el.inert = false));
      returnTo?.focus?.();
    };
  }, [open, onClose, lenis]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={panel}
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[70] grid grid-rows-[auto_1fr_auto] bg-ember pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] text-ink"
          initial={reduced ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 60px) 40px)" }}
          animate={reduced ? { opacity: 1 } : { clipPath: "circle(150% at calc(100% - 60px) 40px)" }}
          exit={reduced ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 60px) 40px)" }}
          transition={{ duration: reduced ? 0.01 : 0.7, ease: EASE }}
        >
          <div className="site-wrap flex items-center justify-between py-[18px]">
            <span className="grid size-[38px] -rotate-8 place-items-center rounded-full bg-ink font-display text-[13px] font-bold text-ember">
              JR
            </span>
            <button type="button" onClick={onClose} className="label rounded-full bg-ink px-4 py-2.5 text-bone">
              Close
            </button>
          </div>

          <nav aria-label="Menu" className="site-wrap flex flex-col justify-center gap-1">
            {menuLinks.map((l, i) => (
              <m.div
                key={l.href}
                initial={reduced ? false : { y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 + i * 0.06, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <Link
                  href={l.href}
                  onClick={onClose}
                  data-sfx
                  className="flex items-baseline gap-5 font-display text-[clamp(48px,9vw,128px)] leading-none font-extrabold tracking-[-0.03em] transition-[translate,color] duration-300 hover:translate-x-[18px] hover:text-paper focus-visible:outline-ink"
                >
                  <small className="font-mono text-[13px] font-semibold tracking-[0.08em]">{String(i + 1).padStart(2, "0")}</small>
                  {l.label}
                </Link>
              </m.div>
            ))}
          </nav>

          <div className="site-wrap label flex flex-wrap justify-between gap-3 py-[22px]">
            <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
              github / AbrahamLinksus
            </a>
            <a href={site.socials.leetcode} target="_blank" rel="noopener noreferrer" className="hover:underline">
              leetcode / abrahamlinksus
            </a>
            <span>
              {site.city} <LocalTime />
            </span>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
