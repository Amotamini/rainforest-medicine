import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { teachers } from "@/lib/content";

export default function Teachers() {
  return (
    <section id="teachers" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">
        <Reveal>
          <Eyebrow className="justify-center">{teachers.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-7 font-display text-4xl font-light leading-none text-cream sm:text-5xl">
            {teachers.heading}
          </h2>
        </Reveal>

        {teachers.list.length === 0 ? (
          <Reveal delay={0.14}>
            <p className="mx-auto mt-8 max-w-xl rounded-sm border border-dashed border-gold/25 px-6 py-5 font-body text-base italic leading-relaxed text-cream/45">
              {teachers.intro}
            </p>
          </Reveal>
        ) : (
          <>
            <Reveal delay={0.14}>
              <p className="mx-auto mt-7 max-w-xl font-body text-base font-light leading-relaxed text-cream/75">
                {teachers.intro}
              </p>
            </Reveal>
            <div className="mt-14 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
              {teachers.list.map((t, i) => (
                <Reveal key={t.name} delay={0.06 * i}>
                  <article className="h-full rounded-sm border border-gold/15 bg-night-700/40 p-6">
                    <h3 className="font-display text-xl font-light text-cream">{t.name}</h3>
                    <p className="mt-1 font-body text-xs uppercase tracking-wide text-gold/70">
                      {t.role}
                    </p>
                    <p className="mt-3 font-body text-sm font-light leading-relaxed text-cream/70">
                      {t.bio}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
