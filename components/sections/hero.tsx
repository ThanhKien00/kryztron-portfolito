import { RotatingRole } from "@/components/motion/rotating-role";
import {
  ArrowDownIcon,
  DownloadIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
} from "@/components/ui/icons";
import { profile } from "@/content/profile";
import type { Dictionary } from "@/content/types";

const socialClass =
  "inline-flex size-11 items-center justify-center rounded-control border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground";

/**
 * Centred, and deliberately free of `Reveal`: this is the only thing above the
 * fold, and it has to be on screen at first paint rather than waiting for the
 * motion bundle to decide it may appear.
 *
 * Four type sizes and no more: the mono greeting, the display name, the role
 * and tagline at body scale, and the location line one step below them.
 */
export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="container-swiss flex flex-col items-center py-24 text-center md:py-36">
      <p className="label-mono text-muted-foreground">{dict.hero.greeting}</p>

      {/* `leading-[1.15]` via `.display-hero`: the name carries three stacked
          diacritics and wraps to two lines below ~900px. */}
      <h1 className="display-hero mt-5 text-balance">{profile.name}</h1>

      <RotatingRole roles={dict.hero.roles} />

      <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground text-pretty">
        {dict.hero.tagline}
      </p>

      {/* Filled / outlined separates the primary action from the secondary
          one — as three identical links they all read as the same control. */}
      <div className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
        <a
          href="#work"
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-control bg-foreground px-6 text-base font-medium text-background transition-opacity hover:opacity-85 sm:w-auto"
        >
          {dict.hero.ctaWork}
          <ArrowDownIcon className="size-4 shrink-0" />
        </a>
        <a
          href={profile.cv}
          download
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-control border border-border-strong px-6 text-base font-medium text-foreground transition-colors hover:bg-muted sm:w-auto"
        >
          {dict.hero.ctaCv}
          <DownloadIcon className="size-4 shrink-0" />
        </a>
      </div>

      <ul className="mt-8 flex items-center gap-2">
        <li>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className={socialClass}
          >
            <GithubIcon className="size-4" />
            <span className="sr-only">GitHub</span>
          </a>
        </li>
        <li>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={socialClass}
          >
            <LinkedinIcon className="size-4" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </li>
        <li>
          <a href={`mailto:${profile.email}`} className={socialClass}>
            <MailIcon className="size-4" />
            <span className="sr-only">{dict.contact.emailLabel}</span>
          </a>
        </li>
      </ul>

      <p className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
        <MapPinIcon className="size-4 shrink-0" />
        {dict.hero.location}
      </p>
    </section>
  );
}
