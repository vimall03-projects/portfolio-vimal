
import { Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_10%,rgba(155,135,245,0.18),transparent_60%)] [mask-image:linear-gradient(to_bottom,transparent,white_12%,white_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-64 blur-3xl bg-gradient-to-b from-primary/20 to-transparent [mask-image:linear-gradient(to_bottom,transparent,white_20%,white_100%)]" />

      <div className="space-y-10 animate-fade-in text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-secondary/40 px-4 py-1 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Designing dependable AI systems
        </div>

        <div className="space-y-4">
          <h1 className="heading text-5xl md:text-7xl lg:text-8xl gradient-text">Vimal Murali</h1>
          <p className="text-base md:text-xl text-muted-foreground">
            Engineer focused on agentic backends, evaluation-first pipelines, and clear, thoughtful interfaces.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Button variant="outline" className="rounded-full px-5">
            <a href="mailto:vimalmurali03@gmail.com" className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> Say hello
            </a>
          </Button>
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
        </div>

        <div className="text-center space-y-2">
          <div className="text-sm text-accent/80">Now at</div>
          <div className="font-space-grotesk text-2xl">Synthetic Bee</div>
        </div>
      </div>
    </section>
  );
};
