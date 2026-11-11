import { facts, hero, site } from "@/lib/content";

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-16">
      <div className="hero-backdrop -z-10" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:pt-36">
        <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 font-mono text-xs text-mute">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
          </span>
          {site.availability}
        </p>

        <h1 className="mt-7 max-w-4xl text-balance text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          {hero.headlineStart}
          <span className="text-dawn">{hero.headlineAccent}</span>
          {hero.headlineEnd}
        </h1>

        <p className="mt-6 max-w-2xl text-xl text-ink/90 sm:text-2xl">{hero.sub}</p>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-mute sm:text-lg">
          I&apos;m {site.name}. {hero.intro}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="bg-dawn rounded-full px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            See the work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-line bg-surface/60 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-white/25"
          >
            Get in touch
          </a>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="bg-surface/90 p-5 backdrop-blur sm:p-6">
              <dt className="flex items-baseline gap-2">
                <span className="text-dawn text-3xl font-semibold tracking-tight sm:text-4xl">
                  {f.value}
                </span>
                <span className="text-sm font-medium text-ink">{f.label}</span>
              </dt>
              <dd className="mt-2 text-sm leading-snug text-mute">{f.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
