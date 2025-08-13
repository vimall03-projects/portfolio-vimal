
import { HeroSection } from "@/components/HeroSection";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import StarField from "@/components/StarField";

const Index = () => {
  return (
    <div className="min-h-screen bg-black relative">
      {/* Adjusted density and speed */}
      <StarField density={0.0003} speed={0.08} parallax={0} className="opacity-45" />
      <main className="relative z-10">
        <HeroSection />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      {/* Subtle grid and glow with top fade */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#1a1f2c_1px,transparent_1px),linear-gradient(to_bottom,#1a1f2c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_100%)] opacity-15" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(155,135,245,0.12),transparent)] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_100%)]" />
    </div>
  );
};

export default Index;
