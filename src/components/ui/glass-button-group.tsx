import React from "react";
import { cn } from "@/lib/utils";

interface GlassButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const GlassButtonGroup = React.forwardRef<
  HTMLDivElement,
  GlassButtonGroupProps
>(
  (
    { children, orientation = "horizontal", size = "md", className, ...props },
    ref
  ) => {
    const baseClasses =
      "inline-flex border align-middle select-none font-sans text-white rounded-2xl backdrop-blur-md transition-all duration-500 antialiased relative overflow-hidden";

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

    // Add separators between children
    const childrenArray = React.Children.toArray(children);
    const separatorClass =
      orientation === "horizontal"
        ? "w-px bg-white/20 mx-1 self-stretch"
        : "h-px bg-white/20 my-1 self-stretch";

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
        {childrenArray.map((child, index) => (
          <React.Fragment key={index}>
            <div className="hover:bg-white/10 transition-colors duration-200 rounded-xl">
              {child}
            </div>
            {index < childrenArray.length - 1 && (
              <div className={separatorClass} />
            )}
          </React.Fragment>
        ))}
        {/* Unique gradient overlays for glass effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/30 via-white/8 to-transparent opacity-50 pointer-events-none" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-transparent via-white/4 to-white/15 opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/20 to-transparent opacity-40 pointer-events-none" />
      </div>
    );
  }
);

GlassButtonGroup.displayName = "GlassButtonGroup";

export { GlassButtonGroup };
