"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nav, site } from "@/lib/content";
import ThemeToggle from "./ThemeToggle";

/** Height of the fixed header, in px. Matches `scroll-padding-top` in globals.css. */
const HEADER_OFFSET = 80;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while the index is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // escape closes it
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /**
   * Anchor jumps are done by hand rather than left to the browser.
   * While the index is open the body carries `overflow: hidden`, so at the
   * instant of the click there is nothing for a native `#hash` jump to scroll
   * into and the browser clamps it away. So the lock is released first, and
   * only then do we scroll, offsetting by the height of the fixed header.
   *
   * All of this is deliberately synchronous. An earlier version deferred the
   * scroll into `requestAnimationFrame`, which meant that any time rAF was
   * starved — a background tab, low-power mode, a throttled renderer — the
   * click did nothing at all and failed silently. Clearing the inline style
   * takes effect immediately, and `scrollTo` forces its own layout, so there
   * is nothing to wait for.
   */
  const jumpTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = document.querySelector(href);
    if (!target) return; // let the browser have it rather than swallow the click

    e.preventDefault();
    document.body.style.overflow = "";

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: Math.max(top, 0), behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", href);

    setOpen(false);
  };

  /**
   * Until it is scrolled, the header floats over the hero photograph, which is
   * dark in both palettes. Its own colours would vanish there in daylight, so
   * it borrows the on-image colours until it has a background of its own.
   */
  const seated = scrolled || open;
  const tone = {
    logo: seated ? "text-cream" : "text-[rgb(var(--on-image))]",
    logoSub: seated
      ? "text-gold/70 group-hover:text-gold"
      : "text-[rgb(var(--on-image-gold)/0.7)] group-hover:text-[rgb(var(--on-image-gold))]",
    pill: seated
      ? "border-gold/40 text-gold hover:border-gold hover:bg-gold/10 hover:text-gold-bright"
      : "border-[rgb(var(--on-image-gold)/0.4)] text-[rgb(var(--on-image-gold))] hover:border-[rgb(var(--on-image-gold))] hover:bg-[rgb(var(--on-image-gold)/0.1)] hover:text-[rgb(var(--on-image-gold-bright))]",
    menu: seated
      ? "border-gold/25 text-cream/80 hover:border-gold/60 hover:text-cream"
      : "border-[rgb(var(--on-image-gold)/0.25)] text-[rgb(var(--on-image)/0.8)] hover:border-[rgb(var(--on-image-gold)/0.6)] hover:text-[rgb(var(--on-image))]",
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-700 ${
        seated
          ? "border-b border-gold/10 bg-night/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#top"
          onClick={(e) => jumpTo(e, "#top")}
          className="group flex flex-col leading-none"
          aria-label={`${site.name} — home`}
        >
          <span
            className={`font-display text-lg font-medium tracking-wide transition-colors duration-700 sm:text-xl ${tone.logo}`}
          >
            Rainforest Medicine
          </span>
          <span
            className={`eyebrow mt-1 text-[0.58rem] transition-colors duration-700 ${tone.logoSub}`}
          >
            Gatherings
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* TEMPORARY — palette chooser. Remove with the theme block. */}
          <ThemeToggle tone={seated ? "theme" : "onImage"} />

          <a
            href="#upcoming"
            onClick={(e) => jumpTo(e, "#upcoming")}
            className={`hidden rounded-full border px-5 py-2 font-body text-[0.78rem] uppercase tracking-wide transition-all duration-500 sm:inline-block ${tone.pill}`}
          >
            Reserve
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close the contents" : "Open the contents"}
            aria-expanded={open}
            aria-controls="site-index"
            className={`flex items-center gap-2.5 rounded-full border py-2 pl-4 pr-3 font-body text-[0.78rem] uppercase tracking-wide transition-all duration-500 ${tone.menu}`}
          >
            <span className="hidden sm:inline">{open ? "Close" : "Contents"}</span>
            <span className="relative block h-3.5 w-5" aria-hidden>
              <span
                className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ${
                  open ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-px w-full bg-current transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ${
                  open ? "bottom-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-index"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-gold/10 bg-night/95 backdrop-blur-md"
          >
            <div className="mx-auto max-h-[calc(100vh-5rem)] max-w-7xl overflow-y-auto px-5 py-8 sm:px-8 sm:py-10">
              <p className="eyebrow">On this page</p>

              <ol className="mt-6 grid gap-x-10 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
                {nav.map((item, i) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => jumpTo(e, item.href)}
                      className="group flex items-baseline gap-4 border-b border-gold/10 py-3.5 transition-colors duration-500 hover:border-gold/40"
                    >
                      <span className="font-body text-[0.7rem] tabular-nums text-gold/50 transition-colors group-hover:text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-display text-xl font-light leading-snug text-cream/90 transition-colors group-hover:text-gold-bright">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block text-pretty font-body text-[0.78rem] font-light leading-relaxed text-cream/50">
                          {item.hint}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#upcoming"
                  onClick={(e) => jumpTo(e, "#upcoming")}
                  className="inline-block rounded-full bg-gold px-6 py-2.5 font-body text-sm font-medium uppercase tracking-wide text-night-900 transition-colors duration-500 hover:bg-gold-bright"
                >
                  Reserve a place
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="font-body text-sm text-cream/60 underline decoration-gold/40 underline-offset-4 transition-colors duration-500 hover:text-cream"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
