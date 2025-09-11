import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Box, Github } from "lucide-react";
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

  return (
    <nav
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-4xl transition-transform duration-300 ${
        navVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="glass rounded-2xl px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Box className="text-white text-sm" size={16} />
              </div>
              <span className="text-xl font-bold gradient-text">Mono UI</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
              data-testid="button-view-github"
              asChild
            >
              <a
                href="https://github.com/your-org/mono-ui"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={16} />
                View on GitHub
              </a>
            </Button>
            <Button
              className="glass-orange rounded-xl px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/20 transition-all"
              data-testid="button-get-started"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
