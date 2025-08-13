
import { Card } from "./ui/card";
import { GlobeDemo } from "./GitGlobe" ;

export const Contact = () => {
  return (
    <section className="py-20 container" id="contact">
      <h2 className="heading text-3xl md:text-4xl mb-12 gradient-text">Let’s Connect</h2>
      <Card className="relative overflow-hidden backdrop-blur bg-secondary/50 border border-primary/20 p-8 hover:bg-secondary/70 hover:border-primary/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-2xl font-space-grotesk text-primary">Available across time zones</h3>
            <p className="text-muted-foreground max-w-lg">
              I work async-first and enjoy collaborating with small, fast teams. If you’re exploring AI infrastructure, agent systems, or evaluations, I’d be glad to connect.
            </p>
            <a 
              href="mailto:vimalmurali03@gmail.com"
              className="inline-block bg-accent/20 hover:bg-accent/30 text-accent-foreground px-6 py-3 rounded-full transition-all duration-300"
            >
              Get in Touch →
            </a>
          </div>
          <div className="relative">
            <GlobeDemo  />
            
            <div className="absolute inset-0 blur-3xl bg-primary/20 -z-10" />
          </div>
        </div>
      </Card>
    </section>
  );
};
