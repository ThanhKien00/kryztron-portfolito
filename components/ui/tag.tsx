import type { ReactNode } from "react";

/**
 * A technology chip. Filled rather than outlined, and in sentence case rather
 * than the uppercase mono the section labels use — a row of ten uppercase
 * tracked chips reads as a second heading and competes with the one above it.
 */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="inline-flex items-center rounded-chip bg-muted px-2.5 py-1 text-xs whitespace-nowrap text-muted-foreground">
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
