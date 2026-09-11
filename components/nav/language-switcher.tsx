"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ComponentType, type SVGProps } from "react";
import { FlagEn, FlagVi } from "@/components/ui/flags";
import { CheckIcon } from "@/components/ui/icons";
import { localeLabels, locales, type Locale } from "@/lib/locales";

type Props = {
  current: Locale;
  label: string;
  names: Record<Locale, string>;
};

/**
 * One flag per locale. Typed as `Record<Locale, …>`, so adding a locale to
 * `lib/locales.ts` fails the build here until it gets a flag.
 */
const flags: Record<Locale, ComponentType<SVGProps<SVGSVGElement>>> = {
  en: FlagEn,
  vi: FlagVi,
};

/**
 * Client-only because `usePathname()` cannot run in a Server Component.
 * Renders real links rather than a JS-driven <select>, so the alternate locale
 * is crawlable and works before hydration.
 *
 * Plain <a>, deliberately not next/link: switching locale switches the document
 * itself — `<html lang>`, every string, the metadata and the canonical links.
 * A client-side navigation re-renders the root layout on the client, which both
 * leaves those document-level attributes to chance and makes React re-create
 * the inline <script> tags in <head> ("Encountered a script tag while rendering
 * React component"). A full load is the honest thing for a rare action.
 *
 * The disclosure is a native <details>, not a state-driven popover: it opens
 * and closes before the bundle runs, and the summary already carries button
 * semantics and the expanded state without any ARIA of ours. The effect below
 * only adds the two behaviours the element does not give for free — closing on
 * Escape and on a click outside.
 */
export function LanguageSwitcher({ current, label, names }: Props) {
  const pathname = usePathname();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const close = () => {
      if (detailsRef.current) detailsRef.current.open = false;
    };

    const onPointerDown = (event: MouseEvent) => {
      const root = detailsRef.current;
      if (root?.open && !root.contains(event.target as Node)) close();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !detailsRef.current?.open) return;
      close();
      // Escape inside the panel would otherwise leave focus on a hidden link.
      detailsRef.current.querySelector("summary")?.focus();
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const hrefFor = (locale: Locale) => {
    const segments = pathname.split("/");
    // ["", "<locale>", ...rest] — swapping index 1 preserves the rest of the path.
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  };

  const CurrentFlag = flags[current];

  return (
    <details ref={detailsRef} className="relative">
      <summary
        className="inline-flex size-11 cursor-pointer list-none items-center justify-center rounded-control border border-border transition-colors hover:border-border-strong hover:bg-muted [&::-webkit-details-marker]:hidden"
      >
        {/* The hairline keeps the white edge of the Union Jack off a light
            background; without it the flag loses its own outline. */}
        <CurrentFlag className="h-3.5 w-5 shrink-0 rounded-[1px] ring-1 ring-black/10" />
        <span className="sr-only">
          {label}: {names[current]}
        </span>
      </summary>

      {/* A plain list of links, not `role="menu"`: the menu role promises
          arrow-key navigation, and these are ordinary links in tab order. */}
      <ul
        className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-max rounded-card border border-border bg-card p-1"
      >
        {locales.map((locale) => {
          const active = locale === current;
          const Flag = flags[locale];

          return (
            <li key={locale}>
              <a
                href={hrefFor(locale)}
                hrefLang={locale}
                aria-current={active ? "true" : undefined}
                className={`flex min-h-11 items-center gap-3 rounded-control px-3 text-sm whitespace-nowrap transition-colors hover:bg-muted ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <Flag className="h-3.5 w-5 shrink-0 rounded-[1px] ring-1 ring-black/10" />
                {names[locale]}
                <span className="label-mono ml-auto text-muted-foreground">
                  {localeLabels[locale]}
                </span>
                {active ? <CheckIcon className="size-4 shrink-0" /> : null}
              </a>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
