import React, { useState, useEffect } from "react";
import {
  Users,
  Video,
  Shield,
  UserPlus,
  MessageCircle,
  Quote,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import svg1 from "../assets/svg1.svg";
import svg2 from "../assets/svg2.svg";
import svg3 from "../assets/svg3.svg";
import svg4 from "../assets/svg4.svg";
import UploadTestimonial from "../components/UploadTestimonial";


// --- Reusable Components ---
const FeatureCard = ({ icon, title, children }) => (
  <div
    className="bg-white/70 dark:bg-white/10 backdrop-blur-sm 
      p-6 sm:p-8 rounded-2xl border border-black/5 text-center shadow-sm"
  >
    <div
      className="mx-auto w-16 h-16 mb-6 rounded-full flex items-center justify-center 
        bg-[#7E69AB]/15 text-[#3B1E54]"
    >
      {icon}
    </div>
    <h3 className="text-xl sm:text-2xl font-bold text-[#1f2040] mb-4">
      {title}
    </h3>
    <p className="text-[#384060] text-sm sm:text-base leading-relaxed">
      {children}
    </p>
  </div>
);


const StepCard = ({ icon, title, desc, step }) => (
  <div className="bg-white/85 p-4 sm:p-6 rounded-xl shadow-md border border-black/5 text-center">
    <div
      className="mx-auto w-12 h-12 mb-4 rounded-full flex items-center justify-center 
        bg-[#7E69AB] text-white font-bold text-xl"
    >
      {step}
    </div>
    <div className="text-[#3B1E54] mb-4">{icon}</div>
    <h3 className="text-lg sm:text-xl font-bold text-[#1f2040] mb-2">
      {title}
    </h3>
    <p className="text-[#4b546e] text-xs sm:text-sm">{desc}</p>
  </div>
);



const HeroSection = ({ onGetStartedClick }) => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(0);


  const skills = ["Code", "Art", "Music", "Design"];
  const svgSources = [
    { src: svg1, alt: "SkillSwap Icon 1" },
    { src: svg2, alt: "SkillSwap Icon 2" },
    { src: svg3, alt: "SkillSwap Icon 3" },
    { src: svg4, alt: "SkillSwap Icon 4" },
  ];
  // Smooth auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
      setCurrentIcon((prev) => (prev + 1) % svgSources.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [svgSources.length]);


  return (
    <section className="relative min-h-screen pt-20 md:pt-30 sm:pt-30 lg:pt-30 flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-gradient-to-b from-white to-white/70">
    


      {/* Floating Glass Blobs */}
      <motion.div
        animate={{ y: [0, 30, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute top-10 -left-20 w-[450px] h-[450px] rounded-full bg-gradient-to-r from-purple-300/40 to-pink-300/40 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -40, 0], rotate: [0, -10, 10, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-indigo-300/40 to-purple-300/40 blur-3xl"
      />
      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-gray-900">
          Learn <span className="text-purple-600">Anything.</span>
          <br />
          Share Your{" "}
          <span className="relative inline-block w-50 sm:w-65 h-16 md:h-25 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={skills[currentSkill]}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0 text-purple-700 font-extrabold"
              >
                {skills[currentSkill]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>


        {/* Subtext */}
        <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Learn from experts, share your skills, and be part of a growing
          knowledge-sharing community built for dreamers and doers.
        </p>


        {/* Call To Action */}
        <div className="mt-10">
          <motion.button
            whileHover={{
              scale: 1.08,
              boxShadow: "0px 8px 20px rgba(139, 92, 246, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetStartedClick}
            className="px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-lg sm:text-xl font-semibold tracking-wide shadow-lg"
          >
            Start Your Journey
          </motion.button>
        </div>


        {/* Animated Icons */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-12">
          {/* Mobile - One Animated Icon */}
          <div className="sm:hidden w-28 h-28 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={svgSources[currentIcon].src}
                src={svgSources[currentIcon].src}
                alt={svgSources[currentIcon].alt}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                className="w-30 h-30 drop-shadow-lg"
              />
            </AnimatePresence>
          </div>


          {/* Tablet+ - Floating Grid of Icons */}
          <div className="hidden  sm:flex flex-wrap justify-center items-center gap-30">
            {svgSources.map(({ src, alt }, index) => (
              <motion.img
                key={index}
                src={src}
                alt={alt}
                initial={{ y: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3 + index,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="w-20 md:w-24 lg:w-28 drop-shadow-md"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


// --- Features Section ---
const FeaturesSection = () => (
  <section id="features" className="py-16 sm:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1f2040] mb-4">
          Why You'll Love SkillSwap
        </h2>
        <p className="text-lg sm:text-xl text-[#4b546e]">
          Everything you need for a seamless learning experience.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <FeatureCard icon={<Users size={32} />} title="Smart Matching">
          Our intelligent system connects you with the perfect learning partners
          based on skills, availability, and goals.
        </FeatureCard>
        <FeatureCard icon={<Video size={32} />} title="Instant Video Learning">
          Seamless Google Meet integration for immediate face-to-face learning
          sessions with just one click.
        </FeatureCard>
        <FeatureCard icon={<Shield size={32} />} title="Secure & Trusted">
          Advanced security, verified users, and encrypted communications ensure
          your safety and privacy.
        </FeatureCard>
      </div>
    </div>
  </section>
);


// --- How It Works Section ---
const HowItWorksSection = () => (
  <section id="how-it-works" className="py-16 sm:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1f2040] mb-4">
          Get Started in Minutes
        </h2>
        <p className="text-lg sm:text-xl text-[#4b546e]">
          Four simple steps to begin your learning adventure.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        <StepCard
          icon={<UserPlus size={32} />}
          title="Create Account"
          desc="Sign up and build your profile with skills and interests."
          step="1"
        />
        <StepCard
          icon={<Users size={32} />}
          title="Find Matches"
          desc="Browse our community or get matched with compatible partners."
          step="2"
        />
        <StepCard
          icon={<MessageCircle size={32} />}
          title="Connect"
          desc="Send a request to learn or accept teaching opportunities."
          step="3"
        />
        <StepCard
          icon={<Video size={32} />}
          title="Start Learning"
          desc="Connect via secure video call and begin your session."
          step="4"
        />
      </div>
    </div>
  </section>
);


// --- Testimonials Section ---
const TestimonialsSection = () => {
    const [testimonials, setTestimonials] = useState([]);

  const fetchTestimonials = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/testimonials`)
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error("Error fetching testimonials:", err));
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);


  return (
    <>
    <section id="testimonials" className="py-16 sm:py-24 bg-[#f9f6ff] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1f2040] mb-12">
          What Our Community Says
        </h2>


        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-8 bg-white rounded-2xl shadow-md border border-black/5"
            >
              <Quote className="w-8 h-8 text-[#7E69AB] mb-4 mx-auto" />
              <p className="text-[#384060] text-sm sm:text-base mb-6">
                “{t.text}”
              </p>
              <h4 className="font-bold text-[#1f2040]">{t.name}</h4>
              <span className="text-[#7E69AB] text-sm">{t.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
     {/* <UploadTestimonial onSuccess={() => fetchTestimonials()} />  */}
     </>
  );
};

// --- Call to Action ---
const CtaSection = ({ onGetStartedClick }) => (
  <section className="py-16 px-4 sm:py-20">
    <div
      className="max-w-4xl mx-auto text-center py-10 px-4 sm:px-6 lg:px-8 bg-white/80 
        border border-black/5 rounded-2xl shadow-md"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-[#1f2040] mb-6">
        Ready to Transform Your Skills?
      </h2>
      <p className="text-lg sm:text-xl text-[#4b546e] mb-8">
        Join thousands of learners and teachers already growing together on
        SkillSwap.
      </p>
      <button
        onClick={onGetStartedClick}
        className="bg-[#3B1E54] text-white w-full sm:w-auto max-w-xs sm:max-w-none
                   px-8 py-4 sm:px-10 sm:py-5 
                   rounded-full text-lg sm:text-xl font-bold 
                   hover:bg-black transform hover:scale-105 transition-all duration-300 shadow-lg mx-auto"
      >
        Join For Free
      </button>
    </div>
  </section>
);


// --- Footer Section ---
const Footer = () => (
  <footer className="bg-[#1f2040] text-white py-10 mt-12">
    <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-6">
      <p className="text-sm">
        © {new Date().getFullYear()} SkillSwap. All rights reserved.
      </p>
      <div className="flex gap-6 text-sm">
        <a href="#features" className="hover:underline">
          Features
        </a>
        <a href="#how-it-works" className="hover:underline">
          How It Works
        </a>
        <a href="#testimonials" className="hover:underline">
          Testimonials
        </a>
      </div>
    </div>
  </footer>
);

// --- MAIN HomePage ---
const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div

className="min-h-screen bg-[radial-gradient(1200px_800px_at_100%_20%,#dbe7ff_0%,transparent_60%),radial-gradient(900px_620px_at_0%_90%,#f3e8ff_0%,transparent_55%),linear-gradient(180deg,#ffffff_0%,#f0f4ff_40%,#f5ecff_100%)] 
text-[#2d2d44]" >
      <HeroSection onGetStartedClick={handleGetStarted} />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaSection onGetStartedClick={handleGetStarted} />
    </div>
  );
};


export default HomePage;
