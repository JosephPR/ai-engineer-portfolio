import Image from "next/image";
import { about, projects, services, site } from "@/lib/content";
import Reveal from "./Reveal";

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal>
      <p className="font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>
      <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="services" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeader eyebrow="Services" title="What I can build for you" />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <article className="flex h-full flex-col rounded-xl border border-line bg-surface p-6">
                <p className="font-mono text-sm text-accent">0{i + 1}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{s.body}</p>
                <ul className="mt-5 space-y-2 border-t border-line pt-5 text-sm text-ink/85">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  // Hide the whole section until at least one real project replaces a placeholder.
  if (projects.every((p) => p.placeholder)) return null;

  return (
    <section id="projects" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeader eyebrow="More work" title="Other projects" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const body = (
              <article
                className={`flex h-full flex-col rounded-xl border p-6 ${
                  p.placeholder
                    ? "border-dashed border-white/15 bg-transparent"
                    : "border-line bg-surface transition-colors hover:border-accent/40"
                }`}
              >
                {p.placeholder && (
                  <p className="font-mono text-[10px] uppercase tracking-wider text-dim">
                    Placeholder
                  </p>
                )}
                <h3
                  className={`mt-2 text-lg font-semibold tracking-tight ${
                    p.placeholder ? "text-mute" : "text-ink"
                  }`}
                >
                  {p.title}
                </h3>
                <p className={`mt-2 text-sm leading-relaxed ${p.placeholder ? "text-dim" : "text-mute"}`}>
                  {p.body}
                </p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                  {p.tags.map((t, j) => (
                    <li
                      key={`${t}-${j}`}
                      className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-dim"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            );
            return (
              <Reveal key={p.title} delay={i * 80}>
                {p.href ? (
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                    {body}
                  </a>
                ) : (
                  body
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function About() {
  const links = [
    { label: "GitHub", href: site.links.github },
    { label: "LinkedIn", href: site.links.linkedin },
    { label: "Résumé", href: site.links.resume },
  ].filter((l) => l.href);

  return (
    <section id="about" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[20rem_1fr] lg:gap-16">
        <Reveal>
          <div className="relative mx-auto w-full max-w-xs lg:mx-0">
            <div
              className="bg-dawn absolute -inset-px rounded-2xl opacity-60 blur-xl"
              aria-hidden="true"
            />
            <Image
              src={about.headshot}
              alt={`Portrait of ${site.name}`}
              width={640}
              height={640}
              className="relative aspect-square w-full rounded-2xl border border-line object-cover"
            />
          </div>
        </Reveal>

        <div>
          <SectionHeader eyebrow="About" title={`${site.name}, ${site.role}`} />
          <Reveal className="mt-6 space-y-4 text-base leading-relaxed text-mute sm:text-lg">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>

          {about.certifications.length > 0 && (
            <Reveal className="mt-8">
              <h3 className="font-mono text-xs uppercase tracking-wider text-dim">Certifications</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {about.certifications.map((c) => (
                  <li key={c} className="rounded-full border border-line px-3 py-1 text-sm text-ink/85">
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {links.length > 0 && (
            <Reveal className="mt-8 flex flex-wrap gap-3">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-accent/60"
                >
                  {l.label} ↗
                </a>
              ))}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-dim sm:flex-row sm:px-6">
        <p>© {site.name}</p>
        <p className="font-mono text-xs">
          Founder of{" "}
          <a
            href="https://newdawnrevops.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mute underline decoration-white/20 underline-offset-4 hover:text-ink"
          >
            New Dawn RevOps
          </a>
        </p>
      </div>
    </footer>
  );
}
