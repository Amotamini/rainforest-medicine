import type { Config } from "tailwindcss";

/**
 * Rainforest Medicine Gatherings — deep-forest-at-night palette.
 * Near-black forest greens as the base, candlelit gold/amber emerging from
 * shadow. Every value is tuned so processed photographs and type-only
 * sections read as one nocturnal world.
 *
 * TEMPORARY, 2026-08-09. Every colour now reads from a CSS variable declared in
 * `app/globals.css`, so the whole site can flip between the night palette and a
 * daylight one without touching a single component. This exists only so the
 * client can see both and choose. Once the choice is made, inline the winning
 * values back into this file as plain hex, delete the losing block from
 * globals.css, and delete `components/site/ThemeToggle.tsx`. Names below are
 * unchanged on purpose: `night` is the page ground and `cream` is the text,
 * whichever theme is showing.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base — the ground the page sits on
        night: {
          DEFAULT: "rgb(var(--c-night-900) / <alpha-value>)",
          900: "rgb(var(--c-night-900) / <alpha-value>)",
          800: "rgb(var(--c-night-800) / <alpha-value>)",
          700: "rgb(var(--c-night-700) / <alpha-value>)",
          600: "rgb(var(--c-night-600) / <alpha-value>)",
          500: "rgb(var(--c-night-500) / <alpha-value>)",
        },
        // Living greens
        moss: {
          DEFAULT: "rgb(var(--c-moss) / <alpha-value>)",
          light: "rgb(var(--c-moss-light) / <alpha-value>)",
          deep: "rgb(var(--c-moss-deep) / <alpha-value>)",
        },
        // Candlelight — gold / amber / ember
        gold: {
          DEFAULT: "rgb(var(--c-gold) / <alpha-value>)",
          bright: "rgb(var(--c-gold-bright) / <alpha-value>)",
          deep: "rgb(var(--c-gold-deep) / <alpha-value>)",
          pale: "rgb(var(--c-gold-pale) / <alpha-value>)",
        },
        ember: {
          DEFAULT: "rgb(var(--c-ember) / <alpha-value>)",
          deep: "rgb(var(--c-ember-deep) / <alpha-value>)",
        },
        // Text
        cream: {
          DEFAULT: "rgb(var(--c-cream) / <alpha-value>)",
          dim: "rgb(var(--c-cream-dim) / <alpha-value>)",
        },
        sage: "rgb(var(--c-sage) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.32em",
        wide: "0.18em",
      },
      maxWidth: {
        prose: "62ch",
      },
      keyframes: {
        emberPulse: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.04)" },
        },
        driftUp: {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        smoke: {
          "0%": { transform: "translateY(0) translateX(0) scale(1)", opacity: "0" },
          "20%": { opacity: "0.35" },
          "100%": { transform: "translateY(-120px) translateX(20px) scale(1.6)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        emberPulse: "emberPulse 6s ease-in-out infinite",
        driftUp: "driftUp 1s ease-out both",
        smoke: "smoke 9s ease-out infinite",
        shimmer: "shimmer 8s linear infinite",
      },
      backgroundImage: {
        "gold-rule":
          "linear-gradient(90deg, transparent, var(--rule), transparent)",
      },
    },
  },
  plugins: [],
};

export default config;
