import ParticleEffectHero from "@/components/particle-effect-hero";
import MobileHero from "@/components/mobile-hero";
import CurriculumApproachSection from "./components/CurriculumApproachSection";
import TeacherSection from "./components/TeacherSection";
import StatsCounter from "./components/StatsCounter";
import CurriculumSection from "./components/CurriculumSection";
import ReviewsMarquee from "./components/ReviewsMarquee";
import CentreWalkthrough from "./components/CentreWalkthrough";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      {/* Desktop / tablet hero — heavy canvas + scroll-driven timeline */}
      <div className="hidden md:block">
        <ParticleEffectHero />
      </div>
      {/* Mobile hero — lightweight, same content sequence, no video scrub */}
      <div className="md:hidden">
        <MobileHero />
      </div>
      <CurriculumApproachSection />
      <TeacherSection />
      <StatsCounter />
      <CurriculumSection />
      <ReviewsMarquee />
      <CentreWalkthrough />
      <Footer />
    </>
  );
}
