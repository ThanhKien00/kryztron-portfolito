import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/locales";

/**
 * Next.js 16 renamed Middleware to Proxy. Same behaviour, new file name — this
 * must be `proxy.ts` at the project root, not `middleware.ts`.
 */

/**
 * Minimal Accept-Language negotiation. With exactly two locales this beats
 * pulling in `negotiator` + `@formatjs/intl-localematcher`: parse the header,
 * sort by q-value, take the first tag whose primary subtag we support.
 */
function getLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="))
        ?.slice(2);
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q) : 1 };
    })
    .filter((entry) => entry.tag && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const primary = tag.split("-")[0];
    if ((locales as readonly string[]).includes(primary)) return primary;
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Loop guard: this early return — not the matcher — is what stops an already
  // redirected /en/... from being redirected again.
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${getLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Everything except Next internals, metadata routes, and any path with a
    // file extension (which covers public/ assets such as the CV PDF).
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|opengraph-image|.*\\..*).*)",
  ],
};
