import type { SVGProps } from "react";

/**
 * Flag marks for the language switcher — the one place on the page that carries
 * colour of its own rather than `currentColor`, because a flag drawn in ink is
 * not a flag. Both are 30×20 so the two sit at the same optical weight; the
 * Union Jack's real 2:1 ratio would make it read wider than Vietnam's beside it.
 *
 * `aria-hidden`: the locale code and the visually hidden language name next to
 * each mark already name the link, and a flag is a poor name for a language.
 */

type FlagProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: FlagProps) {
  return (
    <svg viewBox="0 0 30 20" aria-hidden="true" focusable="false" {...props}>
      {children}
    </svg>
  );
}

export function FlagEn(props: FlagProps) {
  return (
    <Base {...props}>
      <rect width="30" height="20" fill="#012169" />
      {/* Saltire: white first, then the red stripe on top of it. */}
      <path d="M0 0 L30 20 M30 0 L0 20" stroke="#ffffff" strokeWidth="4.5" />
      <path d="M0 0 L30 20 M30 0 L0 20" stroke="#C8102E" strokeWidth="2" />
      {/* Cross of St George, drawn last so it covers the saltire. */}
      <path d="M15 0 V20 M0 10 H30" stroke="#ffffff" strokeWidth="7" />
      <path d="M15 0 V20 M0 10 H30" stroke="#C8102E" strokeWidth="4" />
    </Base>
  );
}

export function FlagVi(props: FlagProps) {
  return (
    <Base {...props}>
      <rect width="30" height="20" fill="#DA251D" />
      <path
        d="M15 3.8 L16.39 8.08 L20.9 8.08 L17.25 10.73 L18.64 15.02 L15 12.37 L11.36 15.02 L12.75 10.73 L9.1 8.08 L13.61 8.08 Z"
        fill="#FFFF00"
      />
    </Base>
  );
}
