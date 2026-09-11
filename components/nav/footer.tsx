import type { Dictionary } from "@/content/types";
import { profile } from "@/content/profile";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  SubstackIcon,
} from "@/components/ui/icons";

const links = [
  { href: profile.github, Icon: GithubIcon, key: "githubLabel" },
  { href: profile.linkedin, Icon: LinkedinIcon, key: "linkedinLabel" },
  { href: profile.substack, Icon: SubstackIcon, key: null },
  { href: `mailto:${profile.email}`, Icon: MailIcon, key: "emailLabel" },
  { href: `tel:${profile.phoneHref}`, Icon: PhoneIcon, key: "phoneLabel" },
] as const;

/** `mailto:` and `tel:` stay in the same tab; only web links open a new one. */
function isExternal(href: string) {
  return href.startsWith("http");
}

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t border-border">
      <div className="container-swiss flex flex-col items-center gap-5 py-10">
        <ul className="flex items-center gap-1">
          {links.map(({ href, Icon, key }) => (
            <li key={href}>
              <a
                href={href}
                target={isExternal(href) ? "_blank" : undefined}
                rel={isExternal(href) ? "noopener noreferrer" : undefined}
                className="inline-flex size-11 items-center justify-center rounded-control text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Icon className="size-4" />
                <span className="sr-only">
                  {key ? dict.contact[key] : "Substack"}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="text-center text-xs text-muted-foreground">
          <p>
            © {profile.name}. {dict.footer.rights}
          </p>
          <p className="mt-1.5">{dict.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
