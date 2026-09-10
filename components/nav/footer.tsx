import type { Dictionary } from "@/content/types";
import { profile } from "@/content/profile";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/ui/icons";

const links = [
  { href: profile.github, Icon: GithubIcon, key: "githubLabel" },
  { href: profile.linkedin, Icon: LinkedinIcon, key: "linkedinLabel" },
  { href: `mailto:${profile.email}`, Icon: MailIcon, key: "emailLabel" },
] as const;

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t border-border">
      <div className="container-swiss flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="label-mono text-muted-foreground">
          <p>
            © {profile.name}. {dict.footer.rights}
          </p>
          <p className="mt-1 normal-case tracking-normal">{dict.footer.builtWith}</p>
        </div>

        <ul className="flex items-center gap-2">
          {links.map(({ href, Icon, key }) => (
            <li key={href}>
              <a
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
                className="inline-flex size-11 items-center justify-center rounded-swiss border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
              >
                <Icon className="size-4" />
                <span className="sr-only">{dict.contact[key]}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
