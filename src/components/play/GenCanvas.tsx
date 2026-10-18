"use client";

import { useEffect, useRef } from "react";

/** Small generative thumbnail behind each side-experiment card. */
export function GenCanvas({ variant }: { variant: 0 | 1 | 2 }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const w = (cv.width = 300);
    cv.height = 300;
    ctx.strokeStyle = "rgb(255 106 26 / 0.55)";
    ctx.fillStyle = "rgb(255 106 26 / 0.5)";
    if (variant === 0) {
      for (let i = 0; i < 14; i++) {
        ctx.beginPath();
        ctx.arc(220, 80, i * 14, 0, Math.PI * 2);
        ctx.globalAlpha = 1 - i / 14;
        ctx.stroke();
      }
    } else if (variant === 1) {
      for (let i = 0; i < 180; i++) {
        ctx.globalAlpha = Math.random();
        ctx.fillRect(Math.random() * w, 20 + Math.random() * 120, 3, 3);
      }
    } else {
      ctx.lineWidth = 2;
      for (let j = 0; j < 6; j++) {
        ctx.beginPath();
        for (let i = 0; i <= w; i += 6) {
          const yy = 40 + j * 16 + Math.sin(i / 24 + j) * 12;
          if (i) ctx.lineTo(i, yy);
          else ctx.moveTo(i, yy);
        }
        ctx.globalAlpha = 0.25 + j * 0.12;
        ctx.stroke();
      }
    }
  }, [variant]);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 size-full opacity-80" />;
}
