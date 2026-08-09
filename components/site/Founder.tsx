import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Photo from "@/components/ui/Photo";
import { founder } from "@/lib/content";

export default function Founder() {
  return (
    <section id="founder" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        {/* portrait */}
        <Reveal className="mx-auto w-full max-w-sm lg:mx-0">
          <div className="group relative">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(closest-side,var(--glow-gold),transparent)] blur-2xl"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm ring-1 ring-gold/20">
              <Photo
                name="jonathon-portrait"
                fill
                sizes="(max-width: 1024px) 80vw, 32vw"
                position="center top"
                className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent"
              />
            </div>
          </div>
        </Reveal>

        {/* bio */}
        <div>
          <Reveal>
            <Eyebrow>{founder.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 text-balance font-display text-4xl font-light leading-[1.06] text-cream sm:text-5xl">
              {founder.name}
            </h2>
          </Reveal>
          <Reveal delay={0.13}>
            <p className="mt-4 font-body text-sm uppercase tracking-wide text-gold/80">
              {founder.role}
            </p>
          </Reveal>
          <div className="mt-8 max-w-xl space-y-6">
            {founder.body.map((para, i) => (
              <Reveal key={i} delay={0.18 + i * 0.08}>
                <p className="text-pretty font-body text-base font-light leading-relaxed text-cream/75 sm:text-lg">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
