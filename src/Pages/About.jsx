import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Zap, Users, ShieldCheck, HeartHandshake, Linkedin } from "lucide-react";
import NET from "vanta/dist/vanta.net.min.js";
import * as THREE from "three";
import { cn } from "../lib/utils";

import teamMember1 from "../assets/user2.jpg";
import teamMember2 from "../assets/user0.jpg";
import teamMember3 from "../assets/user3.jpg";
import teamMember4 from "../assets/user4.jpg";

/* ============================
   Animation Variants
============================ */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const containerStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4, when: "beforeChildren", staggerChildren: 0.12, delayChildren: 0.15 },
  },
}; // orchestrates child entrances in sequence [2][3][8]

const cardFloat = {
  initial: { opacity: 0, y: 28, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

/* ============================
   Data with LinkedIn URLs
============================ */
const teamMembers = [
  { 
    image: teamMember1, 
    name: 'Vikram Nayak', 
    role: 'Backend Developer',
    description: 'Architect of our robust server infrastructure and API design',
    linkedin: 'https://www.linkedin.com/in/'
  },
  { 
    image: teamMember2, 
    name: 'Abhishek Kumar', 
    role: 'Frontend & UI Designer',
    description: 'Crafting beautiful, intuitive user experiences',
    linkedin: 'https://www.linkedin.com/in/'
  },
  { 
    image: teamMember3, 
    name: 'Pulkit Dhingra', 
    role: 'Graphic Designer',
    description: 'Creating stunning visuals and brand identity',
    linkedin: 'https://www.linkedin.com/in/'
  },
  { 
    image: teamMember4, 
    name: 'Jyoti', 
    role: 'Documentation Specialist',
    description: 'Ensuring clear communication and comprehensive guides',
    linkedin: 'https://www.linkedin.com/in/'
  },
];

/* ============================
   Media Query Hook
============================ */
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);
  return matches;
};

/* ============================
   Vanta Background Wrapper
============================ */
const VantaBackground = ({ children }) => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x7e69ab,
          backgroundColor: 0x1a1447,
          points: isMobile ? 5.0 : isTablet ? 6.0 : 8.0,
          maxDistance: isMobile ? 14.0 : isTablet ? 15.0 : 18.0,
          spacing: isMobile ? 24.0 : isTablet ? 22.0 : 20.0,
          lineOpacity: isMobile ? 0.3 : 0.4,
        })
      );
    }
    return () => { if (vantaEffect) vantaEffect.destroy(); };
  }, [vantaEffect, isMobile, isTablet]);

  return (
    <div ref={vantaRef} className="relative w-full">
      <div className="absolute inset-0 bg-black/20 z-0"></div>
      {children}
    </div>
  );
};

/* ============================
   Hero Section (Parallax)
============================ */
const AboutHero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const ySubtitle = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]); // subtle parallax and opacity [7][19]

  return (
    <section ref={heroRef} className="relative h-[90vh] sm:h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 overflow-hidden">
      {/* radial gradient glow */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute -z-0 inset-0"
      >
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-3xl opacity-30 bg-[radial-gradient(closest-side,rgba(126,105,171,0.55),transparent_70%)]" />
      </motion.div>

      <div className="relative z-20 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: "easeOut" } }}
          style={{ y: yTitle }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white drop-shadow-2xl"
        >
          We're Building The <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-200">Future of Learning</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.25, ease: "easeOut" } }}
          style={{ y: ySubtitle }}
          className="mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-lg bg-black/30 backdrop-blur-sm rounded-lg p-4 sm:p-6"
        >
          We believe that knowledge is the one thing that grows when you share it. Our mission is to build a global community where anyone can learn anything, directly from another person.
        </motion.p>

        {/* call to action micro animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.4 } }}
          className="mt-6 flex items-center justify-center gap-2 text-purple-100/90 text-sm"
        >
          <span className="inline-block h-1 w-1 rounded-full bg-purple-300 animate-pulse" />
          <span>Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
};

/* ============================
   Our Story (Sticky + Active)
============================ */
const storyContent = [
  { title: "The Spark of an Idea", description: "SkillSwap was born from a simple realization: everyone is an expert at something, and everyone is a beginner at something else. Traditional learning can be rigid, expensive, and impersonal. We envisioned a world where the line between teacher and student blurs, where learning is as easy as starting a conversation." },
  { title: "Building the Bridge", description: "We set out to create a platform that removes barriers, connecting people based on their passions and curiosities. It's not just about the code; it's about the human connection forged through a shared desire for growth." },
  { title: "Our Vision for Tomorrow", description: "Today, we're proud to have connected thousands of learners and teachers. But our journey is just beginning. We are continuously innovating, driven by the belief that collaborative learning can unlock human potential on a global scale." },
];

const OurStorySection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const cards = storyContent.length;
      const newActiveCard = Math.min(cards - 1, Math.floor(latest * cards));
      setActiveCard(newActiveCard);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const backgroundColors = ["#f0f4ff", "#ffffff", "#f5ecff"];

  return (
    <motion.div
      animate={{ backgroundColor: backgroundColors[activeCard] || backgroundColors }}
      className="relative transition-colors duration-500"
    >
      {/* subtle gradient accent bar that scales on active */}
      <motion.div
        layout
        className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400"
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />

      <div
        ref={ref}
        className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-10 py-16 sm:py-24 px-4 sm:px-8 lg:h-[300vh]"
      >
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="lg:sticky top-0 lg:h-screen flex flex-col justify-center text-center lg:text-left"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1f2040] mb-4">
            Our Story
          </motion.h2>
          <motion.p variants={fadeUp} className="text-base sm:text-lg text-[#4b546e]">
            From a simple idea to a global movement.
          </motion.p>
        </motion.div>

        <div className="flex flex-col gap-12 lg:gap-0">
          {storyContent.map((item, index) => (
            <div key={item.title} className="flex items-center justify-center min-h-[60vh] lg:h-screen">
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardFloat}
                className={`bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-lg border transition-all duration-500 ${
                  activeCard === index ? "border-purple-300/60 shadow-purple-200/40" : "border-black/5"
                }`}
              >
                <h3 className={`text-xl sm:text-2xl font-bold mb-4 transition-colors ${
                  activeCard === index ? "text-purple-700" : "text-purple-600"
                }`}>{item.title}</h3>
                <p className="text-[#384060] leading-relaxed text-sm sm:text-base">{item.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/* ============================
   Values (Bento + Reveal)
============================ */
const ValueCard = ({ icon, title, description, className }) => (
  <motion.div
    variants={fadeUp}
    className={cn("bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-black/5 shadow-lg flex flex-col justify-center items-center text-center", className)}
  >
    <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 mb-6 rounded-full flex items-center justify-center bg-[#7E69AB]/15 text-[#3B1E54]">{icon}</div>
    <h3 className="text-xl sm:text-2xl font-bold text-[#1f2040] mb-4">{title}</h3>
    <p className="text-sm sm:text-base text-[#384060] leading-relaxed">{description}</p>
  </motion.div>
);

const OurValuesSection = () => (
  <section className="py-16 sm:py-24 bg-white px-4 sm:px-8">
    <motion.div
      variants={containerStagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="max-w-7xl mx-auto"
    >
      <div className="text-center mb-12 sm:mb-16">
        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1f2040] mb-4">
          What Drives Us
        </motion.h2>
        <motion.p variants={fadeUp} className="text-base sm:text-lg text-[#4b546e]">
          Our core values are the compass that guides every feature we build.
        </motion.p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <ValueCard className="md:col-span-1" icon={<Users size={32} />} title="Community First" description="We thrive on connection, fostering a supportive and collaborative environment for all members." />
        <ValueCard className="md:col-span-2" icon={<HeartHandshake size={32} />} title="Empowerment" description="We empower individuals by providing the tools to both teach and learn, unlocking potential and building confidence across the globe." />
        <ValueCard className="md:col-span-2" icon={<ShieldCheck size={32} />} title="Trust & Safety" description="Your security is paramount. We are committed to creating a safe, verified, and respectful space for everyone to learn and grow without worry." />
        <ValueCard className="md:col-span-1" icon={<Zap size={32} />} title="Innovation" description="We continuously improve our platform to create the best possible learning experience." />
      </div>
    </motion.div>
  </section>
);

/* ============================
   Social Icon (Tooltip)
============================ */
const SocialIcon = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 border border-purple-200/60 text-[#1f2040] hover:text-white hover:border-transparent transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-400 group"
  >
    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    <span className="relative">{children}</span>
    <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
      {label}
    </span>
  </a>
); // Lucide Linkedin used as React component; external link safety via rel noopener noreferrer [21][22][23]

/* ============================
   Team Cards (Tilt + Social)
============================ */
const TeamCard = ({ image, name, role, description, linkedin }) => {
  const ref = useRef(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleMouseMove = (e) => {
    if (!ref.current || !isDesktop) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    ref.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) translateZ(0)`;
  };

  const handleMouseLeave = () => {
    if (ref.current && isDesktop) {
      ref.current.style.transform = `rotateY(0deg) rotateX(0deg) translateZ(0)`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      style={{ perspective: "1200px" }} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      className="group"
    >
      <div 
        ref={ref} 
        className="relative bg-gradient-to-br from-white/95 to-purple-50/80 backdrop-blur-xl h-[480px] sm:h-[520px] md:h-[540px] lg:h-[560px] flex flex-col p-6 sm:p-7 md:p-8 rounded-3xl border border-white/40 shadow-[0_20px_50px_rgba(126,105,171,0.15)] text-center transition-all duration-500 ease-out hover:shadow-[0_30px_80px_rgba(126,105,171,0.25)] hover:border-purple-300/50 overflow-hidden will-change-transform"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-transparent to-indigo-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
        
        {/* Floating orbs decoration */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-300/20 to-indigo-300/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-pink-300/15 to-purple-300/15 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 group-hover:scale-110"></div>
        
        {/* Image container with enhanced styling */}
        <div className="relative mb-6 sm:mb-7 flex-shrink-0">
          <div className="relative flex justify-center">
            {/* Glow ring effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 p-1 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
              <div className="w-full h-full rounded-full bg-white"></div>
            </div>
            
            {/* Main image */}
            <img 
              src={image} 
              alt={name} 
              className="relative w-44 h-44 sm:w-48 sm:h-48 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full object-cover shadow-2xl border-4 border-white/80 group-hover:scale-105 transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(126,105,171,0.3)]" 
            />
            
            {/* Shimmer overlay */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-700"></div>
          </div>
          
          {/* Professional badge */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-1">
            Team Member
          </div>
        </div>
        
        {/* Content with consistent layout */}
        <div className="relative z-10 flex flex-col flex-grow">
          <h4 className="text-lg sm:text-xl md:text-xl font-bold text-[#1f2040] mb-3 group-hover:text-purple-700 transition-colors duration-300">
            {name}
          </h4>
          
          {/* Role chip */}
          <div className="inline-block bg-gradient-to-r from-purple-100 to-indigo-100 px-3 py-2 rounded-full mb-4 group-hover:from-purple-200 group-hover:to-indigo-200 transition-all duration-300">
            <p className="text-[#7E69AB] font-semibold text-sm sm:text-base bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {role}
            </p>
          </div>
          
          {/* Enhanced description */}
          <div className="flex-grow flex items-center justify-center">
            <p className="text-sm sm:text-sm text-[#4b546e] leading-relaxed font-medium group-hover:text-[#384060] transition-colors duration-300 line-clamp-3">
              {description}
            </p>
          </div>

          {/* Socials row */}
          <div className="mt-5 flex items-center justify-center gap-3">
            {linkedin && (
              <SocialIcon href={linkedin} label="Open LinkedIn">
                <Linkedin size={18} strokeWidth={2} />
              </SocialIcon>
            )}
          </div>
          
          {/* Decorative line */}
          <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full mx-auto mt-5 opacity-0 group-hover:opacity-100 group-hover:w-20 transition-all duration-500"></div>
        </div>
      </div>
    </motion.div>
  );
};

const MeetTheTeamSection = () => (
  <section className="py-16 sm:py-20 bg-gradient-to-br from-[#f9f6ff] via-white to-[#f5ecff] px-4 sm:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12 sm:mb-16">
        <motion.h2 
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-700 bg-clip-text mb-6"
        >
          Meet Our Amazing Team
        </motion.h2>
        <motion.p 
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-base sm:text-lg text-[#4b546e] max-w-2xl mx-auto leading-relaxed"
        >
          Four passionate visionaries working together to revolutionize the way people learn and share knowledge across the globe.
        </motion.p>
      </div>
      
      {/* Grid layout with stagger on children */}
      <motion.div
        variants={containerStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 xl:gap-8"
      >
        {teamMembers.map((member, index) => (
          <motion.div key={index} variants={fadeUp}>
            <TeamCard 
              image={member.image} 
              name={member.name} 
              role={member.role} 
              description={member.description}
              linkedin={member.linkedin}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ============================
   CTA Section
============================ */
const CtaSection = () => {
  const navigate = useNavigate();
  const handleJoinClick = () => navigate("/auth");

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 bg-white relative overflow-hidden">
      {/* animated sweeping gradient background accent */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }}
        animate={{ x: ["-20%", "120%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute top-1/2 left-0 h-40 w-1/3 -translate-y-1/2 bg-gradient-to-r from-purple-200 via-indigo-200 to-purple-200 blur-3xl rounded-full"
      />
      <div className="relative max-w-4xl mx-auto text-center py-10 sm:py-12 px-6 sm:px-8 bg-white/80 border border-black/5 rounded-2xl shadow-xl">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-[#1f2040] mb-6"
        >
          Become Part of Our Story
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-base sm:text-lg text-[#4b546e] mb-8"
        >
          Ready to share what you know and learn what you don't? Join the SkillSwap community today.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(126, 105, 171, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleJoinClick}
          className="px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-lg sm:text-xl font-semibold tracking-wide shadow-lg"
        >
          Start Your Journey
        </motion.button>
      </div>
    </section>
  );
};

/* ============================
   Main About Page
============================ */
function AboutPage() {
  return (
    <main>
      <VantaBackground>
        <AboutHero />
      </VantaBackground>
      <OurStorySection />
      <OurValuesSection />
      <MeetTheTeamSection />
      <CtaSection />
    </main>
  );
}

export default AboutPage;
