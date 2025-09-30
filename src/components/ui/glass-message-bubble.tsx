import React from "react";
import { cn } from "@/lib/utils";

export interface GlassMessageBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
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

const GlassMessageBubble = React.forwardRef<HTMLDivElement, GlassMessageBubbleProps>(
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
      "border align-middle select-none font-sans text-white backdrop-blur-md transition-all duration-500 antialiased relative overflow-hidden";

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

GlassMessageBubble.displayName = "GlassMessageBubble";

export { GlassMessageBubble };
