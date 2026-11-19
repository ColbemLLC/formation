import * as motion from "motion/react-client";
import Link from "next/link";
import type { ReactNode } from "react";
import { UsersThree } from "@phosphor-icons/react/dist/ssr";
import { ColbeMark } from "./ColbeMark";
import { ReadmePanel } from "./ReadmePanel";
import { LOGIN_URL, REGISTER_URL } from "./links";

const ease = [0.25, 1, 0.5, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

function HatchedLink({ href, children }: { href: string; children: ReactNode }) {
  const line = "absolute bg-foreground/20 transition-colors group-hover:bg-foreground/40";
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center px-6 py-2.5 text-sm font-medium text-foreground"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent_0_4px,var(--foreground)_4px_5px)] opacity-[0.05] transition-opacity group-hover:opacity-10"
      />
      <span aria-hidden="true" className={`${line} inset-x-[-6px] top-0 h-px`} />
      <span aria-hidden="true" className={`${line} inset-x-[-6px] bottom-0 h-px`} />
      <span aria-hidden="true" className={`${line} inset-y-[-6px] left-0 w-px`} />
      <span aria-hidden="true" className={`${line} inset-y-[-6px] right-0 w-px`} />
      <span className="relative">{children}</span>
    </Link>
  );
}

export function Hero() {
  return (
    <section className="border-b border-border font-sans">
      <div className="mx-auto grid w-full max-w-[1400px] lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)]">
        <div className="relative flex min-h-[34rem] flex-col justify-end overflow-hidden px-6 pb-14 pt-24 md:px-10 lg:min-h-[calc(100svh-4rem)]">
          <ColbeMark className="absolute left-[8%] top-[6%] size-56 md:left-[12%] md:size-80 lg:top-[12%]" />

          <div className="relative z-10 flex flex-col items-start">
            <motion.span
              {...fade(0)}
              className="inline-flex items-center gap-2 rounded-[15px] bg-muted px-3 py-1 text-xs text-muted-foreground"
            >
              <UsersThree weight="bold" className="size-3.5" />
              Guild-based community platform
            </motion.span>

            <motion.h1
              {...fade(0.1)}
              className="mt-6 font-[family-name:var(--font-instrument-serif)] text-5xl font-normal leading-[1.02] tracking-tight text-foreground md:text-7xl"
            >
              Start a guild.
              <br />
              <span className="italic text-foreground/60">Build a world.</span>
            </motion.h1>

            <motion.div {...fade(0.2)} className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                href={REGISTER_URL}
                className="inline-flex items-center bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Get Started
              </Link>
              <HatchedLink href={LOGIN_URL}>Sign In</HatchedLink>
            </motion.div>
          </div>
        </div>

        <ReadmePanel />
      </div>
    </section>
  );
}