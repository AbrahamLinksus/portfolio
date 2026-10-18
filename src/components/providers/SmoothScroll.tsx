"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef, type RefObject } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

/**
 * Ref to the active Lenis instance. `.current` is null when smooth scroll
 * is off (reduced motion) or not yet started, so read it inside handlers.
 */
export function useLenis() {
  const ref = useContext(LenisContext);
  if (!ref) throw new Error("useLenis must be used inside <SmoothScroll>");
  return ref;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: true });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}
