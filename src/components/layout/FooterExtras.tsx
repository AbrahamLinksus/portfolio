"use client";

import { usePathname } from "next/navigation";
import { useNavigate } from "@/components/providers/TransitionProvider";
import { useEffect, useState } from "react";
import { BURST_EVENT, INTRO_EVENT } from "@/lib/events";
import { useUI } from "@/components/providers/UIProvider";
import { site } from "@/lib/site";

const hourIn = (tz: string) =>
  Number(new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", hour12: false }).format(new Date()));

/** "Asleep" after 10pm IST, otherwise awake. */
export function AwakeStatus() {
  const [hour, setHour] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setHour(hourIn(site.timeZone));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  if (hour === null) return <span>&nbsp;</span>;
  return <span>{hour >= 22 || hour < 6 ? "Asleep. Lights out by 10." : "Awake, likely at a keyboard"}</span>;
}

/** Hidden easter egg: the © bursts the hero illustration. Typing "sudo" gets a reply. */
export function EasterEgg() {
  const { toast } = useUI();
  const pathname = usePathname();
  const navigate = useNavigate();

  useEffect(() => {
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest("input, textarea")) return;
      buf = (buf + e.key).slice(-4).toLowerCase();
      if (buf === "sudo") toast("Permission denied. Nice try though.");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toast]);

  const burst = () => {
    if (pathname !== "/") navigate("/");
    window.setTimeout(
      () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.dispatchEvent(new Event(BURST_EVENT));
        toast("Brain dump complete. Everything is back in place.");
      },
      pathname === "/" ? 0 : 1300,
    );
  };

  return (
    <button type="button" onClick={burst} aria-label="Don't press this" className="px-0.5 transition-colors hover:text-ember">
      ©
    </button>
  );
}

export function ReplayIntro() {
  const pathname = usePathname();
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="transition-colors hover:text-ember"
      onClick={() => {
        if (pathname !== "/") navigate("/");
        window.setTimeout(() => window.dispatchEvent(new Event(INTRO_EVENT)), pathname === "/" ? 0 : 1300);
      }}
    >
      Replay intro ↺
    </button>
  );
}
