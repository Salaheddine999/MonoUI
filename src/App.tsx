import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Components from "@/pages/components";
import LiquidGlassButtonPage from "@/pages/liquid-glass-button";
import LiquidGlassCardPage from "@/pages/liquid-glass-card";
import LiquidGlassInputPage from "@/pages/liquid-glass-input";
import LiquidGlassButtonGroupPage from "@/pages/liquid-glass-button-group";
import LiquidGlassMessagePage from "@/pages/liquid-glass-message";
import NotFound from "@/pages/not-found";
import LiquidGlassTogglePage from "@/pages/liquid-glass-toggle";
import LiquidGlassPromptInputPage from "@/pages/liquid-glass-prompt-input";
import LiquidGlassMessageBubblePage from "@/pages/liquid-glass-message-bubble";
import LiquidGlassPromptToolbarPage from "@/pages/liquid-glass-prompt-toolbar";
import LiquidGlassMenuPage from "@/pages/liquid-glass-menu";
import LiquidGlassVoiceAssistantPage from "@/pages/liquid-glass-voice-assistant";
import LiquidGlassThemeTogglePage from "@/pages/liquid-glass-theme-toggle";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/components" component={Components} />
      <Route
        path="/components/liquid-glass-button"
        component={LiquidGlassButtonPage}
      />
      <Route path="/components/liquid-glass-card" component={LiquidGlassCardPage} />
      <Route path="/components/liquid-glass-input" component={LiquidGlassInputPage} />
      <Route
        path="/components/liquid-glass-button-group"
        component={LiquidGlassButtonGroupPage}
      />
      <Route path="/components/liquid-glass-message" component={LiquidGlassMessagePage} />
      <Route path="/components/liquid-glass-toggle" component={LiquidGlassTogglePage} />
      <Route
        path="/components/liquid-glass-theme-toggle"
        component={LiquidGlassThemeTogglePage}
      />
      <Route
        path="/components/liquid-glass-prompt-input"
        component={LiquidGlassPromptInputPage}
      />
      <Route
        path="/components/liquid-glass-message-bubble"
        component={LiquidGlassMessageBubblePage}
      />
      <Route
        path="/components/liquid-glass-prompt-toolbar"
        component={LiquidGlassPromptToolbarPage}
      />
      <Route
        path="/components/liquid-glass-voice-assistant"
        component={LiquidGlassVoiceAssistantPage}
      />
      <Route path="/components/liquid-glass-menu" component={LiquidGlassMenuPage} />
      <Route path="/liquid-glass-button" component={LiquidGlassButtonPage} />
      <Route path="/liquid-glass-card" component={LiquidGlassCardPage} />
      <Route path="/liquid-glass-input" component={LiquidGlassInputPage} />
      <Route
        path="/liquid-glass-button-group"
        component={LiquidGlassButtonGroupPage}
      />
      <Route path="/liquid-glass-message" component={LiquidGlassMessagePage} />
      <Route path="/liquid-glass-toggle" component={LiquidGlassTogglePage} />
      <Route
        path="/liquid-glass-theme-toggle"
        component={LiquidGlassThemeTogglePage}
      />
      <Route
        path="/liquid-glass-prompt-input"
        component={LiquidGlassPromptInputPage}
      />
      <Route
        path="/liquid-glass-message-bubble"
        component={LiquidGlassMessageBubblePage}
      />
      <Route
        path="/liquid-glass-prompt-toolbar"
        component={LiquidGlassPromptToolbarPage}
      />
      <Route path="/liquid-glass-menu" component={LiquidGlassMenuPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
