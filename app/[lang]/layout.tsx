import type { Metadata } from "next";
import { lang } from "next/root-params";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary, getLocale } from "./dictionaries";
import { isLocale, locales, localeTags } from "@/lib/locales";
import { siteUrl } from "@/lib/site";
import { profile } from "@/content/profile";
import { ThemeScript } from "@/components/theme/theme-script";
import { MotionProvider } from "@/components/motion/motion-provider";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import "../globals.css";

// Both families ship a `vietnamese` subset (verified against
// next/dist/compiled/@next/font/dist/google/font-data.json) — without it the
// diacritics in the vi copy would silently fall back to a system font.
//
// One grotesque carries both the display line and the body copy: the size and
// weight steps do the separating, which is the Swiss way and is also two fewer
// families to download. Archivo keeps its diacritics inside the cap height at
// display sizes, where a tighter face would collide them with the line above.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

// IBM Plex Mono is not a variable font, so the weights are explicit. Only the
// two the labels and tags actually use are requested.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin", "vietnamese"],
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
      className={`${archivo.variable} ${plexMono.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="sr-only rounded-swiss focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          {dict.nav.skipToContent}
        </a>
        <MotionProvider>
          <Navbar dict={dict} locale={locale} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer dict={dict} />
        </MotionProvider>
      </body>
    </html>
  );
}
