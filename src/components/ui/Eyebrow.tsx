/** Small mono label with an ember dash, used above section headings. */
export function Eyebrow({ children, id, className = "mb-7" }: { children: React.ReactNode; id?: string; className?: string }) {
  return (
    <p id={id} className={`label flex items-center gap-2.5 text-fog before:h-0.5 before:w-[22px] before:bg-ember ${className}`}>
      {children}
    </p>
  );
}
