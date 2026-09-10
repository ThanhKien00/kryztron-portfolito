import type { ReactNode } from "react";

/**
 * Hairline-bordered mono chip. Deliberately untinted and logo-free: brand marks
 * and brand hexes would put a fourth, fifth and sixth colour on a page that is
 * budgeted for ground, ink and one accent.
 *
 * `whitespace-nowrap` keeps multi-word technology names ("Spring Boot 3 (Java
 * 21)") from breaking mid-label; the parent flex container wraps instead.
 */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="label-mono inline-flex items-center rounded-swiss border border-border px-2.5 py-1 whitespace-nowrap text-muted-foreground">
      {children}
    </li>
  );
}

export function TagList({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <ul className={`flex flex-wrap gap-1.5 ${className}`}>{children}</ul>;
}
