import type { Config } from "tailwindcss";

/**
 * Rainforest Medicine Gatherings — deep-forest-at-night palette.
 * Near-black forest greens as the base, candlelit gold/amber emerging from
 * shadow. Every value is tuned so processed photographs and type-only
 * sections read as one nocturnal world.
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
        // Base — the forest floor at night
        night: {
          DEFAULT: "#070b08", // deepest near-black green
          900: "#070b08",
          800: "#0a110c",
          700: "#0e1812",
          600: "#13201a",
          500: "#192a22",
        },
        // Living greens
        moss: {
          DEFAULT: "#3a5440",
          light: "#6f8a6c",
          deep: "#243a2b",
        },
        // Candlelight — gold / amber / ember
        gold: {
          DEFAULT: "#c9a24b",
          bright: "#e6c578",
          deep: "#a07c33",
          pale: "#e9dcb8",
        },
        ember: {
          DEFAULT: "#c5743a",
          deep: "#8f4a22",
        },
        // Text — candlelit cream / sage
        cream: {
          DEFAULT: "#ece3cf",
          dim: "#cabfa6",
        },
        sage: "#9aa896",
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
          "linear-gradient(90deg, transparent, rgba(201,162,75,0.55), transparent)",
      },
    },
  },
  plugins: [],
};

export default config;
