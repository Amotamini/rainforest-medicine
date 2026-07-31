import { Cormorant_Garamond, Hanken_Grotesk } from "next/font/google";

/** High-contrast display serif — the voice of the site. */
export const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

/** Quiet, legible body face that sits back and lets the serif lead. */
export const body = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
