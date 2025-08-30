import React, { useState, useEffect, useRef } from "react";
import {
    Users,
    Video,
    Shield,
    UserPlus,
    MessageCircle,
    Quote,
    Code,
    Palette,
    Music,
    Mic,
    Camera,
    PenTool,
    Briefcase,
    Heart,
    Twitter,
    Github,
    Linkedin,
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// --- Mock useNavigate hook ---
// In a real app, you would use 'react-router-dom'.
const useNavigate = () => {
    return (path) => {
        console.log(`Navigating to: ${path}`);
        // You can replace this with a simple window.location change for demo purposes if needed
        // window.location.href = path;
    };
};


// --- SVG Icons (Embedded) ---
const SvgIcon1 = () => (
    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 8L3 12L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 8L21 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 4L10 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const SvgIcon2 = () => (
     <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const SvgIcon3 = () => (
    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18V5L21 3V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 18C7.34315 18 6 19.3431 6 21C6 22.6569 7.34315 24 9 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="scale(0.9) translate(0, -1)"/>
        <path d="M21 16C19.3431 16 18 17.3431 18 19C18 20.6569 19.3431 22 21 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="scale(0.9) translate(0, -1)"/>
    </svg>
);
const SvgIcon4 = () => (
    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


// --- Reusable Animated Components ---
const AnimatedSection = ({ children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="py-20 sm:py-24"
        >
            {children}
        </motion.section>
    );
};

const FeatureCard = ({ icon, title, children }) => (
    <motion.div
        whileHover={{ y: -8, boxShadow: "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-white/60 dark:bg-gray-900/10 backdrop-blur-lg p-8 rounded-2xl border border-purple-100 text-center shadow-lg"
    >
        <div className="mx-auto w-16 h-16 mb-6 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100 text-purple-600">
            {icon}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            {title}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {children}
        </p>
    </motion.div>
);

const StepCard = ({ icon, title, desc, step }) => (
    <div className="relative">
         <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center h-full flex flex-col items-center justify-center">
            <div className="absolute -top-6 mx-auto w-12 h-12 rounded-full flex items-center justify-center bg-purple-600 text-white font-bold text-xl ring-4 ring-white">
                {step}
            </div>
            <div className="text-purple-500 my-5">{icon}</div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                {title}
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm">{desc}</p>
        </div>
    </div>
);

const SkillPill = ({ icon, name }) => (
    <motion.div
        whileHover={{ scale: 1.05, backgroundColor: "#ffffff" }}
        className="flex items-center gap-4 p-4 rounded-full border border-gray-200 bg-white/60 shadow-md cursor-pointer"
    >
        <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-500 rounded-full">
            {icon}
        </div>
        <span className="font-semibold text-gray-700">{name}</span>
    </motion.div>
);


// --- Sections ---
const HeroSection = ({ onGetStartedClick }) => {
    const [currentSkill, setCurrentSkill] = useState(0);
    const skills = ["Passion", "Creativity", "Knowledge", "Talent"];
    const svgIcons = [<SvgIcon1 />, <SvgIcon2 />, <SvgIcon3 />, <SvgIcon4 />];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSkill((prev) => (prev + 1) % skills.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 overflow-hidden">
            {/* Background Animated Blobs */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{ y: [0, 20, 0], x: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
                    className="absolute top-[-10%] -left-40 w-96 h-96 sm:w-[500px] sm:h-[500px] bg-purple-200/50 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ y: [0, -20, 0], x: [0, 20, 0], rotate: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
                    className="absolute bottom-[-10%] -right-40 w-96 h-96 sm:w-[500px] sm:h-[500px] bg-indigo-200/50 rounded-full blur-3xl"
                />
                 <motion.div
                    animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[600px] sm:h-[600px] bg-pink-200/30 rounded-full blur-3xl"
                />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-gray-900"
                >
                    Learn <span className="text-purple-600">Anything.</span> Share Your{" "}
                    <span className="relative inline-block h-16 md:h-24 overflow-hidden align-middle">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={skills[currentSkill]}
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: "-100%", opacity: 0 }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute inset-0 text-purple-600 font-extrabold"
                            >
                                {skills[currentSkill]}
                            </motion.span>
                        </AnimatePresence>
                    </span>
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
                >
                    Connect with experts, share your unique skills, and join a vibrant community dedicated to lifelong learning and growth.
                </motion.p>

                <motion.div
                     initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-10"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        onClick={onGetStartedClick}
                        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-lg sm:text-xl font-semibold tracking-wide shadow-lg shadow-purple-500/30"
                    >
                        Start Your Journey
                    </motion.button>
                </motion.div>
            </div>

            <div className="absolute bottom-5 w-full flex justify-center items-center">
                 <div className="hidden sm:flex flex-wrap justify-center items-center gap-x-16 gap-y-8 w-full max-w-4xl">
                    {svgIcons.map((icon, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 0, opacity: 0.7 }}
                            animate={{ y: [0, -15, 0] }}
                            transition={{
                                repeat: Infinity,
                                duration: 3 + index * 0.5,
                                ease: "easeInOut",
                            }}
                            whileHover={{ scale: 1.2, rotate: 5, color: '#8b5cf6' }}
                            className="text-gray-400"
                        >
                            {icon}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FeaturesSection = () => (
    <AnimatedSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why You'll Love SkillSwap</h2>
                <p className="text-lg sm:text-xl text-gray-600">Everything you need for a seamless learning experience.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <FeatureCard icon={<Users size={32} />} title="Smart Matching">
                    Our AI connects you with perfect learning partners based on skills, availability, and goals.
                </FeatureCard>
                <FeatureCard icon={<Video size={32} />} title="Instant Video Learning">
                    Seamless Google Meet integration for immediate face-to-face learning sessions.
                </FeatureCard>
                 <FeatureCard icon={<Briefcase size={32} />} title="Portfolio Building">
                    Showcase completed projects and skills gained, creating a portfolio of your achievements.
                </FeatureCard>
                <FeatureCard icon={<Shield size={32} />} title="Secure & Trusted">
                    Advanced security, verified users, and encrypted communications ensure your safety.
                </FeatureCard>
            </div>
        </div>
    </AnimatedSection>
);

const HowItWorksSection = () => (
    <AnimatedSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 sm:mb-20">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Get Started in Minutes</h2>
                <p className="text-lg sm:text-xl text-gray-600">Four simple steps to begin your learning adventure.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                <StepCard
                    icon={<UserPlus size={40} />}
                    title="Create Account"
                    desc="Sign up and build your profile with skills you want to learn and teach."
                    step="1"
                />
                <StepCard
                    icon={<Users size={40} />}
                    title="Find Matches"
                    desc="Browse our community or let our smart algorithm find the perfect partner."
                    step="2"
                />
                <StepCard
                    icon={<MessageCircle size={40} />}
                    title="Connect & Chat"
                    desc="Send a request, accept opportunities, and coordinate via secure chat."
                    step="3"
                />
                <StepCard
                    icon={<Video size={40} />}
                    title="Start Learning"
                    desc="Connect via secure video call and begin your personalized session."
                    step="4"
                />
            </div>
        </div>
    </AnimatedSection>
);

const PopularSkillsSection = () => (
    <AnimatedSection>
         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Explore Popular Skills</h2>
                <p className="text-lg sm:text-xl text-gray-600">Discover what the community is excited to learn and share.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                <SkillPill icon={<Code/>} name="Web Development" />
                <SkillPill icon={<Palette/>} name="Graphic Design" />
                <SkillPill icon={<Music/>} name="Music Production" />
                <SkillPill icon={<Mic/>} name="Public Speaking" />
                <SkillPill icon={<Camera/>} name="Photography" />
                <SkillPill icon={<PenTool/>} name="UI/UX Design" />
                <SkillPill icon={<Heart/>} name="Yoga & Wellness" />
                <SkillPill icon={<Briefcase/>} name="Career Coaching" />
            </div>
        </div>
    </AnimatedSection>
);

const TestimonialsSection = () => {
    // Mock data, in a real app this would be fetched
    const testimonials = [
        { name: "Sarah J.", role: "Web Developer", text: "SkillSwap helped me finally understand advanced JavaScript concepts. My mentor was patient and incredibly knowledgeable!" },
        { name: "Mike R.", role: "Music Producer", text: "I swapped my guitar skills for music production lessons. It's been an amazing and affordable way to learn." },
        { name: "Chen L.", role: "Graphic Designer", text: "The community is so supportive. I've not only learned new design software but also made some great friends." },
        { name: "David K.", role: "Student", text: "As a student on a budget, this platform is a game-changer. I'm learning to code from a senior engineer for free!" },
        { name: "Emily W.", role: "Photographer", text: "I taught basic photography and in return, I learned how to build my own portfolio website. Absolutely incredible." },
        { name: "Alex G.", role: "Marketing Pro", text: "The perfect platform to sharpen my public speaking skills with a seasoned professional. Highly recommended!" },
    ];
    
    // Duplicate testimonials for a seamless loop
    const duplicatedTestimonials = [...testimonials, ...testimonials];

    return (
        <section id="testimonials" className="py-20 sm:py-24 bg-purple-50/50 overflow-hidden">
            <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                 <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">What Our Community Says</h2>
            </div>
            <div className="relative w-full overflow-hidden">
                <motion.div 
                    className="flex gap-8"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                        ease: 'linear',
                        duration: 40,
                        repeat: Infinity,
                    }}
                >
                    {duplicatedTestimonials.map((t, i) => (
                        <div key={i} className="flex-shrink-0 p-8 bg-white rounded-2xl shadow-lg border border-gray-100 w-80 md:w-96">
                            <Quote className="w-8 h-8 text-purple-300 mb-4" />
                            <p className="text-gray-700 text-sm sm:text-base mb-6 h-24">“{t.text}”</p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 text-white flex items-center justify-center font-bold text-lg">
                                    {t.name.charAt(0)}
                                </div>
                                <div className="ml-4 text-left">
                                    <h4 className="font-bold text-gray-800">{t.name}</h4>
                                    <span className="text-purple-500 text-sm">{t.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 via-transparent to-purple-50/50 pointer-events-none"></div>
            </div>
        </section>
    );
};

const CtaSection = ({ onGetStartedClick }) => (
    <AnimatedSection>
        <div className="max-w-4xl mx-auto text-center py-16 px-6 sm:px-8 relative overflow-hidden bg-white/60 border border-gray-100 rounded-2xl shadow-xl">
             <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute top-0 -left-1/4 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 -right-1/4 w-96 h-96 bg-indigo-400 rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Skills?</h2>
                <p className="text-lg sm:text-xl text-gray-600 mb-8">Join thousands of learners and teachers already growing together on SkillSwap.</p>
                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(124, 58, 237, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onGetStartedClick}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-10 py-5 rounded-full text-lg sm:text-xl font-bold transform transition-all duration-300 shadow-lg"
                >
                    Join For Free
                </motion.button>
            </div>
        </div>
    </AnimatedSection>
);

const Footer = () => (
    <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
                <div className="flex justify-center space-x-6 md:order-2">
                     <a href="#" className="text-gray-400 hover:text-white"><Twitter/></a>
                     <a href="#" className="text-gray-400 hover:text-white"><Github/></a>
                     <a href="#" className="text-gray-400 hover:text-white"><Linkedin/></a>
                </div>
                <div className="mt-8 md:mt-0 md:order-1">
                    <p className="text-center text-base text-gray-400">
                        &copy; {new Date().getFullYear()} SkillSwap. All rights reserved.
                    </p>
                </div>
            </div>
            <div className="mt-8 text-center text-sm text-gray-500">
                <a href="#features" className="hover:underline mx-2">Features</a>
                <a href="#how-it-works" className="hover:underline mx-2">How It Works</a>
                <a href="#testimonials" className="hover:underline mx-2">Testimonials</a>
            </div>
        </div>
    </footer>
);

// --- MAIN HomePage Component ---
const HomePage = () => {
    const navigate = useNavigate();
    const handleGetStarted = () => navigate('/auth');

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-indigo-50 text-gray-800 font-sans">
            <HeroSection onGetStartedClick={handleGetStarted} />
            <FeaturesSection />
            <HowItWorksSection />
            <PopularSkillsSection />
            <TestimonialsSection />
            <CtaSection onGetStartedClick={handleGetStarted} />
          
        </div>
    );
};

export default HomePage;

