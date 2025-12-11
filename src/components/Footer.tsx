import { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Star,
  ExternalLink
} from "lucide-react";

const Footer = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Reviews data with platform info
  const reviews = [
    { name: "Alex Johnson", rating: 5, text: "Exceptional developer! Delivered beyond expectations.", platform: "Fiverr", avatar: "AJ" },
    { name: "Sarah Chen", rating: 5, text: "Outstanding MERN stack expertise. Highly recommended!", platform: "Upwork", avatar: "SC" },
    { name: "Mike Peters", rating: 5, text: "Professional, timely, and excellent communication.", platform: "LinkedIn", avatar: "MP" },
    { name: "Emily Davis", rating: 5, text: "Best freelancer I've worked with. 10/10!", platform: "Freelancer", avatar: "ED" },
    { name: "David Kim", rating: 5, text: "Incredible attention to detail and clean code.", platform: "Toptal", avatar: "DK" },
    { name: "Lisa Wang", rating: 5, text: "Transformed our vision into reality perfectly.", platform: "Fiverr", avatar: "LW" },
    { name: "James Brown", rating: 5, text: "Fast delivery and exceptional quality.", platform: "Upwork", avatar: "JB" },
    { name: "Anna Martinez", rating: 5, text: "A true full-stack expert. Will hire again!", platform: "LinkedIn", avatar: "AM" },
  ];

  // Social media links
  const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com/kabilanero", color: "hover:text-[#6e5494]" },
    { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/kabilan12-j/", color: "hover:text-[#0077b5]" },
    { name: "Twitter", icon: Twitter, url: "https://x.com/kabilrhode0000", color: "hover:text-[#1da1f2]" },
    { name: "Instagram", icon: Instagram, url: "https://instagram.com", color: "hover:text-[#e4405f]" },
    { name: "YouTube", icon: Youtube, url: "https://youtube.com", color: "hover:text-[#ff0000]" },
  ];

  // Freelance platforms
  const freelancePlatforms = [
    { name: "Fiverr", url: "https://fiverr.com", color: "#1dbf73" },
    { name: "Upwork", url: "https://upwork.com", color: "#6fda44" },
    { name: "Freelancer", url: "https://freelancer.com", color: "#29b2fe" },
    { name: "Toptal", url: "https://toptal.com", color: "#204ecf" },
    { name: "99designs", url: "https://99designs.com", color: "#ff7c00" },
    { name: "PeoplePerHour", url: "https://peopleperhour.com", color: "#ff6900" },
  ];

  // Trust badges
  const trustBadges = [
    { label: "Projects Completed", value: "20+" },
    { label: "Happy Clients", value: "15+" },
    { label: "Years Experience", value: "1+" },
    { label: "5-Star Reviews", value: "10+" },
  ];

  // Infinite scroll animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => prev + 1);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Platform badge colors
  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      Fiverr: "bg-[#1dbf73]/20 text-[#1dbf73]",
      Upwork: "bg-[#6fda44]/20 text-[#6fda44]",
      LinkedIn: "bg-[#0077b5]/20 text-[#0077b5]",
      Freelancer: "bg-[#29b2fe]/20 text-[#29b2fe]",
      Toptal: "bg-[#204ecf]/20 text-[#204ecf]",
    };
    return colors[platform] || "bg-primary/20 text-primary";
  };

  return (
    <footer className="relative w-full overflow-hidden bg-gradient-to-b from-background via-background to-[hsl(220,20%,8%)]">
      {/* Animated Wave Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute bottom-0 left-0 w-[200%] h-64 opacity-10"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="hsl(var(--primary))"
            fillOpacity="0.3"
            className="animate-[wave_15s_ease-in-out_infinite]"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-[200%] h-48 opacity-20"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="hsl(var(--primary))"
            fillOpacity="0.4"
            className="animate-[wave_12s_ease-in-out_infinite_reverse]"
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,106.7C672,117,768,171,864,181.3C960,192,1056,160,1152,133.3C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-[200%] h-32 opacity-30"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="hsl(var(--primary))"
            fillOpacity="0.5"
            className="animate-[wave_8s_ease-in-out_infinite]"
            d="M0,256L48,261.3C96,267,192,277,288,261.3C384,245,480,203,576,197.3C672,192,768,224,864,218.7C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Section 1: Reviews & Trust Ratings */}
      <div className="relative z-10 py-8 border-b border-border/20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex flex-col items-center px-6 py-3 bg-card/30 backdrop-blur-sm rounded-xl border border-border/30 hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                <span className="text-2xl font-bold text-primary">{badge.value}</span>
                <span className="text-xs text-muted-foreground">{badge.label}</span>
              </div>
            ))}
          </div>

          {/* Infinite Scroll Reviews */}
          <div className="relative overflow-hidden py-4">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
            
            <div
              className="flex gap-6 transition-transform duration-100"
              style={{ transform: `translateX(-${scrollPosition % (reviews.length * 320)}px)` }}
            >
              {[...reviews, ...reviews, ...reviews].map((review, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-72 p-4 bg-card/40 backdrop-blur-sm rounded-xl border border-border/30 hover:border-primary/50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-sm font-bold text-primary-foreground">
                      {review.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{review.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getPlatformColor(review.platform)}`}>
                        {review.platform}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={12} className="fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">"{review.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Links & Contact */}
      <div className="relative z-10 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Social Media Links */}
            <div className="text-center md:text-left">
              <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Connect With Me</h4>
              <div className="flex justify-center md:justify-start gap-3 mb-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full bg-card/50 border border-border/30 flex items-center justify-center text-muted-foreground transition-all duration-300 hover:scale-110 hover:border-primary/50 ${social.color}`}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Freelance Platforms */}
            <div className="text-center">
              <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Hire Me On</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {freelancePlatforms.map((platform, index) => (
                  <a
                    key={index}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-card/50 border border-border/30 rounded-full text-xs text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300 hover:scale-105 group"
                  >
                    <span style={{ color: platform.color }} className="font-medium">{platform.name}</span>
                    <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-right">
              <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Get In Touch</h4>
              <div className="space-y-2">
                <a href="mailto:hello@example.com" className="flex items-center justify-center md:justify-end gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <Mail size={14} />
                  <span>kapilrhode0000@gmail.com</span>
                </a>
                <a href="tel:+1234567890" className="flex items-center justify-center md:justify-end gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <Phone size={14} />
                  <span>+918608214689</span>
                </a>
                <div className="flex items-center justify-center md:justify-end gap-2 text-xs text-muted-foreground">
                  <MapPin size={14} />
                  <span>TN, INDIA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-4 border-t border-border/20 text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} KABILAN J 
            </p>
          </div>
        </div>
      </div>

      {/* Wave Animation Keyframes */}
      <style>{`
        @keyframes wave {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-25%) translateY(10px); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
