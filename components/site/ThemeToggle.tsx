"use client";

/**
 * TEMPORARY, 2026-08-09. Lets the client see the site in both palettes and
 * choose one. Delete this file, its two usages in Nav.tsx, the no-flash script
 * in app/layout.tsx and the losing block in app/globals.css once the decision
 * is made. Nothing else depends on it.
 */

import { useEffect, useState } from "react";

type Theme = "night" | "day";

/**
 * `tone` says what the button is sitting on. "onImage" is for when the header
 * is transparent over the hero photograph, where the palette's own colours
 * would vanish into the canopy.
 */
export default function ThemeToggle({
  tone = "theme",
}: {
  tone?: "theme" | "onImage";
}) {
  const [theme, setTheme] = useState<Theme>("night");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const current = (document.documentElement.dataset.theme as Theme) || "night";
    setTheme(current);
    setReady(true);
  }, []);

  const flip = () => {
    const next: Theme = theme === "night" ? "day" : "night";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem("rfm-theme", next);
    } catch {
      /* private browsing, no harm done */
    }
  };

  const label = theme === "night" ? "Switch to the daylight palette" : "Switch to the night palette";

  const tones = {
    theme:
      "border-gold/30 text-gold hover:border-gold hover:bg-gold/10 hover:text-gold-bright",
    onImage:
      "border-[rgb(var(--on-image-gold)/0.3)] text-[rgb(var(--on-image-gold))] hover:border-[rgb(var(--on-image-gold))] hover:bg-[rgb(var(--on-image-gold)/0.1)] hover:text-[rgb(var(--on-image-gold-bright))]",
  };

  return (
    <button
      type="button"
      onClick={flip}
      aria-label={label}
      title={label}
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 ${tones[tone]}`}
    >
      {/* rendered only once the real theme is known, so it never shows the wrong icon */}
      <span className={`transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}>
        {theme === "night" ? (
          /* sun */
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden>
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.4v2.2M12 19.4v2.2M21.6 12h-2.2M4.6 12H2.4M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6M18.8 18.8l-1.6-1.6M6.8 6.8L5.2 5.2" />
          </svg>
        ) : (
          /* moon */
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M20.5 14.6A8.6 8.6 0 1 1 9.4 3.5a6.9 6.9 0 0 0 11.1 11.1Z" />
          </svg>
        )}
      </span>
    </button>
  );
}
