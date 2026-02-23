import { useRef, useEffect, useCallback } from "react";
import { Star, Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

gsap.registerPlugin(ScrollTrigger);

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
  {
    name: "David Park",
    role: "Full-Stack Engineer",
    company: "Devhouse",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64",
    quote:
      "Mono UI's design system is so cohesive — every component feels intentional. It cut our design-to-code handoff time in half.",
    testId: "testimonial-david",
  },
];

// Duplicate slides so Embla has enough to create a seamless infinite loop
const slides = [...testimonials, ...testimonials];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: true,
    },
    [
      AutoScroll({
        speed: 0.8,
        playOnInit: true,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
      }),
    ]
  );

  // Restart auto-scroll after any interaction (drag, click, etc.)
  useEffect(() => {
    if (!emblaApi) return;

    const restartAutoScroll = () => {
      const autoScroll = emblaApi.plugins().autoScroll;
      if (autoScroll && !autoScroll.isPlaying()) {
        autoScroll.play();
      }
    };

    emblaApi.on("settle", restartAutoScroll);
    emblaApi.on("pointerUp", restartAutoScroll);

    return () => {
      emblaApi.off("settle", restartAutoScroll);
      emblaApi.off("pointerUp", restartAutoScroll);
    };
  }, [emblaApi]);

  const startAutoScroll = useCallback(() => {
    if (!emblaApi) return;
    const autoScroll = emblaApi.plugins().autoScroll;
    if (autoScroll && !autoScroll.isPlaying()) {
      autoScroll.play();
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;

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
            onEnter: startAutoScroll,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [startAutoScroll]);

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

        {/* Testimonial carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((testimonial, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-px"
              >
                <article
                  className="group relative bg-background border border-border/20 p-8 hover:border-primary/40 transition-all duration-500 h-full"
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
