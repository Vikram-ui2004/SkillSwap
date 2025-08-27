import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Menu, X, UserCircle, LogOut, Compass } from 'lucide-react';

// --- Reusable NavLink Component for Hover Animation ---
const NavLink = ({ children, href }) => {
  return (
    <a 
      href={href} 
      className="relative text-lg font-medium text-[#D4BEE4] transition-colors hover:text-white"
    >
      <span className="relative z-10">{children}</span>
    </a>
  );
};

// --- Main Navbar Component ---
const Navbar = ({ isLoggedIn, onLoginClick, onLogoutClick, userName }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Animation variants for the mobile menu container
  const mobileMenuVariants = {
    hidden: {
      x: '100%',
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    visible: {
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  // Animation variants for the staggered list items in mobile menu
  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 120,
      },
    }),
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#3B1E54]/30 backdrop-filter backdrop-blur-xl border-b border-white/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a href="#" className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-[#D4BEE4]" />
              <span className="text-2xl font-bold text-white">
                SkillSwap
              </span>
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              {isLoggedIn ? (
                <>
                  <span className="text-lg text-[#D4BEE4]">Hello, {userName}</span>
                  <button onClick={onLogoutClick} className="flex items-center space-x-2 text-lg font-medium text-[#D4BEE4] hover:text-white transition-colors">
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
                    className="bg-[#9B7EBD] text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-[#D4BEE4] hover:text-[#3B1E54] transform hover:scale-105 transition-all duration-300"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(true)} 
              className="md:hidden text-white"
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-50 bg-[#3B1E54]/30 backdrop-filter backdrop-blur-xl md:hidden"
          >
            <div className="flex justify-end p-6">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-white"
                aria-label="Close menu"
              >
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center h-full -mt-20 space-y-8">
              {isLoggedIn ? (
                <>
                  <motion.div custom={0} variants={listItemVariants} initial="hidden" animate="visible" className="flex items-center space-x-3 text-2xl text-white">
                    <UserCircle size={30} />
                    <span>Hello, {userName}</span>
                  </motion.div>
                  <motion.button onClick={onLogoutClick} custom={1} variants={listItemVariants} initial="hidden" animate="visible" className="flex items-center space-x-3 text-2xl text-white">
                    <LogOut size={30} />
                    <span>Logout</span>
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.a href="#features" onClick={() => setMobileMenuOpen(false)} custom={0} variants={listItemVariants} initial="hidden" animate="visible" className="text-3xl font-semibold text-white">Features</motion.a>
                  <motion.a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} custom={1} variants={listItemVariants} initial="hidden" animate="visible" className="text-3xl font-semibold text-white">How it Works</motion.a>
                  <motion.div custom={2} variants={listItemVariants} initial="hidden" animate="visible">
                    <button
                      onClick={() => { onLoginClick(); setMobileMenuOpen(false); }}
                      className="bg-[#9B7EBD] text-white px-8 py-4 rounded-full text-xl font-semibold"
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