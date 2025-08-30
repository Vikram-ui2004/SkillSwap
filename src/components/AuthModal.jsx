import React, { useState } from 'react';

// SVG component for the Google icon
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.519-3.357-11.181-7.944l-6.573 5.127C9.406 39.123 16.227 44 24 44z"></path>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.011 35.638 44 30.138 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
  </svg>
);

// UPDATED: Replaced inline SVG with a placeholder image tag
const Illustration = () => (
    <img 
        src="../src/assets/social.svg" 
        alt="Illustration" 
        className="w-full max-w-lg mx-auto"
    />
);


// Component now accepts props to control its state.
const AuthModal = ({ mode = 'signup', onAuth, onSwitchMode }) => {
  // State for email, password, and name.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Handles form submission by calling the onAuth prop.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (mode === 'signup' && !name)) {
      alert('Please fill in all required fields.');
      return;
    }
    onAuth({ email, password, name });
  };

  const isLoginMode = mode === 'login';

  return (
    // THEME: The purple/indigo glassmorphism theme you wanted.
    <div className="min-h-screen font-sans flex items-center justify-center p-4 bg-[radial-gradient(1200px_800px_at_100%_20%,#dbe7ff_0%,transparent_60%),radial-gradient(900px_620px_at_0%_90%,#f3e8ff_0%,transparent_55%),linear-gradient(180deg,#ffffff_0%,#f0f4ff_40%,#f5ecff_100%)]">
      
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left Panel */}
        <div className="hidden lg:flex flex-col justify-center items-start text-left p-8">
            <div>
                <span className="font-bold text-xl tracking-widest text-purple-800/80">SKILLSWAP.</span>
                <h1 className="text-6xl font-extrabold mt-8 leading-tight text-slate-900">
                    Welcome {isLoginMode ? 'Back' : 'Aboard'}
                </h1>
                <p className="text-2xl mt-4 text-slate-600">Start your journey now with us</p>
            </div>
            {/* Added illustration here */}
            <div className="mt-12 w-full">
                <Illustration />
            </div>
        </div>

        {/* Right Panel: Form Card */}
        <div className="w-full bg-white/60 backdrop-blur-lg p-8 sm:p-12 rounded-2xl border border-black/10 shadow-xl">
          <div className="max-w-md w-full mx-auto">
            {/* Form Header */}
            <div className="text-left mb-10">
              <h2 className="text-4xl font-bold text-slate-900">
                {isLoginMode ? 'Login to your account' : 'Create an account'}
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Added Name input for signup mode */}
              {!isLoginMode && (
                <div>
                  <label className="block text-slate-700 font-medium mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 border border-gray-300/80 rounded-lg bg-white/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                </div>
              )}

              <div>
                <label className="block text-slate-700 font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300/80 rounded-lg bg-white/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-slate-700 font-medium" htmlFor="password">
                    Password
                  </label>
                  {isLoginMode && (
                       <a href="#" className="text-sm text-purple-600 hover:underline">
                         Forgot ?
                       </a>
                     )}
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 border border-gray-300/80 rounded-lg bg-white/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold tracking-wide shadow-lg hover:opacity-90 transition-all transform hover:scale-105"
              >
                {isLoginMode ? 'Login now' : 'Create account'}
              </button>
              
              {!isLoginMode && (
                  <button
                      type="button"
                      className="w-full flex items-center justify-center bg-white border border-gray-300/80 text-slate-700 py-3 rounded-lg font-semibold tracking-wide shadow-sm hover:bg-gray-50 transition-all transform hover:scale-105"
                  >
                      <GoogleIcon />
                      Continue with Google
                  </button>
              )}

            </form>

            {/* Switch Mode Link */}
            <p className="mt-8 text-center text-slate-600">
              {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
              {/* Button calls the onSwitchMode prop */}
              <button
                type="button"
                onClick={() => onSwitchMode(isLoginMode ? 'signup' : 'login')}
                className="ml-2 text-purple-600 font-bold hover:underline focus:outline-none"
              >
                {isLoginMode ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// You would typically have a parent component that manages the state,
// but for a standalone example, we can create a simple wrapper.
const App = () => {
    const [mode, setMode] = useState('signup');

    const handleAuth = (credentials) => {
        console.log('Auth attempt:', credentials);
        console.log('Mode:', mode);
        // Here you would add your actual authentication logic
        // (e.g., call Firebase, your backend API, etc.)
    };

    const handleSwitchMode = (newMode) => {
        setMode(newMode);
    };

    return <AuthModal mode={mode} onAuth={handleAuth} onSwitchMode={handleSwitchMode} />
}

export default App;

