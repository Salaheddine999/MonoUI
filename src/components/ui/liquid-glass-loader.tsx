"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LiquidGlassLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse" | "bars";
  className?: string;
  label?: string;
  showLabel?: boolean;
}

const LiquidGlassLoader = React.forwardRef<HTMLDivElement, LiquidGlassLoaderProps>(
  (
    {
      size = "md",
      variant = "spinner",
      className,
      label = "Loading...",
      showLabel = false,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center border align-middle select-none font-sans text-white rounded-2xl backdrop-blur-md transition-all duration-500 antialiased relative overflow-hidden";

    const glassClasses =
      "bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)]";

    const sizeClasses = {
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    };

    const spinnerSizes = {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
    };

    const dotSizes = {
      sm: "w-1.5 h-1.5",
      md: "w-2 h-2",
      lg: "w-3 h-3",
    };

    const barSizes = {
      sm: { width: "w-0.5", heights: ["h-2", "h-3", "h-4", "h-3", "h-2"] },
      md: { width: "w-1", heights: ["h-3", "h-4", "h-6", "h-4", "h-3"] },
      lg: { width: "w-1.5", heights: ["h-4", "h-6", "h-8", "h-6", "h-4"] },
    };

    const labelSizes = {
      sm: "text-xs mt-2",
      md: "text-sm mt-3",
      lg: "text-base mt-4",
    };

    const renderSpinner = () => (
      <motion.div
        className={cn(
          "border-2 border-white/30 border-t-white rounded-full",
          spinnerSizes[size]
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    );

    const renderDots = () => (
      <div className="flex space-x-1">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={cn(
              "bg-white rounded-full",
              dotSizes[size]
            )}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );

    const renderPulse = () => (
      <motion.div
        className={cn(
          "bg-white/60 rounded-full",
          spinnerSizes[size]
        )}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );

    const renderBars = () => (
      <div className="flex items-end space-x-1">
        {barSizes[size].heights.map((height, index) => (
          <motion.div
            key={index}
            className={cn(
              "bg-white rounded-sm",
              barSizes[size].width,
              height
            )}
            animate={{
              scaleY: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: index * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );

    const renderVariant = () => {
      switch (variant) {
        case "dots":
          return renderDots();
        case "pulse":
          return renderPulse();
        case "bars":
          return renderBars();
        case "spinner":
        default:
          return renderSpinner();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center",
          showLabel ? "space-y-0" : "",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            baseClasses,
            glassClasses,
            sizeClasses[size]
          )}
        >
          {renderVariant()}
          
          {/* Unique glass overlays */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none" />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none" />
        </div>
        
        {showLabel && (
          <motion.span
            className={cn(
              "text-white/80 font-medium",
              labelSizes[size]
            )}
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {label}
          </motion.span>
        )}
      </div>
    );
  }
);

LiquidGlassLoader.displayName = "LiquidGlassLoader";

export { LiquidGlassLoader };
