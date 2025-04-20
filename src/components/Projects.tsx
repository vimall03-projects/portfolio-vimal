
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

const projects = [
  {
    title: "Forest Monitoring System",
    description: "Full-stack SaaS platform integrating IoT, fine-tuned LLMs, and regression models to monitor forest health and detect VOCs.",
    period: "Oct 2024 – April 2025",
    tech: ["Next.js", "Node.js", "TypeScript", "Flask", "Docker", "AWS EC2", "GCP"],
    points: [
      "Led design and development of full-stack platform",
      "Implemented scalable microservices architecture",
      "Performed data analysis of sensor data",
      "Integrated Langflow chatbots for dynamic insights"
    ]
  }
];

export const Projects = () => {
  return (
    <section className="py-20 container" id="projects">
      <h2 className="heading text-3xl md:text-4xl mb-12 gradient-text">Projects</h2>
      <div className="grid gap-8">
        {projects.map((project, idx) => (
          <Card key={idx} className="card-hover backdrop-blur bg-secondary/50">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-space-grotesk">{project.title}</CardTitle>
                <span className="text-sm text-muted-foreground">{project.period}</span>
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, tidx) => (
                  <Badge key={tidx} variant="outline" className="bg-accent/10">
                    {t}
                  </Badge>
                ))}
              </div>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                {project.points.map((point, pidx) => (
                  <li key={pidx}>{point}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
