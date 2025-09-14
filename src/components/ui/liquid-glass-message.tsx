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

const LiquidGlassMessage = React.forwardRef<
  HTMLDivElement,
  LiquidGlassMessageProps
>(
  (
    {
      children,
      variant = "info",
      size = "md",
      dismissible = false,
      onDismiss,
      className,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "border align-middle select-none font-sans text-white rounded-2xl backdrop-blur-md transition-all duration-500 antialiased relative overflow-hidden flex items-start gap-3";

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
        className={cn(baseClasses, glassClasses, sizeClasses[size], className)}
        {...props}
      >
        <Icon
          className={cn("flex-shrink-0 mt-0.5", variantColors[variant])}
          size={size === "sm" ? 16 : size === "md" ? 20 : 24}
        />
        <div className="flex-1 min-w-0">{children}</div>
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

export { LiquidGlassMessage };
