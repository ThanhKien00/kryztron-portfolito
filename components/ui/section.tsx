import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { sectionIds, type SectionId } from "@/lib/site";

type Props = {
  id: SectionId;
  heading: string;
  intro?: string;
  /**
   * `stacked` puts the heading in a band above content that spans all twelve
   * columns. Only Selected Work uses it — the covers need the full container
   * width, and it is the one section allowed to be the widest thing on the page.
   */
  layout?: "split" | "stacked";
  children: ReactNode;
};

/**
 * Section shell: mono section number, heading in the left column, content in the
 * right. Collapses to a single column below `md`.
 *
 * The number is read from `sectionIds` rather than passed in, so the heading can
 * never disagree with the number the navbar shows for the same anchor.
 */
export function Section({ id, heading, intro, layout = "split", children }: Props) {
  const number = String(sectionIds.indexOf(id) + 1).padStart(2, "0");

  const header = (
    <Reveal>
      <p className="label-mono text-muted-foreground">{number} /</p>
      <h2 className="mt-3 text-3xl leading-[1.15] font-semibold tracking-tight sm:text-4xl">
        {heading}
      </h2>
      {intro ? (
        <p className={`mt-4 text-muted-foreground ${layout === "stacked" ? "max-w-md" : "text-sm md:max-w-xs"}`}>
          {intro}
        </p>
      ) : null}
    </Reveal>
  );

  return (
    <section id={id} className="scroll-mt-20 border-t border-border">
      <div className="container-swiss py-20 md:py-32">
        {layout === "stacked" ? (
          <>
            <div className="max-w-2xl">{header}</div>
            <div className="mt-14 md:mt-20">{children}</div>
          </>
        ) : (
          <div className="grid gap-10 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-4 lg:col-span-3">{header}</div>
            <div className="md:col-span-8 lg:col-span-8 lg:col-start-5">{children}</div>
          </div>
        )}
      </div>
    </section>
  );
}
