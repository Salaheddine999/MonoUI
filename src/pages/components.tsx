import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

// Import UI components for demonstration
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { LiquidGlassCard } from "@/components/ui/liquid-glass-card";
import { LiquidGlassInput } from "@/components/ui/liquid-glass-input";
import { LiquidGlassButtonGroup } from "@/components/ui/liquid-glass-button-group";
import { LiquidGlassMessage } from "@/components/ui/liquid-glass-message";
import { LiquidGlassToggle } from "@/components/ui/liquid-glass-toggle";
import { LiquidGlassPromptInput } from "@/components/ui/liquid-glass-prompt-input";
import { LiquidGlassMessageBubble } from "@/components/ui/liquid-glass-message-bubble";
import { LiquidGlassPromptToolbar } from "@/components/ui/liquid-glass-prompt-toolbar";
import { Sparkles, Plus, Globe, MoreHorizontal, Bot, User, Settings } from "lucide-react";
import { LiquidGlassMenu } from "@/components/ui/liquid-glass-menu";

export default function ComponentsPage() {
  const [, setLocation] = useLocation();

  const components = [
    {
      name: "Liquid Glass Button",
      description: "A premium button component with liquid glass effects.",
      component: (
        <div className="flex justify-center">
          <LiquidGlassButton size="md">Click on me</LiquidGlassButton>
        </div>
      ),
      route: "/liquid-glass-button",
    },
    {
      name: "Liquid Glass Card",
      description:
        "An elegant card component with sophisticated glass effects.",
      component: (
        <div className="flex justify-center">
          <LiquidGlassCard size="sm" className="w-48 h-24">
            <div className="text-center">
              <h3 className="text-sm font-semibold mb-1">Card Title</h3>
              <p className="text-xs text-white/80">Preview content</p>
            </div>
          </LiquidGlassCard>
        </div>
      ),
      route: "/liquid-glass-card",
    },
    {
      name: "Liquid Glass Input",
      description: "A beautiful input component with liquid glass styling.",
      component: (
        <div className="flex justify-center">
          <LiquidGlassInput
            size="sm"
            placeholder="Enter text..."
            className="w-48"
          />
        </div>
      ),
      route: "/liquid-glass-input",
    },
    {
      name: "Liquid Glass Button Group",
      description:
        "A container for grouping buttons with liquid glass styling.",
      component: (
        <div className="flex justify-center">
          <LiquidGlassButtonGroup size="sm" orientation="horizontal">
            <button className="px-3 py-1 text-xs font-medium text-white/70">
              Btn 1
            </button>
            <button className="px-3 py-1 text-xs font-medium text-white/70">
              Btn 2
            </button>
            <button className="px-3 py-1 text-xs font-medium text-white/70">
              Btn 3
            </button>
          </LiquidGlassButtonGroup>
        </div>
      ),
      route: "/liquid-glass-button-group",
    },
    {
      name: "Liquid Glass Message",
      description: "A notification component with liquid glass styling.",
      component: (
        <div className="flex justify-center">
          <LiquidGlassMessage variant="info" size="sm">
            <div className="text-xs">Sample message</div>
          </LiquidGlassMessage>
        </div>
      ),
      route: "/liquid-glass-message",
    },
    {
      name: "Liquid Glass Toggle",
      description: "A toggle switch with premium liquid glass effects.",
      component: (
        <div className="flex justify-center">
          <LiquidGlassToggle size="sm" />
        </div>
      ),
      route: "/liquid-glass-toggle",
    },
    {
      name: "Liquid Glass Menu",
      description: "A menu for navigation or grouped actions with liquid glass styling.",
      component: (
        <div className="flex justify-center">
          <LiquidGlassMenu
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
      route: "/liquid-glass-menu",
    },
  ];

  const promptComponents = [
    {
      name: "Liquid Glass Prompt Input",
      description: "An AI prompt input with glass effects, prefix icon, and send action.",
      component: (
        <div className="flex justify-center w-full">
          <div className="w-full max-w-sm">
            <LiquidGlassPromptInput
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
      route: "/liquid-glass-prompt-input",
    },
    {
      name: "Liquid Glass Message Bubble",
      description: "Chat message bubbles with glass effects for conversations.",
      component: (
        <div className="flex justify-center w-full">
          <div className="w-full max-w-sm space-y-2">
            <LiquidGlassMessageBubble
              sender="assistant"
              size="sm"
              avatar={<Bot className="w-3 h-3" />}
              compact
            >
              Hello! How can I help?
            </LiquidGlassMessageBubble>
          </div>
        </div>
      ),
      route: "/liquid-glass-message-bubble",
    },
    {
      name: "Liquid Glass Prompt Toolbar",
      description: "Configuration toolbar with model selector, temperature, and presets.",
      component: (
        <div className="flex justify-center w-full">
          <div className="w-full max-w-lg">
            <LiquidGlassPromptToolbar
              compact
              className="w-full"
            />
          </div>
        </div>
      ),
      route: "/liquid-glass-prompt-toolbar",
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
