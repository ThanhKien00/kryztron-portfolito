import type { ElementType, ReactNode } from "react";

type Props = {
  /** `li` inside a list, `article` for a self-contained entry. Default `div`. */
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/**
 * The one card surface on the page: hairline border, the large radius, and a
 * translucent fill so the page-wide dot lattice stays faintly visible through
 * it. Every stat tile, project card, post card, contact channel and the contact
 * form itself go through here, so the surface can never drift between sections.
 *
 * Padding is deliberately *not* baked in — a project card needs a flush cover
 * image at the top edge, a stat tile needs uniform padding. Callers pass it.
 */
export function Card({ as: Component = "div", className = "", children }: Props) {
  return (
    <Component
      className={`rounded-card border border-border bg-card/60 ${className}`}
    >
      {children}
    </Component>
  );
}
