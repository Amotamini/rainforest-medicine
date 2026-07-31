"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** seconds of delay before the reveal begins */
  delay?: number;
  /** distance in px the content drifts up from */
  y?: number;
  /** play every time it enters the viewport, not just once */
  repeat?: boolean;
};

/**
 * Content that emerges, slowly, from darkness as it enters the viewport.
 * The pacing is deliberately unhurried — restraint over flash.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  repeat = false,
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: !repeat, margin: "-12% 0px -12% 0px" }}
      transition={{
        duration: 1.15,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
