import type { Locale } from "./locales";

/**
 * Formats a "YYYY-MM" string as a month + year.
 *
 * English uses the abbreviated month name ("Jul 2023"). Vietnamese uses
 * numeric `MM/YYYY` — `Intl` renders vi-VN short months as "thg 7", which
 * uppercases to "THG 7 2023" in the mono label style and wraps onto two lines.
 *
 * Fixed input, no `Date.now()`, so the output is stable in prerendered HTML.
 */
export function formatMonth(locale: Locale, value: string): string {
  const [year, month] = value.split("-").map(Number);

  if (locale === "vi") {
    return `${String(month ?? 1).padStart(2, "0")}/${year}`;
  }

  const date = new Date(Date.UTC(year, (month ?? 1) - 1, 1));
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatRange(
  locale: Locale,
  from: string,
  to: string | null,
  presentLabel: string,
): string {
  return `${formatMonth(locale, from)} — ${to ? formatMonth(locale, to) : presentLabel}`;
}
