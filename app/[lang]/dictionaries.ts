import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/locales";
import type { Dictionary } from "@/content/types";

/**
 * Dictionaries are dynamically imported so only the requested locale is pulled
 * into the server render. No `import 'server-only'` needed — importing
 * `next/root-params` already fails at build time inside a Client Component.
 */
const dictionaries = {
  en: () => import("@/content/en").then((m) => m.default as Dictionary),
  vi: () => import("@/content/vi").then((m) => m.default as Dictionary),
} satisfies Record<Locale, () => Promise<Dictionary>>;

/** Resolves the locale from the root `[lang]` segment — no prop drilling. */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!value || !isLocale(value)) notFound();
  return value;
}

export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()]();
}

/** For call sites that already know the locale (Server Actions, sitemap). */
export async function getDictionaryFor(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
