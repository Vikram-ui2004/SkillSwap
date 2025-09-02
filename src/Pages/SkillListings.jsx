import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Star,
  User,
  Clock,
  Award,
  BookOpen,
  Code,
  Bell,
  Music,
  Palette,
  Dumbbell,
  Camera,
  Languages,
  Coffee,
  Zap,
  Heart,
  MessageCircle,
  X,
  ChevronDown,
  TrendingUp,
  Users,
  Calendar,
  LogOut,
  Menu,
  Home,
  Grid3X3,
  MessageSquare,
  Settings,
  Sparkles
} from 'lucide-react';

// Enhanced dummy data
const dummySkills = [
  {
    id: 1,
    name: 'Python for Data Science',
    category: 'Coding',
    teacher: 'alice_dev',
    teacherName: 'Alice Johnson',
    rating: 4.8,
    reviews: 127,
    price: 'Free',
    duration: '45 min',
    level: 'Beginner',
    description: 'Learn Python fundamentals for data analysis and visualization',
    avatar: 'https://placehold.co/80x80/7E69AB/FFFFFF?text=AJ',
    tags: ['Python', 'Data Science', 'Pandas'],
    studentsCount: 245,
    isOnline: true,
    nextAvailable: 'Today 3:00 PM'
  },
  {
    id: 2,
    name: 'Acoustic Guitar Basics',
    category: 'Music',
    teacher: 'strum_master',
    teacherName: 'Mike Rodriguez',
    rating: 4.9,
    reviews: 89,
    price: '5 SkillCoins',
    duration: '60 min',
    level: 'Beginner',
    description: 'Master the basics of acoustic guitar with hands-on practice',
    avatar: 'https://placehold.co/80x80/4CAF50/FFFFFF?text=MR',
    tags: ['Guitar', 'Music Theory', 'Chords'],
    studentsCount: 156,
    isOnline: true,
    nextAvailable: 'Tomorrow 7:00 PM'
  },
  {
    id: 3,
    name: 'Digital Art Masterclass',
    category: 'Art',
    teacher: 'pixel_artist',
    teacherName: 'Sarah Chen',
    rating: 4.7,
    reviews: 203,
    price: '8 SkillCoins',
    duration: '90 min',
    level: 'Intermediate',
    description: 'Create stunning digital artwork using professional techniques',
    avatar: 'https://placehold.co/80x80/FF9800/FFFFFF?text=SC',
    tags: ['Photoshop', 'Digital Art', 'Design'],
    studentsCount: 189,
    isOnline: false,
    nextAvailable: 'Sep 5, 2:00 PM'
  },
  {
    id: 4,
    name: 'Yoga & Mindfulness',
    category: 'Fitness',
    teacher: 'zen_master',
    teacherName: 'Priya Sharma',
    rating: 4.6,
    reviews: 145,
    price: 'Free',
    duration: '75 min',
    level: 'All Levels',
    description: 'Find inner peace through yoga and mindfulness practices',
    avatar: 'https://placehold.co/80x80/9C27B0/FFFFFF?text=PS',
    tags: ['Yoga', 'Meditation', 'Wellness'],
    studentsCount: 312,
    isOnline: true,
    nextAvailable: 'Today 6:00 AM'
  },
  {
    id: 5,
    name: 'React Advanced Patterns',
    category: 'Coding',
    teacher: 'react_ninja',
    teacherName: 'David Kim',
    rating: 4.9,
    reviews: 167,
    price: '12 SkillCoins',
    duration: '120 min',
    level: 'Advanced',
    description: 'Master advanced React patterns and state management',
    avatar: 'https://placehold.co/80x80/2196F3/FFFFFF?text=DK',
    tags: ['React', 'JavaScript', 'State Management'],
    studentsCount: 98,
    isOnline: true,
    nextAvailable: 'Sep 4, 4:00 PM'
  },
  {
    id: 6,
    name: 'Portrait Photography',
    category: 'Photography',
    teacher: 'lens_wizard',
    teacherName: 'Emma Wilson',
    rating: 4.8,
    reviews: 92,
    price: '15 SkillCoins',
    duration: '100 min',
    level: 'Intermediate',
    description: 'Capture stunning portraits with professional lighting techniques',
    avatar: 'https://placehold.co/80x80/E91E63/FFFFFF?text=EW',
    tags: ['Photography', 'Lighting', 'Composition'],
    studentsCount: 76,
    isOnline: false,
    nextAvailable: 'Sep 6, 10:00 AM'
  }
];

const categories = [
  { name: 'All', icon: BookOpen, count: dummySkills.length },
  { name: 'Coding', icon: Code, count: dummySkills.filter(s => s.category === 'Coding').length },
  { name: 'Music', icon: Music, count: dummySkills.filter(s => s.category === 'Music').length },
  { name: 'Art', icon: Palette, count: dummySkills.filter(s => s.category === 'Art').length },
  { name: 'Fitness', icon: Dumbbell, count: dummySkills.filter(s => s.category === 'Fitness').length },
  { name: 'Photography', icon: Camera, count: dummySkills.filter(s => s.category === 'Photography').length }
];

const sortOptions = [
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price', label: 'Price: Low to High' },
  { value: 'students', label: 'Most Popular' },
  { value: 'newest', label: 'Newest First' }
];

// Enhanced Navbar Component
const SkillsNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Skills', icon: Grid3X3, path: '/skills', active: true },
    { name: 'Messages', icon: MessageSquare, path: '/messages' },
    { name: 'Community', icon: Users, path: '/community' },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-purple-200/20' 
            : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate('/dashboard')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="relative"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <BookOpen className="text-purple-600" size={28} />
                <motion.div
                  className="absolute -inset-1 bg-purple-400/20 rounded-full blur"
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
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                SkillSwap
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    item.active
                      ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                      : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                  {item.active && (
                    <motion.div
                      className="w-2 h-2 bg-purple-500 rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              ))}
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
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>

              {/* User Menu - Desktop */}
              <div className="hidden md:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.displayName || user?.email?.split('@')[0]}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Learner</p>
                </div>
                <motion.img
                  src={user?.photoURL || "https://placehold.co/40x40/7E69AB/FFFFFF?text=U"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-purple-200 cursor-pointer"
                  whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(126, 105, 171, 0.3)" }}
                  onClick={() => navigate('/dashboard')}
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
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white dark:bg-gray-900 z-50 md:hidden 
                         shadow-2xl border-l border-purple-200/20"
            >
              {/* Mobile Menu Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={user?.photoURL || "https://placehold.co/40x40/7E69AB/FFFFFF?text=U"}
                    alt="Profile"
                    className="w-12 h-12 rounded-full border-2 border-purple-200"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user?.displayName || user?.email?.split('@')[0]}
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
                          ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
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

// Modal Component
const Modal = ({ children, onClose }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

// Search and Filter Component
const SearchAndFilter = ({ search, setSearch, category, setCategory, sortBy, setSortBy }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <motion.div 
        className="relative max-w-2xl mx-auto mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for skills, teachers, or topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                     rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                     text-gray-900 dark:text-white placeholder-gray-500 text-lg"
          />
        </div>
      </motion.div>

      {/* Filter Toggle Button */}
      <div className="flex justify-center mb-6">
        <motion.button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-6 py-3 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 
                   rounded-full font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/70 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Filter size={20} />
          Filters & Sort
          <ChevronDown className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} size={16} />
        </motion.button>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-gray-200 dark:border-gray-700"
          >
            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {categories.map((cat) => {
                  const IconComponent = cat.icon;
                  return (
                    <motion.button
                      key={cat.name}
                      onClick={() => setCategory(cat.name)}
                      className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all
                        ${category === cat.name 
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 text-gray-700 dark:text-gray-300'
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent size={24} className="mb-2" />
                      <span className="text-sm font-medium">{cat.name}</span>
                      <span className="text-xs opacity-70">({cat.count})</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full md:w-auto px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 
                         rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Skill Card Component
const SkillCard = ({ skill, onRequest, index }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(126, 105, 171, 0.2)" }}
      className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 
               overflow-hidden group hover:border-purple-200 dark:hover:border-purple-700 transition-all duration-300"
    >
      {/* Card Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={skill.avatar}
              alt={skill.teacherName}
              className="w-12 h-12 rounded-full border-2 border-purple-200"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
                {skill.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">by {skill.teacherName}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {skill.isOnline && (
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {skill.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {skill.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 
                       text-xs rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="text-yellow-400 fill-current" size={16} />
              <span className="font-semibold">{skill.rating}</span>
              <span>({skill.reviews})</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>{skill.studentsCount}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{skill.duration}</span>
          </div>
        </div>

        {/* Level and Price */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold
            ${skill.level === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' :
              skill.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300' :
              'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
            }`}>
            {skill.level}
          </span>
          <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
            {skill.price}
          </span>
        </div>

        {/* Next Available */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <Calendar size={16} />
          <span>Next: {skill.nextAvailable}</span>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 pb-6">
        <motion.button
          onClick={() => onRequest(skill)}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold 
                   rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300
                   flex items-center justify-center gap-2 group-hover:shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <MessageCircle size={18} />
          Request Session
        </motion.button>
      </div>
    </motion.div>
  );
};

// Request Modal Component
const RequestModal = ({ skill, onClose, onConfirm }) => {
  const [message, setMessage] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const timeSlots = [
    'Today 3:00 PM',
    'Today 6:00 PM',
    'Tomorrow 10:00 AM',
    'Tomorrow 2:00 PM',
    'Sep 5, 9:00 AM'
  ];

  return (
    <Modal onClose={onClose}>
      <div className="p-6 max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Request Session</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Skill Info */}
        <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl mb-6">
          <img
            src={skill.avatar}
            alt={skill.teacherName}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">with {skill.teacherName}</p>
            <div className="flex items-center gap-2 mt-1">
              <Star className="text-yellow-400 fill-current" size={14} />
              <span className="text-sm font-medium">{skill.rating}</span>
              <span className="text-sm text-purple-600 dark:text-purple-400 font-semibold">{skill.price}</span>
            </div>
          </div>
        </div>

        {/* Time Selection */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Preferred Time
          </label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 
                     rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
            required
          >
            <option value="">Select a time slot</option>
            {timeSlots.map((slot, idx) => (
              <option key={idx} value={slot}>{slot}</option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Message (Optional)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell the teacher what you'd like to focus on..."
            rows="3"
            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 
                     rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white
                     placeholder-gray-500 resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                     rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <motion.button
            onClick={() => onConfirm({ time: selectedTime, message })}
            disabled={!selectedTime}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white 
                     rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
                     flex items-center justify-center gap-2"
            whileHover={{ scale: selectedTime ? 1.02 : 1 }}
            whileTap={{ scale: selectedTime ? 0.98 : 1 }}
          >
            <Zap size={18} />
            Send Request
          </motion.button>
        </div>
      </div>
    </Modal>
  );
};

// Main Skills Listings Component
const SkillListings = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [filteredSkills, setFilteredSkills] = useState(dummySkills);
  const [requestingSkill, setRequestingSkill] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let filtered = [...dummySkills];

    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter((skill) => skill.category === category);
    }

    // Filter by search
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((skill) =>
        skill.name.toLowerCase().includes(searchLower) ||
        skill.teacherName.toLowerCase().includes(searchLower) ||
        skill.description.toLowerCase().includes(searchLower) ||
        skill.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.price === 'Free' ? -1 : b.price === 'Free' ? 1 : 0;
        case 'students':
          return b.studentsCount - a.studentsCount;
        default:
          return 0;
      }
    });

    setFilteredSkills(filtered);
  }, [search, category, sortBy]);

  const handleRequestSession = (skill) => {
    setRequestingSkill(skill);
  };

  const handleConfirmRequest = ({ time, message }) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      alert(`Session request sent to ${requestingSkill.teacherName} for ${time}!`);
      setRequestingSkill(null);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950">
      {/* Enhanced Navbar */}
      <SkillsNavbar />
      
      {/* Add top padding to account for fixed navbar */}
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              Skill <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Marketplace</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover amazing skills from talented teachers around the world. Learn anything, from anyone, anywhere.
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{dummySkills.length}+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Skills Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Expert Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">10k+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Happy Students</div>
              </div>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <SearchAndFilter
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* Results Count */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-purple-600">{filteredSkills.length}</span> skills
              {category !== 'All' && <span> in <span className="font-semibold">{category}</span></span>}
              {search && <span> for "<span className="font-semibold">{search}</span>"</span>}
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredSkills.length > 0 ? (
                filteredSkills.map((skill, index) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    onRequest={handleRequestSession}
                    index={index}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-16"
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No skills found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <button
                    onClick={() => {
                      setSearch('');
                      setCategory('All');
                    }}
                    className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold 
                             hover:bg-purple-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Request Modal */}
          <AnimatePresence>
            {requestingSkill && (
              <RequestModal
                skill={requestingSkill}
                onClose={() => setRequestingSkill(null)}
                onConfirm={handleConfirmRequest}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SkillListings;
