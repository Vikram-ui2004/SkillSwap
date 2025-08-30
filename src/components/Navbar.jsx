import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Menu, X, UserCircle, LogOut } from 'lucide-react';

const NavLink = ({ children, href }) => {
  return (
    <a
      href={href}
      className="relative text-lg font-medium text-[#1f2040] hover:text-[#7E69AB] transition-colors group"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#7E69AB] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </a>
  );
};

// --- Main Navbar Component ---
const Navbar = ({ isLoggedIn, onLoginClick, onLogoutClick, userName }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // Scrolling down
        setShowNav(false);
      } else {
        // Scrolling up
        setShowNav(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const mobileMenuVariants = {
    hidden: { x: '100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
    visible: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1, type: 'spring', stiffness: 120 }
    }),
  };

  return (
    <>
      {/* White glass navbar */}
      <motion.nav
        animate={{ y: showNav ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed top-4 left-4 right-4 z-50 rounded-4xl shadow-lg transform translate-y-2
                   bg-white/90 backdrop-blur-xl border border-black/10 "
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a href="#" className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-[#7E69AB]" />
              <span className="text-2xl font-bold text-[#1f2040]">SkillSwap</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              {isLoggedIn ? (
                <>
                  <span className="text-lg text-[#384060]">Hello, {userName}</span>
                  <button
                    onClick={onLogoutClick}
                    className="flex items-center space-x-2 text-lg font-medium text-[#1f2040] hover:text-[#7E69AB] transition-colors"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <NavLink href="#features">Features</NavLink>
                  <NavLink href="#how-it-works">How it Works</NavLink>
                  <button
                    onClick={onLoginClick}
                    className="bg-[#7E69AB] text-white px-6 py-2 rounded-full text-lg font-semibold
                               hover:bg-[#5f4a96] hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-[#1f2040] hover:text-[#7E69AB] transition-colors"
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu (white sheet) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-x-0 top-0 bottom-0 z-50 md:hidden 
                       bg-gradient-to-b from-white to-gray-400 backdrop-blur-xl "
          >
            <div className="flex justify-end p-6">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#1f2040] hover:text-[#7E69AB] transition-colors"
                aria-label="Close menu"
              >
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center h-full -mt-20 space-y-8">
              {isLoggedIn ? (
                <>
                  <motion.div
                    custom={0}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center space-x-3 text-2xl text-[#1f2040]"
                  >
                    <UserCircle size={30} />
                    <span>Hello, {userName}</span>
                  </motion.div>
                  <motion.button
                    onClick={onLogoutClick}
                    custom={1}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center space-x-3 text-2xl text-[#1f2040] hover:text-[#7E69AB] transition-colors"
                  >
                    <LogOut size={30} />
                    <span>Logout</span>
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.a
                    href="#features"
                    onClick={() => setMobileMenuOpen(false)}
                    custom={0}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-3xl font-semibold text-[#1f2040] hover:text-[#7E69AB] transition-colors"
                  >
                    Features
                  </motion.a>
                  <motion.a
                    href="#how-it-works"
                    onClick={() => setMobileMenuOpen(false)}
                    custom={1}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-3xl font-semibold text-[#1f2040] hover:text-[#7E69AB] transition-colors"
                  >
                    How it Works
                  </motion.a>
                  <motion.div custom={2} variants={listItemVariants} initial="hidden" animate="visible">
                    <button
                      onClick={() => { onLoginClick(); setMobileMenuOpen(false); }}
                      className="bg-purple-600 text-white px-8 py-4 rounded-full text-xl font-semibold
                                 hover:bg-purple-800 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      Get Started
                    </button>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
