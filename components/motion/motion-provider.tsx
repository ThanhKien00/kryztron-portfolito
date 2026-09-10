"use client";

import { MotionConfig } from "motion/react";
import { useEffect, type ReactNode } from "react";

/**
 * `reducedMotion="user"` makes every motion component below this point respect
 * the OS `prefers-reduced-motion` setting without each one checking it.
 * Server Components passed as `children` stay server-rendered — they are slots,
 * not descendants of the client module graph.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  // Tells the watchdog in ThemeScript that the motion bundle actually ran, so
  // it does not force-reveal content that is about to animate normally.
  useEffect(() => {
    document.documentElement.dataset.motionReady = "1";
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
