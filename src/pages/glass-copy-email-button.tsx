import React from "react";
import { GlassCopyEmailButton } from "@/components/ui/glass-copy-email-button";
import ComponentPageLayout from "@/components/component-page-layout";

export default function GlassCopyEmailButtonPage() {
  const componentCode = `"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface GlassCopyEmailButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  email: string;
  size?: "sm" | "md" | "lg";
  copiedLabel?: string;
}

const sizeClasses = {
  sm: { button: "h-9 px-4 text-xs rounded-xl", icon: "w-4 h-4", gap: "gap-2" },
  md: { button: "h-10 px-5 text-sm rounded-xl", icon: "w-4 h-4", gap: "gap-2.5" },
  lg: { button: "h-12 px-6 text-base rounded-2xl", icon: "w-5 h-5", gap: "gap-3" },
};

const glassButton =
  "relative inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center text-white backdrop-blur-lg transition-all duration-500 antialiased overflow-hidden\n   bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40\n   shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)]\n   hover:from-white/25 hover:via-white/15 hover:to-white/10\n   hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.1),0_12px_40px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3)]\n   focus:outline-none focus:ring-2 focus:ring-white/30 hover:scale-[1.02] active:scale-[0.99]";

export const GlassCopyEmailButton = React.forwardRef<
  HTMLButtonElement,
  GlassCopyEmailButtonProps
>(({ email, size = "md", className, copiedLabel = "Copied!", ...props }, ref) => {
  const s = sizeClasses[size];
  const [copied, setCopied] = React.useState(false);

  const onCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <button
      ref={ref}
      onClick={onCopy}
      aria-label={\`Copy email \${email}\`}
      className={cn(glassButton, s.button, s.gap, "group", className)}
      {...props}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none" />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-xl bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none" />

      <AnimatePresence>
        {copied && (
          <motion.span
            key="shine"
            initial={{ x: "-120%", opacity: 0 }}
            animate={{ x: "120%", opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/20 via-white/40 to-transparent skew-x-12 rounded-xl"
          />
        )}
      </AnimatePresence>

      <span className={cn("relative z-10 inline-flex items-center", s.gap)}>
        <AnimatePresence initial={false} mode="wait">
          {copied ? (
            <motion.span
              key="copied"
              initial={{ scale: 0.8, opacity: 0, y: 5 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -5 }}
              transition={{ duration: 0.18 }}
              className="inline-flex items-center"
            >
              <Check className={cn(s.icon, "mr-2 text-white")} />
              <span className="whitespace-nowrap">{copiedLabel}</span>
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.98, opacity: 0.9 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center"
            >
              <Copy className={cn(s.icon, "mr-2 text-white")} />
              <span className="whitespace-nowrap font-medium">{email}</span>
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
});

GlassCopyEmailButton.displayName = "GlassCopyEmailButton";`;

  const usageCode = `import { GlassCopyEmailButton } from "@/components/ui/glass-copy-email-button";

export default function Example() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <GlassCopyEmailButton email="hello@monoui.dev" size="md" />
    </div>
  );
}`;

  return (
    <ComponentPageLayout
      name="Copy Email Button"
      description="A button that displays an email address and copies it to clipboard with a satisfying animation."
      preview={
        <GlassCopyEmailButton email="hello@monoui.dev" size="md" />
      }
      features={[
        "Displays email with one-click copy to clipboard",
        "Animated checkmark confirmation on copy",
        "Glass-styled button with frosted backdrop",
        "Automatic reset after copy confirmation",
        "Multiple size options"
]}
      componentCode={componentCode}
      usageCode={usageCode}
    />
  );
}
