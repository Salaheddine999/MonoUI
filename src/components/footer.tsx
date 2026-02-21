import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const columns = gridRef.current.querySelectorAll(":scope > div");
        gsap.from(columns, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="relative py-16 px-6 md:px-12 border-t border-border/30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Multi-column layout */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12"
        >
          {/* Stack */}
          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Stack
            </h4>
            <ul className="space-y-2">
              {["React", "TypeScript", "Tailwind CSS", "Vite"].map((item) => (
                <li
                  key={item}
                  className="font-mono text-xs text-foreground/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Typography */}
          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Typography
            </h4>
            <ul className="space-y-2">
              {["Bebas Neue", "Inter", "IBM Plex Mono"].map((item) => (
                <li
                  key={item}
                  className="font-mono text-xs text-foreground/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Design */}
          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Design
            </h4>
            <ul className="space-y-2">
              {["Glassmorphism", "Editorial", "Dark Mode"].map((item) => (
                <li
                  key={item}
                  className="font-mono text-xs text-foreground/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/Salaheddine999/MonoUI"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-foreground/80 hover:text-primary transition-colors duration-200"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-foreground/80 hover:text-primary transition-colors duration-200"
                >
                  Twitter/X
                </a>
              </li>
            </ul>
          </div>

          {/* Year */}
          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Year
            </h4>
            <ul className="space-y-2">
              <li className="font-mono text-xs text-foreground/80">
                {new Date().getFullYear()}
              </li>
              <li className="font-mono text-xs text-foreground/80">Ongoing</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          ref={footerRef}
          className="mt-20 pt-8 border-t border-border/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            © {new Date().getFullYear()} Mono UI. All rights reserved.
          </p>
          <p className="font-mono text-[10px] text-muted-foreground">
            Crafted with glass. Built with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
