import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { apply, site } from "@/lib/content";
import { applyMailto } from "@/lib/apply";

export default function Apply() {
  return (
    <section id="apply" className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_0%,var(--glow-gold-deep),transparent_70%)]"
      />

      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <div className="text-center">
          <Reveal>
            <Eyebrow className="justify-center">{apply.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-7 font-display text-5xl font-light leading-none text-cream sm:text-6xl">
              {apply.heading}
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {apply.steps.map((s, i) => (
            <Reveal key={s.n} delay={0.08 * i}>
              <div>
                <span className="font-display text-3xl font-light text-gold/60">{s.n}</span>
                <div aria-hidden className="gold-rule-left mt-4 w-10" />
                <h3 className="mt-4 font-display text-xl font-light leading-snug text-cream">
                  {s.title}
                </h3>
                <p className="mt-3 text-pretty font-body text-sm font-light leading-relaxed text-cream/70">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-16 max-w-xl text-center">
            <p className="font-body text-sm font-light leading-relaxed text-cream/70">
              {apply.ageNote}
            </p>
            <p className="mt-3 font-body text-sm font-light leading-relaxed text-cream/70">
              {apply.healthNote}
            </p>
            <a
              href={apply.ctaHref}
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-9 py-4 font-body text-sm font-medium uppercase tracking-wide text-night-900 transition-all duration-500 hover:bg-gold-bright"
            >
              {apply.cta}
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
            <p className="mt-8">
              <a
                href={applyMailto()}
                className="font-body text-sm text-cream/60 underline decoration-gold/40 underline-offset-4 transition-colors duration-500 hover:text-cream"
              >
                {apply.secondaryCta}
              </a>
            </p>
            <p className="mt-3 font-body text-sm text-cream/40">{site.email}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
