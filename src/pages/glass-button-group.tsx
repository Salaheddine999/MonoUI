import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlassButtonGroup } from "@/components/ui/glass-button-group";
import {
  ArrowLeft,
  Copy,
  Check,
  Home,
  Settings,
  User,
  Search,
  Plus,
  Minus,
  Edit,
  Trash2,
} from "lucide-react";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function GlassButtonGroupPage() {
  const [, setLocation] = useLocation();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("home");
  const [activeAction, setActiveAction] = useState("add");

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

interface GlassButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const GlassButtonGroup = React.forwardRef<HTMLDivElement, GlassButtonGroupProps>(
  ({ children, orientation = "horizontal", size = "md", className, ...props }, ref) => {
    const baseClasses =
      "inline-flex border align-middle select-none font-sans text-white rounded-2xl backdrop-blur-lg transition-all duration-500 antialiased relative overflow-hidden";

    const glassClasses =
      "bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)] hover:from-white/25 hover:via-white/15 hover:to-white/10 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.1),0_12px_40px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3)] hover:scale-[1.02]";

    const orientationClasses = {
      horizontal: "flex-row",
      vertical: "flex-col",
    };

    const sizeClasses = {
      sm: "p-1",
      md: "p-2",
      lg: "p-3",
    };

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
        {children}
        {/* Unique gradient overlays for glass effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none" />
      </div>
    );
  }
);

GlassButtonGroup.displayName = "GlassButtonGroup";

export { GlassButtonGroup };`;

  const usageCode = `import { GlassButtonGroup } from "@/components/ui/glass-button-group";

<GlassButtonGroup orientation="horizontal" size="md">
  <button className="px-4 py-2 text-sm font-medium">Button 1</button>
  <button className="px-4 py-2 text-sm font-medium">Button 2</button>
  <button className="px-4 py-2 text-sm font-medium">Button 3</button>
</GlassButtonGroup>`;

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
                <span className="gradient-text">Button Group</span>
              </h1>
            </div>

            {/* Live Usage */}
            <div className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Live Usage</h2>
              <div className="relative overflow-hidden flex items-center justify-center w-full min-h-[400px] rounded-lg border border-border/20">
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
                  alt="Abstract painting background"
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-black/30" aria-hidden />
                <div className="relative z-10 w-full max-w-4xl p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-medium mb-4">Button Groups</h3>
                    <p className="text-white/90 text-md mb-8 leading-relaxed font-light">
                      Experience the power of Glass design with these
                      beautiful button group components. Perfect for navigation,
                      toolbars, and grouped actions with consistent styling.
                    </p>
                  </div>

                  <div className="space-y-12">
                    {/* Navigation Group */}
                    <div className="text-center">
                      <h4 className="text-lg font-medium mb-4 text-white/80">
                        Navigation Group
                      </h4>
                      <GlassButtonGroup
                        orientation="horizontal"
                        size="md"
                      >
                        <button
                          className={`px-4 py-2 text-sm font-medium transition-colors ${
                            activeTab === "home"
                              ? "text-white"
                              : "text-white/70"
                          }`}
                          onClick={() => setActiveTab("home")}
                        >
                          <Home className="w-4 h-4 mr-2 inline" />
                          Home
                        </button>
                        <button
                          className={`px-4 py-2 text-sm font-medium transition-colors ${
                            activeTab === "profile"
                              ? "text-white"
                              : "text-white/70"
                          }`}
                          onClick={() => setActiveTab("profile")}
                        >
                          <User className="w-4 h-4 mr-2 inline" />
                          Profile
                        </button>
                        <button
                          className={`px-4 py-2 text-sm font-medium transition-colors ${
                            activeTab === "settings"
                              ? "text-white"
                              : "text-white/70"
                          }`}
                          onClick={() => setActiveTab("settings")}
                        >
                          <Settings className="w-4 h-4 mr-2 inline" />
                          Settings
                        </button>
                      </GlassButtonGroup>
                    </div>

                    {/* Action Group */}
                    <div className="text-center">
                      <h4 className="text-lg font-medium mb-4 text-white/80">
                        Action Group
                      </h4>
                      <GlassButtonGroup
                        orientation="horizontal"
                        size="lg"
                      >
                        <button
                          className={`px-6 py-3 text-base font-medium transition-colors ${
                            activeAction === "add"
                              ? "text-white"
                              : "text-white/70"
                          }`}
                          onClick={() => setActiveAction("add")}
                        >
                          <Plus className="w-5 h-5 mr-2 inline" />
                          Add
                        </button>
                        <button
                          className={`px-6 py-3 text-base font-medium transition-colors ${
                            activeAction === "edit"
                              ? "text-white"
                              : "text-white/70"
                          }`}
                          onClick={() => setActiveAction("edit")}
                        >
                          <Edit className="w-5 h-5 mr-2 inline" />
                          Edit
                        </button>
                        <button
                          className={`px-6 py-3 text-base font-medium transition-colors ${
                            activeAction === "delete"
                              ? "text-white"
                              : "text-white/70"
                          }`}
                          onClick={() => setActiveAction("delete")}
                        >
                          <Trash2 className="w-5 h-5 mr-2 inline" />
                          Delete
                        </button>
                      </GlassButtonGroup>
                    </div>

                    {/* Vertical Group */}
                    <div className="text-center">
                      <h4 className="text-lg font-medium mb-4 text-white/80">
                        Vertical Group
                      </h4>
                      <GlassButtonGroup orientation="vertical" size="md">
                        <button className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors">
                          <Search className="w-4 h-4 mr-2 inline" />
                          Search
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors">
                          <Plus className="w-4 h-4 mr-2 inline" />
                          Create
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors">
                          <Minus className="w-4 h-4 mr-2 inline" />
                          Remove
                        </button>
                      </GlassButtonGroup>
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
                  This component uses only React and internal utilities. No additional dependencies are required.
                </p>
              </div>
            </div>

            {/* How It Works */}
            <div className="mb-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-medium mb-6">How It Works</h2>
                <p className="text-muted-foreground mb-6">
                  The `GlassButtonGroup` component creates an elegant
                  container for grouping buttons with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-8">
                  <li>
                    Sophisticated gradient backgrounds that create depth and
                    dimension
                  </li>
                  <li>
                    Multiple shadow layers that simulate realistic glass
                    reflection
                  </li>
                  <li>
                    Gradient overlays that provide authentic glass highlight
                    effects
                  </li>
                  <li>Smooth hover animations that enhance user interaction</li>
                  <li>
                    Backdrop blur that creates the frosted glass appearance
                  </li>
                  <li>
                    Flexible orientation options (horizontal, vertical) for
                    different layouts
                  </li>
                  <li>
                    Flexible sizing options (sm, md, lg) for different use cases
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
                          glass-button-group.tsx
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
                        onClick={() =>
                          copyToClipboard(componentCode, "component")
                        }
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
                  This implementation creates a **premium Glass button
                  group** that provides an elegant container for grouping
                  related buttons with the same sophisticated glass effects as
                  other components. It's perfect for **navigation bars**,
                  **toolbars**, and **action groups** in modern web applications
                  with a professional, polished appearance.
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
