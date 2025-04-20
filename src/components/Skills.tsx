
import { Card, CardContent } from "./ui/card";

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["Python", "JavaScript", "C++"]
  },
  {
    title: "AI Frameworks",
    skills: ["LangChain", "CrewAI", "PyTorch", "TensorFlow", "Scikit-learn"]
  },
  {
    title: "Cloud Platforms",
    skills: ["AWS (proficient)", "Azure (learning)"]
  },
  {
    title: "Data & NLP",
    skills: ["Pandas", "NumPy", "SQL", "NLTK", "SpaCy"]
  },
  {
    title: "Databases",
    skills: ["Milvus", "Redis", "DynamoDB", "MongoDB", "PostgresSQL"]
  },
  {
    title: "Other Tools",
    skills: ["Celery", "Flask", "Langflow", "Matplotlib"]
  }
];

export const Skills = () => {
  return (
    <section className="py-20 container" id="skills">
      <h2 className="heading text-3xl md:text-4xl mb-12 gradient-text">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, idx) => (
          <Card key={idx} className="card-hover backdrop-blur bg-secondary/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-space-grotesk mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sidx) => (
                  <span
                    key={sidx}
                    className="px-3 py-1 rounded-full text-sm bg-accent/10 text-accent-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
