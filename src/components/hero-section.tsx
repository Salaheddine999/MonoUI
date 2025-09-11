import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Rocket,
  Play,
  Palette,
  Code,
  Smartphone,
  Tag,
  PartyPopper,
} from "lucide-react";
import {
  SiHtml5,
  SiReact,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiCss3,
  SiFigma,
  SiVercel,
} from "react-icons/si";
import { useState, useEffect } from "react";
import styles from "./hero-section.module.css";

export default function HeroSection() {
  const [currentLogoSet, setCurrentLogoSet] = useState(0);

  const logoSets = [
    [
      { icon: SiHtml5, name: "html", testId: "logo-html" },
      { icon: SiReact, name: "react", testId: "logo-react" },
      { icon: SiJavascript, name: "javascript", testId: "logo-javascript" },
      { icon: SiTypescript, name: "typescript", testId: "logo-typescript" },
    ],
    [
      { icon: SiTailwindcss, name: "tailwind", testId: "logo-tailwind" },
      { icon: SiCss3, name: "css", testId: "logo-css" },
      { icon: SiFigma, name: "figma", testId: "logo-figma" },
      { icon: SiVercel, name: "vercel", testId: "logo-vercel" },
    ],
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoSet((prev) => (prev + 1) % logoSets.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [logoSets.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-36 pb-20">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center rounded-full px-6 py-2 mb-2">
            <div className="rounded-full inline-flex items-center justify-center duration-1000 delay-1000">
              <div className="p-0.5 rounded-full relative overflow-hidden bg-muted inline-block">
                <div className="card-wrapper h-full w-full relative z-[2]">
                  <div className="relative h-full rounded-full">
                    <div className="bg-muted rounded-full inline-flex items-center justify-center text-sm px-8 py-2 text-white text-center whitespace-nowrap gap-2">
                      <PartyPopper className="w-4 h-4" />
                      Introducing Mono UI v1.0
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-relaxed">
          Design Seamless
          <br />
          <span className="gradient-text">Interfaces That Truly Connect</span>
        </h1>

        <p className="text-md text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Discover how to craft intuitive, beautiful designs that feel
          effortless to use. You’ll gain the skills to create interfaces that
          delight users, build trust, and keep them coming back.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <Button
            className="glassmorphism-button text-white font-medium text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-6 rounded-2xl transition-all duration-300 w-full sm:w-auto"
            data-testid="button-start-building"
          >
            <Rocket size={20} />
            Start Building Now
          </Button>
        </div>

        {/* Technology Logos */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-8 max-w-4xl mx-auto h-16">
            {logoSets[currentLogoSet].map((logo, index) => {
              const IconComponent = logo.icon;
              return (
                <div
                  key={`${currentLogoSet}-${index}`}
                  className="flex items-center justify-center w-12 h-12 text-muted-foreground/60 hover:text-muted-foreground transition-all duration-1000 animate-in fade-in-0 slide-in-from-bottom-4"
                  data-testid={logo.testId}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationDuration: "1000ms",
                  }}
                >
                  <IconComponent size={32} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Hero Demo Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card
            className="glass rounded-2xl border-border/20 card-hover"
            data-testid="card-beautiful-design"
          >
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Palette className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Beautiful Design</h3>
              <p className="text-muted-foreground text-sm">
                Stunning glassmorphism effects that captivate users
              </p>
            </CardContent>
          </Card>

          <Card
            className="glass rounded-2xl border-border/20 card-hover"
            data-testid="card-developer-friendly"
          >
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Code className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Copy & Paste Ready</h3>
              <p className="text-muted-foreground text-sm">
                Clean, copy-paste code with comprehensive documentation
              </p>
            </CardContent>
          </Card>

          <Card
            className="glass rounded-2xl border-border/20 card-hover"
            data-testid="card-fully-responsive"
          >
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Smartphone className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fully Responsive</h3>
              <p className="text-muted-foreground text-sm">
                Perfect on desktop, tablet, and mobile devices
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
