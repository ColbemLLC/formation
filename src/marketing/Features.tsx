import type { ReactNode } from "react";

type Feature = {
  title: string;
  body: string;
  /** Column span on desktop (of 12). */
  span: "md:col-span-6" | "md:col-span-4" | "md:col-span-8";
};

// Rows: 6 + 6 | 4 + 4 + 4 | 4 + 8 | heading (full width).
const FEATURES: Feature[] = [
  {
    title: "Give Every Guild a Home",
    body: "Each community gets its own page, member list and identity, so your guild has a place that is clearly yours.",
    span: "md:col-span-6",
  },
  {
    title: "Reach Every Member",
    body: "Owners and admins post announcements that keep the whole community in the loop, with nothing buried in chat.",
    span: "md:col-span-6",
  },
  {
    title: "Keep Discussions Organized",
    body: "Forums give long conversations room to breathe, so good threads stay easy to find and easy to join.",
    span: "md:col-span-4",
  },
  {
    title: "Run More Than One Guild",
    body: "Organizations let you manage several communities from a single dashboard instead of juggling separate setups.",
    span: "md:col-span-4",
  },
  {
    title: "Learn It in Minutes",
    body: "Clear documentation walks owners and members through everything the platform does.",
    span: "md:col-span-4",
  },
  {
    title: "Build Beyond the Browser",
    body: "Use the public API and the native Windows editor to extend your community past the web.",
    span: "md:col-span-4",
  },
  {
    title: "One Account, Every Colbe Surface",
    body: "Sign in once and use Colbe across the web platform, the API and the native Windows editor. Your account and communities follow you, so there is nothing to set up twice and nothing to keep in sync by hand.",
    span: "md:col-span-8",
  },
];

function Plus({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`pointer-events-none absolute size-4 text-foreground ${className}`}
    >
      <path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

function Cell({ span, children }: { span: string; children: ReactNode }) {
  return (
    <div
      className={`relative min-h-44 border border-dashed border-border p-6 ${span}`}
    >
      <Plus className="-left-2 -top-2" />
      <Plus className="-right-2 -top-2" />
      <Plus className="-bottom-2 -left-2" />
      <Plus className="-bottom-2 -right-2" />
      {children}
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="border border-border p-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {FEATURES.map((f) => (
            <Cell key={f.title} span={f.span}>
              <h3 className="text-lg font-bold tracking-tight text-foreground">
                {f.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {f.body}
              </p>
            </Cell>
          ))}

          <div className="flex flex-col justify-end text-right md:col-span-12">
            <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-6xl">
              Built for communities.
              <br />
              Designed for guilds.
            </h2>
            <p className="ml-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              Colbe gives your guild a home: a community page, announcements and
              a platform that works wherever you do.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}