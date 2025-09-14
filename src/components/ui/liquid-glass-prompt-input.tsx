import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";

export interface LiquidGlassPromptInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
  multiline?: boolean;
  prefixIcon?: React.ReactNode;
  onSend?: () => void;
  sendLabel?: string;
  /**
   * Layout style. 'inline' renders a single-row input. 'panel' renders a large rounded panel
   * with the field on top and a bottom action row (chips + circular send button).
   */
  layout?: "inline" | "panel";
  /**
   * Optional action chips displayed on the bottom-left when layout='panel'
   */
  actions?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    ariaLabel?: string;
  }>;
  /**
   * Optional custom icon for the circular send button (panel layout).
   */
  sendIcon?: React.ReactNode;
  /**
   * Compact spacing for tight containers (panel layout only)
   */
  compact?: boolean;
  className?: string;
}

const sizeMap = {
  sm: {
    container: "p-2",
    field: "text-sm py-1",
    round: "rounded-xl",
    gap: "gap-2",
    btn: "px-2 py-1 text-xs",
  },
  md: {
    container: "p-3",
    field: "text-base py-2",
    round: "rounded-2xl",
    gap: "gap-3",
    btn: "px-3 py-1.5 text-sm",
  },
  lg: {
    container: "p-4",
    field: "text-lg py-3",
    round: "rounded-2xl",
    gap: "gap-4",
    btn: "px-4 py-2 text-base",
  },
};

export const LiquidGlassPromptInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  LiquidGlassPromptInputProps
>(
  (
    {
      size = "md",
      multiline = false,
      prefixIcon,
      onSend,
      sendLabel = "Send",
      layout = "inline",
      actions = [],
      sendIcon,
      className,
      compact = false,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const s = sizeMap[size];

    const baseClasses =
      "border align-middle select-none font-sans text-white backdrop-blur-md transition-all duration-500 antialiased relative overflow-hidden";

    const glassClasses =
      "bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)] focus-within:from-white/25 focus-within:via-white/15 focus-within:to-white/10 focus-within:shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.1),0_12px_40px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3)]";

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // Cast to any to support both input and textarea event handlers from the inherited props
      if (onKeyDown) (onKeyDown as unknown as (ev: any) => void)(e as any);
      if (!multiline && e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSend?.();
      }
      if (multiline && e.key === "Enter" && e.ctrlKey) {
        // Ctrl+Enter to send for multiline
        e.preventDefault();
        onSend?.();
      }
    };

    // Inline layout (previous behavior)
    if (layout === "inline") {
      return (
        <div className={cn(baseClasses, glassClasses, s.round, s.container, className)}>
          {/* Overlays */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none" />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none" />

          <div className={cn("relative z-10 flex items-center", s.gap)}>
            {prefixIcon && <div className="text-white/70 flex items-center pl-1">{prefixIcon}</div>}
            {multiline ? (
              <textarea
                ref={ref as React.Ref<HTMLTextAreaElement>}
                className={cn(
                  "flex-1 bg-transparent outline-none text-white placeholder:text-white/60 resize-none",
                  s.field
                )}
                rows={3}
                onKeyDown={handleKeyDown}
                {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
              />
            ) : (
              <input
                ref={ref as React.Ref<HTMLInputElement>}
                className={cn(
                  "flex-1 bg-transparent outline-none text-white placeholder:text-white/60",
                  s.field
                )}
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

    // Panel layout
    return (
      <div className={cn(baseClasses, glassClasses, "rounded-3xl", s.container, className)}>
        {/* Overlays */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none" />
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-3xl bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none" />

        <div className={cn("relative z-10 flex flex-col", compact ? "gap-2" : "gap-3") }>
          {/* Field */}
          <div className={cn("flex items-start", compact ? "gap-2" : "gap-3") }>
            {prefixIcon && <div className="text-white/70 flex items-start pt-1 pl-1">{prefixIcon}</div>}
            {multiline ? (
              <textarea
                ref={ref as React.Ref<HTMLTextAreaElement>}
                className={cn(
                  "w-full bg-transparent outline-none text-white placeholder:text-white/60 resize-none",
                  s.field
                )}
                rows={4}
                onKeyDown={handleKeyDown}
                {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
              />
            ) : (
              <input
                ref={ref as React.Ref<HTMLInputElement>}
                className={cn(
                  "w-full bg-transparent outline-none text-white placeholder:text-white/60",
                  s.field
                )}
                onKeyDown={handleKeyDown}
                {...props}
              />
            )}
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between">
            {/* Chips */}
            <div className={cn("flex items-center flex-wrap", compact ? "gap-1.5" : "gap-2") }>
              {actions?.map((a, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={a.onClick}
                  className={cn(
                    compact ? "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full" : "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
                    "bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/40",
                    compact ? "text-white/90 text-[11px] backdrop-blur-sm transition-colors" : "text-white/90 text-xs backdrop-blur-sm transition-colors"
                  )}
                  aria-label={a.ariaLabel ?? a.label}
                >
                  {a.icon}
                  <span>{a.label}</span>
                </button>
              ))}
            </div>

            {/* Circular send */}
            {onSend && (
              <button
                type="button"
                onClick={onSend}
                className={cn(
                  "inline-flex items-center justify-center",
                  compact ? "w-8 h-8 rounded-full" : "w-10 h-10 rounded-full",
                  "bg-white/90 hover:bg-white text-black",
                  "shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-colors"
                )}
                aria-label={sendLabel}
                title={sendLabel}
              >
                {sendIcon ?? <ArrowUp className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

LiquidGlassPromptInput.displayName = "LiquidGlassPromptInput";
