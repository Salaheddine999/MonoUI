"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Github, Facebook } from "lucide-react";

// Custom Google Icon Component
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export interface LiquidGlassSocialButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  onGithub?: () => void;
  onGoogle?: () => void;
  onFacebook?: () => void;
  labels?: {
    github?: string;
    google?: string;
    facebook?: string;
  };
  layout?: "horizontal" | "vertical";
  compact?: boolean;
}

const sizeClasses = {
  sm: {
    button: "h-9 px-3 text-xs rounded-xl",
    icon: "w-4 h-4",
    gap: "gap-2",
  },
  md: {
    button: "h-10 px-4 text-sm rounded-xl",
    icon: "w-4 h-4",
    gap: "gap-2.5",
  },
  lg: {
    button: "h-12 px-5 text-base rounded-2xl",
    icon: "w-5 h-5",
    gap: "gap-3",
  },
};

const glassButton =
  "relative inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center text-white backdrop-blur-md transition-all duration-500 antialiased overflow-hidden\n   bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40\n   shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)]\n   hover:from-white/25 hover:via-white/15 hover:to-white/10\n   hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.1),0_12px_40px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3)]\n   focus:outline-none focus:ring-2 focus:ring-white/30 hover:scale-[1.02] active:scale-[0.99]";

// Using lucide-react's Chrome icon as the Google sign-in glyph

export const LiquidGlassSocialButtons = React.forwardRef<HTMLDivElement, LiquidGlassSocialButtonsProps>(
  (
    {
      size = "md",
      onGithub,
      onGoogle,
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
          <GoogleIcon className={cn(s.icon, "mr-2 text-white")} />
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

LiquidGlassSocialButtons.displayName = "LiquidGlassSocialButtons";
