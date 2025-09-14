import React from "react";
import { cn } from "@/lib/utils";

interface LiquidGlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LiquidGlassButton = React.forwardRef<
  HTMLButtonElement,
  LiquidGlassButtonProps
>(({ children, size = "md", className, ...props }, ref) => {
  const baseClasses =
    "inline-flex items-center justify-center border align-middle select-none font-sans font-semibold text-center text-white rounded-2xl backdrop-blur-md transition-all duration-500 antialiased relative overflow-hidden";

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
      className={cn(baseClasses, glassClasses, sizeClasses[size], className)}
      {...props}
    >
      {children}
      {/* Unique gradient overlays for glass effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/30 via-white/8 to-transparent opacity-50 pointer-events-none" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-transparent via-white/4 to-white/15 opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/20 to-transparent opacity-40 pointer-events-none" />
    </button>
  );
});

LiquidGlassButton.displayName = "LiquidGlassButton";

export { LiquidGlassButton };
