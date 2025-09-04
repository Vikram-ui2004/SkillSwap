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
  Users,
  Target,
  Award,
  MapPin,
  Calendar,
  Clock,
  RotateCcw,
  Bell,
  LogOut,
  Menu,
  Home,
  Grid3X3,
  MessageSquare,
  Sparkles,
  TrendingUp,
  BookOpen,
  Eye,
  Shield,
  Share2,
  UserPlus,
  Video,
  Phone,
  Bookmark,
  Gift,
  Laptop,
  Code2,
  PenTool,
  Paintbrush,
  Palette,
  Brush,
  Layout,
  Ruler,
  Figma,
  MonitorCog,
  BarChart3,
  Megaphone,
  Globe2,
  LineChart,
  MousePointerClick,
  Search,
  Bot,
  Webhook,
  TerminalSquare
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
  if (key.includes('typography')) return Brush;
  if (key.includes('social')) return Globe2;
  if (key.includes('hooks') || key.includes('state')) return MonitorCog;
  if (key.includes('performance')) return Lightning;
  if (key.includes('data')) return LineChart;
  if (key.includes('scrap')) return Webhook;

  // Generic fallbacks
  return Laptop;
};

// Replace skill emojis in data by preserving names and levels; icons are rendered via skillIconFor()
const enhancedMatches = [
  {
    id: 1,
    user: {
      name: 'Sarah Chen',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=300&fit=crop',
      location: 'Ghaziabad, UP',
      distance: '2km away',
      rating: 4.8,
      completedSessions: 15,
      bio: 'Passionate UX designer with 5+ years at tech startups. Learning React to bridge the design-dev gap.',
      availability: 'evenings & weekends',
      otherSkills: ['Figma', 'Design Systems', 'User Research', 'Prototyping'],
      interests: ['Tech', 'Startups', 'Travel', 'Photography'],
      languages: ['English', 'Hindi', 'Mandarin'],
      isVerified: true,
      isPremium: true,
      lastSeen: '2 min ago',
      responseRate: '95%',
      averageResponseTime: '< 1 hour',
      sessionPrice: 'Free for skill swap',
      portfolioLinks: ['behance.com/sarah-chen', 'dribbble.com/sarahc'],
      education: 'Masters in HCI, IIT Delhi',
      experience: '5+ years',
      timezone: 'IST (GMT+5:30)'
    },
    compatibility: 95,
    matchType: 'perfect',
    matchReasons: ['Complementary skills', 'Similar experience level', 'Same timezone', 'High ratings'],
    skills: {
      theyOffer: {
        name: 'UI/UX Design',
        level: 'Expert',
        rating: 4.9,
        studentsCount: 45,
        categories: ['Design Systems', 'User Research', 'Prototyping']
      },
      youOffer: {
        name: 'React Development',
        level: 'Advanced',
        rating: 4.7,
        studentsCount: 32,
        categories: ['Hooks', 'State Management', 'Performance']
      }
    },
    mutualConnections: 3,
    sharedInterests: ['Tech', 'Startups'],
    trustScore: 98
  },
  {
    id: 2,
    user: {
      name: 'Rahul Sharma',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop',
      location: 'Delhi NCR',
      distance: '5km away',
      rating: 4.6,
      completedSessions: 23,
      bio: 'Digital marketing specialist (7+ yrs). Wants to learn Python to automate workflows.',
      availability: 'flexible timing',
      otherSkills: ['Google Ads', 'SEO', 'Content Strategy', 'Analytics'],
      interests: ['Marketing', 'Automation', 'Data Analysis', 'Entrepreneurship'],
      languages: ['English', 'Hindi', 'Punjabi'],
      isVerified: true,
      isPremium: false,
      lastSeen: '5 min ago',
      responseRate: '87%',
      averageResponseTime: '2 hours',
      sessionPrice: '₹500/hour or skill swap',
      portfolioLinks: ['linkedin.com/in/rahul-digital', 'medium.com/@rahulsharma'],
      education: 'MBA Marketing, Delhi University',
      experience: '7+ years',
      timezone: 'IST (GMT+5:30)'
    },
    compatibility: 87,
    matchType: 'perfect',
    matchReasons: ['Perfect skill exchange', 'Similar timezone', 'Good ratings', 'Mutual interests'],
    skills: {
      theyOffer: {
        name: 'Digital Marketing',
        level: 'Expert',
        rating: 4.8,
        studentsCount: 67,
        categories: ['Paid Ads', 'SEO', 'Social Media']
      },
      youOffer: {
        name: 'Python Programming',
        level: 'Advanced',
        rating: 4.6,
        studentsCount: 28,
        categories: ['Automation', 'Data Analysis', 'Web Scraping']
      }
    },
    mutualConnections: 1,
    sharedInterests: ['Entrepreneurship', 'Data Analysis'],
    trustScore: 89
  },
  {
    id: 3,
    user: {
      name: 'Priya Patel',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1558655146-364adff25c26?w=600&h=300&fit=crop',
      location: 'Noida, UP',
      distance: '8km away',
      rating: 4.9,
      completedSessions: 31,
      bio: 'Creative graphic designer focused on brand storytelling. Learning web dev to bring designs to life.',
      availability: 'weekday mornings',
      otherSkills: ['Photoshop', 'Illustrator', 'Branding', 'Typography'],
      interests: ['Design', 'Art', 'Photography', 'Travel'],
      languages: ['English', 'Hindi', 'Gujarati'],
      isVerified: true,
      isPremium: true,
      lastSeen: '1 hour ago',
      responseRate: '98%',
      averageResponseTime: '30 min',
      sessionPrice: '₹800/hour or skill swap',
      portfolioLinks: ['behance.net/priyapatel', 'instagram.com/priya_designs'],
      education: 'B.Des, NID Ahmedabad',
      experience: '6+ years',
      timezone: 'IST (GMT+5:30)'
    },
    compatibility: 82,
    matchType: 'good',
    matchReasons: ['Complementary creative skills', 'High ratings', 'Similar experience'],
    skills: {
      theyOffer: {
        name: 'Graphic Design',
        level: 'Expert',
        rating: 4.9,
        studentsCount: 89,
        categories: ['Branding', 'Logo Design', 'Print Design']
      },
      youOffer: {
        name: 'Web Development',
        level: 'Intermediate',
        rating: 4.5,
        studentsCount: 23,
        categories: ['Frontend', 'CSS', 'JavaScript']
      }
    },
    mutualConnections: 5,
    sharedInterests: ['Design', 'Photography'],
    trustScore: 94
  }
];

// Navbar (unchanged structure, minor tweaks)

const Badge = ({ children, tone = 'default', icon: Icon }) => {
  const tones = {
    success: 'bg-green-500/90 text-white',
    warning: 'bg-yellow-500/90 text-white',
    premium: 'bg-gradient-to-r from-purple-500/90 to-pink-500/90 text-white',
    default: 'bg-gray-100 text-gray-700'
  };
  return (
    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${tones[tone]}`}>
      {Icon ? <Icon className="h-3 w-3" /> : null}
      {children}
    </span>
  );
};

const RatingStars = ({ value }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < Math.floor(value) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
    ))}
    <span className="text-sm font-semibold ml-1">{value}</span>
  </div>
);

const SkillPill = ({ text }) => (
  <span className="px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium border border-purple-200 dark:border-purple-700">
    {text}
  </span>
);

const SkillIconBlock = ({ name, level, rating }) => {
  const Icon = skillIconFor(name);
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-700 grid place-items-center shadow">
        <Icon className="text-purple-700 dark:text-purple-200" size={24} />
      </div>
      <p className="text-sm font-medium text-gray-900 dark:text-white mt-2">{name}</p>
      <p className="text-xs text-gray-600">{level}</p>
      <div className="flex items-center justify-center gap-1 mt-1">
        <Star className="h-3 w-3 text-yellow-400 fill-current" />
        <span className="text-xs font-medium">{rating}</span>
      </div>
    </div>
  );
};

const EnhancedMatchCard = ({ match, isPreview = false, showActions = false, onRequestSession, onViewProfile, onBookmark, onShare }) => {
  const { user, compatibility, skills, matchType, mutualConnections, sharedInterests } = match;
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <motion.div
      className={`h-full flex flex-col ${isPreview ? 'opacity-70' : ''}`}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: isPreview ? 0.7 : 1, scale: isPreview ? 0.97 : 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative h-64 overflow-hidden">
        <img src={user.coverImage} alt={`${user.name} cover`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute bottom-4 left-4">
          <div className="relative">
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg object-cover"
            />
            <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white grid place-items-center">
              <span className="w-2 h-2 bg-white rounded-full" />
            </span>
            {user.isVerified && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full grid place-items-center">
                <Shield className="w-3 h-3 text-white" />
              </span>
            )}
          </div>
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {matchType === 'perfect' ? (
            <Badge tone="success" >Perfect Match</Badge>
          ) : (
            <Badge tone="warning" icon={Star}>Great Match</Badge>
          )}
          {user.isPremium && <Badge tone="premium" icon={Sparkles}>Premium</Badge>}
        </div>

        <div className="absolute bottom-4 right-4">
          <div className="relative w-16 h-16 bg-white/95 backdrop-blur-sm rounded-full grid place-items-center shadow">
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">{compatibility}%</div>
              <div className="text-xs text-gray-600">Match</div>
            </div>
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="3" fill="none" className="text-purple-200" />
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                className="text-purple-600"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 28}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - compatibility / 100) }}
                transition={{ duration: 1.2 }}
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="p-6 flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h3>
              <span className="text-sm text-gray-500">({user.experience})</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {user.location} • {user.distance}
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>Last seen: {user.lastSeen}</span>
              <span>Response: {user.responseRate}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBookmarked((v) => !v)}
              className={`p-2 rounded-full ${isBookmarked ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'}`}
              aria-pressed={isBookmarked}
              aria-label="Bookmark profile"
            >
              <Bookmark className="h-4 w-4" />
            </button>
            <button
              onClick={onShare}
              className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50"
              aria-label="Share profile"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <RatingStars value={user.rating} />
            <span className="text-sm text-gray-500">({user.completedSessions} sessions)</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-green-600">Trust Score: {match.trustScore}%</div>
            <div className="text-xs text-gray-500">{match.mutualConnections} mutual connections</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-4 mb-4 border border-purple-200 dark:border-purple-700">
          <div className="text-center mb-3">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Perfect Skill Exchange</h4>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
              <span>Match Reasons:</span>
              {match.matchReasons.slice(0, 2).map((reason, idx) => (
                <span key={idx} className="px-2 py-1 bg-white/80 rounded-full">{reason}</span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <SkillIconBlock name={skills.theyOffer.name} level={skills.theyOffer.level} rating={skills.theyOffer.rating} />
            </div>

            <div className="flex flex-col items-center mx-4">
              <div className="flex items-center gap-1 mb-1">
                <ChevronRight className="h-5 w-5 text-purple-400" />
                <ChevronLeft className="h-5 w-5 text-pink-400" />
              </div>
              <span className="text-xs font-medium text-gray-600">Perfect Match</span>
            </div>

            <div className="text-center flex-1">
              <SkillIconBlock name={skills.youOffer.name} level={skills.youOffer.level} rating={skills.youOffer.rating} />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Award className="h-4 w-4" />
            Other Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {user.otherSkills.slice(0, 4).map((s, i) => <SkillPill key={i} text={s} />)}
            {user.otherSkills.length > 4 && (
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                +{user.otherSkills.length - 4} more
              </span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">{user.bio}</p>
        </div>

        {sharedInterests.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Heart className="h-4 w-4 text-pink-500" />
              Shared Interests
            </h4>
            <div className="flex flex-wrap gap-2">
              {sharedInterests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/30 dark:to-rose-900/30 text-pink-700 dark:text-pink-300 rounded-full text-xs font-medium border border-pink-200 dark:border-pink-700"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-2" />
            <div>
              <div className="font-medium">Available</div>
              <div className="text-xs">{user.availability}</div>
            </div>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4 mr-2" />
            <div>
              <div className="font-medium">Responds in</div>
              <div className="text-xs">{user.averageResponseTime}</div>
            </div>
          </div>
        </div>

        <div className="mb-2">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Languages:</span>
            <div className="flex gap-1">
              {user.languages.map((lang, idx) => (
                <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {(showActions || !isPreview) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="p-6 pt-0 space-y-3"
          >
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onRequestSession(match)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Request Session
              </button>
              <button
                onClick={() => onViewProfile(match)}
                className="bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-700 text-purple-600 dark:text-purple-400 py-3 px-4 rounded-2xl font-semibold hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition flex items-center justify-center gap-2"
              >
                <Eye className="h-4 w-4" />
                View Profile
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button className="py-2 px-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center justify-center gap-2">
                <Video className="h-4 w-4" />
                Video
              </button>
              <button className="py-2 px-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" />
                Call
              </button>
              <button className="py-2 px-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center justify-center gap-2">
                <UserPlus className="h-4 w-4" />
                Connect
              </button>
            </div>

            <div className="text-center">
              <span className="text-lg font-bold text-green-600 dark:text-green-400">{user.sessionPrice}</span>
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
    const threshold = 100;
    const velocity = Math.abs(info.velocity.x);
    if (Math.abs(info.offset.x) > threshold || velocity > 500) {
      const direction = info.offset.x > 0 ? 'right' : 'left';
      setExitDirection(direction);
      if (navigator.vibrate) navigator.vibrate(direction === 'right' ? [50, 100, 50] : [100, 50, 100]);
      setTimeout(() => {
        onSwipe(direction, matches[currentIndex]);
        setExitDirection(null);
      }, 150);
    }
  };

  const currentMatch = matches[currentIndex];
  const nextMatch = matches[currentIndex + 1];

  if (!currentMatch) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-[700px] w-full max-w-md mx-auto"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-6xl mb-2">✨</div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">All Caught Up!</h3>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-sm">
          You’ve seen all available matches. New profiles are added daily — check back soon!
        </p>
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition flex items-center gap-2">
          <RotateCcw className="h-5 w-5" />
          Refresh Matches
        </button>
      </motion.div>
    );
  }

  return (
    <div className="relative min-h-[1200px] sm: w-full max-w-md mx-auto">
      {nextMatch && (
        <motion.div
          className="absolute inset-0 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700"
          initial={{ scale: 0.93, opacity: 0.5 }}
          animate={{ scale: 0.93, opacity: 0.5 }}
          style={{ zIndex: -1, transform: 'translateY(8px) scale(0.93)' }}
        >
          <EnhancedMatchCard match={nextMatch} isPreview />
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: -200, right: 200 }}
          dragElastic={0.7}
          onDragEnd={handleDragEnd}
          initial={{ scale: 1, opacity: 1, x: 0, rotate: 0 }}
          animate={{ scale: 1, opacity: 1, x: 0, rotate: 0 }}
          exit={{
            x: exitDirection === 'right' ? 400 : exitDirection === 'left' ? -400 : 0,
            rotate: exitDirection === 'right' ? 45 : exitDirection === 'left' ? -45 : 0,
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.35 }
          }}
          whileDrag={{ scale: 1.03 }}
          onHoverStart={() => setShowActions(true)}
          onHoverEnd={() => setShowActions(false)}
          style={{ zIndex: 10 }}
          role="region"
          aria-label="Swipe card"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 h-full overflow-hidden">
            <EnhancedMatchCard
              match={currentMatch}
              showActions={showActions}
              onRequestSession={onRequestSession}
              onViewProfile={onViewProfile}
              onBookmark={() => {}}
              onShare={() => {}}
            />
          </div>

          <motion.div
            className="absolute top-8 left-8 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-2xl font-bold transform -rotate-12 pointer-events-none shadow border-2 border-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0, scale: 0.8 }}
            whileDrag={(_, info) => ({
              opacity: info.offset.x < -50 ? Math.min(1, Math.abs(info.offset.x) / 120) : 0,
              scale: info.offset.x < -50 ? 1 : 0.8
            })}
          >
            <X className="h-4 w-4 inline mr-2" />
            PASS
          </motion.div>

          <motion.div
            className="absolute top-8 right-8 bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-2xl font-bold transform rotate-12 pointer-events-none shadow border-2 border-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0, scale: 0.8 }}
            whileDrag={(_, info) => ({
              opacity: info.offset.x > 50 ? Math.min(1, info.offset.x / 120) : 0,
              scale: info.offset.x > 50 ? 1 : 0.8
            })}
          >
            <Heart className="h-4 w-4 inline mr-2" />
            MATCH
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex gap-6">
        <button
          onClick={() => onSwipe('left', currentMatch)}
          className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-2xl border-4 border-white grid place-items-center hover:from-red-600 hover:to-red-700 transition"
          aria-label="Pass"
        >
          <X className="h-7 w-7 text-white" />
        </button>
        <button
          onClick={() => onViewProfile(currentMatch)}
          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-2xl border-4 border-white grid place-items-center hover:from-blue-600 hover:to-blue-700 transition"
          aria-label="View profile"
        >
          <Eye className="h-7 w-7 text-white" />
        </button>
        <button
          onClick={() => onSwipe('right', currentMatch)}
          className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-2xl border-4 border-white grid place-items-center hover:from-green-600 hover:to-green-700 transition"
          aria-label="Match"
        >
          <Heart className="h-7 w-7 text-white" />
        </button>
      </div>
    </div>
  );
};

const EnhancedStatsSidebar = ({ showFilters, setShowFilters }) => {
  return (
    <div className="w-full lg:w-80 space-y-6">
      <motion.div
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-purple-200/50 dark:border-purple-700/50"
        whileHover={{ scale: 1.01, y: -3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            Today's Stats
          </h3>
          <span className="w-3 h-3 bg-green-500 rounded-full" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">12</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Perfect Matches</div>
            <div className="w-full bg-purple-100 dark:bg-purple-900/30 rounded-full h-2 mt-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-3/4" />
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">28</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Good Matches</div>
            <div className="w-full bg-blue-100 dark:bg-blue-900/30 rounded-full h-2 mt-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-[90%]" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">95%</div>
            <div className="text-xs text-gray-500">Match Rate</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">2.5h</div>
            <div className="text-xs text-gray-500">Avg Response</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">4.8★</div>
            <div className="text-xs text-gray-500">Your Rating</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-purple-200/50 dark:border-purple-700/50"
        whileHover={{ scale: 1.01, y: -3 }}
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl text-purple-700 dark:text-purple-300 font-medium hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 transition"
          >
            <Filter className="h-5 w-5" />
            <span>Advanced Filters</span>
            <ChevronRight className={`h-4 w-4 ml-auto ${showFilters ? 'rotate-90' : ''}`} />
          </button>

          <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl text-blue-700 dark:text-blue-300 font-medium hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/50 dark:hover:to-indigo-900/50 transition">
            <Gift className="h-5 w-5" />
            <span>Boost Profile</span>
            <Sparkles className="h-4 w-4 ml-auto" />
          </button>
        </div>
      </motion.div>

      <motion.div
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-purple-200/50 dark:border-purple-700/50"
        whileHover={{ scale: 1.01, y: -3 }}
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-500" />
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            { icon: Heart, color: 'text-green-500 bg-green-100 dark:bg-green-900/30', text: 'New match with Sarah!', time: '2 min ago' },
            { icon: MessageCircle, color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30', text: 'Session request accepted', time: '1 hour ago' },
            { icon: Award, color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30', text: 'Session completed', time: '3 hours ago' }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-2xl ${item.color} grid place-items-center`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.text}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-3xl p-6 border border-yellow-200 dark:border-yellow-700/50"
        whileHover={{ scale: 1.01, y: -3 }}
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          Pro Tip
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Verified skills get up to 3x more matches. Complete skill verification to boost visibility.
        </p>
        <button className="mt-4 w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-4 rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-600 transition">
          Verify Skills
        </button>
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
    // request logic
  };

  const handleViewProfile = (match) => {
    // navigation/modal logic
  };

  const filteredMatches = matches.filter((m) => (matchType === 'all' ? true : m.matchType === matchType));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 relative overflow-hidden">
      <DashboardNavbar />

      <div className="pt-20 px-4 relative z-10">
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-purple-200/30 dark:border-purple-700/30"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Match Type</label>
                    <select
                      value={matchType}
                      onChange={(e) => setMatchType(e.target.value)}
                      className="w-full rounded-2xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-purple-500 focus:ring-purple-500 text-gray-900 dark:text-white"
                    >
                      <option value="all">All Matches</option>
                      <option value="perfect">Perfect Matches</option>
                      <option value="good">Good Matches</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Location Range</label>
                    <select className="w-full rounded-2xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-purple-500 focus:ring-purple-500 text-gray-900 dark:text-white">
                      <option>Within 10km</option>
                      <option>Within 25km</option>
                      <option>Within 50km</option>
                      <option>Anywhere</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Skill Level</label>
                    <select className="w-full rounded-2xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-purple-500 focus:ring-purple-500 text-gray-900 dark:text-white">
                      <option>Any Level</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                      <option>Expert</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Availability</label>
                    <select className="w-full rounded-2xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-purple-500 focus:ring-purple-500 text-gray-900 dark:text-white">
                      <option>Any Time</option>
                      <option>Weekdays</option>
                      <option>Weekends</option>
                      <option>Evenings</option>
                      <option>Mornings</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Rating</label>
                    <select className="w-full rounded-2xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-purple-500 focus:ring-purple-500 text-gray-900 dark:text-white">
                      <option>Any Rating</option>
                      <option>4.5+ Stars</option>
                      <option>4.0+ Stars</option>
                      <option>3.5+ Stars</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <EnhancedStatsSidebar showFilters={showFilters} setShowFilters={setShowFilters} />
            <div className="flex-1 flex justify-center">
              <EnhancedSwipeableCardStack
                matches={filteredMatches}
                currentIndex={currentMatchIndex}
                onSwipe={handleSwipe}
                onRequestSession={handleRequestSession}
                onViewProfile={handleViewProfile}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedMatchmakingPage;
