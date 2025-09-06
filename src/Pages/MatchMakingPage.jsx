import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNavbar';

// Import ONLY the icons used (tree-shakable)
import {
  Heart,
  X,
  MessageCircle,
  Star,
  ChevronLeft,
  ChevronRight,
  Filter,
  Target,
  Award,
  MapPin,
  Clock,
  RotateCcw,
  TrendingUp,
  Eye,
  Shield,
  Share2,
  Video,
  Phone,
  Bookmark,
  Laptop,
  Code2,
  PenTool,
  Palette,
  Layout,
  Ruler,
  Figma,
  MonitorCog,
  BarChart3,
  Megaphone,
  Globe2,
  LineChart,
  TerminalSquare,
  ChevronDown,
  Zap,
  Sparkles,
  Gift,
  Users,
  Calendar,
  CheckCircle,
  RefreshCw
} from 'lucide-react';

// Centralized mapping from skill names/categories to Lucide icons
const skillIconFor = (nameOrCategory) => {
  const key = (nameOrCategory || '').toLowerCase();

  // Exact names first
  const mapByName = {
    'ui/ux design': PenTool,
    'react development': Code2,
    'python programming': TerminalSquare,
    'digital marketing': Megaphone,
    'graphic design': Palette,
    'web development': Code2,
  };

  if (mapByName[key]) return mapByName[key];

  // Fallback by category/keywords
  if (key.includes('ui') || key.includes('ux') || key.includes('prototype')) return PenTool;
  if (key.includes('design system') || key.includes('layout')) return Layout;
  if (key.includes('figma')) return Figma;
  if (key.includes('research')) return Ruler;
  if (key.includes('react') || key.includes('frontend')) return Code2;
  if (key.includes('web')) return Code2;
  if (key.includes('python') || key.includes('automation') || key.includes('scrap')) return TerminalSquare;
  if (key.includes('seo') || key.includes('analytics')) return BarChart3;
  if (key.includes('marketing') || key.includes('ads')) return Megaphone;
  if (key.includes('branding') || key.includes('logo') || key.includes('print')) return Palette;
  if (key.includes('social')) return Globe2;
  if (key.includes('hooks') || key.includes('state')) return MonitorCog;
  if (key.includes('performance')) return Zap;
  if (key.includes('data')) return LineChart;

  return Laptop;
};

// Enhanced match data
const enhancedMatches = [
  {
    id: 1,
    user: {
      name: 'Sarah Chen',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=300&fit=crop',
      location: 'Ghaziabad, UP',
      rating: 4.8,
      bio: 'Passionate UX designer bridging design-dev gap through React mastery.',
      isVerified: true,
      isPremium: true,
      experience: '5+ years'
    },
    compatibility: 95,
    matchType: 'perfect',
    skills: {
      theyOffer: {
        name: 'UI/UX Design',
        level: 'Expert',
        rating: 4.9
      },
      youOffer: {
        name: 'React Development',
        level: 'Advanced',
        rating: 4.7
      }
    },
    mutualConnections: 3,
    sharedInterests: ['Tech', 'Startups']
  },
  {
    id: 2,
    user: {
      name: 'Rahul Sharma',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop',
      location: 'Delhi NCR',
      rating: 4.6,
      bio: 'Digital marketing specialist automating workflows with Python.',
      isVerified: true,
      isPremium: false,
      experience: '7+ years'
    },
    compatibility: 87,
    matchType: 'perfect',
    skills: {
      theyOffer: {
        name: 'Digital Marketing',
        level: 'Expert',
        rating: 4.8
      },
      youOffer: {
        name: 'Python Programming',
        level: 'Advanced',
        rating: 4.6
      }
    },
    mutualConnections: 1,
    sharedInterests: ['Automation', 'Data Analysis']
  },
  {
    id: 3,
    user: {
      name: 'Priya Patel',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1558655146-364adff25c26?w=600&h=300&fit=crop',
      location: 'Noida, UP',
      rating: 4.9,
      bio: 'Creative designer bringing brands to life through web development.',
      isVerified: true,
      isPremium: true,
      experience: '6+ years'
    },
    compatibility: 82,
    matchType: 'good',
    skills: {
      theyOffer: {
        name: 'Graphic Design',
        level: 'Expert',
        rating: 4.9
      },
      youOffer: {
        name: 'Web Development',
        level: 'Intermediate',
        rating: 4.5
      }
    },
    mutualConnections: 5,
    sharedInterests: ['Design', 'Photography']
  }
];

const Badge = ({ children, tone = 'default', icon: Icon, className = '' }) => {
  const tones = {
    success: 'bg-emerald-100 text-emerald-700 shadow-emerald-100/50 dark:bg-emerald-900/50 dark:text-emerald-300',
    warning: 'bg-amber-100 text-amber-700 shadow-amber-100/50 dark:bg-amber-900/50 dark:text-amber-300',
    premium: 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 shadow-purple-100/50 dark:from-purple-900/50 dark:to-indigo-900/50 dark:text-purple-300',
    default: 'bg-gray-100 text-gray-700 shadow-gray-100/50 dark:bg-gray-700 dark:text-gray-300'
  };
  return (
    <span className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl text-xs font-bold inline-flex items-center gap-2 shadow-lg backdrop-blur-sm ${tones[tone]} ${className}`}>
      {Icon && <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
      {children}
    </span>
  );
};

const RatingStars = ({ value, size = 'sm' }) => {
  const sizeClasses = {
    sm: 'h-3 w-3 sm:h-3.5 sm:w-3.5',
    md: 'h-3.5 w-3.5 sm:h-4 sm:w-4',
    lg: 'h-4 w-4 sm:h-5 sm:w-5'
  };

  return (
    <div className="flex items-center gap-0.5 sm:gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star 
          key={i} 
          className={`${sizeClasses[size]} ${i < Math.floor(value) ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'}`} 
        />
      ))}
      <span className={`font-bold ml-1 sm:ml-2 ${size === 'lg' ? 'text-base sm:text-lg' : size === 'md' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'}`}>
        {value}
      </span>
    </div>
  );
};

const SkillIconBlock = ({ name, level, rating, isOffering = false }) => {
  const Icon = skillIconFor(name);
  
  return (
    <div className="text-center group">
      <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br shadow-xl grid place-items-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl ${
        isOffering 
          ? 'from-purple-100 to-indigo-100 dark:from-purple-900/50 dark:to-indigo-900/50' 
          : 'from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50'
      }`}>
        <Icon className={`${isOffering ? 'text-purple-700 dark:text-purple-200' : 'text-emerald-700 dark:text-emerald-200'}`} size={18} />
      </div>
      <div className="mt-2 sm:mt-3">
        <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-tight">{name}</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">{level}</p>
        <div className="flex items-center justify-center mt-0.5 sm:mt-1">
          <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-amber-400 fill-amber-400 mr-1" />
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{rating}</span>
        </div>
      </div>
    </div>
  );
};

const StreamlinedMatchCard = ({ match, isPreview = false, showActions = false, onRequestSession, onViewProfile }) => {
  const { user, compatibility, skills, matchType, mutualConnections, sharedInterests } = match;
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <motion.div
      className={`h-full flex flex-col ${isPreview ? 'opacity-60' : ''}`}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: isPreview ? 0.6 : 1, scale: isPreview ? 0.96 : 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
    >
      {/* Enhanced Cover Section - Responsive Heights */}
      <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-indigo-500/20 z-10" />
        <img src={user.coverImage} alt={`${user.name} cover`} className="w-full h-full object-cover transform scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Profile Image with Responsive Sizing */}
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 z-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl sm:rounded-3xl blur-xl opacity-50 scale-110" />
            <img
              src={user.profileImage}
              alt={user.name}
              className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-white/90 shadow-2xl object-cover backdrop-blur-sm"
            />
            {/* Online Status - Responsive */}
            <span className="absolute -bottom-0.5 sm:-bottom-1 -right-0.5 sm:-right-1 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full border-2 sm:border-3 md:border-4 border-white shadow-lg grid place-items-center">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-white rounded-full animate-pulse" />
            </span>
            {/* Verification Badge - Responsive */}
            {user.isVerified && (
              <motion.span 
                className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full grid place-items-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 15 }}
              >
                <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white" />
              </motion.span>
            )}
          </div>
        </div>

        {/* Match Type Badges - Responsive Positioning */}
        <div className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 flex flex-col gap-2 sm:gap-3 z-20">
          {matchType === 'perfect' ? (
            <Badge tone="success" icon={Target}>Perfect Match</Badge>
          ) : (
            <Badge tone="warning" icon={Star}>Great Match</Badge>
          )}
          {user.isPremium && <Badge tone="premium" icon={Sparkles}>Premium</Badge>}
        </div>

        {/* Enhanced Compatibility Circle - Responsive */}
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 right-3 sm:right-4 md:right-6 z-20">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/95 backdrop-blur-md rounded-full grid place-items-center shadow-2xl border border-white/20">
            <div className="text-center">
              <div className="text-sm sm:text-base md:text-xl font-black text-purple-600">{compatibility}%</div>
              <div className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-600 font-semibold uppercase tracking-wide">Match</div>
            </div>
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="3" fill="none" className="text-purple-200/50" />
              <motion.circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="url(#gradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="100"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 100 * (1 - compatibility / 100) }}
                transition={{ duration: 1.5, type: "spring" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Streamlined Content Section - Responsive Padding */}
      <div className="p-3 sm:p-4 md:p-6 flex-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        {/* Header with Essential Info Only - Responsive */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
              <h3 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 dark:text-white">{user.name}</h3>
              <span className="text-xs sm:text-sm font-semibold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                {user.experience}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center font-medium">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-purple-500" />
                {user.location}
              </p>
              <RatingStars value={user.rating} size="sm" />
            </div>
          </div>

          <motion.button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 ${
              isBookmarked 
                ? 'text-amber-500 bg-amber-100 dark:bg-amber-900/50 shadow-lg shadow-amber-100/50' 
                : 'text-gray-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bookmark className="h-4 w-4 sm:h-5 sm:w-5" />
          </motion.button>
        </div>

        {/* Enhanced Skill Exchange Section - Responsive */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 mb-3 sm:mb-4 md:mb-5 border border-purple-200/50 dark:border-purple-700/50 shadow-lg">
          <div className="text-center mb-3 sm:mb-4">
            <h4 className="text-sm sm:text-base md:text-lg font-black text-gray-900 dark:text-white mb-1 sm:mb-2">Perfect Skill Exchange</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              {mutualConnections} mutual connections • {sharedInterests.length} shared interests
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <p className="text-xs font-bold text-purple-600 dark:text-purple-400 mb-1 sm:mb-2 uppercase tracking-wide">They Offer</p>
              <SkillIconBlock 
                name={skills.theyOffer.name} 
                level={skills.theyOffer.level} 
                rating={skills.theyOffer.rating}
                isOffering={true}
              />
            </div>

            <div className="flex flex-col items-center mx-3 sm:mx-4 md:mx-6">
              <motion.div 
                className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-purple-400" />
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-indigo-400" />
              </motion.div>
              <span className="text-xs font-black text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow">
                SWAP
              </span>
            </div>

            <div className="text-center flex-1">
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1 sm:mb-2 uppercase tracking-wide">You Offer</p>
              <SkillIconBlock 
                name={skills.youOffer.name} 
                level={skills.youOffer.level} 
                rating={skills.youOffer.rating}
                isOffering={false}
              />
            </div>
          </div>
        </div>

        {/* Simplified Bio - Responsive */}
        <div className="mb-3 sm:mb-4 md:mb-5">
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-medium text-center">
            "{user.bio}"
          </p>
        </div>

        {/* Shared Interests Pills - Responsive */}
        {sharedInterests.length > 0 && (
          <div className="text-center mb-3 sm:mb-4">
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
              {sharedInterests.map((interest, index) => (
                <motion.span
                  key={index}
                  className="px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/50 dark:to-indigo-900/50 text-purple-700 dark:text-purple-300 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold shadow-md"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Action Buttons - Responsive */}
      <AnimatePresence>
        {(showActions || !isPreview) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-3 sm:p-4 md:p-6 pt-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
          >
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
              <motion.button
                onClick={() => onRequestSession(match)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 sm:py-4 px-3 sm:px-4 md:px-6 rounded-2xl sm:rounded-3xl font-black hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-xl shadow-purple-500/25"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm md:text-base">Connect Now</span>
              </motion.button>
              
              <motion.button
                onClick={() => onViewProfile(match)}
                className="bg-white dark:bg-gray-800 border-2 border-purple-300 dark:border-purple-600 text-purple-600 dark:text-purple-400 py-3 sm:py-4 px-3 sm:px-4 md:px-6 rounded-2xl sm:rounded-3xl font-black hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-xl"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm md:text-base">View Profile</span>
              </motion.button>
            </div>

            <div className="flex justify-center gap-2 sm:gap-3 mt-3 sm:mt-4">
              {[
                { icon: Video, label: 'Video', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/50' },
                { icon: Phone, label: 'Call', color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50' },
                { icon: Share2, label: 'Share', color: 'bg-gray-100 text-gray-600 dark:bg-gray-700' }
              ].map(({ icon: Icon, label, color }) => (
                <motion.button
                  key={label}
                  className={`py-2 sm:py-3 px-2 sm:px-3 md:px-4 ${color} rounded-xl sm:rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 shadow-md`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm hidden sm:inline">{label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const EnhancedSwipeableCardStack = ({ matches, currentIndex, onSwipe, onRequestSession, onViewProfile }) => {
  const [exitDirection, setExitDirection] = useState(null);
  const [showActions, setShowActions] = useState(false);

  const handleDragEnd = (e, info) => {
    const threshold = 120;
    const velocity = Math.abs(info.velocity.x);
    if (Math.abs(info.offset.x) > threshold || velocity > 600) {
      const direction = info.offset.x > 0 ? 'right' : 'left';
      setExitDirection(direction);
      if (navigator.vibrate) navigator.vibrate(direction === 'right' ? [50, 100, 50] : [100, 50, 100]);
      setTimeout(() => {
        onSwipe(direction, matches[currentIndex]);
        setExitDirection(null);
      }, 200);
    }
  };

  const currentMatch = matches[currentIndex];
  const nextMatch = matches[currentIndex + 1];

  if (!currentMatch) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-[500px] sm:h-[600px] md:h-[700px] lg:h-[750px] w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Professional Completion Icon */}
        <motion.div 
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full grid place-items-center mb-6 sm:mb-8 shadow-2xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
        </motion.div>
        
        <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-3 sm:mb-4 text-center">All Caught Up!</h3>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-6 sm:mb-8 max-w-sm text-base sm:text-lg leading-relaxed px-4">
          You've discovered all available matches. New skilled professionals join daily!
        </p>
        <motion.button 
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl sm:rounded-3xl font-black hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-2 sm:gap-3 shadow-xl shadow-purple-500/25"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-sm sm:text-base">Refresh Matches</span>
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="relative mb-20 h-[700px] sm:h-[800px] md:h-[900px] lg:h-[950px] w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
      {/* Next Card Preview */}
      {nextMatch && (
        <motion.div
          className="absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
          initial={{ scale: 0.92, opacity: 0.4 }}
          animate={{ scale: 0.92, opacity: 0.4 }}
          style={{ zIndex: 1, transform: 'translateY(8px) scale(0.92)' }}
        >
          <StreamlinedMatchCard match={nextMatch} isPreview />
        </motion.div>
      )}

      {/* Main Swipeable Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: -200, right: 200 }}
          dragElastic={0.8}
          onDragEnd={handleDragEnd}
          initial={{ scale: 1, opacity: 1, x: 0, rotate: 0 }}
          animate={{ scale: 1, opacity: 1, x: 0, rotate: 0 }}
          exit={{
            x: exitDirection === 'right' ? 400 : exitDirection === 'left' ? -400 : 0,
            rotate: exitDirection === 'right' ? 30 : exitDirection === 'left' ? -30 : 0,
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.4, type: "spring" }
          }}
          whileDrag={{ scale: 1.03, rotate: 0 }}
          onHoverStart={() => setShowActions(true)}
          onHoverEnd={() => setShowActions(false)}
          style={{ zIndex: 10 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 h-full overflow-hidden backdrop-blur-sm">
            <StreamlinedMatchCard
              match={currentMatch}
              showActions={showActions}
              onRequestSession={onRequestSession}
              onViewProfile={onViewProfile}
            />
          </div>

          {/* Enhanced Swipe Indicators - Responsive */}
          <motion.div
            className="absolute top-8 sm:top-10 md:top-12 left-4 sm:left-6 md:left-8 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-2xl sm:rounded-3xl font-black transform -rotate-12 pointer-events-none shadow-xl border-2 sm:border-3 md:border-4 border-white"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0, scale: 0.7 }}
            whileDrag={(_, info) => ({
              opacity: info.offset.x < -60 ? Math.min(1, Math.abs(info.offset.x) / 140) : 0,
              scale: info.offset.x < -60 ? 1 : 0.7,
              rotate: info.offset.x < -60 ? -12 + (info.offset.x / 20) : -12
            })}
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 inline mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm md:text-base">PASS</span>
          </motion.div>

          <motion.div
            className="absolute top-8 sm:top-10 md:top-12 right-4 sm:right-6 md:right-8 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-2xl sm:rounded-3xl font-black transform rotate-12 pointer-events-none shadow-xl border-2 sm:border-3 md:border-4 border-white"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0, scale: 0.7 }}
            whileDrag={(_, info) => ({
              opacity: info.offset.x > 60 ? Math.min(1, info.offset.x / 140) : 0,
              scale: info.offset.x > 60 ? 1 : 0.7,
              rotate: info.offset.x > 60 ? 12 + (info.offset.x / 20) : 12
            })}
          >
            <Heart className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 inline mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm md:text-base">MATCH</span>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Action Buttons - Responsive Positioning */}
      <div className="absolute -bottom-16 sm:-bottom-20 md:-bottom-24 lg:-bottom-28 left-1/2 -translate-x-1/2 flex gap-4 sm:gap-6 md:gap-8">
        <motion.button
          onClick={() => onSwipe('left', currentMatch)}
          className="w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-2xl border-2 sm:border-3 md:border-4 border-white grid place-items-center hover:from-red-600 hover:to-red-700 transition-all duration-300"
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Pass"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-white" />
        </motion.button>
        
        <motion.button
          onClick={() => onViewProfile(currentMatch)}
          className="w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-2xl border-2 sm:border-3 md:border-4 border-white grid place-items-center hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          aria-label="View profile"
        >
          <Eye className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-white" />
        </motion.button>
        
        <motion.button
          onClick={() => onSwipe('right', currentMatch)}
          className="w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full shadow-2xl border-2 sm:border-3 md:border-4 border-white grid place-items-center hover:from-emerald-600 hover:to-green-600 transition-all duration-300"
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Match"
        >
          <Heart className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-white" />
        </motion.button>
      </div>
    </div>
  );
};

const EnhancedStatsSidebar = ({ showFilters, setShowFilters }) => {
  return (
    <div className="w-full lg:w-80 space-y-6 sm:space-y-8">
      {/* Enhanced Stats Card - Responsive */}
      <motion.div
        className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, y: -5 }}
      >
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl sm:rounded-2xl grid place-items-center">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
            </div>
            Today's Stats
          </h3>
          <motion.span 
            className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full shadow-lg"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
          <div className="text-center">
            <motion.div 
              className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1 sm:mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              12
            </motion.div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-semibold">Perfect Matches</div>
            <div className="w-full bg-purple-100 dark:bg-purple-900/30 rounded-full h-2 sm:h-3 mt-2 sm:mt-3 overflow-hidden">
              <motion.div 
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 sm:h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </div>
          </div>
          <div className="text-center">
            <motion.div 
              className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1 sm:mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              28
            </motion.div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-semibold">Great Matches</div>
            <div className="w-full bg-purple-100 dark:bg-purple-900/30 rounded-full h-2 sm:h-3 mt-2 sm:mt-3 overflow-hidden">
              <motion.div 
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 sm:h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '90%' }}
                transition={{ delay: 0.7, duration: 1 }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 pt-4 sm:pt-6 md:pt-8 border-t border-gray-200 dark:border-gray-700">
          {[
            { value: '95%', label: 'Match Rate', color: 'text-emerald-600' },
            { value: '2.5h', label: 'Response', color: 'text-blue-600' },
            { value: '4.8★', label: 'Rating', color: 'text-amber-600' }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div className={`text-base sm:text-lg md:text-xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Enhanced Quick Actions - Responsive */}
      <motion.div
        className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.02, y: -5 }}
      >
        <h3 className="text-base sm:text-lg md:text-xl font-black text-gray-900 dark:text-white mb-4 sm:mb-6">Quick Actions</h3>
        <div className="space-y-3 sm:space-y-4">
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/50 dark:to-indigo-900/50 rounded-2xl sm:rounded-3xl text-purple-700 dark:text-purple-300 font-bold hover:from-purple-200 hover:to-indigo-200 dark:hover:from-purple-900/70 dark:hover:to-indigo-900/70 transition-all duration-300 shadow-md"
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-xl sm:rounded-2xl grid place-items-center">
              <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <span className="flex-1 text-left text-sm sm:text-base">Advanced Filters</span>
            <motion.div
              animate={{ rotate: showFilters ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.div>
          </motion.button>

          <motion.button 
            className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 rounded-2xl sm:rounded-3xl text-amber-700 dark:text-amber-300 font-bold hover:from-amber-200 hover:to-orange-200 dark:hover:from-amber-900/70 dark:hover:to-orange-900/70 transition-all duration-300 shadow-md"
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl sm:rounded-2xl grid place-items-center">
              <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <span className="flex-1 text-left text-sm sm:text-base">Boost Profile</span>
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Enhanced Recent Activity - Responsive */}
      <motion.div
        className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.02, y: -5 }}
      >
        <h3 className="text-base sm:text-lg md:text-xl font-black text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg sm:rounded-xl grid place-items-center">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
          </div>
          Recent Activity
        </h3>
        <div className="space-y-3 sm:space-y-4 md:space-y-5">
          {[
            { icon: Heart, color: 'from-emerald-400 to-green-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'New match with Sarah!', time: '2 min ago' },
            { icon: MessageCircle, color: 'from-blue-400 to-indigo-400', bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'Session request accepted', time: '1 hour ago' },
            { icon: Award, color: 'from-purple-400 to-indigo-400', bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'Session completed', time: '3 hours ago' }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={index} 
                className="flex items-center space-x-3 sm:space-x-4 p-2 sm:p-3 rounded-xl sm:rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${item.bg} grid place-items-center shadow-md`}>
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r ${item.color} rounded-lg sm:rounded-xl grid place-items-center`}>
                    <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">{item.text}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{item.time}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Enhanced Pro Tip - Responsive */}
      <motion.div
        className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-purple-200/50 dark:border-purple-700/30 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.02, y: -5 }}
      >
        <h3 className="text-base sm:text-lg md:text-xl font-black text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
          <motion.div 
            className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg sm:rounded-xl grid place-items-center"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
          </motion.div>
          Pro Tip
        </h3>
        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6 font-medium">
          Verified skills get up to <span className="font-black text-purple-600">3x more matches</span>. Complete skill verification to boost visibility.
        </p>
        <motion.button 
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-black hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-xl text-sm sm:text-base"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Verify Skills
        </motion.button>
      </motion.div>
    </div>
  );
};

const EnhancedMatchmakingPage = () => {
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [matches] = useState(enhancedMatches);
  const [showFilters, setShowFilters] = useState(false);
  const [matchType, setMatchType] = useState('all');

  const handleSwipe = (direction, match) => {
    setCurrentMatchIndex((prev) => prev + 1);
  };

  const handleRequestSession = (match) => {
    // Session request logic
  };

  const handleViewProfile = (match) => {
    // Profile view logic
  };

  const filteredMatches = matches.filter((m) => (matchType === 'all' ? true : m.matchType === matchType));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-400/10 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-400/10 rounded-full blur-3xl"
          animate={{ x: [0, -120, 0], y: [0, 80, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <DashboardNavbar />

      <div className="pt-16 sm:pt-20 relative z-10">
        {/* Enhanced Header - Responsive */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16 px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          >
            Skill{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-300% animate-gradient-x">
              Matchmaking
            </span>
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover perfect skill exchange partners. Swipe, match, and learn together.
          </motion.p>

          {/* Enhanced Stats - Responsive */}
          <motion.div 
            className="flex justify-center gap-6 sm:gap-8 md:gap-12 mt-8 sm:mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {[
              { value: `${enhancedMatches.length}+`, label: 'Perfect Matches' },
              { value: '95%', label: 'Success Rate' },
              { value: '500+', label: 'Active Members' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div 
                  className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.2, type: "spring" }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-semibold mt-1 sm:mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Filters - Responsive */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-xl"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                  {[
                    { label: 'Match Type', options: ['All Matches', 'Perfect Matches', 'Great Matches'] },
                    { label: 'Distance', options: ['Within 10km', 'Within 25km', 'Within 50km', 'Anywhere'] },
                    { label: 'Skill Level', options: ['Any Level', 'Beginner', 'Intermediate', 'Advanced', 'Expert'] },
                    { label: 'Availability', options: ['Any Time', 'Weekdays', 'Weekends', 'Evenings', 'Mornings'] },
                    { label: 'Rating', options: ['Any Rating', '4.5+ Stars', '4.0+ Stars', '3.5+ Stars'] }
                  ].map((filter, index) => (
                    <motion.div
                      key={filter.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <label className="block text-xs sm:text-sm font-black text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
                        {filter.label}
                      </label>
                      <select className="w-full rounded-2xl sm:rounded-3xl border-2 border-gray-200 dark:border-gray-600 bg-white/90 dark:bg-gray-800/90 focus:border-purple-500 focus:ring-purple-500 text-gray-900 dark:text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 shadow-lg backdrop-blur-sm transition-all duration-300 text-xs sm:text-sm">
                        {filter.options.map(option => (
                          <option key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content - Responsive Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12">
            {/* Swipe Component - Responsive Order */}
            <div className="flex-1 flex justify-center order-1 lg:order-2">
              <EnhancedSwipeableCardStack
                matches={filteredMatches}
                currentIndex={currentMatchIndex}
                onSwipe={handleSwipe}
                onRequestSession={handleRequestSession}
                onViewProfile={handleViewProfile}
              />
            </div>
            
            {/* Enhanced Sidebar - Responsive Order */}
            <div className="order-2 lg:order-1">
              <EnhancedStatsSidebar showFilters={showFilters} setShowFilters={setShowFilters} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedMatchmakingPage;
