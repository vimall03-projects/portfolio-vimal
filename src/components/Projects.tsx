
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

const projects = [
  {
    title: "Police Resource Management System (Sanrakshak)",
    description: "Cutting-edge Progressive Web Application for police resource management, connecting 800+ stations and 100K+ personnel with advanced features.",
    period: "Jan 2024 – Mar 2024",
    tech: ["NextJS", "Node", "Express", "TailwindCSS", "ChartJS", "Google Maps", "Flask", "PWA"],
    points: [
      "Engineered PWA improving efficiency by 40% and reducing costs by 25%",
      "Designed and established 3+ user roles for extensive network",
      "Implemented 5+ advanced features including Performance Tracking",
      "Increased user engagement by 64% through automation"
    ]
  },
  {
    title: "GenAI News Verifier",
    description: "AI-powered news verification system using Gemini API for fake news detection and News API for content analysis.",
    period: "2024",
    tech: ["Python", "Flask", "Gemini API", "MongoDB", "Express", "Node.js", "React"],
    points: [
      "Enhanced accuracy in classifying news articles by 90%",
      "Implemented NLP techniques using NLTK and Spacy",
      "Reduced processing time by 30% through custom language model",
      "Developed user-friendly web application for high accessibility"
    ]
  },
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
  },
  {
    title: "Alimento",
    description: "Platform connecting college students with nearby villagers for homemade food sales, enhancing community connectivity.",
    period: "Aug 2023",
    tech: ["PHP", "JavaScript", "MySQL", "Razorpay API"],
    points: [
      "Developed full-stack platform for food transactions",
      "Implemented secure online payment system",
      "Enhanced community connectivity through user-friendly interface",
      "Supported local economies through digital marketplace"
    ]
  }
];

export const Projects = () => {
  return (
    <section className="py-20 container" id="projects">
      <h2 className="heading text-3xl md:text-4xl mb-12 gradient-text">Selected Work</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <Card
            key={idx}
            className="group relative overflow-hidden backdrop-blur bg-secondary/50 border border-primary/20 transition-all duration-300 hover:bg-secondary/70 hover:border-primary/30"
            onMouseMove={(e: any) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              e.currentTarget.style.setProperty("--x", `${x}px`);
              e.currentTarget.style.setProperty("--y", `${y}px`);
            }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(800px_200px_at_var(--x)_var(--y),rgba(155,135,245,0.18),transparent_50%)]" />
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
                  <Badge key={tidx} variant="outline" className="bg-accent/10 border-accent/20">
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
