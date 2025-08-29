import React, { useState } from 'react';
import { X } from 'lucide-react';

const AuthModal = ({ mode, onClose, onAuth, onSwitchMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in email and password.');
      return;
    }
    onAuth({ email, password, name });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full border border-black/5 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#1f2040]">
            {mode === 'login' ? 'Welcome Back' : 'Join SkillSwap'}
          </h2>
          <button onClick={onClose} className="text-[#4b546e] hover:text-[#1f2040]">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Full Name" 
              required 
              className="w-full px-4 py-3 border border-black/5 rounded-lg bg-white/50 text-[#384060] placeholder-[#4b546e] focus:outline-none focus:border-[#7E69AB]"
            />
          )}
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            required 
            className="w-full px-4 py-3 border border-black/5 rounded-lg bg-white/50 text-[#384060] placeholder-[#4b546e] focus:outline-none focus:border-[#7E69AB]"
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
            className="w-full px-4 py-3 border border-black/5 rounded-lg bg-white/50 text-[#384060] placeholder-[#4b546e] focus:outline-none focus:border-[#7E69AB]"
          />
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold tracking-wide shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-[#4b546e]">
          {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => onSwitchMode(mode === 'login' ? 'signup' : 'login')} className="ml-2 text-[#3B1E54] font-semibold hover:text-[#7E69AB]">
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
