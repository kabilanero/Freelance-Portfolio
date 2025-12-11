import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Layers, 
  Globe, 
  Box, 
  User, 
  Server, 
  Rocket, 
  View 
} from "lucide-react";

// ============================================
// SERVICES SECTION - Self-contained component
// All code in one file for easy copy-paste
// ============================================

interface ServiceCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  className?: string;
  delay?: number;
}

const ServiceCard = ({ title, subtitle, icon, className = "", delay = 0 }: ServiceCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`relative group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Magic Glow Border Effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: isHovered
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.4), transparent 40%)`
            : "none",
        }}
      />
      
      {/* Animated Border Glow */}
      <div className="absolute inset-0 rounded-2xl p-[1px] overflow-hidden">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: isHovered
              ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.8), rgba(79, 70, 229, 0.4) 40%, transparent 60%)`
              : "none",
          }}
        />
      </div>

      {/* Card Content */}
      <div className="relative h-full rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm p-6 flex flex-col justify-between overflow-hidden group-hover:border-purple-500/30 transition-colors duration-500">
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-500/40 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Icon */}
        <div className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300 mb-auto">
          {icon}
        </div>

        {/* Text Content */}
        <div className="mt-4">
          <p className="text-muted-foreground text-sm mb-1">{subtitle}</p>
          <h3 className="text-foreground text-lg font-semibold">{title}</h3>
        </div>

        {/* Corner Glow */}
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors duration-500" />
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      title: "Fullstack Apps",
      subtitle: "Mid-level",
      icon: <Layers className="w-8 h-8" />,
    },
    {
      title: "Landing Pages",
      subtitle: "Full Design",
      icon: <Globe className="w-8 h-8" />,
    },
    {
      title: "Product Showcase",
      subtitle: "Interactive",
      icon: <Box className="w-8 h-8" />,
    },
    {
      title: "Personal Portfolios",
      subtitle: "Custom Built",
      icon: <User className="w-8 h-8" />,
    },
    {
      title: "Node.js Backend",
      subtitle: "Scalable APIs",
      icon: <Server className="w-8 h-8" />,
    },
    {
      title: "SaaS Applications",
      subtitle: "Full Stack",
      icon: <Rocket className="w-8 h-8" />,
    },
    {
      title: "3D Showcasing",
      subtitle: "Immersive",
      icon: <View className="w-8 h-8" />,
    },
  ];

  return (
    <section className="relative min-h-screen bg-background py-20 px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

<section className="relative min-h-screen bg-background py-20 px-6 overflow-hidden flex flex-col justify-center items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Services I <span className="text-purple-400">Provide</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From concept to deployment, I build modern web experiences that stand out
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px]">
          {/* Row 1 */}
          <ServiceCard
            {...services[0]}
            className="md:col-span-1 lg:col-span-1"
            delay={0.1}
          />
          <ServiceCard
            {...services[1]}
            className="md:col-span-1 lg:col-span-1"
            delay={0.15}
          />
          <ServiceCard
            {...services[2]}
            className="md:col-span-2 lg:col-span-2 lg:row-span-2"
            delay={0.2}
          />

          {/* Row 2 */}
          <ServiceCard
            {...services[3]}
            className="md:col-span-2 lg:col-span-2 lg:row-span-2"
            delay={0.25}
          />
          <ServiceCard
            {...services[4]}
            className="md:col-span-1 lg:col-span-1"
            delay={0.3}
          />
          <ServiceCard
            {...services[5]}
            className="md:col-span-1 lg:col-span-1"
            delay={0.35}
          />

          {/* Row 3 */}
          <ServiceCard
            {...services[6]}
            className="md:col-span-2 lg:col-span-4"
            delay={0.4}
          />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Need something custom? Let's talk about your project.
          </p>
          <button className="relative group px-8 py-3 rounded-full bg-transparent border border-purple-500/50 text-foreground font-medium overflow-hidden transition-all duration-300 hover:border-purple-400">
            {/* Button Glow */}
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Get In Touch</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
