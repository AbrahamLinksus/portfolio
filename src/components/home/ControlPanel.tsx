"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useNavigate } from "@/components/providers/TransitionProvider";
import { site } from "@/lib/site";

type Key = { key: string; label: string; path: string; href: string; external?: boolean };

const KEYS: Key[] = [
  { key: "w", label: "Work", path: "/work", href: "/work" },
  { key: "h", label: "Human", path: "/human", href: "/human" },
  { key: "p", label: "Play", path: "/play", href: "/play" },
  { key: "r", label: "Resume", path: "resume.pdf", href: site.resume, external: true },
];

const COMMANDS = ["open work", "cat beliefs.txt", "./play --toy", "git push"];

function TypedCommand() {
  const reduced = useReducedMotion();
  const [text, setText] = useState(COMMANDS[0]);

  useEffect(() => {
    if (reduced) return;
    let cmd = 0;
    let i = 0;
    let timer: number;
    const step = () => {
      const c = COMMANDS[cmd % COMMANDS.length];
      i += 1;
      setText(c.slice(0, i));
      if (i >= c.length) {
        cmd += 1;
        i = 0;
        timer = window.setTimeout(step, 2200);
      } else {
        timer = window.setTimeout(step, 70);
      }
    };
    timer = window.setTimeout(step, 600);
    return () => clearTimeout(timer);
  }, [reduced]);

  return <span className="text-bone">{text}</span>;
}

export function ControlPanel() {
  const navigate = useNavigate();
  const refs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Press W / H / P / R anywhere on the home page (not while typing).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.metaKey || e.ctrlKey || e.altKey || t.closest("input, textarea, select, [contenteditable]")) return;
      const k = KEYS.find((x) => x.key === e.key.toLowerCase());
      const el = k && refs.current[k.key];
      if (!k || !el) return;
      el.dataset.pressed = "true";
      window.setTimeout(() => {
        delete el.dataset.pressed;
        if (k.external) window.open(k.href, "_blank", "noopener");
        else navigate(k.href);
      }, 140);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const externals = [
    { label: "github", value: "AbrahamLinksus", href: site.socials.github },
    { label: "leetcode", value: "abrahamlinksus", href: site.socials.leetcode },
    { label: "linkedin", value: "jake-roberts05", href: site.socials.linkedin },
  ];

  return (
    <section aria-labelledby="panel-title" className="bg-char py-section">
      <div className="site-wrap">
        <Eyebrow id="panel-title">Control panel</Eyebrow>
        <div className="overflow-hidden rounded-[18px] border border-rim bg-[#0f0e0d] shadow-[0_30px_80px_rgb(0_0_0/0.35)]">
          <div className="flex items-center justify-between gap-3 border-b border-rim bg-slate px-4 py-3">
            <div className="flex gap-2" aria-hidden="true">
              <i className="size-[11px] rounded-full bg-ember" />
              <i className="size-[11px] rounded-full bg-rim" />
              <i className="size-[11px] rounded-full bg-rim" />
            </div>
            <span className="label text-fog">jake@portfolio: ~</span>
            <span className="label text-fog">zsh</span>
          </div>

          <div className="grid md:grid-cols-[1.1fr_1fr]">
            <div className="min-w-0 border-b border-rim p-5 font-mono text-[13px] leading-[1.8] text-fog md:border-r md:border-b-0 md:p-7 md:text-sm" aria-hidden="true">
              <p><span className="text-ember">jake@portfolio ~ %</span> <span className="text-bone">help</span></p>
              <p>Pick a route. Press the key or click it.</p>
              <p>&nbsp;</p>
              <p><span className="text-bone">[W]</span> work&nbsp;&nbsp;&nbsp;&nbsp;projects + case studies</p>
              <p><span className="text-bone">[H]</span> human&nbsp;&nbsp;&nbsp;the person behind the commits</p>
              <p><span className="text-bone">[P]</span> play&nbsp;&nbsp;&nbsp;&nbsp;games, experiments, one toy</p>
              <p><span className="text-bone">[R]</span> resume&nbsp;&nbsp;one page, PDF</p>
              <p>&nbsp;</p>
              <p>
                <span className="text-ember">jake@portfolio ~ %</span> <TypedCommand />
                <span className="ml-0.5 inline-block h-[17px] w-[9px] animate-pulse bg-ember align-[-3px]" />
              </p>
            </div>

            <div className="grid grid-cols-2 content-start gap-2.5 p-3.5 md:gap-3 md:p-[22px]">
              {KEYS.map((k, i) => (
                <Link
                  key={k.key}
                  ref={(el) => {
                    refs.current[k.key] = el;
                  }}
                  href={k.href}
                  target={k.external ? "_blank" : undefined}
                  data-sfx
                  aria-keyshortcuts={k.key.toUpperCase()}
                  className={`flex min-h-24 flex-col justify-between gap-6 rounded-[14px] border border-b-[5px] p-4 transition-[translate,border-color,background-color] duration-150 active:translate-y-[3px] active:border-b-2 data-[pressed]:translate-y-[3px] data-[pressed]:border-b-2 md:min-h-[120px] ${
                    i === 0
                      ? "border-ember-deep bg-ember text-ink"
                      : "border-rim bg-slate hover:border-ember hover:bg-[#2c2824]"
                  }`}
                >
                  <span className={`flex justify-between font-mono text-xs ${i === 0 ? "text-ink" : "text-fog"}`}>
                    <span>/{k.path}</span>
                    <kbd className={`rounded-[5px] border px-[7px] py-px ${i === 0 ? "border-ink/35" : "border-rim text-bone"}`}>
                      {k.key.toUpperCase()}
                    </kbd>
                  </span>
                  <strong className="font-display text-lg font-bold md:text-[22px]">{k.label}</strong>
                </Link>
              ))}

              <ul className="col-span-2 grid gap-2.5 sm:grid-cols-3 md:gap-3">
                {externals.map((x) => (
                  <li key={x.label} className="min-w-0">
                    <a
                      href={x.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col gap-1 rounded-xl border border-dashed border-rim p-3.5 font-mono text-xs text-fog transition-colors hover:border-ember hover:text-ember-soft"
                    >
                      {x.label} <b className="text-[13px] font-semibold break-all text-bone">{x.value} ↗</b>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
