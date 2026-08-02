import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Photo from "@/components/ui/Photo";
import { gatherings } from "@/lib/content";
import { applyMailto } from "@/lib/apply";

export default function Upcoming() {
  return (
    <section id="upcoming" className="relative overflow-hidden py-28 sm:py-36">
      {/* circle on the beach at dusk */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Photo
          name="circle-beach"
          fill
          sizes="100vw"
          position="center"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/85 to-night" />
        <div className="absolute inset-0 bg-[radial-gradient(110%_80%_at_50%_40%,transparent,rgba(5,9,7,0.7))]" />
      </div>

      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <div className="text-center">
          <Reveal>
            <Eyebrow className="justify-center">{gatherings.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-7 font-display text-5xl font-light leading-none text-cream sm:text-6xl">
              {gatherings.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.13}>
            <p className="mx-auto mt-6 max-w-xl text-pretty font-body text-base font-light leading-relaxed text-cream/75">
              {gatherings.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {gatherings.upcoming.map((g, i) => (
            <Reveal key={g.id} delay={0.1 * i}>
              <article className="group flex h-full flex-col rounded-sm border border-gold/20 bg-night-800/60 p-8 backdrop-blur-sm transition-all duration-700 hover:border-gold/50 hover:bg-night-800/85">
                <p className="font-display text-2xl font-light text-gold-bright sm:text-[1.7rem]">
                  {g.dates}
                </p>
                <div aria-hidden className="gold-rule-left mt-5 w-12" />
                <h3 className="mt-6 font-display text-2xl font-light leading-snug text-cream">
                  {g.title}
                </h3>
                <p className="mt-3 font-body text-sm uppercase tracking-wide text-cream/55">
                  {g.place}
                </p>

                <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-display text-3xl font-light text-cream">{g.price}</span>
                  <span className="font-body text-xs uppercase tracking-wide text-gold/70">
                    {g.places}
                  </span>
                </div>

                <ul className="mt-6 space-y-2">
                  {g.includes.map((line, idx) => (
                    <li
                      key={idx}
                      className="rounded-sm border border-dashed border-gold/25 px-3 py-2 font-body text-sm italic leading-relaxed text-cream/45"
                    >
                      {line}
                    </li>
                  ))}
                </ul>

                {g.note && (
                  <p className="mt-4 font-body text-sm font-light italic text-cream/60">
                    {g.note}
                  </p>
                )}

                <div className="mt-auto pt-8">
                  <a
                    href={applyMailto(g.title)}
                    className="group/btn inline-flex items-center gap-3 rounded-full bg-gold px-7 py-3 font-body text-sm font-medium uppercase tracking-wide text-night-900 transition-all duration-500 hover:bg-gold-bright"
                  >
                    {gatherings.cta}
                    <span className="transition-transform duration-500 group-hover/btn:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
