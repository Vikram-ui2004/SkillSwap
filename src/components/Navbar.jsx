import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import purplelogo from '../assets/purple-logo.png'; 
import { BookOpen, Menu, X, UserCircle, LogOut, Sparkles, Home, Info } from 'lucide-react';

// Enhanced NavLink with cool hover effects
const NavLink = ({ children, href, icon: Icon }) => {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative group flex items-center space-x-2 px-4 py-2 rounded-full 
                 text-base font-medium text-[#1f2040] hover:text-white
                 transition-all duration-300 ease-out overflow-hidden"
    >
      {/* Animated background on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#7E69AB] to-[#9B7EDB] rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      
      {/* Icon with glow effect */}
      {Icon && (
        <motion.div
          className="relative z-10"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Icon size={18} />
        </motion.div>
      )}
      
      {/* Text with sparkle effect */}
      <span className="relative z-10 flex items-center space-x-1">
        <span>{children}</span>
        <motion.div
          className="opacity-0 group-hover:opacity-100"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1, rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          <Sparkles size={12} />
        </motion.div>
      </span>
      
      {/* Bottom glow line */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#7E69AB] to-[#9B7EDB] 
                   opacity-0 group-hover:opacity-100"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
};

// Enhanced Main Navbar Component
const Navbar = ({ isLoggedIn, onLoginClick, onLogoutClick, userName }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation();

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Hide/show navbar
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      
      // Change navbar appearance when scrolled
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  // Enhanced mobile menu animations
  const mobileMenuVariants = {
    hidden: { 
      x: '100%', 
      opacity: 0,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 40,
        staggerChildren: 0.1,
        staggerDirection: -1
      } 
    },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 40,
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 24 
      }
    },
  };

  const homeLinkOffset = location.pathname !== '/' ? 1 : 0;

  return (
    <>
      <motion.nav
        animate={{ 
          y: showNav ? 0 : -100,
          scale: showNav ? 1 : 0.95
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`fixed top-4 left-4 right-4 z-50 rounded-2xl shadow-2xl transform
                   transition-all duration-500 ease-out
                   ${isScrolled 
                     ? 'bg-white/95 backdrop-blur-2xl border border-purple-200/50 shadow-purple-500/20' 
                     : 'bg-white/90 backdrop-blur-xl border border-black/10'
                   }`}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-indigo-500/5"
          animate={{ 
            background: isScrolled 
              ? "linear-gradient(90deg, rgba(126,105,171,0.1) 0%, rgba(155,126,219,0.1) 100%)"
              : "linear-gradient(90deg, rgba(126,105,171,0.05) 0%, rgba(155,126,219,0.05) 100%)"
          }}
          transition={{ duration: 0.5 }}
        />
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Enhanced Logo */}
            <motion.a 
              href="/" 
              className="flex items-center group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="relative"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <img 
                  src={purplelogo} 
                  alt="SkillSwap Logo" 
                  className="w-18 h-18 object-contain drop-shadow-lg" 
                />
                {/* Glow effect */}
                <motion.div 
                  className="absolute inset-0 rounded-full bg-purple-400/30 blur-lg"
                  animate={{ 
                    scale: [1, 1.2, 1],
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
                className="ml-0 text-2xl font-bold bg-gradient-to-r from-[#1f2040] to-[#7E69AB] 
                           bg-clip-text text-transparent"
                whileHover={{ 
                  background: "linear-gradient(90deg, #7E69AB 0%, #9B7EDB 100%)",
                  WebkitBackgroundClip: "text"
                }}
              >
                SkillSwap
              </motion.span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {isLoggedIn ? (
                <>
                  {/* Welcome message with animation */}
                  <motion.div
                    className="flex items-center space-x-2 px-4 py-2 rounded-full 
                               bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/50"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <UserCircle className="text-[#7E69AB]" size={20} />
                    <span className="text-[#384060] font-medium">Hello, {userName}</span>
                  </motion.div>
                  
                  {location.pathname !== '/' && <NavLink href="/" icon={Home}>Home</NavLink>}
                  
                  <motion.button
                    onClick={onLogoutClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full 
                               text-[#1f2040] hover:text-white hover:bg-gradient-to-r 
                               hover:from-red-500 hover:to-pink-500 transition-all duration-300"
                  >
                    <LogOut size={18} />
                    <span className="font-medium">Logout</span>
                  </motion.button>
                </>
              ) : (
                <>
                  {location.pathname !== '/' && <NavLink href="/" icon={Home}>Home</NavLink>}
                  <NavLink href="/about" icon={Info}>About Us</NavLink>
                  
                  {/* Enhanced CTA Button */}
                  <motion.button
                    onClick={onLoginClick}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(126, 105, 171, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-6 py-3 rounded-full font-semibold text-white overflow-hidden
                               bg-gradient-to-r from-[#7E69AB] to-[#9B7EDB] 
                               hover:from-[#6A4E96] hover:to-[#8B6EC7]
                               shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Sparkle effect */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <Sparkles className="text-white/30" size={16} />
                    </motion.div>
                    
                    <span className="relative z-10 flex items-center space-x-2">
                      <span>Get Started</span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.button>
                </>
              )}
            </div>

            {/* Enhanced Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden relative p-2 text-[#1f2040] hover:text-[#7E69AB] 
                         transition-colors duration-300 rounded-lg hover:bg-purple-50"
              aria-label="Open menu"
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Menu size={28} />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-y-0 right-0 w-80 z-50 md:hidden
                         bg-gradient-to-br from-white via-purple-50/50 to-indigo-50/50
                         backdrop-blur-2xl border-l border-purple-200/50 shadow-2xl"
            >
              {/* Close button */}
              <div className="flex justify-end p-6">
                <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-[#1f2040] hover:text-[#7E69AB] transition-colors 
                             rounded-full hover:bg-purple-100"
                  aria-label="Close menu"
                >
                  <X size={32} />
                </motion.button>
              </div>

              {/* Menu Items */}
              <motion.div 
                className="flex flex-col items-center justify-center h-full -mt-20 space-y-8 px-8"
                variants={mobileMenuVariants}
              >
                {isLoggedIn ? (
                  <>
                    {location.pathname !== '/' && (
                      <motion.a
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                        variants={mobileItemVariants}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-3 text-3xl font-bold text-[#1f2040] 
                                   hover:text-[#7E69AB] transition-all duration-300
                                   p-4 rounded-2xl hover:bg-purple-100/50"
                      >
                        <Home size={32} />
                        <span>Home</span>
                      </motion.a>
                    )}
                    
                    <motion.div
                      variants={mobileItemVariants}
                      className="flex items-center space-x-4 text-2xl text-[#1f2040] 
                                 p-6 rounded-2xl bg-gradient-to-r from-purple-100/50 to-indigo-100/50
                                 border border-purple-200/50"
                    >
                      <UserCircle size={32} />
                      <span className="font-semibold">Hello, {userName}</span>
                    </motion.div>
                    
                    <motion.button
                      onClick={() => { onLogoutClick(); setMobileMenuOpen(false); }}
                      variants={mobileItemVariants}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-3 text-2xl text-[#1f2040] 
                                 hover:text-red-500 transition-all duration-300
                                 p-4 rounded-2xl hover:bg-red-50"
                    >
                      <LogOut size={30} />
                      <span className="font-semibold">Logout</span>
                    </motion.button>
                  </>
                ) : (
                  <>
                    {location.pathname !== '/' && (
                      <motion.a
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                        variants={mobileItemVariants}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-3 text-3xl font-bold text-[#1f2040] 
                                   hover:text-[#7E69AB] transition-all duration-300
                                   p-4 rounded-2xl hover:bg-purple-100/50"
                      >
                        <Home size={32} />
                        <span>Home</span>
                      </motion.a>
                    )}
                    
                    <motion.a
                      href="/about"
                      onClick={() => setMobileMenuOpen(false)}
                      variants={mobileItemVariants}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-3 text-3xl font-bold text-[#1f2040] 
                                 hover:text-[#7E69AB] transition-all duration-300
                                 p-4 rounded-2xl hover:bg-purple-100/50"
                    >
                      <Info size={32} />
                      <span>About Us</span>
                    </motion.a>
                    
                    <motion.div variants={mobileItemVariants}>
                      <motion.button
                        onClick={() => { onLoginClick(); setMobileMenuOpen(false); }}
                        whileHover={{ 
                          scale: 1.05, 
                          boxShadow: "0 15px 35px rgba(126, 105, 171, 0.4)" 
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="relative px-10 py-5 rounded-2xl text-xl font-bold text-white
                                   bg-gradient-to-r from-[#7E69AB] to-[#9B7EDB] 
                                   shadow-lg hover:shadow-purple-500/40 transition-all duration-300
                                   overflow-hidden"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10 flex items-center space-x-2">
                          <Sparkles size={20} />
                          <span>Get Started</span>
                          <motion.span
                            animate={{ x: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </span>
                      </motion.button>
                    </motion.div>
                  </>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
