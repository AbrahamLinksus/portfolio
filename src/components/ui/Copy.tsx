import { Fragment } from "react";

const TODO = /(\[TODO[^\]]*\])/g;

/** Renders text, styling any "[TODO: ...]" placeholder as a visible chip. */
export function Copy({ text }: { text: string }) {
  return text.split(TODO).map((part, i) =>
    part.startsWith("[TODO") ? (
      <span key={i} className="todo">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export const isTodo = (s: string) => s.startsWith("[TODO");
