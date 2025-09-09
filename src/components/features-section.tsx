import { Card, CardContent } from "@/components/ui/card";
import { Wand2, Puzzle, Shield, Paintbrush, Rocket, GitBranch, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function FeaturesSection() {
  const { ref, isVisible } = useScrollAnimation();
  
  const features = [
    {
      icon: Wand2,
      title: "Glassmorphism Effects",
      description: "Beautiful frosted glass effects with backdrop blur and transparency for modern UI design.",
      testId: "feature-glassmorphism"
    },
    {
      icon: Puzzle,
      title: "Modular Components",
      description: "Flexible, reusable components that work seamlessly together in any React application.",
      testId: "feature-modular"
    },
    {
      icon: Shield,
      title: "Accessibility First",
      description: "WCAG compliant components with keyboard navigation and screen reader support built-in.",
      testId: "feature-accessibility"
    },
    {
      icon: Paintbrush,
      title: "Theme Customization",
      description: "Easily customize colors, typography, and spacing to match your brand identity.",
      testId: "feature-theming"
    },
    {
      icon: Rocket,
      title: "Performance Optimized",
      description: "Lightweight, tree-shakeable components with optimal bundle size and runtime performance.",
      testId: "feature-performance"
    },
    {
      icon: GitBranch,
      title: "TypeScript Support",
      description: "Full TypeScript support with comprehensive type definitions for better developer experience.",
      testId: "feature-typescript"
    }
  ];

  return (
    <section id="features" className="relative py-24 px-4">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build modern, accessible, and beautiful React applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index}
                className="glass rounded-3xl border-border/20 hover:glass-orange card-hover group cursor-pointer"
                data-testid={feature.testId}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6">{feature.description}</p>
                  <div className="text-primary font-semibold flex items-center">
                    Learn More <ArrowRight className="ml-2" size={16} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
