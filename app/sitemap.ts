import type { MetadataRoute } from "next";
import { projects } from "@/content/profile";
import { locales } from "@/lib/locales";
import { projectSlugs, siteUrl } from "@/lib/site";

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
  const homeLanguages = Object.fromEntries(
    locales.map((locale) => [locale, `${siteUrl}/${locale}`]),
  );

  const home: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    changeFrequency: "monthly",
    priority: locale === "en" ? 1 : 0.9,
    alternates: { languages: homeLanguages },
  }));

  const work: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    projects.map((project) => {
      const slug = projectSlugs[project.key];
      return {
        url: `${siteUrl}/${locale}/work/${slug}`,
        changeFrequency: "yearly" as const,
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((other) => [other, `${siteUrl}/${other}/work/${slug}`]),
          ),
        },
      };
    }),
  );

  return [...home, ...work];
}
