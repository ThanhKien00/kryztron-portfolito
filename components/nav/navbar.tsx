import Link from "next/link";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/locales";
import { profile } from "@/content/profile";
import { sectionIds } from "@/lib/site";
import { LanguageSwitcher } from "./language-switcher";
import { SiteNav } from "./site-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";

/**
 * Server Component. The three interactive pieces below are client islands, so
 * the header itself ships no JavaScript.
 */
export function Navbar({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const items = sectionIds.map((id) => ({ id, label: dict.nav[id] }));

  return (
    <header
      data-theme-surface
      className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-sm"
    >
      <div className="container-swiss flex h-16 items-center justify-between gap-4">
        <Link
          href={`/${locale}`}
          className="font-display text-base font-semibold tracking-tight"
        >
          {profile.name}
          <span className="sr-only"> — {dict.hero.role}</span>
        </Link>

        <div className="flex items-center gap-3">
          <SiteNav
            items={items}
            menuLabel={dict.nav.menu}
            closeLabel={dict.nav.close}
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
