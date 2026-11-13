"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { LOGIN_URL, REGISTER_URL } from "./links";

type Item = { title: string; description: string; href: string; icon: ReactNode };
type NavEntry =
  | { label: string; items: Item[] }
  | { label: string; href: string };

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const ICONS = {
  users: icon("M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM21 20v-1a4 4 0 0 0-3-3.9M16 4.1a3.5 3.5 0 0 1 0 6.8"),
  megaphone: icon("M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1ZM15 9a4 4 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11"),
  desktop: icon("M3 5h18v11H3zM8 20h8M12 16v4"),
  code: icon("M8 8l-4 4 4 4M16 8l4 4-4 4"),
  book: icon("M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M9 7h6"),
  info: icon("M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 11v5M12 8l.01 0"),
};

// Edit this list to change the navbar. `items` = dropdown, `href` = plain link.
// Routes below are placeholders until those pages exist.
const NAV: NavEntry[] = [
  {
    label: "Product",
    items: [
      { title: "Communities", description: "Guild-based communities with their own page.", href: "/communities", icon: ICONS.users },
      { title: "Announcements", description: "Owner and admin posts for your members.", href: "/announcements", icon: ICONS.megaphone },
      { title: "Windows Editor", description: "The native Colbe editor for Windows.", href: "/editor", icon: ICONS.desktop },
      { title: "API", description: "Build on top of Colbe.", href: "/api-docs", icon: ICONS.code },
    ],
  },
  {
    label: "Company",
    items: [
      { title: "About", description: "What Colbe is and where it's going.", href: "/about", icon: ICONS.info },
      { title: "Docs", description: "Guides and documentation.", href: "/docs", icon: ICONS.book },
    ],
  },
  { label: "Pricing", href: "/pricing" },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export function Navbar() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Close on outside click / Escape.
  useEffect(() => {
    const down = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(null);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("pointerdown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("keydown", key);
    };
  }, []);

  const close = () => {
    setOpen(null);
    setMobile(false);
  };

  const trigger = "inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-hover";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <nav ref={ref} className="relative mx-auto flex h-16 w-full max-w-6xl items-center gap-2 px-6" aria-label="Main">
        <Link href="/" onClick={close} className="mr-4 text-xl font-extrabold tracking-tight">
          Colbe
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((entry) => (
            <li key={entry.label} className="relative">
              {"items" in entry ? (
                <>
                  <button
                    type="button"
                    aria-expanded={open === entry.label}
                    aria-haspopup="true"
                    onClick={() => setOpen(open === entry.label ? null : entry.label)}
                    className={`${trigger} ${open === entry.label ? "bg-hover" : ""}`}
                  >
                    {entry.label}
                    <Chevron open={open === entry.label} />
                  </button>
                  {open === entry.label && (
                    <div className="absolute left-0 top-full z-50 mt-2 w-[34rem] rounded-2xl border border-border bg-popover p-2 shadow-xl">
                      <ul className="grid grid-cols-2 gap-1">
                        {entry.items.map((it) => (
                          <li key={it.title}>
                            <Link href={it.href} onClick={close} className="flex gap-3 rounded-xl p-3 transition-colors hover:bg-hover">
                              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-card">
                                {it.icon}
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-semibold">{it.title}</span>
                                <span className="block text-sm leading-5 text-muted-foreground">{it.description}</span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <Link href={entry.href} onClick={close} className={trigger}>
                  {entry.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <Link href={LOGIN_URL} className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-hover">
            Sign In
          </Link>
          <Link href={REGISTER_URL} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={mobile}
          onClick={() => setMobile((m) => !m)}
          className="ml-auto grid size-10 place-items-center rounded-lg border border-border md:hidden"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d={mobile ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} />
          </svg>
        </button>

        {mobile && (
          <div className="absolute inset-x-0 top-full border-b border-border bg-background p-4 md:hidden">
            {NAV.map((entry) =>
              "items" in entry ? (
                <div key={entry.label} className="py-2">
                  <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{entry.label}</p>
                  {entry.items.map((it) => (
                    <Link key={it.title} href={it.href} onClick={close} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-hover">
                      {it.title}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link key={entry.label} href={entry.href} onClick={close} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-hover">
                  {entry.label}
                </Link>
              ),
            )}
            <div className="mt-3 flex gap-2">
              <Link href={LOGIN_URL} className="flex-1 rounded-lg border border-border px-4 py-2 text-center text-sm font-medium">Sign In</Link>
              <Link href={REGISTER_URL} className="flex-1 rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground">Get Started</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}