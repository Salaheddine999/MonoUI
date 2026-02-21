import { useState, useEffect } from "react";
import { Github, ArrowUpRight } from "lucide-react";
import { useLocation, Link } from "wouter";

export default function Navigation() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        navVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="border-b border-border/30 bg-background/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <span className="font-display text-2xl tracking-tight">
              MONO UI
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hidden sm:inline">
              v1.0
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Salaheddine999/MonoUI"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
              data-testid="button-view-github"
            >
              <Github size={14} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <Link
              href="/components"
              className="group inline-flex items-center gap-2 border border-foreground/20 px-5 py-2 font-mono text-xs uppercase tracking-widest text-foreground hover:border-primary hover:text-primary transition-all duration-200"
              data-testid="button-get-started"
            >
              Get Started
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
