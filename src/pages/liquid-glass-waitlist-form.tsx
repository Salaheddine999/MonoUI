import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LiquidGlassWaitlistForm } from "@/components/ui/liquid-glass-waitlist-form";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function LiquidGlassWaitlistFormPage() {
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
import { Check, Mail, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface LiquidGlassWaitlistFormProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  buttonText?: string;
  successMessage?: string;
  onSubmit?: (email: string) => Promise<void> | void;
}

const sizeClasses = {
  sm: { container: "p-4 rounded-xl", input: "h-9 px-3 text-xs rounded-lg", button: "h-9 px-4 text-xs rounded-lg", icon: "w-4 h-4", gap: "gap-2" },
  md: { container: "p-6 rounded-xl", input: "h-11 px-4 text-sm rounded-lg", button: "h-11 px-6 text-sm rounded-lg", icon: "w-4 h-4", gap: "gap-3" },
  lg: { container: "p-8 rounded-2xl", input: "h-12 px-5 text-base rounded-xl", button: "h-12 px-8 text-base rounded-xl", icon: "w-5 h-5", gap: "gap-4" },
};

const glassContainer = "relative backdrop-blur-lg border overflow-hidden bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)]";

const glassInput = "relative w-full bg-white/10 border border-white/30 text-white placeholder-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/50 transition-all duration-300";

const glassButton = "relative inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center text-white backdrop-blur-lg transition-all duration-500 antialiased overflow-hidden bg-gradient-to-br from-white/20 via-white/10 to-white/5 border-white/50 shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.2)] hover:from-white/30 hover:via-white/20 hover:to-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50";

export const LiquidGlassWaitlistForm = React.forwardRef<HTMLDivElement, LiquidGlassWaitlistFormProps>(
  ({ size = "md", className, placeholder = "Enter your email address", buttonText = "Join Waitlist", successMessage = "You're on the list!", onSubmit, ...props }, ref) => {
    const s = sizeClasses[size];
    const [email, setEmail] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim() || isSubmitting || isAnimating) return;

      try {
        setIsSubmitting(true);
        setIsAnimating(true);
        
        if (onSubmit) {
          await onSubmit(email.trim());
        }
        
        setTimeout(() => {
          setIsSuccess(true);
          setIsSubmitting(false);
          setIsAnimating(false);
          
          setTimeout(() => {
            setIsSuccess(false);
            setEmail("");
          }, 3000);
        }, 800);
        
      } catch (err) {
        console.error("Failed to submit:", err);
        setIsSubmitting(false);
        setIsAnimating(false);
      }
    };

    return (
      <motion.div ref={ref} className={cn(glassContainer, s.container, className)} animate={isSuccess || isAnimating ? { scale: [1, 1.02, 1], transition: { duration: 0.5, times: [0, 0.3, 1] } } : {}} {...props}>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/30 via-white/10 to-transparent opacity-60 pointer-events-none" />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-xl bg-gradient-to-b from-white/25 to-transparent opacity-50 pointer-events-none" />

        <AnimatePresence>
          {(isSuccess || isAnimating) && (
            <>
              <motion.div key="success-ring" className="absolute inset-0 rounded-xl border-2 border-green-400/60 pointer-events-none" initial={{ scale: 0.95, opacity: 0.8 }} animate={{ scale: 1.1, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }} />
              <motion.div key="success-glow" className="absolute inset-0 rounded-xl bg-green-400/20 pointer-events-none" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: [0, 0.4, 0], scale: [0.98, 1.01, 1] }} exit={{ opacity: 0 }} transition={{ duration: 0.6, times: [0, 0.4, 1] }} />
              <motion.div key="success-shine" className="pointer-events-none absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-transparent via-green-400/40 to-transparent skew-x-12 rounded-xl" initial={{ x: "-150%", opacity: 0 }} animate={{ x: "150%", opacity: [0, 0.8, 0] }} exit={{ opacity: 0 }} transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], times: [0, 0.5, 1] }} />
            </>
          )}
        </AnimatePresence>

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div key="success" initial={{ scale: 0.9, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: -10 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} className={cn("flex flex-col items-center text-center", s.gap)}>
                <motion.div initial={{ scale: 0.8, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0.1 }} className="flex items-center justify-center w-12 h-12 rounded-full bg-green-400/20 border border-green-400/40">
                  <Check className="w-6 h-6 text-green-400" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Success!</h3>
                  <p className="text-sm text-white/80">{successMessage}</p>
                </div>
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.2 }} onSubmit={handleSubmit} className={cn("flex flex-col", s.gap)}>
                <div className="relative">
                  <Mail className={cn(s.icon, "absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 pointer-events-none")} />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={placeholder} disabled={isSubmitting} className={cn(glassInput, s.input, "pl-10")} required />
                </div>
                
                <motion.button type="submit" disabled={!email.trim() || isSubmitting} className={cn(glassButton, s.button, s.gap)} whileTap={{ scale: 0.98 }}>
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.span key="loading" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex items-center">
                        <Loader2 className={cn(s.icon, "mr-2 animate-spin")} />
                        Joining...
                      </motion.span>
                    ) : (
                      <motion.span key="submit" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex items-center">
                        {buttonText}
                        <ArrowRight className={cn(s.icon, "ml-2")} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }
);

LiquidGlassWaitlistForm.displayName = "LiquidGlassWaitlistForm";`;

  const usageCode = `import { LiquidGlassWaitlistForm } from "@/components/ui/liquid-glass-waitlist-form";

export default function Example() {
  const handleSubmit = async (email: string) => {
    // Your submission logic here
    console.log("Submitted email:", email);
    // await api.addToWaitlist(email);
  };

  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <LiquidGlassWaitlistForm
        size="md"
        placeholder="Enter your email"
        buttonText="Join Waitlist"
        successMessage="Welcome to the waitlist!"
        onSubmit={handleSubmit}
      />
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
                Liquid Glass <span className="gradient-text">Waitlist Form</span>
              </h1>
            </div>

            {/* Live Usage */}
            <div className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Live Usage</h2>
              <div className="relative overflow-hidden w-full min-h-[400px] rounded-lg border border-border/20">
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
                  alt="Abstract painting background"
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-black/30" aria-hidden />
                <div className="relative z-10 flex flex-col items-center justify-center gap-8 w-full h-full p-6">
                  <div className="w-full max-w-md">
                    <LiquidGlassWaitlistForm 
                      size="lg" 
                      onSubmit={async (email) => {
                        console.log("Demo submission:", email);
                        // Simulate API call
                        await new Promise(resolve => setTimeout(resolve, 800));
                      }}
                    />
                  </div>
                  <div className="w-full max-w-sm">
                    <LiquidGlassWaitlistForm 
                      size="md"
                      placeholder="Your email here"
                      buttonText="Get Early Access"
                      successMessage="Thanks for joining!"
                      onSubmit={async (email) => {
                        console.log("Demo submission:", email);
                        await new Promise(resolve => setTimeout(resolve, 600));
                      }}
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
                    <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between" style={{ backgroundColor: "#282c34" }}>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
                        </div>
                        <span className="text-slate-400 text-sm font-medium ml-4">liquid-glass-waitlist-form.tsx</span>
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
                <p className="text-muted-foreground text-lg">Perfect for collecting emails with beautiful animations and premium glass aesthetics.</p>
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
