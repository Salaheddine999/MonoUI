import React from "react";
import { GlassButtonGroup } from "@/components/ui/glass-button-group";
import ComponentPageLayout from "@/components/component-page-layout";

export default function GlassButtonGroupPage() {
  const componentCode = `"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const GlassButtonGroup = React.forwardRef<HTMLDivElement, GlassButtonGroupProps>(
  ({ children, orientation = "horizontal", size = "md", className, ...props }, ref) => {
    const baseClasses =
      "inline-flex border align-middle select-none font-sans text-white rounded-2xl backdrop-blur-lg transition-all duration-500 antialiased relative overflow-hidden";

    const glassClasses =
      "bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)] hover:from-white/25 hover:via-white/15 hover:to-white/10 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.1),0_12px_40px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3)] hover:scale-[1.02]";

    const orientationClasses = {
      horizontal: "flex-row",
      vertical: "flex-col",
    };

    const sizeClasses = {
      sm: "p-1",
      md: "p-2",
      lg: "p-3",
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          glassClasses,
          orientationClasses[orientation],
          sizeClasses[size],
          className
        )}
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

GlassButtonGroup.displayName = "GlassButtonGroup";

export { GlassButtonGroup };`;

  const usageCode = `import { GlassButtonGroup } from "@/components/ui/glass-button-group";

<GlassButtonGroup orientation="horizontal" size="md">
  <button className="px-4 py-2 text-sm font-medium">Button 1</button>
  <button className="px-4 py-2 text-sm font-medium">Button 2</button>
  <button className="px-4 py-2 text-sm font-medium">Button 3</button>
</GlassButtonGroup>`;

  return (
    <ComponentPageLayout
      name="Button Group"
      description="A container for grouping buttons with glass styling and seamless borders."
      preview={
        <GlassButtonGroup size="md" orientation="horizontal">
          <button className="px-4 py-2 text-sm font-medium text-white/70">Option 1</button>
          <button className="px-4 py-2 text-sm font-medium text-white/70">Option 2</button>
          <button className="px-4 py-2 text-sm font-medium text-white/70">Option 3</button>
        </GlassButtonGroup>
      }
      features={[
        "Groups multiple buttons with shared glass styling",
        "Horizontal and vertical orientation support",
        "Seamless borders between grouped buttons",
        "Multiple size variants for different contexts",
        "Works with any button-like child elements"
]}
      componentCode={componentCode}
      usageCode={usageCode}
    />
  );
}
