import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase"; 
import { 
 createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify"; // optional for nice alerts
import "react-toastify/dist/ReactToastify.css";
import purplelogo from "../assets/purple-logo.png"; 
import Social from "../assets/social.svg";

// Enhanced Google Icon (same as before)
const GoogleIcon = () => (
  <motion.svg
    className="w-5 h-5 mr-3"
    viewBox="0 0 48 48"
    whileHover={{ rotate: 360 }}
    transition={{ duration: 0.6 }}
  >
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    ></path>
    <path
      fill="#FF3D00"
      d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
    ></path>
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.519-3.357-11.181-7.944l-6.573 5.127C9.406 39.123 16.227 44 24 44z"
    ></path>
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.011 35.638 44 30.138 44 24c0-1.341-.138-2.65-.389-3.917z"
    ></path>
  </motion.svg>
);
// **FIXED: Properly centered and fully visible SkillSwap logo + text**
// const BackgroundBranding = () => {
//   return (
//     <div className="fixed top-6  left-1/2 transform -translate-x-1/2 pointer-events-none z-10 ">
//       <motion.div
//         className="flex items-center space-x-3 select-none"
//         animate={{
//           scale: [1, 1.02, 1],
//         }}
//         transition={{
//           duration: 4,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       >
//         <motion.img
//           src={purplelogo}
//           alt="SkillSwap Logo"
//           className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-lg"
//           animate={{
//             rotate: [0, 5, -5, 0],
//           }}
//           transition={{
//             duration: 6,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//         <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-purple-600 tracking-wide uppercase font-sans drop-shadow-lg">
//           SkillSwap
//         </span>
//       </motion.div>
//     </div>
//   );
// };

// Mobile Background Effects (fixed from previous version)
const MobileBackgroundEffects = () => {
  return (
    <div className="absolute inset-0 lg:hidden pointer-events-none z-0 overflow-hidden">
      {/* Floating Purple Circles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${30 + i * 10}px`,
            height: `${30 + i * 10}px`,
            background: `radial-gradient(circle, rgba(168, 85, 247, ${
              0.2 + i * 0.08
            }) 0%, transparent 70%)`,
            top: `${15 + i * 13}%`,
            left: `${8 + i * 12}%`,
            filter: "blur(6px)",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse",
            delay: i * 0.8,
          }}
        />
      ))}

      {/* Animated Gradient Blobs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`blob-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${80 + i * 30}px`,
            height: `${80 + i * 30}px`,
            background: `linear-gradient(45deg, 
              rgba(168, 85, 247, 0.15), 
              rgba(236, 72, 153, 0.15), 
              rgba(99, 102, 241, 0.15))`,
            top: `${25 + i * 25}%`,
            right: `${15 + i * 20}%`,
            filter: "blur(15px)",
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
        />
      ))}

      {/* Moving Sparkles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            top: `${30 + i * 20}%`,
            left: `${25 + i * 18}%`,
          }}
          animate={{
            scale: [0, 1.5, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "easeInOut",
          }}
        >
          <Sparkles size={16} className="text-purple-500/60" />
        </motion.div>
      ))}

      {/* Pulsing Rings */}
      <motion.div
        className="absolute top-1/3 left-1/5 w-40 h-40 rounded-full border-2 border-purple-400/30"
        animate={{
          scale: [1, 2.5, 1],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/5 w-32 h-32 rounded-full border-2 border-indigo-400/30"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
    </div>
  );
};

// Keep your original illustration
const Illustration = () => (
  <motion.img
    src={Social}
    alt="Illustration"
    className="w-full max-w-lg mx-auto"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, ease: "easeOut" }}
    whileHover={{ scale: 1.05 }}
  />
);

// Enhanced Input Component (same as before)
const EnhancedInput = ({
  type,
  value,
  onChange,
  placeholder,
  required,
  id,
  label,
  showForgot,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

   // ✅ Forgot Password with Firebase
  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-slate-700 font-medium" htmlFor={id}>
          {label}
        </label>
           {showForgot && (
            <motion.button
              type="button"
              className="text-sm text-purple-600 hover:text-purple-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              onClick={handleForgotPassword}
            >
              Forgot?
            </motion.button>
          )}
      </div>

      <div className="relative">
        <motion.input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className={`w-full px-4 py-3 border rounded-lg bg-white/60 backdrop-blur-sm text-slate-800 
                     placeholder-slate-400 transition-all duration-300 focus:outline-none focus:ring-2 
                     ${
                       isFocused
                         ? "border-purple-500 focus:ring-purple-500/50 shadow-lg shadow-purple-500/20"
                         : "border-gray-300/80 hover:border-purple-300"
                     }`}
        />

        {isPassword && (
          <motion.button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-600 hover:text-purple-800 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </motion.button>
        )}
      </div>

      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: isFocused ? "100%" : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

// Enhanced AuthModal with Background Branding
const AuthModal = ({ mode = "signup", onSwitchMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const isLoginMode = mode === "login";


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (!isLoginMode && !name)) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    try {
      let userCredential;
      if (isLoginMode) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      }

      console.log("✅ Auth success:", userCredential.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Error:", err.message);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google Auth
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("✅ Google login:", result.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Google login error:", err.message);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-gray-50">
      {/* Branding + Background */}
      {/* <BackgroundBranding /> */}
      <MobileBackgroundEffects />

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center z-10">
        {/* Left Panel */}
        <div className="hidden lg:flex flex-col items-start p-8">
        
    {/* <motion.div
      className="flex items-center space-x-3 select-none "
        animate={{
          scale: [1, 1.02, 1],
       }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.img
          src={purplelogo}
          alt="SkillSwap Logo"
          className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-lg"
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-purple-600 tracking-wide uppercase font-sans drop-shadow-lg">
          SkillSwap
        </span>
      </motion.div> */}
   <p className="font-bold text-cyan-600 hover:text-cyan-700  text-lg">SKILLSWAP.</p>
          <h1 className="text-5xl pt-10 font-bold">Welcome {isLoginMode ? "Back" : "Aboard"}</h1>
          <p className="mt-4 pb-20 text-lg">Start your journey now with us</p>
          <Illustration />
        </div>

        {/* Right Panel - Form */}
        <motion.div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold mb-6">
            {isLoginMode ? "Login to your account" : "Create an account"}
          </h2>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, x: isLoginMode ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLoginMode ? 20 : -20 }}
            >
              {/* Name (Signup only) */}
              {!isLoginMode && (
                <EnhancedInput
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                  id="name"
                  label="Full Name"
                />
              )}

              {/* Email */}
              <EnhancedInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                id="email"
                label="Email"
              />

              {/* Password */}
              <EnhancedInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                id="password"
                label="Password"
                showForgot={isLoginMode}
              />

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md hover:scale-105 transition"
              >
                {isLoginMode ? "Login now" : "Create account"}
              </motion.button>
      {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>
              {/* Google OAuth */}
              <motion.button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center bg-white border border-gray-300 py-3 rounded-lg font-semibold shadow-sm hover:shadow-md transition"
              >
                <GoogleIcon />
                Continue with Google
              </motion.button>
            </motion.form>
          </AnimatePresence>

          {/* Switch Mode */}
          <p className="mt-6 text-center">
            {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => onSwitchMode(isLoginMode ? "signup" : "login")}
              className="text-purple-600 font-bold hover:underline"
            >
              {isLoginMode ? "Sign up" : "Log in"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// App wrapper (same as before)
const AuthModel = () => {
  const [mode, setMode] = useState("signup");


  const handleSwitchMode = (newMode) => {
    setMode(newMode);
  };

  return (
    <AuthModal
      mode={mode}
      onSwitchMode={handleSwitchMode}
    />
  );
};

export default AuthModel;
