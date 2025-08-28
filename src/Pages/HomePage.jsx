import React, { useState, useEffect } from 'react';
import { Users, Video, Shield, UserPlus, MessageCircle, Quote } from 'lucide-react';
import svg1 from '../assets/svg1.svg';
import svg2 from '../assets/svg2.svg';
import svg3 from '../assets/svg3.svg';
import svg4 from '../assets/svg4.svg';


// --- Reusable Components ---
const FeatureCard = ({ icon, title, children }) => (
  <div className="bg-white/70 dark:bg-white/10 backdrop-blur-sm 
      p-6 sm:p-8 rounded-2xl border border-black/5 text-center shadow-sm">
    <div className="mx-auto w-16 h-16 mb-6 rounded-full flex items-center justify-center 
        bg-[#7E69AB]/15 text-[#3B1E54]">
      {icon}
    </div>
    <h3 className="text-xl sm:text-2xl font-bold text-[#1f2040] mb-4">{title}</h3>
    <p className="text-[#384060] text-sm sm:text-base leading-relaxed">{children}</p>
  </div>
);

const StepCard = ({ icon, title, desc, step }) => (
  <div className="bg-white/85 p-4 sm:p-6 rounded-xl shadow-md border border-black/5 text-center">
    <div className="mx-auto w-12 h-12 mb-4 rounded-full flex items-center justify-center 
        bg-[#7E69AB] text-white font-bold text-xl">
      {step}
    </div>
    <div className="text-[#3B1E54] mb-4">{icon}</div>
    <h3 className="text-lg sm:text-xl font-bold text-[#1f2040] mb-2">{title}</h3>
    <p className="text-[#4b546e] text-xs sm:text-sm">{desc}</p>
  </div>
);

const SvgIcon = ({ src, className, alt }) => (
  <img
    src={src}
    alt={alt}
    className={`object-contain hover:scale-110 hover:shadow-md transition-all duration-300 ${className}`}
  />
);


// --- HERO Section ---
const HeroSection = ({ onGetStartedClick }) => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const skills = ['Code', 'Art', 'Music', 'Languages'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const svgSources = [
    { src: svg1, alt: 'SkillSwap Icon 1' },
    { src: svg2, alt: 'SkillSwap Icon 2' },
    { src: svg3, alt: 'SkillSwap Icon 3' },
    { src: svg4, alt: 'SkillSwap Icon 4' },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-20 sm:pt-28">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_100%_22%,#b8a4d7_0%,transparent_60%),radial-gradient(900px_620px_at_0%_92%,#d9c4ee_0%,transparent_55%),linear-gradient(180deg,#efe6f8_0%,#e3ecff_42%,#ece1f6_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_60%_45%,transparent_0%,rgba(20,24,60,0.15)_70%)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* HERO TITLE */}
        <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl 
            font-extrabold text-[#131735] mb-6 leading-snug">
          Learn <span className="text-[#7E69AB]">Anything.</span>
          <br />
          Share Your{" "}
          <span className="relative inline-block h-10 sm:h-14 md:h-20 text-[#131735]">
            {skills.map((skill, index) => (
              <span
                key={skill}
                className={`absolute inset-0 transition-all duration-500 ease-in-out 
                 ${index === currentSkill ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
              >
                {skill}
              </span>
            ))}
          </span>
        </h1>

        {/* SUBTEXT */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl 
            text-[#384060] mb-10 sm:mb-12 max-w-2xl mx-auto px-2">
          A community-driven platform to exchange knowledge, connect with experts, and unlock your potential.
        </p>

        {/* CTA BUTTON */}
        <button
          onClick={onGetStartedClick}
          className="bg-[#7E69AB] text-white w-full sm:w-auto max-w-xs sm:max-w-none 
                     px-8 py-4 sm:px-10 sm:py-5 
                     rounded-full text-lg sm:text-xl font-bold 
                     hover:bg-[#5f4a96] hover:scale-105 transition-all duration-300 shadow-lg mx-auto"
        >
          Start Your Journey
        </button>

        {/* SVGs */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 sm:gap-10">
          {/* Mobile: only svg1 but BIG */}
          <SvgIcon
            src={svgSources[0].src}
            alt={svgSources[0].alt}
            className="block sm:hidden w-32"
          />
          {/* Tablet+ : show all icons */}
          {svgSources.map(({ src, alt }, index) => (
            <SvgIcon
              key={index}
              src={src}
              alt={alt}
              className="hidden sm:block w-20 md:w-28 lg:w-36"
            />
          ))}
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
          Our intelligent system connects you with the perfect learning partners based on
          skills, availability, and goals.
        </FeatureCard>
        <FeatureCard icon={<Video size={32} />} title="Instant Video Learning">
          Seamless Google Meet integration for immediate face-to-face learning sessions with
          just one click.
        </FeatureCard>
        <FeatureCard icon={<Shield size={32} />} title="Secure & Trusted">
          Advanced security, verified users, and encrypted communications ensure your safety
          and privacy.
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
  const testimonials = [
    {
      name: "Aarav Sharma",
      role: "Web Developer",
      text: "SkillSwap helped me find amazing mentors in JavaScript. I now also share my React knowledge.",
    },
    {
      name: "Priya Verma",
      role: "Graphic Designer",
      text: "I connected with people worldwide to exchange design tips and even picked up Spanish!",
    },
    {
      name: "Rohit Khanna",
      role: "Student",
      text: "The best way to learn quickly — I shared my guitar skills and learned Python in return.",
    },
  ];

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-[#f9f6ff] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1f2040] mb-12">
          What Our Community Says
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 bg-white rounded-2xl shadow-md border border-black/5">
              <Quote className="w-8 h-8 text-[#7E69AB] mb-4 mx-auto" />
              <p className="text-[#384060] text-sm sm:text-base mb-6">“{t.text}”</p>
              <h4 className="font-bold text-[#1f2040]">{t.name}</h4>
              <span className="text-[#7E69AB] text-sm">{t.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


// --- Call to Action ---
const CtaSection = ({ onGetStartedClick }) => (
  <section className="py-16 sm:py-20">
    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 bg-white/80 
        border border-black/5 rounded-2xl shadow-md">
      <h2 className="text-3xl sm:text-4xl font-bold text-[#1f2040] mb-6">
        Ready to Transform Your Skills?
      </h2>
      <p className="text-lg sm:text-xl text-[#4b546e] mb-8">
        Join thousands of learners and teachers already growing together on SkillSwap.
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
      <p className="text-sm">© {new Date().getFullYear()} SkillSwap. All rights reserved.</p>
      <div className="flex gap-6 text-sm">
        <a href="#features" className="hover:underline">Features</a>
        <a href="#how-it-works" className="hover:underline">How It Works</a>
        <a href="#testimonials" className="hover:underline">Testimonials</a>
      </div>
    </div>
  </footer>
);


// --- MAIN HomePage ---
const HomePage = ({ onGetStartedClick }) => {
  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_800px_at_100%_22%,#b8a4d7_0%,transparent_60%),radial-gradient(900px_620px_at_0%_92%,#d9c4ee_0%,transparent_55%),linear-gradient(180deg,#efe6f8_0%,#e3ecff_42%,#ece1f6_100%)] 
        text-[#1f2040]">
      <HeroSection onGetStartedClick={onGetStartedClick} />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaSection onGetStartedClick={onGetStartedClick} />
      <Footer />
    </div>
  );
};


export default HomePage;
