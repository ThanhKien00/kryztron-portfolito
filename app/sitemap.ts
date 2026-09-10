import type { MetadataRoute } from "next";
import { locales } from "@/lib/locales";
import { siteUrl } from "@/lib/site";

/**
 * Lives at the `app/` root (not under `[lang]`) — metadata file conventions are
 * resolved from there. Entries point at the prefixed URLs; `/` only issues a
 * redirect, so listing it would waste crawl budget.
 *
 * Note this `alternates.languages` is the sitemap's own `<xhtml:link>`
 * mechanism, separate from the `<link rel="alternate">` tags emitted by
 * `generateMetadata` — both exist and must be kept in sync by hand.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${siteUrl}/${locale}`]),
  );

  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    changeFrequency: "monthly",
    priority: locale === "en" ? 1 : 0.9,
    alternates: { languages },
  }));
}
