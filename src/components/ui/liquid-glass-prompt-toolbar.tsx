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
   * Slider step granularity for temperature control
   */
  temperatureStep?: number;
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
  /**
   * Render presets as icons only (labels visually hidden)
   */
  iconOnlyPresets?: boolean;
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
    temperatureStep = 0.1,
    presets = [
      { id: "creative", label: "Creative", icon: <Lightbulb className="w-3 h-3" />, active: false, onClick: () => {} },
      { id: "analytical", label: "Analytical", icon: <Brain className="w-3 h-3" />, active: true, onClick: () => {} },
      { id: "concise", label: "Concise", icon: <Zap className="w-3 h-3" />, active: false, onClick: () => {} },
    ],
    compact = false,
    iconOnlyPresets = false,
    className,
    ...props 
  }, ref) => {
    const [showModels, setShowModels] = React.useState(false);

    const baseClasses =
      "border align-middle select-none font-sans text-white rounded-2xl backdrop-blur-xl transition-all duration-500 antialiased relative";

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

        <div className={cn("relative z-10 flex flex-wrap items-center gap-x-3 gap-y-2", compact && "gap-x-2 gap-y-1.5")}>
          {/* Model Selector */}
          <div className="relative flex-shrink-0">
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
              <div className="absolute top-full left-0 mt-2 min-w-48 z-[9999]">
                <div className="relative overflow-hidden rounded-xl border border-white/50 shadow-[0_10px_40px_rgba(0,0,0,0.5)] bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-[40px] backdrop-saturate-200">
                  {/* Glass overlays */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-white/15 to-transparent opacity-80 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-white/30 opacity-60 pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent opacity-70 pointer-events-none" />

                  <div className="relative z-10">
                    {models.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          onModelChange?.(m.id);
                          setShowModels(false);
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2 transition-colors first:rounded-t-xl last:rounded-b-xl",
                          m.id === model
                            ? "bg-white/15 text-white"
                            : "hover:bg-white/10 text-white/90"
                        )}
                      >
                        <div className="font-medium text-sm">{m.name}</div>
                        {m.description && (
                          <div className="text-white/70 text-xs">{m.description}</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Temperature Slider */}
          <div className={cn("flex items-center gap-2 flex-1", compact ? "min-w-[140px]" : "min-w-[180px]")}>
            <Thermometer className={cn("text-white/70", compact ? "w-3 h-3" : "w-4 h-4")} />
            <div className="flex-1 min-w-16">
              <input
                type="range"
                min="0"
                max="1"
                step={temperatureStep}
                value={temperature}
                onChange={(e) => onTemperatureChange?.(parseFloat(e.target.value))}
                className={cn(
                  "w-full bg-white/20 rounded-full appearance-none cursor-pointer",
                  compact ? "h-0.5" : "h-1.5",
                  compact ? "slider-thumb:w-2.5 slider-thumb:h-2.5" : "slider-thumb:w-4 slider-thumb:h-4",
                  "slider-thumb:appearance-none slider-thumb:bg-white slider-thumb:rounded-full slider-thumb:cursor-pointer"
                )}
                style={{
                  background: `linear-gradient(to right, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.6) ${temperature * 100}%, rgba(255,255,255,0.2) ${temperature * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
            </div>
            <span className={cn("text-white/70 font-mono", compact ? "text-xs" : "text-sm")}>
              {temperature.toFixed(1)}
            </span>
          </div>

          {/* Preset Chips */}
          <div className={cn("flex items-center gap-2 flex-wrap basis-full sm:basis-auto sm:ml-auto", compact && "gap-1.5") }>
            {presets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={preset.onClick}
                className={cn(
                  "inline-flex items-center rounded-full transition-colors",
                  "border backdrop-blur-sm",
                  iconOnlyPresets ? (compact ? "px-1.5 py-1" : "px-2 py-1.5") : (compact ? "px-2 py-1 gap-1" : "px-2.5 py-1.5 gap-1.5"),
                  preset.active
                    ? "bg-white/20 border-white/40 text-white"
                    : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:border-white/30 hover:text-white/90"
                )}
                aria-label={preset.label}
              >
                {preset.icon}
                {!iconOnlyPresets && (
                  <span className={cn("font-medium", compact ? "text-xs" : "text-sm")}>
                    {preset.label}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

LiquidGlassPromptToolbar.displayName = "LiquidGlassPromptToolbar";

export { LiquidGlassPromptToolbar };
