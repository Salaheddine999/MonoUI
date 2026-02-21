import React from "react";
import { GlassSocialButtons } from "@/components/ui/glass-social-buttons";
import ComponentPageLayout from "@/components/component-page-layout";

export default function GlassSocialButtonsPage() {
  const componentCode = `"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Github, Facebook } from "lucide-react";
import { SiGoogle } from "react-icons/si";

export interface GlassSocialButtonsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  className?: string;
  onGithubClick?: () => void;
  onGoogleClick?: () => void;
  onFacebookClick?: () => void;
}

const sizeClasses = {
  sm: { button: "h-9 px-4 text-xs rounded-xl", icon: "w-4 h-4", gap: "gap-2" },
  md: { button: "h-10 px-5 text-sm rounded-xl", icon: "w-4 h-4", gap: "gap-2.5" },
  lg: { button: "h-12 px-6 text-base rounded-2xl", icon: "w-5 h-5", gap: "gap-3" },
};

const glassButton =
  "relative inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center text-white backdrop-blur-lg transition-all duration-500 antialiased overflow-hidden\n   bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40\n   shadow-[inset_0_2px_4px_RGBA(255,255,255,0.4),inset_0_-1px_2px_RGBA(0,0,0,0.1),0_8px_32px_RGBA(0,0,0,0.3),0_2px_8px_RGBA(0,0,0,0.2)]\n   hover:from-white/25 hover:via-white/15 hover:to-white/10\n   hover:shadow-[inset_0_2px_4px_RGBA(255,255,255,0.5),inset_0_-1px_2px_RGBA(0,0,0,0.1),0_12px_40px_RGBA(0,0,0,0.4),0_4px_12px_RGBA(0,0,0,0.3)]\n   focus:outline-none focus:ring-2 focus:ring-white/30 hover:scale-[1.02] active:scale-[0.99]";

export const GlassSocialButtons = React.forwardRef<HTMLDivElement, GlassSocialButtonsProps>(
  (
    {
      size = "md",
      onGithubClick,
      onGoogleClick,
{{ ... }}
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
          <SiGoogle className={cn(s.icon, "mr-2 text-white")} />
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

GlassSocialButtons.displayName = "GlassSocialButtons";`;

  const usageCode = `import { GlassSocialButtons } from "@/components/ui/glass-social-buttons";

export default function Example() {
  return (
    <GlassSocialButtons
      size="md"
      onGithub={() => {}}
      onGoogle={() => {}}
      onFacebook={() => {}}
    />
  );
}`;

  return (
    <ComponentPageLayout
      name="Social Buttons"
      description="GitHub, Google, and Facebook login buttons with glass styling and provider icons."
      preview={
        <GlassSocialButtons size="md" />
      }
      features={[
        "Pre-built GitHub, Google, and Facebook buttons",
        "Glass-styled containers with provider-specific icons",
        "Hover effects with subtle scale and glow",
        "Multiple size variants for different layouts",
        "onClick handlers for authentication flow integration"
]}
      componentCode={componentCode}
      usageCode={usageCode}
    />
  );
}
