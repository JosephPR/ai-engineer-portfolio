import { site } from "@/lib/content";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/75 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <a href="#top" className="font-mono text-sm tracking-tight text-ink">
          <span className="text-accent">~/</span>
          {site.name.toLowerCase().replace(/\s+/g, "-")}
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden rounded-md px-3 py-2 text-sm text-mute transition-colors hover:text-ink sm:block"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-dawn ml-2 rounded-full px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Get in touch
          </a>
        </div>
      </nav>
    </header>
  );
}
