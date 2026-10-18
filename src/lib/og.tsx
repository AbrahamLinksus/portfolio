import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// Read once at module scope (it never changes between requests).
const unbounded = readFile(join(process.cwd(), "src/assets/fonts/Unbounded-ExtraBold.ttf"));

/** Shared social card: charcoal ground, ember accent, stick-figure head. */
export async function ogImage({ eyebrow, title, accent, footer }: { eyebrow: string; title: string; accent: string; footer: string }) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#141311", color: "#efe8de", padding: 72, fontFamily: "Unbounded" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, color: "#968d81", letterSpacing: 2 }}>
          <span>{eyebrow}</span>
          <div style={{ display: "flex", width: 64, height: 64, borderRadius: 32, background: "#ff6a1a", color: "#141311", alignItems: "center", justifyContent: "center", fontSize: 22 }}>JR</div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 112, lineHeight: 0.9, letterSpacing: -5 }}>
            <span>{title}</span>
            <span style={{ color: "#ff6a1a" }}>{accent}</span>
          </div>
          <svg width="220" height="220" viewBox="0 0 220 220">
            <path d="M40 90 A80 80 0 1 0 180 90 Z" fill="#141311" stroke="#efe8de" strokeWidth="5" />
            <ellipse cx="110" cy="90" rx="70" ry="12" fill="#0d0c0b" stroke="#efe8de" strokeWidth="4" />
            <ellipse cx="110" cy="88" rx="50" ry="6" fill="#ff6a1a" fillOpacity="0.6" />
            <circle cx="82" cy="140" r="8" fill="#efe8de" />
            <circle cx="138" cy="140" r="8" fill="#efe8de" />
            <path d="M76 172 Q110 202 144 172" fill="none" stroke="#efe8de" strokeWidth="6" strokeLinecap="round" />
            <path d="M70 60 L58 20 M110 50 L110 6 M150 60 L164 20" stroke="#ff6a1a" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#efe8de" }}>{footer}</div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Unbounded", data: await unbounded, weight: 800, style: "normal" }] },
  );
}
