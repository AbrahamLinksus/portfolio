/** Big page title with an ember full stop and a short intro line. */
export function PageHead({ title, accent = ".", children }: { title: string; accent?: string; children: React.ReactNode }) {
  return (
    <div className="mb-16 grid items-end gap-8 md:grid-cols-[1fr_auto]">
      <h1 className="font-display text-[clamp(54px,9vw,140px)] leading-none font-bold tracking-[-0.05em]">
        {title}
        <em className="font-serif text-[1.1em] font-normal text-ember">{accent}</em>
      </h1>
      <div className="max-w-[38ch] text-fog">{children}</div>
    </div>
  );
}
