// Stick-figure Jake used by the intro. Classes legB/legF/armT/armB/sweat are
// animated from Intro.tsx; #figBody pivots at the feet when he falls.
export function StickFigure({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 220 320" aria-hidden="true">
      <g id="figBody" className="fig-body">
        <g fill="none" stroke="#efe8de" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
          <path className="legB" d="M150 196 L204 304 L218 304"/>
          <path className="legF" d="M150 196 L116 246 L128 306 L112 306"/>
          <path d="M126 96 L150 196"/>
          <path className="armT" d="M130 112 L66 100 L6 92"/>
          <path className="armB" d="M132 118 L72 124 L6 128"/>
        </g>
        <circle cx="6" cy="92" r="7" fill="#efe8de"/><circle cx="6" cy="128" r="7" fill="#efe8de"/>
        <g transform="translate(116 58) rotate(-14)">
          <circle r="30" fill="#141311" stroke="#efe8de" strokeWidth="4"/>
          <circle cx="-16" cy="-4" r="3.6" fill="#efe8de"/><circle cx="2" cy="-4" r="3.6" fill="#efe8de"/>
          <path className="mouth" d="M-22 12 Q-10 20 2 12" fill="none" stroke="#efe8de" strokeWidth="3" strokeLinecap="round"/>
        </g>
        <g className="sweat" fill="#9fc6ff" opacity="0"><path d="M150 40 q6 10 0 14 q-6 -4 0 -14z"/><path d="M162 62 q5 8 0 11 q-5 -3 0 -11z"/></g>
      </g>
    </svg>
  );
}
