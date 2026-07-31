import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Photo from "@/components/ui/Photo";
import Parallax from "@/components/ui/Parallax";
import { plants } from "@/lib/content";

export default function Plants() {
  return (
    <section id="plants" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          {/* flowers of the vine */}
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm ring-1 ring-gold/15">
              <Parallax distance={50} className="absolute inset-0 scale-110">
                <Photo
                  name="flowers-of-the-vine"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  position="center"
                  className="object-cover"
                />
              </Parallax>
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent"
              />
            </div>
          </Reveal>

          {/* text + named plants */}
          <div>
            <Reveal>
              <Eyebrow>{plants.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-4xl font-light leading-[1.05] text-cream sm:text-5xl">
                {plants.heading}
              </h2>
            </Reveal>
            <div className="mt-8 space-y-6">
              {plants.body.map((para, i) => (
                <Reveal key={i} delay={0.14 + i * 0.08}>
                  <p className="text-pretty font-body text-base font-light leading-relaxed text-cream/75">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <ul className="mt-10 border-t border-gold/15">
                {plants.list.map((p) => (
                  <li
                    key={p.name}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-gold/10 py-4"
                  >
                    <span className="font-display text-xl text-cream">{p.name}</span>
                    <span className="font-body text-sm italic text-sage">{p.latin}</span>
                    <span className="w-full font-body text-sm font-light text-cream/55">
                      {p.note}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>

      {/* hand-prepared ceremony band */}
      <Reveal delay={0.1}>
        <figure className="relative mt-20 h-[40vh] min-h-[260px] w-full overflow-hidden sm:mt-28">
          <Parallax distance={70} className="absolute inset-0 scale-110">
            <Photo
              name="cacao"
              fill
              sizes="100vw"
              position="center"
              className="object-cover"
            />
          </Parallax>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-night via-night/40 to-night/80"
          />
          <figcaption className="absolute inset-0 flex items-center px-6 sm:px-12">
            <p className="max-w-md text-balance font-display text-2xl font-light italic leading-snug text-cream/90 sm:text-3xl">
              Prepared by hand, on site, in strict obedience to ancestral methods.
            </p>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
