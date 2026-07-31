import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Photo from "@/components/ui/Photo";
import Parallax from "@/components/ui/Parallax";
import { gathering } from "@/lib/content";

export default function Gathering() {
  return (
    <section id="gathering" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* candlelit circle */}
        <Reveal className="order-2 lg:order-1">
          <div className="group relative aspect-[5/4] overflow-hidden rounded-sm ring-1 ring-gold/15">
            <Parallax distance={40} className="absolute inset-0 scale-110">
              <Photo
                name="circle"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                position="center"
                className="object-cover"
              />
            </Parallax>
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5"
            />
          </div>
        </Reveal>

        {/* text */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <Eyebrow>{gathering.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 text-balance font-display text-4xl font-light leading-[1.05] text-cream sm:text-5xl">
              {gathering.heading}
            </h2>
          </Reveal>
          <div className="mt-8 space-y-6">
            {gathering.body.map((para, i) => (
              <Reveal key={i} delay={0.14 + i * 0.08}>
                <p className="text-pretty font-body text-base font-light leading-relaxed text-cream/75 sm:text-lg">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div className="mt-10 border-l-2 border-gold/40 pl-6">
              <p className="font-display text-lg italic leading-relaxed text-cream/85">
                {gathering.note}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
