import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LiquidGlassMessageBubble } from "@/components/ui/liquid-glass-message-bubble";
import { ArrowLeft, Copy, Check, Bot, User } from "lucide-react";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function LiquidGlassMessageBubblePage() {
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

export interface LiquidGlassMessageBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Message sender type
   * - user: right-aligned, different styling for user messages
   * - assistant: left-aligned, default styling for AI/assistant messages
   */
  sender?: "user" | "assistant";
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg";
  /**
   * Optional avatar element (icon, image, etc.)
   */
  avatar?: React.ReactNode;
  /**
   * Show timestamp
   */
  timestamp?: string;
  /**
   * Compact spacing for tight layouts
   */
  compact?: boolean;
  className?: string;
}

const LiquidGlassMessageBubble = React.forwardRef<HTMLDivElement, LiquidGlassMessageBubbleProps>(
  ({ 
    children, 
    sender = "assistant", 
    size = "md", 
    avatar, 
    timestamp, 
    compact = false,
    className, 
    ...props 
  }, ref) => {
    const baseClasses =
      "border align-middle select-none font-sans text-white backdrop-blur-xl transition-all duration-500 antialiased relative overflow-hidden";

    const glassClasses =
      sender === "user"
        ? "bg-gradient-to-br from-blue-500/20 via-blue-400/10 to-blue-300/5 border-blue-300/40 shadow-[inset_0_2px_4px_rgba(59,130,246,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(59,130,246,0.2)]"
        : "bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)]";

    const sizeClasses = {
      sm: compact ? "p-2 text-sm" : "p-3 text-sm",
      md: compact ? "p-3 text-base" : "p-4 text-base", 
      lg: compact ? "p-4 text-lg" : "p-6 text-lg",
    };

    const roundedClasses = sender === "user" 
      ? "rounded-2xl rounded-br-md" 
      : "rounded-2xl rounded-bl-md";

    return (
      <div 
        className={cn(
          "flex items-start gap-3 max-w-4xl",
          sender === "user" ? "flex-row-reverse ml-auto" : "mr-auto"
        )}
      >
        {/* Avatar */}
        {avatar && (
          <div className={cn(
            "flex-shrink-0 flex items-center justify-center rounded-full",
            size === "sm" ? "w-6 h-6" : size === "md" ? "w-8 h-8" : "w-10 h-10",
            sender === "user" ? "bg-blue-500/20 border border-blue-400/30" : "bg-white/10 border border-white/30"
          )}>
            {avatar}
          </div>
        )}

        {/* Message bubble */}
        <div className="flex-1 min-w-0">
          <div
            ref={ref}
            className={cn(
              baseClasses, 
              glassClasses, 
              roundedClasses,
              sizeClasses[size], 
              className
            )}
            {...props}
          >
            {children}
            
            {/* Glass overlays */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none",
              roundedClasses
            )} />
            <div className={cn(
              "absolute inset-0 bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none",
              roundedClasses
            )} />
            <div className={cn(
              "absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none",
              sender === "user" ? "rounded-t-2xl rounded-tr-2xl" : "rounded-t-2xl rounded-tl-2xl"
            )} />
          </div>

          {/* Timestamp */}
          {timestamp && (
            <div className={cn(
              "text-xs text-white/50 mt-1",
              sender === "user" ? "text-right" : "text-left"
            )}>
              {timestamp}
            </div>
          )}
        </div>
      </div>
    );
  }
);

LiquidGlassMessageBubble.displayName = "LiquidGlassMessageBubble";

export { LiquidGlassMessageBubble };`;

  const usageCode = `import { LiquidGlassMessageBubble } from "@/components/ui/liquid-glass-message-bubble";
import { Bot, User } from "lucide-react";

export default function ChatExample() {
  return (
    <div className="space-y-4">
      <LiquidGlassMessageBubble
        sender="assistant"
        avatar={<Bot className="w-4 h-4" />}
        timestamp="2:30 PM"
      >
        Hello! How can I help you today?
      </LiquidGlassMessageBubble>
      
      <LiquidGlassMessageBubble
        sender="user"
        avatar={<User className="w-4 h-4" />}
        timestamp="2:31 PM"
      >
        Can you explain liquid glass design?
      </LiquidGlassMessageBubble>
    </div>
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
                Liquid Glass <span className="gradient-text">Message Bubble</span>
              </h1>
            </div>

            {/* Live Usage */}
            <div className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Live Usage</h2>
              <div className="relative overflow-hidden w-full min-h-[300px] rounded-lg border border-border/20">
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
                  alt="Abstract painting background"
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-black/30" aria-hidden />
                <div className="relative z-10 flex items-center justify-center w-full h-full p-6">
                  <div className="w-full max-w-2xl space-y-4">
                    <LiquidGlassMessageBubble
                      sender="assistant"
                      size="md"
                      avatar={<Bot className="w-4 h-4" />}
                      timestamp="2:30 PM"
                    >
                      Hello! I'm your AI assistant. How can I help you today? I can answer questions, help with tasks, or just have a conversation.
                    </LiquidGlassMessageBubble>
                    
                    <LiquidGlassMessageBubble
                      sender="user"
                      size="md"
                      avatar={<User className="w-4 h-4" />}
                      timestamp="2:31 PM"
                    >
                      Can you explain what liquid glass design is?
                    </LiquidGlassMessageBubble>
                    
                    <LiquidGlassMessageBubble
                      sender="assistant"
                      size="md"
                      avatar={<Bot className="w-4 h-4" />}
                      timestamp="2:32 PM"
                    >
                      Liquid glass design creates translucent, layered interfaces with depth and elegance. It uses gradients, shadows, and blur effects to simulate glass-like surfaces.
                    </LiquidGlassMessageBubble>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="mb-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-medium mb-6">How It Works</h2>
                <p className="text-muted-foreground mb-6">
                  The `LiquidGlassMessageBubble` renders chat messages with a refined glass look
                  and contextual alignment. It includes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-8">
                  <li>Layered gradients and shadows to simulate translucent glass.</li>
                  <li>Sender-based alignment: assistant on the left, user on the right.</li>
                  <li>Chat-style corner rounding with a subtle tail per sender.</li>
                  <li>Optional avatar slot and timestamp rendering beneath the bubble.</li>
                  <li>Size variants (`sm`, `md`, `lg`) and a `compact` prop for tight layouts.</li>
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
                          liquid-glass-message-bubble.tsx
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
                        onClick={() => copyToClipboard(componentCode, "component")}
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

            {/* Usage Example */}
            <div className="mb-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-medium mb-6">Usage Example</h2>
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

            <div className="mb-16">
              <div className="max-w-4xl mx-auto">
                <p className="text-muted-foreground text-lg">
                  The LiquidGlassMessageBubble creates elegant chat interfaces with
                  automatic alignment, avatar support, and distinct styling for user
                  vs assistant messages. Perfect for AI chat applications.
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
