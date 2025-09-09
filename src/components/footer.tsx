import { Box, Github, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-12 px-4 border-t border-border/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left side - Brand and info */}
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Box className="text-white text-sm" size={16} />
              </div>
              <span className="text-xl font-bold gradient-text">Mono UI</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Building the future of React component libraries with beautiful
              glassmorphism effects and unmatched developer experience.
            </p>
            <div className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Mono UI. All rights reserved.
            </div>
          </div>

          {/* Right side - Social links */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/your-org/mono-ui"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:glass-orange transition-all"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://instagram.com/monoui"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:glass-orange transition-all"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://linkedin.com/company/monoui"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:glass-orange transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
