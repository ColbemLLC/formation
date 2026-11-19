import { SectionLabel } from "./ReadmePanel";

const FEATURES: { title: string; body: string }[] = [
  {
    title: "Give Every Guild a Home",
    body: "Each community gets its own page, member list and identity, so your guild has a place that is clearly yours.",
  },
  {
    title: "Reach Every Member",
    body: "Owners and admins post announcements that keep the whole community in the loop, with nothing buried in chat.",
  },
  {
    title: "Keep Discussions Organized",
    body: "Forums give long conversations room to breathe, so good threads stay easy to find and easy to join.",
  },
  {
    title: "Run More Than One Guild",
    body: "Organizations let you manage several communities from a single dashboard instead of juggling separate setups.",
  },
  {
    title: "Learn It in Minutes",
    body: "Clear documentation walks owners and members through everything the platform does.",
  },
  {
    title: "Build Beyond the Browser",
    body: "Use the public API and the native Windows editor to extend your community past the web.",
  },
  {
    title: "One Account, Every Colbe Surface",
    body: "Sign in once and use Colbe across the web platform, the API and the native Windows editor. Your account and communities follow you, so there is nothing to set up twice and nothing to keep in sync by hand.",
  },
];

export function Features() {
  return (
    <section id="features" className="flex flex-col gap-8 px-6 pb-14 md:px-10">
      <SectionLabel>features</SectionLabel>

      <div className="grid grid-cols-1 border-l border-t border-dashed border-border sm:grid-cols-2">
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            className={`border-b border-r border-dashed border-border p-6 ${
              i === FEATURES.length - 1 ? "sm:col-span-2" : ""
            }`}
          >
            <span className="font-mono text-xs text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-sm font-medium text-foreground">{f.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{f.body}</p>
          </div>
        ))}
      </div>

      <div className="pt-8">
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-4xl font-normal leading-[1.05] tracking-tight text-foreground md:text-5xl">
          Built for communities.
          <br />
          <span className="italic text-foreground/60">Designed for guilds.</span>
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
          Colbe gives your guild a home: a community page, announcements and a
          platform that works wherever you do.
        </p>
      </div>
    </section>
  );
}