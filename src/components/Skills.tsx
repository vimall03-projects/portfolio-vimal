import { Card, CardContent } from "./ui/card";

const skillCategories = [
  {
    title: "Languages",
    skills: ["C++ (DSA)", "Python", "SQL", "PHP", "TypeScript", "JavaScript", "HTML", "CSS"]
  },
  {
    title: "Frameworks",
    skills: ["NextJS", "React", "Node.js", "TailwindCSS", "Express", "MongoDB", "Flask", "LangChain"]
  },
  {
    title: "Developer Tools",
    skills: ["Git", "Github", "AWS", "Azure", "VS Code", "Jupyter", "n8n", "Docker", "Vercel"]
  },
  {
    title: "Libraries",
    skills: ["Pandas", "NumPy", "Matplotlib", "Plotly", "Milvus"]
  },
  {
    title: "AI & ML",
    skills: ["LangChain", "LangGraph", "LlamaIndex", "CrewAI", "PyTorch", "TensorFlow", "Scikit-learn"]
  },
  {
    title: "Others",
    skills: ["Figma", "Technical Writing", "Sound Design", "Open Source", "Generative AI"]
  }
];

export const Skills = () => {
  return (
    <section className="py-20 container" id="skills">
      <h2 className="heading text-3xl md:text-4xl mb-12 gradient-text">Capabilities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, idx) => (
          <Card 
            key={idx} 
            className="group card-hover backdrop-blur bg-secondary/50 border border-primary/20 relative overflow-hidden hover:bg-secondary/70 hover:border-primary/30"
            onMouseMove={(e: any) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              e.currentTarget.style.setProperty("--x", `${x}px`);
              e.currentTarget.style.setProperty("--y", `${y}px`);
            }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(600px_120px_at_var(--x)_var(--y),rgba(155,135,245,0.16),transparent_50%)]" />
            <CardContent className="p-6">
              <h3 className="text-lg font-space-grotesk mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sidx) => (
                  <span
                    key={sidx}
                    className="px-3 py-1 rounded-full text-sm bg-accent/10 text-accent-foreground border border-accent/20"
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
