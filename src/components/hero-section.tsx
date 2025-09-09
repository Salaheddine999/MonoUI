import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Play, Palette, Code, Smartphone } from "lucide-react";
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
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-32">
      <div className="max-w-6xl mx-auto text-center">
        <div className="animate-float mb-8">
          <div className="inline-flex items-center glass rounded-full px-6 py-2 mb-8">
            <span className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></span>
            <span className="text-sm text-muted-foreground">
              Introducing Mono UI v1.0
            </span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
          Design Seamless
          <br />
          <span className="gradient-text">Interfaces That Truly Connect</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Discover how to craft intuitive, beautiful designs that feel
          effortless to use. You’ll gain the skills to create interfaces that
          delight users, build trust, and keep them coming back.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <Button
            className="glass-orange rounded-2xl px-8 py-6 font-semibold text-lg hover:scale-105 transition-all animate-glow"
            data-testid="button-start-building"
          >
            <Rocket className="mr-3" size={20} />
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
              <h3 className="text-lg font-semibold mb-2">Developer Friendly</h3>
              <p className="text-muted-foreground text-sm">
                Clean APIs and comprehensive documentation
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
