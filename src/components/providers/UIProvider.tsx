"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

type UI = { toast: (message: string) => void };

const UIContext = createContext<UI | null>(null);

export function useUI() {
  const ui = useContext(UIContext);
  if (!ui) throw new Error("useUI must be used inside <UIProvider>");
  return ui;
}

/** Site-wide UI services. Currently: a single toast line. */
export function UIProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const toast = useCallback((m: string) => {
    setMessage(m);
    setVisible(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setVisible(false), 2600);
  }, []);

  return (
    <UIContext.Provider value={{ toast }}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] left-1/2 z-[90] max-w-[calc(100vw-2.5rem)] -translate-x-1/2 rounded-xl bg-paper px-[18px] py-3 text-center font-semibold text-ink shadow-[0_10px_40px_rgb(0_0_0/0.4)] transition-[translate,opacity] duration-300 ease-(--ease-out-back) ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[140%] opacity-0"
        }`}
      >
        {message}
      </div>
    </UIContext.Provider>
  );
}
