import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNavbar';

import {
  ArrowLeft,
  Check,
  X,
  Star,
  MapPin,
  Calendar,
  Clock,
  Award,
  Users,
  MessageCircle,
  Video,
  Phone,
  Shield,
  Sparkles,
  Heart,
  Eye,
  BookOpen,
  Target,
  TrendingUp,
  User,
  Globe,
  Mail,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Info,
  CalendarPlus,
  Zap,
  Code2,
  Badge
} from 'lucide-react';

// Mock data for the request (in real app, fetch from Firebase using request ID)
const mockRequestData = {
  id: 'req_123456',
  student: {
    name: 'Alex Rodriguez',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=300&fit=crop',
    location: 'Delhi NCR',
    rating: 4.7,
    completedSessions: 12,
    bio: 'Full-stack developer passionate about learning new technologies. Currently working on React projects and want to improve my UI/UX design skills.',
    skills: ['React', 'Node.js', 'JavaScript', 'MongoDB'],
    interests: ['Web Development', 'Tech', 'Design', 'Innovation'],
    languages: ['English', 'Hindi', 'Spanish'],
    isVerified: true,
    isPremium: true,
    joinedDate: 'March 2024',
    email: 'alex.rodriguez@email.com',
    portfolio: 'https://alexdev.portfolio.com',
    responseRate: '96%',
    averageResponseTime: '< 2 hours',
    trustScore: 94,
    mutualConnections: 5
  },
  skill: {
    name: 'UI/UX Design Fundamentals',
    category: 'Design',
    level: 'Beginner',
    duration: '90 minutes',
    description: 'Learn the basics of user interface and user experience design including wireframing, prototyping, and design principles.'
  },
  requestDetails: {
    preferredTime: 'Tomorrow 3:00 PM',
    message: 'Hi! I\'m really interested in learning UI/UX design fundamentals. I have some React experience and would love to understand how to create better user interfaces. I\'m available for a 90-minute session and can offer to teach React development in return.',
    requestedAt: '2 hours ago',
    status: 'pending',
    sessionPrice: 'Skill Exchange'
  },
  teacher: {
    name: 'Sarah Chen', // Current user (teacher)
    skill: 'React Development'
  }
};

const SessionRequestPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { requestId } = useParams();
  const [requestData, setRequestData] = useState(mockRequestData);
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionType, setActionType] = useState(null);

  // In real implementation, fetch request data from Firebase
  useEffect(() => {
    // fetchRequestData(requestId);
  }, [requestId]);

  const handleAccept = async () => {
    setLoading(true);
    try {
      navigate('/schedule-session', { 
        state: { 
          requestData,
          action: 'schedule' 
        }
      });
    } catch (error) {
      console.error('Error accepting request:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      navigate('/dashboard');
    } catch (error) {
      console.error('Error rejecting request:', error);
    } finally {
      setLoading(false);
    }
  };

  const openConfirmModal = (type) => {
    setActionType(type);
    setShowConfirmModal(true);
  };

  const ConfirmModal = () => (
    <AnimatePresence>
      {showConfirmModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowConfirmModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-6 border border-gray-200/50 dark:border-gray-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              {actionType === 'accept' ? (
                <motion.div 
                  className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1 }}
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(34, 197, 94, 0.2)",
                      "0 0 30px rgba(34, 197, 94, 0.4)",
                      "0 0 20px rgba(34, 197, 94, 0.2)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Check className="h-10 w-10 text-green-600" />
                </motion.div>
              ) : (
                <motion.div 
                  className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1 }}
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(239, 68, 68, 0.2)",
                      "0 0 30px rgba(239, 68, 68, 0.4)",
                      "0 0 20px rgba(239, 68, 68, 0.2)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <X className="h-10 w-10 text-red-600" />
                </motion.div>
              )}
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {actionType === 'accept' ? 'Accept Session Request?' : 'Reject Session Request?'}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {actionType === 'accept' 
                  ? 'You will be redirected to schedule a Google Meet session with Alex Rodriguez. Both parties will be notified once confirmed.'
                  : 'This action cannot be undone. The student will be notified that their request has been declined.'
                }
              </p>
              
              <div className="flex gap-4">
                <motion.button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={actionType === 'accept' ? handleAccept : handleReject}
                  disabled={loading}
                  className={`flex-1 py-3 px-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    actionType === 'accept'
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-200'
                      : 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-200'
                  } disabled:opacity-50`}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      {actionType === 'accept' ? <Check size={18} /> : <X size={18} />}
                      {actionType === 'accept' ? 'Accept & Schedule' : 'Reject Request'}
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <DashboardNavbar />
      
      <div className="pt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.button
                onClick={() => navigate(-1)}
                className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </motion.button>
            </div>
            
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              Session{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                Request
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Review the request details and decide whether to accept or decline this learning opportunity
            </p>

            {/* Request Status Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full border border-yellow-200 dark:border-yellow-700"
            >
              <Clock size={16} />
              <span className="font-semibold">Pending Response • Sent {requestData.requestDetails.requestedAt}</span>
            </motion.div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Enhanced Student Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="xl:col-span-2"
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-purple-200/20 transition-all duration-500">
                {/* Enhanced Cover & Profile Section */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={requestData.student.coverImage} 
                    alt="Cover" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Floating Profile Section */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-end justify-between">
                      <div className="flex items-end gap-4">
                        <motion.div 
                          className="relative"
                          whileHover={{ scale: 1.05 }}
                        >
                          <img
                            src={requestData.student.profileImage}
                            alt={requestData.student.name}
                            className="w-24 h-24 rounded-2xl border-4 border-white shadow-2xl object-cover"
                          />
                          {requestData.student.isVerified && (
                            <motion.div 
                              className="absolute -top-2 -right-2 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center"
                              animate={{ 
                                boxShadow: [
                                  "0 0 0 0 rgba(59, 130, 246, 0.7)",
                                  "0 0 0 10px rgba(59, 130, 246, 0)",
                                  "0 0 0 0 rgba(59, 130, 246, 0)"
                                ]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Shield className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                        </motion.div>
                        
                        <div className="text-white pb-2">
                          <h2 className="text-3xl font-bold flex items-center gap-3">
                            {requestData.student.name}
                            {requestData.student.isPremium && (
                              <Sparkles className="h-6 w-6 text-yellow-400" />
                            )}
                          </h2>
                          <div className="flex items-center gap-2 mt-1 text-white/90">
                            <MapPin className="h-4 w-4" />
                            <span>{requestData.student.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Trust Score Badge */}
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 text-center border border-white/30">
                        <div className="text-2xl font-bold text-white">{requestData.student.trustScore}%</div>
                        <div className="text-xs text-white/80">Trust Score</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Profile Details */}
                <div className="p-8">
                  {/* Enhanced Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <motion.div 
                      className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-700/50"
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <Star className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-gray-900 dark:text-white">{requestData.student.rating}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
                    </motion.div>
                    <motion.div 
                      className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-700/50"
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-gray-900 dark:text-white">{requestData.student.completedSessions}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Sessions</div>
                    </motion.div>
                    <motion.div 
                      className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-700/50"
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <Calendar className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-gray-900 dark:text-white">{requestData.student.joinedDate}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Joined</div>
                    </motion.div>
                    <motion.div 
                      className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-700/50"
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <Heart className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-gray-900 dark:text-white">{requestData.student.mutualConnections}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Mutual</div>
                    </motion.div>
                  </div>

                  {/* Enhanced Bio */}
                  <motion.div 
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                        <User className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                      </div>
                      About {requestData.student.name.split(' ')[0]}
                    </h3>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {requestData.student.bio}
                      </p>
                    </div>
                  </motion.div>

                  {/* Enhanced Skills */}
                  <motion.div 
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                        <Award className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                      </div>
                      Technical Skills
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {requestData.student.skills.map((skill, index) => (
                        <motion.span
                          key={index}
                          className="px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold border border-purple-200 dark:border-purple-700"
                          whileHover={{ scale: 1.05 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Enhanced Additional Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div 
                      className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-700/50"
                      whileHover={{ scale: 1.02 }}
                    >
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Globe className="h-5 w-5 text-blue-600" />
                        Languages & Contact
                      </h4>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {requestData.student.languages.map((lang, index) => (
                            <span key={index} className="px-3 py-1 bg-white/60 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                              {lang}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Mail className="h-4 w-4" />
                          <span>{requestData.student.email}</span>
                        </div>
                        <a 
                          href={requestData.student.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 font-semibold"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View Portfolio
                        </a>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200/50 dark:border-green-700/50"
                      whileHover={{ scale: 1.02 }}
                    >
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        Response Stats
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Response Rate</span>
                          <span className="text-sm font-semibold text-green-600">{requestData.student.responseRate}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Avg Response</span>
                          <span className="text-sm font-semibold text-green-600">{requestData.student.averageResponseTime}</span>
                        </div>
                        <div className="w-full bg-green-100 dark:bg-green-900/30 rounded-full h-2 mt-2">
                          <div className="bg-green-500 h-2 rounded-full w-[96%]" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Enhanced Skill Request Card */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-purple-200/20 transition-all duration-500">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                    <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                  </div>
                  Skill Request Details
                </h3>
                
                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-700/50">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{requestData.skill.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{requestData.skill.category} • {requestData.skill.level}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {requestData.skill.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <Clock className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{requestData.skill.duration}</div>
                        <div className="text-xs text-gray-500">Duration</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{requestData.requestDetails.preferredTime}</div>
                        <div className="text-xs text-gray-500">Preferred</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200/50 dark:border-green-700/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-green-800 dark:text-green-300">Session Exchange</div>
                        <div className="text-xl font-bold text-green-600">{requestData.requestDetails.sessionPrice}</div>
                      </div>
                      <Zap className="h-8 w-8 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Message Card */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-purple-200/20 transition-all duration-500">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                    <MessageCircle className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                  </div>
                  Personal Message
                </h3>
                
                <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-700/50">
                  <div className="flex items-start gap-3 mb-4">
                    <img
                      src={requestData.student.profileImage}
                      alt={requestData.student.name}
                      className="w-10 h-10 rounded-full border-2 border-purple-200"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white">{requestData.student.name}</div>
                      <div className="text-xs text-gray-500">{requestData.requestDetails.requestedAt}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                    "{requestData.requestDetails.message}"
                  </p>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-purple-200/20 transition-all duration-500">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                    <Target className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                  </div>
                  Make Your Decision
                </h3>
                
                <div className="space-y-4">
                  <motion.button
                    onClick={() => openConfirmModal('accept')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:shadow-green-200/30"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Check size={24} />
                    Accept & Schedule Session
                  </motion.button>
                  
                  <motion.button
                    onClick={() => openConfirmModal('reject')}
                    className="w-full bg-white dark:bg-gray-700 border-2 border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 py-4 px-6 rounded-2xl font-bold text-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:shadow-red-200/20"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <X size={24} />
                    Decline Request
                  </motion.button>
                </div>
                
                <motion.div 
                  className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-700/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800 dark:text-blue-300">
                      <strong>Quick Tip:</strong> Accepting will redirect you to schedule a Google Meet session. Both you and {requestData.student.name.split(' ')[0]} will receive email confirmations with meeting details.
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Confirmation Modal */}
      <ConfirmModal />
    </div>
  );
};

export default SessionRequestPage;
