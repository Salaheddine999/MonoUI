import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LiquidGlassCopyEmailButton } from "@/components/ui/liquid-glass-copy-email-button";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function LiquidGlassCopyEmailButtonPage() {
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
import { Check, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface LiquidGlassCopyEmailButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  email: string;
  size?: "sm" | "md" | "lg";
  copiedLabel?: string;
}

const sizeClasses = {
  sm: { button: "h-9 px-4 text-xs rounded-xl", icon: "w-4 h-4", gap: "gap-2" },
  md: { button: "h-10 px-5 text-sm rounded-xl", icon: "w-4 h-4", gap: "gap-2.5" },
  lg: { button: "h-12 px-6 text-base rounded-2xl", icon: "w-5 h-5", gap: "gap-3" },
};

const glassButton =
  "relative inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center text-white backdrop-blur-lg transition-all duration-500 antialiased overflow-hidden\n   bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40\n   shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)]\n   hover:from-white/25 hover:via-white/15 hover:to-white/10\n   hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.1),0_12px_40px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3)]\n   focus:outline-none focus:ring-2 focus:ring-white/30 hover:scale-[1.02] active:scale-[0.99]";

export const LiquidGlassCopyEmailButton = React.forwardRef<
  HTMLButtonElement,
  LiquidGlassCopyEmailButtonProps
>(({ email, size = "md", className, copiedLabel = "Copied!", ...props }, ref) => {
  const s = sizeClasses[size];
  const [copied, setCopied] = React.useState(false);

  const onCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <button
      ref={ref}
      onClick={onCopy}
      aria-label={\`Copy email \${email}\`}
      className={cn(glassButton, s.button, s.gap, "group", className)}
      {...props}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none" />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-xl bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none" />

      <AnimatePresence>
        {copied && (
          <motion.span
            key="shine"
            initial={{ x: "-120%", opacity: 0 }}
            animate={{ x: "120%", opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/20 via-white/40 to-transparent skew-x-12 rounded-xl"
          />
        )}
      </AnimatePresence>

      <span className={cn("relative z-10 inline-flex items-center", s.gap)}>
        <AnimatePresence initial={false} mode="wait">
          {copied ? (
            <motion.span
              key="copied"
              initial={{ scale: 0.8, opacity: 0, y: 5 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -5 }}
              transition={{ duration: 0.18 }}
              className="inline-flex items-center"
            >
              <Check className={cn(s.icon, "mr-2 text-white")} />
              <span className="whitespace-nowrap">{copiedLabel}</span>
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.98, opacity: 0.9 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center"
            >
              <Copy className={cn(s.icon, "mr-2 text-white")} />
              <span className="whitespace-nowrap font-medium">{email}</span>
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
});

LiquidGlassCopyEmailButton.displayName = "LiquidGlassCopyEmailButton";`;

  const usageCode = `import { LiquidGlassCopyEmailButton } from "@/components/ui/liquid-glass-copy-email-button";

export default function Example() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <LiquidGlassCopyEmailButton email="hello@monoui.dev" size="md" />
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="fixed inset-0 bg-gradient-to-br from-background via-secondary to-background">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <Navigation />

        <div className="pt-40 pb-8 px-4">
          <div className="max-w-6xl mx-auto">
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
                Liquid Glass <span className="gradient-text">Copy Email Button</span>
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
                <div className="relative z-10 flex flex-col items-center justify-center gap-6 w-full h-full p-6">
                  <LiquidGlassCopyEmailButton email="support@monoui.dev" size="lg" />
                  <LiquidGlassCopyEmailButton email="hello@monoui.dev" size="md" />
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
                  The LiquidGlassCopyEmailButton provides a premium glass effect with a smooth copy interaction:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-8">
                  <li>Glass button styling with layered gradients, inner shadows, and backdrop blur</li>
                  <li>framer-motion powers the subtle shine and copied state transitions</li>
                  <li>lucide-react icons switch between Copy and Check when copied</li>
                  <li>Accessible: uses an aria-label that includes the email for screen readers</li>
                  <li>Configurable props: <code>email</code>, <code>size</code> (sm | md | lg), and <code>copiedLabel</code></li>
                </ul>
              </div>
            </div>

            {/* Component Code */}
            <div className="mb-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-medium mb-6">Component Code</h2>
                <div className="relative">
                  <div className="rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
                    <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between" style={{ backgroundColor: "#282c34" }}>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
                        </div>
                        <span className="text-slate-400 text-sm font-medium ml-4">liquid-glass-copy-email-button.tsx</span>
                      </div>
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors" onClick={() => copyToClipboard(componentCode, "component")}>
                        {copiedCode === "component" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="overflow-x-auto">
                      <SyntaxHighlighter
                        language="tsx"
                        style={oneDark}
                        customStyle={{ margin: 0, padding: "2rem", background: "#282c34", fontSize: "0.875rem", lineHeight: "1.6" }}
                        showLineNumbers
                        wrapLines
                        wrapLongLines
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
                    <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between" style={{ backgroundColor: "#282c34" }}>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
                        </div>
                        <span className="text-slate-400 text-sm font-medium ml-4">example.tsx</span>
                      </div>
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors" onClick={() => copyToClipboard(usageCode, "usage")}>
                        {copiedCode === "usage" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="overflow-x-auto">
                      <SyntaxHighlighter
                        language="tsx"
                        style={oneDark}
                        customStyle={{ margin: 0, padding: "2rem", background: "#282c34", fontSize: "0.875rem", lineHeight: "1.6" }}
                        showLineNumbers
                        wrapLines
                        wrapLongLines
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
                <p className="text-muted-foreground text-lg">Use this button wherever you want to expose a contact email and provide a delightful copy interaction.</p>
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
