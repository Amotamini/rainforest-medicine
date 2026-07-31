import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Photo from "@/components/ui/Photo";
import { conservation, site } from "@/lib/content";

const NUMERALS = ["I", "II", "III"];

export default function Conservation() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Photo
          name="sunset2"
          fill
          sizes="100vw"
          position="center bottom"
          className="object-cover opacity-[0.14]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/90 to-night-800" />
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">{conservation.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-7 text-balance font-display text-4xl font-light leading-[1.06] text-cream sm:text-5xl">
              {conservation.heading}
            </h2>
          </Reveal>
          {conservation.body.map((para, i) => (
            <Reveal key={i} delay={0.14}>
              <p className="mt-7 text-pretty font-body text-base font-light leading-relaxed text-cream/75">
                {para}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {conservation.spheres.map((s, i) => (
            <Reveal key={s.title} delay={0.1 * i}>
              <article className="group h-full rounded-sm border border-gold/15 bg-night-700/40 p-8 backdrop-blur-sm transition-colors duration-700 hover:border-gold/40 hover:bg-night-700/70">
                <span className="font-display text-3xl font-light text-gold/60">
                  {NUMERALS[i]}
                </span>
                <div aria-hidden className="gold-rule-left mt-5 w-12" />
                <h3 className="mt-6 font-display text-2xl font-light leading-tight text-cream">
                  {s.title}
                </h3>
                <p className="mt-4 text-pretty font-body text-sm font-light leading-relaxed text-cream/70">
                  {s.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 text-center">
            <a
              href={site.conservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 font-body text-sm uppercase tracking-wide text-gold transition-colors hover:text-gold-bright"
            >
              {conservation.cta}
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
