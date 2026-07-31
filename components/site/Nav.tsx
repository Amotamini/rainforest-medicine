"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nav, site } from "@/lib/content";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-700 ${
        scrolled || open
          ? "border-b border-gold/10 bg-night/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#top"
          className="group flex flex-col leading-none"
          aria-label={`${site.name} — home`}
        >
          <span className="font-display text-lg font-medium tracking-wide text-cream sm:text-xl">
            Rainforest Medicine
          </span>
          <span className="eyebrow mt-1 text-[0.58rem] text-gold/70 transition-colors group-hover:text-gold">
            Gatherings
          </span>
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group relative font-body text-[0.8rem] uppercase tracking-wide text-cream/75 transition-colors hover:text-cream"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold/70 transition-all duration-500 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#gatherings"
            className="hidden rounded-full border border-gold/40 px-5 py-2 font-body text-[0.78rem] uppercase tracking-wide text-gold transition-all duration-500 hover:border-gold hover:bg-gold/10 hover:text-gold-bright sm:inline-block"
          >
            Participate
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center text-cream lg:hidden"
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-current transition-all duration-300 ${
                  open ? "top-1/2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-px w-full bg-current transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-full bg-current transition-all duration-300 ${
                  open ? "bottom-1/2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-gold/10 bg-night/95 backdrop-blur-md lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-6">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-2xl text-cream/90 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <a
                  href="#gatherings"
                  onClick={() => setOpen(false)}
                  className="inline-block rounded-full border border-gold/40 px-6 py-2.5 font-body text-sm uppercase tracking-wide text-gold"
                >
                  Participate
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
