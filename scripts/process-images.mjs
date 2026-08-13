/**
 * Rainforest Medicine Gatherings — the grade.
 *
 * One deliberate, consistent treatment for every photograph so the whole
 * site reads as a single nocturnal world: a deep forest at night, lit by
 * candle and ember. Near-black forest greens hold the shadows; gold/amber
 * warmth is pulled forward; each frame emerges from darkness through a soft
 * green-black vignette; fine film grain ties real photos and type-only
 * sections into one surface.
 *
 * Everything is driven by the GRADE object. Tune it in one place and the
 * mood of every image on the site shifts together.
 *
 *   npm run images
 */
import sharp from "sharp";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const RAW_DIR = path.join(ROOT, "public/images/raw");
const OUT_DIR = path.join(ROOT, "public/images/processed");
const MANIFEST = path.join(ROOT, "lib/image-manifest.json");

/* --------------------------------------------------------------------- *
 *  THE GRADE — one tunable look for the whole site
 * --------------------------------------------------------------------- */
const GRADE = {
  maxWidth: 2200, // cap long edge for the web; never enlarge past source

  // Base tone — deepen and mute so the duotone-ish overlays can speak
  brightness: 0.9, // < 1 darkens — low-key
  saturation: 0.82, // pull raw color back
  contrastA: 1.12, // slope: > 1 adds contrast
  contrastB: -14, // intercept: crush the blacks toward forest-night

  // Warmth — a gentle channel mix: lift reds, cool-down the blues a touch
  warmth: [
    [1.06, 0.02, 0.0],
    [0.0, 1.0, 0.0],
    [0.0, 0.05, 0.9],
  ],

  // The green-black vignette — every frame emerges from darkness
  vignetteColor: "#04080a",
  vignetteInner: 0.1, // opacity at center
  vignetteMid: 0.32,
  vignetteEdge: 0.94, // opacity at the corners

  // Candlelight — a warm glow pulled forward, low and centered
  glowWarm: "#e8c074",
  glowEmber: "#c0722f",
  glowOpacity: 0.17,

  // Film grain
  grainSigma: 14, // texture coarseness
  grainOpacity: 0.5, // alpha of the (mid-gray) grain layer, blended 'overlay'

  jpegQuality: 84,
};

// Photographs that get the full nocturnal grade, with the alt + section they
// belong to on the rebuilt site. (record per the brief.)
const PHOTOS = {
  "rainforest-banner": { section: "hero", alt: "Sunlight filtering through the dense canopy of the upper-Amazon rainforest" },
  "circle": { section: "gathering", alt: "Participants gathered in a candlelit ceremonial circle at night" },
  "circle-beach": { section: "gathering", alt: "A circle gathered on the beach at dusk where the rainforest meets the ocean" },
  "fb-ceremony": { section: "gathering", alt: "A warm communal gathering inside the ceremonial space" },
  "img5499": { section: "tradition", alt: "Secoya elders seated together inside the ceremonial lodge" },
  "nov-2013": { section: "tradition", alt: "A Secoya elder beside Jonathon Miller Weisberger in traditional dress" },
  "temple": { section: "setting", alt: "The hand-built wooden ceremonial temple rising among the trees" },
  "flowers-of-the-vine": { section: "plants", alt: "The pale flowers of the ayahuasca vine against deep forest green" },
  "cacao": { section: "plants", alt: "Sacred plants and cacao prepared by hand for ceremony" },
  "san-josecito-bay": { section: "setting", alt: "Aerial view of San Josecito Bay on the Osa Peninsula, Costa Rica" },
  "beach": { section: "setting", alt: "The wild Pacific shoreline where the Osa rainforest meets the sea" },
  "lodge": { section: "setting", alt: "Hammocks strung under the old tarpaulin shelter" },
  "hammock": { section: "setting", alt: "Hammocks on a wooden deck overlooking the rainforest" },
  "room3": { section: "setting", alt: "A simple, light-filled guest room opening onto the jungle" },
  "goddess-jacuzzi": { section: "setting", alt: "A natural stone pool fed by a forest spring" },
  "sunset1": { section: "intentions", alt: "A vivid sunset over the Pacific off the Osa Peninsula" },
  "sunset2": { section: "initiatives", alt: "Dusk light over the ocean and distant islands" },
  "jonathon-portrait": { section: "founder", alt: "Portrait of ethnobotanist and author Jonathon Miller Weisberger" },
};

// The book cover is an object, not a scene — keep it legible with a far
// lighter touch so it still reads as itself on the dark page.
const OBJECTS = {
  "book-cover": { section: "book", alt: "Cover of the book Rainforest Medicine by Jonathon Miller Weisberger" },
};

function vignetteSVG(w, h) {
  const c = GRADE.vignetteColor;
  return Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="v" cx="50%" cy="46%" r="75%">
          <stop offset="0%" stop-color="${c}" stop-opacity="${GRADE.vignetteInner}"/>
          <stop offset="58%" stop-color="${c}" stop-opacity="${GRADE.vignetteMid}"/>
          <stop offset="100%" stop-color="${c}" stop-opacity="${GRADE.vignetteEdge}"/>
        </radialGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#v)"/>
    </svg>`
  );
}

function glowSVG(w, h) {
  return Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g" cx="50%" cy="60%" r="60%">
          <stop offset="0%" stop-color="${GRADE.glowWarm}" stop-opacity="${GRADE.glowOpacity}"/>
          <stop offset="50%" stop-color="${GRADE.glowEmber}" stop-opacity="${(GRADE.glowOpacity * 0.4).toFixed(3)}"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#g)"/>
    </svg>`
  );
}

async function grainLayer(w, h) {
  return sharp({
    create: { width: w, height: h, channels: 3, noise: { type: "gaussian", mean: 128, sigma: GRADE.grainSigma } },
  })
    .ensureAlpha(GRADE.grainOpacity)
    .png()
    .toBuffer();
}

async function blurDataURL(buffer) {
  const tiny = await sharp(buffer).resize(20).webp({ quality: 45 }).toBuffer();
  return `data:image/webp;base64,${tiny.toString("base64")}`;
}

async function gradePhoto(name) {
  const inPath = path.join(RAW_DIR, await resolveRaw(name));
  const base = sharp(inPath, { failOn: "none" }).rotate();
  const meta = await base.metadata();
  const outW = Math.min(GRADE.maxWidth, meta.width || GRADE.maxWidth);
  const outH = Math.round((meta.height / meta.width) * outW);

  const [vig, glow, grain] = [vignetteSVG(outW, outH), glowSVG(outW, outH), await grainLayer(outW, outH)];

  const buf = await base
    .resize({ width: outW, withoutEnlargement: true })
    .modulate({ brightness: GRADE.brightness, saturation: GRADE.saturation })
    .linear(GRADE.contrastA, GRADE.contrastB)
    .recomb(GRADE.warmth)
    .composite([
      { input: glow, blend: "soft-light" },
      { input: vig, blend: "over" },
      { input: grain, blend: "overlay" },
    ])
    .jpeg({ quality: GRADE.jpegQuality, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer();

  await writeFile(path.join(OUT_DIR, `${name}.jpg`), buf);
  return { name, width: outW, height: outH, blurDataURL: await blurDataURL(buf) };
}

async function gradeObject(name) {
  const inPath = path.join(RAW_DIR, await resolveRaw(name));
  const base = sharp(inPath, { failOn: "none" }).rotate();
  const meta = await base.metadata();
  const outW = Math.min(1200, meta.width || 1200);
  const outH = Math.round((meta.height / meta.width) * outW);

  const buf = await base
    .resize({ width: outW, withoutEnlargement: true })
    .modulate({ brightness: 0.98, saturation: 0.92 })
    .recomb(GRADE.warmth)
    .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer();

  await writeFile(path.join(OUT_DIR, `${name}.jpg`), buf);
  return { name, width: outW, height: outH, blurDataURL: await blurDataURL(buf) };
}

let RAW_FILES = [];
async function resolveRaw(name) {
  const hit = RAW_FILES.find((f) => f.replace(/\.(jpg|jpeg|png|gif|webp)$/i, "") === name);
  if (!hit) throw new Error(`raw file not found for "${name}"`);
  return hit;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  RAW_FILES = await readdir(RAW_DIR);

  const manifest = {};
  const tasks = [
    ...Object.entries(PHOTOS).map(([name, meta]) => ({ name, meta, kind: "photo" })),
    ...Object.entries(OBJECTS).map(([name, meta]) => ({ name, meta, kind: "object" })),
  ];

  for (const t of tasks) {
    const out = t.kind === "photo" ? await gradePhoto(t.name) : await gradeObject(t.name);
    manifest[t.name] = {
      src: `/images/processed/${t.name}.jpg`,
      width: out.width,
      height: out.height,
      alt: t.meta.alt,
      section: t.meta.section,
      blurDataURL: out.blurDataURL,
    };
    console.log(`  ✓ ${t.name.padEnd(22)} ${out.width}×${out.height}  [${t.meta.section}]`);
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(`\nGraded ${tasks.length} images → public/images/processed`);
  console.log(`Manifest → lib/image-manifest.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
