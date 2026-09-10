import { Reveal } from "@/components/motion/reveal";
import { projectCovers } from "@/components/projects/covers";
import { Section } from "@/components/ui/section";
import { Tag, TagList } from "@/components/ui/tag";
import { projects } from "@/content/profile";
import type { Dictionary } from "@/content/types";

/**
 * Selected work: full-width alternating rows, not a card grid. The lead project
 * takes the whole twelve columns for its cover; the two behind it alternate
 * sides so the eye zig-zags down the page instead of scanning a table.
 *
 * The rows are not links. Every one of these is an internal enterprise system
 * with no public URL and no case-study page, so a hover-scale and a "→" would
 * be an affordance pointing at nothing. The covers therefore sit still, and the
 * detail that would have lived behind a click is on the page already.
 */
export function Work({ dict }: { dict: Dictionary }) {
  return (
    <Section
      id="work"
      heading={dict.work.heading}
      intro={dict.work.intro}
      layout="stacked"
    >
      <ol>
        {projects.map((project, index) => {
          const item = dict.work.items[project.key];
          const ProjectCover = projectCovers[project.key];
          const isLead = index === 0;
          const coverRight = index % 2 === 1;

          const meta = [
            [dict.work.roleLabel, item.role],
            [dict.work.clientLabel, project.client],
            [dict.work.teamLabel, project.team],
          ];

          return (
            <Reveal
              key={project.key}
              as="li"
              index={index}
              className="border-t border-border py-16 first:border-t-0 first:pt-0 md:py-24"
            >
              <article>
                <div className="grid gap-8 md:grid-cols-12 md:items-center md:gap-10">
                  {/* `overflow-hidden` clips the cover to the one small radius
                      the page uses; the drawing itself already fits. */}
                  <div
                    className={`overflow-hidden rounded-swiss border border-border bg-card ${
                      isLead ? "md:col-span-12" : "md:col-span-7"
                    } ${coverRight ? "md:order-2" : ""}`}
                  >
                    <ProjectCover />
                  </div>

                  <div className={isLead ? "md:col-span-9" : "md:col-span-5"}>
                    <h3 className="text-2xl leading-[1.15] font-semibold tracking-tight text-balance md:text-3xl">
                      {item.name}
                    </h3>
                  </div>
                </div>

                <div className="mt-12 grid gap-10 md:grid-cols-12">
                  <div className="md:col-span-4">
                    <dl className="space-y-4">
                      {meta.map(([label, value]) => (
                        <div key={label}>
                          <dt className="label-mono text-muted-foreground">{label}</dt>
                          <dd className="mt-1 text-sm">{value}</dd>
                        </div>
                      ))}
                    </dl>

                    <h4 className="label-mono mt-8 text-muted-foreground">
                      {dict.work.stackLabel}
                    </h4>
                    <TagList className="mt-3">
                      {project.stack.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                    </TagList>
                  </div>

                  <div className="md:col-span-7 md:col-start-6">
                    <p className="leading-relaxed text-muted-foreground text-pretty">
                      {item.summary}
                    </p>

                    <h4 className="label-mono mt-10 text-muted-foreground">
                      {dict.work.highlightsLabel}
                    </h4>
                    {/* Ruled rows rather than bullet glyphs: at seven items a
                        marker column is just noise down the left edge. */}
                    <ul className="mt-2">
                      {item.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="border-t border-border py-3 leading-relaxed"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
