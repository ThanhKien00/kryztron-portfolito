import type { ReactNode } from "react";

/**
 * Shared drawing primitives for the project covers.
 *
 * Why these are React components and not `.svg` files under `public/`: the site
 * switches theme with a `data-theme` attribute on `<html>`, not with
 * `prefers-color-scheme`. An SVG referenced from `<img>` or `next/image` is a
 * separate document — it cannot see that attribute, and a `prefers-color-scheme`
 * block inside the file would desync the moment someone uses the theme toggle,
 * shipping a cover that is invisible in one theme. Inlined, the same markup
 * inherits `currentColor` and the `--accent` custom property from the page, so
 * one drawing is correct in both themes with no duplicated palette.
 *
 * Every cover is 800×500 (16:10). The `viewBox` gives the element an intrinsic
 * aspect ratio, so `w-full h-auto` reserves its own height and the covers cost
 * nothing in CLS.
 */

/**
 * Ink levels. Everything structural is `currentColor` at one of these opacities
 * so the drawings need no colour of their own — they inherit `--foreground` and
 * flip with the theme. The accent is reserved for the one idea each diagram is
 * actually about.
 */
export const INK_STRONG = 0.82;
export const INK = 0.55;
export const INK_SOFT = 0.28;
export const INK_FAINT = 0.13;

const MONO = "var(--font-plex-mono), ui-monospace, monospace";

type LabelProps = {
  x: number;
  y: number;
  children: string;
  size?: number;
  opacity?: number;
  anchor?: "start" | "middle" | "end";
  tracking?: string;
};

export function Label({
  x,
  y,
  children,
  size = 12,
  opacity = INK,
  anchor = "start",
  tracking = "0.1em",
}: LabelProps) {
  return (
    <text
      x={x}
      y={y}
      fill="currentColor"
      fillOpacity={opacity}
      fontFamily={MONO}
      fontSize={size}
      letterSpacing={tracking}
      textAnchor={anchor}
    >
      {children}
    </text>
  );
}

/** Hairline-stroked box. `rx={2}` matches `--radius-swiss` at cover scale. */
export function Box({
  x,
  y,
  w,
  h,
  label,
  sub,
  size = 12,
  opacity = INK,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
  sub?: string;
  size?: number;
  opacity?: number;
}) {
  const cx = x + w / 2;
  // With a sub-label the pair is centred as a block; alone, the label centres
  // on the box's optical middle (+4px for cap height).
  const labelY = sub ? y + h / 2 - 2 : y + h / 2 + 4;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={2}
        fill="none"
        stroke="currentColor"
        strokeOpacity={opacity}
      />
      {label ? (
        <Label x={cx} y={labelY} size={size} opacity={INK_STRONG} anchor="middle">
          {label}
        </Label>
      ) : null}
      {sub ? (
        <Label x={cx} y={y + h / 2 + 14} size={10} opacity={INK_SOFT} anchor="middle">
          {sub}
        </Label>
      ) : null}
    </g>
  );
}

/**
 * Datastore drum: an open-topped body plus a full ellipse for the lid, so the
 * back edge of the lid stays visible the way it does in a real system diagram.
 */
export function Cylinder({
  x,
  y,
  w,
  h,
  label,
  size = 11,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  size?: number;
}) {
  const rx = w / 2;
  const ry = Math.max(6, w * 0.07);

  return (
    <g>
      <path
        d={`M${x} ${y} v${h} a${rx} ${ry} 0 0 0 ${w} 0 V${y}`}
        fill="none"
        stroke="currentColor"
        strokeOpacity={INK}
      />
      <ellipse
        cx={x + rx}
        cy={y}
        rx={rx}
        ry={ry}
        fill="none"
        stroke="currentColor"
        strokeOpacity={INK}
      />
      <Label x={x + rx} y={y + h / 2 + 8} size={size} opacity={INK_STRONG} anchor="middle">
        {label}
      </Label>
    </g>
  );
}

/**
 * Arrowheads are drawn as paths rather than `<marker>` elements: three covers on
 * one page would otherwise need three copies of the same marker `id`, and
 * duplicate ids in a document are invalid regardless of whether they render.
 */
export function Arrow({
  x1,
  y1,
  x2,
  y2,
  opacity = INK,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity?: number;
}) {
  const head = x2 >= x1 ? -7 : 7;

  return (
    <g stroke="currentColor" strokeOpacity={opacity} fill="none">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <path d={`M${x2 + head} ${y2 - 4} L${x2} ${y2} L${x2 + head} ${y2 + 4}`} />
    </g>
  );
}

/**
 * Shared plate: mono project key and the rule that separates the header from
 * the drawing.
 *
 * `aria-hidden`: the diagram restates the stack and the summary that sit
 * directly beside it in real text, so announcing it again would only make the
 * row longer to listen to. It is content for sighted readers and redundant for
 * assistive tech — the case WCAG 1.1.1 calls decorative.
 */
export function Cover({ name, children }: { name: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 800 500"
      className="block h-auto w-full text-foreground"
      strokeWidth={1}
      aria-hidden="true"
      focusable="false"
    >
      <Label x={40} y={54} size={21} opacity={INK_STRONG} tracking="0.14em">
        {name}
      </Label>
      <line
        x1={40}
        y1={74}
        x2={760}
        y2={74}
        stroke="currentColor"
        strokeOpacity={INK_FAINT}
      />
      {children}
    </svg>
  );
}
