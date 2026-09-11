import Link from "next/link";
import { defaultLocale } from "@/lib/locales";
import { getDictionaryFor } from "./dictionaries";

/**
 * `notFound()` unwinds past the `[lang]` segment, so `next/root-params` is not
 * reliably readable here — fall back to the default locale's copy.
 */
export default async function NotFound() {
  const dict = await getDictionaryFor(defaultLocale);

  return (
    <div className="container-swiss flex min-h-[60vh] flex-col justify-center py-20">
      <p className="label-mono text-accent">404</p>
      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
        {dict.notFound.heading}
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">{dict.notFound.body}</p>
      <Link
        href={`/${defaultLocale}`}
        className="mt-8 inline-flex min-h-11 w-fit items-center rounded-control border border-border-strong px-5 text-sm font-medium transition-colors hover:bg-muted"
      >
        {dict.notFound.back}
      </Link>
    </div>
  );
}
