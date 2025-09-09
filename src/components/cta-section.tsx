import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Github } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function CTASection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative py-24 px-4">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <Card
          className="glass-orange rounded-3xl border-border/20"
          data-testid="cta-card"
        >
          <CardContent className="p-12 md:p-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Build the <span className="gradient-text">Future</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already building stunning
              applications with Mono UI. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button
                className="bg-gradient-to-r from-primary to-accent text-white rounded-xl px-8 py-6 font-semibold text-lg hover:scale-105 transition-all border-0"
                data-testid="button-try-now"
              >
                Discover components
              </Button>
              <Button
                variant="outline"
                className="glass rounded-xl px-8 py-6 font-semibold text-lg hover:scale-105 transition-all border-border/20"
                data-testid="button-github"
              >
                <Github className="mr-3" size={20} />
                View on GitHub
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              Free forever • No credit card required • MIT License
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
