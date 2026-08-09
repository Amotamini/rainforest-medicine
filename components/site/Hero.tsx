"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Photo from "@/components/ui/Photo";
import { hero, site } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

/** A few slow embers drifting up through the dark. */
function Embers() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  const seeds = [
    { left: "12%", delay: 0, dur: 11, size: 3 },
    { left: "27%", delay: 3.5, dur: 13, size: 2 },
    { left: "44%", delay: 1.5, dur: 10, size: 2.5 },
    { left: "63%", delay: 5, dur: 14, size: 2 },
    { left: "78%", delay: 2.2, dur: 12, size: 3 },
    { left: "89%", delay: 6.2, dur: 15, size: 2 },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {seeds.map((s, i) => (
        <span
          key={i}
          className="absolute bottom-[-10px] rounded-full bg-[rgb(var(--on-image-gold-bright)/0.7)] blur-[0.5px] animate-smoke"
          style={{
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden"
    >
      {/* graded canopy, parallaxed and slowly pushing in */}
      <motion.div
        style={reduce ? undefined : { y: bgY, scale: bgScale }}
        className="absolute inset-0 -z-10"
      >
        <Photo
          name="rainforest-banner"
          fill
          priority
          sizes="100vw"
          position="center"
          className="object-cover"
        />
      </motion.div>

      {/* Scrims — pull the canopy into night and seat the type.
          These stay dark in both palettes: see the --hero-* block in globals.css.
          Only the last stop of the vertical gradient uses the page ground token,
          so the bottom edge dissolves into the page whichever palette is on. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(115%_85%_at_50%_34%,var(--hero-veil-1)_0%,var(--hero-veil-2)_50%,var(--hero-veil-3)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--hero-scrim-top)] via-[var(--hero-scrim-mid)] to-night"
      />
      {/* a unifying deep-green wash so the canopy reads as night, not noon */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[var(--hero-wash)] mix-blend-multiply"
      />
      {/* a low candle-glow rising from the bottom edge */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-[radial-gradient(60%_100%_at_50%_120%,var(--on-image-ember),transparent_70%)]"
      />

      <Embers />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentFade }}
        className="relative mx-auto max-w-4xl px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
          className="eyebrow justify-center text-[rgb(var(--on-image-gold)/0.9)]"
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          className="mt-7 font-display text-[3.1rem] font-light leading-[0.95] text-[rgb(var(--on-image))] sm:text-7xl lg:text-[5.7rem]"
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.6, delay: 0.5, ease: EASE }}
          >
            Rainforest Medicine
          </motion.span>
          <motion.span
            className="mt-1 block italic font-light text-[rgb(var(--on-image-gold-bright))]"
            initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.6, delay: 0.72, ease: EASE }}
          >
            Gatherings
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.0, ease: EASE }}
          className="mx-auto mt-8 max-w-xl text-pretty font-body text-base font-light leading-relaxed text-[rgb(var(--on-image)/0.8)] sm:text-lg"
        >
          {hero.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.15, ease: EASE }}
          className="mx-auto mt-6 max-w-xl text-pretty font-body text-sm font-light uppercase tracking-wide text-[rgb(var(--on-image-gold)/0.85)]"
        >
          {hero.nextLabel} · {hero.nextLine}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.25, ease: EASE }}
          className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7"
        >
          <a
            href={hero.ctaHref}
            className="group relative inline-flex items-center gap-3 rounded-full border border-[rgb(var(--on-image-gold)/0.5)] bg-[var(--hero-cta-bg)] px-8 py-3.5 font-body text-sm uppercase tracking-wide text-[rgb(var(--on-image-gold))] backdrop-blur-sm transition-all duration-500 hover:border-[rgb(var(--on-image-gold))] hover:bg-[rgb(var(--on-image-gold)/0.1)] hover:text-[rgb(var(--on-image-gold-bright))]"
          >
            {hero.cta}
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="mt-6 font-body text-xs uppercase tracking-wide text-[rgb(var(--on-image)/0.45)]"
        >
          {site.location}
        </motion.p>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="font-body text-[0.62rem] uppercase tracking-eyebrow text-[rgb(var(--on-image)/0.4)]">
          Enter
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-[rgb(var(--on-image)/0.15)]">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-[rgb(var(--on-image-gold))]"
            animate={{ y: ["-100%", "300%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
