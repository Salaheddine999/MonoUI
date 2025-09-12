import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LiquidGlassPromptInput } from "@/components/ui/liquid-glass-prompt-input";
import { ArrowLeft, Copy, Check, Sparkles, Plus, Globe, MoreHorizontal } from "lucide-react";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function LiquidGlassPromptInputPage() {
  const [, setLocation] = useLocation();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [value, setValue] = useState("");

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

export interface LiquidGlassPromptInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
  multiline?: boolean;
  prefixIcon?: React.ReactNode;
  onSend?: () => void;
  sendLabel?: string;
  className?: string;
}

const sizeMap = {
  sm: { container: "p-2", field: "text-sm py-1", round: "rounded-xl", gap: "gap-2", btn: "px-2 py-1 text-xs" },
  md: { container: "p-3", field: "text-base py-2", round: "rounded-2xl", gap: "gap-3", btn: "px-3 py-1.5 text-sm" },
  lg: { container: "p-4", field: "text-lg py-3", round: "rounded-2xl", gap: "gap-4", btn: "px-4 py-2 text-base" },
};

export const LiquidGlassPromptInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  LiquidGlassPromptInputProps
>(
  (
    { size = "md", multiline = false, prefixIcon, onSend, sendLabel = "Send", className, onKeyDown, ...props },
    ref
  ) => {
    const s = sizeMap[size];

    const baseClasses =
      "border align-middle select-none font-sans text-white backdrop-blur-xl transition-all duration-500 antialiased relative overflow-hidden";

    const glassClasses =
      "bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)] focus-within:from-white/25 focus-within:via-white/15 focus-within:to-white/10 focus-within:shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.1),0_12px_40px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3)]";

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (onKeyDown) (onKeyDown as unknown as (ev: any) => void)(e as any);
      if (!multiline && e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSend?.();
      }
      if (multiline && e.key === "Enter" && e.ctrlKey) {
        e.preventDefault();
        onSend?.();
      }
    };

    return (
      <div className={cn(baseClasses, glassClasses, s.round, s.container, className)}>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none" />

        <div className={cn("relative z-10 flex items-center", s.gap)}>
          {prefixIcon && <div className="text-white/70 flex items-center pl-1">{prefixIcon}</div>}
          {multiline ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              className={cn("flex-1 bg-transparent outline-none text-white placeholder:text-white/60 resize-none", s.field)}
              rows={3}
              onKeyDown={handleKeyDown}
              {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              className={cn("flex-1 bg-transparent outline-none text-white placeholder:text-white/60", s.field)}
              onKeyDown={handleKeyDown}
              {...props}
            />
          )}

          {onSend && (
            <button
              type="button"
              onClick={onSend}
              className={cn(
                "font-medium text-white/90 hover:text-white transition-colors border border-white/30 hover:border-white/50",
                "bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl",
                s.btn
              )}
              aria-label={sendLabel}
            >
              {sendLabel}
            </button>
          )}
        </div>
      </div>
    );
  }
);

LiquidGlassPromptInput.displayName = "LiquidGlassPromptInput";`;

  const usageCode = `import { LiquidGlassPromptInput } from "@/components/ui/liquid-glass-prompt-input";
import { Sparkles, Plus, Globe, MoreHorizontal } from "lucide-react";

export default function Example() {
  const [prompt, setPrompt] = React.useState("");
  return (
    <LiquidGlassPromptInput
      size="lg"
      layout="panel"
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      onSend={() => console.log("send:", prompt)}
      prefixIcon={<Sparkles className=\"w-4 h-4\" />}
      sendLabel="Send"
      placeholder="Message ChatGPT"
      actions={[
        { label: "", icon: <Plus className=\"w-4 h-4\" />, ariaLabel: "Add" },
        { label: "Search", icon: <Globe className=\"w-4 h-4\" /> },
        { label: "", icon: <MoreHorizontal className=\"w-4 h-4\" />, ariaLabel: "More" },
      ]}
    />
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
                Liquid Glass <span className="gradient-text">Prompt Input</span>
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
                <div className="relative z-10 flex items-center justify-center w-full h-full p-6">
                  <div className="w-full max-w-2xl">
                    <LiquidGlassPromptInput
                      size="lg"
                      layout="panel"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      onSend={() => alert('Sending: ' + value)}
                      prefixIcon={<Sparkles className="w-5 h-5" />}
                      sendLabel="Send"
                      placeholder="Message ChatGPT"
                      actions={[
                        { label: "", icon: <Plus className="w-4 h-4" />, ariaLabel: "Add" },
                        { label: "Search", icon: <Globe className="w-4 h-4" /> },
                        { label: "", icon: <MoreHorizontal className="w-4 h-4" />, ariaLabel: "More" },
                      ]}
                    />
                  </div>
                </div>
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
                          liquid-glass-prompt-input.tsx
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
                  The LiquidGlassPromptInput is tailored for AI prompts with optional
                  prefix icons and a send action, inheriting the same glass layers and
                  animations for a cohesive look.
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
