import { Fragment } from "react";

/**
 * Renders `**emphasis**` inside a dictionary string as a full-contrast bold
 * run, leaving the rest of the paragraph muted. That contrast step is what
 * makes a long About paragraph scannable — the technologies and employers pop
 * out of a grey field without needing a separate list.
 *
 * Splitting on the marker and returning React nodes keeps this out of
 * `dangerouslySetInnerHTML` territory: the dictionary can never inject markup.
 */
export function RichText({ children }: { children: string }) {
  // Capturing group, so `split` keeps the delimited runs in the output array at
  // the odd indices.
  const parts = children.split(/\*\*(.+?)\*\*/g);

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className="font-bold text-foreground">
            {part}
          </strong>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}
