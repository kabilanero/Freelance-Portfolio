import { Image } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import imgport from "../assests/WhatsApp Image 2024-09-20 at 12.12.36 PM-removebg-preview-Photoroom.jpg";
import Weblogo from "../assests/Weblogo.png";
import RotatingText from "./ui/Orbitcontent";
import BlobBackground from './ui/blobeffect';
import { Code } from 'lucide-react';


const MouseParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const mouse = { x: null, y: null };

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1;
        this.speedY = Math.random() * 3 - 1;
        this.opacity = 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.01;
        if (this.size > 0.2) this.size -= 0.05;
      }

      draw() {
        ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(139, 92, 246, 0.8)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(mouse.x, mouse.y));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].opacity <= 0 || particles[i].size <= 0.2) {
          particles.splice(i, 1);
          i--;
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
};

const HeroOrbit = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) =>
      setScrollProgress(v)
    );
    return () => unsubscribe();
  }, [scrollYProgress]);

  const isMobile = window.innerWidth < 768;

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
    isMobile ? [0.0, 0.35, 0.45] : [0, 1],
    isMobile ? [1, 1, 0] : [1, 1] // desktop stays always visible
  );

  // Content stays visible, just shrinks with the orbit

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

  // Dynamic gradient based on scroll - primary color palette
  const gradientStyle = {
    background: `linear-gradient(
      to bottom,
      hsl(var(--background)),
      hsl(262, ${50 + scrollProgress * 30}%, ${15 + scrollProgress * 20}%),
      hsl(var(--background))
    )`,
  };

  return (
    <div id='home'
      ref={containerRef}
      className="relative min-h-[300vh] transition-all duration-500 "
      style={gradientStyle}
    >
   
<BlobBackground containerRef={containerRef} seed={12345} count={5} zIndex={10} />

      <MouseParticles />

      

      {/* Fixed viewport container */}
      <div className="sticky top-10 h-screen overflow-hidden">

<button
  onClick={() => window.open("https://discord.com/channels/1448729391659090073/1448729689563725965", "_blank")}
  className="
    absolute top-[7rem] md:top-8 left-1/2 -translate-x-1/2 z-50
    flex items-center gap-3 px-7 py-3
    rounded-2xl
    backdrop-blur-md bg-white/10 
    border border-white/20
    text-white
    shadow-[0_0_25px_rgba(255,255,255,0.1)]
    hover:bg-white/20 hover:border-white/30 
    transition-all duration-300
  "
>
  <span className="font-semibold tracking-wide">{`</> Join Our Dev-Community`}</span>
</button>








        {/* Orbit Section */}
        <motion.div
          style={{
            x: orbitX,
            scale: orbitScale,
            opacity: orbitOpacity, // ← ADD THIS
          }}
          className="absolute inset-0 flex items-center justify-center "
        >
          <div className="relative flex items-center justify-center ">
            {/* The Orbit Ring - Responsive */}
            <div
              className="orbit-ring animate-float"
               style={{
      width: "min(95vw, 650px)",   // bigger on mobile
      height: "min(95vw, 650px)",
    }}
            />

            {/* Content Inside Orbit - stays visible, shrinks with orbit */}
            <div className="absolute inset-0 -mt-10 md:-mt-12 flex flex-col items-center justify-center text-center px-4 sm:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-4 sm:space-y-6"
              >
                {/* Logo */}
                <div
                  className="
                          inline-block rounded-full md:-mt-[40px] -mt-[60px]
                          w-[120px] h-[120px]
                          sm:w-[150px] sm:h-[150px]
                          md:w-[200px] md:h-[200px]
                          lg:w-[250px] lg:h-[250px]
                        "
                >
                  <img
                    src={Weblogo}
                    alt="logo"
                    className="w-full h-full mt-4"
                  />
                </div>
                <div className="md:-mt-6">
                  <div className="md:-mt-6">
                    <h1
                      className="font-bold tracking-tight leading-none "
                      style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
                    >
                      <p
                        className="bg-gradient-to-r from-primary via-secondary to-primary  text-3xl flex flex-row gap-3 items-center justify-center
                     bg-clip-text text-transparent animate-pulse leading-none"
                      >
                       <span className="Building first-letter:text-4xl text-lg antialiased tracking-tight titan-one-regular"> Building </span>
                        <RotatingText 
        texts={[`React `, `Js `, `Animated `, `Cool! site `, `Using `]}
        mainClassName="sm:px-4 md:px-3 lg:px-6
bg-cyan-400 text-black overflow-hidden  sm:py-1/2 md:py-1/2 justify-center rounded-lg text-2xl titan-one-regular"
        staggerFrom={"last"}
        initial={{ y: "100%" }}
        exit={{ y: "-120%" }}
        staggerDuration={0.075}
        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
        transition={{ type: "spring", damping: 30, stiffness: 500 }}
        rotationInterval={2000}
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

        <motion.div
          style={{
            x: profileX,
            opacity: profileOpacity,
          }}
          className="absolute right-[12%] sm:right-[19%] md:right-[18%]  md:translate-x-0 translate-x-1/2 top-1/4 -translate-y-1/2 w-[300px] md:w-[450px] "
        >
          <div className="space-y-6">
            {/* Profile Image */}
            <div className="relative w-64 h-64 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-primary opacity-20 blur-2xl" />
              <div className="relative w-full h-full rounded-full border-4 border-primary/30 overflow-hidden bg-muted">
                <img
                  src={imgport}
                  alt="Profile"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Instructions - Fade up */}
            <motion.div
              style={{
                y: instructionsY,
                opacity: instructionsOpacity,
              }}
              className="space-y-4 text-center"
            >
              <h2 className="text-3xl font-bold text-foreground">
                Kabilan Developer
              </h2>
              <p className="text-muted-foreground text-lg">
                Full-Stack Developer & Creative Designer
              </p>

              <div className="pt-4 space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>Available for freelance and fulltime Work</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span>Based in INDIA, TN</span>
                </div>
              </div>

             <div className="flex gap-3 justify-center pt-4">
  {[
    { name: "GitHub", url: "https://github.com/kabilanero" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/kabilan12-j/" },
    { name: "Twitter", url: "https://x.com/kabilrhode0000" },
  ].map((platform) => (
    <a
      key={platform.name}
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 border border-border hover:border-primary/50 transition-all duration-300 text-sm font-medium"
    >
      {platform.name}
    </a>
  ))}
</div>

            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroOrbit;
