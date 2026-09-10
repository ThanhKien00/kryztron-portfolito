export const locales = ["en", "vi"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** BCP 47 tags used for `<html lang>` and Open Graph `locale`. */
export const localeTags: Record<Locale, { html: string; openGraph: string }> = {
  en: { html: "en", openGraph: "en_US" },
  vi: { html: "vi", openGraph: "vi_VN" },
};

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  vi: "VI",
};
