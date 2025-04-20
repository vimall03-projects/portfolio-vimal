
import { Card } from "./ui/card";

const experiences = [
  {
    title: "Founding Software Engineer, AI",
    company: "Synthetic Bee",
    period: "Nov 2024 – Present",
    points: [
      "Led the end-to-end design, development, and deployment of backend architecture for advanced document analysis",
      "Collaborated with founding team to define business needs and develop AI-driven solutions",
      "Managed data handling and vector search with Milvus vector database",
      "Implemented monitoring pipelines for model reliability"
    ]
  },
  {
    title: "Junior Software Development Engineer",
    company: "App Mastery",
    period: "Aug 2024 – Dec 2024",
    points: [
      "Spearheaded RAG system development using LangChain and OpenAI",
      "Enhanced LLM factual accuracy by 30-50% through testing",
      "Implemented automated workflows for Jira ticket creation using AWS",
      "Optimized AWS alert setups reducing setup time by 95%"
    ]
  }
];

export const Experience = () => {
  return (
    <section className="py-20 container" id="experience">
      <h2 className="heading text-3xl md:text-4xl mb-12 gradient-text">Experience</h2>
      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <Card key={idx} className="p-6 card-hover backdrop-blur bg-secondary/50">
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
