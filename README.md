# kryztron-portfolio

Personal portfolio for **Nguyễn Thành Kiên** — Java/Spring backend engineer.
Bilingual (English / Vietnamese), light & dark theme, single-page scroll.

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Motion (Framer Motion) · Resend

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — the site runs without it
npm run dev                  # http://localhost:3000 → redirects to /en or /vi
```

`npm run build` · `npm run lint` · `npx tsc --noEmit`

## Environment variables

None are required to run the site. Without `RESEND_API_KEY` the contact form
degrades gracefully to a `mailto:` link instead of failing.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Server-only. Enables contact-form delivery via [Resend](https://resend.com/api-keys). |
| `CONTACT_TO_EMAIL` | Where submissions are delivered. Defaults to the address in `content/profile.ts`. |
| `CONTACT_FROM_EMAIL` | Verified Resend sender. `onboarding@resend.dev` only delivers to your own account email. |
| `NEXT_PUBLIC_SITE_URL` | Absolute origin, no trailing slash. Drives canonical URLs, hreflang, sitemap and OG images. **Set this in Vercel** or those URLs point at localhost. |

## Editing the content

All CV content lives in `content/`, not in components:

- `content/profile.ts` — locale-invariant data: names, dates, links, technology
  names. Also holds `education.showCpa` (default `false`).
- `content/types.ts` — the `Dictionary` interface. Adding a key here makes both
  translations fail to compile until they are updated, which is the point.
- `content/en.ts`, `content/vi.ts` — translated prose, written as
  `{...} satisfies Dictionary`.

To add a section: add its id to `sectionIds` in `lib/site.ts`, add its copy to
`Dictionary`, create the component in `components/sections/`, and render it in
`app/[lang]/page.tsx`.

## Architecture notes

Things that are easy to break if you don't know they are deliberate:

- **`proxy.ts`, not `middleware.ts`.** Next.js 16 renamed Middleware to Proxy.
  It detects the locale from `Accept-Language` and redirects `/` to `/en` or
  `/vi`. Its matcher excludes any path with a file extension, which is what
  keeps `/NguyenThanhKien_CV.pdf` reachable.
- **`app/[lang]/layout.tsx` is the root layout.** There is no `app/layout.tsx`;
  adding one back gives you two root layouts and a broken build.
- **Locale is read via `next/root-params`**, not prop-drilled. That getter works
  in any Server Component, but *not* in Client Components, Server Actions or
  Route Handlers — which is why the contact form posts a hidden `locale` field
  and `opengraph-image.tsx` reads `params`.
- **Theme is an inline `<head>` script** (`components/theme/theme-script.tsx`)
  that sets `data-theme` before first paint. `globals.css` deliberately has no
  `@media (prefers-color-scheme: dark)` block — the script resolves the OS
  preference once, and a parallel CSS path would override an explicit choice.
- **Tailwind 4 uses `@custom-variant dark`**, not the v3 `darkMode` config key.
- **Motion server-renders `initial` as inline `opacity:0`.** Two fallbacks stop
  that from blanking the page if the bundle never runs: a `<noscript>` style and
  a 4s watchdog that adds `.reveal-fallback`. Keep the `data-reveal` attribute on
  `components/motion/reveal.tsx` if you refactor it.
- **The mobile drawer is portalled to `<body>`.** The header has `backdrop-blur`,
  which makes it a containing block for fixed-position descendants — rendered in
  place, `fixed inset-0` would only cover the 64px header.
- **Fonts request `subsets: ['latin', 'vietnamese']`.** Next.js does not warn on
  a missing subset; it silently falls back and the diacritics break.

## Deploying

Vercel, with `NEXT_PUBLIC_SITE_URL` and the Resend variables set.

`output: 'export'` is **not** an option — static export is incompatible with
`proxy.ts`, and the locale redirect depends on it.
