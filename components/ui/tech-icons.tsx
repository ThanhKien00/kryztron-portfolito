import type { CSSProperties, ReactNode } from "react";
import { brandLogos, type BrandLogoSlug } from "@/components/ui/tech-logos";
import type { SkillGroupKey } from "@/content/profile";

/**
 * Technology marks for the skills section.
 *
 * Two sources, one API: brand logos come from the generated `tech-logos.ts`
 * (simple-icons, filled paths), and everything without a real logo — SQL,
 * architecture styles, Mockito — gets a hand-drawn outline mark in the same
 * Lucide geometry as `icons.tsx`.
 *
 * Every mark renders in `currentColor` and publishes its brand hex as
 * `--tech-brand` / `--tech-brand-dark`, so a parent can tint it on hover
 * without this component knowing anything about the surrounding layout.
 * Outline marks publish `--foreground` instead, which keeps the same hover
 * rule working for them.
 */

const OUTLINE_PROPS = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Outline marks for technologies and concepts that have no brand logo. */
const outlineMarks = {
  code: (
    <>
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
    </>
  ),
  server: (
    <>
      <rect x="2" y="3" width="20" height="8" rx="2" />
      <rect x="2" y="13" width="20" height="8" rx="2" />
      <path d="M6 7h.01M6 17h.01" />
    </>
  ),
  shield: (
    <>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  key: (
    <>
      <path d="M2.59 17.41A2 2 0 0 0 2 18.83V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.17a2 2 0 0 0 1.42-.59l.81-.81a6.5 6.5 0 1 0-4-4z" />
      <path d="M16.5 7.5h.01" />
    </>
  ),
  network: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.59 13.51 6.83 3.98M15.41 6.51 8.59 10.49" />
    </>
  ),
  box: (
    <>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
    </>
  ),
  flask: (
    <>
      <path d="M14 2v6a2 2 0 0 0 .25.96l5.5 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.75-2.96l5.5-10.08A2 2 0 0 0 10 8V2" />
      <path d="M6.45 15h11.1M8.5 2h7" />
    </>
  ),
  layers: (
    <>
      <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m6.08 12.37-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3.5 13.6 9a2 2 0 0 0 1.4 1.4l5.5 1.6-5.5 1.6a2 2 0 0 0-1.4 1.4L12 20.5 10.4 15a2 2 0 0 0-1.4-1.4L3.5 12 9 10.4A2 2 0 0 0 10.4 9Z" />
      <path d="M18.5 3v3M20 4.5h-3" />
    </>
  ),
  braces: (
    <>
      <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2 2 2 0 0 0-2 2v5a2 2 0 0 1-2 2h-1" />
      <path d="M12 8v8" />
    </>
  ),
  monolith: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="1" />
      <path d="M6 8h12M6 14h12" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  orbit: (
    <>
      <circle cx="12" cy="12" r="3" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <path d="M10.4 21.9a10 10 0 0 0 9.94-15.42M13.5 2.1a10 10 0 0 0-9.84 15.42" />
    </>
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </>
  ),
} as const;

type OutlineMarkKey = keyof typeof outlineMarks;
type MarkName = BrandLogoSlug | OutlineMarkKey;

/**
 * Skill label → mark. Keys are the exact strings in `skillGroups`, so a rename
 * there falls back to the neutral `chip` mark instead of rendering nothing.
 */
const skillMarks: Record<string, MarkName> = {
  "Java (21 / 25)": "openjdk",
  SQL: "database",
  "Spring Boot 3 / 4": "springboot",
  "Spring Data JPA": "spring",
  "Spring Security": "springsecurity",
  "Spring Cloud": "spring",
  "Spring WebFlux": "spring",
  "RESTful API": "braces",
  "OAuth 2.0": "key",
  "OpenID Connect": "openid",
  Keycloak: "keycloak",
  PostgreSQL: "postgresql",
  MySQL: "mysql",
  Redis: "redis",
  "Apache Kafka": "apachekafka",
  RabbitMQ: "rabbitmq",
  Docker: "docker",
  Kubernetes: "kubernetes",
  Git: "git",
  "GitLab CI": "gitlab",
  Jenkins: "jenkins",
  JUnit: "junit5",
  Mockito: "flask",
  SonarQube: "sonarqubeserver",
  Monolith: "monolith",
  Microservices: "grid",
  "Three-Layer Architecture": "layers",
  "Claude Code": "claude",
  Antigravity: "orbit",
  "GitHub Copilot": "githubcopilot",
};

/** Header mark per skill group — the visual anchor of each card. */
export const groupMarks: Record<SkillGroupKey, OutlineMarkKey> = {
  languages: "code",
  backend: "server",
  security: "shield",
  storage: "database",
  distributed: "network",
  infrastructure: "box",
  testing: "flask",
  architecture: "layers",
  agentic: "sparkles",
};

function isBrandSlug(name: string): name is BrandLogoSlug {
  return name in brandLogos;
}

function Svg({
  children,
  className,
  style,
  brand,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  brand?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
      {...(brand ? { fill: "currentColor" } : OUTLINE_PROPS)}
    >
      {children}
    </svg>
  );
}

type Props = {
  /** A skill label ("Apache Kafka"), a brand slug, or an outline mark key. */
  name: string;
  className?: string;
};

/**
 * Decorative by default: the adjacent text always names the technology, so a
 * `title` here would only make screen readers announce it twice.
 */
export function TechIcon({ name, className }: Props) {
  const mark = skillMarks[name] ?? (name as MarkName);

  if (isBrandSlug(mark)) {
    const logo = brandLogos[mark];
    return (
      <Svg
        brand
        className={className}
        style={
          {
            "--tech-brand": logo.hex,
            "--tech-brand-dark": logo.hexDark,
          } as CSSProperties
        }
      >
        <path d={logo.path} />
      </Svg>
    );
  }

  const outline = outlineMarks[mark as OutlineMarkKey] ?? outlineMarks.chip;
  return (
    <Svg
      className={className}
      style={
        {
          "--tech-brand": "var(--foreground)",
          "--tech-brand-dark": "var(--foreground)",
        } as CSSProperties
      }
    >
      {outline}
    </Svg>
  );
}
