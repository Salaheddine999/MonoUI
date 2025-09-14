import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LiquidGlassLoader } from "@/components/ui/liquid-glass-loader";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function LiquidGlassLoaderPage() {
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
import { motion } from "framer-motion";

interface LiquidGlassLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse" | "bars";
  className?: string;
  label?: string;
  showLabel?: boolean;
}

const LiquidGlassLoader = React.forwardRef<HTMLDivElement, LiquidGlassLoaderProps>(
  (
    {
      size = "md",
      variant = "spinner",
      className,
      label = "Loading...",
      showLabel = false,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center border align-middle select-none font-sans text-white rounded-2xl backdrop-blur-lg transition-all duration-500 antialiased relative overflow-hidden";

    const glassClasses =
      "bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)]";

    const sizeClasses = {
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    };

    const spinnerSizes = {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
    };

    const dotSizes = {
      sm: "w-1.5 h-1.5",
      md: "w-2 h-2",
      lg: "w-3 h-3",
    };

    const barSizes = {
      sm: { width: "w-0.5", heights: ["h-2", "h-3", "h-4", "h-3", "h-2"] },
      md: { width: "w-1", heights: ["h-3", "h-4", "h-6", "h-4", "h-3"] },
      lg: { width: "w-1.5", heights: ["h-4", "h-6", "h-8", "h-6", "h-4"] },
    };

    const labelSizes = {
      sm: "text-xs mt-2",
      md: "text-sm mt-3",
      lg: "text-base mt-4",
    };

    const renderSpinner = () => (
      <motion.div
        className={cn(
          "border-2 border-white/30 border-t-white rounded-full",
          spinnerSizes[size]
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    );

    const renderDots = () => (
      <div className="flex space-x-1">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={cn(
              "bg-white rounded-full",
              dotSizes[size]
            )}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );

    const renderPulse = () => (
      <motion.div
        className={cn(
          "bg-white/60 rounded-full",
          spinnerSizes[size]
        )}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );

    const renderBars = () => (
      <div className="flex items-end space-x-1">
        {barSizes[size].heights.map((height, index) => (
          <motion.div
            key={index}
            className={cn(
              "bg-white rounded-sm",
              barSizes[size].width,
              height
            )}
            animate={{
              scaleY: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: index * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );

    const renderVariant = () => {
      switch (variant) {
        case "dots":
          return renderDots();
        case "pulse":
          return renderPulse();
        case "bars":
          return renderBars();
        case "spinner":
        default:
          return renderSpinner();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center",
          showLabel ? "space-y-0" : "",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            baseClasses,
            glassClasses,
            sizeClasses[size]
          )}
        >
          {renderVariant()}
          
          {/* Unique glass overlays */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none" />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none" />
        </div>
        
        {showLabel && (
          <motion.span
            className={cn(
              "text-white/80 font-medium",
              labelSizes[size]
            )}
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {label}
          </motion.span>
        )}
      </div>
    );
  }
);

LiquidGlassLoader.displayName = "LiquidGlassLoader";

export { LiquidGlassLoader };`;

  const usageCode = `import { LiquidGlassLoader } from "@/components/ui/liquid-glass-loader";

// Basic spinner
<LiquidGlassLoader variant="spinner" />

// With label
<LiquidGlassLoader 
  variant="dots" 
  showLabel 
  label="Loading..." 
/>

// Different variants
<LiquidGlassLoader variant="pulse" size="lg" />
<LiquidGlassLoader variant="bars" size="md" />`;

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
                Liquid Glass <span className="gradient-text">Loader</span>
              </h1>
            </div>

            {/* Live Usage */}
            <div className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Live Usage</h2>
              <div className="relative overflow-hidden flex items-center justify-center w-full min-h-[300px] rounded-lg border border-border/20">
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
                  alt="Abstract painting background"
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-black/30" aria-hidden />
                <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                  <div className="flex flex-col items-center space-y-2">
                    <LiquidGlassLoader variant="spinner" size="md" />
                    <span className="text-white/70 text-xs">Spinner</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <LiquidGlassLoader variant="dots" size="md" />
                    <span className="text-white/70 text-xs">Dots</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <LiquidGlassLoader variant="pulse" size="md" />
                    <span className="text-white/70 text-xs">Pulse</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <LiquidGlassLoader variant="bars" size="md" />
                    <span className="text-white/70 text-xs">Bars</span>
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
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors" onClick={() => copyToClipboard("npm install framer-motion", "install")}>
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
                  The `LiquidGlassLoader` component provides multiple animated loading indicators with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-8">
                  <li>
                    **Four animation variants**: spinner, dots, pulse, and bars
                  </li>
                  <li>
                    Framer Motion animations for smooth, performant transitions
                  </li>
                  <li>
                    Consistent liquid glass styling with gradient overlays
                  </li>
                  <li>Optional labels with synchronized animations</li>
                  <li>Responsive sizing (sm, md, lg) for different contexts</li>
                  <li>Backdrop blur and shadow effects for depth</li>
                </ul>
              </div>
            </div>

            {/* Component Code */}
            <div className="mb-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-medium mb-6">Component Code</h2>
                <div className="relative">
                  <div className="rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
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
                          liquid-glass-loader.tsx
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

            {/* Usage Examples */}
            <div className="mb-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-medium mb-6">Usage Examples</h2>
                <div className="relative">
                  <div className="rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
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
                        <span className="text-slate-400 text-sm font-medium ml-4">Usage Examples</span>
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
                  This implementation creates **versatile loading indicators** with liquid glass effects
                  that provide clear visual feedback during async operations. The multiple animation
                  variants allow you to choose the perfect loader for your specific use case and design
                  aesthetic.
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
