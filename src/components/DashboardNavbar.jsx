import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import purplelogo from '../assets/purple-logo.png';

import {
  BookOpen,
  Zap,
  Award,
  Heart,
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
  Clock,
  User
} from "lucide-react";

// Notification Dropdown Component
const NotificationDropdown = ({ notifications, onSelect, onMarkAllRead }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 
                   hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-full transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Notifications"
      >
        <Bell size={22} />
        {unreadCount > 0 && (
          <>
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
            />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-96 max-h-96 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl 
                       rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <motion.button
                    onClick={onMarkAllRead}
                    className="text-sm text-purple-600 hover:text-purple-700 font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Mark all read
                  </motion.button>
                )}
              </div>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No notifications yet</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    You'll see session requests and updates here
                  </p>
                </div>
              ) : (
                notifications.map((notification, index) => (
                  <motion.button
                    key={notification.id}
                    onClick={() => {
                      onSelect(notification);
                      setOpen(false);
                    }}
                    className={`w-full p-4 text-left border-b border-gray-100 dark:border-gray-700 
                              last:border-b-0 hover:bg-purple-50 dark:hover:bg-purple-900/20 
                              transition-all duration-200 ${
                      !notification.read ? 'bg-purple-50/50 dark:bg-purple-900/10' : ''
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-xl ${
                        notification.type === 'request' 
                          ? 'bg-blue-100 dark:bg-blue-900/30' 
                          : notification.type === 'accepted'
                          ? 'bg-green-100 dark:bg-green-900/30'
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}>
                        {notification.type === 'request' ? (
                          <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        ) : notification.type === 'accepted' ? (
                          <Heart className="h-4 w-4 text-green-600 dark:text-green-400" />
                        ) : (
                          <Bell className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-purple-500 rounded-full ml-2" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {notification.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{notification.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                <button 
                  onClick={() => setOpen(false)}
                  className="w-full text-center text-sm text-purple-600 hover:text-purple-700 font-semibold"
                >
                  View All Notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Enhanced Navbar Component
const DashboardNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Dummy notifications state
  const [notifications, setNotifications] = useState([
    {
      id: 'notif_001',
      type: 'request',
      title: 'New Session Request',
      description: 'Alex Rodriguez wants to learn UI/UX Design Fundamentals from you',
      timeAgo: '2 hours ago',
      read: false,
      requestId: 'req_123456',
      studentName: 'Alex Rodriguez'
    },
    {
      id: 'notif_002', 
      type: 'accepted',
      title: 'Session Request Accepted',
      description: 'Sarah Chen accepted your React Development session request',
      timeAgo: '1 day ago',
      read: true,
      requestId: 'req_123455',
      studentName: 'Sarah Chen'
    },
    {
      id: 'notif_003',
      type: 'request',
      title: 'New Session Request',
      description: 'Mike Johnson wants to learn Python Programming from you',
      timeAgo: '3 days ago',
      read: false,
      requestId: 'req_123454',
      studentName: 'Mike Johnson'
    }
  ]);

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  const handleNotificationSelect = (notification) => {
    // Mark notification as read
    setNotifications(prev => 
      prev.map(n => 
        n.id === notification.id ? { ...n, read: true } : n
      )
    );

    // Navigate to session request page
    if (notification.type === 'request') {
      navigate(`/skills/session/${notification.requestId}`, {
        state: { 
          requestData: notification,
          fromNotification: true
        }
      });
    }
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Skills", icon: Grid3X3, path: "/skills" },
    { name: 'Matchmaking', icon: Heart, path: '/matchmaking'}
  ];

  // Default state for new users
  const defaultUserData = {
    name: user?.displayName || user?.email?.split("@")[0] || "User",
    bio: "React developer passionate about sharing knowledge and learning new design skills.",
    profilePicture: user?.photoURL || "https://placehold.co/128x128/7E69AB/FFFFFF?text=U",
  };

  // Firestore-backed state
  const [currentUser, setCurrentUser] = useState(defaultUserData);

  // Fetch user data from Firestore on load
  useEffect(() => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);

    const unsub = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCurrentUser(data);
      } else {
        // If no doc, create default one
        setDoc(userRef, defaultUserData);
      }
    }, (error) => {
      console.error("Realtime listener error:", error);
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
              {/* Enhanced Notifications with Dropdown */}
              <NotificationDropdown 
                notifications={notifications}
                onSelect={handleNotificationSelect}
                onMarkAllRead={handleMarkAllRead}
              />

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
                      {currentUser?.name || user?.displayName || user?.email?.split("@")[0]}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {currentUser?.role || "Teacher & Learner"}
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
                  {navItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <motion.button
                        key={item.name}
                        onClick={() => {
                          navigate(item.path);
                          setShowMobileMenu(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                          isActive
                            ? "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300"
                            : "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                        }`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileTap={{ scale: 0.98 }}
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
                            layoutId="activeDotMobile"
                            className="w-2 h-2 bg-purple-500 rounded-full ml-auto"
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
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
