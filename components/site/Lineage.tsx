import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Photo from "@/components/ui/Photo";
import { lineage } from "@/lib/content";

export default function Lineage() {
  return (
    <section id="lineage" className="relative overflow-hidden py-28 sm:py-40">
      {/* the ceremonial lodge, barely emerging from the dark, as ground */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Photo
          name="img5499"
          fill
          sizes="100vw"
          position="center"
          className="object-cover opacity-[0.16]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/85 to-night" />
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          {/* text */}
          <div>
            <Reveal>
              <Eyebrow>{lineage.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 max-w-xl text-balance font-display text-4xl font-light leading-[1.06] text-cream sm:text-5xl">
                {lineage.heading}
              </h2>
            </Reveal>
            <div className="mt-9 max-w-xl space-y-6">
              {lineage.body.map((para, i) => (
                <Reveal key={i} delay={0.14 + i * 0.07}>
                  <p className="text-pretty font-body text-base font-light leading-relaxed text-cream/75 sm:text-[1.05rem]">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* the elder with Jonathon */}
          <Reveal delay={0.18}>
            <figure className="lg:mt-10">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-sm ring-1 ring-gold/20">
                <Photo
                  name="nov-2013"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  position="center"
                  className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent"
                />
              </div>
              <figcaption className="mt-4 flex items-start gap-3 font-body text-sm text-cream/55">
                <span aria-hidden className="mt-2 h-px w-6 shrink-0 bg-gold/50" />
                A Secoya elder, torchbearer of the tradition, with Jonathon Miller Weisberger.
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* the passage */}
        <Reveal delay={0.1}>
          <blockquote className="mx-auto mt-24 max-w-4xl border-y border-gold/15 py-12 text-center">
            <p className="text-balance font-display text-2xl font-light italic leading-snug text-cream sm:text-[2.1rem]">
              <span className="text-gold/60">“</span>
              {lineage.quote}
              <span className="text-gold/60">”</span>
            </p>
            <cite className="mt-7 block font-body text-xs uppercase not-italic tracking-eyebrow text-gold/70">
              {lineage.quoteAttr}
            </cite>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
