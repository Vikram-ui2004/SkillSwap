import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './Pages/HomePage';
import Dashboard from './Pages/Dashboard';
import AboutPage from './Pages/About';
import AuthPage from './Pages/Auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Add '/dashboard' to a list of paths without the layout
  const pathsWithoutLayout = ['/auth', '/dashboard'];

  // 2. Update the condition to check the array
  const hideLayout = pathsWithoutLayout.includes(location.pathname) || (location.pathname === '/' && isLoggedIn);

  const [availableSkills] = useState([
    { id: 1, name: 'JavaScript Programming', teacher: 'Alex Chen', rating: 4.9, students: 150, image: '👨‍💻' },
    { id: 2, name: 'Digital Art & Design', teacher: 'Sarah Kim', rating: 4.8, students: 89, image: '🎨' },
    { id: 3, name: 'Spanish Language', teacher: 'Maria Rodriguez', rating: 4.7, students: 200, image: '🌎' },
    { id: 4, name: 'Guitar Playing', teacher: 'John Smith', rating: 4.9, students: 75, image: '🎸' },
  ]);

  const handleLogin = (formData) => {
    const userData = {
      name: formData.name || 'Jane Doe',
      email: formData.email,
      skills: ['React Development', 'UI/UX Design']
    };
    setCurrentUser(userData);
    setIsLoggedIn(true);
    // You might want to navigate to the explicit '/dashboard' route here
    navigate('/dashboard'); 
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate('/');
  };
  
  const openAuthPage = () => {
    setAuthMode('login');
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* The rendering logic here doesn't need to change */}
      {!hideLayout && (
        <Navbar
          isLoggedIn={isLoggedIn}
          onLoginClick={openAuthPage}
          onLogoutClick={handleLogout}
          userName={currentUser?.name}
        />
      )}

      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                // Redirecting to /dashboard if logged in is often a clearer pattern
                <Dashboard currentUser={currentUser} availableSkills={availableSkills} />
              ) : (
                <HomePage onGetstartedClick={openAuthPage} />
              )
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<Dashboard currentUser={currentUser} availableSkills={availableSkills} />} />
          <Route
            path="/auth"
            element={
              <AuthPage
                mode={authMode}
                onAuth={handleLogin}
                onSwitchMode={(newMode) => setAuthMode(newMode)}
              />
            }
          />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;