/** New Dawn's architecture as three tiers: entry points, the engine, and what it talks to. */

const departments = [
  "HubSpot CRM",
  "Portal audit",
  "CRM cleanup",
  "Enrichment",
  "Lead scoring",
  "Forecasting",
  "Copywriter",
  "SEO",
  "Publishing",
  "Web services",
];

const guardrails = [
  { name: "Approval gate", note: "Changes wait for sign-off" },
  { name: "Audit log", note: "Every change recorded" },
  { name: "Retry layer", note: "Backoff on rate limits" },
  { name: "State ledger", note: "Data passed by reference" },
];

function Box({
  title,
  note,
  className = "",
}: {
  title: string;
  note?: string;
  className?: string;
}) {
  return (
    <div className={`rounded-lg border border-line bg-raised px-3.5 py-3 ${className}`}>
      <p className="text-sm font-medium text-ink">{title}</p>
      {note && <p className="mt-0.5 font-mono text-[11px] text-dim">{note}</p>}
    </div>
  );
}

function Connector({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center py-1" aria-hidden="true">
      <span className="h-5 w-px bg-gradient-to-b from-transparent to-accent/70" />
      <span className="rounded-full border border-line bg-bg px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-dim">
        {label}
      </span>
      <span className="h-5 w-px bg-gradient-to-b from-accent/70 to-transparent" />
    </div>
  );
}

function TierLabel({ children }: { children: string }) {
  return (
    <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-dim">{children}</p>
  );
}

export default function Architecture() {
  return (
    <figure className="rounded-2xl border border-line bg-surface p-4 sm:p-6">
      {/* Tier 1 */}
      <TierLabel>Where requests come from</TierLabel>
      <div className="grid gap-3 sm:grid-cols-3">
        <Box title="Public website" note="Next.js · audit and lead intake" />
        <Box title="Operator cockpit" note="React · chat and approvals" />
        <Box title="HubSpot OAuth app" note="Read-only scopes" />
      </div>

      <Connector label="HTTPS · SSE · Firebase auth" />

      {/* Tier 2 */}
      <div className="rounded-xl border border-accent/30 bg-accent/[0.04] p-4 sm:p-5">
        <TierLabel>Agent engine · FastAPI on Cloud Run</TierLabel>

        <div className="mx-auto max-w-sm rounded-lg border border-accent/50 bg-bg px-4 py-3 text-center">
          <p className="text-sm font-semibold text-ink">Agency Director</p>
          <p className="mt-0.5 font-mono text-[11px] text-dim">
            Plans, delegates and reports back
          </p>
        </div>

        <div className="flex justify-center" aria-hidden="true">
          <span className="h-5 w-px bg-accent/50" />
        </div>

        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {departments.map((d) => (
            <li
              key={d}
              className="rounded-md border border-line bg-raised px-2.5 py-2 text-center font-mono text-[11px] text-ink/85"
            >
              {d}
            </li>
          ))}
        </ul>

        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-line pt-4 lg:grid-cols-4">
          {guardrails.map((g) => (
            <div key={g.name} className="rounded-md border border-dashed border-white/15 px-3 py-2">
              <p className="text-xs font-medium text-ink">{g.name}</p>
              <p className="mt-0.5 font-mono text-[10px] text-dim">{g.note}</p>
            </div>
          ))}
        </div>
      </div>

      <Connector label="APIs · MCP" />

      {/* Tier 3 */}
      <TierLabel>What the agents work with</TierLabel>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Box title="HubSpot" note="CRM and CMS APIs" />
        <Box title="Zapier MCP" note="Slack · Gmail · Calendar · Sheets" />
        <Box title="Language models" note="Gemini · Claude · OpenAI" />
        <Box title="Firestore" note="Sessions and approvals" />
      </div>

      <figcaption className="sr-only">
        Architecture of New Dawn RevOps. Requests arrive from the public website, the operator
        cockpit and the HubSpot OAuth app. They reach a FastAPI agent engine on Cloud Run, where an
        Agency Director delegates to ten specialist departments behind an approval gate, audit log,
        retry layer and state ledger. The agents work with HubSpot, Zapier MCP, language models and
        Firestore.
      </figcaption>
    </figure>
  );
}
