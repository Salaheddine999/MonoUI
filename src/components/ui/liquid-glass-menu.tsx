"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, LayoutGroup } from "framer-motion";

export type LiquidGlassMenuItem = {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
};

interface LiquidGlassMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items: LiquidGlassMenuItem[];
  activeKey?: string;
  onSelectItem?: (key: string) => void;
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LiquidGlassMenu = React.forwardRef<HTMLDivElement, LiquidGlassMenuProps>(
  (
    {
      items,
      activeKey,
      onSelectItem,
      orientation = "horizontal",
      size = "md",
      className,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex border align-middle select-none font-sans text-white rounded-2xl backdrop-blur-md transition-all duration-500 antialiased relative overflow-hidden";

    const glassClasses =
      "bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)] hover:from-white/25 hover:via-white/15 hover:to-white/10 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.1),0_12px_40px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3)]";

    const orientationClasses = {
      horizontal: "flex-row",
      vertical: "flex-col",
    };

    const sizeClasses = {
      sm: "p-1",
      md: "p-2",
      lg: "p-3",
    } as const;

    const itemPadding = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-2.5 text-base",
    } as const;

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
        {/* Items */}
        <LayoutGroup id={orientation}>
          {items.map((item) => {
            const isActive = activeKey === item.key;
            return (
              <button
                key={item.key}
                type="button"
                disabled={item.disabled}
                className={cn(
                  "relative rounded-xl transition-colors duration-300 whitespace-nowrap flex items-center gap-2 overflow-hidden mx-0.5",
                  itemPadding[size],
                  isActive ? "text-white" : "text-white/75 hover:text-white",
                  item.disabled && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => !item.disabled && onSelectItem?.(item.key)}
              >
                {isActive && (
                  <motion.span
                    layoutId="lgm-active-pill"
                    layout
                    transition={{ type: "spring", stiffness: 180, damping: 26, mass: 0.9 }}
                    className="absolute inset-0 rounded-xl bg-white/16 backdrop-blur-[1.5px] shadow-[inset_0_1px_2px_rgba(255,255,255,0.35),inset_0_-1px_2px_rgba(0,0,0,0.06)] will-change-transform will-change-filter"
                    aria-hidden
                  />
                )}
                {item.icon && <span className="inline-flex items-center relative z-10">{item.icon}</span>}
                <span className="relative z-10">{item.label}</span>
                {/* Active highlight ring */}
                {isActive && (
                  <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/30" />
                )}
              </button>
            );
          })}
        </LayoutGroup>

        {/* Unique glass overlays */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/30 via-white/8 to-transparent opacity-50 pointer-events-none" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-transparent via-white/4 to-white/15 opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/20 to-transparent opacity-40 pointer-events-none" />
      </div>
    );
  }
);

LiquidGlassMenu.displayName = "LiquidGlassMenu";

export { LiquidGlassMenu };
