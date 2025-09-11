import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Youtube } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function TutorialsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="tutorials" className="relative py-20 px-4">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <Card className="glass rounded-3xl border-border/20">
          <CardContent className="p-12 md:p-16 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center mb-8 mx-auto">
              <svg
                className="text-white"
                style={{ width: "32px", height: "32px" }}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Tutorials Coming Soon
            </h3>
            <p className="text-md text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're working on comprehensive video tutorials to help you master
              our design system. Learn how to build beautiful, consistent UIs
              with React, Tailwind CSS, and Framer Motion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-[#EE3221] hover:bg-[#EE3221]/90 text-white rounded-xl px-8 py-6 text-sm font-medium text-base border-0"
                asChild
              >
                <a
                  href="https://youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    style={{ width: "24px", height: "24px" }}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  Watch Tutorials on YouTube
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
