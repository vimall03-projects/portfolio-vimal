
import { Card } from "./ui/card";

const experiences = [
  {
    title: "Founding Software Engineer, AI",
    company: "Synthetic Bee",
    period: "Nov 2024 – Present",
    points: [
      "Leading end-to-end design, development, and deployment of backend architecture for advanced document analysis",
      "Collaborating with the founding team to define business needs and develop AI-driven solutions",
      "Managing data handling and vector search with Milvus vector database",
      "Implementing monitoring pipelines for model reliability"
    ]
  },
  {
    title: "Junior Software Development Engineer",
    company: "App Mastery",
    period: "Aug 2024 – Present",
    points: [
      "Spearheaded RAG system development using LangChain and OpenAI",
      "Enhanced LLM factual accuracy by 30-50% through testing",
      "Implemented automated workflows for Jira ticket creation using AWS",
      "Optimized AWS alert setups reducing setup time by 95%"
    ]
  },
  {
    title: "Open Source Contributor",
    company: "GirlScript Summer Of Code",
    period: "May 2024 – Aug 2024",
    points: [
      "Featured among top 200 contributors in June",
      "Led development on over 10 full-stack projects",
      "Merged 20+ PRs improving code quality and fixing bugs",
      "Contributed to multiple open source repositories"
    ]
  }
];

export const Experience = () => {
  return (
    <section className="py-20 container" id="experience">
      <h2 className="heading text-3xl md:text-4xl mb-12 gradient-text">Experience</h2>
      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <Card 
            key={idx} 
            className="group p-6 card-hover backdrop-blur bg-secondary/50 border border-primary/20 relative overflow-hidden hover:bg-secondary/70 hover:border-primary/30"
            onMouseMove={(e: any) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              e.currentTarget.style.setProperty("--x", `${x}px`);
              e.currentTarget.style.setProperty("--y", `${y}px`);
            }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(700px_150px_at_var(--x)_var(--y),rgba(155,135,245,0.16),transparent_50%)]" />
            <div className="space-y-4">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h3 className="text-xl font-space-grotesk font-semibold">{exp.title}</h3>
                  <p className="text-primary">{exp.company}</p>
                </div>
                <span className="text-sm text-muted-foreground">{exp.period}</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                {exp.points.map((point, pidx) => (
                  <li key={pidx}>{point}</li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
