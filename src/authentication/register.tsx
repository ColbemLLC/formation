"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowRight, Eye, EyeSlash, GithubLogo, GoogleLogo } from "@phosphor-icons/react";
import { LOGIN_URL } from "@/marketing/links";

type Props = {
  /** Wire this to Better Auth. Throw an Error to show its message on the form. */
  onSubmit?: (v: { email: string; password: string }) => Promise<void>;
};

const input =
  "h-11 w-full rounded-[15px] border-2 border-foreground bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:shadow-[3px_3px_0_0_var(--foreground)]";
const social =
  "group relative flex h-11 flex-1 items-center justify-center overflow-hidden rounded-[15px] border-2 border-foreground bg-card text-foreground shadow-[3px_3px_0_0_var(--foreground)] before:absolute before:inset-0 before:-translate-x-full before:bg-primary before:transition-transform before:duration-300 hover:before:translate-x-0 hover:text-primary-foreground";

export function Register({ onSubmit }: Props) {
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    try {
      await onSubmit?.({ email: String(f.get("email")), password: String(f.get("password")) });
      window.location.assign("https://app.colbe.cc/onboarding");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center p-6 font-sans">
      <section className="grid w-full max-w-4xl overflow-hidden rounded-[15px] border-2 border-foreground shadow-[6px_6px_0_0_var(--foreground)] lg:grid-cols-2">
        <div className="flex flex-col gap-6 bg-card p-8">
          <div>
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-4xl text-foreground">
              Create your account
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">Get started in just a few steps.</p>
          </div>

          <div className="flex gap-3">
            <button type="button" className={social} aria-label="Continue with Google">
              <GoogleLogo weight="bold" className="relative size-5" />
            </button>
            <button type="button" className={social} aria-label="Continue with GitHub">
              <GithubLogo weight="bold" className="relative size-5" />
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold uppercase text-muted-foreground">
            <span className="h-0.5 flex-1 bg-foreground/20" />
            or with email
            <span className="h-0.5 flex-1 bg-foreground/20" />
          </div>

          <form onSubmit={submit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5 text-sm font-bold text-foreground">
              Email
              <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={input} />
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-bold text-foreground">
              Password
              <span className="relative">
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  placeholder="••••••••••"
                  className={`${input} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {show ? <EyeSlash weight="bold" className="size-5" /> : <Eye weight="bold" className="size-5" />}
                </button>
              </span>
            </label>

            {error && <p role="alert" className="text-sm font-bold text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={busy}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[15px] border-2 border-foreground bg-primary text-sm font-bold text-primary-foreground shadow-[4px_4px_0_0_var(--foreground)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-60"
            >
              {busy ? "Creating..." : "Create Account"}
              {!busy && <ArrowRight weight="bold" className="size-4" />}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href={LOGIN_URL} className="font-bold text-foreground underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>

        <div className="hidden flex-col justify-end border-l-2 border-foreground bg-primary p-12 text-primary-foreground lg:flex">
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-6xl leading-[1.02]">
            Make a home
            <br />
            <span className="italic text-primary-foreground/70">for your guild.</span>
          </h2>
          <p className="mt-6 max-w-sm text-base leading-7 text-primary-foreground/90">
            Register, set up your profile, and get straight into the platform.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;