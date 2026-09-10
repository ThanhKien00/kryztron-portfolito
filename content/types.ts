import type {
  CertificationKey,
  JobKey,
  ProjectKey,
  SkillGroupKey,
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
    role: string;
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
    items: Record<
      ProjectKey,
      {
        name: string;
        role: string;
        summary: string;
        highlights: string[];
      }
    >;
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
    /** Two paragraphs — rendered as separate `<p>`s, not one wall of text. */
    lead: string[];
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
}
