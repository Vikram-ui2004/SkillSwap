import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Sparkles } from 'lucide-react';
import purplelogo from '../assets/purple-logo.png';

// Enhanced Google Icon (same as before)
const GoogleIcon = () => (
  <motion.svg 
    className="w-5 h-5 mr-3" 
    viewBox="0 0 48 48"
    whileHover={{ rotate: 360 }}
    transition={{ duration: 0.6 }}
  >
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.519-3.357-11.181-7.944l-6.573 5.127C9.406 39.123 16.227 44 24 44z"></path>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.011 35.638 44 30.138 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
  </motion.svg>
);
// **FIXED: Properly centered and fully visible SkillSwap logo + text**
const BackgroundBranding = () => {
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 pointer-events-none z-10">
      <motion.div 
        className="flex items-center space-x-3 select-none"
        animate={{
          scale: [1, 1.02, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.img
          src={purplelogo}
          alt="SkillSwap Logo"
          className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-lg"
          animate={{
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-purple-600 tracking-wide uppercase font-sans drop-shadow-lg">
          SkillSwap
        </span>
      </motion.div>
    </div>
  );
};


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
            background: `radial-gradient(circle, rgba(168, 85, 247, ${0.2 + i * 0.08}) 0%, transparent 70%)`,
            top: `${15 + i * 13}%`,
            left: `${8 + i * 12}%`,
            filter: 'blur(6px)'
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.9, 0.4]
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'reverse',
            delay: i * 0.8
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
            filter: 'blur(15px)'
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 2
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
            left: `${25 + i * 18}%`
          }}
          animate={{
            scale: [0, 1.5, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0],
            y: [0, -50, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 1.2,
            ease: 'easeInOut'
          }}
        >
          <Sparkles 
            size={16} 
            className="text-purple-500/60" 
          />
        </motion.div>
      ))}

      {/* Pulsing Rings */}
      <motion.div
        className="absolute top-1/3 left-1/5 w-40 h-40 rounded-full border-2 border-purple-400/30"
        animate={{
          scale: [1, 2.5, 1],
          opacity: [0.6, 0, 0.6]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 right-1/5 w-32 h-32 rounded-full border-2 border-indigo-400/30"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3
        }}
      />
    </div>
  );
};

// Keep your original illustration
const Illustration = () => (
    <motion.img 
        src="../src/assets/social.svg" 
        alt="Illustration" 
        className="w-full max-w-lg mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
    />
);

// Enhanced Input Component (same as before)
const EnhancedInput = ({ type, value, onChange, placeholder, required, id, label, showForgot = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-slate-700 font-medium" htmlFor={id}>
          {label}
        </label>
        {showForgot && (
          <motion.a 
            href="#" 
            className="text-sm text-purple-600 hover:text-purple-800 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Forgot ?
          </motion.a>
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
                     ${isFocused 
                       ? 'border-purple-500 focus:ring-purple-500/50 shadow-lg shadow-purple-500/20' 
                       : 'border-gray-300/80 hover:border-purple-300'
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
        animate={{ width: isFocused ? '100%' : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

// Enhanced AuthModal with Background Branding
const AuthModal = ({ mode = 'signup', onAuth, onSwitchMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (mode === 'signup' && !name)) {
      alert('Please fill in all required fields.');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      onAuth({ email, password, name });
      setIsLoading(false);
    }, 1500);
  };

  const isLoginMode = mode === 'login';

  return (
    <div className="min-h-screen font-sans flex items-center justify-center p-4 relative overflow-hidden
                    bg-[radial-gradient(1200px_800px_at_100%_20%,#dbe7ff_0%,transparent_60%),radial-gradient(900px_620px_at_0%_90%,#f3e8ff_0%,transparent_55%),linear-gradient(180deg,#ffffff_0%,#f0f4ff_40%,#f5ecff_100%)]">
      
      {/* **NEW: Background Branding - Shows on ALL devices** */}
      <BackgroundBranding />
      
      {/* Mobile Background Effects - Only shows on small devices */}
      <MobileBackgroundEffects />
      
      {/* Original subtle floating elements for all devices */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`
            }}
          />
        ))}
      </div>
      
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
        {/* Left panel - Desktop only */}
        <motion.div 
          className="hidden lg:flex flex-col justify-center items-start text-left p-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div>
            <motion.span 
              className="font-bold text-xl tracking-widest text-purple-800/80"
              whileHover={{ scale: 1.05, color: "#7E69AB" }}
              transition={{ duration: 0.3 }}
            >
              SKILLSWAP.
            </motion.span>
            
            <motion.h1 
              className="text-6xl font-extrabold mt-8 leading-tight text-slate-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Welcome {isLoginMode ? 'Back' : 'Aboard'}
              <motion.div
                className="inline-block ml-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="text-purple-600" size={32} />
              </motion.div>
            </motion.h1>
            
            <motion.p 
              className="text-2xl mt-4 text-slate-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Start your journey now with us
            </motion.p>
          </div>
          
          <div className="mt-12 w-full">
            <Illustration />
          </div>
        </motion.div>

        {/* Right panel - Form */}
        <motion.div 
          className="w-full bg-white/80 lg:bg-white/70 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-white/20 shadow-2xl relative"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-3xl blur opacity-50" />
          
          <div className="max-w-md w-full mx-auto relative">
            <motion.div 
              className="text-left mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                {isLoginMode ? 'Login to your account' : 'Create an account'}
              </h2>
              <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.form
                key={mode}
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0, x: isLoginMode ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLoginMode ? 20 : -20 }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
              >
                {!isLoginMode && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <EnhancedInput
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      required
                      id="name"
                      label="Full Name"
                    />
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: !isLoginMode ? 0.2 : 0.1 }}
                >
                  <EnhancedInput
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    id="email"
                    label="Email"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: !isLoginMode ? 0.3 : 0.2 }}
                >
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
                </motion.div>
                
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg 
                           font-semibold tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 
                           transform hover:scale-105 disabled:opacity-50 disabled:scale-100 relative overflow-hidden"
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: !isLoginMode ? 0.4 : 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  <span className="relative flex items-center justify-center">
                    {isLoading ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      isLoginMode ? 'Login now' : 'Create account'
                    )}
                  </span>
                </motion.button>
                
                {!isLoginMode && (
                  <motion.button
                    type="button"
                    className="w-full flex items-center justify-center bg-white/80 backdrop-blur-sm border 
                             border-gray-300/80 text-slate-700 py-3 rounded-lg font-semibold tracking-wide 
                             shadow-sm hover:bg-white hover:shadow-md transition-all duration-300 transform hover:scale-105"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <GoogleIcon />
                    Continue with Google
                  </motion.button>
                )}
              </motion.form>
            </AnimatePresence>

            <motion.p 
              className="mt-8 text-center text-slate-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
              <motion.button
                type="button"
                onClick={() => onSwitchMode(isLoginMode ? 'signup' : 'login')}
                className="ml-2 text-purple-600 font-bold hover:text-purple-800 transition-colors focus:outline-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoginMode ? 'Sign up' : 'Log in'}
              </motion.button>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// App wrapper (same as before)
const App = () => {
  const [mode, setMode] = useState('signup');

  const handleAuth = (credentials) => {
    console.log('Auth attempt:', credentials);
    console.log('Mode:', mode);
  };

  const handleSwitchMode = (newMode) => {
    setMode(newMode);
  };

  return <AuthModal mode={mode} onAuth={handleAuth} onSwitchMode={handleSwitchMode} />
}

export default App;
