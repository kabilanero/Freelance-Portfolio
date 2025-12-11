import { motion } from "framer-motion";

const AboutJourney = () => {
  const milestones = [
    {
      id: 1,
      title: "Graduate (ECE)",
      description: "Started my journey in web development, learning the fundamentals of HTML, CSS, and JavaScript.",
      year: "2024",
    },
    {
      id: 2,
      title: "Internship Experience",
      description: "Built my first full-stack application and discovered my passion for creating user experiences.",
      year: "2024",
    },
    {
      id: 3,
      title: "Professional Growth",
      description: "Joined a tech company and worked on enterprise-level applications with modern frameworks.",
      year: "2025",
    },
    {
      id: 4,
      title: "Leadership Role",
      description: "Took on team lead responsibilities, mentoring junior developers and architecting solutions.",
      year: "2025",
    },
  ];

  return (
    <section id="about" className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
         <h2 className="
  text-5xl font-bold mb-4 
  bg-gradient-to-r from-primary to-primary/60 
  bg-clip-text text-transparent 
  leading-tight
">
  About Me & My Experience
</h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A roadmap of my professional growth and the milestones that shaped my career
          </p>
        </motion.div>

        {/* Curved Roadmap */}
        <div className="relative">
          {/* SVG Curved Path */}
          <svg
            className="absolute left-1/2 -translate-x-1/2 w-full h-full"
            viewBox="0 0 400 800"
            fill="none"
            preserveAspectRatio="none"
            style={{ height: "100%" }}
          >
            <motion.path
              d="M200 0 
                 C 200 50, 320 100, 320 150 
                 C 320 200, 80 250, 80 300 
                 C 80 350, 320 400, 320 450 
                 C 320 500, 80 550, 80 600
                 C 80 650, 320 700, 320 750
                 C 320 800, 200 850, 200 900"
              stroke="url(#roadGradient)"
              strokeWidth="20"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
            {/* Road center line */}
            <motion.path
              d="M200 0 
                 C 200 50, 320 100, 320 150 
                 C 320 200, 80 250, 80 300 
                 C 80 350, 320 400, 320 450 
                 C 320 500, 80 550, 80 600
                 C 80 650, 320 700, 320 750
                 C 320 800, 200 850, 200 900"
              stroke="hsl(var(--primary) / 0.3)"
              strokeWidth="2"
              strokeDasharray="10 10"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
              viewport={{ once: true }}
            />
            <defs>
              <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--muted))" />
                <stop offset="50%" stopColor="hsl(var(--muted-foreground) / 0.4)" />
                <stop offset="100%" stopColor="hsl(var(--muted))" />
              </linearGradient>
            </defs>
          </svg>

          {/* Milestones */}
          <div className="relative z-10 space-y-32 py-10">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Content Card */}
                <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                  <div
                    className={`inline-block p-6 rounded-2xl bg-card border border-border shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-md ${
                      index % 2 === 0 ? "ml-auto" : "mr-auto"
                    }`}
                  >
                    <span className="text-sm font-semibold text-primary">{milestone.year}</span>
                    <h3 className="text-2xl font-bold mt-2 text-foreground">{milestone.title}</h3>
                    <p className="text-muted-foreground mt-3 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Milestone Marker */}
                <div className="relative flex-shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                    className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30"
                  >
                    <span className="text-2xl font-bold text-primary-foreground">
                      {String(milestone.id).padStart(2, "0")}
                    </span>
                  </motion.div>
                  {/* Marker Pin */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-primary" />
                </div>

                {/* Empty space for alignment */}
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Want to be part of my next milestone?
          </p>
          <button onClick={() => window.location.href = '#contact'} className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors duration-300 shadow-lg shadow-primary/30">
            Let's Connect
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutJourney;
