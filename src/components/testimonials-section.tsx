import { useRef, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Frontend Developer",
      company: "TechCorp",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=64&h=64",
      quote:
        "The glass components saved us weeks of work. Drop-in beautiful, and the code quality is exceptional.",
      testId: "testimonial-sarah",
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Developer",
      company: "StartupCo",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64",
      quote:
        "TypeScript support is incredible. Our team's productivity has increased significantly since switching to Mono UI.",
      testId: "testimonial-marcus",
    },
    {
      name: "Emma Thompson",
      role: "UX Engineer",
      company: "DesignLab",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64",
      quote:
        "Beautiful components out of the box. The accessibility features saved us months of development time.",
      testId: "testimonial-emma",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll("article");
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-20 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 flex items-end justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              02 / Signals
            </span>
            <h2 className="mt-4 font-display text-5xl md:text-7xl tracking-tight">
              DEVELOPER LOVE
            </h2>
          </div>
          <p className="hidden md:block max-w-xs font-mono text-xs text-muted-foreground text-right leading-relaxed">
            What developers are saying about building with Mono UI's glass
            component library.
          </p>
        </div>

        {/* Testimonial cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-px bg-border/20"
        >
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="group relative bg-background border border-border/20 p-8 hover:border-primary/40 transition-all duration-500"
              data-testid={testimonial.testId}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <Quote
                  size={20}
                  className="text-primary/30 group-hover:text-primary/60 transition-colors duration-300"
                />
                <div className="flex text-primary gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-current" size={9} />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <blockquote className="font-mono text-sm leading-relaxed mb-10 text-foreground/90">
                "{testimonial.quote}"
              </blockquote>

              {/* Accent line */}
              <div className="w-8 h-px bg-border group-hover:w-full group-hover:bg-primary transition-all duration-500 mb-6" />

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div>
                  <div className="font-mono text-xs font-medium text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-wider">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-500" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
