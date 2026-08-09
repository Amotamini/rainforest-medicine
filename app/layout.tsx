import type { Metadata, Viewport } from "next";
import { display, body } from "./fonts";
import { site } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rainforestmedicine.net"),
  title: {
    default: "Rainforest Medicine Gatherings — Ceremonial traditions of the upper Amazon",
    template: "%s · Rainforest Medicine Gatherings",
  },
  description:
    "Experiential ceremonial gatherings for personal, community and planetary renewal, held in the living plant-medicine traditions of the upper Amazon — at the Ocean Forest Ecolodge on Costa Rica's Osa Peninsula.",
  keywords: [
    "Rainforest Medicine",
    "Siekopai",
    "Secoya",
    "upper Amazon",
    "Osa Peninsula",
    "Ocean Forest Ecolodge",
    "Jonathon Miller Weisberger",
    "indigenous science",
  ],
  authors: [{ name: "Jonathon Miller Weisberger" }],
  openGraph: {
    title: "Rainforest Medicine Gatherings",
    description:
      "Ceremonial gatherings for personal, community and planetary renewal — held in the living traditions of the upper Amazon.",
    type: "website",
    locale: "en_US",
    siteName: site.name,
    images: [{ url: "/images/processed/circle.jpg", width: 1152, height: 510 }],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#070b08",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="night" className={`${display.variable} ${body.variable}`}>
      <head>
        {/*
          TEMPORARY, 2026-08-09 — paired with components/site/ThemeToggle.tsx.
          Applies the saved palette before first paint so the page never flashes
          the wrong one. Delete this whole block when the palette is chosen.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('rfm-theme');if(t==='day'||t==='night'){document.documentElement.dataset.theme=t}}catch(e){}`,
          }}
        />
      </head>
      <body className="relative min-h-screen selection:bg-gold/20">
        {children}
        {/* Redline client review widget. Inert unless the URL carries ?review=TOKEN. */}
        <script
          defer
          src="https://redline-xi-ten.vercel.app/w.js"
          data-redline="rainforest-medicine"
          data-redline-name="Rainforest Medicine Gatherings"
        />
      </body>
    </html>
  );
}
