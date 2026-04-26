import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import imgport from "../assests/WhatsApp Image 2024-09-20 at 12.12.36 PM-removebg-preview-Photoroom.jpg";
import Weblogo from "../assests/Weblogo.png";
import RotatingText from "./ui/Orbitcontent";
import BlobBackground from './ui/blobeffect';
import { Code, Github, Linkedin, Twitter, Instagram, DiscIcon as Discord, Mail } from 'lucide-react';

// Optimized Mouse Particles with throttling
const MouseParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const throttleTimeoutRef = useRef<NodeJS.Timeout>();

  class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 2;
      this.speedY = (Math.random() - 0.5) * 2;
      this.opacity = 1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity -= 0.015;
      this.size -= 0.03;
    }

    draw(ctx: CanvasRenderingContext2D) {
      if (this.opacity <= 0 || this.size <= 0.2) return;
      
      ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(139, 92, 246, 0.6)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.max(0.2, this.size), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (throttleTimeoutRef.current) return;
    
    throttleTimeoutRef.current = setTimeout(() => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      for (let i = 0; i < 2; i++) {
        particlesRef.current.push(new Particle(mouseRef.current.x, mouseRef.current.y));
      }
      
      throttleTimeoutRef.current = undefined;
    }, 16);
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
      const particle = particlesRef.current[i];
      particle.update();
      particle.draw(ctx);
      
      if (particle.opacity <= 0 || particle.size <= 0.2) {
        particlesRef.current.splice(i, 1);
      }
    }
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    animate();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }
    };
  }, [animate, handleMouseMove]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />;
};

// Social Connector Component with animated lines
const SocialConnector = ({ 
  icon: Icon, 
  label, 
  href, 
  index, 
  total,
  isMobile 
}: { 
  icon: any; 
  label: string; 
  href: string; 
  index: number; 
  total: number;
  isMobile: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="relative flex items-center">
      {/* Connector Line */}
      {index < total - 1 && (
        <div className={`
          absolute bg-gradient-to-b from-primary/30 to-primary/10
          ${isMobile 
            ? `left-0 right-0 h-[2px] top-full` 
            : `left-1/2 -translate-x-1/2 w-[2px] bottom-full`
          }
        `}
        style={{
          [isMobile ? 'width' : 'height']: isMobile ? '100%' : '60px',
          [isMobile ? 'left' : 'top']: isMobile ? '0' : '-60px',
        }}>
          <motion.div
            className={`absolute ${isMobile ? 'h-full w-full' : 'w-full h-full'} bg-gradient-to-r from-primary to-secondary`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            style={{
              [isMobile ? 'width' : 'height']: isMobile ? '0%' : '0%',
            }}
          >
            <motion.div
              animate={{ 
                [isMobile ? 'width' : 'height']: '100%' 
              }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className={`${isMobile ? 'h-full' : 'w-full'} bg-gradient-to-r from-primary to-secondary`}
            />
          </motion.div>
        </div>
      )}
      
      {/* Social Icon Button */}
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          relative group z-10
          flex items-center justify-center
          rounded-full bg-gradient-to-br from-primary/20 to-secondary/20
          backdrop-blur-sm border border-primary/30
          transition-all duration-300
          ${isMobile ? 'w-12 h-12' : 'w-14 h-14'}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
        whileHover={{ scale: 1.1, rotate: 360 }}
      >
        <Icon className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-primary transition-all duration-300 group-hover:text-secondary`} />
        
        {/* Tooltip */}
        <div className={`
          absolute whitespace-nowrap px-3 py-1 rounded-lg bg-background/90 backdrop-blur-sm
          text-xs font-medium border border-primary/30 shadow-lg transition-all duration-300
          ${isMobile 
            ? 'bottom-full mb-2 left-1/2 -translate-x-1/2' 
            : 'left-full ml-3 top-1/2 -translate-y-1/2'
          }
          opacity-0 invisible group-hover:opacity-100 group-hover:visible
        `}>
          {label}
        </div>
      </motion.a>
    </div>
  );
};

// Right Side Social Panel
const SocialPanel = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const socialLinks = [
    { icon: Discord, label: "Discord Community", href: "https://discord.com/channels/1448729391659090073/1448729689563725965" },
    { icon: Github, label: "GitHub", href: "https://github.com/kabilanero" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/kabilan12-j/" },
    { icon: Twitter, label: "Twitter", href: "https://x.com/kabilrhode0000" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
    { icon: Mail, label: "Email", href: "mailto:kapilrhode0000@gmail.com" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={`
        fixed z-40
        ${isMobile 
          ? 'bottom-6 left-0 right-0 flex justify-center' 
          : 'left-6 top-1/2 -translate-y-1/2'
        }
      `}
    >
      <div className={`
        flex gap-4
        ${isMobile ? 'flex-row' : 'flex-col'}
      `}>
        {/* Discord Avatar Circle */}
        <motion.div
          className={`
            relative flex items-center justify-center
            bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
            rounded-full shadow-2xl border-2 border-white/20
            ${isMobile ? 'w-16 h-16' : 'w-20 h-20'}
          `}
          whileHover={{ scale: 1.05, rotate: -90, x: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-pulse opacity-50 blur-xl" />
          <Discord className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} text-white`} />
          
          {/* Online Status Indicator */}
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        </motion.div>

        {/* Connectors and Social Icons */}
        <div className={`
          flex gap-3 items-center
          ${isMobile ? 'flex-row ml-2' : 'flex-col'}
        `}>
          {socialLinks.map((link, index) => (
            <SocialConnector
              key={link.label}
              icon={link.icon}
              label={link.label}
              href={link.href}
              index={index}
              total={socialLinks.length}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const HeroOrbit = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Define transforms directly (not inside useMemo)
  const orbitX = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.4] : [0, 1],
    isMobile ? ["0%", "-55%"] : ["0%", "-35%"]
  );
  
  const orbitScale = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.4] : [0, 1],
    isMobile ? [1, 0.55] : [1, 0.7]
  );
  
  const orbitOpacity = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.35, 0.45] : [0, 0.8],
    isMobile ? [1, 1, 0] : [1, 0]
  );
  
  const profileX = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7],
    ["100%", "0%", "0%"]
  );
  
  const profileOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7],
    [0, 0, 1]
  );
  
  const instructionsY = useTransform(
    scrollYProgress,
    [0, 0.5, 0.8],
    [100, 100, 0]
  );
  
  const instructionsOpacity = useTransform(
    scrollYProgress,
    [0, 0.6, 0.9],
    [0, 0, 1]
  );

  // Dynamic gradient
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  const gradientStyle = useMemo(() => ({
    background: `linear-gradient(
      to bottom,
      hsl(var(--background)),
      hsl(262, ${50 + scrollProgress * 30}%, ${15 + scrollProgress * 20}%),
      hsl(var(--background))
    )`,
  }), [scrollProgress]);

  const orbitSize = "min(90vw, 600px)";

  return (
    <div id='home' ref={containerRef} className="relative min-h-[200vh]" style={gradientStyle}>
      <BlobBackground containerRef={containerRef} seed={12345} count={4} zIndex={10} />
      <MouseParticles />
      
      {/* Social Panel - replaces the old button */}
      <SocialPanel />

      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        
        {/* Orbit Section */}
        <motion.div
          style={{
            x: orbitX,
            scale: orbitScale,
            opacity: orbitOpacity,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative flex items-center justify-center">
            <div 
              className="orbit-ring animate-float rounded-full border-2 border-primary/30 shadow-2xl"
              style={{ width: orbitSize, height: orbitSize }}
            />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-4 md:space-y-6 max-w-[90%] md:max-w-full"
              >
                {/* Logo */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="inline-block rounded-full w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 mx-auto"
                >
                  <img src={Weblogo} alt="logo" className="w-full h-full object-contain" />
                </motion.div>

                <div className="md:-mt-6">
                  <div className="md:-mt-6">
                    <h1
                      className="font-bold tracking-tight leading-none "
                      style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
                    >
                      <p
                        className="bg-gradient-to-r from-primary via-secondary to-primary text-3xl flex flex-row gap-3 items-center justify-center
                     bg-clip-text text-transparent animate-pulse leading-none"
                      >
                       <span className="Building first-letter:text-4xl text-lg antialiased tracking-tight titan-one-regular"> We Build </span>
                        <RotatingText 
                          texts={[`React (Js/Ts ) `, ` Animated `, `Cool! site `, `Using `]}
                          mainClassName="sm:px-4 md:px-3 lg:px-6
                            bg-cyan-400 text-black overflow-hidden sm:py-1/2 md:py-1/2 justify-center rounded-lg text-2xl titan-one-regular"
                          staggerFrom={"last"}
                          initial={{ y: "100%" }}
                          exit={{ y: "-120%" }}
                          staggerDuration={0.085}
                          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                          transition={{ type: "spring", damping: 30, stiffness: 500 }}
                          rotationInterval={3000}
                        />
                      </p>
                      <span
                        className="text-[#fafafa]-500 leading-none"
                        style={{ fontSize: "clamp(1.1rem, 2vw, 0.45rem)" }}
                      >
                        Future ready web experiences
                      </span>
                    </h1>

                    <p
                      className="text-[#fcab29] max-w-md mx-auto mt-2 titan-one-regular"
                      style={{ fontSize: "clamp(0.875rem, 2.5vw, 1.0rem)" }}
                    >
                      Crafting digital experiences that push boundaries
                    </p>
                  </div>

                  <div className="flex gap-3 sm:gap-4 justify-center pt-2 sm:pt-2 flex-wrap mt-2">
                    <button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                      style={{
                        height: "clamp(2.25rem, 5vw, 2.75rem)",
                        padding: "0 clamp(1rem, 3vw, 2rem)",
                        fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                      }}
                    >
                      Get Started
                    </button>
                    <button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-primary/30 bg-background hover:bg-primary/10 text-foreground"
                      style={{
                        height: "clamp(2.25rem, 5vw, 2.75rem)",
                        padding: "0 clamp(1rem, 3vw, 2rem)",
                        fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                      }}
                    >
                      Learn More
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          style={{
            x: profileX,
            opacity: profileOpacity,
          }}
          className="absolute right-[5%] md:right-[10%] top-1/2 -translate-y-1/2 w-[280px] sm:w-[350px] md:w-[400px] lg:w-[450px]"
        >
          <div className="space-y-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-primary opacity-20 blur-2xl animate-pulse" />
              <div className="relative w-full h-full rounded-full border-4 border-primary/30 overflow-hidden bg-muted shadow-2xl">
                <img src={imgport} alt="Profile" className="w-full h-full object-cover object-top" />
              </div>
            </motion.div>

            <motion.div
              style={{
                y: instructionsY,
                opacity: instructionsOpacity,
              }}
              className="space-y-4 text-center"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Kabilan Developer
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg mt-1">
                  Full-Stack Developer & Creative Designer
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>Available for freelance & full-time work</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span>Based in India, TN</span>
                </div>
              </div>

              <div className="flex gap-2 sm:gap-3 justify-center pt-2 flex-wrap">
                {/* Social buttons removed from here - now in side panel */}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroOrbit;