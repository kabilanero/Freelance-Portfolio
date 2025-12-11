import { useRef, useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { ArrowRight, Package, Globe, Code, Rocket, X, ExternalLink, Github, Star } from "lucide-react";

const projects = [
  {
    id: 1,
    year: "2024",
    code: "PK-001",
    title: "NPM Packages Published",
    description: "Developed and published open-source packages on NPM, contributing to the developer community with reusable utilities and components.",
    color: "hsl(262, 52%, 47%)",
    icon: Package,
    details: {
      technologies: ["TypeScript", "Node.js", "NPM", "Webpack"],
      highlights: ["5+ packages published", "1000+ weekly downloads", "Open source contributions"],
      links: [
        { label: "View on NPM", url: "#" },
        { label: "GitHub Repo", url: "#" },
      ],
    },
  },
  {
    id: 2,
    year: "2025",
    code: "ST-015",
    title: "15+ Static Sites Deployed",
    description: "Built and deployed over 15 production-ready static websites with industry-level deployment pipelines and optimization strategies.",
    color: "hsl(199, 89%, 48%)",
    icon: Globe,
    details: {
      technologies: ["React", "Next.js", "Vercel", "Netlify", "AWS"],
      highlights: ["SEO optimized", "99+ Lighthouse score", "CI/CD pipelines"],
      links: [
        { label: "View Portfolio", url: "#" },
        { label: "Case Studies", url: "#" },
      ],
    },
  },
  {
    id: 3,
    year: "2025",
    code: "DV-003",
    title: "Full-Stack Development",
    description: "Crafted complete web applications from concept to deployment, handling both frontend interfaces and backend architectures.",
    color: "hsl(142, 71%, 45%)",
    icon: Code,
    details: {
      technologies: ["React", "Node.js", "MongoDB", "PostgreSQL", "Docker"],
      highlights: ["REST APIs", "Authentication systems", "Database design"],
      links: [
        { label: "View Projects", url: "#" },
        { label: "Tech Stack", url: "#" },
      ],
    },
  },
  {
    id: 4,
    year: "2025",
    code: "LN-004",
    title: "Experience (1+ years)",
    description: "Started the coding journey, learning fundamentals and building the foundation for a career in web development.",
    color: "hsl(24, 94%, 50%)",
    icon: Rocket,
    details: {
      technologies: ["HTML", "CSS", "JavaScript", "Git","React", "Node.js", "MongoDB"],
      highlights: ["Self-taught developer", "100+ hours of practice", "First projects completed"],
      links: [
        { label: "Learning Path", url: "#" },
        { label: "Certificates", url: "#" },
      ],
    },
  },
];

const ProjectsExperience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Hide body scroll when details panel is open
useEffect(() => {
  if (isDetailsOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
  
  return () => {
    document.body.style.overflow = 'auto';
  };
}, [isDetailsOpen]);

  // Calculate which card should be active based on scroll
  useEffect(() => {
    
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const newIndex = Math.min(
        Math.floor(value * projects.length),
        projects.length - 1
      );
      setActiveIndex(newIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Intersection observer for snap behavior
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.5);
      },
      { threshold: [0.5] }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleExplore = () => {
    setSelectedProject(projects[activeIndex]);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setTimeout(() => setSelectedProject(null), 400);
  };

  const currentProject = projects[activeIndex];
  const IconComponent = currentProject.icon;

  return (
    <section id='projects'
      ref={containerRef}
      className="relative bg-background"
      style={{ height: `${projects.length * 100}vh` }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Year */}
        <motion.div
          key={currentProject.year}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.08, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <span
            className="text-[37vw] font-bold"
            style={{ color: currentProject.color }}
          >
            {currentProject.year}
          </span>
        </motion.div>

        {/* Main Content Area */}
        <div className="relative z-10 w-full h-full flex items-center justify-center px-6">
          {/* Card Container - shifts left when details open */}
          <motion.div
            className="relative w-full max-w-4xl"
            animate={{
              x: isDetailsOpen ? "-30%" : "0%",
              scale: isDetailsOpen ? 0.85 : 1,
            }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              className="relative bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-border/50"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left Side - Image/Icon Area */}
                <div className="relative w-full md:w-2/5 aspect-square md:aspect-auto md:min-h-[400px] p-6 md:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 40, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -40, scale: 0.9 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="w-full h-full rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: currentProject.color }}
                    >
                      <IconComponent className="w-24 h-24 md:w-32 md:h-32 text-white/90" />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right Side - Content */}
                <div className="flex-1 p-6 md:p-10 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {/* Project Code */}
                      <span className="text-sm font-medium text-muted-foreground tracking-wider">
                        {currentProject.code}
                      </span>

                      {/* Title */}
                      <h3
                        className="text-3xl md:text-4xl font-bold mt-2 mb-4"
                        style={{ color: currentProject.color }}
                      >
                        {currentProject.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
                        {currentProject.description}
                      </p>

                      {/* CTA Button */}
                      <button
                        onClick={handleExplore}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:gap-4 hover:shadow-lg"
                        style={{ backgroundColor: currentProject.color }}
                      >
                        EXPLORE
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Bottom Action Icons */}
              <div className="absolute bottom-4 right-4 flex items-center gap-3 text-muted-foreground/50">
                <button className="p-2 hover:text-foreground transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
                <button className="p-2 hover:text-foreground transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </button>
                <button className="p-2 hover:text-foreground transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* Year Timeline on Right */}
            <div className="absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 scrollbar-hide">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => {
                    const scrollPosition =
                      (index / projects.length) *
                      (containerRef.current?.scrollHeight || 0);
                    window.scrollTo({ top: scrollPosition, behavior: "smooth" });
                  }}
                  className={`text-xs font-medium py-2 px-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "text-foreground scale-110"
                      : "text-muted-foreground/40 hover:text-muted-foreground"
                  }`}
                  style={{
                    color: index === activeIndex ? currentProject.color : undefined,
                  }}
                >
                  {project.year}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Details Panel - slides in from right */}
          <AnimatePresence>
            {isDetailsOpen && selectedProject && (
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="absolute right-[3%] top-[10%] w-[40%] h-[80%] bg-card/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-border/50 overflow-hidden flex flex-col"
                style={{
                  boxShadow: `0 0 60px ${selectedProject.color}20, 0 25px 50px -12px rgba(0, 0, 0, 0.25)`,
                }}
              >
                {/* Header with close button */}
                <div className="relative p-6 border-b border-border/30">
                  <button
                    onClick={handleCloseDetails}
                    className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: selectedProject.color }}
                    >
                      {(() => {
                        const Icon = selectedProject.icon;
                        return <Icon className="w-7 h-7 text-white" />;
                      })()}
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground tracking-wider">
                        {selectedProject.code}
                      </span>
                      <h4
                        className="text-xl font-bold"
                        style={{ color: selectedProject.color }}
                      >
                        {selectedProject.title}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Description */}
                  <div>
                    <h5 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                      Overview
                    </h5>
                    <p className="text-foreground/80 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h5 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                      Technologies
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.details.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-full text-sm font-medium bg-muted/50 text-foreground/80 border border-border/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h5 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                      Highlights
                    </h5>
                    <ul className="space-y-2">
                      {selectedProject.details.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <Star
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: selectedProject.color }}
                          />
                          <span className="text-foreground/80">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Links */}
                  <div>
                    <h5 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                      Links
                    </h5>
                    <div className="flex flex-col gap-2">
                      {selectedProject.details.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
                        >
                          {i === 0 ? (
                            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                          ) : (
                            <Github className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                          )}
                          <span className="text-foreground/80 group-hover:text-foreground transition-colors">
                            {link.label}
                          </span>
                          <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border/30">
                  <button
                    onClick={handleCloseDetails}
                    className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:opacity-90"
                    style={{ backgroundColor: selectedProject.color }}
                  >
                    Close Details
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {projects.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-8 bg-primary" : "w-1.5 bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Scroll Hint */}
        <motion.div
          className="absolute bottom-8 right-8 text-muted-foreground/50 text-sm"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsExperience;
