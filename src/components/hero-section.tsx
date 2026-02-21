import { useEffect, useRef } from "react";
import {
  Layers,
  Copy,
  Smartphone,
  ArrowUpRight,
} from "lucide-react";
import { useLocation } from "wouter";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
} from "react-icons/si";
import {
  SplitFlapText,
  SplitFlapMuteToggle,
  SplitFlapAudioProvider,
} from "@/components/split-flap-text";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const [, setLocation] = useLocation();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Only parallax the top text content, not Built With or feature cards
      gsap.to(contentRef.current, {
        y: -80,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "50% top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const techStack = [
    { icon: SiReact, name: "React" },
    { icon: SiTypescript, name: "TypeScript" },
    { icon: SiTailwindcss, name: "Tailwind" },
    { icon: SiFramer, name: "Framer Motion" },
  ];

  const features = [
    {
      icon: Layers,
      title: "Glass Effects",
      description:
        "Ready-made glassmorphism components — cards, buttons, inputs, loaders, and more",
      testId: "card-glass-effects",
    },
    {
      icon: Copy,
      title: "Copy & Paste",
      description:
        "Drop into your project instantly. No complex setup, no dependencies hell",
      testId: "card-copy-paste",
    },
    {
      icon: Smartphone,
      title: "Fully Responsive",
      description:
        "Every component adapts beautifully from mobile to 4K displays",
      testId: "card-fully-responsive",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 pb-12"
    >
      {/* Left vertical label */}
      <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 hidden md:block">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground -rotate-90 origin-left block whitespace-nowrap">
          Vol. 01 — Est. 2025
        </span>
      </div>

      <div ref={contentRef} className="w-full max-w-7xl mx-auto">
        {/* Split-Flap Headline */}
        <SplitFlapAudioProvider>
          <div className="relative">
            <SplitFlapText text="MONO UI" speed={80} />
            <div className="mt-4">
              <SplitFlapMuteToggle />
            </div>
          </div>
        </SplitFlapAudioProvider>

        <h2 className="font-display text-muted-foreground/50 text-[clamp(1rem,3vw,2rem)] mt-4 tracking-wide">
          Glassmorphism Component Library for React
        </h2>

        <p className="mt-12 max-w-lg font-mono text-sm text-muted-foreground leading-relaxed">
          A curated collection of glass-effect UI components — frosted cards,
          translucent buttons, blurred inputs, and more. Copy, paste, customize.
          Ship beautiful interfaces without the guesswork.
        </p>

        {/* CTA Buttons */}
        <div className="mt-16 flex items-center gap-8">
          <button
            className="group inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground hover:border-primary hover:text-primary transition-all duration-200"
            data-testid="button-start-building"
            onClick={() => setLocation("/components")}
          >
            Browse Components
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
          <a
            href="#experience"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            See Examples
          </a>
        </div>
      </div>

      {/* Built With + Feature Cards — never fades */}
      <div className="w-full max-w-7xl mx-auto mt-20">
        {/* Tech Stack */}
        <div className="pt-8 border-t border-border/20 mb-0">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/60 block mb-5">
            Built With
          </span>
          <div className="flex flex-wrap items-center gap-8 mb-16">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2.5 text-muted-foreground/40 hover:text-muted-foreground transition-colors duration-200"
              >
                <tech.icon size={16} />
                <span className="font-mono text-[10px] uppercase tracking-widest">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-border/20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-background p-8 border border-border/20 hover:border-primary/40 transition-all duration-500"
                data-testid={feature.testId}
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/30 absolute top-4 right-4">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="w-10 h-10 border border-border/30 flex items-center justify-center mb-6 group-hover:border-primary/50 transition-colors duration-300">
                  <Icon
                    className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
                    size={18}
                  />
                </div>

                <h3 className="font-display text-xl tracking-tight mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title.toUpperCase()}
                </h3>

                <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                <div className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
