import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useLocation } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const components = [
  {
    title: "Glass Card",
    medium: "Layout",
    description:
      "Frosted translucent panels with multi-layer reflections, noise texture, and depth shadows. Soft and intense variants with optional color tints.",
    span: "col-span-2 row-span-2",
  },
  {
    title: "Glass Button",
    medium: "Actions",
    description:
      "Frosted call-to-action buttons with inset glow and hover scaling.",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Glass Input",
    medium: "Forms",
    description:
      "Transparent text fields with blur backdrop and focus ring transitions.",
    span: "col-span-1 row-span-2",
  },
  {
    title: "Glass Toggle",
    medium: "Controls",
    description:
      "Frosted switch with active glow and smooth thumb animation.",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Glass Loader",
    medium: "Feedback",
    description:
      "Spinner, dots, pulse, bars — four animated states in frosted containers.",
    span: "col-span-2 row-span-1",
  },
  {
    title: "And More",
    medium: "17+ Components",
    description:
      "Menus, prompts, messages, social buttons, voice UI, waitlist forms, and more.",
    span: "col-span-1 row-span-1",
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return;

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
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const cards = gridRef.current?.querySelectorAll("article");
      if (cards && cards.length > 0) {
        gsap.set(cards, { y: 60, opacity: 0 });
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
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
      id="experience"
      className="relative py-20 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 flex items-end justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              01 / Components
            </span>
            <h2 className="mt-4 font-display text-5xl md:text-7xl tracking-tight">
              WHAT'S INSIDE
            </h2>
          </div>
          <p className="hidden md:block max-w-xs font-mono text-xs text-muted-foreground text-right leading-relaxed">
            Glassmorphism components for React. Copy, paste, ship.
          </p>
        </div>

        {/* Asymmetric grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[160px] md:auto-rows-[180px]"
        >
          {components.map((component, index) => (
            <ComponentCard
              key={index}
              component={component}
              index={index}
              persistHover={index === 0}
            />
          ))}
        </div>

        {/* Bottom link */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setLocation("/components")}
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            Browse all
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </section>
  );
}

function ComponentCard({
  component,
  index,
  persistHover = false,
}: {
  component: {
    title: string;
    medium: string;
    description: string;
    span: string;
  };
  index: number;
  persistHover?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const [isScrollActive, setIsScrollActive] = useState(false);

  useEffect(() => {
    if (!persistHover || !cardRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 80%",
        onEnter: () => setIsScrollActive(true),
      });
    }, cardRef);

    return () => ctx.revert();
  }, [persistHover]);

  const isActive = isHovered || isScrollActive;

  return (
    <article
      ref={cardRef}
      className={cn(
        "group relative border border-border/40 p-5 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden",
        component.span,
        isActive && "border-primary/60"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background layer */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          isActive ? "opacity-100" : "opacity-0"
        )}
        style={{ backgroundColor: "hsl(15 100% 60% / 0.15)" }}
      />

      {/* Content */}
      <div className="relative z-10">
        <span className={cn("font-mono text-[10px] uppercase tracking-widest transition-colors duration-300", "text-muted-foreground")}>
          {component.medium}
        </span>
        <h3
          className={cn(
            "mt-3 font-display text-2xl md:text-4xl tracking-tight transition-colors duration-300",
            isActive ? "text-primary" : "text-foreground"
          )}
        >
          {component.title}
        </h3>
      </div>

      {/* Description — reveals on hover */}
      <div className="relative z-10">
        <p
          className={cn(
            "font-mono text-xs leading-relaxed transition-all duration-500 max-w-[280px]",
            isActive
              ? "opacity-100 translate-y-0 text-muted-foreground"
              : "opacity-0 translate-y-2"
          )}
        >
          {component.description}
        </p>
      </div>

      {/* Index marker */}
      <span
        className={cn(
          "absolute bottom-4 right-4 font-mono text-[10px] transition-colors duration-300",
          isActive ? "text-primary" : "text-muted-foreground/30"
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Corner accent */}
      <div
        className={cn(
          "absolute top-0 right-0 w-12 h-12 transition-all duration-500",
          isActive ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="absolute top-0 right-0 w-full h-px bg-primary" />
        <div className="absolute top-0 right-0 w-px h-full bg-primary" />
      </div>
    </article>
  );
}
