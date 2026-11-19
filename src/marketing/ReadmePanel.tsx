"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
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

export function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4">
      <h2 className="font-mono text-sm uppercase tracking-wider text-foreground">
        {children}
      </h2>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

function Marquee() {
  const reduce = useReducedMotion();
  const loop = [...INCLUDES, ...INCLUDES];

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
      <motion.div
        className="flex w-max"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {loop.map(({ icon: I, label }, i) => (
          <span
            key={`${label}-${i}`}
            aria-hidden={i >= INCLUDES.length}
            className="flex shrink-0 items-center gap-2 px-5 text-sm text-foreground/60"
          >
            <I weight="bold" className="size-4 shrink-0" />
            {label}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function ReadmePanel() {
  const [tab, setTab] = useState(0);
  const active = SURFACES[tab];
  const ActiveIcon = active.icon;

  return (
    <section className="flex flex-col gap-8 px-6 pb-10 pt-10 md:px-10">
      <SectionLabel>readme</SectionLabel>

      <p className="text-lg leading-8 text-muted-foreground">
        Run <strong className="font-medium text-foreground">communities</strong>, post
        announcements, and build on the web, the API, or the native{" "}
        <strong className="font-medium text-foreground">Windows editor</strong>.
      </p>

      <div className="border border-border">
        <div
          role="tablist"
          aria-label="Where Colbe runs"
          className="flex border-b border-border font-mono text-xs"
        >
          {SURFACES.map((s, i) => (
            <button
              key={s.surface}
              type="button"
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={`-mb-px px-4 py-3 transition-colors ${
                tab === i
                  ? "border-b border-foreground text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.surface}
            </button>
          ))}
        </div>
        <div role="tabpanel" className="flex items-center gap-3 px-4 py-4 font-mono text-sm">
          <ActiveIcon weight="bold" className="size-4 shrink-0 text-primary" />
          <span className="text-foreground">{active.text}</span>
        </div>
      </div>

      <div className="border-y border-border py-5">
        <Marquee />
      </div>
    </section>
  );
}