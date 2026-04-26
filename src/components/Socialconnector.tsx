import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, DiscIcon as Discord, Mail, X, Share2 } from 'lucide-react';

const socialLinks = [
  { icon: Discord,   label: 'Discord',   href: 'https://discord.com/channels/1448729391659090073/1448729689563725965' },
  { icon: Github,    label: 'GitHub',    href: 'https://github.com/kabilanero' },
  { icon: Linkedin,  label: 'LinkedIn',  href: 'https://www.linkedin.com/in/kabilan12-j/' },
  { icon: Twitter,   label: 'Twitter',   href: 'https://x.com/kabilrhode0000' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Mail,      label: 'Email',     href: 'mailto:kapilrhode0000@gmail.com' },
];

// ── Desktop: fixed left vertical strip ────────────────────────────────────────
const DesktopSocialPanel = () => (
  <motion.div
    initial={{ opacity: 0, x: -40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.5 }}
    className="fixed left-5 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 items-center"
  >
    <motion.div
      className="relative flex items-center justify-center w-14 h-14
        bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
        rounded-full shadow-2xl border-2 border-white/20 mb-1"
      whileHover={{ scale: 1.08 }}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-pulse opacity-40 blur-xl" />
      <Discord className="w-7 h-7 text-white" />
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
    </motion.div>

    <div className="w-px h-4 bg-primary/30" />

    {socialLinks.map((link, i) => (
      <motion.a
        key={link.label}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group flex items-center justify-center w-11 h-11 rounded-full
          bg-gradient-to-br from-primary/20 to-secondary/20
          backdrop-blur-sm border border-primary/30 transition-all duration-300"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.08, type: 'spring', stiffness: 300 }}
        whileHover={{ scale: 1.15 }}
      >
        <link.icon className="w-5 h-5 text-primary group-hover:text-secondary transition-colors duration-300" />
        <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2
          whitespace-nowrap px-2 py-1 rounded-md bg-background/90 backdrop-blur-sm
          text-xs font-medium border border-primary/30 shadow-lg
          opacity-0 invisible group-hover:opacity-100 group-hover:visible
          transition-all duration-200 pointer-events-none z-50">
          {link.label}
        </span>
      </motion.a>
    ))}
  </motion.div>
);

// ── Mobile ─────────────────────────────────────────────────────────────────────
const MobileSocialPanel = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > 60;
      setScrolled(past);
      if (past) setExpanded(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* BEFORE SCROLL — horizontal pill strip, fixed top center, below navbar */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            key="strip"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24, transition: { duration: 0.18 } }}
            transition={{ duration: 0.35, type: 'spring', stiffness: 300, damping: 26 }}
            className="fixed top-[142px] -left-6 right-0 z-40 flex justify-center pointer-events-none"
          >
            <div className="flex flex-row items-center gap-2 pointer-events-auto
              bg-black/50 backdrop-blur-md border border-primary/25
              rounded-full px-3 py-2 shadow-xl"
            >
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full
                    bg-gradient-to-br from-primary/20 to-secondary/20
                    border border-primary/30 backdrop-blur-sm
                    active:scale-90 transition-transform"
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06, type: 'spring', stiffness: 400, damping: 22 }}
                  whileTap={{ scale: 0.85 }}
                >
                  <link.icon className="w-4 h-4 text-primary" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AFTER SCROLL — single pill top-right, tap to expand */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            key="pill"
            initial={{ opacity: 0, scale: 0.5, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: 30, transition: { duration: 0.15 } }}
            transition={{ type: 'spring', stiffness: 350, damping: 26 }}
            className="fixed top-4 right-4 z-50"
          >
            {/* Collapsed single button */}
            <AnimatePresence>
              {!expanded && (
                <motion.button
                  key="btn"
                  onClick={() => setExpanded(true)}
                  className="w-11 h-11 top-[700px] right-4 rounded-full flex items-center justify-center
                    bg-gradient-to-br from-primary via-purple-500 to-secondary
                    border-2 border-white/20 shadow-xl relative"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  whileTap={{ scale: 0.88 }}
                >
                  <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                  <Share2 className="w-5 h-5 text-white relative z-10" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Expanded horizontal row */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, scaleX: 0.2, originX: 1 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  exit={{ opacity: 0, scaleX: 0.2 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                  className="flex flex-row items-center gap-2
                    bg-black/70 backdrop-blur-md border border-primary/30
                    rounded-full px-3 py-2 shadow-2xl"
                >
                  {socialLinks.map((link, i) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-9 h-9 rounded-full
                        bg-gradient-to-br from-primary/25 to-secondary/25
                        border border-primary/30 active:scale-90 transition-transform"
                      initial={{ opacity: 0, scale: 0.3 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04, type: 'spring', stiffness: 400, damping: 22 }}
                    >
                      <link.icon className="w-4 h-4 text-primary" />
                    </motion.a>
                  ))}
                  <motion.button
                    onClick={() => setExpanded(false)}
                    className="flex items-center justify-center w-9 h-9 rounded-full
                      bg-white/10 border border-white/20 ml-1"
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: socialLinks.length * 0.04 }}
                    whileTap={{ scale: 0.85 }}
                  >
                    <X className="w-4 h-4 text-white/70" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ── Main export ────────────────────────────────────────────────────────────────
const SocialPanel = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile ? <MobileSocialPanel /> : <DesktopSocialPanel />;
};

export default SocialPanel;