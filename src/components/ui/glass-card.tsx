import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  /**
   * Controls overall intensity of the glass effect
   * - soft: lighter shadows and overlays
   * - intense: deeper contrast and stronger reflections
   */
  variant?: "soft" | "intense";
  /**
   * Optional color tint for the glass inner glow
   */
  tint?: "none" | "blue" | "purple" | "rose" | "green";
  className?: string;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, size = "md", variant = "soft", tint = "none", className, ...props }, ref) => {
    const baseClasses =
      "border align-middle select-none font-sans text-white rounded-2xl backdrop-blur-md backdrop-saturate-150 transition-all duration-500 antialiased relative overflow-hidden";

    const glassClasses =
      variant === "intense"
        ? "bg-gradient-to-br from-white/20 via-white/10 to-white/5 border-white/50 shadow-[inset_0_3px_6px_rgba(255,255,255,0.55),inset_0_-1px_2px_rgba(0,0,0,0.12),0_12px_48px_rgba(0,0,0,0.35),0_3px_10px_rgba(0,0,0,0.25)] hover:from-white/30 hover:via-white/15 hover:to-white/10 hover:shadow-[inset_0_3px_6px_rgba(255,255,255,0.65),inset_0_-1px_2px_rgba(0,0,0,0.12),0_18px_60px_rgba(0,0,0,0.45),0_6px_16px_rgba(0,0,0,0.35)] hover:scale-[1.025]"
        : "bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)] hover:from-white/25 hover:via-white/15 hover:to-white/10 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.1),0_12px_40px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3)] hover:scale-[1.02]";

    const sizeClasses = {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    const tintRing = {
      none: "",
      blue: "ring-1 ring-inset ring-blue-300/20",
      purple: "ring-1 ring-inset ring-purple-300/20",
      rose: "ring-1 ring-inset ring-rose-300/20",
      green: "ring-1 ring-inset ring-green-300/20",
    }[tint];

    return (
      <div
        ref={ref}
        className={cn(baseClasses, glassClasses, tintRing, sizeClasses[size], className)}
        {...props}
      >
        {children}
        {/* Unique gradient overlays for glass effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none" />

        {/* Inner highlight ring */}
        <div className="pointer-events-none absolute inset-0 rounded-[1rem] ring-1 ring-white/10" />

        {/* Sheen reflections */}
        <div className="pointer-events-none absolute -top-12 -left-8 w-40 h-40 bg-white/15 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -right-8 w-52 h-52 bg-white/10 rounded-full blur-3xl" />

        {/* Vignette for depth */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_60px_rgba(0,0,0,0.15)]" />

        {/* Subtle noise overlay (SVG data URI) */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.08] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\'><filter id=\\'n\\'><feTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.8\\' numOctaves=\\'2\\' stitchTiles=\\'stitch\\'/></filter><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(#n)\\' opacity=\\'0.25\\'/></svg>')",
            backgroundSize: "auto",
          }}
        />
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
