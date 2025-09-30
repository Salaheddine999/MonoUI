import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassMenu, type GlassMenuItem } from "@/components/ui/glass-menu";
import { ArrowLeft, Copy, Check, Home, Search, Settings, User } from "lucide-react";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function GlassMenuPage() {
  const [, setLocation] = useLocation();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [active, setActive] = useState("home");

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
import { motion, LayoutGroup } from "framer-motion";

export type GlassMenuItem = {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
};

interface GlassMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items: GlassMenuItem[];
  activeKey?: string;
  onSelectItem?: (key: string) => void;
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const GlassMenu = React.forwardRef<HTMLDivElement, GlassMenuProps>(
  (
    {
      items,
      activeKey,
      onSelectItem,
      orientation = "horizontal",
      size = "md",
      className,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex border align-middle select-none font-sans text-white rounded-2xl backdrop-blur-lg transition-all duration-500 antialiased relative overflow-hidden";

    const glassClasses =
      "bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)] hover:from-white/25 hover:via-white/15 hover:to-white/10 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.1),0_12px_40px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3)]";

    const orientationClasses = {
      horizontal: "flex-row",
      vertical: "flex-col",
    };

    const sizeClasses = {
      sm: "p-1",
      md: "p-2",
      lg: "p-3",
    } as const;

    const itemPadding = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-2.5 text-base",
    } as const;

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          glassClasses,
          orientationClasses[orientation],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {/* Items */}
        <LayoutGroup>
          {items.map((item) => {
            const isActive = activeKey === item.key;
            return (
              <button
                key={item.key}
                type="button"
                disabled={item.disabled}
                className={cn(
                  "relative rounded-xl transition-colors duration-300 whitespace-nowrap flex items-center gap-2 overflow-hidden",
                  itemPadding[size],
                  isActive ? "text-white" : "text-white/75 hover:text-white",
                  item.disabled && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => !item.disabled && onSelectItem?.(item.key)}
              >
                {isActive && (
                  <motion.span
                    layoutId="lgm-active-pill"
                    transition={{ type: "spring", stiffness: 180, damping: 26, mass: 0.9 }}
                    className="absolute inset-0 rounded-xl bg-white/16 backdrop-blur-[2.5px] shadow-[inset_0_1px_2px_rgba(255,255,255,0.35),inset_0_-1px_2px_rgba(0,0,0,0.06)]"
                    aria-hidden
                  />
                )}
                {item.icon && <span className="inline-flex items-center relative z-10">{item.icon}</span>}
                <span className="relative z-10">{item.label}</span>
                {/* Active highlight ring */}
                {isActive && (
                  <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/30" />
                )}
              </button>
            );
          })}
        </LayoutGroup>

        {/* Unique glass overlays */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none" />
      </div>
    );
  }
);

GlassMenu.displayName = "GlassMenu";

export { GlassMenu };`;

  const usageCode = `import { GlassMenu } from "@/components/ui/glass-menu";
import { Home, Search, Settings, User } from "lucide-react";

const items = [
  { key: "home", label: "Home", icon: <Home className=\"w-4 h-4\" /> },
  { key: "search", label: "Search", icon: <Search className=\"w-4 h-4\" /> },
  { key: "profile", label: "Profile", icon: <User className=\"w-4 h-4\" /> },
  { key: "settings", label: "Settings", icon: <Settings className=\"w-4 h-4\" /> },
];

<GlassMenu items={items} activeKey={active} onSelectItem={setActive} />`;

  const items: GlassMenuItem[] = [
    { key: "home", label: "Home", icon: <Home className="w-4 h-4" /> },
    { key: "search", label: "Search", icon: <Search className="w-4 h-4" /> },
    { key: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
    { key: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
  ];

  const verticalItems: GlassMenuItem[] = [
    { key: "home", label: "Home", icon: <Home className="w-4 h-4" /> },
    { key: "search", label: "Search", icon: <Search className="w-4 h-4" /> },
    { key: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
  ];

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
                <span className="gradient-text">Menu</span>
              </h1>
            </div>

            {/* Live Usage */}
            <div className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Live Usage</h2>
              <div className="relative overflow-hidden flex items-center justify-center w-full min-h-[420px] rounded-lg border border-border/20">
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
                  alt="Abstract painting background"
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-black/30" aria-hidden />
                <div className="relative z-10 w-full max-w-4xl p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-medium mb-4">Menus</h3>
                    <p className="text-white/90 text-md mb-8 leading-relaxed font-light">
                      A Glass menu for navigation or grouped actions with beautiful glass effects.
                    </p>
                  </div>

                  <div className="space-y-12">
                    {/* Horizontal Menu */}
                    <div className="text-center">
                      <h4 className="text-lg font-medium mb-4 text-white/80">Horizontal</h4>
                      <div className="flex justify-center">
                        <GlassMenu
                          items={items}
                          activeKey={active}
                          onSelectItem={setActive}
                          orientation="horizontal"
                          size="md"
                        />
                      </div>
                    </div>

                    {/* Vertical Menu */}
                    <div className="text-center">
                      <h4 className="text-lg font-medium mb-4 text-white/80">Vertical</h4>
                      <div className="flex justify-center">
                        <GlassMenu
                          items={verticalItems}
                          activeKey={active}
                          onSelectItem={setActive}
                          orientation="vertical"
                          size="md"
                        />
                      </div>
                    </div>
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
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors" onClick={() => copyToClipboard("npm install framer-motion", "install")}>
                        {copiedCode === "install" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="overflow-x-auto">
                      <div className="p-6" style={{ backgroundColor: "#282c34", color: "#abb2bf", fontSize: "0.875rem", lineHeight: "1.6" }}>
                        <div className="flex items-center gap-2">
                          <span className="text-green-400">$</span>
                          <span className="text-blue-400">npm</span>
                          <span className="text-yellow-400">install</span>
                          <span className="text-purple-400">framer-motion</span>
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
                  The `GlassMenu` builds a polished, animated menu container that matches the design of other Glass components:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-8">
                  <li>Layered gradient backgrounds create depth and a soft inner glow</li>
                  <li>Multiple shadow layers simulate realistic glass reflection</li>
                  <li>Gradient overlays provide authentic glass highlight effects</li>
                  <li>Backdrop blur achieves the frosted glass appearance</li>
                  <li>Animated active pill uses <code>framer-motion</code> with a shared <code>layoutId</code> to smoothly glide between items</li>
                  <li>Smooth spring transition tuned for a silky, liquid feel (<code>stiffness=180</code>, <code>damping=26</code>, <code>mass=0.9</code>)</li>
                  <li>Orientation options: <code>horizontal</code> or <code>vertical</code> for flexible layouts</li>
                  <li>Size options: <code>sm</code>, <code>md</code>, <code>lg</code> to match density needs</li>
                  <li>Active item is emphasized with a subtle ring highlight and stronger text contrast</li>
                  <li>Disabled items are visibly dimmed and non-interactive</li>
                  <li>Composable items support an <code>icon</code> and <code>label</code> for richer navigation</li>
                </ul>
              </div>
            </div>

            {/* Component Code */}
            <div className="mb-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-medium mb-6">Component Code</h2>
                <div className="relative">
                  <div className="rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
                    {/* Editor Header */}
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
                          glass-menu.tsx
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
                    {/* Code Content with Syntax Highlighting */}
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
                    {/* Editor Header */}
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
                    {/* Code Content with Syntax Highlighting */}
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
                  This implementation delivers a premium Glass menu for navigation and grouped actions, consistent with other components and highly customizable.
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
