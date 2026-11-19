"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, CaretDown, Code, Desktop, List, X } from "@phosphor-icons/react";
import { LightDark } from "@/packages/ui/light-dark";
import { LOGIN_URL } from "./links";

type Item = { title: string; description: string; href: string; icon: ReactNode };
type Tab = { label: string; href: string } | { label: string; items: Item[] };

// Edit this list to change the navbar. `items` = dropdown, `href` = plain tab.
// Routes below are placeholders until those pages exist.
const TABS: Tab[] = [
  { label: "readme", href: "/" },
  { label: "docs", href: "/docs" },
  {
    label: "build",
    items: [
      { title: "Windows Editor", description: "The native Colbe editor for Windows.", href: "/editor", icon: <Desktop weight="bold" className="size-4" /> },
      { title: "API", description: "Build on top of Colbe.", href: "/api-docs", icon: <Code weight="bold" className="size-4" /> },
    ],
  },
  { label: "about", href: "/about" },
];

const tabText = "font-mono text-xs uppercase tracking-wider whitespace-nowrap";

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center gap-2.5 font-[family-name:var(--font-instrument-serif)] text-2xl">
      <img src="https://github.com/ColbemLLC.png" alt="" width={24} height={24} className="size-6" />
      Colbe
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const down = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(null);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    document.addEventListener("pointerdown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("keydown", key);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mql.matches) setMobile(false);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const within = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const isActive = (t: Tab) =>
    "items" in t ? t.items.some((i) => within(i.href)) : within(t.href);

  return (
    <>
      <header ref={ref} className="fixed inset-x-0 top-0 z-50 flex h-14 items-stretch">
        <div className="hidden w-[40%] shrink-0 items-center px-8 lg:flex">
          <Brand />
        </div>

        <nav
          aria-label="Main"
          className="hidden flex-1 items-stretch border-b border-border bg-background lg:flex lg:border-l"
        >
          {TABS.map((t) => {
            const active = isActive(t);
            const base = `flex h-full w-full items-center justify-center gap-1.5 border-r border-border px-4 transition-colors ${
              active ? "border-b-2 border-b-foreground/60" : "hover:bg-foreground/[0.04]"
            }`;
            const tone = active ? "text-foreground" : "text-muted-foreground";
            return (
              <div key={t.label} className="relative flex-1">
                {"items" in t ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={open === t.label}
                      aria-haspopup="true"
                      onClick={() => setOpen(open === t.label ? null : t.label)}
                      className={`${base} ${open === t.label && !active ? "bg-foreground/[0.04]" : ""}`}
                    >
                      <span className={`${tabText} ${tone}`}>{t.label}</span>
                      <CaretDown
                        weight="bold"
                        className={`size-2.5 text-muted-foreground transition-transform duration-200 ${open === t.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {open === t.label && (
                      <div className="absolute left-0 top-full z-50 w-[340px] max-w-[calc(100vw-2rem)] border border-border bg-background">
                        <ul className="divide-y divide-border">
                          {t.items.map((it) => (
                            <li key={it.title}>
                              <Link
                                href={it.href}
                                onClick={() => setOpen(null)}
                                className="flex items-start gap-3 p-4 transition-colors hover:bg-foreground/[0.04]"
                              >
                                <span className="flex size-8 shrink-0 items-center justify-center border border-border text-foreground/70">
                                  {it.icon}
                                </span>
                                <span className="flex flex-col gap-0.5">
                                  <span className="text-[13px] font-medium text-foreground">{it.title}</span>
                                  <span className="text-[11px] leading-relaxed text-muted-foreground">{it.description}</span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={t.href} className={base}>
                    <span className={`${tabText} ${tone}`}>{t.label}</span>
                  </Link>
                )}
              </div>
            );
          })}
          <Link
            href={LOGIN_URL}
            className="flex shrink-0 items-center gap-1.5 bg-foreground px-5 text-background transition-opacity hover:opacity-90"
          >
            <span className={tabText}>sign-in</span>
            <ArrowUpRight weight="bold" className="size-2.5 opacity-50" />
          </Link>
        </nav>

        <div className="flex w-full items-center justify-between border-b border-border bg-background pl-4 pr-2 lg:hidden">
          <Brand onClick={() => setMobile(false)} />
          <div className="flex items-center gap-1">
            <LightDark />
            <button
              type="button"
              aria-label={mobile ? "Close menu" : "Open menu"}
              aria-expanded={mobile}
              onClick={() => setMobile((m) => !m)}
              className="grid size-9 place-items-center text-foreground/70 transition-colors hover:text-foreground"
            >
              {mobile ? <X weight="bold" className="size-5" /> : <List weight="bold" className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobile && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-40 flex flex-col bg-background/95 pt-14 backdrop-blur-sm lg:hidden"
        >
          <div className="min-h-0 flex-1 overflow-y-auto">
            {TABS.map((t) =>
              "items" in t ? (
                <div key={t.label} className="border-b border-border">
                  <p className={`${tabText} px-5 pb-1 pt-4 text-muted-foreground`}>{t.label}</p>
                  {t.items.map((it) => (
                    <Link
                      key={it.title}
                      href={it.href}
                      onClick={() => setMobile(false)}
                      className="block px-5 py-3 text-sm text-foreground/80 transition-colors hover:bg-foreground/[0.04]"
                    >
                      {it.title}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={t.label}
                  href={t.href}
                  onClick={() => setMobile(false)}
                  className={`${tabText} block border-b border-border px-5 py-4 transition-colors ${
                    isActive(t) ? "bg-foreground/[0.04] text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {t.label}
                </Link>
              ),
            )}
          </div>
          <div className="shrink-0 border-t border-border px-5 py-4">
            <Link
              href={LOGIN_URL}
              onClick={() => setMobile(false)}
              className="flex w-full items-center justify-center gap-1.5 bg-foreground py-3 text-background transition-opacity hover:opacity-90"
            >
              <span className={tabText}>sign-in</span>
              <ArrowUpRight weight="bold" className="size-2.5 opacity-50" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}