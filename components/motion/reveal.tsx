"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Stagger index — each step delays the reveal by 70ms. */
  index?: number;
  className?: string;
  as?: "div" | "li" | "section";
};

/**
 * Scroll reveal wrapper. Only `opacity` and `transform` are animated — animating
 * width/height/top would force layout on every frame.
 *
 * Sections stay Server Components: they are passed in as `children`, so only
 * this thin wrapper ships to the client. `MotionConfig reducedMotion="user"` in
 * the layout suppresses the transform when the user asks for reduced motion.
 *
 * This is the page's only motion spec — opacity 0→1 plus a 20px rise over
 * 500ms, staggered 70ms, once. Nothing else on the page animates on scroll, and
 * the hero deliberately does not use this wrapper at all: above-the-fold
 * content has to be there on first paint.
 */
export function Reveal({ children, index = 0, className, as = "div" }: Props) {
  const Component = motion[as];

  return (
    <Component
      // Hook for the no-JS / failed-bundle fallbacks in globals.css. Motion
      // server-renders `initial` as inline `opacity:0`, so without those rules
      // the whole page would be blank if this module never runs.
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -80px 0px" }}
      transition={{
        duration: 0.5,
        // Capped so a long list never ends up waiting a second to appear.
        delay: Math.min(index, 6) * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Component>
  );
}
