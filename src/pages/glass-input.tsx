import React from "react";
import { GlassInput } from "@/components/ui/glass-input";
import ComponentPageLayout from "@/components/component-page-layout";

export default function GlassInputPage() {
  const componentCode = `"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
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

GlassInput.displayName = "GlassInput";

export { GlassInput };`;

  const usageCode = `import { GlassInput } from "@/components/ui/glass-input";

<GlassInput 
  placeholder="Enter your email"
  type="email"
/>`;

  return (
    <ComponentPageLayout
      name="Input"
      description="A beautiful input component with glass styling, focus rings, and smooth transitions."
      preview={
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <GlassInput size="sm" placeholder="Small input..." />
          <GlassInput size="md" placeholder="Medium input..." />
          <GlassInput size="lg" placeholder="Large input..." />
        </div>
      }
      features={[
        "Backdrop blur creates the frosted glass appearance",
        "Focus ring transitions for clear interactive feedback",
        "Gradient overlays for authentic glass highlights",
        "Three size variants with consistent styling",
        "Works as a drop-in replacement for standard inputs"
]}
      componentCode={componentCode}
      usageCode={usageCode}
    />
  );
}
