import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Zap, Users, ShieldCheck, HeartHandshake } from "lucide-react";
import NET from "vanta/dist/vanta.net.min.js";
import * as THREE from "three";
import { cn } from "../lib/utils";

// --- Placeholder Images ---
import teamMember1 from "../assets/svg1.svg";
import teamMember2 from "../assets/svg2.svg";
import teamMember3 from "../assets/svg3.svg";
import teamMember4 from "../assets/svg4.svg"; // New team member image

// --- Team Members Data ---
const teamMembers = [
  { 
    image: teamMember1, 
    name: 'Vikram Nayak', 
    role: 'Backend Developer',
    description: 'Architect of our robust server infrastructure and API design'
  },
  { 
    image: teamMember2, 
    name: 'Abhishek Kumar', 
    role: 'Frontend & UI Designer',
    description: 'Crafting beautiful, intuitive user experiences'
  },
  { 
    image: teamMember3, 
    name: 'Pulkit Dhingra', 
    role: 'Graphic Designer',
    description: 'Creating stunning visuals and brand identity'
  },
  { 
    image: teamMember4, 
    name: 'Jyoti', 
    role: 'Documentation Specialist',
    description: 'Ensuring clear communication and comprehensive guides'
  },
];

// --- Custom Hook for Media Query ---
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);
  return matches;
};

// --- Dynamic Background Component ---
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
          points: isMobile ? 5.00 : isTablet ? 6.00 : 8.00,
          maxDistance: isMobile ? 14.00 : isTablet ? 15.00 : 18.00,
          spacing: isMobile ? 24.00 : isTablet ? 22.00 : 20.00,
          lineOpacity: isMobile ? 0.3 : 0.4,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect, isMobile, isTablet]);

  return (
    <div ref={vantaRef} className="relative w-full">
      <div className="absolute inset-0 bg-black/20 z-0"></div>
      {children}
    </div>
  );
};

// --- Hero Section ---
const AboutHero = () => (
  <section className="h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6">
    <div className="relative z-20 max-w-4xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white drop-shadow-2xl"
        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
      >
        We're Building The <br />
        <span className="text-purple-200">Future of Learning</span>.
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
        className="mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-lg bg-black/30 backdrop-blur-sm rounded-lg p-4 sm:p-6"
        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
      >
        We believe that knowledge is the one thing that grows when you share it. Our mission is to build a global community where anyone can learn anything, directly from another person.
      </motion.p>
    </div>
  </section>
);

// --- Our Story Section (Sticky Scroll) ---
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
            animate={{ backgroundColor: backgroundColors[activeCard] || backgroundColors[0] }}
            className="relative transition-colors duration-500"
        >
            <div
                ref={ref}
                className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-10 py-16 sm:py-24 px-4 sm:px-8 lg:h-[300vh]"
            >
                <div className="lg:sticky top-0 lg:h-screen flex flex-col justify-center text-center lg:text-left">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1f2040] mb-4">Our Story</h2>
                    <p className="text-base sm:text-lg text-[#4b546e]">From a simple idea to a global movement.</p>
                </div>

                <div className="flex flex-col gap-12 lg:gap-0">
                    {storyContent.map((item, index) => (
                        <div key={item.title} className="flex items-center justify-center min-h-[60vh] lg:h-screen">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                    y: activeCard === index ? 0 : 20
                                }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-lg border border-black/5"
                            >
                                <h3 className="text-xl sm:text-2xl font-bold text-purple-700 mb-4">{item.title}</h3>
                                <p className="text-[#384060] leading-relaxed text-sm sm:text-base">{item.description}</p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

// --- Values Section (Bento Grid) ---
const ValueCard = ({ icon, title, description, className }) => (
    <div className={cn("bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-black/5 shadow-lg flex flex-col justify-center items-center text-center", className)}>
        <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 mb-6 rounded-full flex items-center justify-center bg-[#7E69AB]/15 text-[#3B1E54]">{icon}</div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#1f2040] mb-4">{title}</h3>
        <p className="text-sm sm:text-base text-[#384060] leading-relaxed">{description}</p>
    </div>
);

const OurValuesSection = () => (
    <section className="py-16 sm:py-24 bg-white px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1f2040] mb-4">What Drives Us</h2>
                <p className="text-base sm:text-lg text-[#4b546e]">Our core values are the compass that guides every feature we build.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <ValueCard className="md:col-span-1" icon={<Users size={32} />} title="Community First" description="We thrive on connection, fostering a supportive and collaborative environment for all members." />
                <ValueCard className="md:col-span-2" icon={<HeartHandshake size={32} />} title="Empowerment" description="We empower individuals by providing the tools to both teach and learn, unlocking potential and building confidence across the globe." />
                <ValueCard className="md:col-span-2" icon={<ShieldCheck size={32} />} title="Trust & Safety" description="Your security is paramount. We are committed to creating a safe, verified, and respectful space for everyone to learn and grow without worry." />
                <ValueCard className="md:col-span-1" icon={<Zap size={32} />} title="Innovation" description="We continuously improve our platform to create the best possible learning experience." />
            </div>
        </div>
    </section>
);

// --- Enhanced Team Section with 3D Card Effect ---
const TeamCard = ({ image, name, role, description }) => {
    const ref = useRef(null);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const handleMouseMove = (e) => {
        if (!ref.current || !isDesktop) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25;
        const y = (e.clientY - top - height / 2) / 25;
        ref.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    };

    const handleMouseLeave = () => {
        if (ref.current && isDesktop) {
            ref.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{ perspective: "1000px" }} 
            onMouseMove={handleMouseMove} 
            onMouseLeave={handleMouseLeave}
        >
            <div ref={ref} className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-black/5 shadow-lg text-center transition-all duration-300 ease-out hover:shadow-2xl group">
                <div className="relative mb-6">
                    <img 
                        src={image} 
                        alt={name} 
                        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full mx-auto object-cover shadow-lg border-4 border-white group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-[#1f2040] mb-2">{name}</h4>
                <p className="text-[#7E69AB] font-semibold mb-3">{role}</p>
                <p className="text-sm text-[#4b546e] leading-relaxed">{description}</p>
            </div>
        </motion.div>
    );
};

const MeetTheTeamSection = () => (
    <section className="py-16 sm:py-24 bg-[#f9f6ff] px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1f2040] mb-4"
                >
                    Meet Our Amazing Team
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-base sm:text-lg text-[#4b546e] max-w-2xl mx-auto"
                >
                    Four passionate individuals working together to revolutionize the way people learn and share knowledge.
                </motion.p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                {teamMembers.map((member, index) => (
                    <TeamCard 
                        key={index} 
                        image={member.image} 
                        name={member.name} 
                        role={member.role} 
                        description={member.description}
                    />
                ))}
            </div>
        </div>
    </section>
);

// --- CTA Section ---
const CtaSection = () => {
  const navigate = useNavigate();
  const handleJoinClick = () => navigate("/auth");

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center py-10 sm:py-12 px-6 sm:px-8 bg-white/80 border border-black/5 rounded-2xl shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1f2040] mb-6">
          Become Part of Our Story
        </h2>
        <p className="text-base sm:text-lg text-[#4b546e] mb-8">
          Ready to share what you know and learn what you don't? Join the SkillSwap community today.
        </p>
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

// --- MAIN AboutPage ---
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
