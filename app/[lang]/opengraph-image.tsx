import { ImageResponse } from "next/og";
import { getDictionaryFor } from "./dictionaries";
import { defaultLocale, isLocale, locales } from "@/lib/locales";
import { profile } from "@/content/profile";

export const alt = "Nguyen Thanh Kien — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

/**
 * Uses the default font bundled with `next/og` (Geist Regular), whose cmap
 * covers the Vietnamese range — so the `vi` copy renders with real diacritics
 * and no font has to be fetched at build time.
 *
 * Image routes cannot read `next/root-params`, so the locale comes from
 * `params` here.
 */
export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionaryFor(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          color: "#fafafa",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#60a5fa",
            }}
          >
            {dict.hero.experienceSummary}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 92,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
            }}
          >
            {profile.name}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 12,
              fontSize: 40,
              color: "#a1a1aa",
            }}
          >
            {dict.hero.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #27272a",
            paddingTop: 28,
            fontSize: 24,
            color: "#a1a1aa",
          }}
        >
          <div style={{ display: "flex", gap: 20 }}>
            {profile.headlineStack.slice(0, 4).map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <div style={{ display: "flex" }}>{dict.hero.location}</div>
        </div>
      </div>
    ),
    size,
  );
}
