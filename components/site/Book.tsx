import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Photo from "@/components/ui/Photo";
import { book, site } from "@/lib/content";

export default function Book() {
  return (
    <section
      id="book"
      className="relative overflow-hidden border-y border-gold/10 bg-night-800 py-28 sm:py-36"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_28%_50%,var(--glow-gold-deep),transparent_70%)]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        {/* the object */}
        <Reveal className="flex justify-center lg:justify-start">
          <div className="group relative">
            {/* glow behind the book */}
            <div
              aria-hidden
              className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,var(--glow-gold-strong),transparent)] blur-2xl"
            />
            {/* pedestal shadow */}
            <div
              aria-hidden
              className="absolute -bottom-6 left-1/2 -z-10 h-10 w-3/4 -translate-x-1/2 rounded-[50%] bg-night-900/90 blur-xl"
            />
            <div className="w-[230px] -rotate-2 overflow-hidden rounded-[3px] shadow-[0_30px_60px_-15px_var(--book-shadow)] ring-1 ring-[var(--book-ring)] transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:rotate-0 sm:w-[290px]">
              <Photo
                name="book-cover"
                sizes="(max-width: 1024px) 60vw, 290px"
                className="h-auto w-full"
              />
              {/* a lit edge along the spine */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-r from-white/25 to-transparent"
              />
            </div>
          </div>
        </Reveal>

        {/* the text */}
        <div>
          <Reveal>
            <Eyebrow>{book.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-5xl font-light leading-none text-cream sm:text-6xl">
              {book.title}
            </h2>
          </Reveal>
          <Reveal delay={0.13}>
            <p className="mt-4 max-w-md font-display text-xl italic leading-snug text-gold/90">
              {book.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-3 font-body text-sm uppercase tracking-wide text-cream/50">
              {book.author}
            </p>
          </Reveal>

          <div className="mt-8 max-w-xl space-y-5">
            {book.body.map((para, i) => (
              <Reveal key={i} delay={0.22 + i * 0.08}>
                <p className="text-pretty font-body text-base font-light leading-relaxed text-cream/75">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <a
              href={site.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-8 py-3.5 font-body text-sm font-medium uppercase tracking-wide text-night-900 transition-all duration-500 hover:bg-gold-bright"
            >
              {book.cta}
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
