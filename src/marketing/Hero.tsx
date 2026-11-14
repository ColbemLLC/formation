import * as motion from "motion/react-client";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Buildings,
  ChatsCircle,
  Code,
  Desktop,
  Globe,
  Lock,
  Megaphone,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { LOGIN_URL, REGISTER_URL } from "./links";

const ease = [0.25, 1, 0.5, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

const PLATFORMS: { icon: Icon; title: string; text: string }[] = [
  { icon: Globe, title: "Web", text: "Run your guild from any browser." },
  { icon: Code, title: "API", text: "Build on top of your community." },
  { icon: Desktop, title: "Windows editor", text: "Native, fast, built for creators." },
];

const ROW_A: { icon: Icon; label: string }[] = [
  { icon: UsersThree, label: "Guilds" },
  { icon: Megaphone, label: "Announcements" },
  { icon: Lock, label: "Encrypted DMs" },
  { icon: ChatsCircle, label: "Forums" },
];
const ROW_B: { icon: Icon; label: string }[] = [
  { icon: Buildings, label: "Organizations" },
  { icon: BookOpen, label: "Docs" },
  { icon: Code, label: "Public API" },
  { icon: Desktop, label: "Windows editor" },
];

function Marquee({
  items,
  reverse = false,
  duration = 40,
}: {
  items: { icon: Icon; label: string }[];
  reverse?: boolean;
  duration?: number;
}) {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <motion.div
        className="flex w-max gap-3"
        animate={{ x: reverse ? ["-25%", "0%"] : ["0%", "-25%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {loop.map(({ icon: I, label }, i) => (
          <span
            key={i}
            className="flex items-center gap-2 rounded-[15px] border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground"
          >
            <I className="size-4 text-primary" />
            {label}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden font-sans">
      {/* soft grid + glow background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_30%_40%,black_20%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 -z-10 h-80 w-[44rem] -translate-x-1/4 rounded-full bg-primary/20 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-14 px-6 pb-16 pt-28 md:pt-36 lg:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col items-start text-left">
          <motion.span
            {...fade(0)}
            className="rounded-full border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground"
          >
            Guild-based community platform
          </motion.span>

          <motion.h1
            {...fade(0.1)}
            className="mt-6 font-[family-name:var(--font-instrument-serif)] text-6xl font-normal leading-[1.02] tracking-tight text-foreground md:text-8xl"
          >
            Your guild.
            <br />
            <span className="italic text-foreground/60">Your community.</span>
          </motion.h1>

          <motion.p
            {...fade(0.2)}
            className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground"
          >
            Create communities, share announcements, and build together, on the
            web, through the API, or in the native Windows editor.
          </motion.p>

          <motion.div
            {...fade(0.3)}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              href={REGISTER_URL}
              className="ui-button-gradient-primary group inline-flex items-center gap-2 rounded-[15px] px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Get Started
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={LOGIN_URL}
              className="rounded-[15px] border border-button-secondary-border bg-button-secondary px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-hover"
            >
              Sign In
            </Link>
          </motion.div>
        </div>

        {/* platform panel, accordion-style rows */}
        <motion.div
          {...fade(0.4)}
          className="overflow-hidden rounded-[15px] border border-border bg-background"
        >
          <div className="border-b border-border bg-muted px-4 py-3 font-mono text-xs text-muted-foreground">
            Everywhere you build
          </div>
          {PLATFORMS.map(({ icon: I, title, text }) => (
            <div
              key={title}
              className="flex items-center gap-4 border-b border-border p-4 last:border-b-0"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-[15px] border border-border bg-muted">
                <I className="size-5 text-primary" />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{title}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* scrolling feature rows */}
      <div className="flex flex-col gap-3 pb-16">
        <Marquee items={ROW_A} duration={45} />
        <Marquee items={ROW_B} reverse duration={55} />
      </div>

      {/* bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background"
      />
    </section>
  );
}