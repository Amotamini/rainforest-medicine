#!/usr/bin/env python3
"""
Rainforest Medicine Gatherings — the grade, in Python.

The same treatment as scripts/process-images.mjs, written so it runs on a Mac
with nothing installed: Python, Pillow and numpy, no npm, no network.
scripts/process-images.mjs is kept for Scott and produces the same result; this
file is the one Claude runs when Eli swaps a photograph.

    python3 scripts/grade.py

Reads  public/images/raw/
Writes public/images/processed/ and lib/image-manifest.json

One deliberate, consistent treatment for every photograph so the whole site
reads as a single nocturnal world: a deep forest at night, lit by candle and
ember. Near-black forest greens hold the shadows; gold/amber warmth is pulled
forward; each frame emerges from darkness through a soft green-black vignette;
fine film grain ties real photos and type-only sections into one surface.

Everything is driven by the GRADE dict. It is the same set of numbers as the
GRADE object in process-images.mjs, and the two are applied in the order
libvips applies them inside sharp — recomb, then modulate, then the composited
layers, then the linear contrast — not in the order the sharp calls are written.
"""
import base64
import io
import json
import os
import sys
import zlib

import numpy as np
from PIL import Image, ImageCms, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW_DIR = os.path.join(ROOT, "public", "images", "raw")
OUT_DIR = os.path.join(ROOT, "public", "images", "processed")
MANIFEST = os.path.join(ROOT, "lib", "image-manifest.json")

# --------------------------------------------------------------------- #
#  THE GRADE — one tunable look for the whole site
# --------------------------------------------------------------------- #
GRADE = {
    "maxWidth": 2200,       # cap long edge for the web; never enlarge past source

    # Base tone — deepen and mute so the duotone-ish overlays can speak
    "brightness": 0.9,      # < 1 darkens — low-key
    "saturation": 0.82,     # pull raw color back
    "contrastA": 1.12,      # slope: > 1 adds contrast
    "contrastB": -14,       # intercept: crush the blacks toward forest-night

    # Warmth — a gentle channel mix: lift reds, cool-down the blues a touch
    "warmth": [
        [1.06, 0.02, 0.0],
        [0.0, 1.0, 0.0],
        [0.0, 0.05, 0.9],
    ],

    # The green-black vignette — every frame emerges from darkness
    "vignetteColor": "#04080a",
    "vignetteInner": 0.1,   # opacity at center
    "vignetteMid": 0.32,
    "vignetteEdge": 0.94,   # opacity at the corners

    # Candlelight — a warm glow pulled forward, low and centered
    "glowWarm": "#e8c074",
    "glowEmber": "#c0722f",
    "glowOpacity": 0.17,

    # Film grain
    "grainSigma": 14,       # texture coarseness
    "grainOpacity": 0.5,    # alpha of the (mid-gray) grain layer, blended 'overlay'
    "grainSeed": 20260813,  # fixed, so the same source always grades the same

    "jpegQuality": 84,
}

# Photographs that get the full nocturnal grade, with the alt + section they
# belong to on the rebuilt site. (record per the brief.)
PHOTOS = {
    "rainforest-banner": {"section": "hero", "alt": "Sunlight filtering through the dense canopy of the upper-Amazon rainforest"},
    "circle": {"section": "gathering", "alt": "Participants gathered in a candlelit ceremonial circle at night"},
    "circle-beach": {"section": "gathering", "alt": "A circle gathered on the beach at dusk where the rainforest meets the ocean"},
    "fb-ceremony": {"section": "gathering", "alt": "A warm communal gathering inside the ceremonial space"},
    "img5499": {"section": "tradition", "alt": "Secoya elders seated together inside the ceremonial lodge"},
    "nov-2013": {"section": "tradition", "alt": "A Secoya elder beside Jonathon Miller Weisberger in traditional dress"},
    "temple": {"section": "setting", "alt": "The hand-built wooden ceremonial temple rising among the trees"},
    "flowers-of-the-vine": {"section": "plants", "alt": "The pale flowers of the ayahuasca vine against deep forest green"},
    "cacao": {"section": "plants", "alt": "Sacred plants and cacao prepared by hand for ceremony"},
    "san-josecito-bay": {"section": "setting", "alt": "Aerial view of San Josecito Bay on the Osa Peninsula, Costa Rica"},
    "beach": {"section": "setting", "alt": "The wild Pacific shoreline where the Osa rainforest meets the sea"},
    "lodge": {"section": "setting", "alt": "Hammocks strung under the old tarpaulin shelter"},
    "hammock": {"section": "setting", "alt": "Hammocks on a wooden deck overlooking the rainforest"},
    "room3": {"section": "setting", "alt": "A simple, light-filled guest room opening onto the jungle"},
    "goddess-jacuzzi": {"section": "setting", "alt": "A natural stone pool fed by a forest spring"},
    "sunset1": {"section": "intentions", "alt": "A vivid sunset over the Pacific off the Osa Peninsula"},
    "sunset2": {"section": "initiatives", "alt": "Dusk light over the ocean and distant islands"},
    "jonathon-portrait": {"section": "founder", "alt": "Portrait of ethnobotanist and author Jonathon Miller Weisberger"},
}

# The book cover is an object, not a scene — keep it legible with a far
# lighter touch so it still reads as itself on the dark page.
OBJECTS = {
    "book-cover": {"section": "book", "alt": "Cover of the book Rainforest Medicine by Jonathon Miller Weisberger"},
}

RAW_EXTENSIONS = (".jpg", ".jpeg", ".png", ".gif", ".webp")


# --------------------------------------------------------------------- #
#  Colour — sRGB <-> CIE LCh, the space sharp's modulate() works in
# --------------------------------------------------------------------- #
_RGB_TO_XYZ = np.array([
    [0.4124, 0.3576, 0.1805],
    [0.2126, 0.7152, 0.0722],
    [0.0193, 0.1192, 0.9505],
])
_XYZ_TO_RGB = np.linalg.inv(_RGB_TO_XYZ)
_WHITE = (95.047, 100.0, 108.883)  # D65, as libvips uses


def _srgb_to_linear(v):
    v = v / 255.0
    return np.where(v <= 0.04045, v / 12.92, ((v + 0.055) / 1.055) ** 2.4)


def _linear_to_srgb(v):
    v = np.clip(v, 0.0, 1.0)
    return np.where(v <= 0.0031308, v * 12.92, 1.055 * (v ** (1 / 2.4)) - 0.055) * 255.0


def modulate(rgb, brightness, saturation):
    """Multiply lightness and chroma in CIE LCh, exactly as sharp's modulate()."""
    xyz = _srgb_to_linear(rgb) @ _RGB_TO_XYZ.T * 100.0
    x = xyz[..., 0] / _WHITE[0]
    y = xyz[..., 1] / _WHITE[1]
    z = xyz[..., 2] / _WHITE[2]

    def f(t):
        t = np.maximum(t, 0.0)
        return np.where(t > 0.008856, np.cbrt(t), 7.787 * t + 16.0 / 116.0)

    fx, fy, fz = f(x), f(y), f(z)
    lightness = np.where(y > 0.008856, 116.0 * np.cbrt(np.maximum(y, 0.0)) - 16.0, 903.3 * y)
    a = 500.0 * (fx - fy)
    b = 200.0 * (fy - fz)

    lightness = lightness * brightness
    chroma = np.hypot(a, b) * saturation
    hue = np.arctan2(b, a)
    a = chroma * np.cos(hue)
    b = chroma * np.sin(hue)

    fy2 = (lightness + 16.0) / 116.0
    fx2 = fy2 + a / 500.0
    fz2 = fy2 - b / 200.0

    def g(t):
        return np.where(t >= 6.0 / 29.0, t ** 3, (t - 16.0 / 116.0) / 7.787)

    yy = np.where(lightness > 8.0, fy2 ** 3, lightness / 903.3)
    xyz2 = np.stack([g(fx2) * _WHITE[0], yy * _WHITE[1], g(fz2) * _WHITE[2]], axis=-1) / 100.0
    return _linear_to_srgb(xyz2 @ _XYZ_TO_RGB.T)


# --------------------------------------------------------------------- #
#  The two gradient layers, as librsvg draws them
# --------------------------------------------------------------------- #
def _hex_rgb(value):
    value = value.lstrip("#")
    return tuple(int(value[i:i + 2], 16) for i in (0, 2, 4))


def radial_layer(width, height, cx, cy, radius, stops):
    """
    An SVG radial gradient over the whole frame, returned the way libvips sees
    it after librsvg has drawn it: 8-bit straight colour plus 8-bit alpha.

    The gradient is in objectBoundingBox units, so `radius` is a fraction of the
    frame in each axis — an ellipse, not a circle, on a non-square photograph.
    Cairo draws it premultiplied and vips divides the alpha back out, and both
    of those roundings are reproduced here because the composite that follows
    is sensitive to them.
    """
    xs = ((np.arange(width) + 0.5) / width - cx) / radius
    ys = ((np.arange(height) + 0.5) / height - cy) / radius
    t = np.sqrt(xs[None, :] ** 2 + ys[:, None] ** 2)

    offsets = np.array([s[0] for s in stops])
    premultiplied = np.array([
        [c * s[2] for c in s[1]] + [s[2] * 255.0] for s in stops
    ])
    t = np.clip(t, offsets[0], offsets[-1])

    pre = np.empty(t.shape + (4,))
    for channel in range(4):
        pre[..., channel] = np.interp(t, offsets, premultiplied[:, channel])

    alpha = np.rint(pre[..., 3:4])
    colour = np.minimum(np.rint(pre[..., :3]), alpha)
    safe = np.maximum(alpha, 1.0)
    colour = np.where(alpha > 0, np.floor(colour * 255.0 / safe), 0.0)
    return colour, alpha


def vignette_layer(width, height):
    colour = _hex_rgb(GRADE["vignetteColor"])
    return radial_layer(width, height, 0.5, 0.46, 0.75, [
        (0.0, colour, GRADE["vignetteInner"]),
        (0.58, colour, GRADE["vignetteMid"]),
        (1.0, colour, GRADE["vignetteEdge"]),
    ])


def glow_layer(width, height):
    ember_opacity = float("%.3f" % (GRADE["glowOpacity"] * 0.4))
    return radial_layer(width, height, 0.5, 0.60, 0.60, [
        (0.0, _hex_rgb(GRADE["glowWarm"]), GRADE["glowOpacity"]),
        (0.5, _hex_rgb(GRADE["glowEmber"]), ember_opacity),
        (1.0, (0, 0, 0), 0.0),
    ])


def grain_layer(width, height, seed):
    """Gaussian film grain, mid-gray, at a fixed seed so a re-run is identical."""
    rng = np.random.default_rng(seed)
    noise = rng.normal(128.0, GRADE["grainSigma"], size=(height, width, 3))
    colour = np.clip(np.floor(noise), 0.0, 255.0)
    alpha = np.floor(GRADE["grainOpacity"] * 255.0)  # sharp's ensureAlpha truncates
    return colour, np.full((height, width, 1), alpha)


# --------------------------------------------------------------------- #
#  The composite — libvips blends the PDF modes on premultiplied source
# --------------------------------------------------------------------- #
def _soft_light(backdrop, source):
    d = np.where(backdrop <= 0.25,
                 ((16 * backdrop - 12) * backdrop + 4) * backdrop,
                 np.sqrt(np.maximum(backdrop, 0.0)))
    return np.where(source <= 0.5,
                    backdrop - (1 - 2 * source) * backdrop * (1 - backdrop),
                    backdrop + (2 * source - 1) * (d - backdrop))


def _overlay(backdrop, source):
    return np.where(backdrop <= 0.5,
                    2 * backdrop * source,
                    1 - 2 * (1 - backdrop) * (1 - source))


def blend(backdrop, layer, mode):
    """
    backdrop: float 0-1. layer: (colour 0-255, alpha 0-255) as vips holds it.

    'over' is the plain source-over operator. The separable PDF modes are fed
    the *premultiplied* source, which is what libvips does and what makes the
    glow and the grain land where they do.
    """
    colour, alpha8 = layer
    alpha = alpha8 / 255.0
    if mode == "over":
        return (1 - alpha) * backdrop + colour / 255.0 * alpha
    source = colour / 255.0 * alpha
    fn = _soft_light if mode == "soft-light" else _overlay
    return (1 - alpha) * backdrop + alpha * fn(backdrop, source)


# --------------------------------------------------------------------- #
#  Reading, resizing, writing
# --------------------------------------------------------------------- #
def resolve_raw(name):
    for filename in sorted(os.listdir(RAW_DIR)):
        stem, ext = os.path.splitext(filename)
        if stem == name and ext.lower() in RAW_EXTENSIONS:
            return os.path.join(RAW_DIR, filename)
    raise SystemExit('raw file not found for "%s"' % name)


def to_srgb(image):
    """
    A camera file often carries its own colour profile — Adobe RGB, Display P3.
    sharp converts those to sRGB before it grades, so four of these photographs
    would come out visibly redder if this step were skipped.
    """
    profile = image.info.get("icc_profile")
    if not profile:
        return image
    # Pillow moved these constants into an enum; perceptual is 0 either way.
    perceptual = getattr(getattr(ImageCms, "Intent", None), "PERCEPTUAL", 0)
    try:
        return ImageCms.profileToProfile(
            image,
            ImageCms.ImageCmsProfile(io.BytesIO(profile)),
            ImageCms.createProfile("sRGB"),
            renderingIntent=perceptual,
            outputMode="RGB",
        )
    except Exception:  # a profile we cannot read is not a reason to stop
        return image


def open_raw(name, max_width):
    image = Image.open(resolve_raw(name))
    image = ImageOps.exif_transpose(image)
    image = to_srgb(image.convert("RGB"))
    width, height = image.size
    out_w = min(max_width, width)
    out_h = int(round(height / width * out_w))
    if out_w != width:
        image = image.resize((out_w, out_h), Image.LANCZOS)
    return np.asarray(image, dtype=np.float64), out_w, out_h


def to_uint8(pixels):
    """libvips truncates when it casts a float band to 8-bit."""
    return np.clip(np.floor(pixels), 0.0, 255.0)


def save_jpeg(pixels, path, quality):
    image = Image.fromarray(np.clip(pixels, 0, 255).astype(np.uint8))
    image.save(path, "JPEG", quality=quality, subsampling=0, optimize=True)


def blur_data_url(path):
    """A 20px-wide WebP of the finished image, quality 45 — the Next.js placeholder."""
    with Image.open(path) as image:
        width, height = image.size
        tiny = image.convert("RGB").resize((20, max(1, int(round(height / width * 20)))), Image.LANCZOS)
    buffer = io.BytesIO()
    tiny.save(buffer, "WEBP", quality=45)
    return "data:image/webp;base64," + base64.b64encode(buffer.getvalue()).decode("ascii")


def seed_for(name):
    return GRADE["grainSeed"] + zlib.crc32(name.encode("utf-8"))


def grade_photo(name):
    pixels, width, height = open_raw(name, GRADE["maxWidth"])

    pixels = to_uint8(pixels @ np.array(GRADE["warmth"]).T)
    pixels = np.clip(np.rint(modulate(pixels, GRADE["brightness"], GRADE["saturation"])), 0.0, 255.0)

    out = pixels / 255.0
    out = blend(out, glow_layer(width, height), "soft-light")
    out = blend(out, vignette_layer(width, height), "over")
    out = blend(out, grain_layer(width, height, seed_for(name)), "overlay")

    out = to_uint8(out * 255.0 * GRADE["contrastA"] + GRADE["contrastB"])
    path = os.path.join(OUT_DIR, "%s.jpg" % name)
    save_jpeg(out, path, GRADE["jpegQuality"])
    return width, height, blur_data_url(path)


def grade_object(name):
    """A far lighter touch — no vignette, no glow, no grain, no contrast crush."""
    pixels, width, height = open_raw(name, 1200)
    pixels = to_uint8(pixels @ np.array(GRADE["warmth"]).T)
    pixels = np.clip(np.rint(modulate(pixels, 0.98, 0.92)), 0.0, 255.0)
    path = os.path.join(OUT_DIR, "%s.jpg" % name)
    save_jpeg(pixels, path, 88)
    return width, height, blur_data_url(path)


def main():
    if not os.path.isdir(RAW_DIR):
        raise SystemExit("no raw folder at %s" % RAW_DIR)
    os.makedirs(OUT_DIR, exist_ok=True)

    tasks = [(name, meta, grade_photo) for name, meta in PHOTOS.items()]
    tasks += [(name, meta, grade_object) for name, meta in OBJECTS.items()]

    manifest = {}
    for name, meta, grade in tasks:
        width, height, blur = grade(name)
        manifest[name] = {
            "src": "/images/processed/%s.jpg" % name,
            "width": width,
            "height": height,
            "alt": meta["alt"],
            "section": meta["section"],
            "blurDataURL": blur,
        }
        print("  ok %-22s %d×%d  [%s]" % (name, width, height, meta["section"]))

    with open(MANIFEST, "w", encoding="utf-8") as handle:
        json.dump(manifest, handle, indent=2, ensure_ascii=False)

    print("\nGraded %d images → public/images/processed" % len(tasks))
    print("Manifest → lib/image-manifest.json")


if __name__ == "__main__":
    sys.exit(main())
