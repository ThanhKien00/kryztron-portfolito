import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { getDictionary, getLocale } from "./dictionaries";

/**
 * Four anchored sections, in the order `lib/site.ts` declares them: the CV
 * reading order — who, then track record, then the work itself. Skills was
 * folded into About and Education into Experience — the same content, two fewer
 * places to scroll past.
 */
export default async function Page() {
  // Locale comes from the root `[lang]` segment via next/root-params — no props
  // are threaded down from the layout.
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <>
      <Hero dict={dict} />
      <About dict={dict} />
      <Experience dict={dict} locale={locale} />
      <Work dict={dict} />
      <Contact dict={dict} locale={locale} />
    </>
  );
}
