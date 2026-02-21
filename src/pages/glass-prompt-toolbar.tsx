import React from "react";
import { GlassPromptToolbar } from "@/components/ui/glass-prompt-toolbar";
import ComponentPageLayout from "@/components/component-page-layout";

export default function GlassPromptToolbarPage() {
  const componentCode = `"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Thermometer, Zap, Brain, Lightbulb } from "lucide-react";

export interface GlassPromptToolbarPropsProps extends React.HTMLAttributes<HTMLDivElement> {
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
   * Temperature change callback
   */
  onTemperatureChange?: (temp: number) => void;
  /**
   * Presexport interface GlassPromptToolbarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  model?: string;
  models?: string[];
  onModelChange?: (model: string) => void;
  temperature?: number;
  onTemperatureChange?: (temp: number) => void;
  presets?: PresetItem[];
  activePreset?: string;
  onPresetChange?: (key: string) => void;
  size?: "sm" | "md" | "lg";
  compact?: boolean;
  className?: string;
}

const GlassPromptToolbar = React.forwardRef<HTMLDivElement, GlassPromptToolbarProps>(
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

GlassPromptToolbar.displayName = "GlassPromptToolbar";

export { GlassPromptToolbar };`;

  const usageCode = `import { GlassPromptToolbar } from "@/components/ui/glass-prompt-toolbar";
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
    <GlassPromptToolbar
      model={model}
      onModelChange={setModel}
      temperature={temperature}
      onTemperatureChange={setTemperature}
      presets={presets}
    />
  );
}`;

  return (
    <ComponentPageLayout
      name="Prompt Toolbar"
      description="A configuration toolbar with model selector, temperature controls, and preset options."
      preview={
        <div className="w-full max-w-lg">
          <GlassPromptToolbar compact className="w-full" />
        </div>
      }
      features={[
        "Model selector dropdown with glass styling",
        "Temperature slider with visual feedback",
        "Preset configuration buttons",
        "Compact mode for integration with prompt inputs",
        "Glass-styled container with frosted backdrop"
]}
      componentCode={componentCode}
      usageCode={usageCode}
    />
  );
}
