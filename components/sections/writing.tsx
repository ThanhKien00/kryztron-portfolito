import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { Tag, TagList } from "@/components/ui/tag";
import { profile } from "@/content/profile";
import type { Dictionary } from "@/content/types";
import { formatDate } from "@/lib/format";
import type { Locale } from "@/lib/locales";
import { getSubstackPosts } from "@/lib/substack";

/**
 * Newsletter posts, read from the Substack RSS feed at build time.
 *
 * The posts themselves are written in English only, so the vi page shows
 * English titles under a Vietnamese heading. Translating a link to someone
 * else's page would be worse: the reader would arrive at English anyway,
 * having been told otherwise.
 *
 * Renders nothing at all when the feed is unreachable — an empty section with
 * a heading and no posts reads as broken, where an absent one reads as a page
 * that simply does not have that block.
 */
export async function Writing({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const posts = await getSubstackPosts();
  if (posts.length === 0) return null;

  return (
    <Section id="writing" heading={dict.writing.heading} intro={dict.writing.intro}>
      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <Reveal key={post.link} as="li" index={index} className="h-full">
            <Card className="group relative flex h-full flex-col overflow-hidden transition-colors hover:border-border-strong focus-within:border-border-strong">
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  {post.date ? (
                    <time
                      dateTime={post.date}
                      className="text-xs text-muted-foreground"
                    >
                      {formatDate(locale, post.date)}
                    </time>
                  ) : (
                    <span />
                  )}
                  <ArrowUpRightIcon
                    className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                  />
                </div>

                <h3 className="mt-3 text-base leading-[1.35] font-bold text-balance">
                  {/* Stretched link: the whole card is the hit target, but the
                      anchor itself still wraps only the title, so the
                      accessible name is the post title and not the card's
                      entire text content. */}
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="after:absolute after:inset-0"
                  >
                    {post.title}
                    <span className="sr-only"> {dict.writing.opensOnSubstack}</span>
                  </a>
                </h3>

                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
                  {post.summary}
                </p>
              </div>

              {post.tags.length > 0 ? (
                <TagList className="border-t border-border bg-muted/40 p-4">
                  {post.tags.slice(0, 4).map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </TagList>
              ) : null}
            </Card>
          </Reveal>
        ))}
      </ol>

      <div className="mt-8">
        <a
          href={profile.substack}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium underline decoration-1 underline-offset-[6px] transition-[text-decoration-thickness] hover:decoration-2"
        >
          {dict.writing.viewAll}
          <ArrowUpRightIcon className="size-4 shrink-0" />
        </a>
      </div>
    </Section>
  );
}
