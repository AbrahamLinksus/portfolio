"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { site } from "@/lib/site";
import { LocalTime } from "@/components/ui/LocalTime";
import { useSound } from "@/components/providers/SoundProvider";
import { MenuOverlay } from "./MenuOverlay";

const pill =
  "label pointer-events-auto inline-flex items-center gap-2 rounded-full border px-4 py-2.5 backdrop-blur-md transition-colors";

export function Header() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const sound = useSound();

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 bg-linear-to-b from-ink via-ink/85 to-transparent pt-[env(safe-area-inset-top,0px)]">
        <div className="site-wrap flex items-center justify-between gap-4 py-[18px]">
          <Link
            href="/"
            className="group pointer-events-auto flex items-center gap-2.5 font-display text-[15px] font-bold"
          >
            <span aria-hidden="true" className="grid size-[38px] -rotate-8 place-items-center rounded-full bg-ember text-[13px] text-ink transition-transform duration-500 group-hover:rotate-[352deg]">
              JR
            </span>
            <span className="sr-only sm:not-sr-only">{site.name}</span>
          </Link>

          <p
            className="label pointer-events-auto hidden items-center gap-2 rounded-full border border-rim bg-ink/60 px-3 py-2 text-fog backdrop-blur-md md:flex"
            aria-label={`Local time in ${site.city}`}
          >
            <span className="size-[7px] animate-pulse rounded-full bg-ember" aria-hidden="true" />
            {site.city} <LocalTime className="font-semibold text-bone tabular-nums" /> IST
          </p>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={sound.toggle}
              role="switch"
              aria-checked={sound.on}
              className={`${pill} border-rim bg-ink/60 hover:border-ember`}
            >
              <span className="flex h-3 items-end gap-0.5" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={`w-0.5 rounded-[1px] bg-current ${sound.on ? "animate-[eq_0.9s_ease-in-out_infinite]" : "h-[3px]"}`}
                    style={sound.on ? { animationDelay: `${i * 0.15}s` } : undefined}
                  />
                ))}
              </span>
              <span className="sr-only sm:not-sr-only">Sound</span>
              <span aria-hidden="true" className={`hidden sm:inline ${sound.on ? "text-ember" : "text-fog"}`}>
                {sound.on ? "on" : "off"}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              className={`${pill} border-bone bg-bone text-ink`}
            >
              Menu
            </button>
          </div>
        </div>
      </header>
      <MenuOverlay open={open} onClose={close} />
    </>
  );
}
