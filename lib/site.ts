import type { ProjectKey } from "@/content/profile";

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
 * `app/sitemap.ts` indexes locale roots and the work detail pages, never
 * anchors, so it needs no change when this list does.
 */
export const sectionIds = [
  "about",
  "experience",
  "work",
  "writing",
  "contact",
] as const;

export type SectionId = (typeof sectionIds)[number];

/**
 * URL segment for each project's detail page. Kept here rather than in
 * `profile.ts` because it is routing, not CV data — and because `sitemap.ts`
 * and the `/work/[slug]` route both need to enumerate it without pulling in
 * the whole profile.
 */
export const projectSlugs = {
  targetx: "targetx",
  smePortal: "sme-portal",
  autoGrading: "auto-grading",
} as const satisfies Record<ProjectKey, string>;

export type ProjectSlug = (typeof projectSlugs)[ProjectKey];

/** Reverse lookup for the `[slug]` segment. Returns `null` for unknown slugs. */
export function projectKeyFromSlug(slug: string): ProjectKey | null {
  const entry = Object.entries(projectSlugs).find(([, value]) => value === slug);
  return entry ? (entry[0] as ProjectKey) : null;
}
