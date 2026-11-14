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
    <div className="overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        className="flex w-max gap-4"
        animate={{ x: reverse ? ["-25%", "0%"] : ["0%", "-25%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {loop.map(({ icon: I, label }, i) => (
          <span
            key={i}
            className="flex items-center gap-2 rounded-[15px] border-2 border-foreground bg-card px-4 py-2.5 text-sm font-bold text-foreground shadow-[3px_3px_0_0_var(--foreground)]"
          >
            <I weight="bold" className="size-4 text-primary" />
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
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-14 px-6 pb-16 pt-28 md:pt-36 lg:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col items-start text-left">
          <motion.span
            {...fade(0)}
            className="rounded-[15px] border-2 border-foreground bg-primary px-3 py-1 font-mono text-xs font-bold text-primary-foreground shadow-[3px_3px_0_0_var(--foreground)]"
          >
            Guild-based community platform
          </motion.span>

          <motion.h1
            {...fade(0.1)}
            className="mt-8 font-[family-name:var(--font-instrument-serif)] text-6xl font-normal leading-[1.02] tracking-tight text-foreground md:text-8xl"
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
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href={REGISTER_URL}
              className="inline-flex items-center gap-2 rounded-[15px] border-2 border-foreground bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-[4px_4px_0_0_var(--foreground)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              Get Started
              <ArrowRight weight="bold" className="size-4" />
            </Link>
            <Link
              href={LOGIN_URL}
              className="rounded-[15px] border-2 border-foreground bg-card px-6 py-3 text-sm font-bold text-foreground shadow-[4px_4px_0_0_var(--foreground)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              Sign In
            </Link>
          </motion.div>
        </div>

        {/* platform panel: primary bar + card body */}
        <motion.div
          {...fade(0.4)}
          className="overflow-hidden rounded-[15px] border-2 border-foreground shadow-[4px_4px_0_0_var(--foreground)]"
        >
          <div className="border-b-2 border-foreground bg-primary p-4 text-sm font-bold text-primary-foreground">
            Everywhere you build
          </div>
          <div className="bg-card">
            {PLATFORMS.map(({ icon: I, title, text }) => (
              <div
                key={title}
                className="flex items-center gap-4 border-b-2 border-foreground p-4 last:border-b-0"
              >
                <I weight="bold" className="size-6 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-bold text-foreground">{title}</p>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col gap-2 pb-16">
        <Marquee items={ROW_A} duration={45} />
        <Marquee items={ROW_B} reverse duration={55} />
      </div>
    </section>
  );
}