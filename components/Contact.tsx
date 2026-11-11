"use client";

import { useState, type FormEvent } from "react";
import { contact, site } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error";

const ERRORS: Record<string, string> = {
  invalid_fields: "Check your name and email, and write at least a sentence in the message.",
  not_configured: "The form isn't connected to email yet, so your message wasn't sent.",
  send_failed: "Your message couldn't be sent. Please try again in a minute.",
};

const field =
  "mt-1.5 w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-base text-ink placeholder:text-dim transition-colors focus:border-accent/70 focus:outline-none";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      const body = await res.json().catch(() => ({}));
      setError(ERRORS[body.error] ?? ERRORS.send_failed);
    } catch {
      setError(ERRORS.send_failed);
    }
    setStatus("error");
  }

  return (
    <section id="contact" className="relative isolate overflow-hidden border-t border-line">
      <div
        className="absolute left-1/2 top-0 -z-10 h-72 w-[48rem] max-w-full -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Contact</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
            {contact.title}
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-mute">{contact.body}</p>
          {site.links.email && (
            <p className="mt-6 text-sm text-mute">
              Or email{" "}
              <a
                href={`mailto:${site.links.email}`}
                className="text-ink underline decoration-accent/60 underline-offset-4"
              >
                {site.links.email}
              </a>
            </p>
          )}
        </div>

        {status === "sent" ? (
          <div
            role="status"
            className="flex flex-col justify-center rounded-2xl border border-ok/30 bg-ok/5 p-8"
          >
            <p className="text-2xl font-semibold tracking-tight">Message sent.</p>
            <p className="mt-2 text-mute">Thanks for getting in touch. I&apos;ll reply by email.</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 self-start rounded-full border border-line px-4 py-2 text-sm text-ink hover:border-white/25"
            >
              Send another
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-line bg-surface p-5 sm:p-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-ink">
                Name
                <input name="name" required autoComplete="name" maxLength={120} className={field} />
              </label>
              <label className="block text-sm font-medium text-ink">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  maxLength={200}
                  className={field}
                />
              </label>
            </div>
            <label className="mt-4 block text-sm font-medium text-ink">
              What do you need help with?
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={5000}
                rows={5}
                placeholder="The process, the tools involved, and what a good outcome looks like."
                className={`${field} resize-y`}
              />
            </label>

            {/* Honeypot for bots; hidden from people and assistive tech. */}
            <div className="hidden" aria-hidden="true">
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            {status === "error" && (
              <p role="alert" className="mt-4 rounded-lg border border-no/30 bg-no/5 px-3.5 py-2.5 text-sm text-no">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-dawn mt-5 w-full rounded-full px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
