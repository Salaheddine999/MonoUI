import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LiquidGlassPromptToolbar } from "@/components/ui/liquid-glass-prompt-toolbar";
import { ArrowLeft, Copy, Check, Lightbulb, Brain, Zap } from "lucide-react";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function LiquidGlassPromptToolbarPage() {
  const [, setLocation] = useLocation();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [temperature, setTemperature] = useState(0.7);
  const [activePreset, setActivePreset] = useState("analytical");

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
import { ChevronDown, Thermometer, Zap, Brain, Lightbulb } from "lucide-react";

export interface LiquidGlassPromptToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Current selected model
   */
  model?: string;
  /**
   * Available models
   */
  models?: Array<{ id: string; name: string; description?: string }>;
  /**
   * Model selection callback
   */
  onModelChange?: (modelId: string) => void;
  /**
   * Temperature value (0-1)
   */
  temperature?: number;
  /**
   * Temperature change callback
   */
  onTemperatureChange?: (temperature: number) => void;
  /**
   * Preset tone/style options
   */
  presets?: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
  }>;
  /**
   * Compact spacing
   */
  compact?: boolean;
  className?: string;
}

const LiquidGlassPromptToolbar = React.forwardRef<HTMLDivElement, LiquidGlassPromptToolbarProps>(
  ({ 
    model = "gpt-4",
    models = [
      { id: "gpt-4", name: "GPT-4", description: "Most capable model" },
      { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", description: "Fast and efficient" },
      { id: "claude-3", name: "Claude 3", description: "Anthropic's latest" },
    ],
    onModelChange,
    temperature = 0.7,
    onTemperatureChange,
    presets = [
      { id: "creative", label: "Creative", icon: <Lightbulb className="w-3 h-3" />, active: false },
      { id: "analytical", label: "Analytical", icon: <Brain className="w-3 h-3" />, active: true },
      { id: "concise", label: "Concise", icon: <Zap className="w-3 h-3" />, active: false },
    ],
    compact = false,
    className,
    ...props 
  }, ref) => {
    const [showModels, setShowModels] = React.useState(false);

    const baseClasses =
      "border align-middle select-none font-sans text-white rounded-2xl backdrop-blur-xl transition-all duration-500 antialiased relative overflow-hidden";

    const glassClasses =
      "bg-gradient-to-br from-white/10 via-white/5 to-white/3 border-white/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-1px_1px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.2)]";

    const selectedModel = models.find(m => m.id === model);

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          glassClasses,
          compact ? "p-3" : "p-4",
          className
        )}
        {...props}
      >
        {/* Glass overlays */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 via-white/5 to-transparent opacity-50 pointer-events-none" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-transparent via-white/3 to-white/10 opacity-30 pointer-events-none" />

        <div className={cn("relative z-10 flex items-center justify-between gap-4", compact && "gap-3")}>
          {/* Model Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowModels(!showModels)}
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl",
                "bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/40",
                "text-white/90 text-sm backdrop-blur-sm transition-colors",
                compact && "px-2.5 py-1 text-xs"
              )}
            >
              <span className="font-medium">{selectedModel?.name}</span>
              <ChevronDown className={cn("transition-transform", showModels && "rotate-180", compact ? "w-3 h-3" : "w-4 h-4")} />
            </button>

            {/* Dropdown */}
            {showModels && (
              <div className="absolute top-full left-0 mt-2 min-w-48 bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-50">
                {models.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      onModelChange?.(m.id);
                      setShowModels(false);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 hover:bg-white/10 transition-colors first:rounded-t-xl last:rounded-b-xl",
                      m.id === model && "bg-white/10"
                    )}
                  >
                    <div className="font-medium text-white text-sm">{m.name}</div>
                    {m.description && (
                      <div className="text-white/60 text-xs">{m.description}</div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Temperature Slider */}
          <div className="flex items-center gap-2 min-w-0">
            <Thermometer className={cn("text-white/70", compact ? "w-3 h-3" : "w-4 h-4")} />
            <div className="flex-1 min-w-16">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={temperature}
                onChange={(e) => onTemperatureChange?.(parseFloat(e.target.value))}
                className={cn(
                  "w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer",
                  "slider-thumb:appearance-none slider-thumb:w-3 slider-thumb:h-3 slider-thumb:bg-white slider-thumb:rounded-full slider-thumb:cursor-pointer",
                  compact && "h-0.5"
                )}
                style={{
                  background: \`linear-gradient(to right, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.6) \${temperature * 100}%, rgba(255,255,255,0.2) \${temperature * 100}%, rgba(255,255,255,0.2) 100%)\`
                }}
              />
            </div>
            <span className={cn("text-white/70 font-mono", compact ? "text-xs" : "text-sm")}>
              {temperature.toFixed(1)}
            </span>
          </div>

          {/* Preset Chips */}
          <div className={cn("flex items-center gap-2", compact && "gap-1.5")}>
            {presets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={preset.onClick}
                className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-colors",
                  "border backdrop-blur-sm",
                  compact ? "px-2 py-1 gap-1" : "px-2.5 py-1.5 gap-1.5",
                  preset.active
                    ? "bg-white/20 border-white/40 text-white"
                    : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:border-white/30 hover:text-white/90"
                )}
              >
                {preset.icon}
                <span className={cn("font-medium", compact ? "text-xs" : "text-sm")}>
                  {preset.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

LiquidGlassPromptToolbar.displayName = "LiquidGlassPromptToolbar";

export { LiquidGlassPromptToolbar };`;

  const usageCode = `import { LiquidGlassPromptToolbar } from "@/components/ui/liquid-glass-prompt-toolbar";
import { Lightbulb, Brain, Zap } from "lucide-react";

export default function PromptExample() {
  const [model, setModel] = useState("gpt-4");
  const [temperature, setTemperature] = useState(0.7);
  const [activePreset, setActivePreset] = useState("analytical");

  const presets = [
    { 
      id: "creative", 
      label: "Creative", 
      icon: <Lightbulb className="w-3 h-3" />, 
      active: activePreset === "creative",
      onClick: () => setActivePreset("creative")
    },
    { 
      id: "analytical", 
      label: "Analytical", 
      icon: <Brain className="w-3 h-3" />, 
      active: activePreset === "analytical",
      onClick: () => setActivePreset("analytical")
    },
    { 
      id: "concise", 
      label: "Concise", 
      icon: <Zap className="w-3 h-3" />, 
      active: activePreset === "concise",
      onClick: () => setActivePreset("concise")
    },
  ];

  return (
    <LiquidGlassPromptToolbar
      model={model}
      onModelChange={setModel}
      temperature={temperature}
      onTemperatureChange={setTemperature}
      presets={presets}
    />
  );
}`;

  const presets = [
    { 
      id: "creative", 
      label: "Creative", 
      icon: <Lightbulb className="w-3 h-3" />, 
      active: activePreset === "creative",
      onClick: () => setActivePreset("creative")
    },
    { 
      id: "analytical", 
      label: "Analytical", 
      icon: <Brain className="w-3 h-3" />, 
      active: activePreset === "analytical",
      onClick: () => setActivePreset("analytical")
    },
    { 
      id: "concise", 
      label: "Concise", 
      icon: <Zap className="w-3 h-3" />, 
      active: activePreset === "concise",
      onClick: () => setActivePreset("concise")
    },
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
                Liquid Glass <span className="gradient-text">Prompt Toolbar</span>
              </h1>
            </div>

            {/* Live Usage */}
            <div className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Live Usage</h2>
              <div className="relative overflow-hidden w-full min-h-[200px] rounded-lg border border-border/20">
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
                  alt="Abstract painting background"
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-black/30" aria-hidden />
                <div className="relative z-10 flex items-center justify-center w-full h-full p-6">
                  <div className="w-full max-w-4xl">
                    <LiquidGlassPromptToolbar
                      model={selectedModel}
                      onModelChange={setSelectedModel}
                      temperature={temperature}
                      onTemperatureChange={setTemperature}
                      temperatureStep={0.1}
                      presets={presets}
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
                  The `LiquidGlassPromptToolbar` consolidates common prompt configuration
                  controls into a compact glass bar:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-8">
                  <li><strong>Model selector</strong>: glass button opens a liquid-glass dropdown of models.</li>
                  <li><strong>Temperature slider</strong>: range input with visual fill and adjustable step.</li>
                  <li><strong>Presets</strong>: glass chips for tone/style toggles with active state.</li>
                  <li><strong>Responsive</strong>: wraps on small widths; presets can move to the next line.</li>
                  <li><strong>Compact mode</strong>: tighter spacing for previews or dense layouts.</li>
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
                          liquid-glass-prompt-toolbar.tsx
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
                  The LiquidGlassPromptToolbar provides model selection, temperature control,
                  and preset tone options in a sleek glass interface. Perfect for AI prompt
                  configuration and chat settings.
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
