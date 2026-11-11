"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * A scripted replay of one New Dawn workflow: the operator asks for a CRM
 * cleanup, the director delegates, and a permanent change waits for approval.
 * Nothing here calls a model or a CRM; the records are sample data.
 */

type AgentId =
  | "agency_director"
  | "hubspot_crm"
  | "portal_audit"
  | "crm_cleanup"
  | "enrichment"
  | "lead_scoring"
  | "revenue_forecaster"
  | "copywriter"
  | "seo"
  | "publishing"
  | "web_services";

const AGENTS: { id: AgentId; label: string }[] = [
  { id: "agency_director", label: "Director" },
  { id: "hubspot_crm", label: "HubSpot CRM" },
  { id: "portal_audit", label: "Portal audit" },
  { id: "crm_cleanup", label: "CRM cleanup" },
  { id: "enrichment", label: "Enrichment" },
  { id: "lead_scoring", label: "Lead scoring" },
  { id: "revenue_forecaster", label: "Forecasting" },
  { id: "copywriter", label: "Copywriter" },
  { id: "seo", label: "SEO" },
  { id: "publishing", label: "Publishing" },
  { id: "web_services", label: "Web services" },
];

type Step =
  | { kind: "operator"; text: string; delay: number }
  | { kind: "director"; text: string; delay: number }
  | { kind: "tool"; agent: AgentId; call: string; result: string; delay: number }
  | { kind: "approval"; delay: number }
  | { kind: "log"; text: string; ok: boolean; delay: number };

const SCRIPT: Step[] = [
  {
    kind: "operator",
    text: "Find duplicate contacts and stale deals in our portal.",
    delay: 500,
  },
  {
    kind: "director",
    text: "Working in New Dawn's own HubSpot portal. Sending this to the CRM cleanup department.",
    delay: 1300,
  },
  {
    kind: "tool",
    agent: "crm_cleanup",
    call: "find_duplicate_contacts()",
    result: "3 duplicate groups, matched on email",
    delay: 1200,
  },
  {
    kind: "tool",
    agent: "crm_cleanup",
    call: "find_stale_deals(days_without_update=30)",
    result: "5 open deals with no update in 30+ days",
    delay: 1200,
  },
  {
    kind: "director",
    text: "Found 3 duplicate contact groups and 5 stale deals. I recommend merging each duplicate into its oldest record, which holds the longest history. I haven't changed anything. Which fixes do you want?",
    delay: 1500,
  },
  { kind: "operator", text: "Merge the first group.", delay: 1500 },
  {
    kind: "tool",
    agent: "crm_cleanup",
    call: 'merge_contacts(primary="4821", duplicate="9034")',
    result: "Paused. Waiting for operator approval.",
    delay: 1200,
  },
  { kind: "approval", delay: 700 },
];

const OUTCOME: Record<"approved" | "rejected", Step[]> = {
  approved: [
    {
      kind: "log",
      ok: true,
      text: "audit_log  merge_contacts  contact 9034 → 4821  approved  success",
      delay: 700,
    },
    {
      kind: "director",
      text: "Done. The duplicate was merged into contact 4821 and the change is in the audit log. Two duplicate groups and five stale deals are still open.",
      delay: 1100,
    },
  ],
  rejected: [
    {
      kind: "log",
      ok: false,
      text: "approval  merge_contacts  contact 9034 → 4821  rejected  no change",
      delay: 700,
    },
    {
      kind: "director",
      text: "You rejected the merge, so nothing was changed. I won't try it another way. All three duplicate groups and five stale deals are still open.",
      delay: 1100,
    },
  ],
};

function activeAgent(step: Step | undefined): AgentId | null {
  if (!step) return null;
  if (step.kind === "tool") return step.agent;
  if (step.kind === "director") return "agency_director";
  if (step.kind === "approval" || step.kind === "log") return "crm_cleanup";
  return null;
}

export default function AgentReplay() {
  const rootRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);
  const [decision, setDecision] = useState<"approved" | "rejected" | null>(null);

  const steps = useMemo(
    () => (decision ? [...SCRIPT, ...OUTCOME[decision]] : SCRIPT),
    [decision],
  );
  const visible = steps.slice(0, count);
  const playing = started && count < steps.length;
  const awaiting = !decision && count >= SCRIPT.length;
  const current = activeAgent(visible[visible.length - 1]);

  // Start the first time the panel scrolls into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Reveal one step at a time. With reduced motion, show them all at once.
  useEffect(() => {
    if (!started || count >= steps.length) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(
      () => setCount(reduce ? steps.length : count + 1),
      reduce ? 0 : steps[count].delay,
    );
    return () => clearTimeout(t);
  }, [started, count, steps]);

  // Keep the newest step in view inside the feed (never scrolls the page).
  useEffect(() => {
    const feed = feedRef.current;
    if (feed) feed.scrollTo({ top: feed.scrollHeight, behavior: "smooth" });
  }, [count]);

  function restart() {
    setDecision(null);
    setCount(0);
    setStarted(true);
  }

  return (
    <div
      ref={rootRef}
      className="overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/50"
    >
      {/* Window bar */}
      <div className="flex items-center justify-between gap-3 border-b border-line bg-raised px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <span className="truncate font-mono text-xs text-mute">operator cockpit</span>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="rounded-full border border-accent/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
            Simulation
          </span>
          <button
            type="button"
            onClick={restart}
            className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-mute transition-colors hover:border-white/25 hover:text-ink"
          >
            ↻ Replay
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[13rem_minmax(0,1fr)]">
        {/* Agent roster */}
        <aside className="min-w-0 border-b border-line p-3 lg:border-b-0 lg:border-r lg:p-4">
          <p className="mb-2 hidden font-mono text-[10px] uppercase tracking-wider text-dim lg:block">
            Agents
          </p>
          <ul className="flex gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {AGENTS.map((a) => {
              const on = a.id === current;
              return (
                <li
                  key={a.id}
                  className={`flex shrink-0 items-center gap-2 rounded-md border px-2.5 py-1.5 font-mono text-xs transition-colors duration-300 ${
                    on
                      ? "border-accent/60 bg-accent/10 text-ink"
                      : "border-transparent text-dim"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      on ? "pulse-ring bg-accent" : "bg-white/20"
                    }`}
                  />
                  {a.label}
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Feed */}
        <div
          ref={feedRef}
          role="log"
          aria-label="Simulated agent run"
          className="flex h-[30rem] min-w-0 flex-col gap-3 overflow-y-auto p-4 sm:p-5"
        >
          {visible.map((step, i) => (
            <StepView
              key={`${decision ?? "run"}-${i}`}
              step={step}
              decision={decision}
              onDecide={(d) => setDecision(d)}
            />
          ))}
          {playing && (
            <p className="font-mono text-xs text-dim" aria-hidden="true">
              <span className="blink">▍</span>
            </p>
          )}
          {!started && (
            <p className="m-auto font-mono text-xs text-dim">Scroll to start the replay</p>
          )}
        </div>
      </div>

      <p className="border-t border-line bg-raised px-4 py-2.5 font-mono text-[11px] leading-relaxed text-dim">
        {awaiting
          ? "Your turn: approve or reject the merge above. Either way, watch what the director does next."
          : "Scripted replay of a real New Dawn workflow, using sample records. No model or CRM is called."}
      </p>
    </div>
  );
}

function StepView({
  step,
  decision,
  onDecide,
}: {
  step: Step;
  decision: "approved" | "rejected" | null;
  onDecide: (d: "approved" | "rejected") => void;
}) {
  if (step.kind === "operator") {
    return (
      <div className="step-in ml-auto max-w-[85%]">
        <p className="mb-1 text-right font-mono text-[10px] uppercase tracking-wider text-dim">
          Operator
        </p>
        <p className="rounded-2xl rounded-tr-sm bg-white/10 px-4 py-2.5 text-sm leading-relaxed text-ink">
          {step.text}
        </p>
      </div>
    );
  }

  if (step.kind === "director") {
    return (
      <div className="step-in max-w-[90%]">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-accent">
          Director
        </p>
        <p className="rounded-2xl rounded-tl-sm border border-line bg-raised px-4 py-2.5 text-sm leading-relaxed text-ink/90">
          {step.text}
        </p>
      </div>
    );
  }

  if (step.kind === "tool") {
    return (
      <div className="step-in rounded-lg border border-line bg-black/40 px-3.5 py-2.5 font-mono text-xs leading-relaxed">
        <p className="break-words text-mute">
          <span className="text-accent">crm_cleanup_agent</span>
          <span className="text-dim"> › </span>
          {step.call}
        </p>
        <p className="mt-1 break-words text-ink/80">
          <span className="text-dim">↳ </span>
          {step.result}
        </p>
      </div>
    );
  }

  if (step.kind === "log") {
    return (
      <p
        className={`step-in break-words rounded-lg border px-3.5 py-2.5 font-mono text-xs ${
          step.ok
            ? "border-ok/30 bg-ok/5 text-ok"
            : "border-no/30 bg-no/5 text-no"
        }`}
      >
        {step.ok ? "✓ " : "✕ "}
        {step.text}
      </p>
    );
  }

  // Approval card
  return (
    <div
      className={`step-in rounded-xl border p-4 transition-colors ${
        decision ? "border-line bg-raised" : "border-accent/60 bg-accent/[0.07]"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-ink">Approval needed: merge contacts</p>
        <span
          className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
            decision === "approved"
              ? "bg-ok/15 text-ok"
              : decision === "rejected"
                ? "bg-no/15 text-no"
                : "bg-accent/20 text-accent"
          }`}
        >
          {decision ?? "Pending"}
        </span>
      </div>
      <dl className="mt-3 grid gap-x-4 gap-y-1 font-mono text-xs sm:grid-cols-[5rem_1fr]">
        <dt className="text-dim">Keep</dt>
        <dd className="text-ink/90">#4821 Dana Whitfield, created 2023</dd>
        <dt className="text-dim">Merge in</dt>
        <dd className="text-ink/90">#9034 D. Whitfield, created 2025</dd>
        <dt className="text-dim">Portal</dt>
        <dd className="text-ink/90">New Dawn (own portal)</dd>
      </dl>
      <p className="mt-3 text-xs text-mute">
        Merges are permanent. With no answer in 3 minutes, the request is denied.
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          disabled={!!decision}
          onClick={() => onDecide("approved")}
          className="bg-dawn rounded-lg px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Approve
        </button>
        <button
          type="button"
          disabled={!!decision}
          onClick={() => onDecide("rejected")}
          className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
