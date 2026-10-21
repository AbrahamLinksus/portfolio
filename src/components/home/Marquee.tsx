type Tile = { text: string; note?: string; look?: "paper" };

const TILES: Tile[] = [
  { text: "Coimbatore", note: "home" },
  { text: "LeetCode grinder", note: "regular", look: "paper" },
  { text: "Badminton", note: "racquet in the bag" },
  { text: "Drums", look: "paper" },
  { text: "Bikes", note: "helmet on" },
  { text: "Shows the receipts", note: "p-values included", look: "paper" },
  { text: "SRM IST", note: "class of 27" },
  { text: "Coffee", look: "paper" },
  { text: "RAG tinkerer" },
  { text: "XGBoost > baseline", note: "0.652 AUC", look: "paper" },
  { text: "Local-first", note: "Ollama over API keys" },
  { text: "TDD convert", note: "since Drylogic", look: "paper" },
  { text: "Chennai", note: "for now" },
];

function Tiles({ hidden = false }: { hidden?: boolean }) {
  return TILES.map((t, i) => (
    <li
      key={i}
      aria-hidden={hidden || undefined}
      data-sfx
      className={`flex shrink-0 items-center gap-3 rounded-[14px] px-[22px] py-3.5 font-display text-lg font-bold whitespace-nowrap transition-transform duration-300 hover:scale-[1.06] hover:-rotate-3 ${
        t.look === "paper" ? "bg-paper text-ink" : "bg-ink text-bone"
      }`}
    >
      {t.text}
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
