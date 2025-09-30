import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassSocialButtons } from "@/components/ui/glass-social-buttons";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function GlassSocialButtonsPage() {
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
import { Github, Facebook } from "lucide-react";
import { SiGoogle } from "react-icons/si";

export interface GlassSocialButtonsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  className?: string;
  onGithubClick?: () => void;
  onGoogleClick?: () => void;
  onFacebookClick?: () => void;
}

const sizeClasses = {
  sm: { button: "h-9 px-4 text-xs rounded-xl", icon: "w-4 h-4", gap: "gap-2" },
  md: { button: "h-10 px-5 text-sm rounded-xl", icon: "w-4 h-4", gap: "gap-2.5" },
  lg: { button: "h-12 px-6 text-base rounded-2xl", icon: "w-5 h-5", gap: "gap-3" },
};

const glassButton =
  "relative inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center text-white backdrop-blur-lg transition-all duration-500 antialiased overflow-hidden\n   bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40\n   shadow-[inset_0_2px_4px_RGBA(255,255,255,0.4),inset_0_-1px_2px_RGBA(0,0,0,0.1),0_8px_32px_RGBA(0,0,0,0.3),0_2px_8px_RGBA(0,0,0,0.2)]\n   hover:from-white/25 hover:via-white/15 hover:to-white/10\n   hover:shadow-[inset_0_2px_4px_RGBA(255,255,255,0.5),inset_0_-1px_2px_RGBA(0,0,0,0.1),0_12px_40px_RGBA(0,0,0,0.4),0_4px_12px_RGBA(0,0,0,0.3)]\n   focus:outline-none focus:ring-2 focus:ring-white/30 hover:scale-[1.02] active:scale-[0.99]";

export const GlassSocialButtons = React.forwardRef<HTMLDivElement, GlassSocialButtonsProps>(
  (
    {
      size = "md",
      onGithubClick,
      onGoogleClick,
{{ ... }}
      onFacebook,
      className,
      labels,
      layout = "vertical",
      compact,
      ...props
    },
    ref
  ) => {
    const s = sizeClasses[size];
    const direction = layout === "vertical" ? "flex-col" : "flex-row";

    const ButtonBase: React.FC<
      React.ButtonHTMLAttributes<HTMLButtonElement> & { brandBg?: string }
    > = ({ className, children, brandBg, ...btnProps }) => (
      <button
        className={cn(glassButton, s.button, s.gap, "group", className)}
        {...btnProps}
      >
        {/* Glass overlays */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none" />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-xl bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none" />
        {/* Content */}
        <div className="relative z-10 inline-flex items-center">
          {children}
        </div>
      </button>
    );

    return (
      <div ref={ref} className={cn("flex", direction, s.gap, className)} {...props}>
        <ButtonBase onClick={onGithub} aria-label={labels?.github || "Continue with GitHub"}>
          <Github className={cn(s.icon, "mr-2 text-white")} />
          {!compact && <span>Continue with GitHub</span>}
        </ButtonBase>

        <ButtonBase onClick={onGoogle} aria-label={labels?.google || "Continue with Google"}>
          <SiGoogle className={cn(s.icon, "mr-2 text-white")} />
          {!compact && <span>Continue with Google</span>}
        </ButtonBase>

        <ButtonBase onClick={onFacebook} aria-label={labels?.facebook || "Continue with Facebook"}>
          <Facebook className={cn(s.icon, "mr-2 text-white")} />
          {!compact && <span>Continue with Facebook</span>}
        </ButtonBase>
      </div>
    );
  }
);

GlassSocialButtons.displayName = "GlassSocialButtons";`;

  const usageCode = `import { GlassSocialButtons } from "@/components/ui/glass-social-buttons";

export default function Example() {
  return (
    <GlassSocialButtons
      size="md"
      onGithub={() => {}}
      onGoogle={() => {}}
      onFacebook={() => {}}
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
                <span className="gradient-text">Social Buttons</span>
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
                  <GlassSocialButtons size="lg" />
                  <GlassSocialButtons size="md" />
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
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors" onClick={() => copyToClipboard("npm install lucide-react", "install")}>
                        {copiedCode === "install" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="overflow-x-auto">
                      <div className="p-6" style={{ backgroundColor: "#282c34", color: "#abb2bf", fontSize: "0.875rem", lineHeight: "1.6" }}>
                        <div className="flex items-center gap-2">
                          <span className="text-green-400">$</span>
                          <span className="text-blue-400">npm</span>
                          <span className="text-yellow-400">install</span>
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
                  The `GlassSocialButtons` provides GitHub, Google, and Facebook sign-in buttons with
                  Glass styling and accessible semantics.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-8">
                  <li>Premium glass gradients, blur, and layered shadows for depth.</li>
                  <li>Three brand options with icons; customizable labels and callbacks.</li>
                  <li>Layout variants (horizontal/vertical) and sizes (sm, md, lg).</li>
                  <li>Keyboard-focus ring and button semantics for accessibility.</li>
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
                          glass-social-buttons.tsx
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

            {/* Closing Text */}
            <div className="mb-16">
              <div className="max-w-4xl mx-auto">
                <p className="text-muted-foreground text-lg">
                  Use these social login buttons wherever you need third-party sign-in with a premium glass aesthetic.
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
