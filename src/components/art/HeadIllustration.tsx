// Hero illustration. Groups with className="pl" carry a data-depth used for
// scroll parallax; "float" groups idle-bob via CSS (see globals.css).
export function HeadIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1000 440"
      role="img"
      aria-label="Stick-figure head with its top popped open, and a bike helmet, badminton racquet, shuttlecock, drum, bicycle, coffee mug, game controller and laptop flying out"
    >
          <defs>
            <pattern id="ht" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="#1c1a18"/><circle cx="3.5" cy="3.5" r="1.3" fill="#efe8de" fillOpacity=".55"/></pattern>
            <pattern id="strings" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#1c1a18"/><path d="M0 4 H8 M4 0 V8" stroke="#efe8de" strokeOpacity=".45" strokeWidth="1"/></pattern>
            <radialGradient id="inGlow"><stop offset="0" stopColor="#ff8a45" stopOpacity=".8"/><stop offset="1" stopColor="#ff6a1a" stopOpacity="0"/></radialGradient>
          </defs>
          <g className="pl" data-depth="0.42">
            <g className="float"><g transform="translate(372 92) rotate(-12) scale(.62)"><path className="s" d="M-110 34 C-112 -40 -50 -78 10 -76 C70 -74 112 -36 110 26 L118 40 L-104 44 Z" fill="url(#ht)"/><path className="s" d="M-108 12 C-60 -4 60 -4 112 8" fill="none" style={{ stroke: "#ff6a1a", strokeWidth: "6" }}/><rect className="s" x="-74" y="-36" width="36" height="13" rx="6.5" fill="#141311" transform="rotate(-22 -56 -30)"/><rect className="s" x="-26" y="-56" width="40" height="13" rx="6.5" fill="#141311"/><rect className="s" x="34" y="-40" width="36" height="13" rx="6.5" fill="#141311" transform="rotate(20 52 -34)"/><path className="s" d="M86 18 L144 30 L112 44 Z" fill="#ff6a1a"/><path className="s" d="M-80 44 L-58 84 L-30 92 M72 42 L52 84 L24 92" fill="none" strokeWidth="2.5"/></g></g>
            <g className="float"><g transform="translate(890 96) scale(.7)"><line className="s" x1="-48" y1="-30" x2="40" y2="34" strokeWidth="7"/><line className="s" x1="44" y1="-30" x2="-42" y2="36" strokeWidth="7"/><circle cx="-50" cy="-32" r="6" fill="#ff6a1a"/><circle cx="46" cy="-32" r="6" fill="#ff6a1a"/></g></g>
            <g className="float"><g transform="translate(512 150) rotate(14)"><path className="s" d="M-80 0 A100 100 0 0 1 80 0 Z" fill="#141311"/><path d="M-60 -24 Q0 -46 60 -24" fill="none" stroke="#efe8de" strokeOpacity=".25" strokeWidth="2" strokeLinecap="round"/></g></g>
          </g>
          <g className="pl" data-depth="0.42"><g fill="none" className="s" style={{ stroke: "#ff6a1a" }}><path d="M262 70 q6 -8 12 0 t12 0"/><path d="M700 40 q6 -8 12 0 t12 0"/><path d="M640 250 q6 -8 12 0 t12 0"/><path d="M110 300 q-4 -9 4 -14 t4 -14"/></g><g fill="#efe8de"><rect x="470" y="40" width="10" height="5" transform="rotate(30 475 42)"/><rect x="960" y="260" width="10" height="5" transform="rotate(-40 965 262)"/><rect x="330" y="300" width="9" height="5" transform="rotate(15 334 302)"/></g></g>
          <g className="pl" data-depth="0.26">
            <g className="float"><g transform="translate(190 150) rotate(-42) scale(.8)"><line className="s" x1="0" y1="54" x2="0" y2="150" strokeWidth="4"/><path className="s" d="M-7 148 L7 148 L9 206 L-9 206 Z" fill="#ff6a1a"/><path className="s" d="M-12 48 L0 66 L12 48" fill="none"/><ellipse className="s" cx="0" cy="0" rx="40" ry="54" fill="url(#strings)" strokeWidth="5"/></g></g>
            <g className="float"><g transform="translate(300 222) rotate(-22) scale(.85)"><path className="s" d="M-16 22 L-34 -46 L34 -46 L16 22 Z" fill="url(#ht)"/><path className="s" d="M-8 22 L-17 -46 M0 22 L0 -46 M8 22 L17 -46" fill="none" strokeWidth="2"/><path className="s" d="M-34 -46 Q-25 -57 -17 -46 Q-8 -57 0 -46 Q8 -57 17 -46 Q25 -57 34 -46" fill="none"/><rect className="s" x="-17" y="20" width="34" height="9" fill="#ff6a1a"/><path className="s" d="M-16 29 A16 16 0 0 0 16 29 Z" fill="#efe8de"/></g></g>
            <g className="float"><g transform="translate(770 200) rotate(10) scale(.8)"><path className="s" d="M-60 0 L-60 50 A60 16 0 0 0 60 50 L60 0" fill="#ff6a1a"/><path d="M-56 16 L-44 52 L-30 20 L-15 58 L0 22 L15 58 L30 20 L44 52 L56 16" fill="none" stroke="#141311" strokeWidth="2.5" strokeLinejoin="round"/><ellipse className="s" cx="0" cy="0" rx="60" ry="16" fill="#efe8de"/><path className="s" d="M-60 50 A60 16 0 0 0 60 50" fill="none"/></g></g>
            <g className="float"><g transform="translate(790 352) rotate(-6) scale(.78)"><circle className="s" cx="-58" cy="20" r="36" fill="url(#ht)"/><circle className="s" cx="58" cy="20" r="36" fill="url(#ht)"/><circle cx="-58" cy="20" r="5" fill="#efe8de"/><circle cx="58" cy="20" r="5" fill="#efe8de"/><path className="s" d="M-58 20 L-12 20 L-28 -24 L36 -24 L-12 20 M36 -24 L58 20 M-28 -24 L-33 -36 M36 -24 L30 -46 L46 -48" fill="none" style={{ stroke: "#ff6a1a", strokeWidth: "5" }}/><path className="s" d="M-46 -38 L-20 -36" fill="none" strokeWidth="6"/><circle className="s" cx="-12" cy="20" r="8" fill="#1c1a18"/></g></g>
          </g>
          <g className="pl" data-depth="0.12">
            <g className="float"><g transform="translate(196 372) rotate(-12) scale(.78)"><path className="s" d="M-60 -18 C-40 -32 40 -32 60 -18 C76 -6 82 36 66 42 C54 46 44 30 34 22 L-34 22 C-44 30 -54 46 -66 42 C-82 36 -76 -6 -60 -18 Z" fill="url(#ht)"/><path className="s" d="M-44 -2 H-22 M-33 -13 V9" fill="none" style={{ stroke: "#ff6a1a", strokeWidth: "5" }}/><circle cx="30" cy="-8" r="6" fill="#ff6a1a"/><circle cx="44" cy="2" r="6" fill="#efe8de"/></g></g>
            <g className="float"><g transform="translate(640 100) rotate(7) scale(.8)"><rect className="s" x="-62" y="-50" width="124" height="72" rx="6" fill="#262320"/><rect x="-52" y="-40" width="104" height="52" fill="#141311"/><rect x="-44" y="-32" width="40" height="5" rx="2" fill="#ff6a1a"/><rect x="-36" y="-21" width="56" height="5" rx="2" fill="#efe8de" fillOpacity=".6"/><rect x="-36" y="-10" width="34" height="5" rx="2" fill="#efe8de" fillOpacity=".6"/><rect x="-44" y="1" width="24" height="5" rx="2" fill="#ff6a1a"/><path className="s" d="M-74 22 L74 22 L86 36 L-86 36 Z" fill="#efe8de"/></g></g>
            <g className="float"><g transform="translate(920 330) rotate(8) scale(.78)"><path className="s" d="M-8 -44 C-14 -54 -2 -60 -8 -72 M8 -44 C2 -54 14 -60 8 -72" fill="none" strokeWidth="2.5"/><path className="s" d="M27 -16 C50 -16 50 16 25 16" fill="none" strokeWidth="6"/><path className="s" d="M-28 -30 L28 -30 L24 30 Q24 36 18 36 L-18 36 Q-24 36 -24 30 Z" fill="#efe8de"/><path d="M-26.5 -4 L26.3 -4 L25.6 8 L-25.6 8 Z" fill="#ff6a1a"/><ellipse className="s" cx="0" cy="-30" rx="28" ry="6" fill="#6b4630"/></g></g>
          </g>
          <g className="pl" data-depth="0.12"><path className="s" d="M372 300 L346 352 M388 310 L362 362 M628 300 L654 352 M612 310 L638 362" fill="none" strokeWidth="2"/></g>
          {/* head: plain stick-figure face, top popped open */}
          <g>
            <line className="s" x1="500" y1="400" x2="500" y2="440" strokeWidth="5"/>
            <path className="s" d="M420 240 A100 100 0 1 0 580 240 Z" fill="#141311" strokeWidth="4.5"/>
            <ellipse className="s" cx="500" cy="240" rx="80" ry="13" fill="#0d0c0b"/>
            <ellipse cx="500" cy="238" rx="62" ry="8" fill="url(#inGlow)"/>
            <circle className="eye" cx="464" cy="298" r="8" fill="#efe8de"/><circle className="eye" cx="536" cy="298" r="8" fill="#efe8de"/>
            <path className="s" d="M458 334 Q500 370 542 334" fill="none" strokeWidth="5"/>
          </g>
        </svg>
  );
}
