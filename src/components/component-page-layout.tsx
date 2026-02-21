import React, { useState } from "react";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ComponentPageLayoutProps {
  name: string;
  description: string;
  preview: React.ReactNode;
  features: string[];
  componentCode: string;
  usageCode: string;
}

export default function ComponentPageLayout({
  name,
  description,
  preview,
  features,
  componentCode,
  usageCode,
}: ComponentPageLayoutProps) {
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

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <Navigation />

      <div className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Back link */}
          <button
            onClick={() => setLocation("/components")}
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-200 mb-8 md:mb-12"
          >
            <ArrowLeft size={14} />
            Components
          </button>

          {/* Header */}
          <div className="mb-10 md:mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary block mb-3 md:mb-4">
              Component
            </span>
            <h1 className="font-display text-3xl sm:text-5xl md:text-7xl tracking-tight mb-4 md:mb-6">
              {name.toUpperCase()}
            </h1>
            <p className="max-w-lg font-mono text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* Live preview */}
          <div className="mb-10 md:mb-16">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50">
                Preview
              </span>
              <div className="flex-1 h-px bg-border/20" />
            </div>
            <div className="relative overflow-hidden border border-border/20 min-h-[180px] md:min-h-[240px] flex items-center justify-center p-4 md:p-8">
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
                aria-hidden
              />
              <div className="absolute inset-0 bg-black/30" aria-hidden />
              <div className="relative z-10">
                {preview}
              </div>
            </div>
          </div>

          {/* Two-column: Features + Usage */}
          <div className="grid md:grid-cols-2 gap-px mb-10 md:mb-16">
            {/* Features */}
            <div className="bg-background border border-border/15 p-5 md:p-8 min-w-0 overflow-hidden">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50 block mb-4 md:mb-6">
                How It Works
              </span>
              <ul className="space-y-3">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-mono text-[9px] text-primary/50 mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Usage */}
            <div className="bg-background border border-border/15 p-5 md:p-8 min-w-0 overflow-hidden">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50">
                  Quick Usage
                </span>
                <button
                  onClick={() => copyToClipboard(usageCode, "usage")}
                  className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40 hover:text-primary transition-colors"
                >
                  {copiedCode === "usage" ? (
                    <Check size={12} />
                  ) : (
                    <Copy size={12} />
                  )}
                </button>
              </div>
              <div className="overflow-x-auto">
                <SyntaxHighlighter
                  language="tsx"
                  style={oneDark}
                  customStyle={{
                    margin: 0,
                    padding: "1rem",
                    background: "hsl(0 0% 6%)",
                    fontSize: "0.7rem",
                    lineHeight: "1.7",
                    borderRadius: 0,
                    border: "1px solid hsl(0 0% 15%)",
                  }}
                >
                  {usageCode}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>

          {/* Full component code */}
          <div className="mb-10 md:mb-16">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50">
                  Source Code
                </span>
                <div className="flex-1 h-px bg-border/20 hidden sm:block" />
              </div>
              <button
                onClick={() => copyToClipboard(componentCode, "component")}
                className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40 hover:text-primary transition-colors"
              >
                {copiedCode === "component" ? "Copied" : "Copy"}
                {copiedCode === "component" ? (
                  <Check size={12} />
                ) : (
                  <Copy size={12} />
                )}
              </button>
            </div>
            <div className="border border-border/20 overflow-x-auto">
              <SyntaxHighlighter
                language="tsx"
                style={oneDark}
                customStyle={{
                  margin: 0,
                  padding: "1rem",
                  background: "hsl(0 0% 6%)",
                  fontSize: "0.7rem",
                  lineHeight: "1.6",
                  borderRadius: 0,
                }}
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

      <Footer />
    </div>
  );
}
