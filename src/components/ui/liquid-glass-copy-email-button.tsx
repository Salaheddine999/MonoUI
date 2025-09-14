"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface LiquidGlassCopyEmailButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  email: string;
  size?: "sm" | "md" | "lg";
  copiedLabel?: string; // optional label when copied
}

const sizeClasses = {
  sm: {
    button: "h-9 px-4 text-xs rounded-xl",
    icon: "w-4 h-4",
    gap: "gap-2",
  },
  md: {
    button: "h-10 px-5 text-sm rounded-xl",
    icon: "w-4 h-4",
    gap: "gap-2.5",
  },
  lg: {
    button: "h-12 px-6 text-base rounded-2xl",
    icon: "w-5 h-5",
    gap: "gap-3",
  },
};

const glassButton =
  "relative inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center text-white backdrop-blur-md transition-all duration-500 antialiased overflow-hidden\n   bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40\n   shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)]\n   hover:from-white/25 hover:via-white/15 hover:to-white/10\n   hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.1),0_12px_40px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3)]\n   focus:outline-none focus:ring-2 focus:ring-white/30 hover:scale-[1.02] active:scale-[0.99]";

export const LiquidGlassCopyEmailButton = React.forwardRef<
  HTMLButtonElement,
  LiquidGlassCopyEmailButtonProps
>(({ email, size = "md", className, copiedLabel = "Copied!", onClick, ...props }, ref) => {
  const s = sizeClasses[size];
  const [copied, setCopied] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const onCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isAnimating) return; // Prevent multiple clicks during animation
    
    try {
      setIsAnimating(true);
      await navigator.clipboard.writeText(email);
      
      // Small delay to ensure clipboard operation completes
      setTimeout(() => {
        setCopied(true);
        setIsAnimating(false);
        // reset after animation
        setTimeout(() => setCopied(false), 1400);
      }, 50);
      
      onClick?.(e);
    } catch (err) {
      console.error("Failed to copy email:", err);
      setIsAnimating(false);
    }
  };

  return (
    <motion.button
      ref={ref}
      onClick={onCopy}
      aria-label={`Copy email ${email}`}
      className={cn(glassButton, s.button, s.gap, "group", className)}
      whileTap={{ 
        scale: 0.96,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      animate={copied || isAnimating ? { 
        scale: [1, 1.02, 1],
        transition: { 
          duration: 0.4, 
          times: [0, 0.2, 1],
          ease: "easeOut"
        }
      } : {}}
      {...(props as any)}
    >
      {/* Glass overlays */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none" />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-xl bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none" />

      {/* Multiple success effects */}
      <AnimatePresence>
        {(copied || isAnimating) && (
          <>
            {/* Expanding ring pulse */}
            <motion.div
              key="pulse-ring"
              className="absolute inset-0 rounded-xl border-2 border-white/60 pointer-events-none"
              initial={{ scale: 0.95, opacity: 0.8 }}
              animate={{ scale: 1.15, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
            
            {/* Inner glow pulse */}
            <motion.div
              key="inner-glow"
              className="absolute inset-0 rounded-xl bg-white/20 pointer-events-none"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: [0, 0.3, 0], scale: [0.98, 1.01, 1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, times: [0, 0.3, 1] }}
            />
            
            {/* Enhanced shine sweep */}
            <motion.div
              key="shine-sweep"
              className="pointer-events-none absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12 rounded-xl"
              initial={{ x: "-150%", opacity: 0 }}
              animate={{ x: "150%", opacity: [0, 0.8, 0] }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94],
                times: [0, 0.5, 1]
              }}
            />
            
            {/* Radial burst effect */}
            <motion.div
              key="radial-burst"
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                background: `radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 30%, transparent 70%)`
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: [0, 0.6, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, times: [0, 0.2, 1] }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Content */}
      <span className={cn("relative z-10 inline-flex items-center", s.gap)}>
        <AnimatePresence initial={false} mode="wait">
          {copied ? (
            <motion.span
              key="copied"
              initial={{ scale: 0.85, opacity: 0, y: 6 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: -6 }}
              transition={{ type: "spring", stiffness: 520, damping: 26, mass: 0.6 }}
              className="inline-flex items-center"
            >
              <motion.span
                initial={{ rotate: -10, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 600, damping: 28 }}
                className="inline-flex"
              >
                <Check className={cn(s.icon, "mr-2 text-white")} />
              </motion.span>
              <span className="whitespace-nowrap">{copiedLabel}</span>
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.98, opacity: 0.9 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.7 }}
              className="inline-flex items-center"
            >
              <motion.span
                initial={{ y: 0 }}
                whileHover={{ y: -0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="inline-flex"
              >
                <Copy className={cn(s.icon, "mr-2 text-white")} />
              </motion.span>
              {/* Ensure full email is visible */}
              <span className="whitespace-nowrap font-medium">{email}</span>
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
});

LiquidGlassCopyEmailButton.displayName = "LiquidGlassCopyEmailButton";
