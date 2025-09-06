import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  BookOpen,
  User,
  Star,
  Clock,
  Tag,
  DollarSign,
  Users,
  Globe,
  Calendar,
  Award,
  Send,
  CheckCircle,
  AlertCircle,
  Image,
  X,
  Sparkles,
  Lightbulb,
  Target,
  TrendingUp,
  Filter,
  ChevronDown,
  Code,
  Music,
  Palette,
  Dumbbell,
  Camera,
  Languages
} from "lucide-react";

const SkillPostingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    teacher: "",
    teacherName: "",
    rating: "",
    reviews: "",
    price: "",
    duration: "",
    level: "",
    description: "",
    avatar: "",
    tags: "",
    studentsCount: "",
    isOnline: true,
    nextAvailable: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const formRef = useRef();

  const categories = [
    { name: "Coding", icon: Code },
    { name: "Music", icon: Music },
    { name: "Art", icon: Palette },
    { name: "Fitness", icon: Dumbbell },
    { name: "Photography", icon: Camera },
    { name: "Language", icon: Languages },
  ];

  const levels = ["Beginner", "Intermediate", "Advanced", "Expert", "All Levels"];

  useEffect(() => {
    if (formRef.current) {
      const elements = formRef.current.querySelectorAll('.animate-on-load');
      elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
          el.style.transition = 'all 0.6s ease-out';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, index * 100);
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Skill name is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.teacherName.trim()) newErrors.teacherName = "Teacher name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      const newSkill = {
        ...formData,
        rating: parseFloat(formData.rating) || 0,
        reviews: parseInt(formData.reviews) || 0,
        studentsCount: parseInt(formData.studentsCount) || 0,
        tags: formData.tags
          ? formData.tags.split(",").map((tag) => tag.trim())
          : [],
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "skills"), newSkill);

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      setFormData({
        name: "",
        category: "",
        teacher: "",
        teacherName: "",
        rating: "",
        reviews: "",
        price: "",
        duration: "",
        level: "",
        description: "",
        avatar: "",
        tags: "",
        studentsCount: "",
        isOnline: true,
        nextAvailable: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 py-8 px-4">
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 animate-on-load"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-purple-600 rounded-2xl shadow-lg">
              <Target className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                Skill{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                  Marketplace
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">Create an amazing learning experience</p>
            </div>
          </div>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="fixed top-8 right-8 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm z-50"
            >
              <div className="flex items-center gap-3">
                <CheckCircle size={24} />
                <div>
                  <p className="font-semibold">Success!</p>
                  <p className="text-sm opacity-90">Your skill has been posted successfully!</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Form */}
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* Form Header */}
          <div className="bg-purple-600 p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Lightbulb className="text-white" size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Post Your Skill</h2>
                <p className="text-white/90">Help others learn something amazing</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Basic Information Section */}
            <div className="animate-on-load">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                  <BookOpen className="text-purple-600 dark:text-purple-300" size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Basic Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Skill Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    <BookOpen className="inline h-4 w-4 mr-2" />
                    Skill Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Advanced React Development, Guitar for Beginners"
                    className={`w-full p-4 rounded-2xl border-2 ${
                      errors.name 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-700 focus:border-purple-500'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-500`}
                    required
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600 flex items-center gap-1"
                    >
                      <AlertCircle size={16} />
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    <Tag className="inline h-4 w-4 mr-2" />
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full p-4 rounded-2xl border-2 ${
                      errors.category 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-700 focus:border-purple-500'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600 flex items-center gap-1"
                    >
                      <AlertCircle size={16} />
                      {errors.category}
                    </motion.p>
                  )}
                </div>

                {/* Level */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    <Award className="inline h-4 w-4 mr-2" />
                    Skill Level
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select level</option>
                    {levels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Teacher Information */}
            <div className="animate-on-load">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                  <User className="text-purple-600 dark:text-purple-300" size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Teacher Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    <User className="inline h-4 w-4 mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="teacherName"
                    value={formData.teacherName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={`w-full p-4 rounded-2xl border-2 ${
                      errors.teacherName 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-700 focus:border-purple-500'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-500`}
                    required
                  />
                  {errors.teacherName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600 flex items-center gap-1"
                    >
                      <AlertCircle size={16} />
                      {errors.teacherName}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    <User className="inline h-4 w-4 mr-2" />
                    Username
                  </label>
                  <input
                    type="text"
                    name="teacher"
                    value={formData.teacher}
                    onChange={handleChange}
                    placeholder="@your_username"
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    <Image className="inline h-4 w-4 mr-2" />
                    Profile Avatar URL
                  </label>
                  <input
                    type="url"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                    placeholder="https://example.com/your-photo.jpg"
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Session Details */}
            <div className="animate-on-load">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                  <Clock className="text-purple-600 dark:text-purple-300" size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Session Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    <DollarSign className="inline h-4 w-4 mr-2" />
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Free, $50, 30 SkillCoins"
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    <Clock className="inline h-4 w-4 mr-2" />
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="60 min, 2 hours"
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    <Calendar className="inline h-4 w-4 mr-2" />
                    Next Available
                  </label>
                  <input
                    type="text"
                    name="nextAvailable"
                    value={formData.nextAvailable}
                    onChange={handleChange}
                    placeholder="Today 6:00 PM"
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    <Star className="inline h-4 w-4 mr-2" />
                    Rating (0-5)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    placeholder="4.8"
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    <TrendingUp className="inline h-4 w-4 mr-2" />
                    Reviews Count
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="reviews"
                    value={formData.reviews}
                    onChange={handleChange}
                    placeholder="127"
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    <Users className="inline h-4 w-4 mr-2" />
                    Students Count
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="studentsCount"
                    value={formData.studentsCount}
                    onChange={handleChange}
                    placeholder="245"
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Description & Tags */}
            <div className="animate-on-load">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                  <Sparkles className="text-purple-600 dark:text-purple-300" size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Description & Tags</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe what students will learn in this skill session..."
                    rows="4"
                    className={`w-full p-4 rounded-2xl border-2 ${
                      errors.description 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-700 focus:border-purple-500'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 resize-none`}
                    required
                  />
                  {errors.description && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600 flex items-center gap-1"
                    >
                      <AlertCircle size={16} />
                      {errors.description}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    <Tag className="inline h-4 w-4 mr-2" />
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="React, JavaScript, Frontend, Web Development"
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="animate-on-load">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                  <Globe className="text-purple-600 dark:text-purple-300" size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Availability</h3>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border border-purple-200 dark:border-purple-700">
                <input
                  type="checkbox"
                  id="isOnline"
                  name="isOnline"
                  checked={formData.isOnline}
                  onChange={handleChange}
                  className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="isOnline" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium cursor-pointer">
                  <Globe size={20} className="text-purple-600 dark:text-purple-400" />
                  Available Online
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="animate-on-load pt-6">
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    />
                    Posting Your Skill...
                  </>
                ) : (
                  <>
                    <Send size={24} />
                    Post Your Skill
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 bg-purple-50 dark:bg-purple-900/20 rounded-3xl p-6 border border-purple-200 dark:border-purple-700/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-600 rounded-xl">
              <Lightbulb className="text-white" size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Pro Tips</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-start gap-2">
              <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
              <span>Write a clear, descriptive skill name that tells students exactly what they'll learn</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
              <span>Include relevant tags to help students find your skill more easily</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
              <span>Set realistic expectations about skill level and time commitment</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
              <span>Add a professional profile photo to build trust with potential students</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillPostingPage;
