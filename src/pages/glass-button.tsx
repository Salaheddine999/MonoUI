import React from "react";
import { GlassButton } from "@/components/ui/glass-button";
import ComponentPageLayout from "@/components/component-page-layout";

export default function GlassButtonPage() {
  const componentCode = `"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const GlassButton = React.forwardRef<
  HTMLButtonElement,
  GlassButtonProps
>(
  (
    { children, size = "md", className, ...props },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center border align-middle select-none font-sans font-semibold text-center text-white rounded-2xl backdrop-blur-lg transition-all duration-500 antialiased relative overflow-hidden";

    const glassClasses =
      "bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)] hover:from-white/25 hover:via-white/15 hover:to-white/10 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.1),0_12px_40px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3)] hover:scale-[1.02]";

    const sizeClasses = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          glassClasses,
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none" />
      </button>
    );
  }
);

GlassButton.displayName = "GlassButton";

export { GlassButton };`;

  const usageCode = `import { GlassButton } from "@/components/ui/glass-button";

<GlassButton>
  Click me
</GlassButton>`;

  return (
    <ComponentPageLayout
      name="Button"
      description="A premium button component with sophisticated glass effects, gradient overlays, and smooth hover animations."
      preview={
        <div className="flex items-center gap-6">
          <GlassButton size="sm">Small</GlassButton>
          <GlassButton size="md">Medium</GlassButton>
          <GlassButton size="lg">Large</GlassButton>
        </div>
      }
      features={[
        "Gradient backgrounds create depth and dimension",
        "Multiple shadow layers simulate realistic glass reflection",
        "Gradient overlays provide authentic glass highlight effects",
        "Smooth hover animations enhance user interaction",
        "Backdrop blur creates the frosted glass appearance",
      ]}
      componentCode={componentCode}
      usageCode={usageCode}
    />
  );
}
