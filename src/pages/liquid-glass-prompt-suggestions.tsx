import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LiquidGlassPromptSuggestions } from "@/components/ui/liquid-glass-prompt-suggestions";
import { ArrowLeft, Copy, Check, Sparkles, Settings, Lightbulb } from "lucide-react";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function LiquidGlassPromptSuggestionsPage() {
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

export type SuggestionItem = {
  id?: string | number;
  label: string;
  icon?: React.ReactNode;
  description?: string;
};

export interface LiquidGlassPromptSuggestionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  suggestions: SuggestionItem[];
  onSuggestionSelect?: (item: SuggestionItem) => void;
  /**
   * Display size
   */
  size?: "sm" | "md" | "lg";
  /**
   * Layout variant
   * - chips: horizontal/flow chips
   * - panel: card-like list
   */
  layout?: "chips" | "panel";
  /**
   * Compact spacing
   */
  compact?: boolean;
}

const sizeMap = {
  sm: { pad: "p-2", gap: "gap-1.5", text: "text-xs", chipPad: "px-2 py-1", round: "rounded-xl" },
  md: { pad: "p-3", gap: "gap-2", text: "text-sm", chipPad: "px-3 py-1.5", round: "rounded-2xl" },
  lg: { pad: "p-4", gap: "gap-3", text: "text-base", chipPad: "px-4 py-2", round: "rounded-2xl" },
};

const LiquidGlassPromptSuggestions = React.forwardRef<HTMLDivElement, LiquidGlassPromptSuggestionsProps>(
  (
    { suggestions, onSuggestionSelect, size = "md", layout = "chips", compact = false, className, ...props },
    ref
  ) => {
    const s = sizeMap[size];

    const baseClasses =
      "border align-middle select-none font-sans text-white backdrop-blur-xl transition-all duration-500 antialiased relative overflow-hidden";

    const glassClasses =
      "bg-gradient-to-br from-white/12 via-white/6 to-white/4 border-white/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-1px_1px_rgba(0,0,0,0.08),0_6px_24px_rgba(0,0,0,0.25),0_2px_10px_rgba(0,0,0,0.15)]";

    const chipClasses =
      "inline-flex items-center gap-2 border border-white/30 bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-colors backdrop-blur-sm rounded-full";

    return (
      <div
        ref={ref}
        className={cn(baseClasses, glassClasses, s.round, compact ? "p-2" : s.pad, className)}
        {...props}
      >
        {/* Glass overlays */}
        <div className={cn("absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/35 via-white/10 to-transparent opacity-50 pointer-events-none", s.round)} />
        <div className={cn("absolute inset-0 rounded-2xl bg-gradient-to-bl from-transparent via-white/5 to-white/15 opacity-30 pointer-events-none", s.round)} />
        <div className={cn("absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/25 to-transparent opacity-40 pointer-events-none")} />

        {/* Content */}
        {layout === "panel" ? (
          <div className={cn("relative z-10 flex flex-col", s.gap)}>
            {suggestions.map((item, idx) => (
              <button
                key={item.id ?? idx}
                type="button"
                onClick={() => onSuggestionSelect?.(item)}
                className={cn(
                  "w-full text-left flex items-start gap-3 border border-white/25 bg-white/10 hover:bg-white/20 rounded-xl transition-colors p-3",
                  compact && "p-2"
                )}
              >
                {item.icon && (
                  <span className={cn("text-white/80 flex-shrink-0", size === "sm" ? "w-3.5 h-3.5" : size === "md" ? "w-4 h-4" : "w-5 h-5")}>{item.icon}</span>
                )}
                <span className={cn("font-medium text-white", s.text)}>{item.label}</span>
                {item.description && (
                  <span className={cn("ml-auto text-white/70", s.text)}>{item.description}</span>
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className={cn("relative z-10 flex flex-wrap", s.gap)}>
            {suggestions.map((item, idx) => (
              <button
                key={item.id ?? idx}
                type="button"
                onClick={() => onSuggestionSelect?.(item)}
                className={cn(chipClasses, s.chipPad)}
              >
                {item.icon && <span className="text-white/80">{item.icon}</span>}
                <span className={cn("font-medium", s.text)}>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

LiquidGlassPromptSuggestions.displayName = "LiquidGlassPromptSuggestions";
export { LiquidGlassPromptSuggestions };`;

  const usageCode = `import { LiquidGlassPromptSuggestions } from "@/components/ui/liquid-glass-prompt-suggestions";
import { Sparkles, Settings, Lightbulb } from "lucide-react";

export default function Example() {
  return (
    <div className="space-y-4">
      <LiquidGlassPromptSuggestions
        size="md"
        layout="chips"
        suggestions={[
          { label: "Summarize text", icon: <Sparkles className="w-4 h-4" /> },
          { label: "Improve writing", icon: <Settings className="w-4 h-4" /> },
          { label: "Brainstorm ideas", icon: <Lightbulb className="w-4 h-4" /> },
        ]}
        onSuggestionSelect={(s) => console.log("selected:", s)}
      />

      <LiquidGlassPromptSuggestions
        size="md"
        layout="panel"
        suggestions={[
          { label: "Translate to French", description: "Bonjour..." },
          { label: "Explain step-by-step", description: "Use numbered steps" },
        ]}
        onSuggestionSelect={(s) => console.log("selected:", s)}
      />
    </div>
  );
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
                Liquid Glass <span className="gradient-text">Prompt Suggestions</span>
              </h1>
            </div>

            {/* Live Usage */}
            <div className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Live Usage</h2>
              <div className="relative overflow-hidden w-full min-h-[260px] rounded-lg border border-border/20">
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
                  alt="Abstract painting background"
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-black/30" aria-hidden />
                <div className="relative z-10 flex items-center justify-center w-full h-full p-6">
                  <div className="w-full max-w-3xl space-y-4">
                    <LiquidGlassPromptSuggestions
                      size="md"
                      layout="chips"
                      suggestions={[
                        { label: "Summarize this", icon: <Sparkles className="w-4 h-4" /> },
                        { label: "Improve writing", icon: <Settings className="w-4 h-4" /> },
                        { label: "Brainstorm ideas", icon: <Lightbulb className="w-4 h-4" /> },
                      ]}
                      onSuggestionSelect={(s) => alert("Selected: " + s.label)}
                    />

                    <LiquidGlassPromptSuggestions
                      size="md"
                      layout="panel"
                      suggestions={[
                        { label: "Translate to French", description: "Bonjour..." },
                        { label: "Explain step-by-step", description: "Use numbered steps" },
                      ]}
                      onSuggestionSelect={(s) => alert("Selected: " + s.label)}
                    />
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
                      <div className="flex items中心 gap-3">
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
                  The `LiquidGlassPromptSuggestions` component displays quick-start prompt chips or a panel list
                  with liquid glass aesthetics. Use it near your prompt input to help users start faster.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-8">
                  <li>Glass layers with gradients, borders, and blur for realistic depth.</li>
                  <li>Two layouts: `chips` for compact horizontal suggestions, `panel` for detailed list.</li>
                  <li>Optional icons and descriptions per suggestion.</li>
                  <li>Accessible buttons with hover/focus states and keyboard navigation via standard focus rules.</li>
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
                          liquid-glass-prompt-suggestions.tsx
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

            <div className="mb-16">
              <div className="max-w-4xl mx-auto">
                <p className="text-muted-foreground text-lg">
                  The LiquidGlassPromptSuggestions component provides elegant, ready-to-use prompt ideas
                  to boost UX in AI chat experiences.
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
