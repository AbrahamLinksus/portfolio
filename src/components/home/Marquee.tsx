type Tile = { text: string; note?: string; look?: "paper" | "game" };

const TILES: Tile[] = [
  { text: "Coimbatore", note: "home" },
  { text: "LeetCode grinder", note: "daily", look: "paper" },
  { text: "Badminton", note: "racquet in the bag" },
  { text: "Drums", look: "paper" },
  { text: "Bikes", note: "helmet on" },
  { text: "[TODO: game]", look: "game" },
  { text: "SRM IST", note: "class of 27" },
  { text: "Coffee", look: "paper" },
  { text: "RAG tinkerer" },
  { text: "XGBoost > baseline", note: "0.652 AUC", look: "paper" },
  { text: "[TODO: game]", look: "game" },
  { text: "TDD convert", note: "since Drylogic" },
  { text: "Chennai", note: "for now", look: "paper" },
];

function Pad() {
  return (
    <svg width="26" height="18" viewBox="0 0 30 22" aria-hidden="true" className="shrink-0">
      <rect x="1" y="4" width="28" height="15" rx="7" fill="#ff6a1a" />
      <rect x="6" y="10" width="7" height="2" fill="#141311" />
      <rect x="8.5" y="7.5" width="2" height="7" fill="#141311" />
      <circle cx="21" cy="9" r="1.6" fill="#141311" />
      <circle cx="24" cy="12" r="1.6" fill="#141311" />
    </svg>
  );
}

function Tiles({ hidden = false }: { hidden?: boolean }) {
  return TILES.map((t, i) => (
    <li
      key={i}
      aria-hidden={hidden || undefined}
      data-sfx
      className={`flex shrink-0 items-center gap-3 rounded-[14px] px-[22px] py-3.5 font-display text-lg font-bold whitespace-nowrap transition-transform duration-300 hover:scale-[1.06] hover:-rotate-3 ${
        t.look === "paper"
          ? "bg-paper text-ink"
          : t.look === "game"
            ? "border-2 border-ink bg-[#0f0e0d] font-mono text-[15px] text-bone"
            : "bg-ink text-bone"
      }`}
    >
      {t.look === "game" && <Pad />}
      {t.text.startsWith("[TODO") ? <span className="text-ember-soft">{t.text}</span> : t.text}
      {t.note && (
        <small className={`font-mono text-[11px] font-normal tracking-[0.06em] uppercase ${t.look === "paper" ? "text-[#6b6359]" : "text-fog"}`}>
          {t.note}
        </small>
      )}
    </li>
  ));
}

/** Infinite ticker of personality tiles. Pauses on hover and focus. */
export function Marquee() {
  return (
    <div className="relative z-[2] -my-2.5 -rotate-[1.2deg] overflow-hidden bg-ember py-7">
      <div className="marquee overflow-hidden" aria-label="A few things about me">
        <ul className="marquee-track flex w-max gap-4">
          <Tiles />
          <Tiles hidden />
        </ul>
      </div>
    </div>
  );
}
