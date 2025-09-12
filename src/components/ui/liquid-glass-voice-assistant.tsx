"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Mic, Square, Trash2 } from "lucide-react";

interface LiquidGlassVoiceAssistantProps
  extends React.HTMLAttributes<HTMLDivElement> {
  listening?: boolean;
  transcript?: string;
  onToggleListening?: (listening: boolean) => void;
  onClear?: () => void;
  size?: "sm" | "md" | "lg";
  compact?: boolean;
  title?: string;
  showHeader?: boolean; // if undefined, will be !compact
  showPrompt?: boolean; // if undefined, will be true
  promptText?: string;
  layout?: "panel" | "full";
  indicator?: "dots" | "bars";
  statusIdleLabel?: string;
  statusListeningLabel?: string;
  className?: string;
}

const LiquidGlassVoiceAssistant = React.forwardRef<
  HTMLDivElement,
  LiquidGlassVoiceAssistantProps
>(
  (
    {
      listening = false,
      transcript,
      onToggleListening,
      onClear,
      size = "md",
      compact,
      className,
      title = "AI Voice Assistant",
      showHeader,
      showPrompt,
      promptText = "Say \"Hey AI\" to start speaking",
      layout = "full",
      indicator = "dots",
      statusIdleLabel = "Idle",
      statusListeningLabel = "Listening",
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "relative border rounded-2xl text-white backdrop-blur-xl transition-all duration-500 overflow-hidden";

    const glassClasses =
      "bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_10px_40px_rgba(0,0,0,0.35),0_3px_10px_rgba(0,0,0,0.25)]";

    const sizeClasses = {
      sm: "px-2.5 py-1.5",
      md: "px-6 py-4",
      lg: "px-8 py-6",
    } as const;

    const micSize = {
      sm: "h-8 w-8",
      md: "h-11 w-11",
      lg: "h-14 w-14",
    }[size];

    const pulseScale = {
      sm: 1.25,
      md: 1.35,
      lg: 1.45,
    }[size];

    const renderHeader = (showHeader ?? !compact);
    const renderPrompt = (showPrompt ?? true);

    return (
      <div
        ref={ref}
        className={cn(baseClasses, glassClasses, sizeClasses[size], className)}
        {...props}
      >
        {/* Decorative overlays */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none" />

        <div className={cn(
          "relative z-10 flex w-full",
          layout === "panel"
            ? ((size === "sm" || compact) ? "flex-col gap-1" : "flex-col gap-2")
            : cn("gap-4", compact ? "flex-row" : "flex-col")
        )}
        >
          {/* Header */}
          {renderHeader && (
            <div className={cn(
              "w-full flex items-center justify-between",
              layout === "panel" ? "mb-0.5" : "mb-1"
            )}>
              <span className="text-sm font-normal text-white/90">{title}</span>
              <span className="inline-flex items-center gap-2 text-xs text-white/80">
                <span className={cn("w-1.5 h-1.5 rounded-full",
                  listening ? "bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.7)]" : "bg-white/50")}
                />
                {listening ? statusListeningLabel : statusIdleLabel}
              </span>
            </div>
          )}

          {/* Mic button with liquid pulse */}
          <div className="relative flex flex-col items-center mt-0.5">
            {listening && (
              <motion.span
                initial={false}
                animate={{
                  scale: [1, pulseScale, 1],
                  opacity: [0.6, 0.25, 0.6],
                }}
                transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-primary/40 blur-2xl"
                aria-hidden
              />
            )}
            {/* Soft ground shadow to lift the mic */}
            <span
              aria-hidden
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[68%] h-2 rounded-full bg-black/50 blur-md opacity-30"
            />
            <button
              type="button"
              className={cn(
                "group relative inline-flex items-center justify-center rounded-full",
                // Glass shell
                "bg-white/10 backdrop-blur-xl backdrop-saturate-150",
                // Depth and inner bevel
                "shadow-[0_8px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-3px_8px_rgba(0,0,0,0.25)]",
                micSize,
                listening ? "text-white" : "text-white/80 hover:text-white",
              )}
              onClick={() => onToggleListening?.(!listening)}
              aria-pressed={listening}
              aria-label={listening ? "Stop listening" : "Start listening"}
            >
              {listening ? (
                <Square className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
              {/* Inner shine removed to drop visible border; rely on specular + inner core */}
              {/* Top specular highlight */}
              <span className="pointer-events-none absolute inset-px rounded-full bg-gradient-to-b from-white/50 via-white/10 to-transparent opacity-80" />
              {/* Inner glass core */}
              <span className="pointer-events-none absolute inset-[8%] rounded-full bg-white/5 backdrop-blur-sm" />
              {/* Animated listening ring */}
              {listening && (
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute -inset-[4px] rounded-full ring-2 ring-primary/40"
                  initial={{ opacity: 0.35, scale: 0.98 }}
                  animate={{ opacity: [0.35, 0.15, 0.35], scale: [0.98, 1.04, 0.98] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              {/* Subtle hover scale */}
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              />
              {/* Focus/hover aura */}
              <span className="pointer-events-none absolute -inset-1 rounded-full bg-white/0 group-hover:bg-white/5 group-focus-visible:bg-white/10 transition-colors" />
            </button>

            {/* Centralized 5-bar voice glyph (smoother, premium look) */}
            <div className={cn(layout === "panel" ? (size === "sm" ? "mt-1.5" : "mt-2") : "mt-3")}>
              <div className={cn(
                "relative rounded-full border border-white/20 bg-white/5 overflow-hidden",
                size === "sm" ? "px-2.5 py-0.5" : "px-3 py-1"
              )}>
                {/* Sheen sweep */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -inset-8 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
                />
                {indicator === "dots" ? (
                  <motion.div
                    className={cn("flex items-center justify-center gap-2", size === "sm" ? "h-5" : "h-6")}
                    aria-hidden
                    initial={false}
                    animate={{ y: listening ? [0, -0.5, 0] : [0, -0.25, 0] }}
                    transition={{ duration: listening ? 2.6 : 3.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {[0, 1, 2, 3, 4].map((i) => (
                      <motion.span
                        key={i}
                        className={cn(
                          "rounded-full bg-white/85 shadow-[0_0_8px_rgba(255,255,255,0.25)]",
                          size === "sm" ? "h-[5px] w-[5px]" : "h-[6px] w-[6px]"
                        )}
                        animate={{
                          scale: listening ? [1, 1.4, 1] : [0.95, 1.05, 0.98],
                          opacity: listening ? [0.8, 1, 0.8] : [0.6, 0.8, 0.7],
                        }}
                        transition={{
                          duration: listening ? 1.2 : 1.8,
                          repeat: Infinity,
                          ease: [0.22, 1, 0.36, 1],
                          delay: i * (listening ? 0.08 : 0.12),
                        }}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    className={cn("flex items-end gap-1.5", size === "sm" ? "h-4.5" : "h-5")}
                    aria-hidden
                    initial={false}
                    animate={{ y: listening ? [0, -0.5, 0] : [0, -0.25, 0] }}
                    transition={{ duration: listening ? 2.8 : 3.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {(size === "sm"
                      ? [
                          { w: "w-[2px]", base: 6, peak: 12 },
                          { w: "w-[2px]", base: 10, peak: 18 },
                          { w: "w-[3px]", base: 16, peak: 26 },
                          { w: "w-[2px]", base: 10, peak: 18 },
                          { w: "w-[2px]", base: 6, peak: 12 },
                        ]
                      : [
                          { w: "w-[3px]", base: 8, peak: 16 },
                          { w: "w-[3px]", base: 12, peak: 22 },
                          { w: "w-[4px]", base: 18, peak: 30 },
                          { w: "w-[3px]", base: 12, peak: 22 },
                          { w: "w-[3px]", base: 8, peak: 16 },
                        ]
                    ).map((bar, i) => (
                      <motion.span
                        key={i}
                        className={cn(
                          bar.w,
                          "rounded-full origin-bottom",
                          "bg-gradient-to-t from-white/85 to-white/50",
                          "shadow-[0_0_10px_rgba(255,255,255,0.22)]"
                        )}
                        style={{ height: bar.base }}
                        animate={{
                          scaleY: listening
                            ? [1, bar.peak / bar.base, 1]
                            : [0.96, 1, 0.98],
                          opacity: listening ? [0.85, 1, 0.85] : [0.65, 0.8, 0.7],
                        }}
                        transition={{
                          duration: listening ? 1.4 : 2.2,
                          repeat: Infinity,
                          ease: [0.22, 1, 0.36, 1],
                          delay: i * (listening ? 0.08 : 0.12),
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Helper prompt */}
            {renderPrompt && (
              <div className={cn("text-xs text-white/80", layout === "panel" ? "mt-2" : "mt-2")}>{promptText}</div>
            )}
          </div>

          {/* Waveform / transcript area (full layout only) */}
          {layout === "full" && (
            <div className={cn("flex-1 min-w-[12rem]", compact ? "max-w-xs" : "w-full")}>
              <div className="relative rounded-xl border border-white/20 bg-white/5 p-3 overflow-hidden">
                {/* Animated bars when listening */}
                {listening ? (
                  <div className="flex items-end gap-1 h-12">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <motion.span
                        key={i}
                        className="w-1 rounded-sm bg-white/70"
                        initial={false}
                        animate={{
                          height: [6, 24, 10, 28, 8][i % 5],
                          opacity: [0.6, 0.95, 0.7, 1, 0.8][i % 5],
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: (i % 10) * 0.06,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-white/80 min-h-[3rem] whitespace-pre-wrap">
                    {transcript?.length ? transcript : "Press the mic and start speaking..."}
                  </p>
                )}

                {/* Subtle light sweep */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -inset-8 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Actions */}
              <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-lg border border-white/20 bg-white/5 px-2 py-1 hover:bg-white/10 transition-colors"
                  onClick={() => onClear?.()}
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear
                </button>
                <span className="ml-auto text-white/60">
                  {listening ? "Listening…" : "Idle"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

LiquidGlassVoiceAssistant.displayName = "LiquidGlassVoiceAssistant";

export { LiquidGlassVoiceAssistant };
