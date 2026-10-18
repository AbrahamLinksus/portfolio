"use client";

import { useId, useState } from "react";
import { useSound } from "@/components/providers/SoundProvider";

// Chart geometry (SVG user units).
const W = 600;
const H = 240;
const X0 = 50;
const X1 = 580;
const Y0 = 20;
const Y1 = 210;
const MAX_DAYS = 60;
const x = (d: number) => X0 + (d / MAX_DAYS) * (X1 - X0);
const y = (p: number) => Y0 + (1 - p) * (Y1 - Y0);

const verdict = (p: number) =>
  p > 0.8 ? "still fresh" : p > 0.5 ? "fading, but there" : p > 0.2 ? "time to review" : "basically gone";

/**
 * Interactive half-life forgetting curve: p = 2^(-Δ/h).
 * The same model family behind the Recall Prediction project.
 */
export function ForgettingCurve() {
  const [half, setHalf] = useState(7);
  const [days, setDays] = useState(7);
  const { blip } = useSound();
  const id = useId();
  const p = Math.pow(2, -days / half);

  let path = "";
  for (let t = 0; t <= MAX_DAYS; t += 0.5) path += `${t ? "L" : "M"}${x(t).toFixed(1)} ${y(Math.pow(2, -t / half)).toFixed(1)}`;

  return (
    <div className="min-w-0 rounded-[20px] border border-rim bg-char p-5 md:p-7">
      <p className="label text-ember">Toy · Forgetting curve</p>
      <h2 className="mt-2.5 font-display text-[clamp(24px,2.4vw,36px)] font-bold tracking-[-0.03em]">How much do you still remember?</h2>
      <p className="mt-1.5 max-w-[48ch] text-fog">
        Recall probability p = 2<sup>−Δ/h</sup>. Same math my Recall Prediction model starts from.
      </p>

      <p className="mt-5 flex items-baseline gap-3.5" aria-live="polite">
        <b className="font-display text-[clamp(56px,7vw,96px)] leading-none font-extrabold tracking-[-0.05em] text-ember tabular-nums">
          {Math.round(p * 100)}%
        </b>
        <span className="text-fog">{verdict(p)}</span>
      </p>

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-2.5 block h-auto w-full" role="img" aria-label={`Forgetting curve with a ${half}-day half-life. After ${days} days, recall is ${Math.round(p * 100)}%.`}>
        {[0, 0.5, 1].map((v) => (
          <g key={v}>
            <line x1={X0} x2={X1} y1={y(v)} y2={y(v)} stroke={v === 0.5 ? "#5a534b" : "#2c2824"} strokeDasharray={v === 0.5 ? "4 6" : undefined} />
            <text x={X0 - 10} y={y(v) + 4} textAnchor="end" fontFamily="var(--font-mono)" fontSize="11" fill="#968d81">
              {v * 100}%
            </text>
          </g>
        ))}
        {[0, 15, 30, 45, 60].map((d) => (
          <text key={d} x={x(d)} y={H - 10} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="#968d81">
            {d}d
          </text>
        ))}
        <path d={`${path} L${x(MAX_DAYS)} ${y(0)} L${x(0)} ${y(0)}Z`} fill="#ff6a1a" fillOpacity="0.1" />
        <path d={path} fill="none" stroke="#ff6a1a" strokeWidth="3" />
        <line x1={x(days)} x2={x(days)} y1={y(0)} y2={y(p)} stroke="#efe8de" strokeOpacity="0.4" strokeDasharray="3 4" />
        <circle cx={x(days)} cy={y(p)} r="8" fill="#ff6a1a" stroke="#141311" strokeWidth="3" />
      </svg>

      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        {[
          { key: "half", label: "Half-life", value: half, min: 1, max: 30, set: setHalf },
          { key: "days", label: "Days since practice", value: days, min: 0, max: MAX_DAYS, set: setDays },
        ].map((s) => (
          <label key={s.key} htmlFor={`${id}-${s.key}`} className="label flex flex-col gap-2 text-fog">
            <span>
              {s.label} <b className="text-bone tabular-nums">{s.value} {s.value === 1 ? "day" : "days"}</b>
            </span>
            <input
              id={`${id}-${s.key}`}
              type="range"
              min={s.min}
              max={s.max}
              value={s.value}
              onChange={(e) => {
                s.set(Number(e.target.value));
                blip(400 + days * 8, 0.03, 0.02);
              }}
              className="w-full accent-ember"
            />
          </label>
        ))}
      </div>
    </div>
  );
}
