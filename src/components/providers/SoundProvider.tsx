"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type Sound = { on: boolean; toggle: () => void; blip: (freq?: number, dur?: number, vol?: number) => void };

const SoundContext = createContext<Sound | null>(null);

export function useSound() {
  const s = useContext(SoundContext);
  if (!s) throw new Error("useSound must be used inside <SoundProvider>");
  return s;
}

/**
 * Subtle UI sounds, synthesised with Web Audio (no files to load).
 * Off by default; the AudioContext is only created after the visitor turns
 * sound on, which also satisfies browser autoplay rules.
 */
export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  const ctx = useRef<AudioContext | null>(null);
  const onRef = useRef(false);

  const blip = useCallback((freq = 640, dur = 0.06, vol = 0.04) => {
    const ac = ctx.current;
    if (!onRef.current || !ac) return;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
    osc.connect(gain).connect(ac.destination);
    osc.start();
    osc.stop(ac.currentTime + dur + 0.02);
  }, []);

  const toggle = useCallback(() => {
    const next = !onRef.current;
    onRef.current = next;
    setOn(next);
    if (next) {
      try {
        ctx.current ??= new AudioContext();
        void ctx.current.resume();
      } catch {}
      blip(880, 0.1, 0.05);
    }
  }, [blip]);

  // Clicks on links and buttons, and hovers on [data-sfx] elements.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) blip(520 + Math.random() * 160);
    };
    const onOver = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest("[data-sfx]");
      if (t && !t.contains(e.relatedTarget as Node | null)) blip(1200, 0.03, 0.015);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("pointerover", onOver);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointerover", onOver);
    };
  }, [blip]);

  return <SoundContext.Provider value={{ on, toggle, blip }}>{children}</SoundContext.Provider>;
}
