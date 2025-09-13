"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Sun, Moon } from "lucide-react";

interface LiquidGlassThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  initialTheme?: "light" | "dark" | "system";
}

const sizes = {
  sm: { track: "w-12 h-7", icon: "w-3.5 h-3.5" },
  md: { track: "w-14 h-8", icon: "w-4 h-4" },
  lg: { track: "w-16 h-10", icon: "w-5 h-5" },
};

function getSystemPrefersDark() {
  if (typeof window === "undefined") return false;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(theme: "light" | "dark") {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
}

export const LiquidGlassThemeToggle = React.forwardRef<HTMLButtonElement, LiquidGlassThemeToggleProps>(
  ({ size = "md", className, initialTheme = "system", ...props }, ref) => {
    const [theme, setTheme] = React.useState<"light" | "dark">(() => {
      if (typeof window === "undefined") return "light";
      const stored = window.localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") return stored;
      return getSystemPrefersDark() ? "dark" : "light";
    });

    React.useEffect(() => {
      // Apply on mount and when theme changes
      applyTheme(theme);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("theme", theme);
      }
    }, [theme]);

    React.useEffect(() => {
      if (initialTheme === "system") return; // already handled by state initializer
      if (initialTheme === "light" || initialTheme === "dark") setTheme(initialTheme);
    }, [initialTheme]);

    // Keep in sync with system changes if user never explicitly toggled
    React.useEffect(() => {
      const media = window.matchMedia?.("(prefers-color-scheme: dark)");
      if (!media) return;
      const handler = (e: MediaQueryListEvent) => {
        const explicit = window.localStorage.getItem("theme");
        if (explicit === "light" || explicit === "dark") return; // user chose
        setTheme(e.matches ? "dark" : "light");
      };
      media.addEventListener?.("change", handler);
      return () => media.removeEventListener?.("change", handler);
    }, []);

    const isDark = theme === "dark";
    const s = sizes[size];

    const baseTrack =
      "relative inline-flex items-center border rounded-full transition-all duration-500 backdrop-blur-lg overflow-hidden align-middle select-none antialiased focus:outline-none focus:ring-2 focus:ring-white/30";

    const glassTrack =
      "bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)] hover:from-white/25 hover:via-white/15 hover:to-white/10 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.1),0_12px_40px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3)]";

    const activeGlow = isDark ? "ring-2 ring-white/30 shadow-[0_0_20px_rgba(255,255,255,0.25)]" : "";

    const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isDark}
        onClick={toggleTheme}
        className={cn(baseTrack, glassTrack, activeGlow, s.track, className)}
        {...props}
      >
        {/* Track overlays for glass effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none" />

        {/* Dark-mode overlay to subtly darken the track when moon is active */}
        {isDark && <div className="absolute inset-0 rounded-full bg-black/30 pointer-events-none transition-opacity duration-500" />}

        {/* Centered icons with crossfade and slight transform for morph-like effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Sun
            className={cn(
              "text-white/85 transition-all duration-500 ease-out transform",
              s.icon,
              isDark ? "opacity-0 scale-90 rotate-45" : "opacity-100 scale-100 rotate-0"
            )}
          />
          <Moon
            className={cn(
              "absolute text-white/85 transition-all duration-500 ease-out transform",
              s.icon,
              isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-90 -rotate-45"
            )}
          />
        </div>

        {/* Optional inner glow when ON (dark mode) */}
        {isDark && <div className="absolute inset-0 rounded-full bg-white/10 blur-sm pointer-events-none" />}
      </button>
    );
  }
);

LiquidGlassThemeToggle.displayName = "LiquidGlassThemeToggle";
