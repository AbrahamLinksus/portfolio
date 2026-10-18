"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectArt } from "@/components/art/ProjectArt";
import { Copy, isTodo } from "@/components/ui/Copy";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { projects } from "@/lib/projects";

const pad = (n: number) => String(n).padStart(2, "0");

export function WorkCarousel() {
  const [index, setIndex] = useState(0);
  const prev = useRef(0);
  const slides = useRef<(HTMLElement | null)[]>([]);
  const reduced = useReducedMotion();
  const total = projects.length;

  // GSAP loads after mount; until it arrives, slides swap without animation.
  const gsapRef = useRef<typeof import("gsap").default | null>(null);
  useEffect(() => {
    void import("gsap").then((mod) => (gsapRef.current = mod.default));
  }, []);

  const go = useCallback((n: number) => setIndex((n + total) % total), [total]);

  // GSAP hand-off between the outgoing and incoming slide.
  useEffect(() => {
    const from = slides.current[prev.current];
    const to = slides.current[index];
    const dir = index > prev.current || (prev.current === total - 1 && index === 0) ? 1 : -1;
    prev.current = index;
    if (!to || from === to) return;
    const gsap = gsapRef.current;
    if (reduced || !gsap) {
      if (from) Object.assign(from.style, { visibility: "hidden", opacity: "0" });
      Object.assign(to.style, { visibility: "visible", opacity: "1" });
      to.querySelectorAll<HTMLElement>("[data-line]").forEach((el) => Object.assign(el.style, { visibility: "", opacity: "", transform: "" }));
      to.querySelector<HTMLElement>("[data-art]")?.style.removeProperty("clip-path");
      return;
    }
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (from) {
      tl.to(from.querySelectorAll("[data-line]"), { y: -24 * dir, autoAlpha: 0, duration: 0.3, stagger: 0.03, ease: "power2.in" })
        .to(from.querySelector("[data-art]"), { clipPath: dir > 0 ? "inset(0 0 0 100% round 20px)" : "inset(0 100% 0 0 round 20px)", duration: 0.45, ease: "power3.inOut" }, 0)
        .set(from, { autoAlpha: 0 });
    }
    tl.set(to, { autoAlpha: 1 })
      .fromTo(
        to.querySelector("[data-art]"),
        { clipPath: dir > 0 ? "inset(0 100% 0 0 round 20px)" : "inset(0 0 0 100% round 20px)" },
        { clipPath: "inset(0 0% 0 0% round 20px)", duration: 0.8, ease: "power3.inOut" },
        "-=0.1",
      )
      .fromTo(to.querySelectorAll("[data-line]"), { y: 24 * dir, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.06 }, "<0.15");
    return () => {
      tl.progress(1).kill();
    };
  }, [index, reduced, total]);

  // Swipe: horizontal drag of 50px or more.
  const startX = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    startX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Selected work"
      className="relative flex min-h-[min(100vh,900px)] flex-col justify-center overflow-hidden bg-[#0f0e0d] py-[clamp(90px,9vw,120px)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[30%] -right-[2vw] font-display text-[70vw] leading-none font-extrabold text-transparent tabular-nums [-webkit-text-stroke:1px_rgb(255_106_26/0.12)] md:top-auto md:-bottom-[6vw] md:text-[38vw]"
      >
        {pad(index + 1)}
      </div>

      <div className="site-wrap relative">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <Eyebrow className="mb-3">Selected work</Eyebrow>
            <p className="font-display text-[clamp(40px,5vw,72px)] leading-none font-bold tracking-[-0.03em] tabular-nums" aria-live="polite">
              {pad(index + 1)}
              <span className="ml-1.5 align-top text-[0.4em] tracking-normal text-fog">/{pad(total)}</span>
            </p>
          </div>
          <Link href="/work" className="label rounded-full border border-rim px-5 py-3.5 transition-colors hover:border-ember hover:text-ember">
            All work ↗
          </Link>
        </div>

        <div
          tabIndex={0}
          aria-label="Project slides. Use the arrow keys or swipe."
          onKeyDown={(e) => {
            if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
            e.preventDefault();
            go(index + (e.key === "ArrowRight" ? 1 : -1));
          }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          className="grid cursor-grab touch-pan-y select-none active:cursor-grabbing"
        >
          {projects.map((p, i) => (
            <article
              key={p.slug}
              ref={(el) => {
                slides.current[i] = el;
              }}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}: ${p.title}`}
              aria-hidden={i !== index}
              inert={i !== index}
              style={i === 0 ? undefined : { visibility: "hidden", opacity: 0 }}
              className="col-start-1 row-start-1 grid items-center gap-[clamp(24px,4vw,64px)] md:grid-cols-[1fr_1.15fr]"
            >
              <div className="order-2 md:order-1">
                <p data-line className="label text-ember">● {p.category}</p>
                <h3 data-line className="mt-3.5 font-display text-[clamp(40px,5.5vw,88px)] leading-[0.95] font-extrabold tracking-[-0.045em]">
                  {p.title}
                </h3>
                <p data-line className="mt-[18px] max-w-[32ch] text-lead">{p.summary}</p>
                <p data-line className="mt-3.5 max-w-[40ch] text-fog">
                  <Copy text={p.outcome} />
                </p>
                <div data-line>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li key={t} className={isTodo(t) ? "todo" : "rounded-full border border-rim px-2.5 py-1.5 font-mono text-xs"}>
                        {t}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/work/${p.slug}`} className="label mt-7 inline-flex gap-2 border-b border-ember pb-1">
                    Read case study →
                  </Link>
                </div>
              </div>
              <div
                data-art
                className="order-1 aspect-[16/10] max-w-full overflow-hidden rounded-[20px] border border-rim bg-char md:order-2 md:aspect-[4/3]"
              >
                <ProjectArt slug={p.slug} />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between gap-5">
          <div className="relative h-0.5 max-w-[520px] flex-1 bg-rim" aria-hidden="true">
            <i className="absolute inset-y-0 left-0 bg-ember transition-[width] duration-600 ease-(--ease-curtain)" style={{ width: `${((index + 1) / total) * 100}%` }} />
          </div>
          <span className="label hidden text-fog sm:inline">← → keys or swipe</span>
          <div className="flex gap-2.5">
            {[
              { label: "Previous project", glyph: "←", to: index - 1 },
              { label: "Next project", glyph: "→", to: index + 1 },
            ].map((b) => (
              <button
                key={b.glyph}
                type="button"
                aria-label={b.label}
                data-sfx
                onClick={() => go(b.to)}
                className="grid size-14 place-items-center rounded-full border border-rim text-xl transition-colors hover:border-ember hover:bg-ember hover:text-ink"
              >
                {b.glyph}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
