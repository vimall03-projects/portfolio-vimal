
import { Globe } from "lucide-react";
import { Card } from "./ui/card";

export const Contact = () => {
  return (
    <section className="py-20 container" id="contact">
      <h2 className="heading text-3xl md:text-4xl mb-12 gradient-text">Let's Connect</h2>
      <Card className="relative overflow-hidden backdrop-blur bg-secondary/50 border-border/50 p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-2xl font-space-grotesk text-primary">Happy to Collaborate Around the World! 🌏</h3>
            <p className="text-muted-foreground max-w-lg">
              Whether you're across the street or across the ocean, I'm always excited to work on innovative projects 
              and create impactful solutions together.
            </p>
            <a 
              href="mailto:vimalmurali03@gmail.com"
              className="inline-block bg-accent/20 hover:bg-accent/30 text-accent-foreground px-6 py-3 rounded-full transition-all duration-300"
            >
              Get in Touch →
            </a>
          </div>
          <div className="relative">
            <Globe className="w-24 h-24 text-primary animate-pulse" />
            <div className="absolute inset-0 blur-3xl bg-primary/20 -z-10" />
          </div>
        </div>
      </Card>
    </section>
  );
};
