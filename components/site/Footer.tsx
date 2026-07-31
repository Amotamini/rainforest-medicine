import Reveal from "@/components/ui/Reveal";
import { footer, site } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-gold/10 bg-night-900 py-20">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(197,116,47,0.12),transparent)]"
      />
      <div className="mx-auto max-w-5xl px-6 text-center sm:px-8">
        <Reveal>
          <p className="mx-auto max-w-xl text-balance font-display text-2xl font-light italic leading-snug text-cream/85 sm:text-3xl">
            {footer.blessing}
          </p>
        </Reveal>

        <div aria-hidden className="gold-rule mx-auto mt-12 w-20" />

        <div className="mt-12 flex flex-col items-center">
          <span className="font-display text-2xl font-medium tracking-wide text-cream">
            Rainforest Medicine
          </span>
          <span className="eyebrow mt-2 text-gold/70">Gatherings</span>
        </div>

        <a
          href={`mailto:${site.email}`}
          className="mt-7 inline-block font-body text-base text-cream/80 transition-colors hover:text-gold"
        >
          {site.email}
        </a>
        <p className="mt-2 font-body text-sm text-cream/45">{site.location}</p>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {footer.links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="font-body text-xs uppercase tracking-wide text-cream/55 transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 border-t border-white/5 pt-8">
          <p className="font-body text-xs leading-relaxed text-cream/35">
            {site.fullName} · © {year}
          </p>
          <p className="mt-2 font-body text-xs leading-relaxed text-cream/30">
            Photographs and words courtesy of the gatherings. Made with reverence for the
            elders of the upper Amazon.
          </p>
        </div>
      </div>
    </footer>
  );
}
