"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  Buildings,
  ChatsCircle,
  Code,
  Desktop,
  Globe,
  Lock,
  Megaphone,
  UsersThree,
  type Icon,
} from "@phosphor-icons/react";

const SURFACES: { icon: Icon; surface: string; text: string }[] = [
  { icon: Globe, surface: "Web", text: "Run your guild from any browser." },
  { icon: Code, surface: "API", text: "Build on top of your community." },
  { icon: Desktop, surface: "Windows editor", text: "Native, fast, built for creators." },
];

const INCLUDES: { icon: Icon; label: string }[] = [
  { icon: UsersThree, label: "Guilds" },
  { icon: Megaphone, label: "Announcements" },
  { icon: Lock, label: "Encrypted DMs" },
  { icon: ChatsCircle, label: "Forums" },
  { icon: Buildings, label: "Organizations" },
  { icon: BookOpen, label: "Docs" },
  { icon: Code, label: "Public API" },
  { icon: Desktop, label: "Windows editor" },
];

function Label({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4">
      <h2 className="font-mono text-sm uppercase tracking-wider text-foreground">
        {children}
      </h2>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

export function ReadmePanel() {
  const [tab, setTab] = useState(0);
  const active = SURFACES[tab];
  const ActiveIcon = active.icon;

  return (
    <aside className="border-t border-border lg:border-l lg:border-t-0">
      <div className="flex border-b border-border font-mono text-xs uppercase tracking-wider">
        <span className="-mb-px flex-1 border-b border-foreground px-6 py-4 text-center text-foreground">
          Readme
        </span>
        <Link
          href="/docs"
          className="flex-1 px-6 py-4 text-center text-muted-foreground transition-colors hover:text-foreground"
        >
          Docs
        </Link>
      </div>

      <div className="flex flex-col gap-10 px-6 py-8 md:px-10">
        <div className="flex flex-col gap-5">
          <Label>Readme</Label>
          <p className="leading-7 text-muted-foreground">
            Run communities, post announcements, and build on the web, the API,
            or the native Windows editor.
          </p>

          <div className="overflow-hidden rounded-[15px] border border-border">
            <div role="tablist" aria-label="Where Colbe runs" className="flex border-b border-border text-sm">
              {SURFACES.map((s, i) => (
                <button
                  key={s.surface}
                  type="button"
                  role="tab"
                  aria-selected={tab === i}
                  onClick={() => setTab(i)}
                  className={`px-4 py-3 transition-colors ${
                    tab === i
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.surface}
                </button>
              ))}
            </div>
            <div role="tabpanel" className="flex items-center gap-3 p-5 text-sm">
              <ActiveIcon weight="bold" className="size-5 shrink-0 text-primary" />
              <span className="text-foreground">{active.text}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <Label>Includes</Label>
          <ul className="grid grid-cols-2 gap-px border border-dashed border-border">
            {INCLUDES.map(({ icon: I, label }, i) => (
              <li key={label} className="flex flex-col gap-3 border border-dashed border-border p-4">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex items-center gap-2 text-sm text-foreground">
                  <I weight="bold" className="size-4 shrink-0 text-primary" />
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}