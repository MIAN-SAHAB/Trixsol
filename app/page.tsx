import HeroSection from "@/components/HeroSection";
import StorytellingSection from "@/components/StorytellingSection";
import ServicesSection from "@/components/ServicesSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StorytellingSection />
      <ServicesSection />
      <FeaturedProjects />
      <ProcessSection />
      <TestimonialsSection />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}