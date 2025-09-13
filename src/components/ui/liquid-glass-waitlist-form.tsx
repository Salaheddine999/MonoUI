"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check, Mail, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface LiquidGlassWaitlistFormProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  buttonText?: string;
  successMessage?: string;
  onSubmit?: (email: string) => Promise<void> | void;
}

const sizeClasses = {
  sm: {
    container: "p-4 rounded-xl",
    input: "h-9 px-3 text-xs rounded-lg",
    button: "h-9 px-4 text-xs rounded-lg",
    icon: "w-4 h-4",
    gap: "gap-2",
  },
  md: {
    container: "p-6 rounded-xl",
    input: "h-11 px-4 text-sm rounded-lg",
    button: "h-11 px-6 text-sm rounded-lg",
    icon: "w-4 h-4",
    gap: "gap-3",
  },
  lg: {
    container: "p-8 rounded-2xl",
    input: "h-12 px-5 text-base rounded-xl",
    button: "h-12 px-8 text-base rounded-xl",
    icon: "w-5 h-5",
    gap: "gap-4",
  },
};

const glassContainer =
  "relative backdrop-blur-lg border overflow-hidden bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)]";

const glassInput =
  "relative w-full bg-white/10 border border-white/30 text-white placeholder-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/50 transition-all duration-300";

const glassButton =
  "relative inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center text-white backdrop-blur-lg transition-all duration-500 antialiased overflow-hidden bg-gradient-to-br from-white/20 via-white/10 to-white/5 border-white/50 shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.2)] hover:from-white/30 hover:via-white/20 hover:to-white/10 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-1px_2px_rgba(0,0,0,0.1),0_6px_20px_rgba(0,0,0,0.3)] focus:outline-none focus:ring-2 focus:ring-white/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";

export const LiquidGlassWaitlistForm = React.forwardRef<HTMLDivElement, LiquidGlassWaitlistFormProps>(
  ({ 
    size = "md", 
    className, 
    placeholder = "Enter your email address",
    buttonText = "Join Waitlist",
    successMessage = "You're on the list!",
    onSubmit,
    ...props 
  }, ref) => {
    const s = sizeClasses[size];
    const [email, setEmail] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim() || isSubmitting || isAnimating) return;

      try {
        setIsSubmitting(true);
        setIsAnimating(true);
        
        if (onSubmit) {
          await onSubmit(email.trim());
        }
        
        // Small delay for better UX
        setTimeout(() => {
          setIsSuccess(true);
          setIsSubmitting(false);
          setIsAnimating(false);
          
          // Reset after success animation
          setTimeout(() => {
            setIsSuccess(false);
            setEmail("");
          }, 3000);
        }, 800);
        
      } catch (err) {
        console.error("Failed to submit:", err);
        setIsSubmitting(false);
        setIsAnimating(false);
      }
    };

    return (
      <motion.div
        ref={ref}
        className={cn(glassContainer, s.container, className)}
        animate={isSuccess || isAnimating ? {
          scale: [1, 1.02, 1],
          transition: { duration: 0.5, times: [0, 0.3, 1] }
        } : {}}
        {...(props as any)}
      >
        {/* Glass overlays */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/30 via-white/10 to-transparent opacity-60 pointer-events-none" />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-xl bg-gradient-to-b from-white/25 to-transparent opacity-50 pointer-events-none" />

        {/* Success effects */}
        <AnimatePresence>
          {(isSuccess || isAnimating) && (
            <>
              {/* Success pulse ring */}
              <motion.div
                key="success-ring"
                className="absolute inset-0 rounded-xl border-2 border-green-400/60 pointer-events-none"
                initial={{ scale: 0.95, opacity: 0.8 }}
                animate={{ scale: 1.1, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              
              {/* Success glow */}
              <motion.div
                key="success-glow"
                className="absolute inset-0 rounded-xl bg-green-400/20 pointer-events-none"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: [0, 0.4, 0], scale: [0.98, 1.01, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, times: [0, 0.4, 1] }}
              />
              
              {/* Shine sweep */}
              <motion.div
                key="success-shine"
                className="pointer-events-none absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-transparent via-green-400/40 to-transparent skew-x-12 rounded-xl"
                initial={{ x: "-150%", opacity: 0 }}
                animate={{ x: "150%", opacity: [0, 0.8, 0] }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 1, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  times: [0, 0.5, 1]
                }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ scale: 0.9, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={cn("flex flex-col items-center text-center", s.gap)}
              >
                <motion.div
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0.1 }}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-green-400/20 border border-green-400/40"
                >
                  <Check className="w-6 h-6 text-green-400" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Success!</h3>
                  <p className="text-sm text-white/80">{successMessage}</p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit}
                className={cn("flex flex-col", s.gap)}
              >
                <div className="relative">
                  <Mail className={cn(s.icon, "absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 pointer-events-none")} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={placeholder}
                    disabled={isSubmitting}
                    className={cn(glassInput, s.input, "pl-10")}
                    required
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={!email.trim() || isSubmitting}
                  className={cn(glassButton, s.button, s.gap)}
                  whileTap={{ scale: 0.98 }}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center"
                      >
                        <Loader2 className={cn(s.icon, "mr-2 animate-spin")} />
                        Joining...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="submit"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center"
                      >
                        {buttonText}
                        <ArrowRight className={cn(s.icon, "ml-2")} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }
);

LiquidGlassWaitlistForm.displayName = "LiquidGlassWaitlistForm";
