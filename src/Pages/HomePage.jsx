import React, { useState, useEffect } from 'react';
import { Users, Video, Shield, UserPlus, MessageCircle, ArrowRight, CheckCircle, BookOpen, Code, Palette, Music, Languages } from 'lucide-react';
// import Aurora from '../components/Aurora';

// --- Reusable Components for this page ---

// A stylish card for the Features section
const FeatureCard = ({ icon, title, children }) => (
  <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 text-center transform hover:scale-105 hover:bg-white/10 transition-all duration-300">
    <div className="mx-auto w-16 h-16 mb-6 rounded-full flex items-center justify-center bg-[#9B7EBD]/20 text-[#D4BEE4]">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-[#D4BEE4] leading-relaxed">{children}</p>
  </div>
);

// A card for the "How it Works" steps
const StepCard = ({ icon, title, desc, step }) => (
  <div className="bg-[#EEEEEE] p-6 rounded-xl shadow-md border border-gray-200 text-center">
    <div className="mx-auto w-12 h-12 mb-4 rounded-full flex items-center justify-center bg-[#9B7EBD] text-white font-bold text-xl">
      {step}
    </div>
    <div className="text-[#3B1E54] mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-[#3B1E54] mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{desc}</p>
  </div>
);

// --- Page Sections ---

// Section 1: The new Hero with Aurora component
const HeroSection = ({ onGetStartedClick }) => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const skills = ['Code', 'Art', 'Music', 'Languages'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prevSkill) => (prevSkill + 1) % skills.length);
    }, 3000); // Change skill every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* <Aurora
  colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
  blend={0.5}
  amplitude={1.0}
  speed={0.5}
/> */}
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
          Learn <span className="text-[#D4BEE4]">Anything.</span>
          <br />
          Share Your <span className="relative inline-block h-20">
            {skills.map((skill, index) => (
              <span
                key={skill}
                className={`absolute inset-0 transition-transform duration-500 ease-in-out ${index === currentSkill ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
              >
                {skill}
              </span>
            ))}
          </span>
        </h1>
        <p className="text-xl text-[#D4BEE4] mb-10 max-w-2xl mx-auto">
          A community-driven platform to exchange knowledge, connect with experts, and unlock your potential.
        </p>
        <button
          onClick={onGetStartedClick}
          className="bg-[#9B7EBD] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#D4BEE4] hover:text-[#3B1E54] transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Start Your Journey
        </button>
      </div>
    </section>
  );
};

// Section 2: Redesigned Features
const FeaturesSection = () => (
  <section id="features" className="py-24 bg-[#3B1E54]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">Why You'll Love SkillSwap</h2>
        <p className="text-xl text-[#D4BEE4]">Everything you need for a seamless learning experience.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard icon={<Users size={32} />} title="Smart Matching">
          Our intelligent system connects you with the perfect learning partners based on skills, availability, and goals.
        </FeatureCard>
        <FeatureCard icon={<Video size={32} />} title="Instant Video Learning">
          Seamless Google Meet integration for immediate face-to-face learning sessions with just one click.
        </FeatureCard>
        <FeatureCard icon={<Shield size={32} />} title="Secure & Trusted">
          Advanced security, verified users, and encrypted communications ensure your safety and privacy.
        </FeatureCard>
      </div>
    </div>
  </section>
);

// Section 3: Redesigned "How It Works"
const HowItWorksSection = () => (
  <section id="how-it-works" className="py-24 bg-[#EEEEEE]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#3B1E54] mb-4">Get Started in Minutes</h2>
        <p className="text-xl text-gray-600">Four simple steps to begin your learning adventure.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StepCard icon={<UserPlus size={32} />} title="Create Account" desc="Sign up and build your profile with skills and interests." step="1" />
        <StepCard icon={<Users size={32} />} title="Find Matches" desc="Browse our community or get matched with compatible partners." step="2" />
        <StepCard icon={<MessageCircle size={32} />} title="Connect" desc="Send a request to learn or accept teaching opportunities." step="3" />
        <StepCard icon={<Video size={32} />} title="Start Learning" desc="Connect via secure video call and begin your session." step="4" />
      </div>
    </div>
  </section>
);

// Section 4: Call to Action
const CtaSection = ({ onGetStartedClick }) => (
  <section className="py-20 bg-[#D4BEE4]">
    <div className="max-w-4xl mx-auto text-center px-4">
      <h2 className="text-4xl font-bold text-[#3B1E54] mb-6">Ready to Transform Your Skills?</h2>
      <p className="text-xl text-[#3B1E54]/80 mb-8">Join thousands of learners and teachers already growing together on SkillSwap.</p>
      <button
        onClick={onGetStartedClick}
        className="bg-[#3B1E54] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-black transform hover:scale-105 transition-all duration-300 shadow-lg"
      >
        Join For Free
      </button>
    </div>
  </section>
);

// --- Main HomePage Component ---
const HomePage = ({ onGetStartedClick }) => {
  return (
    <div className="bg-[#3B1E54]">
      <HeroSection onGetStartedClick={onGetStartedClick} />
      <FeaturesSection />
      <HowItWorksSection />
      <CtaSection onGetStartedClick={onGetStartedClick} />
    </div>
  );
};

export default HomePage;