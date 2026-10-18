"use client";

import { LazyMotion } from "framer-motion";

const loadFeatures = () => import("@/lib/motion-features").then((m) => m.default);

/** Framer Motion with features fetched after hydration (use `m.*`, not `motion.*`). */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
