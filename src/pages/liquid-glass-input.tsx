import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LiquidGlassInput } from "@/components/ui/liquid-glass-input";
import { ArrowLeft, Copy, Check, Mail, Lock, User, Search } from "lucide-react";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function LiquidGlassInputPage() {
  const [, setLocation] = useLocation();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    search: "",
  });

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const componentCode = `"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LiquidGlassInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LiquidGlassInput = React.forwardRef<HTMLInputElement, LiquidGlassInputProps>(
  ({ size = "md", className, ...props }, ref) => {
    const baseClasses =
      "border align-middle select-none font-sans text-white rounded-2xl backdrop-blur-lg transition-all duration-500 antialiased relative overflow-hidden placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30";

    const glassClasses =
      "bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)] focus:from-white/25 focus:via-white/15 focus:to-white/10 focus:shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.1),0_12px_40px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3)] focus:scale-[1.02]";

    const sizeClasses = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-base",
      lg: "px-6 py-4 text-lg",
    };

    return (
      <div className="relative">
        <input
          ref={ref}
          className={cn(baseClasses, glassClasses, sizeClasses[size], className)}
          {...props}
        />
        {/* Unique gradient overlays for glass effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none" />
      </div>
    );
  }
);

LiquidGlassInput.displayName = "LiquidGlassInput";

export { LiquidGlassInput };`;

  const usageCode = `import { LiquidGlassInput } from "@/components/ui/liquid-glass-input";

<LiquidGlassInput 
  placeholder="Enter your email"
  type="email"
/>`;

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
                Liquid Glass <span className="gradient-text">Input</span>
              </h1>
            </div>

            {/* Live Usage */}
            <div className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Live Usage</h2>
              <div className="relative overflow-hidden flex items-center justify-center w-full min-h-[200px] rounded-lg border border-border/20">
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
                  alt="Abstract painting background"
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-black/30" aria-hidden />
                <div className="relative z-10">
                  <LiquidGlassInput size="lg" placeholder="Enter your email" />
                </div>
              </div>
            </div>

            {/* Installation */}
            <div className="mb-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-medium mb-6">Installation</h2>
                <p className="text-muted-foreground mb-6">
                  This component uses only React and internal utilities. No additional dependencies are required.
                </p>
              </div>
            </div>

            {/* How It Works */}
            <div className="mb-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-medium mb-6">How It Works</h2>
                <p className="text-muted-foreground mb-6">
                  The `LiquidGlassInput` component creates an elegant input
                  field with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-8">
                  <li>
                    Sophisticated gradient backgrounds that create depth and
                    dimension
                  </li>
                  <li>
                    Multiple shadow layers that simulate realistic glass
                    reflection
                  </li>
                  <li>
                    Gradient overlays that provide authentic glass highlight
                    effects
                  </li>
                  <li>Smooth focus animations that enhance user interaction</li>
                  <li>
                    Backdrop blur that creates the frosted glass appearance
                  </li>
                  <li>Focus ring for accessibility and visual feedback</li>
                  <li>
                    Flexible sizing options (sm, md, lg) for different use cases
                  </li>
                </ul>
              </div>
            </div>

            {/* Component Code */}
            <div className="mb-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-medium mb-6">Component Code</h2>
                <div className="relative">
                  <div className="rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
                    {/* Editor Header */}
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
                          liquid-glass-input.tsx
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
                        onClick={() =>
                          copyToClipboard(componentCode, "component")
                        }
                      >
                        {copiedCode === "component" ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    {/* Code Content with Syntax Highlighting */}
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
                    {/* Editor Header */}
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
                    {/* Code Content with Syntax Highlighting */}
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

            {/* Closing Text */}
            <div className="mb-16">
              <div className="max-w-4xl mx-auto">
                <p className="text-muted-foreground text-lg">
                  This implementation creates a **premium liquid glass input**
                  that provides an elegant form field with the same
                  sophisticated glass effects as the button and card components.
                  It's perfect for **creating beautiful forms** in modern web
                  applications with a professional, polished appearance.
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
