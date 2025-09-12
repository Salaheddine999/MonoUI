import React from "react";
import { cn } from "@/lib/utils";

interface LiquidGlassToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { track: "w-10 h-6", thumb: "w-5 h-5", translate: "translate-x-4" },
  md: { track: "w-12 h-7", thumb: "w-6 h-6", translate: "translate-x-5" },
  lg: { track: "w-16 h-9", thumb: "w-8 h-8", translate: "translate-x-7" },
};

const LiquidGlassToggle = React.forwardRef<HTMLButtonElement, LiquidGlassToggleProps>(
  (
    {
      checked,
      defaultChecked,
      onCheckedChange,
      size = "md",
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const [internal, setInternal] = React.useState<boolean>(defaultChecked ?? false);
    const isControlled = typeof checked === "boolean";
    const isOn = isControlled ? !!checked : internal;

    const toggle = () => {
      if (disabled) return;
      const next = !isOn;
      if (!isControlled) setInternal(next);
      onCheckedChange?.(next);
    };

    const baseTrack =
      "relative inline-flex items-center border rounded-full transition-all duration-500 backdrop-blur-lg overflow-hidden align-middle select-none antialiased focus:outline-none focus:ring-2 focus:ring-white/30";

    const glassTrack =
      "bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)] hover:from-white/25 hover:via-white/15 hover:to-white/10 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.1),0_12px_40px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3)]";

    const activeGlow = isOn
      ? "ring-2 ring-white/30 shadow-[0_0_20px_rgba(255,255,255,0.25)]"
      : "";

    const s = sizes[size];

    return (
      <button
        ref={ref}
        role="switch"
        aria-checked={isOn}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={toggle}
        className={cn(baseTrack, glassTrack, activeGlow, s.track, className)}
        {...props}
      >
        {/* Track overlays for glass effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none" />

        {/* Thumb */}
        <span
          className={cn(
            "z-10 inline-block rounded-full transform transition-all duration-500 ease-out",
            "bg-gradient-to-br from-white/70 via-white/60 to-white/50",
            "shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_4px_16px_rgba(0,0,0,0.25)]",
            s.thumb,
            isOn ? s.translate : "translate-x-1"
          )}
        />

        {/* Optional inner glow when ON */}
        {isOn && (
          <div className="absolute inset-0 rounded-full bg-white/10 blur-sm pointer-events-none" />
        )}
      </button>
    );
  }
);

LiquidGlassToggle.displayName = "LiquidGlassToggle";

export { LiquidGlassToggle };
