
import { HeroSection } from "@/components/HeroSection";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <main className="relative z-10">
        <HeroSection />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      {/* Enhanced background decoration */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#1a1f2c_1px,transparent_1px),linear-gradient(to_bottom,#1a1f2c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(155,135,245,0.15),transparent)]" />
    </div>
  );
};

export default Index;
