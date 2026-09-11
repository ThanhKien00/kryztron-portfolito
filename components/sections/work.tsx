import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { projectCovers } from "@/components/projects/covers";
import { Card } from "@/components/ui/card";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { Tag, TagList } from "@/components/ui/tag";
import { projects } from "@/content/profile";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/locales";
import { projectSlugs } from "@/lib/site";

/** Chips shown on the card. The rest are on the detail page. */
const STACK_PREVIEW = 4;

/**
 * Three equal cards rather than the full-width zig-zag this section used to
 * be. The grid makes the three systems comparable at a glance; the seven or
 * eight highlights each one carries move to `/work/[slug]`, where there is
 * room for them to be read rather than skimmed past.
 */
export function Work({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <Section id="work" heading={dict.work.heading} intro={dict.work.intro}>
      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => {
          const item = dict.work.items[project.key];
          const Cover = projectCovers[project.key];
          const href = `/${locale}/work/${projectSlugs[project.key]}`;

          return (
            <Reveal key={project.key} as="li" index={index} className="h-full">
              <Card className="flex h-full flex-col overflow-hidden">
                <div className="relative border-b border-border">
                  <Cover />
                  <span className="absolute top-3 left-3 rounded-chip border border-border bg-card px-2 py-1 text-[0.6875rem] text-muted-foreground">
                    {item.badge}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base leading-[1.35] font-bold text-balance">
                    {item.name}
                  </h3>
                  <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
                    {item.summary}
                  </p>

                  <TagList className="mt-4">
                    {project.stack.slice(0, STACK_PREVIEW).map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                    {project.stack.length > STACK_PREVIEW ? (
                      <Tag>+{project.stack.length - STACK_PREVIEW}</Tag>
                    ) : null}
                  </TagList>

                  {/* `mt-auto` on the wrapper pins the action to the card
                      floor, so three cards with different summary lengths
                      still line their buttons up. */}
                  <div className="mt-auto pt-5">
                    <Link
                      href={href}
                      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-control border border-border text-sm font-medium transition-colors hover:bg-muted"
                    >
                      {dict.work.exploreLabel}
                      <ArrowUpRightIcon className="size-4 shrink-0" />
                      <span className="sr-only">— {item.name}</span>
                    </Link>
                  </div>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
