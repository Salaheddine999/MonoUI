import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import TutorialsSection from "@/components/tutorials-section";
import TestimonialsSection from "@/components/testimonials-section";
import ExperienceSection from "@/components/experience-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      {/* Editorial grid background */}
      <div className="grid-bg fixed inset-0 opacity-20" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <ExperienceSection />
        <TestimonialsSection />
        <TutorialsSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}
