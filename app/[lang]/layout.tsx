import type { Metadata } from "next";
import { lang } from "next/root-params";
import { JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary, getLocale } from "./dictionaries";
import { isLocale, locales, localeTags } from "@/lib/locales";
import { siteUrl } from "@/lib/site";
import { profile } from "@/content/profile";
import { ThemeScript } from "@/components/theme/theme-script";
import { MotionProvider } from "@/components/motion/motion-provider";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import { BackToTop } from "@/components/ui/back-to-top";
import "../globals.css";

// The whole page is set in one monospace face — display, body and label alike.
// JetBrains Mono ships a `vietnamese` subset (U+1EA0-1EF9, U+0102-0103,
// U+01A0-01A1 …), so "Nguyễn Thành Kiên" renders in-face instead of silently
// falling back to a system font for the accented glyphs.
//
// Not a variable font, so the weights are explicit: 400 body, 500 emphasis,
// 700 the hero and card titles.
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  weight: ["400", "500", "700"],
  subsets: ["latin", "latin-ext", "vietnamese"],
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary();

  return {
    metadataBase: new URL(siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    applicationName: profile.nameLatin,
    authors: [{ name: profile.nameLatin, url: profile.github }],
    creator: profile.nameLatin,
    keywords: [
      "Java",
      "Spring Boot",
      "Backend Engineer",
      "Microservices",
      "Kafka",
      "PostgreSQL",
      profile.nameLatin,
      profile.name,
    ],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        vi: "/vi",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "profile",
      url: `/${locale}`,
      siteName: profile.nameLatin,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: localeTags[locale].openGraph,
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => localeTags[l].openGraph),
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await lang();
  if (!locale || !isLocale(locale)) notFound();

  const dict = await getDictionary();

  return (
    <html
      lang={localeTags[locale].html}
      data-theme="light"
      suppressHydrationWarning
      className={jetbrains.variable}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        {/* The page-wide dot lattice. Fixed and behind everything, so it does
            not scroll with the content and every card can sit half-transparent
            on top of it. Purely decorative. */}
        <div
          aria-hidden="true"
          className="dot-grid pointer-events-none fixed inset-0 -z-10"
        />
        <a
          href="#main"
          className="sr-only rounded-control focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          {dict.nav.skipToContent}
        </a>
        <MotionProvider>
          <Navbar dict={dict} locale={locale} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer dict={dict} />
          <BackToTop label={dict.backToTop} />
        </MotionProvider>
      </body>
    </html>
  );
}
