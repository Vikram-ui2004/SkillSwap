import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { 
  BookOpen, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Youtube,
  Mail,
  ArrowUp,
  Heart,
  Sparkles,
  Globe,
  Users,
  Award,
  MessageCircle,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import whitelogo from '../assets/white-logo.png'; 

const FooterLink = ({ href, children, icon: Icon, external = false }) => (
  <motion.a 
    href={href} 
    className="group flex items-center text-purple-200/80 hover:text-white transition-all duration-300 text-sm font-medium"
    whileHover={{ x: 5 }}
    whileTap={{ scale: 0.95 }}
  >
    {Icon && <Icon className="h-4 w-4 mr-2 opacity-70 group-hover:opacity-100 transition-opacity" />}
    <span className="relative">
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 group-hover:w-full transition-all duration-300" />
    </span>
    {external && <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />}
  </motion.a>
);

const SocialIcon = ({ href, icon: Icon, label, color }) => (
  <motion.a
    href={href}
    className={`p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-purple-200 hover:text-white transition-all duration-300 group relative overflow-hidden ${color}`}
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.95 }}
    aria-label={label}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      initial={{ scale: 0 }}
      whileHover={{ scale: 1 }}
    />
    <Icon className="h-5 w-5 relative z-10" />
  </motion.a>
);

// Custom hook for count up animation
const useCountUp = (target, isVisible) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const stepTime = 16; // ~60fps
    const steps = Math.ceil(duration / stepTime);
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, isVisible]);

  return count;
};

const AnimatedNumber = ({ target, suffix = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const count = useCountUp(target, isVisible);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => setIsVisible(true)}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      {count.toLocaleString()}{suffix}
    </motion.span>
  );
};

const StatsCounter = ({ number, label, icon: Icon }) => {
  // Parse number and suffix
  const parseNumber = (numStr) => {
    if (typeof numStr === 'string') {
      const match = numStr.match(/([0-9,.]+)(.*)/);
      if (match) {
        const value = parseFloat(match[1].replace(/,/g, ''));
        const suffix = match[2];
        
        // Handle K, M multipliers
        let multiplier = 1;
        if (suffix.includes('K')) {
          multiplier = 1000;
        } else if (suffix.includes('M')) {
          multiplier = 1000000;
        }
        
        return {
          value: Math.floor(value * multiplier),
          suffix: suffix
        };
      }
    }
    return { value: parseInt(numStr) || 0, suffix: '' };
  };

  const { value, suffix } = parseNumber(number);

  return (
    <motion.div
      className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex items-center justify-center mb-2">
        <Icon className="h-6 w-6 text-purple-300 mr-2" />
        <motion.span
          className="text-2xl font-black text-white"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          viewport={{ once: true }}
        >
          <AnimatedNumber target={value} suffix={suffix} />
        </motion.span>
      </div>
      <p className="text-purple-200/80 text-sm font-medium">{label}</p>
    </motion.div>
  );
};

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
    setEmail('');
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
      <div className="flex items-center mb-4">
        <Mail className="h-5 w-5 text-purple-300 mr-2" />
        <h3 className="text-lg font-black text-white">Stay Updated</h3>
        <Sparkles className="h-4 w-4 text-purple-300 ml-2" />
      </div>
      <p className="text-purple-200/80 text-sm mb-4 leading-relaxed">
        Get the latest updates, exclusive tips, and new feature announcements.
      </p>
      
      <AnimatePresence mode="wait">
        {!isSubscribed ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex gap-2"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200/60 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all text-sm"
              required
            />
            <motion.button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-bold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            className="flex items-center justify-center py-3 px-4 bg-emerald-500/20 border border-emerald-400/30 rounded-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Heart className="h-4 w-4 text-emerald-300 mr-2" />
            <span className="text-emerald-100 font-semibold text-sm">Thank you for subscribing!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, 0], 
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, -100, 0], 
            y: [0, 50, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating Particles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <motion.div 
          className="py-12 border-b border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white mb-2">Join Our Growing Community</h2>
            <p className="text-purple-200/80 text-lg">Connecting learners and teachers worldwide</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatsCounter number="10,000+" label="Active Users" icon={Users} />
            <StatsCounter number="5,000+" label="Skills Taught" icon={BookOpen} />
            <StatsCounter number="25,000+" label="Sessions Completed" icon={Award} />
            <StatsCounter number="92%" label="Satisfaction Rate" icon={Heart} />
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Brand Column */}
            <motion.div 
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Enhanced Logo */}
              <motion.a 
                href="/" 
                className="flex items-center group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="relative"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <img 
                    src={whitelogo} 
                    alt="SkillSwap Logo" 
                    className="w-12 h-12 object-contain drop-shadow-lg" 
                  />
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-purple-400/30 blur-lg"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
                
                <motion.span 
                  className="ml-3 text-3xl font-black bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                >
                  SkillSwap
                </motion.span>
              </motion.a>

              <p className="text-purple-200/80 leading-relaxed max-w-md">
                Empowering people to learn, teach, and grow together. Join thousands of passionate learners and skilled teachers in our vibrant community.
              </p>

              {/* Social Media */}
              <div>
                <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Follow Us</h4>
                <div className="flex space-x-3">
                  <SocialIcon href="#" icon={Twitter} label="Twitter" color="hover:bg-blue-500/20" />
                  <SocialIcon href="#" icon={Linkedin} label="LinkedIn" color="hover:bg-blue-600/20" />
                  <SocialIcon href="#" icon={Facebook} label="Facebook" color="hover:bg-blue-700/20" />
                  <SocialIcon href="#" icon={Youtube} label="YouTube" color="hover:bg-red-500/20" />
                </div>
              </div>
            </motion.div>

            {/* Navigation Columns */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h3 className="text-lg font-black text-white flex items-center">
                <Globe className="h-5 w-5 mr-2 text-purple-300" />
                Get to Know Us
              </h3>
              <div className="flex flex-col space-y-3">
                <FooterLink href="#" icon={Users}>About SkillSwap</FooterLink>
                <FooterLink href="#" icon={Award}>Careers</FooterLink>
                <FooterLink href="#" icon={BookOpen}>Blog</FooterLink>
                <FooterLink href="#" icon={MessageCircle}>Press</FooterLink>
              </div>
            </motion.div>

            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-lg font-black text-white flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-purple-300" />
                Learn with Us
              </h3>
              <div className="flex flex-col space-y-3">
                <FooterLink href="#" icon={Globe}>Browse All Skills</FooterLink>
                <FooterLink href="#" icon={Users}>Become a Teacher</FooterLink>
                <FooterLink href="#" icon={Award}>SkillSwap for Business</FooterLink>
                <FooterLink href="#" icon={Heart}>Partnerships</FooterLink>
              </div>
            </motion.div>

            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-lg font-black text-white flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-purple-300" />
                Support
              </h3>
              <div className="flex flex-col space-y-3">
                <FooterLink href="#" icon={Users}>Your Account</FooterLink>
                <FooterLink href="#" icon={MessageCircle}>Help Center</FooterLink>
                <FooterLink href="#" icon={Mail}>Contact Us</FooterLink>
                <FooterLink href="#" icon={Award}>Report an Issue</FooterLink>
              </div>

                          </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="border-t border-white/10 py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-purple-200/80 text-sm mb-2">
                &copy; {currentYear} SkillSwap, Inc. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start items-center space-x-4 text-xs">
                <FooterLink href="#" external>Terms of Service</FooterLink>
                <span className="text-purple-300/50">•</span>
                <FooterLink href="#" external>Privacy Policy</FooterLink>
                <span className="text-purple-300/50">•</span>
                <FooterLink href="#" external>Cookie Policy</FooterLink>
              </div>
            </div>

            <div className="flex items-center text-sm text-purple-200/80">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="h-4 w-4 text-red-400 mx-1 fill-current" />
              </motion.div>
              <span>in India</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-2xl z-50 backdrop-blur-sm border border-white/20"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
