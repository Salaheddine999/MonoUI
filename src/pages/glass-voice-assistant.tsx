import React from "react";
import { GlassVoiceAssistant } from "@/components/ui/glass-voice-assistant";
import ComponentPageLayout from "@/components/component-page-layout";

export default function GlassVoiceAssistantPage() {
  const componentCode = `"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Mic, Square, Trash2 } from "lucide-react";

export interface GlassVoiceAssistantProps extends React.HTMLAttributes<HTMLDivElement> {
  listening?: boolean;
  transcript?: string;
  onToggleListening?: (listening: boolean) => void;
  onClear?: () => void;
  size?: "sm" | "md" | "lg";
  compact?: boolean;
  className?: string;
}

const GlassVoiceAssistant = React.forwardRef<
  HTMLDivElement,
  GlassVoiceAssistantProps
>(({ listening = false, transcript, onToggleListening, onClear, size = "md", compact, className, ...props }, ref) => {
  const baseClasses =
    "relative border rounded-2xl text-white backdrop-blur-xl transition-all duration-500 overflow-hidden";
  const glassClasses =
    "bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40 shadow-[inset_0_2px_4px_RGBA(255,255,255,0.4),inset_0_-1px_2px_RGBA(0,0,0,0.1),0_10px_40px_RGBA(0,0,0,0.35),0_3px_10px_RGBA(0,0,0,0.25)]";
  const sizeClasses = { sm: "p-3", md: "p-4", lg: "p-6" } as const;
  const micSize = { sm: "h-9 w-9", md: "h-12 w-12", lg: "h-14 w-14" }[size];
  const pulseScale = { sm: 1.25, md: 1.35, lg: 1.45 }[size];

  return (
    <div ref={ref} className={cn(baseClasses, glassClasses, sizeClasses[size], className)} {...props}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none" />

      <div className={cn("relative z-10 flex items-center gap-4", compact ? "flex-row" : "flex-col")}>
        <div className="relative">
          {listening && (
            <motion.span
              initial={false}
              animate={{ scale: [1, pulseScale, 1], opacity: [0.7, 0.3, 0.7] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-primary/40 blur-xl"
              aria-hidden
            />
          )}
          <button
            type="button"
            className={cn(
              "relative inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-md transition-colors",
              micSize,
              listening ? "text-white" : "text-white/80 hover:text-white"
            )}
            onClick={() => onToggleListening?.(!listening)}
            aria-pressed={listening}
            aria-label={listening ? "Stop listening" : "Start listening"}
          >
            {listening ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/30" />
          </button>
        </div>

        <div className={cn("flex-1 min-w-[12rem]", compact ? "max-w-xs" : "w-full")}>
          <div className="relative rounded-xl border border-white/20 bg-white/5 p-3 overflow-hidden">
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
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: (i % 10) * 0.06 }}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-white/80 min-h-[3rem] whitespace-pre-wrap">
                {transcript?.length ? transcript : "Press the mic and start speaking..."}
              </p>
            )}

            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-8 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-lg border border-white/20 bg-white/5 px-2 py-1 hover:bg-white/10 transition-colors"
              onClick={onClear}
            >
              {/* icon imported in the component file */}
              Clear
            </button>
            <span className="ml-auto text-white/60">{listening ? "Listening…" : "Idle"}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

GlassVoiceAssistant.displayName = "GlassVoiceAssistant";

export { GlassVoiceAssistant };`;

  const usageCode = `import { GlassVoiceAssistant } from "@/components/ui/glass-voice-assistant";

function Example() {
  const [listening, setListening] = React.useState(false);
  const [transcript, setTranscript] = React.useState("");
  return (
    <GlassVoiceAssistant
      size="md"
      listening={listening}
      transcript={transcript}
      onToggleListening={(state) => {
        setListening(state);
        if (!state) setTranscript((t) => t + (t ? "\n" : "") + "(Stopped listening)");
      }}
      onClear={() => setTranscript("")}
    />
  );
}`;

  return (
    <ComponentPageLayout
      name="Voice Assistant"
      description="A glassy voice assistant UI with animated waveform, listening pulse, and status indicators."
      preview={
        <div className="w-full max-w-[260px]">
          <GlassVoiceAssistant
            size="md"
            layout="panel"
            title="MonoUI"
            showHeader
            showPrompt={false}
            indicator="bars"
            statusIdleLabel="Ready"
            statusListeningLabel="Listening…"
          />
        </div>
      }
      features={[
        "Animated waveform visualization",
        "Listening pulse indicator",
        "Multiple indicator styles: bars, dots, pulse",
        "Glass-styled container with header and status",
        "Compact and full-size layout options"
]}
      componentCode={componentCode}
      usageCode={usageCode}
    />
  );
}
