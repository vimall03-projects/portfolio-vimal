
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export const About = () => {
  const focus = [
    "AI systems and agentic workflows",
    "Backend platforms and data infrastructure",
    "RAG, vector search, and observability",
    "Developer experience and interface design",
  ];
  const highlights = [
    "Founding software engineer at Synthetic Bee, developing document-focused AI systems",
    "Built a forest-monitoring SaaS platform using IoT and LLMs",
    "Experience with Milvus, LangChain, CrewAI, and AWS/GCP",
    "Active open source contributor",
  ];

  return (
    <section className="py-20 container" id="about">
      <h2 className="heading text-3xl md:text-4xl mb-12 gradient-text">About</h2>
      <Card className="p-6 card-hover backdrop-blur bg-secondary/50 border border-primary/20 hover:bg-secondary/70 hover:border-primary/30">
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            I design and deliver reliable AI products, with a focus on translating ideas into dependable systems. My work spans data pipelines, evaluation, agent tooling, and interface design, with attention to performance, developer ergonomics, and clear presentation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-space-grotesk text-primary mb-3">Now</h3>
              <div className="flex flex-wrap gap-2">
                {focus.map((item) => (
                  <Badge key={item} variant="outline" className="bg-accent/10 border-accent/20">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-space-grotesk text-primary mb-3">Highlights</h3>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                {highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};
