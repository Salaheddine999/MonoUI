import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useLocation } from "wouter";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ArrowLeft, Mic, Copy, Check } from "lucide-react";
import { GlassVoiceAssistant } from "@/components/ui/glass-voice-assistant";

export default function GlassVoiceAssistantPage() {
  const [, setLocation] = useLocation();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

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
                <span className="gradient-text">Voice Assistant</span>
              </h1>
            </div>

            {/* Live Usage */}
            <div className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Live Usage</h2>
              <div className="relative overflow-hidden flex items-center justify-center w-full min-h-[320px] rounded-lg border border-border/20">
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
                  alt="Abstract painting background"
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-black/30" aria-hidden />
                <div className="relative z-10 w-full max-w-2xl p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-medium mb-4 flex items-center justify-center gap-2"><Mic className="w-6 h-6" /> Mono Voice</h3>
                    <p className="text-white/90 text-md mb-8 leading-relaxed font-light">
                      A minimal, glassy voice control with animated dots and a crisp mic pulse.
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <GlassVoiceAssistant
                      layout="panel"
                      title="Mono Voice"
                      showHeader
                      showPrompt
                      indicator="bars"
                      statusIdleLabel="Ready"
                      statusListeningLabel="Listening…"
                      promptText='Tap mic or say "Hey Mono" to begin'
                      listening={listening}
                      onToggleListening={(state: boolean) => setListening(state)}
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
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors" onClick={() => copyToClipboard("npm install framer-motion lucide-react", "install")}>
                        {copiedCode === "install" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="overflow-x-auto">
                      <div className="p-6" style={{ backgroundColor: "#282c34", color: "#abb2bf", fontSize: "0.875rem", lineHeight: "1.6" }}>
                        <div className="flex items-center gap-2">
                          <span className="text-green-400">$</span>
                          <span className="text-blue-400">npm</span>
                          <span className="text-yellow-400">install</span>
                          <span className="text-purple-400">framer-motion</span>
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
                  The `GlassVoiceAssistant` combines layered glass aesthetics with subtle motion to communicate listening and idle states:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-8">
                  <li>Layered glass shell using gradients, inner bevels, and backdrop blur for a premium frosted effect</li>
                  <li>Mic button uses a glass treatment with specular highlights and a soft ground shadow for lift</li>
                  <li>Listening pulse: a breathing glow behind the mic plus an animated outer ring for activity feedback</li>
                  <li>Indicator options: <code>bars</code> (default in this demo) or <code>dots</code> inside a small glass pill</li>
                  <li>Framer Motion powers the animations with eased, looping transitions for smooth, minimal movement</li>
                </ul>

                <h2 className="text-2xl font-medium mb-6">Component Code</h2>
                <div className="relative">
                  <div className="rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
                    <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between" style={{ backgroundColor: "#282c34" }}>
                      <span className="text-slate-400 text-sm font-medium">glass-voice-assistant.tsx</span>
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors" onClick={() => copyToClipboard(componentCode, "component")}>
                        {copiedCode === "component" ? (<Check className="w-4 h-4" />) : (<Copy className="w-4 h-4" />)}
                      </Button>
                    </div>
                    <div className="overflow-x-auto">
                      <SyntaxHighlighter language="tsx" style={oneDark} customStyle={{ margin: 0, padding: "2rem", background: "#282c34", fontSize: "0.875rem", lineHeight: "1.6" }} showLineNumbers wrapLines wrapLongLines>
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
                    <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between" style={{ backgroundColor: "#282c34" }}>
                      <span className="text-slate-400 text-sm font-medium">example.tsx</span>
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors" onClick={() => copyToClipboard(usageCode, "usage")}>
                        {copiedCode === "usage" ? (<Check className="w-4 h-4" />) : (<Copy className="w-4 h-4" />)}
                      </Button>
                    </div>
                    <div className="overflow-x-auto">
                      <SyntaxHighlighter language="tsx" style={oneDark} customStyle={{ margin: 0, padding: "2rem", background: "#282c34", fontSize: "0.875rem", lineHeight: "1.6" }} showLineNumbers wrapLines wrapLongLines>
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
                <p className="text-muted-foreground text-lg">This voice assistant pairs premium glass aesthetics with subtle motion to convey listening and activity states.</p>
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
