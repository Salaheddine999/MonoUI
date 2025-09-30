"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type SuggestionItem = {
  id?: string | number;
  label: string;
  icon?: React.ReactNode;
  description?: string;
};

export interface GlassPromptSuggestionsProps
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

const GlassPromptSuggestions = React.forwardRef<HTMLDivElement, GlassPromptSuggestionsProps>(
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

GlassPromptSuggestions.displayName = "GlassPromptSuggestions";
export { GlassPromptSuggestions };
