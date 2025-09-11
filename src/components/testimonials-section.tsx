import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation();

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Frontend Developer, TechCorp",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=64&h=64",
      quote:
        "Mono UI has completely transformed how we build React applications. The glassmorphism effects are stunning and the developer experience is top-notch.",
      testId: "testimonial-sarah",
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Developer, StartupCo",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64",
      quote:
        "The TypeScript support is incredible. Our team's productivity has increased significantly since switching to Mono UI. Highly recommended!",
      testId: "testimonial-marcus",
    },
    {
      name: "Emma Thompson",
      role: "UX Engineer, DesignLab",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64",
      quote:
        "Beautiful components that just work out of the box. The accessibility features saved us months of development time. Amazing work!",
      testId: "testimonial-emma",
    },
  ];

  return (
    <section id="testimonials" className="relative py-20 px-4">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Loved by <span className="gradient-text">Developers</span>
          </h2>
          <p className="text-md text-muted-foreground max-w-2xl mx-auto">
            See what developers around the world are saying about Mono UI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="glass rounded-3xl border-border/20 hover:glass-orange card-hover"
              data-testid={testimonial.testId}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="fill-current" size={16} />
                    ))}
                  </div>
                </div>
                <blockquote className="text-lg mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
