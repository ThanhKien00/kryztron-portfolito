"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const HOLD_MS = 2800;

/**
 * Cycles the role line under the hero name.
 *
 * Two things keep this from hurting:
 *
 * - The wrapper reserves its height (`min-h-[1.6em]`) and the animated span is
 *   absolutely positioned, so swapping a short title for a long one never
 *   reflows the tagline below it. No CLS.
 * - `useReducedMotion()` short-circuits the whole thing to a static
 *   `roles[0]` — a line of text that rewrites itself every 2.8s is exactly the
 *   kind of motion that setting exists to stop.
 *
 * The server render is also `roles[0]`, so first paint and hydration agree.
 */
export function RotatingRole({ roles }: { roles: string[] }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || roles.length < 2) return;
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % roles.length),
      HOLD_MS,
    );
    return () => clearInterval(timer);
  }, [reduced, roles.length]);

  const label = (
    <>
      <span aria-hidden="true" className="text-muted-foreground">
        &gt;{" "}
      </span>
      {roles[index]}
    </>
  );

  if (reduced) {
    return (
      <p className="mt-4 text-lg font-medium sm:text-xl">
        <span aria-hidden="true" className="text-muted-foreground">
          &gt;{" "}
        </span>
        {roles[0]}
      </p>
    );
  }

  return (
    // `aria-live="off"`: the cycling text is decorative flourish on a name that
    // is already announced by the h1. Announcing a new job title every 2.8s
    // would be noise, not information.
    <p
      aria-live="off"
      className="relative mt-4 flex min-h-[1.6em] items-center justify-center text-lg font-medium sm:text-xl"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={roles[index]}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="absolute whitespace-nowrap"
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </p>
  );
}
