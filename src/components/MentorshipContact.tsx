import { Button, Modal } from 'react-native';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Database, 
  Server, 
  Container, 
  Shield, 
  Globe, 
  Flame, 
  Code, 
  FileCode,
  Calendar,
  Clock,
  User,
  Mail,
  MessageSquare,
  Send,
  ChevronRight,
  X
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

const MentorshipContact = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
const [dialogMessage, setDialogMessage] = useState("");

  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    topic: "",
    message: ""
  });
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const mentorshipTopics = [
    {
      icon: Database,
      title: "MERN Stack",
      subtitle: "MongoDB, Express, React, Node.js",
      color: "from-green-500 to-emerald-600",
      details: "Master full-stack development with the MERN stack. Learn to build scalable web applications from database design to frontend implementation.",
      skills: ["MongoDB Atlas", "Express.js APIs", "React Hooks & Context", "Node.js Best Practices"]
    },
    {
      icon: Server,
      title: "MySQL & Redis",
      subtitle: "Relational DB & Caching",
      color: "from-blue-500 to-cyan-600",
      details: "Deep dive into relational database design and high-performance caching strategies for enterprise applications.",
      skills: ["Query Optimization", "Database Indexing", "Redis Caching", "Data Modeling"]
    },
    {
      icon: Container,
      title: "Docker",
      subtitle: "Containerization & DevOps",
      color: "from-sky-500 to-blue-600",
      details: "Learn containerization, multi-stage builds, docker-compose, and deployment strategies for modern applications.",
      skills: ["Dockerfile Writing", "Multi-container Apps", "Volume Management", "Docker Networks"]
    },
    {
      icon: Shield,
      title: "Nginx & Ngrok",
      subtitle: "Reverse Proxy & Tunneling",
      color: "from-purple-500 to-violet-600",
      details: "Configure production-grade web servers, load balancers, and secure tunneling for development and deployment.",
      skills: ["Server Blocks", "SSL/TLS Setup", "Load Balancing", "Secure Tunnels"]
    },
    {
      icon: Flame,
      title: "Firebase",
      subtitle: "Backend as a Service",
      color: "from-orange-500 to-amber-600",
      details: "Build real-time applications with Firebase's powerful suite of tools including authentication, firestore, and cloud functions.",
      skills: ["Firestore", "Auth Integration", "Cloud Functions", "Real-time Updates"]
    },
    {
      icon: Code,
      title: "HTML, CSS, JavaScript",
      subtitle: "Web Fundamentals",
      color: "from-yellow-500 to-orange-500",
      details: "Master the core technologies of the web. Build responsive, accessible, and performant websites from scratch.",
      skills: ["Semantic HTML", "CSS Grid & Flexbox", "ES6+ JavaScript", "DOM Manipulation"]
    },
    {
      icon: FileCode,
      title: "TypeScript",
      subtitle: "Type-Safe Development",
      color: "from-blue-600 to-indigo-600",
      details: "Level up your JavaScript with static typing. Learn advanced TypeScript patterns for scalable codebases.",
      skills: ["Type System", "Generics", "Utility Types", "Advanced Patterns"]
    }
  ];

const handleBookingSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3000/api/forms/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    const result = await response.json();

    if (response.ok) {
      setDialogMessage("Your booking request has been successfully submitted!");
      setDialogOpen(true);

      setShowBookingForm(false);
      setBookingData({
        name: "",
        email: "",
        date: "",
        time: "",
        topic: "",
        message: "",
      });
    } else {
      setDialogMessage("Failed to send booking request. Try again.");
      setDialogOpen(true);
    }
  } catch (error) {
    setDialogMessage("Something went wrong. Server error!");
    setDialogOpen(true);
  }
};



 const handleContactSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3000/api/forms/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    });

    const result = await response.json();

    if (response.ok) {
      setDialogMessage("Your message has been sent successfully!");
      setDialogOpen(true);

      setContactData({
        name: "",
        email: "",
        phone: "",
        country: "",
        message: "",
      });
    } else {
      setDialogMessage("Failed to send your message. Please try again.");
      setDialogOpen(true);
    }
  } catch (error) {
    setDialogMessage("Server error. Please try again later.");
    setDialogOpen(true);
  }
};


  return (
    <section id='contact' className="min-h-screen bg-background py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Mentorship & <span className="text-primary">Contact</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get personalized guidance in web development or reach out for your next project
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Section - Mentorship Cards */}
          <div className="space-y-4">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold text-foreground mb-6"
            >
              <Globe className="inline-block w-6 h-6 mr-2 text-primary" />
              Web Development Mentorship
            </motion.h3>

            <div className="space-y-3">
              {mentorshipTopics.map((topic, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <motion.div
                    className={`
                      relative overflow-hidden rounded-2xl border border-border/50
                      bg-card/80 backdrop-blur-sm cursor-pointer
                      transition-all duration-500 ease-out
                    `}
                    onHoverStart={() => setExpandedCard(index)}
                    onHoverEnd={() => setExpandedCard(null)}
                    animate={{
                      height: expandedCard === index ? "auto" : "80px"
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {/* Gradient Top Bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${topic.color}`} />
                    
                    {/* Card Content */}
                    <div className="p-4">
                      {/* Header Row */}
                      <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${topic.color} text-white`}>
                          <topic.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{topic.title}</h4>
                          <p className="text-sm text-muted-foreground">{topic.subtitle}</p>
                        </div>
                        <ChevronRight 
                          className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                            expandedCard === index ? "rotate-90" : ""
                          }`} 
                        />
                      </div>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {expandedCard === index && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="mt-4 pt-4 border-t border-border/50"
                          >
                            <p className="text-muted-foreground text-sm mb-4">
                              {topic.details}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {topic.skills.map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${topic.color} text-white`}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </motion.div>
              ))}

              {/* Book Mentorship Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                onClick={() => setShowBookingForm(true)}
                className="w-full mt-6 py-4 px-6 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold text-lg
                  hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Book Mentorship Session
              </motion.button>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-8 h-fit"
          >
            <div className="rounded-3xl border border-border/50 bg-card/80 backdrop-blur-sm p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-2 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-primary" />
                Get in Touch
              </h3>
              <p className="text-muted-foreground mb-8">
                Have a project in mind? Let's discuss how we can work together.
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground
                      placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50
                      transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    placeholder="Gmail/Work mail"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground
                      placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50
                      transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    Subject
                  </label>
                  <input
                    type="text"
                    value={contactData.subject}
                    onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                    placeholder="Project Inquiry"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground
                      placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50
                      transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    Message
                  </label>
                  <textarea
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground
                      placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50
                      transition-all duration-200 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-foreground text-background font-semibold
                    hover:bg-foreground/90 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Booking Form Modal */}
      <AnimatePresence>
        {showBookingForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowBookingForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-3xl border border-border bg-card p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-foreground">Book a Session</h3>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Name
                    </label>
                    <input
                      type="text"
                      value={bookingData.name}
                      onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground
                        placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground
                        placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground
                        focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      value={bookingData.time}
                      onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground
                        focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Topic of Interest</label>
                  <select
                    value={bookingData.topic}
                    onChange={(e) => setBookingData({ ...bookingData, topic: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground
                      focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  >
                    <option value="">Select a topic</option>
                    {mentorshipTopics.map((topic, index) => (
                      <option key={index} value={topic.title}>{topic.title}</option>
                    ))}
                    <option value="General">General Guidance</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Additional Notes</label>
                  <textarea
                    value={bookingData.message}
                    onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                    placeholder="What would you like to learn?"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground
                      placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold
                    hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Confirm Booking
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
  <DialogContent className="rounded-2xl p-6 max-w-sm text-center">
    <DialogHeader>
      <DialogTitle className="text-xl font-semibold text-foreground">
        {dialogMessage.includes("successfully") ? "Success 🎉" : "Notice"}
      </DialogTitle>
      <DialogDescription className="text-muted-foreground mt-2">
        {dialogMessage}
      </DialogDescription>
    </DialogHeader>

    <button
      onClick={() => setDialogOpen(false)}
      className="mt-4 w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
    >
      OK
    </button>
  </DialogContent>
</Dialog>


    </section>
  );
};

export default MentorshipContact;