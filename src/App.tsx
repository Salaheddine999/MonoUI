import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Components from "@/pages/components";
import GlassButtonPage from "@/pages/glass-button";
import GlassCardPage from "@/pages/glass-card";
import GlassInputPage from "@/pages/glass-input";
import GlassButtonGroupPage from "@/pages/glass-button-group";
import GlassMessagePage from "@/pages/glass-message";
import NotFound from "@/pages/not-found";
import GlassTogglePage from "@/pages/glass-toggle";
import GlassPromptInputPage from "@/pages/glass-prompt-input";
import GlassMessageBubblePage from "@/pages/glass-message-bubble";
import GlassPromptToolbarPage from "@/pages/glass-prompt-toolbar";
import GlassMenuPage from "@/pages/glass-menu";
import GlassVoiceAssistantPage from "@/pages/glass-voice-assistant";
import GlassThemeTogglePage from "@/pages/glass-theme-toggle";
import GlassSocialButtonsPage from "@/pages/glass-social-buttons";
import GlassCopyEmailButtonPage from "@/pages/glass-copy-email-button";
import GlassWaitlistFormPage from "@/pages/glass-waitlist-form";
import GlassLoaderPage from "@/pages/glass-loader";
import GlassPromptSuggestionsPage from "@/pages/glass-prompt-suggestions";
import { Analytics } from '@vercel/analytics/react';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/components" component={Components} />
      <Route
        path="/components/glass-button"
        component={GlassButtonPage}
      />
      <Route path="/components/glass-card" component={GlassCardPage} />
      <Route path="/components/glass-input" component={GlassInputPage} />
      <Route
        path="/components/glass-button-group"
        component={GlassButtonGroupPage}
      />
      <Route path="/components/glass-message" component={GlassMessagePage} />
      <Route path="/components/glass-toggle" component={GlassTogglePage} />
      <Route
        path="/components/glass-theme-toggle"
        component={GlassThemeTogglePage}
      />
      <Route
        path="/components/glass-social-buttons"
        component={GlassSocialButtonsPage}
      />
      <Route
        path="/components/glass-copy-email-button"
        component={GlassCopyEmailButtonPage}
      />
      <Route
        path="/components/glass-waitlist-form"
        component={GlassWaitlistFormPage}
      />
      <Route
        path="/components/glass-loader"
        component={GlassLoaderPage}
      />
      <Route
        path="/components/glass-prompt-input"
        component={GlassPromptInputPage}
      />
      <Route
        path="/components/glass-message-bubble"
        component={GlassMessageBubblePage}
      />
      <Route
        path="/components/glass-prompt-toolbar"
        component={GlassPromptToolbarPage}
      />
      <Route
        path="/components/glass-prompt-suggestions"
        component={GlassPromptSuggestionsPage}
      />
      <Route
        path="/components/glass-voice-assistant"
        component={GlassVoiceAssistantPage}
      />
      <Route path="/components/glass-menu" component={GlassMenuPage} />
      <Route path="/glass-button" component={GlassButtonPage} />
      <Route path="/glass-card" component={GlassCardPage} />
      <Route path="/glass-input" component={GlassInputPage} />
      <Route
        path="/glass-button-group"
        component={GlassButtonGroupPage}
      />
      <Route path="/glass-message" component={GlassMessagePage} />
      <Route path="/glass-toggle" component={GlassTogglePage} />
      <Route
        path="/glass-theme-toggle"
        component={GlassThemeTogglePage}
      />
      <Route
        path="/glass-social-buttons"
        component={GlassSocialButtonsPage}
      />
      <Route
        path="/glass-copy-email-button"
        component={GlassCopyEmailButtonPage}
      />
      <Route
        path="/glass-waitlist-form"
        component={GlassWaitlistFormPage}
      />
      <Route path="/glass-loader" component={GlassLoaderPage} />
      <Route
        path="/glass-prompt-input"
        component={GlassPromptInputPage}
      />
      <Route
        path="/glass-message-bubble"
        component={GlassMessageBubblePage}
      />
      <Route
        path="/glass-prompt-toolbar"
        component={GlassPromptToolbarPage}
      />
      <Route
        path="/glass-prompt-suggestions"
        component={GlassPromptSuggestionsPage}
      />
      <Route path="/glass-menu" component={GlassMenuPage} />
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
        <Analytics />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
