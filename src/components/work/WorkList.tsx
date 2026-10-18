"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ProjectArt } from "@/components/art/ProjectArt";
import type { Project } from "@/lib/projects";

/**
 * Project index. On devices with a fine pointer, a small cover follows the
 * cursor while a row is hovered.
 */
export function WorkList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !preview.current) return;
    preview.current.style.translate = `${e.clientX + 24}px ${e.clientY - 90}px`;
  };

  return (
    <div onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
      <ol className="border-t border-rim">
        {projects.map((p, i) => (
          <li key={p.slug} onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}>
            <Link
              href={`/work/${p.slug}`}
              data-sfx
              className="group grid grid-cols-[40px_1fr_30px] items-center gap-3 border-b border-rim py-7 transition-[padding,color] duration-300 hover:text-ember md:grid-cols-[70px_1.4fr_1fr_1.2fr_40px] md:gap-5 md:hover:pl-4"
            >
              <span className="font-mono text-[13px] text-fog">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-[clamp(24px,3vw,44px)] font-bold tracking-[-0.035em]">{p.title}</span>
              <span className="label hidden text-fog md:block">{p.category}</span>
              <span className="hidden text-[15px] text-fog md:block">{p.summary}</span>
              <span aria-hidden="true" className="text-[22px] transition-transform duration-300 group-hover:-rotate-45">
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div
        ref={preview}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-40 hidden aspect-[4/3] w-[260px] overflow-hidden rounded-2xl border border-rim bg-char shadow-[0_20px_50px_rgb(0_0_0/0.5)] transition-[opacity,scale] duration-300 md:block ${
          active === null ? "scale-90 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {projects.map((p, i) => (
          <div key={p.slug} className={`absolute inset-0 transition-opacity duration-300 ${active === i ? "opacity-100" : "opacity-0"}`}>
            <ProjectArt slug={p.slug} />
          </div>
        ))}
      </div>
    </div>
  );
}
