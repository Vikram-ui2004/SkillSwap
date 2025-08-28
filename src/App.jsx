import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage.jsx';
import Dashboard from './pages/Dashboard';
import AuthModal from './components/AuthModal';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  
  const [availableSkills] = useState([
    { id: 1, name: 'JavaScript Programming', teacher: 'Alex Chen', rating: 4.9, students: 150, image: '👨‍💻' },
    { id: 2, name: 'Digital Art & Design', teacher: 'Sarah Kim', rating: 4.8, students: 89, image: '🎨' },
    { id: 3, name: 'Spanish Language', teacher: 'Maria Rodriguez', rating: 4.7, students: 200, image: '🌎' },
    { id: 4, name: 'Guitar Playing', teacher: 'John Smith', rating: 4.9, students: 75, image: '🎸' },
  ]);

  // --- Handlers ---
  const handleLogin = (formData) => {
    const userData = {
      name: formData.name || 'Jane Doe',
      email: formData.email,
      skills: ['React Development', 'UI/UX Design']
    };
    setCurrentUser(userData);
    setIsLoggedIn(true);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };
  
  const openAuthModal = () => {
    setShowAuth(true);
    setAuthMode('login');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        onLoginClick={openAuthModal}
        onLogoutClick={handleLogout}
        userName={currentUser?.name}
      />

      <main>
        {isLoggedIn ? (
          <Dashboard currentUser={currentUser} availableSkills={availableSkills} />
        ) : (
          <HomePage onGetStartedClick={openAuthModal} />
        )}
      </main>
      
      {showAuth && (
        <AuthModal 
          mode={authMode}
          onClose={() => setShowAuth(false)}
          onAuth={handleLogin}
          onSwitchMode={(newMode) => setAuthMode(newMode)}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;