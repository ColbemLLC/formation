import Link from "next/link";
import { LightDark } from "@/packages/ui/light-dark";

const LINKS = [
  { label: "Terms of use", href: "/terms-of-use" },
  { label: "Terms of service", href: "/terms-of-service" },
  { label: "Community guidelines", href: "/community-guidelines" },
];

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-6 md:px-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-1 gap-y-1.5">
          {LINKS.map((l, i) => (
            <span key={l.href} className="flex items-center">
              <Link
                href={l.href}
                className="font-mono text-[11px] text-foreground/50 transition-colors hover:text-foreground/80"
              >
                {l.label}
              </Link>
              {i < LINKS.length - 1 && (
                <span className="mx-1 select-none text-[10px] text-foreground/10">/</span>
              )}
            </span>
          ))}
        </nav>

        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <span className="font-mono text-[10px] text-foreground/50">
            © {new Date().getFullYear()} Colbe
          </span>
          <LightDark />
        </div>
      </div>
    </footer>
  );
}

export default Footer;