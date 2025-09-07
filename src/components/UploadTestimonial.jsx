import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  User, 
  Briefcase, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  Quote
} from "lucide-react";

const UploadTestimonial = ({ onSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    text: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState(""); // success or error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setMsgType("");

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newTestimonial = await res.json();
        setMsg("Testimonial submitted successfully!");
        setMsgType("success");
        setFormData({ name: "", role: "", text: "" });

        if (onSuccess) onSuccess(newTestimonial);
        
        // Auto close after success
        setTimeout(() => {
          if (onClose) onClose();
        }, 2000);
      } else {
        const error = await res.json();
        setMsg("Error: " + error.message);
        setMsgType("error");
      }
    } catch (err) {
      setMsg("Server error, please try again later.");
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  };

  // Handle close button click
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  // Handle overlay click
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-br from-purple-400/10 to-indigo-400/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 bg-gradient-to-tr from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Close Button - Fixed with higher z-index and better event handling */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[50] p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 transition-all duration-200 shadow-lg border border-gray-200 dark:border-gray-600"
          aria-label="Close modal"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Content */}
        <div className="relative z-10 p-4 sm:p-6 md:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-6 sm:mb-8"
          >
            <motion.div
              className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full grid place-items-center mx-auto mb-3 sm:mb-4 shadow-lg"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-2">
              Share Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                Experience
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium px-2">
              Help others discover the magic of skill swapping
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Name Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-medium shadow-lg text-sm sm:text-base"
                required
              />
            </motion.div>

            {/* Role Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
              </div>
              <input
                type="text"
                name="role"
                placeholder="Your Role (e.g. Student, Developer)"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-medium shadow-lg text-sm sm:text-base"
                required
              />
            </motion.div>

            {/* Testimonial Textarea */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 pointer-events-none">
                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
              </div>
              <textarea
                name="text"
                placeholder="Share your amazing experience with SkillSwap..."
                value={formData.text}
                onChange={handleChange}
                rows="4"
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-medium shadow-lg resize-none text-sm sm:text-base"
                required
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base md:text-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl shadow-purple-500/25 flex items-center justify-center gap-2 sm:gap-3"
              whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {loading ? (
                <>
                  <motion.div
                    className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="hidden sm:inline">Submitting...</span>
                  <span className="sm:hidden">Sending...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Submit Testimonial</span>
                  <span className="sm:hidden">Submit</span>
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                </>
              )}
            </motion.button>

            {/* Message Display */}
            <AnimatePresence>
              {msg && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 font-semibold shadow-lg text-sm sm:text-base ${
                    msgType === "success"
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700"
                      : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700"
                  }`}
                >
                  {msgType === "success" ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.1 }}
                    >
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.1 }}
                    >
                      <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    </motion.div>
                  )}
                  <span className="flex-1">{msg}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>

        {/* Floating Particles - Responsive */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full opacity-20"
              animate={{
                x: [0, 60, 0],
                y: [0, -30, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeInOut"
              }}
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UploadTestimonial;
