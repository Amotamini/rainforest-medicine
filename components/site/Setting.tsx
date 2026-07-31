import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Photo from "@/components/ui/Photo";
import Parallax from "@/components/ui/Parallax";
import { setting } from "@/lib/content";

function Tile({
  name,
  className,
  sizes,
}: {
  name: string;
  className: string;
  sizes: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-sm ring-1 ring-gold/12 ${className}`}
    >
      <Photo
        name={name}
        fill
        sizes={sizes}
        position="center"
        className="object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-105"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-night/55 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-40"
      />
    </div>
  );
}

export default function Setting() {
  return (
    <section id="setting" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* intro */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>{setting.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 max-w-lg text-balance font-display text-4xl font-light leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
                {setting.heading}
              </h2>
            </Reveal>
          </div>
          <div className="space-y-5">
            {setting.body.map((para, i) => (
              <Reveal key={i} delay={0.14 + i * 0.08}>
                <p className="text-pretty font-body text-base font-light leading-relaxed text-cream/75">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* the bay — wide lead */}
        <Reveal delay={0.1}>
          <div className="relative mt-14 aspect-[21/9] w-full overflow-hidden rounded-sm ring-1 ring-gold/15">
            <Parallax distance={60} className="absolute inset-0 scale-110">
              <Photo
                name="san-josecito-bay"
                fill
                sizes="100vw"
                position="center"
                className="object-cover"
              />
            </Parallax>
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent"
            />
          </div>
        </Reveal>

        {/* mosaic */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-4 lg:grid-cols-12">
          <Reveal className="col-span-2 lg:col-span-7">
            <Tile name="temple" className="aspect-[16/10]" sizes="(max-width: 1024px) 100vw, 58vw" />
          </Reveal>
          <Reveal delay={0.06} className="col-span-2 lg:col-span-5">
            <Tile name="beach" className="aspect-[16/10]" sizes="(max-width: 1024px) 100vw, 42vw" />
          </Reveal>
          <Reveal delay={0.04} className="col-span-1 lg:col-span-3">
            <Tile name="lodge" className="aspect-[3/4]" sizes="(max-width: 1024px) 50vw, 25vw" />
          </Reveal>
          <Reveal delay={0.1} className="col-span-1 lg:col-span-3">
            <Tile name="room3" className="aspect-[3/4]" sizes="(max-width: 1024px) 50vw, 25vw" />
          </Reveal>
          <Reveal delay={0.16} className="col-span-1 lg:col-span-3">
            <Tile name="hammock" className="aspect-[3/4]" sizes="(max-width: 1024px) 50vw, 25vw" />
          </Reveal>
          <Reveal delay={0.22} className="col-span-1 lg:col-span-3">
            <Tile name="goddess-jacuzzi" className="aspect-[3/4]" sizes="(max-width: 1024px) 50vw, 25vw" />
          </Reveal>
        </div>

        {/* features */}
        <Reveal delay={0.1}>
          <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-center">
            {setting.features.map((f, i) => (
              <li key={f} className="flex items-center gap-5">
                {i > 0 && <span aria-hidden className="text-gold/40">◊</span>}
                <span className="font-body text-sm font-light uppercase tracking-wide text-cream/65">
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
