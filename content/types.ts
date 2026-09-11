import type {
  CertificationKey,
  JobKey,
  ProjectKey,
  SkillGroupKey,
  StatKey,
} from "./profile";
import type { SectionId } from "@/lib/site";

/**
 * The single source of truth for translatable copy. Both `en.ts` and `vi.ts`
 * are written as `{...} satisfies Dictionary`, so a key missing from either one
 * is a compile-time error naming the exact property — which two independently
 * imported JSON files would not give us.
 */
export interface Dictionary {
  meta: {
    title: string;
    description: string;
    ogAlt: string;
  };

  /**
   * `Record<SectionId, string>` rather than a hand-written list: the navbar maps
   * `sectionIds` straight through `dict.nav[id]`, so adding or renaming a
   * section in `lib/site.ts` fails the build here until both locales follow.
   */
  nav: Record<SectionId, string> & {
    menu: string;
    close: string;
    skipToContent: string;
  };

  hero: {
    /** Mono eyebrow above the name. Also reused by the OG image route. */
    experienceSummary: string;
    /** Small greeting directly above the name — "Hi, I'm". */
    greeting: string;
    role: string;
    /**
     * Cycled one at a time under the name. `roles[0]` is what a
     * reduced-motion reader (and the server render) sees, so put the most
     * accurate title first.
     */
    roles: string[];
    tagline: string;
    location: string;
    ctaWork: string;
    ctaCv: string;
  };

  /** Selected work — the page's main character. */
  work: {
    heading: string;
    intro: string;
    roleLabel: string;
    clientLabel: string;
    teamLabel: string;
    stackLabel: string;
    highlightsLabel: string;
    periodLabel: string;
    /** Card footer link into the detail page. */
    exploreLabel: string;
    /** Detail page's link back to the grid. */
    backLabel: string;
    nextLabel: string;
    previousLabel: string;
    items: Record<
      ProjectKey,
      {
        name: string;
        /** Overlay chip on the cover — the project's domain in one word. */
        badge: string;
        role: string;
        summary: string;
        highlights: string[];
      }
    >;
  };

  /** Newsletter posts pulled from Substack at build time. */
  writing: {
    heading: string;
    intro: string;
    viewAll: string;
    /** Appended to each card's accessible name — "(opens on Substack)". */
    opensOnSubstack: string;
  };

  /**
   * About absorbed the former standalone Skills section: `groups`, `practice`
   * and the language certifications are the "services and tools" block the
   * section budget allows, rather than a section of their own.
   */
  about: {
    heading: string;
    /** Alternative text for the portrait beside the lead paragraphs. */
    portraitAlt: string;
    /**
     * Two paragraphs — rendered as separate `<p>`s, not one wall of text.
     * `**double asterisks**` mark the runs that render bold and full-contrast
     * against the otherwise muted paragraph; see `components/ui/rich-text.tsx`.
     */
    lead: string[];
    statsHeading: string;
    /** Caption under each figure in the stats row. Values live in `profile.ts`. */
    stats: Record<StatKey, string>;
    goalsHeading: string;
    goals: string[];
    toolsHeading: string;
    groups: Record<SkillGroupKey, string>;
    practiceHeading: string;
    practice: string[];
    languagesHeading: string;
    certifications: Record<CertificationKey, string>;
    languagesNote: string;
  };

  /**
   * Experience absorbed the former standalone Education section: the degree and
   * the lab are two more entries on the same timeline, ordered by start date.
   */
  experience: {
    heading: string;
    present: string;
    items: Record<JobKey, { title: string; bullets: string[] }>;
    /** Entry title comes from `profile.activity.lab` — a proper noun. */
    research: { role: string; bullets: string[]; mentorLabel: string };
    /** Entry title comes from `profile.education.school` — a proper noun. */
    education: { role: string; detail: string; cpaLabel: string };
  };

  contact: {
    heading: string;
    /** Large closing line above the email address. */
    prompt: string;
    lead: string;
    emailLabel: string;
    phoneLabel: string;
    githubLabel: string;
    linkedinLabel: string;
    /** Accessible name and confirmation for the copy-email button. */
    copyLabel: string;
    copiedLabel: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      required: string;
    };
    status: {
      success: string;
      error: string;
      unconfigured: string;
      unconfiguredAction: string;
      invalidName: string;
      invalidEmail: string;
      invalidMessage: string;
      messageTooLong: string;
    };
  };

  theme: {
    label: string;
    toLight: string;
    toDark: string;
  };

  language: {
    label: string;
    en: string;
    vi: string;
  };

  footer: {
    rights: string;
    builtWith: string;
  };

  notFound: {
    heading: string;
    body: string;
    back: string;
  };

  /** Accessible name for the floating scroll-to-top control. */
  backToTop: string;
}
