import { ContactForm } from "@/components/contact/contact-form";
import { CopyButton } from "@/components/contact/copy-button";
import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import {
  ExternalLinkIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { profile } from "@/content/profile";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/locales";

export function Contact({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const mailtoHref = `mailto:${profile.email}`;

  const links = [
    {
      key: "linkedin",
      icon: LinkedinIcon,
      label: dict.contact.linkedinLabel,
      value: profile.linkedinHandle,
      href: profile.linkedin,
    },
    {
      key: "github",
      icon: GithubIcon,
      label: dict.contact.githubLabel,
      value: profile.githubHandle,
      href: profile.github,
    },
  ];

  return (
    <Section id="contact" heading={dict.contact.heading}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <Reveal>
            {/* A `<p>`, not a heading: the section already has its h2, and a
                second one here would be a heading with nothing under it. */}
            <p className="max-w-md text-2xl leading-[1.2] font-bold text-balance sm:text-3xl">
              {dict.contact.prompt}
            </p>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground text-pretty">
              {dict.contact.lead}
            </p>
          </Reveal>

          <ul className="mt-8 space-y-3">
            <Reveal as="li" index={1}>
              <Card className="flex items-center gap-3 p-3">
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-chip bg-muted text-muted-foreground"
                >
                  <MailIcon className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="label-mono block text-muted-foreground">
                    {dict.contact.emailLabel}
                  </span>
                  {/* Accent #3 and the last one on the page — it sits under
                      the one action the whole page is arguing for. */}
                  {/* `min-h-11`: the address is the page's primary action and
                      has to clear the 44px target size on its own, not lean on
                      the copy button beside it. */}
                  <a
                    href={mailtoHref}
                    className="flex min-h-11 items-center truncate text-sm font-medium underline decoration-accent decoration-1 underline-offset-4 transition-[text-decoration-thickness] hover:decoration-2"
                  >
                    {profile.email}
                  </a>
                </span>
                <CopyButton
                  value={profile.email}
                  label={dict.contact.copyLabel}
                  copiedLabel={dict.contact.copiedLabel}
                />
              </Card>
            </Reveal>

            {links.map(({ key, icon: Icon, label, value, href }, index) => (
              <Reveal key={key} as="li" index={index + 2}>
                <Card className="transition-colors hover:border-border-strong">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3"
                  >
                    <span
                      aria-hidden="true"
                      className="grid size-9 shrink-0 place-items-center rounded-chip bg-muted text-muted-foreground"
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="label-mono block text-muted-foreground">
                        {label}
                      </span>
                      <span className="mt-0.5 block truncate text-sm font-medium">
                        {value}
                      </span>
                    </span>
                    <ExternalLinkIcon className="size-4 shrink-0 text-muted-foreground" />
                  </a>
                </Card>
              </Reveal>
            ))}

            <Reveal as="li" index={4}>
              <a
                href={`tel:${profile.phoneHref}`}
                className="flex min-h-11 items-center gap-3 px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="label-mono">{dict.contact.phoneLabel}</span>
                <span>{profile.phone}</span>
              </a>
            </Reveal>
          </ul>
        </div>

        <Reveal index={1}>
          <Card className="p-5 sm:p-6">
            <ContactForm dict={dict} locale={locale} mailtoHref={mailtoHref} />
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
