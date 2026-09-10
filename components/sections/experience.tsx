import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
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
  lines: string[];
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
export function Experience({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const entries: Entry[] = [
    ...jobs.map((job) => ({
      key: job.key,
      title: job.company,
      role: dict.experience.items[job.key].title,
      range: formatRange(locale, job.from, job.to, dict.experience.present),
      from: job.from,
      lines: dict.experience.items[job.key].bullets,
      isCurrent: job.to === null,
    })),
    {
      key: "research",
      title: activity.lab,
      role: dict.experience.research.role,
      range: formatRange(locale, activity.from, activity.to, dict.experience.present),
      from: activity.from,
      lines: dict.experience.research.bullets,
      note: { label: dict.experience.research.mentorLabel, value: activity.mentor },
    },
    {
      key: "education",
      title: education.school,
      role: dict.experience.education.role,
      // Year-only on the certificate, so it is not run through `formatRange` —
      // that would invent a month and print "Jan 2020".
      range: `${education.from} — ${education.to}`,
      from: education.from,
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
            <article className="grid gap-4 md:grid-cols-4 md:gap-8">
              <p className="label-mono flex items-center gap-2 text-muted-foreground md:col-span-1">
                {/* The only accent in this section: it marks the one role that
                    is still running, which a date range alone makes you read to
                    find. */}
                {entry.isCurrent ? (
                  <span aria-hidden="true" className="size-1.5 shrink-0 bg-accent" />
                ) : null}
                <time dateTime={entry.from}>{entry.range}</time>
              </p>

              <div className="md:col-span-3">
                <h3 className="font-display text-xl leading-[1.15] font-semibold tracking-tight">
                  {entry.title}
                </h3>
                <p className="mt-1 text-muted-foreground">{entry.role}</p>

                <ul className="mt-4 space-y-2.5">
                  {entry.lines.map((line) => (
                    <li key={line} className="leading-relaxed text-muted-foreground">
                      {line}
                    </li>
                  ))}
                </ul>

                {entry.note ? (
                  <p className="label-mono mt-5 text-muted-foreground">
                    {entry.note.label}{" "}
                    {/* `normal-case`: uppercasing "Phạm Doãn Tĩnh" stacks
                        diacritics over capitals, which is both harder to read
                        and the exact case the heading leading note warns
                        about. */}
                    <span className="text-foreground normal-case">{entry.note.value}</span>
                  </p>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
