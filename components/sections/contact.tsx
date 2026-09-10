import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { profile } from "@/content/profile";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/locales";

export function Contact({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const mailtoHref = `mailto:${profile.email}`;

  const channels = [
    { label: dict.contact.phoneLabel, value: profile.phone, href: `tel:${profile.phoneHref}`, external: false },
    { label: dict.contact.githubLabel, value: profile.githubHandle, href: profile.github, external: true },
    { label: dict.contact.linkedinLabel, value: profile.linkedinHandle, href: profile.linkedin, external: true },
  ];

  return (
    <Section id="contact" heading={dict.contact.heading}>
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <Reveal>
            {/* A `<p>`, not a heading: the section already has its h2, and a
                second one here would be a heading with nothing under it. */}
            <p className="max-w-md text-2xl leading-[1.2] font-display font-semibold tracking-tight text-balance sm:text-3xl">
              {dict.contact.prompt}
            </p>

            {/* Accent #3 and the last one on the page — it sits under the one
                action the whole page is arguing for. */}
            <a
              href={mailtoHref}
              className="mt-8 inline-flex min-h-11 items-center text-lg break-all underline decoration-accent decoration-1 underline-offset-[6px] transition-[text-decoration-thickness] hover:decoration-2 sm:text-xl"
            >
              {profile.email}
            </a>

            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground text-pretty">
              {dict.contact.lead}
            </p>
          </Reveal>

          <ul className="mt-10">
            {channels.map(({ label, value, href, external }, index) => (
              <Reveal key={label} index={index + 1} as="li">
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer noopener" : undefined}
                  className="flex min-h-11 items-center gap-4 border-t border-border py-3 transition-colors hover:text-foreground"
                >
                  {/* w-28, not w-20: "ĐIỆN THOẠI" wraps to two lines at the
                      narrower width. */}
                  <span className="label-mono w-28 shrink-0 text-muted-foreground">
                    {label}
                  </span>
                  <span className="truncate text-sm">{value}</span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal index={1}>
          <ContactForm dict={dict} locale={locale} mailtoHref={mailtoHref} />
        </Reveal>
      </div>
    </Section>
  );
}
