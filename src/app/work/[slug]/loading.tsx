// Shown while an unknown or not-yet-prerendered slug resolves.
export default function Loading() {
  return (
    <div className="site-wrap pt-[clamp(130px,16vw,190px)] pb-section" aria-busy="true">
      <p className="label text-fog">Loading case study…</p>
    </div>
  );
}
