"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type SVGProps,
} from "react";
import { createPortal } from "react-dom";
import {
  BriefcaseIcon,
  CloseIcon,
  FileTextIcon,
  LayersIcon,
  MailIcon,
  MenuIcon,
  UserIcon,
} from "@/components/ui/icons";
import type { SectionId } from "@/lib/site";

type NavItem = { id: SectionId; label: string };

/**
 * One icon per section id. Typed as `Record<SectionId, …>`, so adding a section
 * to `lib/site.ts` fails the build here until it gets an icon.
 */
const navIcons: Record<SectionId, ComponentType<SVGProps<SVGSVGElement>>> = {
  about: UserIcon,
  experience: BriefcaseIcon,
  work: LayersIcon,
  writing: FileTextIcon,
  contact: MailIcon,
};

type Props = {
  items: NavItem[];
  menuLabel: string;
  closeLabel: string;
};

/**
 * Desktop nav + mobile drawer + scrollspy in one client island, so the active
 * section is tracked once rather than in two components.
 */
export function SiteNav({ items, menuLabel, closeLabel }: Props) {
  const [active, setActive] = useState<SectionId | null>(null);
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id as SectionId);
      },
      // Band just below the sticky header: a section is "active" while its top
      // sits in the upper third of the viewport.
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  // Closing anywhere but the trigger itself (Escape, the X, a nav link) would
  // otherwise drop focus to <body> once the close button unmounts — return it
  // to the control that opened the drawer instead.
  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Lock background scroll, trap focus and close on Escape while the drawer is
  // open.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }

      // `role="dialog"` + `aria-modal` promise that the rest of the page is
      // unreachable while this is open; without this, Shift+Tab from the
      // first focusable element falls back into the page hidden behind the
      // overlay, since the drawer is portalled to the end of <body>.
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  // Sans, sentence case, normal tracking: the uppercase mono label this used to
  // carry stacks Vietnamese diacritics on top of capitals ("GIỚI THIỆU") and the
  // 0.16em tracking pulls the words apart. That treatment stays on the eyebrows
  // and the locale codes, where every string is ASCII and two-to-eight glyphs.
  const linkClass = useCallback(
    (id: SectionId) =>
      `inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-medium transition-colors ${
        active === id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      }`,
    [active],
  );

  return (
    <>
      <nav className="hidden md:block" aria-label="Primary">
        <ul className="flex items-center gap-4 lg:gap-5">
          {items.map((item) => {
            const Icon = navIcons[item.id];
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "location" : undefined}
                  className={linkClass(item.id)}
                >
                  {/* Five labels plus five icons plus the social row overflow
                      the 768–1023px band; the icons are decorative, so they
                      are what goes. */}
                  <Icon className="hidden size-4 shrink-0 lg:block" />
                  {/* The underline marks the active section on the word only:
                      WCAG 1.4.1 wants a second channel beside ink weight, and an
                      underline running under the icon reads as a strike. */}
                  <span
                    className={
                      active === item.id ? "underline decoration-1 underline-offset-4" : undefined
                    }
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="inline-flex size-11 cursor-pointer items-center justify-center rounded-control border border-border transition-colors hover:border-border-strong hover:bg-muted md:hidden"
      >
        <MenuIcon className="size-4" />
        <span className="sr-only">{menuLabel}</span>
      </button>

      {/* Portalled to <body>: the header carries `backdrop-blur`, which makes it
          a containing block for fixed-position descendants — rendered in place,
          `fixed inset-0` would only cover the 64px header, not the viewport. */}
      {/* `open` only becomes true from a click, so document always exists by
          then; the typeof check just keeps this safe during SSR. */}
      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={panelRef}
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label={menuLabel}
              className="fixed inset-0 z-50 bg-background md:hidden"
            >
              <div className="container-swiss flex h-16 items-center justify-end">
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={close}
                  className="inline-flex size-11 cursor-pointer items-center justify-center rounded-control border border-border transition-colors hover:border-border-strong hover:bg-muted"
                >
                  <CloseIcon className="size-4" />
                  <span className="sr-only">{closeLabel}</span>
                </button>
              </div>
              <nav className="container-swiss pt-8" aria-label="Mobile">
                <ul className="flex flex-col gap-1">
                  {items.map((item) => {
                    const Icon = navIcons[item.id];
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={close}
                          className="flex min-h-11 items-center gap-3 border-b border-border py-4 text-2xl font-medium"
                        >
                          <Icon className="size-5 shrink-0 text-muted-foreground" />
                          {item.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
