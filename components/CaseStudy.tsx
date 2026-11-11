import { caseStudy } from "@/lib/content";
import AgentReplay from "./AgentReplay";
import Architecture from "./Architecture";
import Reveal from "./Reveal";

function SubHeading({ index, children }: { index: string; children: string }) {
  return (
    <h3 className="mb-6 flex items-baseline gap-3 text-xl font-semibold tracking-tight sm:text-2xl">
      <span className="font-mono text-sm font-normal text-accent">{index}</span>
      {children}
    </h3>
  );
}

export default function CaseStudy() {
  return (
    <section id="work" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            {caseStudy.eyebrow}
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {caseStudy.title}
            </h2>
            <a
              href={caseStudy.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-accent/60"
            >
              <span className="h-2 w-2 rounded-full bg-ok" aria-hidden="true" />
              Live at newdawnrevops.com
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
          <p className="mt-2 font-mono text-sm text-mute">{caseStudy.role}</p>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-mute">{caseStudy.summary}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {caseStudy.stack.map((s) => (
              <li
                key={s}
                className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-mute"
              >
                {s}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-16">
          <SubHeading index="01">Watch it work</SubHeading>
          <AgentReplay />
        </Reveal>

        <Reveal className="mt-20">
          <SubHeading index="02">How it fits together</SubHeading>
          <Architecture />
        </Reveal>

        <div className="mt-20">
          <Reveal>
            <SubHeading index="03">Decisions that make it safe to run</SubHeading>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudy.decisions.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 80}>
                <article className="h-full rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent/40">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
                    {d.tag}
                  </p>
                  <h4 className="mt-2 text-lg font-semibold tracking-tight">{d.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-mute">{d.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
