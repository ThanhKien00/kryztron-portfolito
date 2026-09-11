import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import {
  AwardIcon,
  CalendarIcon,
  CodeIcon,
  LayersIcon,
} from "@/components/ui/icons";
import { RichText } from "@/components/ui/rich-text";
import { Section, SubLabel } from "@/components/ui/section";
import { TechIcon } from "@/components/ui/tech-icons";
import {
  allSkills,
  certifications,
  profile,
  stats,
  type StatIcon,
} from "@/content/profile";
import type { Dictionary } from "@/content/types";

/** One mark per stat tile. Keyed off `profile.stats[].icon`. */
const statIcons: Record<StatIcon, typeof CalendarIcon> = {
  calendar: CalendarIcon,
  layers: LayersIcon,
  code: CodeIcon,
  award: AwardIcon,
};

/**
 * About absorbed the former Skills section, and now carries three blocks in
 * one anchor: the prose, the figures, and the tech grid.
 *
 * The prose runs muted with `**marked**` runs pulled up to full contrast — the
 * technologies and domains have to be findable in a skim, and pulling them out
 * into yet another list would say the same thing twice.
 */
export function About({ dict }: { dict: Dictionary }) {
  return (
    <Section id="about" heading={dict.about.heading}>
      <Reveal>
        <div className="grid gap-8 sm:grid-cols-[11rem_1fr] sm:gap-10">
          {/* `object-top` keeps the head in frame while the 4:5 box crops the
              portrait's lower third. */}
          <Image
            src={profile.avatar}
            alt={dict.about.portraitAlt}
            width={profile.avatarWidth}
            height={profile.avatarHeight}
            sizes="(min-width: 640px) 11rem, 100vw"
            className="aspect-4/5 w-40 rounded-card border border-border object-cover object-top sm:w-full"
          />
          <div className="space-y-5 leading-relaxed text-muted-foreground text-pretty">
            {dict.about.lead.map((paragraph) => (
              <p key={paragraph}>
                <RichText>{paragraph}</RichText>
              </p>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal index={1}>
        <h3 className="sr-only">{dict.about.statsHeading}</h3>
        <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((stat) => {
            const Icon = statIcons[stat.icon];
            return (
              <Card as="li" key={stat.key} className="p-4">
                <Icon className="size-4 text-muted-foreground" />
                <p className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="text-2xl font-bold tabular-nums">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {dict.about.stats[stat.key]}
                  </span>
                </p>
              </Card>
            );
          })}
        </ul>
      </Reveal>

      <Reveal index={2}>
        <div className="mt-14">
          <SubLabel>{dict.about.toolsHeading}</SubLabel>
          {/* Chips rather than the old label/value definition list: thirty
              technologies in nine prose rows read as a wall, and the brand
              marks give the eye somewhere to land. Each mark is decorative —
              the name next to it is the accessible content. */}
          <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            {allSkills.map((skill) => (
              <li
                key={skill}
                className="flex items-center justify-center gap-2 rounded-chip bg-muted px-3 py-2.5 text-center text-xs text-muted-foreground"
              >
                <TechIcon name={skill} className="size-4 shrink-0" />
                <span className="truncate">{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        <Reveal index={3}>
          <Card className="h-full p-5">
            <SubLabel>{dict.about.goalsHeading}</SubLabel>
            <ol className="mt-4 space-y-3">
              {dict.about.goals.map((goal, index) => (
                <li key={goal} className="flex gap-4">
                  <span className="label-mono shrink-0 pt-0.5 text-muted-foreground tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {goal}
                  </p>
                </li>
              ))}
            </ol>
          </Card>
        </Reveal>

        <Reveal index={4}>
          <Card className="h-full p-5">
            <SubLabel>{dict.about.practiceHeading}</SubLabel>
            <ul className="mt-4 space-y-3">
              {dict.about.practice.map((item) => (
                <li
                  key={item}
                  className="text-sm leading-relaxed text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>

        <Reveal index={5}>
          <Card className="h-full p-5">
            <SubLabel>{dict.about.languagesHeading}</SubLabel>
            <ul className="mt-4">
              {certifications.map((cert) => (
                <li
                  key={cert.key}
                  className="flex items-baseline justify-between gap-4 border-b border-border py-2.5 text-sm last:border-b-0"
                >
                  <span>{dict.about.certifications[cert.key]}</span>
                  <span className="label-mono shrink-0 text-muted-foreground tabular-nums">
                    {cert.score}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {dict.about.languagesNote}
            </p>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
