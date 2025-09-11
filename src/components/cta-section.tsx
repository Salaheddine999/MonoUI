import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Github, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLocation } from "wouter";

export default function CTASection() {
  const { ref, isVisible } = useScrollAnimation();
  const [, setLocation] = useLocation();

  return (
    <section className="relative py-20 px-4">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Start Building <span className="gradient-text">Now</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Copy, paste, and customize our components to build beautiful,
          consistent user interfaces in minutes, not hours.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-xl px-8 py-6 font-medium text-base border-0 shadow-lg duration-300"
            data-testid="button-try-now"
            onClick={() => setLocation("/components")}
          >
            <div className="flex items-center gap-2">
              Browse Components
              <ArrowRight className="w-4 h-4" />
            </div>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="glass rounded-xl px-8 py-6 font-medium text-base border-border/20 hover:border-primary/50 transition-all duration-300"
            data-testid="button-github"
          >
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4" />
              View on GitHub
            </div>
          </Button>
        </div>
      </div>
    </section>
  );
}
