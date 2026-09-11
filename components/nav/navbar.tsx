import Link from "next/link";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/locales";
import { profile } from "@/content/profile";
import { sectionIds } from "@/lib/site";
import { LanguageSwitcher } from "./language-switcher";
import { SiteNav } from "./site-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import {
  GithubIcon,
  LinkedinIcon,
  SubstackIcon,
} from "@/components/ui/icons";

const socialClass =
  "inline-flex size-9 items-center justify-center rounded-control text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

/**
 * Server Component. The three interactive pieces below are client islands, so
 * the header itself ships no JavaScript.
 */
export function Navbar({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const items = sectionIds.map((id) => ({ id, label: dict.nav[id] }));

  const socials = [
    { key: "github", href: profile.github, Icon: GithubIcon, label: "GitHub" },
    {
      key: "linkedin",
      href: profile.linkedin,
      Icon: LinkedinIcon,
      label: "LinkedIn",
    },
    {
      key: "substack",
      href: profile.substack,
      Icon: SubstackIcon,
      label: "Substack",
    },
  ];

  return (
    <header
      data-theme-surface
      className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-sm"
    >
      <div className="container-swiss flex h-16 items-center justify-between gap-4">
        {/* A shell prompt rather than the full name: the name is the first
            thing in the hero one scroll away, and repeating it in the header
            at the same weight makes two competing titles. */}
        <Link
          href={`/${locale}`}
          className="inline-flex min-h-11 items-center text-base font-bold"
        >
          <span aria-hidden="true" className="text-muted-foreground">
            ~/
          </span>
          kien
          <span className="sr-only">
            {profile.name} — {dict.hero.role}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <SiteNav
            items={items}
            menuLabel={dict.nav.menu}
            closeLabel={dict.nav.close}
          />

          <ul className="hidden items-center gap-1 lg:flex">
            {socials.map(({ key, href, Icon, label }) => (
              <li key={key}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialClass}
                >
                  <Icon className="size-4" />
                  <span className="sr-only">{label}</span>
                </a>
              </li>
            ))}
          </ul>

          <span
            aria-hidden="true"
            className="hidden h-5 w-px bg-border md:block"
          />

          <LanguageSwitcher
            current={locale}
            label={dict.language.label}
            names={{ en: dict.language.en, vi: dict.language.vi }}
          />
          <ThemeToggle
            labelToLight={dict.theme.toLight}
            labelToDark={dict.theme.toDark}
          />
        </div>
      </div>
    </header>
  );
}
