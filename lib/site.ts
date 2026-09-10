/**
 * Falls back to localhost so `next build` works before a domain is configured.
 * Set NEXT_PUBLIC_SITE_URL in Vercel for correct canonical/OG absolute URLs.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

/**
 * Page order, nav order and section numbering all read from this one array, so
 * they cannot drift. The keys double as anchor ids and as `Dictionary["nav"]`
 * keys — renaming one here is a compile error until the dictionaries follow.
 *
 * `app/sitemap.ts` indexes locale roots only, never anchors, so it needs no
 * change when this list does.
 */
export const sectionIds = ["about", "experience", "work", "contact"] as const;

export type SectionId = (typeof sectionIds)[number];
