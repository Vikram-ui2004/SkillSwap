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

  const pathsWithoutLayout = ['/auth', '/dashboard'];
  const hideLayout =
    pathsWithoutLayout.includes(location.pathname) ||
    (location.pathname === '/' && isLoggedIn);

  const handleLogin = (formData) => {
    const userData = {
      name: formData.name || 'Jane Doe',
      email: formData.email,
      skills: ['React Development', 'UI/UX Design'],
    };
    setCurrentUser(userData);
    setIsLoggedIn(true);
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
                <Dashboard currentUser={currentUser} />
              ) : (
                <HomePage onGetstartedClick={openAuthPage} />
              )
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/dashboard"
            element={<Dashboard currentUser={currentUser} />}
          />
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
