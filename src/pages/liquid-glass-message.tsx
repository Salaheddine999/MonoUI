import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LiquidGlassMessage } from "@/components/ui/liquid-glass-message";
import {
  ArrowLeft,
  Copy,
  Check,
  Bell,
  Mail,
  AlertTriangle,
  CheckCircle,
  X,
} from "lucide-react";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function LiquidGlassMessagePage() {
  const [, setLocation] = useLocation();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      variant: "success",
      text: "Your changes have been saved successfully!",
    },
    {
      id: 2,
      variant: "error",
      text: "Failed to connect to the server. Please try again.",
    },
    {
      id: 3,
      variant: "warning",
      text: "Your session will expire in 5 minutes.",
    },
    {
      id: 4,
      variant: "info",
      text: "New features are available in the latest update.",
    },
  ]);

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const dismissMessage = (id: number) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  const addMessage = (variant: "success" | "error" | "warning" | "info") => {
    const newMessage = {
      id: Date.now(),
      variant,
      text: `This is a ${variant} message that was just added!`,
    };
    setMessages([...messages, newMessage]);
  };

  const componentCode = `"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

interface LiquidGlassMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "success" | "error" | "warning" | "info";
  size?: "sm" | "md" | "lg";
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const LiquidGlassMessage = React.forwardRef<HTMLDivElement, LiquidGlassMessageProps>(
  ({ 
    children, 
    variant = "info", 
    size = "md", 
    dismissible = false, 
    onDismiss,
    className, 
    ...props 
  }, ref) => {
    const baseClasses =
      "border align-middle select-none font-sans text-white rounded-2xl backdrop-blur-lg transition-all duration-500 antialiased relative overflow-hidden flex items-start gap-3";

    const glassClasses =
      "bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)] hover:from-white/25 hover:via-white/15 hover:to-white/10 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.1),0_12px_40px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3)] hover:scale-[1.02]";

    const sizeClasses = {
      sm: "p-3 text-sm",
      md: "p-4 text-base",
      lg: "p-6 text-lg",
    };

    const variantIcons = {
      success: CheckCircle,
      error: AlertCircle,
      warning: AlertTriangle,
      info: Info,
    };

    const variantColors = {
      success: "text-green-400",
      error: "text-red-400",
      warning: "text-yellow-400",
      info: "text-blue-400",
    };

    const Icon = variantIcons[variant];

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          glassClasses,
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <Icon className={cn("flex-shrink-0 mt-0.5", variantColors[variant])} size={size === "sm" ? 16 : size === "md" ? 20 : 24} />
        <div className="flex-1 min-w-0">
          {children}
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-white/60 hover:text-white/90 transition-colors duration-200 p-1 rounded-lg hover:bg-white/10"
            aria-label="Dismiss message"
          >
            <X size={16} />
          </button>
        )}
        {/* Unique gradient overlays for glass effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none" />
      </div>
    );
  }
);

LiquidGlassMessage.displayName = "LiquidGlassMessage";

export { LiquidGlassMessage };`;

  const usageCode = `import { LiquidGlassMessage } from "@/components/ui/liquid-glass-message";

<LiquidGlassMessage variant="success" dismissible>
  Your operation completed successfully!
</LiquidGlassMessage>`;

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
                Liquid Glass <span className="gradient-text">Message</span>
              </h1>
            </div>

            {/* Live Usage */}
            <div className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Live Usage</h2>
              <div className="relative overflow-hidden flex items-center justify-center w-full min-h-[400px] rounded-lg border border-border/20">
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
                  alt="Abstract painting background"
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-black/30" aria-hidden />
                <div className="relative z-10 w-full max-w-4xl p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-medium mb-4">
                      Message Notifications
                    </h3>
                    <p className="text-white/90 text-md mb-8 leading-relaxed font-light">
                      Experience the power of liquid glass design with these
                      beautiful message components. Perfect for notifications,
                      alerts, and user feedback with consistent styling.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Message Variants */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-medium text-white/80 mb-4">
                        Message Variants
                      </h4>
                      <LiquidGlassMessage variant="success" size="md">
                        <div>
                          <div className="font-semibold">Success!</div>
                          <div className="text-white/80">
                            Your changes have been saved successfully!
                          </div>
                        </div>
                      </LiquidGlassMessage>

                      <LiquidGlassMessage variant="error" size="md">
                        <div>
                          <div className="font-semibold">Error</div>
                          <div className="text-white/80">
                            Failed to connect to the server. Please try again.
                          </div>
                        </div>
                      </LiquidGlassMessage>

                      <LiquidGlassMessage variant="warning" size="md">
                        <div>
                          <div className="font-semibold">Warning</div>
                          <div className="text-white/80">
                            Your session will expire in 5 minutes.
                          </div>
                        </div>
                      </LiquidGlassMessage>

                      <LiquidGlassMessage variant="info" size="md">
                        <div>
                          <div className="font-semibold">Information</div>
                          <div className="text-white/80">
                            New features are available in the latest update.
                          </div>
                        </div>
                      </LiquidGlassMessage>
                    </div>

                    {/* Interactive Messages */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-medium text-white/80 mb-4">
                        Interactive Messages
                      </h4>
                      <div className="space-y-3">
                        {messages.map((message) => (
                          <LiquidGlassMessage
                            key={message.id}
                            variant={
                              message.variant as
                                | "success"
                                | "error"
                                | "warning"
                                | "info"
                            }
                            dismissible
                            onDismiss={() => dismissMessage(message.id)}
                          >
                            {message.text}
                          </LiquidGlassMessage>
                        ))}
                      </div>

                      <div className="flex gap-2 justify-center mt-6">
                        <button
                          onClick={() => addMessage("success")}
                          className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 font-medium rounded-lg border border-green-500/30 hover:border-green-500/50 transition-all duration-200"
                        >
                          Add Success
                        </button>
                        <button
                          onClick={() => addMessage("error")}
                          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium rounded-lg border border-red-500/30 hover:border-red-500/50 transition-all duration-200"
                        >
                          Add Error
                        </button>
                        <button
                          onClick={() => addMessage("warning")}
                          className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 font-medium rounded-lg border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-200"
                        >
                          Add Warning
                        </button>
                        <button
                          onClick={() => addMessage("info")}
                          className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 font-medium rounded-lg border border-blue-500/30 hover:border-blue-500/50 transition-all duration-200"
                        >
                          Add Info
                        </button>
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
                  The `LiquidGlassMessage` component creates an elegant
                  notification with:
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
                  <li>Smooth hover animations that enhance user interaction</li>
                  <li>
                    Backdrop blur that creates the frosted glass appearance
                  </li>
                  <li>
                    Four variants (success, error, warning, info) with
                    appropriate icons and colors
                  </li>
                  <li>
                    Optional dismissible functionality with smooth animations
                  </li>
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
                          liquid-glass-message.tsx
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
                  This implementation creates a **premium liquid glass message**
                  that provides an elegant notification system with the same
                  sophisticated glass effects as other components. It's perfect
                  for **user feedback**, **notifications**, and **alerts** in
                  modern web applications with a professional, polished
                  appearance.
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
