"use client";

import { useEffect, useRef } from "react";
import { HeadIllustration } from "@/components/art/HeadIllustration";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { BURST_EVENT } from "@/lib/events";
import { site } from "@/lib/site";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const art = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Depth layers drift upward at different speeds as the hero scrolls away.
  // GSAP is imported on demand so it stays out of the first bundle.
  useEffect(() => {
    if (reduced || !root.current) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.utils.toArray<SVGGElement>(".pl").forEach((layer) => {
          const depth = Number(layer.dataset.depth ?? 0);
          gsap.to(layer, {
            y: -depth * 900,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
          });
        });
      }, root);
    });
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduced]);

  // Idle animations only run while the hero is on screen.
  useEffect(() => {
    const el = art.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle("paused", !e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Stagger the idle float so objects don't bob in sync.
  useEffect(() => {
    art.current?.querySelectorAll<SVGGElement>(".float").forEach((g, i) => {
      g.style.animationDelay = `${-i * 0.9}s`;
      g.style.setProperty("--r", `${i % 2 ? -3 : 3}deg`);
    });
  }, []);

  // Footer easter egg: everything pops out of the head and settles back.
  useEffect(() => {
    const el = art.current;
    if (!el) return;
    const onBurst = () => {
      el.classList.remove("burst");
      void el.getBoundingClientRect();
      el.classList.add("burst");
      window.setTimeout(() => el.classList.remove("burst"), 1100);
    };
    window.addEventListener(BURST_EVENT, onBurst);
    return () => window.removeEventListener(BURST_EVENT, onBurst);
  }, []);

  return (
    <section
      ref={root}
      aria-label="Intro"
      className="relative flex min-h-0 items-center overflow-hidden pt-24 pb-9 md:min-h-[clamp(640px,100vh,940px)] md:pt-[84px]"
    >
      <div className="site-wrap flex flex-col items-center text-center">
        <h1 className="sr-only">{site.name}</h1>
        <p className="label text-fog">{site.tagline}</p>
        <span
          aria-hidden="true"
          className="relative z-[2] mt-[18px] block -translate-x-[14%] font-display text-[clamp(44px,13.5vw,110px)] leading-[0.86] font-extrabold tracking-[-0.05em] md:-translate-x-[24%] md:text-[clamp(60px,9vw,156px)]"
        >
          Jake
        </span>
        <div ref={art} className="ill relative z-[1] -mx-3 my-0.5 w-[calc(100%+24px)] md:mx-0 md:-mt-[1.2vw] md:-mb-[0.6vw] md:w-[min(900px,100%)]">
          <HeadIllustration className="block h-auto w-full overflow-visible" />
        </div>
        <span
          aria-hidden="true"
          className="relative z-[2] block translate-x-[3%] font-display text-[clamp(44px,13.5vw,110px)] leading-[0.86] font-extrabold tracking-[-0.05em] text-ember md:translate-x-[20%] md:text-[clamp(60px,9vw,156px)]"
        >
          Roberts.
        </span>

        <div className="mt-[26px] flex flex-col items-center gap-2.5">
          <p
            className="font-display text-[clamp(15px,4.2vw,20px)] leading-[1.3] font-medium tracking-[-0.01em] md:text-[clamp(16px,1.5vw,22px)]"
          >
            <span className="sr-only">{site.role}</span>
            {[...site.role].map((ch, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`role-ch ${ch === "·" ? "mx-[0.15em] text-ember" : ""}`}
                style={{ animationDelay: `${0.4 + i * 0.035}s` }}
              >
                {ch === " " ? " " : ch}
              </span>
            ))}
          </p>
          <p className="max-w-[40ch] text-fog">Thanks for stopping by. Glad you found your way here.</p>
          <a href="#statement" className="label group mt-3.5 inline-flex items-center gap-3.5">
            <span className="relative h-px w-14 overflow-hidden bg-rim">
              <span className="absolute -top-px h-[3px] w-4 animate-[cue_1.8s_infinite] bg-ember" />
            </span>
            Scroll
          </a>
        </div>
      </div>
    </section>
  );
}
