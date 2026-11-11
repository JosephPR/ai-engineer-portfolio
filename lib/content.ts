/**
 * All the words, links and placeholders on the site live in this file.
 * Edit here; the components just lay it out.
 *
 * Anything marked TODO is a placeholder waiting on you.
 * Links left as "" are hidden on the page until you fill them in.
 */

export const site = {
  name: "Joseph Reilly",
  role: "AI Automation Engineer",
  metaDescription:
    "Joseph Reilly builds multi-agent AI systems, CRM automation and integrations, with a human in control of every change that matters. Founder of New Dawn RevOps.",
  availability: "Available for contract and freelance work",
  links: {
    // TODO: add your links. Empty ones stay hidden.
    github: "https://github.com/JosephPR",
    linkedin: "https://www.linkedin.com/in/josephpr/",
    resume: "/joseph-reilly-resume.pdf", // the PDF lives in /public
    email: "reilly4181@gmail.com", // shown as a fallback under the contact form
  },
};

export const hero = {
  headlineStart: "I build AI agents that do ",
  headlineAccent: "real work",
  headlineEnd: " inside your business tools.",
  sub: "With a human in control of every change that matters.",
  intro:
    "I design and ship multi-agent systems, CRM automation and the integrations around them. My flagship build is New Dawn RevOps, a live platform where eleven AI agents audit, clean up and manage HubSpot.",
};

export const facts = [
  { value: "11", label: "AI agents", detail: "One director coordinating ten specialist departments" },
  { value: "24", label: "point CRM audit", detail: "Checks written as code and scored 0 to 100" },
  { value: "3", label: "services in production", detail: "Public site, agent engine and operator cockpit on Google Cloud" },
  { value: "Any", label: "model", detail: "Gemini by default, with Claude or OpenAI swappable per chat" },
];

export const caseStudy = {
  eyebrow: "Featured project",
  title: "New Dawn RevOps",
  url: "https://newdawnrevops.com",
  role: "Founder and sole engineer",
  summary:
    "A multi-agent platform that audits, cleans up and manages HubSpot CRMs. A prospect connects their portal with read-only access and gets a scored 24-point health audit. Behind it, an operator directs a team of AI departments from a cockpit and approves every change before it happens.",
  stack: [
    "Python",
    "FastAPI",
    "Google ADK",
    "LiteLLM",
    "MCP",
    "HubSpot API",
    "Firestore",
    "Firebase Auth",
    "Cloud Run",
    "Docker",
    "Next.js",
    "React",
    "TypeScript",
  ],
  decisions: [
    {
      title: "Nothing changes without sign-off",
      body: "CRM and CMS changes requested in the cockpit pause and wait for the operator. No answer within three minutes counts as a no, and if the approval system itself fails, the change is denied.",
      tag: "Human in the loop",
    },
    {
      title: "Scores come from code, not a model",
      body: "The 24-point audit and the lead scores are plain Python. The same portal gets the same score every time, and every result can be traced to a rule.",
      tag: "Deterministic",
    },
    {
      title: "Prospect portals are read-only",
      body: "The free audit asks HubSpot for read scopes only. The platform has no permission to write to a prospect's CRM, so it can't, whatever an agent decides.",
      tag: "Least privilege",
    },
    {
      title: "Outside content is data, never orders",
      body: "Text from websites, emails, CRM notes and form submissions is treated as information. If it contains instructions, the director ignores them and tells the operator.",
      tag: "Prompt-injection defence",
    },
    {
      title: "Every change leaves a record",
      body: "Changes to the CRM are written to an audit log with who, what and the outcome. HubSpot calls retry with exponential backoff when the API rate-limits or errors.",
      tag: "Audit and resilience",
    },
    {
      title: "Big data stays out of the prompt",
      body: "Large datasets, such as a full deal pipeline, are stored once and passed between agents by reference ID. Agents get what they need without filling the context window.",
      tag: "Context management",
    },
  ],
};

export const services = [
  {
    title: "AI agent systems",
    body: "Multi-agent workflows that take on real operational work: research, triage, drafting, data cleanup. Built with approvals, audit trails and clear limits on what each agent can touch.",
    points: ["Agent design and orchestration", "Approval and guardrail layers", "Model selection and cost control"],
  },
  {
    title: "HubSpot and CRM automation",
    body: "Years of agency HubSpot work, now paired with agents. Audits, deduplication, lead scoring and enrichment, forecasting, plus custom HubSpot apps and CMS builds.",
    points: ["CRM audits and cleanup", "Lead scoring and enrichment", "Custom HubSpot apps and CMS"],
  },
  {
    title: "Integrations and internal tools",
    body: "Connecting agents to the tools a team already uses, and building the dashboard to run them from. Slack, Gmail, Sheets, webhooks, MCP servers and custom APIs.",
    points: ["MCP and API integrations", "Operator dashboards", "Deployment on Google Cloud or Vercel"],
  },
];

export type Project = {
  placeholder?: boolean;
  title: string;
  kicker: string;
  body: string;
  points: string[];
  tags: string[];
  href: string; // "" for no link
  linkLabel: string;
};

// The section hides itself if every entry is a placeholder.
export const projects: Project[] = [
  {
    title: "Dawn Factory",
    kicker: "Self-improving prospecting pipeline",
    body: "Four independent agents find local businesses with outdated websites, build each one a redesign, quality-check it in a real browser and draft a personal email. A fifth studies the results and rewrites the others' instructions.",
    points: [
      "Agents never call each other. They pass work through a shared job board, so any one can crash, restart or be rewritten alone.",
      "Guardrails live in code: no send button exists, each agent has a tool allowlist, and a hook stops the builder browsing anything but the prospect's own site.",
      "A new prompt is adopted only if it beats the old one head to head on past jobs.",
      "In one logged run, the critic's feedback took a redesign from 72 to 86 out of 100, for $0.40 in model spend.",
    ],
    tags: ["Claude Agent SDK", "Python", "Playwright", "SQLite"],
    href: "",
    linkLabel: "",
  },
  {
    title: "BizOps Agent Suite",
    kicker: "White-label agents for small businesses",
    body: "A multi-client platform where five agents handle speed-to-lead, quote prep, client reporting, call follow-up and document intake. Each agent is a YAML file, so a new client's portal is configuration, not code.",
    points: [
      "Every client gets a separate portal with its own sign-in list, connected accounts and data.",
      "Anything an agent saves or sends waits for the client's approval, including actions in connected apps.",
      "Any agent can also run headlessly from a webhook, protected by a per-client secret.",
      "Automated tests cover portal access, data isolation between clients and the approval gate.",
    ],
    tags: ["Google ADK", "FastAPI", "React", "Firestore", "Zapier MCP", "Cloud Run"],
    href: "https://bizops-agents-1073320994553.us-central1.run.app/",
    linkLabel: "Live app (invite only)",
  },
];

// TODO: this bio is a draft written from what I know about you. Edit freely.
export const about = {
  headshot: "/headshot.jpg",
  paragraphs: [
    "I've been building for the web since 2019, and spent years as a HubSpot developer at an agency, shipping CMS builds, integrations and CRM work for B2B clients. That's where I saw how much of a revenue team's week goes to keeping the CRM clean.",
    "Now I build the AI systems that take that work on. I founded New Dawn RevOps and built its platform end to end: the agents, the backend, the operator cockpit and the public site.",
    "I care most about the unglamorous parts: approvals, audit logs, permissions and honest reporting. They're what make an agent safe to point at a real business.",
  ],
  // Taken from the résumé PDF. Keep the two in step.
  certifications: [
    "AWS Core Services",
    "HubSpot CMS for Developers I & II: Best Practices",
    "HubSpot CMS Implementation",
    "Integrating With HubSpot I: Foundations",
    "HubSpot CMS for Marketers",
    "Software Engineering (Flatiron School)",
  ] as string[],
};

export const contact = {
  title: "Have work an agent could be doing?",
  body: "Tell me what's eating your team's time. I'll reply with whether it's a good fit for automation and how I'd approach it.",
};
