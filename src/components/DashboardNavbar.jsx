import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import {  db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";


import {
 
  BookOpen,
  Zap,
  Award,

  X,
  
  LogOut,

  Bell,
  ShieldCheck,
  Star,
  Home,
  Grid3X3,
  MessageSquare,
  Users,
  Menu,
  
} from "lucide-react";

// Enhanced Navbar Component (Same as SkillListings)
const DashboardNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard", active: true },
    { name: "Skills", icon: Grid3X3, path: "/skills" },
    { name: "Messages", icon: MessageSquare, path: "/messages" },
    { name: "Community", icon: Users, path: "/community" },
  ];

 


  // --- Default state for new users
  const defaultUserData = {
    name: user?.displayName || user?.email?.split("@")[0] || "User",
    bio: "React developer passionate about sharing knowledge and learning new design skills.",
    profilePicture:
      user?.photoURL || "https://placehold.co/128x128/7E69AB/FFFFFF?text=U",
    
  };

  // --- Firestore-backed state
  const [currentUser, setCurrentUser] = useState(defaultUserData);


  // --- Fetch user data from Firestore on load
  useEffect(() => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);

    const unsub = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCurrentUser(data);
        setProfileForm(data);
       
      } else {
        // If no doc, create default one
        setDoc(userRef, defaultUserData);
      }
      (error) => {
        console.error("Realtime listener error:", error);
      };
    });

    return () => unsub();
  }, [user]);

  

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-purple-200/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/dashboard")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BookOpen className="text-purple-600" size={28} />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                SkillSwap
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
           
{navItems.map((item) => {
  const isActive = location.pathname === item.path;

  return (
    <motion.button
      key={item.name}
      onClick={() => navigate(item.path)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
        isActive
          ? "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300"
          : "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
      }`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <item.icon
        size={18}
        className={`transition-colors duration-300 ${
          isActive
            ? "text-purple-600 dark:text-purple-300"
            : "text-gray-500 dark:text-gray-400"
        }`}
      />
      <span>{item.name}</span>
      {isActive && (
        <motion.div
          layoutId="activeDot"
          className="w-2 h-2 bg-purple-500 rounded-full"
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      )}
    </motion.button>
  );
})}

            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <motion.button
                className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 
                           hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-full transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bell size={22} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              </motion.button>

              {/* User Menu - Desktop */}
          <div className="hidden md:flex items-center gap-3">
  <div className="text-right">
    <p className="text-sm font-medium text-gray-900 dark:text-white">
      {currentUser?.name || user?.displayName || user?.email?.split("@")[0]}
    </p>
    <p className="text-xs text-gray-500 dark:text-gray-400">
      {currentUser?.role || "Teacher & Learner"}
    </p>
  </div>
  <motion.img
    src={
      currentUser?.profilePicture ||
      user?.photoURL ||
      "https://placehold.co/40x40/7E69AB/FFFFFF?text=U"
    }
    alt="Profile"
    className="w-10 h-10 rounded-full border-2 border-purple-200 cursor-pointer"
    whileHover={{ scale: 1.1 }}
    onClick={() => navigate("/dashboard")}
  />
  <motion.button
    onClick={handleLogout}
    className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-500 
             hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all duration-300"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <LogOut size={18} />
  </motion.button>
</div>


              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setShowMobileMenu(true)}
                className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 
                           hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-full transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Menu size={24} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setShowMobileMenu(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white dark:bg-gray-900 z-50 md:hidden 
                         shadow-2xl border-l border-purple-200/20"
            >
              {/* Mobile Menu Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Dashboard Menu
                  </h2>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={
                      user?.photoURL ||
                      "https://placehold.co/40x40/7E69AB/FFFFFF?text=U"
                    }
                    alt="Profile"
                    className="w-12 h-12 rounded-full border-2 border-purple-200"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user?.displayName || user?.email?.split("@")[0]}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation Items */}
              <div className="p-6">
                <nav className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      onClick={() => {
                        navigate(item.path);
                        setShowMobileMenu(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                        item.active
                          ? "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <item.icon size={20} />
                      <span className="font-medium">{item.name}</span>
                      {item.active && (
                        <div className="ml-auto w-2 h-2 bg-purple-500 rounded-full" />
                      )}
                    </motion.button>
                  ))}
                </nav>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <motion.button
                    onClick={() => {
                      handleLogout();
                      setShowMobileMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 
                             hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardNavbar;