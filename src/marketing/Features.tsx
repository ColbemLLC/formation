import type { ReactNode } from "react";

type Feature = {
  title: string;
  body: string;
  /** Column span on desktop (of 12). */
  span: "md:col-span-6" | "md:col-span-4" | "md:col-span-8";
};

// Rows: 6 + 4 | 8 + 4 | 4 (the heading fills the rest of the last row).
const FEATURES: Feature[] = [
  {
    title: "Guild-based Communities",
    body: "Create a community for your guild with its own page, members and identity, then grow it your way.",
    span: "md:col-span-6",
  },
  {
    title: "Announcements",
    body: "Owners and admins can post announcements that keep every member in the loop.",
    span: "md:col-span-4",
  },
  {
    title: "One Account, Every Colbe Surface",
    body: "Sign in once and use Colbe across the web platform, the API and the native Windows editor. Your account and communities follow you, so there is nothing to set up twice and nothing to keep in sync by hand.",
    span: "md:col-span-8",
  },
  {
    title: "Light & Dark Mode",
    body: "Every screen is designed to work in both light and dark themes.",
    span: "md:col-span-4",
  },
  {
    title: "Quick Onboarding",
    body: "Register with your email, set up your account, and get straight into the platform.",
    span: "md:col-span-4",
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

          <div className="flex flex-col justify-end text-right md:col-span-8">
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