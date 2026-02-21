import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

// Import UI components for preview
import { GlassButton } from "@/components/ui/glass-button";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassInput } from "@/components/ui/glass-input";
import { GlassButtonGroup } from "@/components/ui/glass-button-group";
import { GlassMessage } from "@/components/ui/glass-message";
import { GlassToggle } from "@/components/ui/glass-toggle";
import { GlassPromptInput } from "@/components/ui/glass-prompt-input";
import { GlassMessageBubble } from "@/components/ui/glass-message-bubble";
import { GlassPromptToolbar } from "@/components/ui/glass-prompt-toolbar";
import { GlassPromptSuggestions } from "@/components/ui/glass-prompt-suggestions";
import {
  Sparkles,
  Plus,
  Globe,
  MoreHorizontal,
  Bot,
  Settings,
} from "lucide-react";
import { GlassMenu } from "@/components/ui/glass-menu";
import { GlassVoiceAssistant } from "@/components/ui/glass-voice-assistant";
import { GlassThemeToggle } from "@/components/ui/glass-theme-toggle";
import { GlassSocialButtons } from "@/components/ui/glass-social-buttons";
import { GlassCopyEmailButton } from "@/components/ui/glass-copy-email-button";
import { GlassWaitlistForm } from "@/components/ui/glass-waitlist-form";
import { GlassLoader } from "@/components/ui/glass-loader";

export default function ComponentsPage() {
  const [, setLocation] = useLocation();

  const allComponents = [
    {
      name: "Button",
      category: "Core",
      component: (
        <GlassButton size="md">Click on me</GlassButton>
      ),
      route: "/components/glass-button",
    },
    {
      name: "Card",
      category: "Core",
      component: (
        <GlassCard size="sm" className="w-44 h-20">
          <div className="text-center relative z-10">
            <h3 className="text-sm font-semibold mb-1">Card Title</h3>
            <p className="text-xs text-white/80">Preview content</p>
          </div>
        </GlassCard>
      ),
      route: "/components/glass-card",
    },
    {
      name: "Input",
      category: "Core",
      component: (
        <GlassInput size="sm" placeholder="Enter text..." className="w-48" />
      ),
      route: "/components/glass-input",
    },
    {
      name: "Toggle",
      category: "Core",
      component: <GlassToggle size="sm" />,
      route: "/components/glass-toggle",
    },
    {
      name: "Button Group",
      category: "Core",
      component: (
        <GlassButtonGroup size="sm" orientation="horizontal">
          <button className="px-3 py-1 text-xs font-medium text-white/70">
            Btn 1
          </button>
          <button className="px-3 py-1 text-xs font-medium text-white/70">
            Btn 2
          </button>
          <button className="px-3 py-1 text-xs font-medium text-white/70">
            Btn 3
          </button>
        </GlassButtonGroup>
      ),
      route: "/components/glass-button-group",
    },
    {
      name: "Menu",
      category: "Core",
      component: (
        <GlassMenu
          items={[
            { key: "home", label: "Home" },
            { key: "search", label: "Search" },
            { key: "profile", label: "Profile" },
          ]}
          activeKey={"home"}
          size="sm"
        />
      ),
      route: "/components/glass-menu",
    },
    {
      name: "Message",
      category: "Core",
      component: (
        <GlassMessage variant="info" size="sm">
          <div className="text-xs">Sample message</div>
        </GlassMessage>
      ),
      route: "/components/glass-message",
    },
    {
      name: "Loader",
      category: "Core",
      component: <GlassLoader size="sm" variant="spinner" />,
      route: "/components/glass-loader",
    },
    {
      name: "Theme Toggle",
      category: "Utility",
      component: <GlassThemeToggle size="sm" />,
      route: "/components/glass-theme-toggle",
    },
    {
      name: "Social Buttons",
      category: "Utility",
      component: <GlassSocialButtons size="sm" className="scale-90" />,
      route: "/components/glass-social-buttons",
    },
    {
      name: "Copy Email",
      category: "Utility",
      component: (
        <span className="scale-90 inline-block">
          <GlassCopyEmailButton email="hello@monoui.dev" size="sm" />
        </span>
      ),
      route: "/components/glass-copy-email-button",
    },
    {
      name: "Waitlist Form",
      category: "Utility",
      component: (
        <div className="w-full max-w-xs">
          <GlassWaitlistForm
            size="sm"
            className="scale-90"
            onSubmit={async (email) => {
              console.log("Preview:", email);
              await new Promise((r) => setTimeout(r, 500));
            }}
          />
        </div>
      ),
      route: "/components/glass-waitlist-form",
    },
    {
      name: "Prompt Input",
      category: "AI",
      component: (
        <div className="w-full max-w-sm">
          <GlassPromptInput
            size="sm"
            layout="panel"
            placeholder="Message ChatGPT"
            prefixIcon={<Sparkles className="w-4 h-4" />}
            onSend={() => {}}
            compact
            actions={[
              {
                label: "",
                icon: <Plus className="w-4 h-4" />,
                ariaLabel: "Add",
              },
              {
                label: "Search",
                icon: <Globe className="w-4 h-4" />,
              },
              {
                label: "",
                icon: <MoreHorizontal className="w-4 h-4" />,
                ariaLabel: "More",
              },
            ]}
            className="w-full"
          />
        </div>
      ),
      route: "/components/glass-prompt-input",
    },
    {
      name: "Message Bubble",
      category: "AI",
      component: (
        <div className="w-full max-w-sm">
          <GlassMessageBubble
            sender="assistant"
            size="sm"
            avatar={<Bot className="w-3 h-3" />}
            compact
          >
            Hello! How can I help?
          </GlassMessageBubble>
        </div>
      ),
      route: "/components/glass-message-bubble",
    },
    {
      name: "Prompt Toolbar",
      category: "AI",
      component: (
        <div className="w-full max-w-lg">
          <GlassPromptToolbar compact className="w-full" />
        </div>
      ),
      route: "/components/glass-prompt-toolbar",
    },
    {
      name: "Prompt Suggestions",
      category: "AI",
      component: (
        <div className="w-full max-w-lg">
          <GlassPromptSuggestions
            size="sm"
            layout="chips"
            compact
            suggestions={[
              {
                label: "Summarize",
                icon: <Sparkles className="w-3 h-3" />,
              },
              {
                label: "Improve",
                icon: <Settings className="w-3 h-3" />,
              },
            ]}
          />
        </div>
      ),
      route: "/components/glass-prompt-suggestions",
    },
    {
      name: "Voice Assistant",
      category: "AI",
      component: (
        <div className="w-full max-w-[200px]">
          <GlassVoiceAssistant
            size="sm"
            layout="panel"
            title="MonoUI"
            showHeader
            showPrompt={false}
            indicator="bars"
            statusIdleLabel="Ready"
            statusListeningLabel="Listening…"
            compact
          />
        </div>
      ),
      route: "/components/glass-voice-assistant",
    },
  ];

  const categories = ["Core", "Utility", "AI"];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navigation />

      <div className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary block mb-4">
              Library
            </span>
            <h1 className="font-display text-5xl md:text-7xl tracking-tight mb-6">
              COMPONENTS
            </h1>
            <p className="max-w-lg font-mono text-sm text-muted-foreground leading-relaxed">
              Browse the full collection. Click any component to see usage,
              source code, and live demos.
            </p>
          </div>

          {/* Category groups */}
          {categories.map((category) => {
            const items = allComponents.filter(
              (c) => c.category === category
            );
            return (
              <div key={category} className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50">
                    {category}
                  </span>
                  <div className="flex-1 h-px bg-border/20" />
                  <span className="font-mono text-[9px] text-muted-foreground/30">
                    {items.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/15">
                  {items.map((comp) => (
                    <article
                      key={comp.name}
                      onClick={() => setLocation(comp.route)}
                      className="group relative bg-background border border-border/15 cursor-pointer hover:border-primary/40 transition-all duration-500"
                    >
                      {/* Preview area */}
                      <div className="h-40 flex items-center justify-center p-6 overflow-hidden">
                        {comp.component}
                      </div>

                      {/* Info bar */}
                      <div className="px-5 py-4 border-t border-border/15 flex items-center justify-between">
                        <span className="font-mono text-xs text-foreground/80 group-hover:text-primary transition-colors duration-300">
                          {comp.name}
                        </span>
                        <ArrowUpRight
                          size={12}
                          className="text-muted-foreground/30 group-hover:text-primary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </div>

                      {/* Bottom accent line */}
                      <div className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-500" />
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
