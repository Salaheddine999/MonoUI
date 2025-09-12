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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/components" component={Components} />
      <Route
        path="/components/liquid-glass-button"
        component={LiquidGlassButtonPage}
      />
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
        path="/liquid-glass-prompt-input"
        component={LiquidGlassPromptInputPage}
      />
      <Route
        path="/liquid-glass-message-bubble"
        component={LiquidGlassMessageBubblePage}
      />
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
