import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Photo from "@/components/ui/Photo";
import { intentions } from "@/lib/content";

export default function Intentions() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-40">
      {/* darkened sunset as ground */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Photo
          name="sunset1"
          fill
          sizes="100vw"
          position="center"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/80 to-night" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_50%,transparent,rgba(5,9,7,0.7))]" />
      </div>

      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <div className="text-center">
          <Reveal>
            <Eyebrow className="justify-center">{intentions.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-7 font-display text-4xl font-light leading-tight text-cream sm:text-5xl">
              {intentions.heading}
            </h2>
          </Reveal>
        </div>

        <ul className="mx-auto mt-14 grid max-w-4xl gap-x-12 gap-y-7 sm:grid-cols-2">
          {intentions.items.map((item, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <li className="flex items-start gap-4">
                <span
                  aria-hidden
                  className="mt-1.5 text-sm text-gold/70 animate-emberPulse"
                  style={{ animationDelay: `${i * 0.6}s` }}
                >
                  ◊
                </span>
                <span className="text-pretty font-display text-xl font-light leading-snug text-cream/85">
                  {item}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
