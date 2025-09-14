import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LiquidGlassThemeToggle } from "@/components/ui/liquid-glass-theme-toggle";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function LiquidGlassThemeTogglePage() {
  const [, setLocation] = useLocation();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const componentCode = `"use client";

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

LiquidGlassThemeToggle.displayName = "LiquidGlassThemeToggle";`;

  const usageCode = `import { LiquidGlassThemeToggle } from "@/components/ui/liquid-glass-theme-toggle";

export default function Example() {
  return <LiquidGlassThemeToggle size="md" />;
}`;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-secondary to-background">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navigation />

        <div className="pt-40 pb-8 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-16 text-left">
              <Button
                variant="ghost"
                onClick={() => setLocation("/components")}
                className="mb-6 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Components
              </Button>
              <h1 className="text-3xl md:text-4xl font-semibold mb-6 leading-tight">
                Liquid Glass <span className="gradient-text">Theme Toggle</span>
              </h1>
            </div>

            {/* Live Usage */}
            <div className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Live Usage</h2>
              <div className="relative overflow-hidden w-full min-h-[220px] rounded-lg border border-border/20">
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
                  alt="Abstract painting background"
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-black/30" aria-hidden />
                <div className="relative z-10 flex flex-col items-center justify-center gap-6 w-full h-full p-6">
                  <div className="flex items-center gap-4">
                    <LiquidGlassThemeToggle size="lg" />
                  </div>
                  <div className="flex items-center gap-4">
                    <LiquidGlassThemeToggle size="md" />
                    <LiquidGlassThemeToggle size="sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Installation */}
            <div className="mb-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-medium mb-6">Installation</h2>
                <p className="text-muted-foreground mb-6">
                  Let's begin by installing the required dependencies:
                </p>
                <div className="relative">
                  <div className="rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
                    <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between" style={{ backgroundColor: "#282c34" }}>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
                        </div>
                        <span className="text-slate-400 text-sm font-medium ml-4">Terminal</span>
                      </div>
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors" onClick={() => copyToClipboard("npm install lucide-react", "install")}>
                        {copiedCode === "install" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="overflow-x-auto">
                      <div className="p-6" style={{ backgroundColor: "#282c34", color: "#abb2bf", fontSize: "0.875rem", lineHeight: "1.6" }}>
                        <div className="flex items-center gap-2">
                          <span className="text-green-400">$</span>
                          <span className="text-blue-400">npm</span>
                          <span className="text-yellow-400">install</span>
                          <span className="text-purple-400">lucide-react</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="mb-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-medium mb-6">How It Works</h2>
                <p className="text-muted-foreground mb-6">
                  The `LiquidGlassThemeToggle` provides a premium theme switcher with a sun-to-moon
                  morph-like animation and liquid glass styling. It features:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-8">
                  <li>
                    <span className="font-medium text-foreground/90">Centered morph animation:</span>
                    Sun and Moon icons stay centered and crossfade with subtle scale/rotate transitions.
                  </li>
                  <li>
                    <span className="font-medium text-foreground/90">Subtle darkening in moon mode:</span>
                    A soft overlay darkens the track to emphasize the dark theme state.
                  </li>
                  <li>
                    <span className="font-medium text-foreground/90">Persistent preference:</span>
                    The selected theme is saved in localStorage and respects system preference by default.
                  </li>
                  <li>
                    <span className="font-medium text-foreground/90">Accessible semantics:</span>
                    Uses `role="switch"`, `aria-checked`, and keyboard focus ring for inclusivity.
                  </li>
                  <li>
                    <span className="font-medium text-foreground/90">Size variants:</span>
                    `sm`, `md`, and `lg` sizes to fit different layouts.
                  </li>
                </ul>
              </div>
            </div>

            {/* Component Code */}
            <div className="mb-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-medium mb-6">Component Code</h2>
                <div className="relative">
                  <div className="rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
                    <div
                      className="px-6 py-4 border-b border-slate-800 flex items-center justify-between"
                      style={{ backgroundColor: "#282c34" }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
                        </div>
                        <span className="text-slate-400 text-sm font-medium ml-4">
                          liquid-glass-theme-toggle.tsx
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
                        onClick={() => copyToClipboard(componentCode, "component")}
                      >
                        {copiedCode === "component" ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <div className="overflow-x-auto">
                      <SyntaxHighlighter
                        language="tsx"
                        style={oneDark}
                        customStyle={{
                          margin: 0,
                          padding: "2rem",
                          background: "#282c34",
                          fontSize: "0.875rem",
                          lineHeight: "1.6",
                        }}
                        showLineNumbers={true}
                        wrapLines={true}
                        wrapLongLines={true}
                      >
                        {componentCode}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Example */}
            <div className="mb-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-medium mb-6">Usage Example</h2>
                <div className="relative">
                  <div className="rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
                    <div
                      className="px-6 py-4 border-b border-slate-800 flex items-center justify-between"
                      style={{ backgroundColor: "#282c34" }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
                        </div>
                        <span className="text-slate-400 text-sm font-medium ml-4">
                          example.tsx
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
                        onClick={() => copyToClipboard(usageCode, "usage")}
                      >
                        {copiedCode === "usage" ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <div className="overflow-x-auto">
                      <SyntaxHighlighter
                        language="tsx"
                        style={oneDark}
                        customStyle={{
                          margin: 0,
                          padding: "2rem",
                          background: "#282c34",
                          fontSize: "0.875rem",
                          lineHeight: "1.6",
                        }}
                        showLineNumbers={true}
                        wrapLines={true}
                        wrapLongLines={true}
                      >
                        {usageCode}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Closing Text */}
            <div className="mb-16">
              <div className="max-w-4xl mx-auto">
                <p className="text-muted-foreground text-lg">
                  The LiquidGlassThemeToggle brings premium glass aesthetics to theme switching with
                  smooth animations and persistent preferences.
                </p>
                <p className="text-muted-foreground mt-4">Happy Coding 👋</p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
