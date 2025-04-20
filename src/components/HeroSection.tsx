
import { Github, Linkedin, Mail, Music, Guitar } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export const HeroSection = () => {
  const languages = ["English", "Hindi", "Telugu", "Kannada", "Tamil"];
  const hobbies = ["Music Production", "Guitar Playing"];

  return (
    <section className="min-h-screen flex items-center justify-center py-20">
      <div className="space-y-8 animate-fade-up">
        <div className="space-y-4 text-center">
          <h1 className="heading text-4xl md:text-6xl lg:text-7xl gradient-text animate-fade-in">
            Vimal Murali
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground animate-fade-in delay-100">
            AI & Software Engineer
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-4 animate-fade-in delay-200">
            {languages.map((lang) => (
              <Badge key={lang} variant="outline" className="bg-accent/10 border-accent/20">
                {lang}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center gap-4 animate-fade-in delay-300">
          <Button variant="outline" size="icon" className="rounded-full hover:scale-110 transition-transform" asChild>
            <a href="https://github.com/vimall03" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full hover:scale-110 transition-transform" asChild>
            <a href="https://linkedin.com/in/vimall03" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full hover:scale-110 transition-transform" asChild>
            <a href="mailto:vimalmurali03@gmail.com">
              <Mail className="h-5 w-5" />
            </a>
          </Button>
        </div>
        
        <div className="text-center space-y-4 animate-fade-in delay-400">
          <div className="text-xl text-accent/80">Currently building AI solutions at</div>
          <div className="font-space-grotesk text-2xl">Synthetic Bee</div>
          
          <div className="flex justify-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <Music className="h-5 w-5 text-primary" />
              <span>Music Production</span>
            </div>
            <div className="flex items-center gap-2">
              <Guitar className="h-5 w-5 text-primary" />
              <span>Guitar</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
