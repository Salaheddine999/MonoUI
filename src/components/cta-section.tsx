import { useRef, useEffect } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { useLocation } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-6 md:px-12 border-t border-border/20"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={contentRef} className="grid md:grid-cols-2 gap-16 items-end">
          {/* Left — Headline */}
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary block mb-4">
              04 / Get Started
            </span>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9]">
              READY TO
              <br />
              BUILD?
            </h2>
          </div>

          {/* Right — Description + Actions */}
          <div>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-8">
              Browse the component library, pick what you need, copy the code
              into your React project. Every component is fully customizable
              with TypeScript and Tailwind CSS.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="group inline-flex items-center justify-center gap-3 bg-primary px-8 py-4 font-mono text-xs uppercase tracking-widest text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                data-testid="button-try-now"
                onClick={() => setLocation("/components")}
              >
                Browse Components
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
              <a
                href="https://github.com/Salaheddine999/MonoUI"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-3 border border-border/40 px-8 py-4 font-mono text-xs uppercase tracking-widest text-foreground hover:border-foreground/40 transition-all duration-200"
                data-testid="button-github"
              >
                <Github size={14} />
                Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
