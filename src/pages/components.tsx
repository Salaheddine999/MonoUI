import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

// Import UI components for demonstration
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
import { Sparkles, Plus, Globe, MoreHorizontal, Bot, User, Settings } from "lucide-react";
import { GlassMenu } from "@/components/ui/glass-menu";
import { GlassVoiceAssistant } from "@/components/ui/glass-voice-assistant";
import { GlassThemeToggle } from "@/components/ui/glass-theme-toggle";
import { GlassSocialButtons } from "@/components/ui/glass-social-buttons";
import { GlassCopyEmailButton } from "@/components/ui/glass-copy-email-button";
import { GlassWaitlistForm } from "@/components/ui/glass-waitlist-form";
import { GlassLoader } from "@/components/ui/glass-loader";

export default function ComponentsPage() {
  const [, setLocation] = useLocation();

  const components = [
    {
      name: "Button",
      description: "A premium button component with glass effects.",
      component: (
        <div className="flex justify-center">
          <GlassButton size="md">Click on me</GlassButton>
        </div>
      ),
      route: "/components/glass-button",
    },
    {
      name: "Card",
      description:
        "An elegant card component with sophisticated glass effects.",
      component: (
        <div className="flex justify-center">
          <GlassCard size="sm" className="w-48 h-24">
            <div className="text-center">
              <h3 className="text-sm font-semibold mb-1">Card Title</h3>
              <p className="text-xs text-white/80">Preview content</p>
            </div>
          </GlassCard>
        </div>
      ),
      route: "/components/glass-card",
    },
    {
      name: "Input",
      description: "A beautiful input component with glass styling.",
      component: (
        <div className="flex justify-center">
          <GlassInput
            size="sm"
            placeholder="Enter text..."
            className="w-48"
          />
        </div>
      ),
      route: "/components/glass-input",
    },
    {
      name: "Button Group",
      description:
        "A container for grouping buttons with glass styling.",
      component: (
        <div className="flex justify-center">
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
        </div>
      ),
      route: "/components/glass-button-group",
    },
    {
      name: "Message",
      description: "A notification component with glass styling.",
      component: (
        <div className="flex justify-center">
          <GlassMessage variant="info" size="sm">
            <div className="text-xs">Sample message</div>
          </GlassMessage>
        </div>
      ),
      route: "/components/glass-message",
    },
    {
      name: "Toggle",
      description: "A toggle switch with premium glass effects.",
      component: (
        <div className="flex justify-center">
          <GlassToggle size="sm" />
        </div>
      ),
      route: "/components/glass-toggle",
    },
    {
      name: "Menu",
      description: "A menu for navigation or grouped actions with glass styling.",
      component: (
        <div className="flex justify-center">
          <GlassMenu
            items={[
              { key: "home", label: "Home" },
              { key: "search", label: "Search" },
              { key: "profile", label: "Profile" },
            ]}
            activeKey={"home"}
            size="sm"
          />
        </div>
      ),
      route: "/components/glass-menu",
    },
    {
      name: "Theme Toggle",
      description: "A theme switcher that toggles Tailwind dark mode with glass styling.",
      component: (
        <div className="flex justify-center">
          <GlassThemeToggle size="sm" />
        </div>
      ),
      route: "/components/glass-theme-toggle",
    },
    {
      name: "Social Buttons",
      description: "GitHub, Google, and Facebook login buttons with glass styling.",
      component: (
        <div className="flex justify-center">
          <GlassSocialButtons size="sm" className="scale-90" />
        </div>
      ),
      route: "/components/glass-social-buttons",
    },
    {
      name: "Copy Email Button",
      description: "Button that displays an email and copies it with a delightful animation.",
      component: (
        <div className="flex justify-center">
          {/* Keep full email visible in preview */}
          <div className="max-w-full">
            <span className="scale-90 inline-block">
              {/* Using a representative email */}
              <GlassCopyEmailButton email="hello@monoui.dev" size="sm" />
            </span>
          </div>
        </div>
      ),
      route: "/components/glass-copy-email-button",
    },
    {
      name: "Waitlist Form",
      description: "Email collection form with animated submission states and glass styling.",
      component: (
        <div className="flex justify-center">
          <div className="w-full max-w-xs">
            <GlassWaitlistForm 
              size="sm" 
              className="scale-90"
              onSubmit={async (email) => {
                console.log("Preview submission:", email);
                await new Promise(resolve => setTimeout(resolve, 500));
              }}
            />
          </div>
        </div>
      ),
      route: "/components/glass-waitlist-form",
    },
    {
      name: "Loader",
      description: "Animated loading indicators with glass styling and multiple variants.",
      component: (
        <div className="flex justify-center">
          <GlassLoader size="sm" variant="spinner" />
        </div>
      ),
      route: "/components/glass-loader",
    },
  ];

  const promptComponents = [
    {
      name: "Prompt Input",
      description: "An AI prompt input with glass effects, prefix icon, and send action.",
      component: (
        <div className="flex justify-center w-full">
          <div className="w-full max-w-sm">
            <GlassPromptInput
              size="sm"
              layout="panel"
              placeholder="Message ChatGPT"
              prefixIcon={<Sparkles className="w-4 h-4" />}
              onSend={() => {}}
              compact
              actions={[
                { label: "", icon: <Plus className="w-4 h-4" />, ariaLabel: "Add" },
                { label: "Search", icon: <Globe className="w-4 h-4" /> },
                { label: "", icon: <MoreHorizontal className="w-4 h-4" />, ariaLabel: "More" },
              ]}
              className="w-full"
            />
          </div>
        </div>
      ),
      route: "/components/glass-prompt-input",
    },
    {
      name: "Voice Assistant",
      description: "A glassy, animated voice assistant with listening pulse and live waveform.",
      component: (
        <div className="flex justify-center w-full">
          <div className="w-full max-w-[220px]">
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
        </div>
      ),
      route: "/components/glass-voice-assistant",
    },
    {
      name: "Message Bubble",
      description: "Chat message bubbles with glass effects for conversations.",
      component: (
        <div className="flex justify-center w-full">
          <div className="w-full max-w-sm space-y-2">
            <GlassMessageBubble
              sender="assistant"
              size="sm"
              avatar={<Bot className="w-3 h-3" />}
              compact
            >
              Hello! How can I help?
            </GlassMessageBubble>
          </div>
        </div>
      ),
      route: "/components/glass-message-bubble",
    },
    {
      name: "Prompt Toolbar",
      description: "Configuration toolbar with model selector, temperature, and presets.",
      component: (
        <div className="flex justify-center w-full">
          <div className="w-full max-w-lg">
            <GlassPromptToolbar
              compact
              className="w-full"
            />
          </div>
        </div>
      ),
      route: "/components/glass-prompt-toolbar",
    },
    {
      name: "Prompt Suggestions",
      description: "Suggested prompts rendered as glass chips for quick actions.",
      component: (
        <div className="flex justify-center w-full">
          <div className="w-full max-w-lg">
            <GlassPromptSuggestions
              size="sm"
              layout="chips"
              compact
              suggestions={[
                { label: "Summarize this", icon: <Sparkles className="w-3 h-3" /> },
                { label: "Improve writing", icon: <Settings className="w-3 h-3" /> },
                { label: "Explain step-by-step", icon: <Sparkles className="w-3 h-3" /> },
              ]}
            />
          </div>
        </div>
      ),
      route: "/components/glass-prompt-suggestions",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-secondary to-background">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navigation />

        <div className="pt-40 pb-8 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-16 text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                UI <span className="gradient-text">Components</span>
              </h1>
              <p className="text-md text-muted-foreground max-w-2xl">
                Explore our comprehensive collection of reusable UI components.
                Each component is carefully crafted with accessibility and
                customization in mind.
              </p>
            </div>

            {/* Components Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {components.map((component, index) => (
                <Card
                  key={index}
                  className="glass rounded-2xl border-border/20 hover:border-border/40 group h-full flex flex-col transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => setLocation(component.route)}
                >
                  <CardContent className="p-6 flex-1 flex flex-col">
                    {/* Component Preview - Fixed Height */}
                    <div className="h-32 bg-muted/20 rounded-lg border border-border/20 flex items-center justify-center mb-4">
                      {component.component}
                    </div>

                    {/* Title and Description */}
                    <div className="flex-1 flex flex-col justify-end">
                      <CardTitle className="text-lg mb-2 font-medium tracking-normal">
                        {component.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {component.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Prompt UI Section */}
            <div className="mt-20">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 leading-tight">
                Prompt <span className="gradient-text">UI</span>
              </h2>
              <p className="text-md text-muted-foreground max-w-2xl mb-8">
                Components tailored for AI and chat experiences, with glass aesthetics and
                thoughtful interaction design.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {promptComponents.map((component, index) => (
                  <Card
                    key={`prompt-${index}`}
                    className="glass rounded-2xl border-border/20 hover:border-border/40 group h-full flex flex-col transition-all duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => setLocation(component.route)}
                  >
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="h-36 bg-muted/20 rounded-lg border border-border/20 flex items-center justify-center mb-4 px-4 overflow-visible relative z-10">
                        <div className="scale-[0.98] w-full relative z-20">
                          {component.component}
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-end">
                        <CardTitle className="text-lg mb-2 font-medium tracking-normal">
                          {component.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {component.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
