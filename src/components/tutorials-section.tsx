import { useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TutorialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (contentRef.current) {
        gsap.from(contentRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tutorials"
      className="relative py-20 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 flex items-end justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              03 / Learn
            </span>
            <h2 className="mt-4 font-display text-5xl md:text-7xl tracking-tight">
              TUTORIALS
            </h2>
          </div>
          <p className="hidden md:block max-w-xs font-mono text-xs text-muted-foreground text-right leading-relaxed">
            Step-by-step guides on building glass-effect interfaces with Mono UI.
          </p>
        </div>

        {/* Split content */}
        <div
          ref={contentRef}
          className="grid md:grid-cols-2 gap-px bg-border/20"
        >
          {/* YouTube Section */}
          <div className="bg-background border border-border/20 p-8 md:p-12">
            <div className="mb-8">
              <div className="w-16 h-16 border border-[#FF0000]/20 flex items-center justify-center mb-6">
                <svg
                  className="text-[#FF0000]"
                  style={{ width: "28px", height: "28px" }}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
              <h3 className="font-display text-3xl tracking-tight mb-4">
                VIDEO SERIES
              </h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-8">
                Coming soon — comprehensive video tutorials covering every glass
                component, from basic usage to advanced customization.
              </p>
              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border border-[#FF0000]/30 px-6 py-3 font-mono text-xs uppercase tracking-widest text-[#FF0000] hover:bg-[#FF0000]/10 transition-all duration-200"
              >
                Subscribe
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </div>

          {/* Topics List */}
          <div className="bg-background border border-border/20 p-8 md:p-12">
            <h3 className="font-display text-3xl tracking-tight mb-8">
              UPCOMING TOPICS
            </h3>
            <div className="space-y-0">
              {[
                { num: "01", title: "Getting Started with Glass Effects" },
                { num: "02", title: "Building a Glassmorphism Dashboard" },
                { num: "03", title: "Custom Themes & Color Schemes" },
                { num: "04", title: "Animation & Micro-interactions" },
                { num: "05", title: "Accessibility in Glass Design" },
              ].map((topic) => (
                <div
                  key={topic.num}
                  className="flex items-center gap-4 py-3 border-b border-border/10 last:border-0 group cursor-default"
                >
                  <span className="font-mono text-[10px] text-muted-foreground/30 group-hover:text-primary transition-colors duration-200">
                    {topic.num}
                  </span>
                  <span className="font-mono text-xs text-foreground/80 group-hover:text-foreground transition-colors duration-200">
                    {topic.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
