import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectCovers } from "@/components/projects/covers";
import { Card } from "@/components/ui/card";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@/components/ui/icons";
import { Tag, TagList } from "@/components/ui/tag";
import { projects } from "@/content/profile";
import { isLocale, localeTags, locales, type Locale } from "@/lib/locales";
import { projectKeyFromSlug, projectSlugs, siteUrl } from "@/lib/site";
import { getDictionaryFor } from "../../dictionaries";

/**
 * Six static pages: two locales × three projects. Nothing here is dynamic, so
 * the whole route prerenders at build time.
 */
export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    projects.map((project) => ({ lang, slug: projectSlugs[project.key] })),
  );
}

/**
 * `next/root-params` is not available in `generateMetadata` for a nested
 * dynamic segment, so the locale is read from `params` and validated here the
 * same way the layout validates it.
 */
async function resolve(params: Promise<{ lang: string; slug: string }>) {
  const { lang, slug } = await params;
  const key = projectKeyFromSlug(slug);
  if (!isLocale(lang) || !key) notFound();

  const project = projects.find((entry) => entry.key === key);
  if (!project) notFound();

  const dict = await getDictionaryFor(lang);
  return { locale: lang as Locale, slug, key, project, dict };
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { locale, slug, key, dict } = await resolve(params);
  const item = dict.work.items[key];

  return {
    metadataBase: new URL(siteUrl),
    title: `${item.name} — ${dict.work.heading}`,
    description: item.summary,
    alternates: {
      canonical: `/${locale}/work/${slug}`,
      languages: {
        ...Object.fromEntries(
          locales.map((other) => [other, `/${other}/work/${slug}`]),
        ),
        "x-default": `/en/work/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      url: `/${locale}/work/${slug}`,
      title: item.name,
      description: item.summary,
      locale: localeTags[locale].openGraph,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/[lang]/work/[slug]">) {
  const { locale, key, project, dict } = await resolve(params);
  const item = dict.work.items[key];
  const Cover = projectCovers[key];

  const position = projects.findIndex((entry) => entry.key === key);
  const previous = position > 0 ? projects[position - 1] : null;
  const next = position < projects.length - 1 ? projects[position + 1] : null;

  const facts = [
    { label: dict.work.roleLabel, value: item.role },
    { label: dict.work.clientLabel, value: project.client },
    { label: dict.work.teamLabel, value: project.team },
  ];

  return (
    <article className="container-swiss py-12 md:py-16">
      <Link
        href={`/${locale}#work`}
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4 shrink-0" />
        {dict.work.backLabel}
      </Link>

      <p className="label-mono mt-6 text-muted-foreground">{item.badge}</p>
      <h1 className="mt-3 max-w-3xl text-2xl leading-[1.2] font-bold text-balance sm:text-3xl md:text-4xl">
        {item.name}
      </h1>

      <Card className="mt-8 overflow-hidden">
        <Cover />
      </Card>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <dl className="space-y-4">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="label-mono text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm">{fact.value}</dd>
              </div>
            ))}
            <div>
              <dt className="label-mono text-muted-foreground">
                {dict.work.stackLabel}
              </dt>
              <dd>
                <TagList className="mt-2">
                  {project.stack.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </TagList>
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-8">
          <p className="leading-relaxed text-muted-foreground text-pretty">
            {item.summary}
          </p>

          <h2 className="label-mono mt-10 text-muted-foreground">
            {dict.work.highlightsLabel}
          </h2>
          {/* Ruled rows rather than bullet glyphs: at seven or eight entries a
              marker column adds a second vertical rhythm the rules already
              provide. */}
          <ul className="mt-4">
            {item.highlights.map((highlight) => (
              <li
                key={highlight}
                className="border-t border-border py-3 text-sm leading-relaxed text-muted-foreground"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <nav
        aria-label={dict.work.heading}
        className="mt-14 grid gap-3 border-t border-border pt-8 sm:grid-cols-2"
      >
        {/* `min-w-0` on the link: without it the flex item refuses to shrink
            below its content width and the truncating span never truncates,
            which pushes the page into horizontal scroll at 375px. */}
        {previous ? (
          <Link
            href={`/${locale}/work/${projectSlugs[previous.key]}`}
            className="flex min-h-11 min-w-0 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4 shrink-0" />
            <span className="truncate">
              {dict.work.previousLabel}: {dict.work.items[previous.key].name}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/${locale}/work/${projectSlugs[next.key]}`}
            className="flex min-h-11 min-w-0 items-center justify-start gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:justify-end"
          >
            <span className="truncate">
              {dict.work.nextLabel}: {dict.work.items[next.key].name}
            </span>
            <ArrowRightIcon className="size-4 shrink-0" />
          </Link>
        ) : null}
      </nav>

      <Link
        href={`/${locale}#contact`}
        className="mt-10 inline-flex min-h-11 items-center gap-2 rounded-control border border-border-strong px-5 text-sm font-medium transition-colors hover:bg-muted"
      >
        {dict.contact.heading}
        <ArrowUpRightIcon className="size-4 shrink-0" />
      </Link>
    </article>
  );
}
