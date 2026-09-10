import { ArrowDownIcon, DownloadIcon, MapPinIcon } from "@/components/ui/icons";
import { profile } from "@/content/profile";
import type { Dictionary } from "@/content/types";

/**
 * Deliberately free of `Reveal` and of any client boundary: this is the only
 * thing above the fold, and it has to be on screen at first paint rather than
 * waiting for the motion bundle to decide it may appear.
 *
 * Four type sizes and no more: the mono eyebrow, the display name, the tagline
 * and the buttons at body size, and the location line one step below them.
 */
export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="container-swiss grid gap-10 py-24 md:grid-cols-12 md:py-36">
      <div className="md:col-span-10 lg:col-span-9">
        <p className="label-mono text-muted-foreground">
          {dict.hero.experienceSummary}
        </p>

        {/* `leading-[1.15]` via `.display-hero`: the name carries three stacked
            diacritics and wraps to two lines below ~1100px. */}
        <h1 className="display-hero mt-6 font-semibold text-balance">{profile.name}</h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
          {dict.hero.tagline}
        </p>

        {/* Two actions and one fact used to sit in a single row as three
            identical underlined-or-muted strings, so the primary action, the
            secondary action and a static location all read as the same control.
            Filled / outlined / plain text now separates the three, and the
            location moves to its own line because it is not clickable. */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="#work"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-swiss bg-foreground px-6 text-base font-medium text-background transition-opacity hover:opacity-85"
          >
            {dict.hero.ctaWork}
            <ArrowDownIcon className="size-4 shrink-0" />
          </a>
          <a
            href={profile.cv}
            download
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-swiss border border-border-strong px-6 text-base font-medium text-foreground transition-colors hover:bg-muted"
          >
            {dict.hero.ctaCv}
            <DownloadIcon className="size-4 shrink-0" />
          </a>
        </div>

        <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPinIcon className="size-4 shrink-0" />
          {dict.hero.location}
        </p>
      </div>
    </section>
  );
}
