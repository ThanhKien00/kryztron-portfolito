import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { Tag, TagList } from "@/components/ui/tag";
import { activity, education, jobs } from "@/content/profile";
import type { Dictionary } from "@/content/types";
import { formatRange } from "@/lib/format";
import type { Locale } from "@/lib/locales";

type Entry = {
  key: string;
  /** Organisation name — a proper noun, so it comes from `profile.ts`. */
  title: string;
  role: string;
  range: string;
  /** Machine-readable start, for `<time dateTime>`. */
  from: string;
  /** Two letters standing in for a company logo tile. */
  monogram: string;
  lines: string[];
  stack?: readonly string[];
  /** Kept as two fields so the value escapes `.label-mono`'s uppercasing. */
  note?: { label: string; value: string };
  isCurrent?: boolean;
};

/**
 * Experience absorbed the former Education section. A degree and a research
 * post are the same kind of thing as a job — a dated position at a named
 * institution — so they are two more rows on this timeline rather than a
 * seventh section repeating the layout with different nouns.
 *
 * Rows are ordered by start date, newest first: the three jobs, then the lab
 * (2022-10), then the degree (2020).
 */
export function Experience({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const entries: Entry[] = [
    ...jobs.map((job) => ({
      key: job.key,
      title: job.company,
      role: dict.experience.items[job.key].title,
      range: formatRange(locale, job.from, job.to, dict.experience.present),
      from: job.from,
      monogram: job.monogram,
      lines: dict.experience.items[job.key].bullets,
      stack: job.stack,
      isCurrent: job.to === null,
    })),
    {
      key: "research",
      title: activity.lab,
      role: dict.experience.research.role,
      range: formatRange(
        locale,
        activity.from,
        activity.to,
        dict.experience.present,
      ),
      from: activity.from,
      monogram: "MP",
      lines: dict.experience.research.bullets,
      note: {
        label: dict.experience.research.mentorLabel,
        value: activity.mentor,
      },
    },
    {
      key: "education",
      title: education.school,
      role: dict.experience.education.role,
      // Year-only on the certificate, so it is not run through `formatRange` —
      // that would invent a month and print "Jan 2020".
      range: `${education.from} — ${education.to}`,
      from: education.from,
      monogram: education.schoolShort.slice(0, 2),
      lines: [
        dict.experience.education.detail,
        ...(education.showCpa
          ? [`${dict.experience.education.cpaLabel} ${education.cpa}`]
          : []),
      ],
    },
  ];

  return (
    <Section id="experience" heading={dict.experience.heading}>
      <ol>
        {entries.map((entry, index) => (
          <Reveal
            key={entry.key}
            as="li"
            index={index}
            className="border-t border-border py-8 first:border-t-0 first:pt-0"
          >
            <article className="flex flex-col gap-4 md:flex-row md:gap-6">
              <p className="label-mono shrink-0 pt-3 text-muted-foreground md:w-40">
                <time dateTime={entry.from}>{entry.range}</time>
              </p>

              <div className="flex gap-4">
                {/* No logo files are bundled; a two-letter mark in the page's
                    own face is more consistent than three foreign brand marks
                    would be. Decorative — the company name sits beside it. */}
                <span
                  aria-hidden="true"
                  className="label-mono grid size-11 shrink-0 place-items-center self-start rounded-chip border border-border bg-card text-muted-foreground"
                >
                  {entry.monogram}
                </span>

                <div className="min-w-0">
                  <h3 className="flex items-center gap-2 text-lg leading-[1.3] font-bold">
                    {entry.title}
                    {/* The only accent in this section: it marks the one role
                        that is still running, which a date range alone makes
                        you read to find. */}
                    {entry.isCurrent ? (
                      <span
                        aria-hidden="true"
                        className="size-1.5 shrink-0 rounded-full bg-accent"
                      />
                    ) : null}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {entry.role} · {dict.hero.location}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {entry.lines.map((line) => (
                      <li
                        key={line}
                        className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span aria-hidden="true" className="select-none">
                          ·
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>

                  {entry.stack ? (
                    <TagList className="mt-4">
                      {entry.stack.map((item) => (
                        <Tag key={item}>{item}</Tag>
                      ))}
                    </TagList>
                  ) : null}

                  {entry.note ? (
                    <p className="label-mono mt-4 text-muted-foreground">
                      {entry.note.label}{" "}
                      {/* `normal-case`: uppercasing "Phạm Doãn Tĩnh" stacks
                          diacritics over capitals, which is both harder to
                          read and the exact case the heading leading note
                          warns about. */}
                      <span className="text-foreground normal-case">
                        {entry.note.value}
                      </span>
                    </p>
                  ) : null}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
