import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { testimonials } from "@/lib/content";

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="text-center">
          <Reveal>
            <Eyebrow className="justify-center">{testimonials.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-7 font-display text-4xl font-light leading-none text-cream sm:text-5xl">
              {testimonials.heading}
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.items.map((t, i) => (
            <Reveal key={i} delay={0.08 * i}>
              <article className="flex h-full flex-col rounded-sm border border-gold/20 bg-night-800/50 p-7 sm:p-8">
                <p className="text-pretty font-display text-lg font-light italic leading-relaxed text-cream/85">
                  “{t.quote}”
                </p>
                <div className="mt-auto pt-6">
                  <div aria-hidden className="gold-rule-left w-10" />
                  <p className="mt-4 font-body text-sm text-cream/75">{t.name}</p>
                  {t.role && (
                    <p className="mt-1 font-body text-xs uppercase tracking-wide text-cream/45">
                      {t.role}
                    </p>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
