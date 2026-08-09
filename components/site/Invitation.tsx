import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { invitation } from "@/lib/content";

/** A type-only opening — deep textured darkness, no photograph needed. */
export default function Invitation() {
  return (
    <section id="invitation" className="relative overflow-hidden py-28 sm:py-40">
      {/* a faint candle-glow held in the dark */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow-gold-soft),transparent)] blur-2xl"
      />
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <Eyebrow className="justify-center">{invitation.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-8 text-balance font-display text-4xl font-light leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
            {invitation.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <div aria-hidden className="gold-rule mx-auto mt-10 w-24" />
        </Reveal>
        <div className="mt-10 space-y-7">
          {invitation.body.map((para, i) => (
            <Reveal key={i} delay={0.2 + i * 0.08}>
              <p className="text-pretty font-body text-lg font-light leading-relaxed text-cream/75">
                {para}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
