"use client";

import { useCallback, useEffect, useLayoutEffect } from "react";
import { MoonIcon, SunIcon } from "@/components/ui/icons";
import { THEME_STORAGE_KEY } from "./theme-script";

type Props = {
  labelToLight: string;
  labelToDark: string;
};

function apply(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
}

function stored(): "light" | "dark" | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

/**
 * Which icon and label are shown is decided entirely by CSS keyed off the same
 * `data-theme` attribute the inline script sets — no React state mirrors the
 * theme, so there is nothing to mismatch during hydration.
 */
export function ThemeToggle({ labelToLight, labelToDark }: Props) {
  // Strict Mode remounts once in dev and resets <html> to the attributes React
  // manages from JSX, clearing what the inline script set. Re-apply before
  // paint. No-op in production.
  useLayoutEffect(() => {
    const theme =
      stored() ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    apply(theme);
  }, []);

  // Follow the OS while the user has not made an explicit choice.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      if (stored() === null) apply(event.matches ? "dark" : "light");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    const current =
      document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private browsing / storage disabled — the toggle still works for this
      // page view, it just will not persist.
    }
    apply(next);
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      // 44px: WCAG 2.2 AA only asks for 24, but every header control is a
      // one-handed mobile target, and 44 still leaves 10px of air in the h-16 bar.
      className="inline-flex size-11 cursor-pointer items-center justify-center rounded-control border border-border text-foreground transition-colors hover:border-border-strong hover:bg-muted"
    >
      <MoonIcon className="size-4 dark:hidden" />
      <SunIcon className="hidden size-4 dark:block" />
      <span className="sr-only dark:hidden">{labelToDark}</span>
      <span className="sr-only hidden dark:inline">{labelToLight}</span>
    </button>
  );
}
