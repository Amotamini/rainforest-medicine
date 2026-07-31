import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Photo from "@/components/ui/Photo";
import { gatherings, site } from "@/lib/content";

const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
  "Participating in a Rainforest Medicine Gathering"
)}`;

export default function Gatherings() {
  return (
    <section id="gatherings" className="relative overflow-hidden py-28 sm:py-36">
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
        </div>

        {/* upcoming dates */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {gatherings.upcoming.map((g, i) => (
            <Reveal key={g.dates} delay={0.1 * i}>
              <article className="group flex h-full flex-col rounded-sm border border-gold/20 bg-night-800/60 p-8 backdrop-blur-sm transition-all duration-700 hover:border-gold/50 hover:bg-night-800/85">
                <p className="font-display text-3xl font-light text-gold-bright sm:text-[2rem]">
                  {g.dates}
                </p>
                <div aria-hidden className="gold-rule-left mt-5 w-12" />
                <h3 className="mt-6 font-display text-2xl font-light leading-snug text-cream">
                  {g.title}
                </h3>
                <p className="mt-3 font-body text-sm uppercase tracking-wide text-cream/55">
                  {g.place}
                </p>
                {g.note && (
                  <p className="mt-auto pt-6 font-body text-sm font-light italic text-cream/60">
                    {g.note}
                  </p>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        {/* contact-based participation */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <h3 className="font-display text-3xl font-light italic text-cream">
              {gatherings.contactHeading}
            </h3>
            <p className="mx-auto mt-6 max-w-xl text-pretty font-body text-base font-light leading-relaxed text-cream/75">
              {gatherings.contactBody}
            </p>
            <a
              href={mailto}
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-9 py-4 font-body text-sm font-medium uppercase tracking-wide text-night-900 transition-all duration-500 hover:bg-gold-bright"
            >
              {gatherings.cta}
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
            <p className="mt-6 font-body text-sm text-cream/50">{site.email}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
