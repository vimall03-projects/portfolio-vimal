
import { Card } from "./ui/card";

export const About = () => {
  const languages = ["English", "Hindi", "Telugu", "Kannada", "Tamil"];
  const hobbies = ["Music Production", "Guitar Playing"];

  return (
    <section className="py-20 container" id="about">
      <h2 className="heading text-3xl md:text-4xl mb-12 gradient-text">About Me</h2>
      <Card className="p-6 card-hover backdrop-blur bg-secondary/50 border-border/50">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Hey! I'm Vimal — a backend-leaning dev from Bengaluru who loves building AI-driven systems, tinkering with cloud stuff, and occasionally turning chaos into working code. From startup grind to forest-monitoring side quests, I'm all about learning by doing (and sometimes breaking). Always up for solving real-world problems, geeking out on multi-agent systems, or just shipping cool side projects. Let's build something fun and functional!
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-space-grotesk text-primary mb-2">Languages I Speak</h3>
              <div className="flex flex-wrap gap-2">
                {languages.map((language) => (
                  <span 
                    key={language}
                    className="px-3 py-1 rounded-full bg-accent/10 text-accent-foreground text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-space-grotesk text-primary mb-2">What I Love</h3>
              <div className="flex flex-wrap gap-2">
                {hobbies.map((hobby) => (
                  <span 
                    key={hobby}
                    className="px-3 py-1 rounded-full bg-accent/10 text-accent-foreground text-sm"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};
