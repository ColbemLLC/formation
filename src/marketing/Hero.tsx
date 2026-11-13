import Link from "next/link";
import { LOGIN_URL, REGISTER_URL } from "./links";

// Font: Geist Sans (font-sans) and Geist Mono (font-mono), set up in layout.tsx.
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden font-sans">
      {/* soft grid + glow background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
      />

      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-28 text-center md:py-36">
        <span className="rounded-full border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground">
          Guild-based community platform
        </span>

        <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-7xl">
          Your guild.
          <br />
          Your community.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          Create communities, share announcements, and build together, on the
          web, through the API, or in the native Windows editor.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={REGISTER_URL}
            className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get Started
          </Link>
          <Link
            href={LOGIN_URL}
            className="rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-hover"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}