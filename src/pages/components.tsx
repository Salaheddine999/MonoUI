import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

// Import UI components for demonstration
import { Button as ButtonComponent } from "@/components/ui/button";

export default function ComponentsPage() {
  const [, setLocation] = useLocation();

  const components = [
    {
      name: "Liquid Glass Button",
      description: "A premium button component with liquid glass effects.",
      component: (
        <div className="flex justify-center">
          <ButtonComponent className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/30 text-white font-medium px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-white/20">
            Click on me
          </ButtonComponent>
        </div>
      ),
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
                  className="glass rounded-2xl border-border/20 hover:border-border/40 group h-full flex flex-col transition-all duration-300 hover:scale-105"
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
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
