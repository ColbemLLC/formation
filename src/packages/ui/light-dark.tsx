"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react";
import { cn } from "./cn";

export const LightDark = ({ className }: { className?: string }) => {
  const [dark, setDark] = useState(false);

  // Sync with the saved choice, or the system theme on a first visit.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("theme");
    } catch {}
    const isDark =
      saved === "dark" ||
      (saved === null && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
  }, []);

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  }

  const icon =
    "absolute size-5 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      className={cn(
        "relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-[15px] border-2 border-foreground bg-card text-foreground shadow-[3px_3px_0_0_var(--foreground)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
        className,
      )}
    >
      <Sun
        weight="bold"
        className={cn(icon, dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100")}
      />
      <Moon
        weight="bold"
        className={cn(icon, dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0")}
      />
    </button>
  );
};