"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@/components/ui/icons";

/**
 * Floating scroll-to-top control. Appears once the reader is far enough down
 * that the header is a long way back — before that it would only cover content
 * for no gain.
 *
 * Sits outside the normal flow, so it carries its own `aria-label` from the
 * dictionary rather than borrowing a nearby heading.
 */
export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          aria-label={label}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
          }
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-5 bottom-5 z-40 inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-foreground text-background transition-opacity hover:opacity-85"
        >
          <ArrowUpIcon className="size-4" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
