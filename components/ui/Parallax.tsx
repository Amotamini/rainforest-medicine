"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** how far (px) the layer travels across its scroll pass; +ve drifts slower */
  distance?: number;
};

/**
 * A slow parallax layer — used behind images and headings to give the page
 * depth, as if you're moving through the forest rather than past a flat wall.
 */
export default function Parallax({ children, className, distance = 80 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
