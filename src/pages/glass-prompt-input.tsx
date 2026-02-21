import React from "react";
import { GlassPromptInput } from "@/components/ui/glass-prompt-input";
import { Sparkles, Plus, Globe, MoreHorizontal } from "lucide-react";
import ComponentPageLayout from "@/components/component-page-layout";

export default function GlassPromptInputPage() {
  const componentCode = `"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface GlassPromptInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
  multiline?: boolean;
  prefixIcon?: React.ReactNode;
  onSend?: () => void;
  sendLabel?: string;
  className?: string;
}

const sizeMap = {
  sm: { container: "p-2", field: "text-sm py-1", round: "rounded-xl", gap: "gap-2", btn: "px-2 py-1 text-xs" },
  md: { container: "p-3", field: "text-base py-2", round: "rounded-2xl", gap: "gap-3", btn: "px-3 py-1.5 text-sm" },
  lg: { container: "p-4", field: "text-lg py-3", round: "rounded-2xl", gap: "gap-4", btn: "px-4 py-2 text-base" },
};

export const GlassPromptInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  GlassPromptInputProps
>(
  (
    { size = "md", multiline = false, prefixIcon, onSend, sendLabel = "Send", className, onKeyDown, ...props },
    ref
  ) => {
    const s = sizeMap[size];

    const baseClasses =
      "border align-middle select-none font-sans text-white backdrop-blur-xl transition-all duration-500 antialiased relative overflow-hidden";

    const glassClasses =
      "bg-gradient-to-br from-white/15 via-white/8 to-white/5 border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.1),0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)] focus-within:from-white/25 focus-within:via-white/15 focus-within:to-white/10 focus-within:shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(0,0,0,0.1),0_12px_40px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.3)]";

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (onKeyDown) (onKeyDown as unknown as (ev: any) => void)(e as any);
      if (!multiline && e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSend?.();
      }
      if (multiline && e.key === "Enter" && e.ctrlKey) {
        e.preventDefault();
        onSend?.();
      }
    };

    return (
      <div className={cn(baseClasses, glassClasses, s.round, s.container, className)}>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-transparent via-white/5 to-white/20 opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/30 to-transparent opacity-50 pointer-events-none" />

        <div className={cn("relative z-10 flex items-center", s.gap)}>
          {prefixIcon && <div className="text-white/70 flex items-center pl-1">{prefixIcon}</div>}
          {multiline ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              className={cn("flex-1 bg-transparent outline-none text-white placeholder:text-white/60 resize-none", s.field)}
              rows={3}
              onKeyDown={handleKeyDown}
              {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              className={cn("flex-1 bg-transparent outline-none text-white placeholder:text-white/60", s.field)}
              onKeyDown={handleKeyDown}
              {...props}
            />
          )}

          {onSend && (
            <button
              type="button"
              onClick={onSend}
              className={cn(
                "font-medium text-white/90 hover:text-white transition-colors border border-white/30 hover:border-white/50",
                "bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl",
                s.btn
              )}
              aria-label={sendLabel}
            >
              {sendLabel}
            </button>
          )}
        </div>
      </div>
    );
  }
);

GlassPromptInput.displayName = "GlassPromptInput";`;

  const usageCode = `import { GlassPromptInput } from "@/components/ui/glass-prompt-input";
import { Sparkles, Plus, Globe, MoreHorizontal } from "lucide-react";

export default function Example() {
  const [prompt, setPrompt] = React.useState("");
  return (
    <GlassPromptInput
      size="lg"
      layout="panel"
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      onSend={() => console.log("send:", prompt)}
      prefixIcon={<Sparkles className=\"w-4 h-4\" />}
      sendLabel="Send"
      placeholder="Message ChatGPT"
      actions={[
        { label: "", icon: <Plus className=\"w-4 h-4\" />, ariaLabel: "Add" },
        { label: "Search", icon: <Globe className=\"w-4 h-4\" /> },
        { label: "", icon: <MoreHorizontal className=\"w-4 h-4\" />, ariaLabel: "More" },
      ]}
    />
  );
}`;

  return (
    <ComponentPageLayout
      name="Prompt Input"
      description="An AI prompt input with glass effects, prefix icon, action buttons, and send functionality."
      preview={
        <div className="w-full max-w-md">
          <GlassPromptInput
            size="md"
            layout="panel"
            placeholder="Message ChatGPT"
            prefixIcon={<Sparkles className="w-4 h-4" />}
            onSend={() => {}}
            actions={[
              { label: "", icon: <Plus className="w-4 h-4" />, ariaLabel: "Add" },
              { label: "Search", icon: <Globe className="w-4 h-4" /> },
              { label: "", icon: <MoreHorizontal className="w-4 h-4" />, ariaLabel: "More" },
            ]}
            className="w-full"
          />
        </div>
      }
      features={[
        "Glass-styled text input with frosted backdrop",
        "Configurable prefix icon and action buttons",
        "Send button with onSend callback",
        "Panel and inline layout variants",
        "Compact mode for space-constrained UIs"
]}
      componentCode={componentCode}
      usageCode={usageCode}
    />
  );
}
