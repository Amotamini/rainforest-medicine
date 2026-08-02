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

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <Reveal key={i} delay={0.1 * i}>
              <article className="flex h-full flex-col rounded-sm border border-dashed border-gold/25 bg-night-800/40 p-7">
                <p className="font-display text-lg italic leading-relaxed text-cream/45">
                  “{t.quote}”
                </p>
                <p className="mt-6 font-body text-sm italic text-cream/40">{t.name}</p>
                <p className="mt-1 font-body text-xs uppercase tracking-wide italic text-cream/30">
                  {t.gathering}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
