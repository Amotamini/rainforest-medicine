# Rainforest Medicine Gatherings

A crafted, dark, ceremonial website for **Rainforest Medicine Gatherings** — experiential
gatherings rooted in the living plant-medicine traditions of the upper Amazon, held at the
Ocean Forest Ecolodge on Costa Rica's Osa Peninsula. A soulful reimagining of
[rainforestmedicine.net](https://rainforestmedicine.net).

## Stack

- **Next.js 15** (App Router) · TypeScript
- **Tailwind CSS 3** — custom deep-forest / candlelit-gold theme (`tailwind.config.ts`)
- **Framer Motion** — slow, atmospheric reveals & parallax (reduced-motion aware)
- **sharp** — the image grade pipeline
- Fonts via `next/font`: **Cormorant Garamond** (display) + **Hanken Grotesk** (body)

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run images       # re-run the photographic grade (see below)
```

## The image grade

Every photograph is run through one deliberate, tunable treatment so the whole site reads
as a single nocturnal world — near-black forest greens, candlelit gold pulled forward, a
green-black vignette so each frame emerges from darkness, and fine film grain.

- Source originals: `public/images/raw/` (harvested at full resolution from the live site)
- Output: `public/images/processed/`
- Manifest (dimensions, alt text, section, blur placeholder): `lib/image-manifest.json`
- The single look lives in the `GRADE` object in `scripts/process-images.mjs` — change it
  there and the entire site's photographic mood shifts together.

## Structure

```
app/            layout, page, fonts, globals, icons
components/
  site/         the page sections (Hero, Lineage, Book, Plants, Setting, …)
  ui/           Reveal, Parallax, Photo, Eyebrow primitives
lib/            content.ts (all copy) · images.ts · image-manifest.json
scripts/        process-images.mjs (the grade)
public/images/  raw/ + processed/
```

## Content & tone

All copy lives in `lib/content.ts`, drawn faithfully from the live site and reworded in a
reverent, grounded voice. The site makes **no medical or health claims** about the plant
medicines; participation is **contact-based** (`info@rainforestmedicine.net`).

> **Naming note:** the live site's formal name / logo is *Rainforest Medicine **Council**
> Gatherings* (RMCG), while its body copy and this rebuild use the shorter *Rainforest
> Medicine Gatherings* as the wordmark. The full name appears in the footer.

## Deploy (Vercel)

Standard Next.js project — no environment variables required. Push to a Git repo and import
on Vercel, or `vercel` from this directory. `outputFileTracingRoot` is pinned in
`next.config.mjs` so the monorepo-sibling lockfiles don't confuse the build.
