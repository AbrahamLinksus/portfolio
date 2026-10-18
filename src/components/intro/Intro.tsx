"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { StickFigure } from "./StickFigure";
import { INTRO_EVENT, INTRO_SEEN_KEY } from "@/lib/events";
import { site } from "@/lib/site";

const DURATION = 4600;
const SPRING = "cubic-bezier(.3,1.5,.5,1)";
// [time 0..1, sheet x as a fraction of viewport width]. The stalls and
// slips are deliberate: it should look like hard work.
const SHEET: [number, number][] = [
  [0, 0], [0.16, 0], [0.22, -0.06], [0.27, -0.045], [0.36, -0.045], [0.43, -0.17],
  [0.47, -0.14], [0.58, -0.14], [0.66, -0.32], [0.7, -0.29], [0.78, -0.29], [1, -1.3],
];
const FIGURE: [number, number][] = [[0, 0.45], [0.13, 0], ...SHEET.slice(1, 11), [0.84, -0.5], [1, -0.5]];
const STRAINS: [number, number][] = [[0.18, 0.27], [0.38, 0.47], [0.6, 0.7]];
const LINES: [number, string, string][] = [
  [0.17, "hnngh.", "Opening up"],
  [0.38, "okay, it's stuck.", "Still opening"],
  [0.6, "one more push…", "Nearly there"],
  [0.8, "whoa—", "Welcome in"],
  [0.9, "…there.", "Welcome in"],
];

/**
 * First-visit intro: a stick-figure Jake shoves an orange sheet off the page.
 * An inline script in the root layout adds `intro-on` to <html> before paint
 * (first visit, motion allowed), so the sheet covers the page from frame one.
 */
export function Intro() {
  const sheet = useRef<HTMLDivElement>(null);
  const figure = useRef<HTMLDivElement>(null);
  const torn = useRef<HTMLDivElement>(null);
  const [grunt, setGrunt] = useState({ text: "", show: false });
  const [status, setStatus] = useState("Opening up");
  const running = useRef<{ anims: Animation[]; timers: number[] }>({ anims: [], timers: [] });

  // Stop animations without ending the intro (used on unmount, including
  // React's dev-mode double mount, so the intro survives it).
  const cancel = useCallback(() => {
    running.current.anims.forEach((a) => a.cancel());
    running.current.timers.forEach(clearTimeout);
    running.current = { anims: [], timers: [] };
    figure.current?.classList.remove("strain", "fell");
  }, []);

  const finish = useCallback(() => {
    cancel();
    document.documentElement.classList.remove("intro-on");
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {}
  }, [cancel]);

  const run = useCallback(() => {
    if (!sheet.current || !figure.current) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return finish();
    cancel();
    document.documentElement.classList.add("intro-on");
    window.scrollTo(0, 0);

    const w = window.innerWidth;
    const frames = (k: [number, number][]) =>
      k.map(([offset, x]) => ({ offset, transform: `translateX(${x * w}px)`, easing: SPRING }));
    const fig = figure.current;
    const r = running.current;
    r.anims.push(sheet.current.animate(frames(SHEET), { duration: DURATION, fill: "forwards" }));
    r.anims.push(fig.animate(frames(FIGURE), { duration: DURATION, fill: "forwards" }));
    r.anims.push(
      fig.animate([{ opacity: 1 }, { opacity: 1, offset: 0.9 }, { opacity: 0 }], { duration: DURATION, fill: "forwards" }),
    );
    STRAINS.forEach(([a, b]) => {
      r.timers.push(window.setTimeout(() => fig.classList.add("strain"), a * DURATION));
      r.timers.push(window.setTimeout(() => fig.classList.remove("strain"), b * DURATION));
    });
    r.timers.push(window.setTimeout(() => fig.classList.add("fell"), 0.8 * DURATION));
    LINES.forEach(([t, text, s]) =>
      r.timers.push(
        window.setTimeout(() => {
          setGrunt({ text, show: true });
          setStatus(s);
          r.timers.push(window.setTimeout(() => setGrunt((g) => ({ ...g, show: false })), 650));
        }, t * DURATION),
      ),
    );
    r.timers.push(window.setTimeout(finish, DURATION + 50));
  }, [finish, cancel]);

  useEffect(() => {
    // Torn right edge, randomised per visit.
    const pts = ["0 0"];
    for (let y = 0; y <= 100; y += 2.5) pts.push(`calc(100% - ${Math.round(Math.random() * 16)}px) ${y}%`);
    pts.push("0 100%");
    if (torn.current) torn.current.style.clipPath = `polygon(${pts.join(",")})`;

    if (document.documentElement.classList.contains("intro-on")) run();
    const onReplay = () => run();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && document.documentElement.classList.contains("intro-on")) finish();
    };
    window.addEventListener(INTRO_EVENT, onReplay);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(INTRO_EVENT, onReplay);
      window.removeEventListener("keydown", onKey);
      cancel();
    };
  }, [run, finish, cancel]);

  return (
    <div id="intro" className="fixed inset-0 z-[100] overflow-hidden" aria-label="Intro animation">
      <div ref={sheet} className="absolute inset-0 drop-shadow-[16px_0_24px_rgb(0_0_0/0.55)]">
        <div ref={torn} className="absolute inset-0 grid place-items-center bg-ember text-ink">
          <span aria-hidden="true" className="font-display text-[clamp(110px,24vw,340px)] leading-none font-extrabold tracking-[-0.07em]">
            JR
          </span>
          <div className="label absolute inset-x-0 top-[calc(28px+env(safe-area-inset-top,0px))] flex justify-between gap-3 pr-[calc(1.25rem+24px)] pl-5">
            <span>{site.name}</span>
            <span>Portfolio · 2026</span>
          </div>
          <div className="label absolute inset-x-0 bottom-[calc(28px+env(safe-area-inset-bottom,0px))] flex justify-between gap-3 pr-[calc(1.25rem+24px)] pl-5">
            <span aria-live="polite">{status}</span>
            <span>AI · SDE · Data</span>
          </div>
        </div>
      </div>

      <div ref={figure} className="pointer-events-none absolute inset-y-0 left-full w-screen">
        <span className="absolute bottom-[calc(14%-6px)] -left-2.5 h-2.5 w-[min(34vh,260px)] rounded-full bg-black/45 blur-[4px]" />
        <span
          className={`absolute bottom-[calc(14%+min(36vh,260px)+10px)] left-6 font-mono text-xs whitespace-nowrap text-bone transition-[opacity,translate] duration-200 md:bottom-[calc(14%+min(50vh,380px)+10px)] md:text-sm ${
            grunt.show ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
          }`}
        >
          {grunt.text}
        </span>
        <StickFigure className="absolute bottom-[14%] -left-1 aspect-[220/320] h-[min(36vh,260px)] w-auto overflow-visible md:h-[min(50vh,380px)]" />
      </div>

      <button
        type="button"
        onClick={finish}
        className="label absolute right-[calc(16px+env(safe-area-inset-right,0px))] bottom-[calc(16px+env(safe-area-inset-bottom,0px))] z-[2] rounded-full bg-ink px-4 py-2.5 text-bone"
      >
        Skip intro
      </button>
    </div>
  );
}
