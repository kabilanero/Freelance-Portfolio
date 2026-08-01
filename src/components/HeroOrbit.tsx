import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import imgport from "../assests/WhatsApp Image 2024-09-20 at 12.12.36 PM-removebg-preview-Photoroom.jpg";
import resume from "../assests/KABILANJ RESUME-Compressed.pdf";
import RotatingText from "./ui/Orbitcontent";
import SocialPanel from "./Socialconnector";

/**
 * Hero — single viewport, no scroll-jacking, no per-frame canvas/JS.
 * All motion is either a one-time mount animation (framer-motion, cheap),
 * a GPU-only translate (cursor-parallax layers on the portrait), or a
 * pure CSS animation (word-rise, clay wobble, ticker) defined in index.css.
 */

const skills = [
  "Web Development",
  "Technical SEO",
  "Core Web Vitals",
  "Site Speed",
  "On-Page SEO",
  "React & TypeScript",
  "Responsive Design",
  "Indexing & Ranking",
];

// Sparkle points evenly spread around the photo's edge, each twinkling
// on its own delay — a "glitter" ring with no drawn circle.
const SPARKLES = [18, 62, 104, 146, 188, 230, 272, 314].map((deg, i) => {
  const rad = (deg * Math.PI) / 180;
  return {
    top: 50 + 49 * Math.sin(rad),
    left: 50 + 49 * Math.cos(rad),
    size: i % 3 === 0 ? 5 : 3,
    delay: (i * 0.35).toFixed(2),
    duration: (2 + (i % 3) * 0.6).toFixed(2),
  };
});

const HeroOrbit = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Raw pointer position, normalized to -0.5..0.5 relative to the hero section.
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  // Each layer springs toward the pointer at its own speed/damping —
  // that difference in lag is what reads as "depth". Pure translate, GPU-only.
  const springCfg = { stiffness: 60, damping: 18, mass: 0.6 };
  const glowX = useSpring(useTransform(px, [-0.5, 0.5], [-18, 18]), springCfg);
  const glowY = useSpring(useTransform(py, [-0.5, 0.5], [-14, 14]), springCfg);

  const photoX = useSpring(useTransform(px, [-0.5, 0.5], [-14, 14]), { stiffness: 110, damping: 16, mass: 0.4 });
  const photoY = useSpring(useTransform(py, [-0.5, 0.5], [-10, 10]), { stiffness: 110, damping: 16, mass: 0.4 });

  const handlePointerMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative min-h-screen overflow-hidden bg-background"
    >
      {/* Static ambient glow — pure CSS, no scroll listener, no repaint cost */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 78% 20%, hsl(var(--primary) / 0.16) 0%, transparent 60%), radial-gradient(45% 40% at 15% 75%, hsl(var(--secondary) / 0.12) 0%, transparent 60%)",
        }}
      />

      <SocialPanel />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 pt-32 pb-16 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          {/* ── Left: kinetic headline & copy ─────────────────────── */}
          <div>
            <div
              className="fade-up mb-6 flex items-center gap-2 font-mono-alt text-xs uppercase tracking-[0.18em] text-perf"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="h-px w-6 bg-perf" />
              Freelance Developer · SEO Performance .Devops
            </div>

            <h1 className="font-display text-[clamp(2.4rem,6vw,5.2rem)] font-bold leading-[0.98] tracking-tight text-foreground">
              <span className="block overflow-hidden">
                <span
                  className="word-rise"
                  style={{ animationDelay: "0.25s" }}
                >
                  Websites that
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="word-rise bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                  style={{ animationDelay: "0.37s" }}
                >
                  rank first.
                </span>
              </span>
              <span className="mt-1 flex flex-wrap items-center gap-3">
                <span
                  className="fade-up"
                  style={{ animationDelay: "0.55s" }}
                >
                  Load
                </span>
                <span
                  className="fade-up"
                  style={{ animationDelay: "0.65s" }}
                >
                  <RotatingText
                    texts={["faster.", "cleaner.", "smoother."]}
                    mainClassName="inline-flex rounded-lg bg-perf px-4 py-1.5 text-perf-foreground text-[0.55em] leading-none font-display"
                    staggerFrom="center"
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: [0, -9, 0] }}
                    exit={{ opacity: 0, y: 0 }}
                    staggerDuration={0.028}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    rotationInterval={2400}
                  />
                </span>
              </span>
            </h1>

            <p
              className="fade-up mt-7 max-w-md text-base text-muted-foreground sm:text-lg"
              style={{ animationDelay: "0.85s" }}
            >
              I build and optimize websites and web-applications for founders who need more than
              a pretty layout — clean code, high PageSpeed scores, and pages
              Google actually wants to rank.
            </p>

            <div
              className="fade-up mt-9 flex flex-wrap items-center gap-5"
              style={{ animationDelay: "1s" }}
            >
              <a
                href="mailto:kapilrhode0000@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-mono-alt text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Start a project →
              </a>
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-border pb-1 font-mono-alt text-sm text-foreground transition-colors hover:border-foreground"
              >
                Download resume
              </a>
            </div>

            <div
              className="fade-up mt-14 flex max-w-lg flex-wrap gap-10 border-t border-border pt-7"
              style={{ animationDelay: "1.1s" }}
            >
              <div>
                <div className="font-display text-3xl font-bold text-foreground">
                  15<span className="text-perf">+</span>
                </div>
                <div className="mt-1 font-mono-alt text-[11px] uppercase tracking-wide text-muted-foreground">
                  Sites shipped
                </div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-foreground">
                  2<span className="text-perf">yrs</span>
                </div>
                <div className="mt-1 font-mono-alt text-[11px] uppercase tracking-wide text-muted-foreground">
                  Industry experience
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: layered cursor-parallax portrait ───────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto flex flex-col items-center gap-6 justify-self-center lg:justify-self-end"
          >
            <div className="relative h-72 w-72 sm:h-80 sm:w-80">
              {/* Layer 1 — ambient glow, slowest, furthest back */}
              <motion.div
                aria-hidden
                style={{ x: glowX, y: glowY }}
                className="absolute -inset-10 rounded-full bg-gradient-to-br from-primary/25 via-secondary/15 to-transparent blur-3xl"
              />

              {/* Layer 2 — the claymorphic photo card, with a glitter edge */}
              <motion.div
                style={{ x: photoX, y: photoY }}
                className="clay-shape clay-shadow absolute inset-0 overflow-hidden bg-gradient-to-br from-card to-muted"
              >
                <img
                  src={imgport}
                  alt="Kabilan — Web Developer & SEO Specialist"
                  className="h-full w-full object-cover object-top"
                />
              </motion.div>

              {/* Glitter — twinkling sparkles right at the photo's edge, no drawn ring */}
              {SPARKLES.map((s, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="glitter-dot"
                  style={{
                    top: `${s.top}%`,
                    left: `${s.left}%`,
                    width: s.size,
                    height: s.size,
                    animationDelay: `${s.delay}s`,
                    animationDuration: `${s.duration}s`,
                  }}
                />
              ))}

              {/* Two dots orbiting the photo on an invisible path, opposite directions */}
              <div className="absolute -inset-4" aria-hidden>
                <div className="absolute inset-0 orbit-cw">
                  <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-perf shadow-[0_0_12px_hsl(var(--perf)/0.8)]" />
                </div>
              </div>
              <div className="absolute -inset-4 rotate-180" aria-hidden>
                <div className="absolute inset-0 orbit-ccw">
                  <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary shadow-[0_0_10px_hsl(var(--secondary)/0.7)]" />
                </div>
              </div>
            </div>

            <div className="text-center">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Kabilan
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Full-Stack Developer &amp; SEO Specialist
              </p>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-perf" />
                Available for freelance &amp; full-time work
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom skills ticker — pure CSS marquee, no JS per frame ── */}
      <div className="relative z-10 border-t border-border/70 py-5">
        <div className="flex w-max ticker-track">
          {[...skills, ...skills].map((skill, i) => (
            <span
              key={i}
              className="flex items-center gap-7 whitespace-nowrap px-7 font-mono-alt text-xs uppercase tracking-wide text-muted-foreground"
            >
              {skill}
              <span className="text-perf text-[8px]">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroOrbit;