import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { certifications, profile, skillGroups } from "@/content/profile";
import type { Dictionary } from "@/content/types";

/**
 * About absorbed the former Skills section. The stack is what a studio site
 * would call services, so it belongs here as a definition list — one row per
 * group, technologies as plain text.
 *
 * The five `coreStack` logo tiles that used to head Skills are gone. They named
 * the same five technologies the groups below already name, so they added no
 * information; what they did add was a second box system, a second radius, and
 * five brand hexes on hover, on a page budgeted for ground, ink and one accent.
 * The project covers carry the visual interest instead.
 */
export function About({ dict }: { dict: Dictionary }) {
  return (
    <Section id="about" heading={dict.about.heading}>
      <Reveal>
        <div className="grid max-w-2xl gap-8 sm:grid-cols-[11rem_1fr] sm:gap-10">
          {/* `object-top` keeps the head in frame while the 4:5 box crops the
              portrait's lower third. */}
          <Image
            src={profile.avatar}
            alt={dict.about.portraitAlt}
            width={profile.avatarWidth}
            height={profile.avatarHeight}
            sizes="(min-width: 640px) 11rem, 100vw"
            className="aspect-4/5 w-40 rounded-swiss border border-border object-cover object-top sm:w-full"
          />
          <div className="space-y-5 text-lg leading-relaxed text-pretty">
            {dict.about.lead.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal index={1}>
        <h3 className="label-mono mt-16 text-muted-foreground">
          {dict.about.goalsHeading}
        </h3>
        <ol className="mt-4 max-w-2xl">
          {dict.about.goals.map((goal, index) => (
            <li key={goal} className="flex gap-6 border-t border-border py-4">
              <span className="label-mono shrink-0 pt-1 text-muted-foreground tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="leading-relaxed">{goal}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal index={2}>
        <h3 className="label-mono mt-16 text-muted-foreground">
          {dict.about.toolsHeading}
        </h3>
        {/* `sm:grid-cols-[10rem_1fr]` on each row rather than one tall grid: a
            single grid would stretch every label column to the longest
            Vietnamese group name ("Kiểm thử & chất lượng") across all nine
            rows. */}
        <dl className="mt-4">
          {skillGroups.map((group) => (
            <div
              key={group.key}
              className="grid gap-x-8 gap-y-1 border-t border-border py-4 sm:grid-cols-[10rem_1fr]"
            >
              <dt className="label-mono pt-1 text-muted-foreground">
                {dict.about.groups[group.key]}
              </dt>
              <dd className="leading-relaxed">{group.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className="mt-16 grid gap-10 sm:grid-cols-2">
        <Reveal index={3}>
          <h3 className="label-mono text-muted-foreground">
            {dict.about.practiceHeading}
          </h3>
          <ul className="mt-4 space-y-3">
            {dict.about.practice.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal index={4}>
          <h3 className="label-mono text-muted-foreground">
            {dict.about.languagesHeading}
          </h3>
          <ul className="mt-4">
            {certifications.map((cert) => (
              <li
                key={cert.key}
                className="flex items-baseline justify-between gap-4 border-t border-border py-3 text-sm"
              >
                <span>{dict.about.certifications[cert.key]}</span>
                <span className="label-mono shrink-0 text-muted-foreground tabular-nums">
                  {cert.score}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            {dict.about.languagesNote}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
