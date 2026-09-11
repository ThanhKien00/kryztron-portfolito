import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { sectionIds, type SectionId } from "@/lib/site";

type Props = {
  id: SectionId;
  heading: string;
  intro?: string;
  children: ReactNode;
};

/**
 * Section shell: a mono label with the section number, trailed by a hairline
 * out to the right margin, then full-width content underneath.
 *
 * The number is read from `sectionIds` rather than passed in, so the heading can
 * never disagree with the number the navbar shows for the same anchor.
 */
export function Section({ id, heading, intro, children }: Props) {
  const number = String(sectionIds.indexOf(id) + 1).padStart(2, "0");

  return (
    <section id={id} className="scroll-mt-20">
      <div className="container-swiss py-16 md:py-24">
        <Reveal>
          <div className="flex items-center gap-4">
            <h2 className="label-mono shrink-0 text-muted-foreground">
              {number} / {heading}
            </h2>
            <span aria-hidden="true" className="section-rule" />
          </div>
          {intro ? (
            <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
              {intro}
            </p>
          ) : null}
        </Reveal>
        <div className="mt-10 md:mt-12">{children}</div>
      </div>
    </section>
  );
}

/**
 * The same label + hairline treatment for sub-blocks inside a section (the
 * tech grid inside About, say). Not numbered — only top-level anchors are.
 */
export function SubLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <h3 className="label-mono shrink-0 text-muted-foreground">{children}</h3>
      <span aria-hidden="true" className="section-rule" />
    </div>
  );
}
