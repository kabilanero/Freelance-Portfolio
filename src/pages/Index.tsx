import HeroOrbit from "@/components/HeroOrbit";
import AboutJourney from "@/components/AboutJourney";
import ProjectsExperience from "@/components/ProjectsExperience";
import ServicesSection from "@/components/ServicesSection";
import MagicBento from "@/components/Bentoservices";
import MentorshipContact from "@/components/MentorshipContact";
import Footer from "@/components/Footer";
import MouseParticles from '@/components/HeroOrbit';
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
    <Navbar />
      <HeroOrbit />


      {/* About & Journey Section */}
      <AboutJourney />

      {/* Projects & Experience Section */}
      <ProjectsExperience />

      {/* Services Section */}
      <MagicBento
        textAutoHide={true}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={false}
        enableMagnetism={false}
        clickEffect={true}
        spotlightRadius={300}
        particleCount={12}
        glowColor="132, 0, 255"
      />

      <MentorshipContact />

      <Footer/>
    </div>
  );
};

export default Index;
