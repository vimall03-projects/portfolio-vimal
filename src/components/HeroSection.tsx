
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-20">
      <div className="space-y-8 animate-fade-up">
        <div className="space-y-4 text-center">
          <h1 className="heading text-4xl md:text-6xl lg:text-7xl gradient-text">
            Vimal Murali
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            AI & Software Engineer
          </p>
        </div>
        
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="icon" className="rounded-full" asChild>
            <a href="https://github.com/vimall03" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" asChild>
            <a href="https://linkedin.com/in/vimall03" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" asChild>
            <a href="mailto:vimalmurali03@gmail.com">
              <Mail className="h-5 w-5" />
            </a>
          </Button>
        </div>
        
        <div className="text-center space-y-2">
          <div className="text 0.5xl text-accent/80">Currently building AI solutions at</div>
          <div className="font-space-grotesk text-xl">Synthetic Bee</div>
        </div>
      </div>
    </section>
  );
};
