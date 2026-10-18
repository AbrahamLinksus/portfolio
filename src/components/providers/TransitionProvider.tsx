"use client";

import { AnimatePresence, m } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLenis } from "./SmoothScroll";

type Nav = { navigate: (href: string) => void };
const NavContext = createContext<Nav | null>(null);

export function useNavigate() {
  const n = useContext(NavContext);
  if (!n) throw new Error("useNavigate must be used inside <TransitionProvider>");
  return n.navigate;
}

const EASE = [0.7, 0, 0.3, 1] as const;

/**
 * Page transitions: an ember curtain rises over the page, the route changes
 * underneath, then the curtain lifts off the top. Internal <a> clicks are
 * intercepted globally so every Link gets the transition for free.
 */
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const [covering, setCovering] = useState(false);
  const pending = useRef<string | null>(null);

  const navigate = useCallback(
    (href: string) => {
      const url = new URL(href, location.href);
      if (url.pathname === location.pathname) {
        if (url.hash) document.querySelector(url.hash)?.scrollIntoView();
        else if (lenis.current) lenis.current.scrollTo(0);
        else window.scrollTo(0, 0);
        return;
      }
      if (reduced) {
        router.push(url.pathname + url.search + url.hash);
        return;
      }
      pending.current = url.pathname + url.search + url.hash;
      setCovering(true);
    },
    [reduced, router, lenis],
  );

  // Lift the curtain once the new route has rendered.
  useEffect(() => {
    if (!pending.current) return;
    pending.current = null;
    lenis.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    const id = window.setTimeout(() => setCovering(false), 60);
    return () => clearTimeout(id);
  }, [pathname, lenis]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || /\.\w+$/.test(url.pathname)) return;
      if (url.pathname === location.pathname && url.hash) return;
      e.preventDefault();
      navigate(url.href);
    };
    // Capture phase: runs before <Link>'s handler, which then sees
    // defaultPrevented and leaves the navigation to us.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate]);

  return (
    <NavContext.Provider value={{ navigate }}>
      {children}
      <AnimatePresence>
        {covering && (
          <m.div
            key="curtain"
            aria-hidden="true"
            className="fixed inset-0 z-[80] grid place-items-center bg-ember font-display text-[clamp(28px,5vw,64px)] font-extrabold text-ink"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: EASE }}
            onAnimationComplete={() => {
              if (pending.current) router.push(pending.current);
            }}
          >
            JR
          </m.div>
        )}
      </AnimatePresence>
    </NavContext.Provider>
  );
}
