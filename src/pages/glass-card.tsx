import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Star } from "lucide-react";
import ComponentPageLayout from "@/components/component-page-layout";

export default function GlassCardPage() {
  const componentCode = `"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, size = "md", className, ...props }, ref) => {
    const baseClasses =
      "border align-middle select-none font-sans text-white rounded-2xl backdrop-blur-lg transition-all duration-500 antialiased relative overflow-hidden";

    const glassClasses =
      "bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)] hover:from-white/25 hover:via-white/15 hover:to-white/10 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.1),0_12px_40px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3)] hover:scale-[1.02]";

    const sizeClasses = {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(baseClasses, glassClasses, sizeClasses[size], className)}
        {...props}
      >
        {children}
        {/* Unique gradient overlays for glass effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none" />
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };`;

  const usageCode = `import { GlassCard } from "@/components/ui/glass-card";

<GlassCard>
  <h3 className="text-lg font-semibold mb-2">Card Title</h3>
  <p className="text-white/80">Your card content goes here</p>
</GlassCard>`;

  return (
    <ComponentPageLayout
      name="Card"
      description="An elegant card component with multi-layer glass effects, noise texture, and depth shadows."
      preview={
        <div className="flex items-center gap-6">
          <GlassCard size="sm" className="w-40 h-24">
            <div className="relative z-10 text-center">
              <Star className="w-4 h-4 text-white/60 mx-auto mb-1" />
              <p className="text-xs text-white/80">Glass Card</p>
            </div>
          </GlassCard>
          <GlassCard size="md" className="w-48 h-28">
            <div className="relative z-10 text-center">
              <h3 className="text-sm font-semibold mb-1">Dashboard</h3>
              <p className="text-xs text-white/70">Frosted panel</p>
            </div>
          </GlassCard>
        </div>
      }
      features={[
        "Multi-layer gradient backgrounds with frosted glass effect",
        "Noise texture overlay for realistic glass appearance",
        "Soft and intense variants with customizable tint colors",
        "Depth shadows and inner glow for dimensional feel",
        "Three size options: sm, md, lg"
]}
      componentCode={componentCode}
      usageCode={usageCode}
    />
  );
}
