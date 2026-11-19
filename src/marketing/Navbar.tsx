"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BookOpen, CaretDown, Code, Desktop, Info, List, X } from "@phosphor-icons/react";
import { LightDark } from "@/packages/ui/light-dark";
import { LOGIN_URL, REGISTER_URL } from "./links";

type Item = { title: string; description: string; href: string; icon: ReactNode };
type NavEntry =
  | { label: string; items: Item[] }
  | { label: string; href: string };

// Edit this list to change the navbar. `items` = dropdown, `href` = plain link.
// Routes below are placeholders until those pages exist.
const NAV: NavEntry[] = [
  {
    label: "Build",
    items: [
      { title: "Windows Editor", description: "The native Colbe editor for Windows.", href: "/editor", icon: <Desktop weight="bold" className="size-5" /> },
      { title: "API", description: "Build on top of Colbe.", href: "/api-docs", icon: <Code weight="bold" className="size-5" /> },
    ],
  },
  {
    label: "Company",
    items: [
      { title: "About", description: "What Colbe is and where it's going.", href: "/about", icon: <Info weight="bold" className="size-5" /> },
      { title: "Docs", description: "Guides and documentation.", href: "/docs", icon: <BookOpen weight="bold" className="size-5" /> },
    ],
  },
];

export function Navbar() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLElement>(null);

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

  const trigger =
    "inline-flex items-center gap-1.5 rounded-[15px] px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-hover hover:text-foreground";
  const ghost =
    "px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground";
  const cta =
    "inline-flex items-center bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav ref={ref} className="relative mx-auto flex h-16 w-full max-w-[1400px] items-center gap-2 px-6 md:px-10" aria-label="Main">
        <Link href="/" onClick={close} className="mr-4 flex items-center gap-2.5 font-[family-name:var(--font-instrument-serif)] text-2xl">
          <img src="https://github.com/ColbemLLC.png" alt="" width={28} height={28} className="size-7" />
          Colbe
        </Link>

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
                    className={`${trigger} ${open === entry.label ? "bg-hover text-foreground" : ""}`}
                  >
                    {entry.label}
                    <CaretDown
                      weight="bold"
                      className={`size-3.5 transition-transform duration-200 ${open === entry.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open === entry.label && (
                    <div className="absolute left-0 top-full z-50 mt-3 w-[22rem] overflow-hidden rounded-[15px] border border-border bg-card">
                      <ul>
                        {entry.items.map((it) => (
                          <li key={it.title} className="border-b border-border last:border-b-0">
                            <Link href={it.href} onClick={close} className="flex gap-3 p-3 transition-colors hover:bg-hover">
                              <span className="grid size-10 shrink-0 place-items-center rounded-[15px] border border-border bg-muted text-foreground">
                                {it.icon}
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-medium">{it.title}</span>
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
          <LightDark />
          <Link href={LOGIN_URL} className={ghost}>
            Sign In
          </Link>
          <Link href={REGISTER_URL} className={cta}>
            Get Started
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2 md:hidden">
          <LightDark />
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={mobile}
            onClick={() => setMobile((m) => !m)}
            className="grid size-10 place-items-center rounded-[15px] border border-border"
          >
            {mobile ? <X weight="bold" className="size-5" /> : <List weight="bold" className="size-5" />}
          </button>
        </div>

        {mobile && (
          <div className="absolute inset-x-0 top-full border-b border-border bg-background p-4 md:hidden">
            {NAV.map((entry) =>
              "items" in entry ? (
                <div key={entry.label} className="py-2">
                  <p className="px-3 pb-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">{entry.label}</p>
                  {entry.items.map((it) => (
                    <Link key={it.title} href={it.href} onClick={close} className="block rounded-[15px] px-3 py-2 text-sm hover:bg-hover">
                      {it.title}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link key={entry.label} href={entry.href} onClick={close} className="block rounded-[15px] px-3 py-2 text-sm hover:bg-hover">
                  {entry.label}
                </Link>
              ),
            )}
            <div className="mt-3 flex items-center gap-3">
              <Link href={LOGIN_URL} onClick={close} className={`${ghost} flex-1 border border-border text-center`}>
                Sign In
              </Link>
              <Link href={REGISTER_URL} onClick={close} className={`${cta} flex-1 justify-center`}>
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}